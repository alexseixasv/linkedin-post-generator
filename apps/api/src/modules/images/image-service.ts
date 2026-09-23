import {
  IMAGE_PROMPT_VERSION,
  imageBriefSchema,
  modelImagePromptSchema,
  type GeneratedImagePublic,
  type ImageBrief,
  type PostPublic,
  type ProfilePublic,
} from "@studio/shared";
import { malformedAiOutput, notFound } from "../../app-error.js";
import { parseJsonObject } from "../ai/parse-json.js";
import type { ImageGenerationProvider } from "../ai/image-generation-provider.js";
import {
  IMAGE_BRIEF_SYSTEM_PROMPT,
  buildImageBriefUserPrompt,
} from "../ai/prompts/image-brief.v1.js";
import {
  IMAGE_PROMPT_SYSTEM_PROMPT,
  buildImagePromptUserPrompt,
} from "../ai/prompts/image-prompt.v1.js";
import type { TextGenerationProvider } from "../ai/text-generation-provider.js";
import type { PostService } from "../posts/post-service.js";
import type { ProfileService } from "../profile/profile-service.js";
import type { StorageProvider } from "../uploads/storage-provider.js";
import { containsPostBody } from "./ground-image.js";
import type { ImageRepository } from "./image-repository.js";

export function buildImageBriefPrompt(input: {
  profile: ProfilePublic;
  post: PostPublic;
  referenceCount: number;
}) {
  return {
    purpose: IMAGE_PROMPT_VERSION,
    system: IMAGE_BRIEF_SYSTEM_PROMPT,
    user: buildImageBriefUserPrompt({
      profile: input.profile,
      post: input.post,
      referenceCount: input.referenceCount,
    }),
  };
}

export class ImageService {
  constructor(
    private readonly profiles: ProfileService,
    private readonly posts: PostService,
    private readonly images: ImageRepository,
    private readonly storage: StorageProvider,
    private readonly text: TextGenerationProvider,
    private readonly image: ImageGenerationProvider,
  ) {}

  async getLatest(): Promise<GeneratedImagePublic | null> {
    const post = await this.posts.getLatest();
    if (!post) {
      return null;
    }
    const row = await this.images.getLatestForPost(post.id);
    return row ? this.toPublic(row) : null;
  }

  async getFile(imageId: string) {
    const row = await this.images.getById(imageId);
    if (!row) {
      throw notFound("Image not found.");
    }
    const object = await this.storage.get(row.storageKey);
    if (!object) {
      throw notFound("Image file not found.");
    }
    return object;
  }

  async generate(): Promise<GeneratedImagePublic> {
    const profile = await this.profiles.getProfile();
    const post = await this.posts.getLatest();
    if (!profile || !post) {
      throw notFound("Write a post before generating an image.");
    }

    const references = await this.profiles.listReferenceImages();
    const brief = await this.createBrief(profile, post, references.length);
    const prompt = await this.createPrompt(brief, post.body);

    const generated = await this.image.generateImage({
      prompt,
      aspectRatio: brief.aspectRatio,
      references,
    });

    const stored = await this.storage.put({
      bytes: generated.bytes,
      mimeType: generated.mimeType,
      extension: "png",
    });

    const row = await this.images.create({
      postId: post.id,
      promptVersion: IMAGE_PROMPT_VERSION,
      model: generated.model,
      brief,
      generationPrompt: prompt,
      usedReferences: references.length > 0,
      storageKey: stored.key,
      mimeType: generated.mimeType,
    });
    if (!row) {
      throw malformedAiOutput("The image could not be saved.");
    }
    return this.toPublic(row);
  }

  private async createBrief(
    profile: ProfilePublic,
    post: PostPublic,
    referenceCount: number,
  ): Promise<ImageBrief> {
    const generated = await this.text.generateText(
      buildImageBriefPrompt({ profile, post, referenceCount }),
    );
    const parsed = imageBriefSchema.safeParse(parseJsonObject(generated.text));
    if (!parsed.success) {
      throw malformedAiOutput("The model returned a brief that did not match the required structure.");
    }
    return parsed.data;
  }

  private async createPrompt(brief: ImageBrief, postBody: string): Promise<string> {
    const generated = await this.text.generateText({
      purpose: IMAGE_PROMPT_VERSION,
      system: IMAGE_PROMPT_SYSTEM_PROMPT,
      user: buildImagePromptUserPrompt(brief),
    });
    const parsed = modelImagePromptSchema.safeParse(parseJsonObject(generated.text));
    if (!parsed.success) {
      throw malformedAiOutput("The model returned an image prompt that could not be used.");
    }
    if (containsPostBody(parsed.data.prompt, postBody)) {
      throw malformedAiOutput("The image prompt repeated the post text and was rejected.");
    }
    return parsed.data.prompt;
  }

  private toPublic(
    row: NonNullable<Awaited<ReturnType<ImageRepository["getLatestForPost"]>>>,
  ): GeneratedImagePublic {
    return {
      id: row.id,
      createdAt: row.createdAt.toISOString(),
      postId: row.postId,
      promptVersion: row.promptVersion,
      model: row.model,
      usedReferences: row.usedReferences,
      url: `/api/images/${row.id}/file`,
      brief: row.brief,
    };
  }
}

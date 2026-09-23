import { randomUUID } from "node:crypto";
import { desc, eq } from "drizzle-orm";
import type { ImageBrief } from "@studio/shared";
import type { Database } from "../../db/client.js";
import { generatedImages } from "../../db/schema.js";
import { WORKSPACE_PROFILE_ID } from "../profile/profile-repository.js";

export class ImageRepository {
  constructor(private readonly db: Database) {}

  async getLatestForPost(postId: string) {
    const [row] = await this.db
      .select()
      .from(generatedImages)
      .where(eq(generatedImages.postId, postId))
      .orderBy(desc(generatedImages.createdAt))
      .limit(1);
    return row ?? null;
  }

  async getById(id: string) {
    const [row] = await this.db
      .select()
      .from(generatedImages)
      .where(eq(generatedImages.id, id))
      .limit(1);
    return row ?? null;
  }

  async create(input: {
    postId: string;
    promptVersion: string;
    model: string;
    brief: ImageBrief;
    generationPrompt: string;
    usedReferences: boolean;
    storageKey: string;
    mimeType: string;
  }) {
    const [row] = await this.db
      .insert(generatedImages)
      .values({
        id: randomUUID(),
        profileId: WORKSPACE_PROFILE_ID,
        postId: input.postId,
        promptVersion: input.promptVersion,
        model: input.model,
        brief: input.brief,
        generationPrompt: input.generationPrompt,
        usedReferences: input.usedReferences,
        storageKey: input.storageKey,
        mimeType: input.mimeType,
      })
      .returning();
    return row ?? null;
  }
}

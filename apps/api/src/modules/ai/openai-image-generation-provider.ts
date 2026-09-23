import OpenAI, { toFile } from "openai";
import { malformedAiOutput, providerUnavailable } from "../../app-error.js";
import { mapOpenAiError } from "./openai-error.js";
import type {
  ImageGenerationProvider,
  ImageGenerationRequest,
  ImageGenerationResult,
  ImageReference,
} from "./image-generation-provider.js";

const MIME_EXTENSION: Record<string, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/webp": "webp",
};

export function decodeGeneratedImage(
  payload: { data?: Array<{ b64_json?: string | null }> | null },
  model: string,
): ImageGenerationResult {
  const encoded = payload.data?.[0]?.b64_json;
  if (!encoded) {
    throw malformedAiOutput("The image provider returned an empty image.");
  }
  return {
    bytes: Buffer.from(encoded, "base64"),
    mimeType: "image/png",
    model,
  };
}

export class OpenAIImageGenerationProvider implements ImageGenerationProvider {
  constructor(
    private readonly apiKey: string,
    private readonly model: string,
  ) {}

  async generateImage(request: ImageGenerationRequest): Promise<ImageGenerationResult> {
    if (!this.apiKey) {
      throw providerUnavailable(
        "Image generation is not configured. Set OPENAI_API_KEY and retry.",
      );
    }

    const client = new OpenAI({
      apiKey: this.apiKey,
      timeout: 120_000,
      maxRetries: 1,
    });
    const size = request.aspectRatio === "4:5" ? "1024x1536" : "1024x1024";

    try {
      const response =
        request.references.length > 0
          ? await client.images.edit({
              model: this.model,
              prompt: request.prompt,
              image: await toReferenceFiles(request.references),
              size,
              quality: "medium",
              input_fidelity: "high",
            })
          : await client.images.generate({
              model: this.model,
              prompt: request.prompt,
              size,
              quality: "medium",
            });

      return decodeGeneratedImage(response, this.model);
    } catch (error) {
      throw mapOpenAiError(error, "image");
    }
  }
}

async function toReferenceFiles(references: ImageReference[]) {
  return Promise.all(
    references.slice(0, 3).map((reference, index) => {
      const extension = MIME_EXTENSION[reference.mimeType] ?? "png";
      return toFile(reference.bytes, `reference-${index}.${extension}`, {
        type: reference.mimeType,
      });
    }),
  );
}

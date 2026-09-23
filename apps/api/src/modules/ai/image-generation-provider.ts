export type ImageReference = {
  bytes: Buffer;
  mimeType: string;
};

export type ImageGenerationRequest = {
  prompt: string;
  aspectRatio: "1:1" | "4:5";
  references: ImageReference[];
};

export type ImageGenerationResult = {
  bytes: Buffer;
  mimeType: string;
  model: string;
};

export interface ImageGenerationProvider {
  generateImage(request: ImageGenerationRequest): Promise<ImageGenerationResult>;
}

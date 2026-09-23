import { z } from "zod";

export const IMAGE_PROMPT_VERSION = "image.v1";

export const IMAGE_ASPECT_RATIOS = ["1:1", "4:5"] as const;
export type ImageAspectRatio = (typeof IMAGE_ASPECT_RATIOS)[number];

export const imageBriefSchema = z.object({
  communicationObjective: z.string().trim().min(1).max(300),
  coreIdea: z.string().trim().min(1).max(300),
  subject: z.string().trim().min(1).max(300),
  visualMetaphor: z.string().trim().min(1).max(300),
  environment: z.string().trim().min(1).max(300),
  composition: z.string().trim().min(1).max(300),
  subjectPlacement: z.string().trim().min(1).max(200),
  wardrobe: z.string().trim().min(1).max(200),
  cameraFraming: z.string().trim().min(1).max(200),
  cameraPerspective: z.string().trim().min(1).max(200),
  lighting: z.string().trim().min(1).max(200),
  mood: z.string().trim().min(1).max(200),
  colorDirection: z.string().trim().min(1).max(200),
  backgroundHierarchy: z.string().trim().min(1).max(200),
  negativeSpace: z.string().trim().min(1).max(200),
  optionalHeadline: z.string().trim().max(80).default(""),
  thingsToAvoid: z.array(z.string().trim().min(1).max(120)).max(10),
  aspectRatio: z.enum(IMAGE_ASPECT_RATIOS),
});

export type ImageBrief = z.infer<typeof imageBriefSchema>;

export const modelImagePromptSchema = z.object({
  prompt: z.string().trim().min(20).max(2500),
});

export const generatedImagePublicSchema = z.object({
  id: z.string().uuid(),
  createdAt: z.string(),
  postId: z.string().uuid(),
  promptVersion: z.string(),
  model: z.string(),
  usedReferences: z.boolean(),
  url: z.string(),
  brief: imageBriefSchema,
});

export type GeneratedImagePublic = z.infer<typeof generatedImagePublicSchema>;

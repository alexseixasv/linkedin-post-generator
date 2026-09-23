import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.string().optional().default("development"),
  API_PORT: z.coerce.number().int().positive().default(3000),
  DATABASE_URL: z.string().min(1),
  STORAGE_DIR: z.string().min(1).default("./storage"),
  MAX_PHOTO_BYTES: z.coerce.number().int().positive().default(8 * 1024 * 1024),
  OPENAI_API_KEY: z.string().optional().default(""),
  OPENAI_TEXT_MODEL: z.string().min(1).default("gpt-4.1"),
  OPENAI_IMAGE_MODEL: z.string().min(1).default("gpt-image-1.5"),
  NEWS_API_KEY: z.string().optional().default(""),
  NEWS_LOOKBACK_DAYS: z.coerce.number().int().positive().max(30).default(21),
});

export type Env = z.infer<typeof envSchema>;

export function loadEnv(source: NodeJS.ProcessEnv = process.env): Env {
  return envSchema.parse(source);
}

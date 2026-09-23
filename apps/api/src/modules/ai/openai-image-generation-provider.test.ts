import assert from "node:assert/strict";
import test from "node:test";
import { ERROR_CODES } from "@studio/shared";
import { AppError } from "../../app-error.ts";
import {
  OpenAIImageGenerationProvider,
  decodeGeneratedImage,
} from "./openai-image-generation-provider.ts";

test("decodes a base64 image payload", () => {
  const result = decodeGeneratedImage(
    { data: [{ b64_json: Buffer.from("png-bytes").toString("base64") }] },
    "gpt-image-1.5",
  );
  assert.equal(result.bytes.toString(), "png-bytes");
  assert.equal(result.mimeType, "image/png");
});

test("rejects an empty provider payload", () => {
  assert.throws(
    () => decodeGeneratedImage({ data: [] }, "gpt-image-1.5"),
    (error: unknown) =>
      error instanceof AppError && error.code === ERROR_CODES.MALFORMED_AI_OUTPUT,
  );
});

test("missing API key is retryable and does not call the vendor", async () => {
  const provider = new OpenAIImageGenerationProvider("", "gpt-image-1.5");
  await assert.rejects(
    () =>
      provider.generateImage({
        prompt: "editorial portrait",
        aspectRatio: "1:1",
        references: [],
      }),
    (error: unknown) =>
      error instanceof AppError && error.code === ERROR_CODES.PROVIDER_UNAVAILABLE,
  );
});

import { AppError, malformedAiOutput, providerUnavailable } from "../../app-error.js";

export function mapOpenAiError(
  error: unknown,
  capability: "text" | "image" = "text",
): AppError {
  if (error instanceof AppError) {
    return error;
  }

  const label = capability === "image" ? "image generation" : "text generation";
  const status = (error as { status?: number }).status;
  if (status === 401 || status === 403) {
    return providerUnavailable(`The ${label} provider rejected the credentials.`, 502);
  }
  if (status === 429) {
    return providerUnavailable(
      `The ${label} provider is rate-limited. Retry in a moment.`,
      503,
    );
  }
  if (status === 400) {
    return malformedAiOutput(`The ${label} provider rejected the request.`);
  }

  return providerUnavailable(`The ${label} provider is unavailable.`);
}

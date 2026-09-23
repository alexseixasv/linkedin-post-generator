# Slice 6 reflection

## Learned

The image pipeline is brief → prompt → provider → StorageProvider. The post body never enters those prompts. If the model pastes a long excerpt anyway, software rejects the prompt before the image call.

Retry inserts a new image for the current post. Persona, research, and post rows stay untouched.

Reference photos are identity inputs to `ImageGenerationProvider`, not a second generation job.

## Reviewer notes

- Temporary vendor URLs are not stored.
- Missing `OPENAI_API_KEY` fails at generate time with a retryable error.
- Text and image remain separate provider interfaces.

## Next

The MVP journey is complete: profile → persona → topics → angles → post → image.

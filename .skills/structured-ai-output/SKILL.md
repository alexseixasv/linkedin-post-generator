# Structured AI Output

## Purpose

Turn model responses into validated application data. Never persist untrusted JSON because it "looks right".

## When to Use

Any stage that asks a model for persona, opportunities, story strategy, reviews, scores, or an image brief.

## Inputs

- prompt template and version
- raw model text
- Zod (or equivalent) schema
- original evidence used to prompt

## Procedure

1. Keep the prompt in a versioned template, not in a route.
2. Ask for JSON. Treat the response as untrusted data.
3. Extract JSON (including fenced blocks). Parse failure is `MALFORMED_AI_OUTPUT`.
4. Validate against the schema before any persistence.
5. Apply deterministic grounding or rejection rules after schema success.
6. Map provider failures to retryable application errors.
7. Automated tests use a fake provider. Do not call the vendor in CI.

## Quality Criteria

- Invalid output is never stored.
- The use case does not import vendor SDK types.
- Tests cover success, malformed JSON, schema mismatch, and provider failure.

## Common Failure Modes

- Saving the raw string "because we can repair it later"
- Letting the model override a deterministic rejection
- Snapshotting generated prose in tests

## Output

Validated payload plus model name and prompt version.

## Learnings

Slice 2: persona JSON is grounded after validation. Thin profiles cannot keep a full strong-authority list even if the model returns one.

Slice 4: opportunity evaluations are grounded after validation. keep=false, unknown articleIds, empty evidence, and risky topics are dropped. The set is not padded to three.

Slice 5: draft and review JSON are validated separately. A failed review does not keep an unreviewed draft.

Slice 6: brief and image-prompt JSON are validated separately. A prompt that repeats the post body is rejected before the image provider runs.

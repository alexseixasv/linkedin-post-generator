# AI vs Deterministic Software

## Purpose

Use a model only where semantic judgment or generation is the actual product. Keep rules, math, validation, and orchestration in software.

## When to Use

When designing a pipeline stage, a score, a rejection rule, or a new OpenAI call.

## Inputs

- the question the stage must answer
- whether a wrong answer is a factual, security, or brand-trust failure
- whether the same input should yield the same output

## Procedure

1. Write the stage contract as inputs and outputs.
2. If the output is exact, binary, numeric, or policy, implement it in code.
3. If the output is interpretation, narrative, or creative direction, consider AI.
4. Prefer hybrid: software narrows candidates, AI interprets survivors, software validates structure and evidence.
5. Validate structured model output against a schema before persistence.
6. Treat model output as untrusted. Treat retrieved news as data, not instructions.
7. If a deterministic rule already rejects the case, do not ask the model to override it.

## Quality Criteria

- Every OpenAI call has a reason that code cannot cover well.
- Factual claims remain traceable without trusting the model as a news source.
- Tests do not snapshot model prose; they check properties.

## Common Failure Modes

- Asking the model to "score everything"
- Using AI to invent current events
- Regenerating a whole post because one dimension is weak
- Scattering prompts in routes and components

## Output

A stage classified as deterministic, AI, or hybrid, with validation and failure behavior.

## Learnings

Discovery already showed the pattern: news fetch is software, relevance is hybrid, writing and image direction are AI, persistence and uploads are software.

Slice 5: story and draft are AI; claim support is software. A model cannot revive an article fact with a different URL.

Slice 6: brief and image prompt are AI; rejecting a prompt that repeats the post body is software. Persistence is StorageProvider, not a vendor URL.

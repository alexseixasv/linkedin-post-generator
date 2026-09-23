# Slice 2 reflection

## Learned

Persona is a derived snapshot, not a more flattering profile. Schema validation is the persistence gate. Software still demotes strong-authority topics when evidence is thin.

OpenAI stays behind `TextGenerationProvider`. Empty API keys fail at generate time so the profile API keeps working.

## Reviewer notes

- Prompt context must include experiences and skills, not photo URLs.
- Malformed JSON is 422, not a saved half-persona.
- Models often wrap the object, emit topic strings, or use seniority aliases. Normalize shape before the schema; still reject junk like `{"nope":true}`.
- Provider outages must be retryable from the same screen.

## Next

Slice 3 can consume the latest persona as query input for `NewsProvider` without changing persona persistence.

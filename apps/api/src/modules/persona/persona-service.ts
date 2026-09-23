import {
  PERSONA_PROMPT_VERSION,
  assessProfileEvidence,
  personaPayloadSchema,
  type PersonaPublic,
  type ProfilePublic,
} from "@studio/shared";
import { malformedAiOutput, notFound } from "../../app-error.js";
import { parseJsonObject } from "../ai/parse-json.js";
import {
  PERSONA_SYSTEM_PROMPT,
  buildPersonaUserPrompt,
} from "../ai/prompts/persona.v1.js";
import type { TextGenerationProvider } from "../ai/text-generation-provider.js";
import type { ProfileService } from "../profile/profile-service.js";
import { groundPersona } from "./ground-persona.js";
import { normalizePersonaCandidate } from "./normalize-persona.js";
import type { PersonaRepository } from "./persona-repository.js";

export function buildPersonaPrompt(profile: ProfilePublic) {
  return {
    purpose: PERSONA_PROMPT_VERSION,
    system: PERSONA_SYSTEM_PROMPT,
    user: buildPersonaUserPrompt(profile),
  };
}

export class PersonaService {
  constructor(
    private readonly profiles: ProfileService,
    private readonly personas: PersonaRepository,
    private readonly text: TextGenerationProvider,
  ) {}

  async getPersona(): Promise<PersonaPublic | null> {
    const profile = await this.profiles.getProfile();
    const row = await this.personas.getLatest();
    if (!profile || !row) {
      return null;
    }
    return this.toPublic(row, profile);
  }

  async generatePersona(): Promise<PersonaPublic> {
    const profile = await this.profiles.getProfile();
    if (!profile) {
      throw notFound("Save a professional profile before generating a persona.");
    }

    const prompt = buildPersonaPrompt(profile);
    const generated = await this.text.generateText(prompt);
    const parsed = personaPayloadSchema.safeParse(
      normalizePersonaCandidate(parseJsonObject(generated.text)),
    );
    if (!parsed.success) {
      throw malformedAiOutput(
        "The model returned a persona that did not match the required structure.",
      );
    }

    const payload = groundPersona(parsed.data, profile);
    const row = await this.personas.insert({
      payload,
      model: generated.model,
      promptVersion: PERSONA_PROMPT_VERSION,
    });
    if (!row) {
      throw malformedAiOutput("The persona could not be saved.");
    }
    return this.toPublic(row, profile);
  }

  private toPublic(
    row: NonNullable<Awaited<ReturnType<PersonaRepository["getLatest"]>>>,
    profile: ProfilePublic,
  ): PersonaPublic {
    return {
      id: row.id,
      promptVersion: row.promptVersion,
      model: row.model,
      createdAt: row.createdAt.toISOString(),
      stale: new Date(profile.updatedAt) > row.createdAt,
      evidenceWarning: assessProfileEvidence(profile),
      persona: row.payload,
    };
  }
}

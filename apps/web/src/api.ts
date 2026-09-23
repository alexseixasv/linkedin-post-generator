import type {
  AngleType,
  GeneratedImagePublic,
  OpportunitySetPublic,
  PersonaPublic,
  PostPublic,
  ProfileInput,
  ProfilePublic,
  ResearchRunPublic,
  WritingTone,
} from "@studio/shared";
import { profileInputSchema } from "@studio/shared";

export type ApiError = {
  code: string;
  message: string;
};

async function parseError(response: Response): Promise<ApiError> {
  try {
    const body = (await response.json()) as { error?: ApiError };
    if (body.error?.message) {
      return body.error;
    }
  } catch {
    // Fall through to a generic message.
  }
  return { code: "UNKNOWN", message: "The request failed." };
}

export async function fetchProfile(): Promise<ProfilePublic | null> {
  const response = await fetch("/api/profile");
  if (!response.ok) {
    throw await parseError(response);
  }
  const body = (await response.json()) as { profile: ProfilePublic | null };
  return body.profile;
}

export async function saveProfile(input: ProfileInput): Promise<ProfilePublic> {
  const payload = profileInputSchema.parse(input);
  const response = await fetch("/api/profile", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw await parseError(response);
  }
  const body = (await response.json()) as { profile: ProfilePublic };
  return body.profile;
}

export async function uploadPhoto(file: File): Promise<ProfilePublic> {
  const data = new FormData();
  data.append("file", file);
  const response = await fetch("/api/profile/photos", {
    method: "POST",
    body: data,
  });
  if (!response.ok) {
    throw await parseError(response);
  }
  const body = (await response.json()) as { profile: ProfilePublic };
  return body.profile;
}

export async function deletePhoto(photoId: string): Promise<ProfilePublic> {
  const response = await fetch(`/api/profile/photos/${photoId}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw await parseError(response);
  }
  const body = (await response.json()) as { profile: ProfilePublic };
  return body.profile;
}

export async function fetchPersona(): Promise<PersonaPublic | null> {
  const response = await fetch("/api/persona");
  if (!response.ok) {
    throw await parseError(response);
  }
  const body = (await response.json()) as { persona: PersonaPublic | null };
  return body.persona;
}

export async function generatePersona(): Promise<PersonaPublic> {
  const response = await fetch("/api/persona/generate", { method: "POST" });
  if (!response.ok) {
    throw await parseError(response);
  }
  const body = (await response.json()) as { persona: PersonaPublic };
  return body.persona;
}

export async function fetchResearch(): Promise<ResearchRunPublic | null> {
  const response = await fetch("/api/research");
  if (!response.ok) {
    throw await parseError(response);
  }
  const body = (await response.json()) as { research: ResearchRunPublic | null };
  return body.research;
}

export async function discoverResearch(): Promise<ResearchRunPublic> {
  const response = await fetch("/api/research/discover", { method: "POST" });
  if (!response.ok) {
    throw await parseError(response);
  }
  const body = (await response.json()) as { research: ResearchRunPublic };
  return body.research;
}

export async function fetchOpportunities(): Promise<OpportunitySetPublic | null> {
  const response = await fetch("/api/opportunities");
  if (!response.ok) {
    throw await parseError(response);
  }
  const body = (await response.json()) as { opportunities: OpportunitySetPublic | null };
  return body.opportunities;
}

export async function generateOpportunities(): Promise<OpportunitySetPublic> {
  const response = await fetch("/api/opportunities/generate", { method: "POST" });
  if (!response.ok) {
    throw await parseError(response);
  }
  const body = (await response.json()) as { opportunities: OpportunitySetPublic };
  return body.opportunities;
}

export async function selectOpportunity(opportunityId: string): Promise<OpportunitySetPublic> {
  const response = await fetch(`/api/opportunities/${opportunityId}/select`, {
    method: "POST",
  });
  if (!response.ok) {
    throw await parseError(response);
  }
  const body = (await response.json()) as { opportunities: OpportunitySetPublic };
  return body.opportunities;
}

export async function fetchPost(): Promise<PostPublic | null> {
  const response = await fetch("/api/posts");
  if (!response.ok) {
    throw await parseError(response);
  }
  const body = (await response.json()) as { post: PostPublic | null };
  return body.post;
}

async function postAction(path: string, payload?: unknown): Promise<PostPublic> {
  const response = await fetch(path, {
    method: "POST",
    headers: payload ? { "Content-Type": "application/json" } : undefined,
    body: payload ? JSON.stringify(payload) : undefined,
  });
  if (!response.ok) {
    throw await parseError(response);
  }
  const body = (await response.json()) as { post: PostPublic };
  return body.post;
}

export function generatePost(): Promise<PostPublic> {
  return postAction("/api/posts/generate");
}

export function generateAlternativeHook(): Promise<PostPublic> {
  return postAction("/api/posts/hook");
}

export function changePostTone(tone: WritingTone): Promise<PostPublic> {
  return postAction("/api/posts/tone", { tone });
}

export function changePostAngle(angle: AngleType): Promise<PostPublic> {
  return postAction("/api/posts/angle", { angle });
}

export function rewritePostSection(section: string): Promise<PostPublic> {
  return postAction("/api/posts/rewrite", { section });
}

export async function fetchImage(): Promise<GeneratedImagePublic | null> {
  const response = await fetch("/api/images");
  if (!response.ok) {
    throw await parseError(response);
  }
  const body = (await response.json()) as { image: GeneratedImagePublic | null };
  return body.image;
}

export async function generateImage(): Promise<GeneratedImagePublic> {
  const response = await fetch("/api/images/generate", { method: "POST" });
  if (!response.ok) {
    throw await parseError(response);
  }
  const body = (await response.json()) as { image: GeneratedImagePublic };
  return body.image;
}

export function emptyProfile(): ProfileInput {
  return profileInputSchema.parse({});
}

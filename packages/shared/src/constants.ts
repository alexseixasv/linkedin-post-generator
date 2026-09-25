export const WRITING_TONES = [
  "Conversational",
  "Technical",
  "Opinionated",
  "Educational",
  "Executive",
  "Provocative",
  "Story-driven",
  "Analytical",
  "Direct",
] as const;

export const POST_LENGTHS = ["SHORT", "MEDIUM", "LONG"] as const;

export const POSITIONING_OPTIONS = [
  "Technical Expert",
  "Engineering Leader",
  "Builder",
  "Architect",
  "Educator",
  "Founder",
  "AI Specialist",
  "Data Specialist",
  "Product Thinker",
  "Cloud Specialist",
  "Platform Specialist",
  "Career Specialist",
  "Technology Influencer",
] as const;

export type WritingTone = (typeof WRITING_TONES)[number];
export type PostLength = (typeof POST_LENGTHS)[number];
export type PositioningOption = (typeof POSITIONING_OPTIONS)[number];

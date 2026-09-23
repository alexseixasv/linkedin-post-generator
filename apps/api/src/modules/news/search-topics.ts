import type { PersonaPayload } from "@studio/shared";

const STOP = new Set([
  "and",
  "the",
  "for",
  "with",
  "from",
  "software",
  "engineer",
  "engineering",
  "technology",
  "professional",
  "modern",
  "architecture",
  "optimization",
  "frameworks",
  "native",
  "stack",
  "driven",
  "asynchronous",
  "event",
]);

export function compactSearchTerm(topic: string): string[] {
  const cleaned = topic.trim().replaceAll('"', "");
  const extras = [...cleaned.matchAll(/\(([^)]+)\)/g)].flatMap((match) =>
    (match[1] ?? "").split(/[,/]+/).map((part) => part.trim()),
  );
  const head = cleaned
    .replace(/\([^)]*\)/g, " ")
    .split(/[\s,/|]+/)
    .map((part) => part.trim())
    .filter((part) => part.length >= 2 && !STOP.has(part.toLowerCase()));

  const phrases =
    head.length <= 4 && cleaned.length <= 48 ? [head.join(" ")] : [head.slice(0, 3).join(" ")];

  return [...phrases, ...extras].map((item) => item.trim()).filter((item) => item.length >= 2);
}

export function buildSearchTopics(persona: PersonaPayload, limit = 8): string[] {
  const ranked = [
    ...persona.technologies,
    ...persona.strongAuthorityTopics.map((item) => item.topic),
    ...persona.coreExpertise,
    ...persona.contentPillars,
    ...persona.professionalKeywords,
    ...persona.credibleTopics.map((item) => item.topic),
    ...persona.supportingExpertise,
  ];

  const blocked = new Set(
    persona.riskyTopics.flatMap((item) => compactSearchTerm(item.topic).map((term) => term.toLowerCase())),
  );

  const unique: string[] = [];
  const seen = new Set<string>();

  for (const raw of ranked) {
    for (const topic of compactSearchTerm(raw)) {
      const key = topic.toLowerCase();
      if (STOP.has(key) || blocked.has(key) || seen.has(key)) {
        continue;
      }
      seen.add(key);
      unique.push(topic);
      if (unique.length >= limit) {
        return unique;
      }
    }
  }

  return unique;
}

export function languageCode(preferredLanguage: string): string {
  const value = preferredLanguage.trim().toLowerCase();
  if (value.startsWith("pt") || value.includes("portuguese")) return "pt";
  if (value.startsWith("es") || value.includes("spanish")) return "es";
  return "en";
}

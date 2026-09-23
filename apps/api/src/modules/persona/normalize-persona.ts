import { SENIORITY_BANDS } from "@studio/shared";

const FALLBACK_EVIDENCE = "Mentioned in the saved profile";

export function normalizePersonaCandidate(value: unknown): unknown {
  const record = asRecord(value);
  if (!record || !hasPersonaSignal(record)) {
    return value;
  }

  return {
    positioningStatement: clip(
      record.positioningStatement,
      400,
      "A technology professional with limited structured evidence.",
    ),
    coreExpertise: stringList(record.coreExpertise, 8, 80),
    supportingExpertise: stringList(record.supportingExpertise, 8, 80),
    technologies: stringList(record.technologies, 20, 80),
    industries: stringList(record.industries, 10, 80),
    careerNarrative: clip(
      record.careerNarrative,
      1200,
      "The saved profile does not yet support a detailed career narrative.",
    ),
    seniority: normalizeSeniority(record.seniority),
    technicalDepth: clip(
      record.technicalDepth,
      400,
      "Technical depth is unclear from the saved profile.",
    ),
    leadershipExposure: clip(
      record.leadershipExposure,
      400,
      "Leadership exposure is not evidenced in the saved profile.",
    ),
    differentiators: stringList(record.differentiators, 6, 160),
    proofPoints: proofPoints(record.proofPoints),
    targetAudience: clip(record.targetAudience, 400, "Technology professionals"),
    desiredPerception: clip(record.desiredPerception, 400, "Credible and specific"),
    contentPillars: stringList(record.contentPillars, 6, 80),
    strongAuthorityTopics: topicList(record.strongAuthorityTopics, 8),
    credibleTopics: topicList(record.credibleTopics, 8),
    adjacentTopics: topicList(record.adjacentTopics, 8),
    riskyTopics: topicList(record.riskyTopics, 8),
    professionalKeywords: stringList(record.professionalKeywords, 20, 60),
    businessImpactThemes: stringList(record.businessImpactThemes, 8, 120),
    repeatedCareerPatterns: stringList(record.repeatedCareerPatterns, 6, 160),
  };
}

function asRecord(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return null;
  }
  const record = value as Record<string, unknown>;
  if (record.persona && typeof record.persona === "object" && !Array.isArray(record.persona)) {
    return record.persona as Record<string, unknown>;
  }
  return record;
}

function hasPersonaSignal(record: Record<string, unknown>): boolean {
  return (
    typeof record.positioningStatement === "string" ||
    typeof record.careerNarrative === "string" ||
    typeof record.seniority === "string" ||
    Array.isArray(record.coreExpertise) ||
    Array.isArray(record.strongAuthorityTopics)
  );
}

function clip(value: unknown, max: number, fallback: string): string {
  const text = typeof value === "string" ? value.trim() : "";
  return (text || fallback).slice(0, max);
}

function stringList(value: unknown, maxItems: number, maxLength: number): string[] {
  const items = Array.isArray(value) ? value : typeof value === "string" ? [value] : [];
  return items
    .map((item) => (typeof item === "string" ? item.trim() : ""))
    .filter(Boolean)
    .map((item) => item.slice(0, maxLength))
    .slice(0, maxItems);
}

function topicList(value: unknown, maxItems: number) {
  if (!Array.isArray(value)) {
    return [];
  }
  return value
    .flatMap((item) => {
      if (typeof item === "string" && item.trim()) {
        return [{ topic: item.trim().slice(0, 120), evidence: FALLBACK_EVIDENCE }];
      }
      if (item && typeof item === "object") {
        const row = item as Record<string, unknown>;
        const topic = clip(row.topic ?? row.name ?? row.title, 120, "");
        if (!topic) {
          return [];
        }
        return [{ topic, evidence: clip(row.evidence, 500, FALLBACK_EVIDENCE) }];
      }
      return [];
    })
    .slice(0, maxItems);
}

function proofPoints(value: unknown) {
  if (!Array.isArray(value)) {
    return [];
  }
  return value
    .flatMap((item) => {
      if (typeof item === "string" && item.trim()) {
        return [{ claim: item.trim().slice(0, 200), evidence: FALLBACK_EVIDENCE }];
      }
      if (item && typeof item === "object") {
        const row = item as Record<string, unknown>;
        const claim = clip(row.claim ?? row.point ?? row.text, 200, "");
        if (!claim) {
          return [];
        }
        return [{ claim, evidence: clip(row.evidence, 400, FALLBACK_EVIDENCE) }];
      }
      return [];
    })
    .slice(0, 8);
}

function normalizeSeniority(value: unknown): (typeof SENIORITY_BANDS)[number] {
  const raw = typeof value === "string" ? value.trim() : "";
  if ((SENIORITY_BANDS as readonly string[]).includes(raw)) {
    return raw as (typeof SENIORITY_BANDS)[number];
  }

  const aliases: Record<string, (typeof SENIORITY_BANDS)[number]> = {
    ic: "Individual Contributor",
    "individual contributor": "Individual Contributor",
    senior: "Senior IC",
    "senior ic": "Senior IC",
    "senior engineer": "Senior IC",
    staff: "Staff-plus",
    "staff-plus": "Staff-plus",
    "staff plus": "Staff-plus",
    "staff engineer": "Staff-plus",
    principal: "Staff-plus",
    lead: "Lead",
    "tech lead": "Lead",
    manager: "Manager",
    "engineering manager": "Manager",
    director: "Director+",
    "director+": "Director+",
    vp: "Director+",
    founder: "Founder",
    unclear: "Unclear",
  };
  return aliases[raw.toLowerCase()] ?? "Unclear";
}

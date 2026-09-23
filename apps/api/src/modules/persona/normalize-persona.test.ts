import assert from "node:assert/strict";
import test from "node:test";
import { personaPayloadSchema } from "@studio/shared";
import { normalizePersonaCandidate } from "./normalize-persona.ts";

test("repairs common model shape mistakes without inventing a persona from junk", () => {
  const junk = normalizePersonaCandidate({ nope: true });
  assert.equal(personaPayloadSchema.safeParse(junk).success, false);

  const repaired = normalizePersonaCandidate({
    persona: {
      positioningStatement: "A staff engineer who keeps platforms boring.",
      coreExpertise: ["Platform engineering", ""],
      seniority: "Staff Engineer",
      strongAuthorityTopics: ["Kubernetes"],
      proofPoints: ["Runs the internal platform"],
      careerNarrative: "Built platforms at Nimbus.",
    },
  });

  const parsed = personaPayloadSchema.parse(repaired);
  assert.equal(parsed.seniority, "Staff-plus");
  assert.deepEqual(parsed.coreExpertise, ["Platform engineering"]);
  assert.equal(parsed.strongAuthorityTopics[0]?.topic, "Kubernetes");
  assert.equal(parsed.proofPoints[0]?.claim, "Runs the internal platform");
  assert.ok(parsed.riskyTopics);
});

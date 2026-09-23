import assert from "node:assert/strict";
import test from "node:test";
import { containsPostBody } from "./ground-image.ts";

test("rejects prompts that paste a long post excerpt", () => {
  const body =
    "The Kubernetes 1.32 notes are not the interesting part. Scheduler contracts matter more than the headline feature.";
  assert.equal(containsPostBody("editorial portrait of an engineer", body), false);
  assert.equal(
    containsPostBody(
      `A magazine cover that includes: ${body.slice(0, 50)} and a quiet office.`,
      body,
    ),
    true,
  );
});

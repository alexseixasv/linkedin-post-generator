import assert from "node:assert/strict";
import test from "node:test";
import { ERROR_CODES, profileInputSchema, type PostPublic } from "@studio/shared";
import { AppError } from "../../app-error.ts";
import { buildImageBriefPrompt, ImageService } from "./image-service.ts";

const profile = () => ({
  ...profileInputSchema.parse({
    headline: "Staff Platform Engineer",
    currentJobTitle: "Staff Engineer",
    desiredPerception: "Practical",
    positioning: ["Platform Specialist"],
  }),
  id: "00000000-0000-4000-8000-000000000001",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  evidenceWarning: null,
  photos: [
    {
      id: "11111111-1111-4111-8111-111111111111",
      mimeType: "image/png",
      sizeBytes: 12,
      url: "/api/profile/photos/11111111-1111-4111-8111-111111111111",
      createdAt: new Date().toISOString(),
    },
  ],
  experiences: [],
  writingSamples: [],
});

const post = (): PostPublic => ({
  id: "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa",
  createdAt: new Date().toISOString(),
  promptVersion: "post.v1",
  model: "fake",
  tone: "Direct",
  angle: "PRODUCTION_REALITY",
  opportunityId: "bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb",
  sourceTitle: "Kubernetes 1.32 released",
  sourceUrl: "https://kubernetes.io/blog/1-32",
  hook: "The release notes are not the interesting part.",
  body: "The Kubernetes 1.32 notes are not the interesting part. Scheduler contracts matter more than the headline feature for platform teams.",
  storyStrategy: {
    structure: "Event to production",
    hookApproach: "Operational tension",
    narrativeArc: "News then implication",
    evidenceToUse: ["Staff Engineer at Nimbus"],
    claimsToAvoid: ["Fleet size"],
    takeaway: "Measure the operational contract.",
  },
  writingReview: { summary: "Fine", revisedSections: [], remainingRisks: [] },
  factReview: { summary: "Fine", claims: [], unsupportedClaims: [] },
  seoReview: { summary: "Natural", keywordsUsed: ["Kubernetes"], stuffingRisk: "Low" },
  quality: { score: 72, explanation: "Specific", strengths: ["Concrete"], improvements: [] },
});

test("brief prompt uses hook and takeaway, not the post body", () => {
  const prompt = buildImageBriefPrompt({
    profile: profile(),
    post: post(),
    referenceCount: 1,
  });
  assert.match(prompt.user, /The release notes are not the interesting part/);
  assert.match(prompt.user, /Measure the operational contract/);
  assert.match(prompt.user, /This is not the post body/);
  assert.doesNotMatch(prompt.user, /Scheduler contracts matter more than the headline feature/);
  assert.match(prompt.system, /Do not typeset the LinkedIn post/);
});

test("requires a saved post before generating an image", async () => {
  const service = new ImageService(
    { async getProfile() { return profile(); } } as never,
    { async getLatest() { return null; } } as never,
    {
      async create() {
        assert.fail("must not persist without a post");
      },
    } as never,
    {
      async put() {
        assert.fail("must not store without a post");
      },
    } as never,
    {
      async generateText() {
        assert.fail("must not call text without a post");
      },
    },
    {
      async generateImage() {
        assert.fail("must not call image without a post");
      },
    },
  );

  await assert.rejects(
    () => service.generate(),
    (error: unknown) => error instanceof AppError && error.code === ERROR_CODES.NOT_FOUND,
  );
});

test("passes the generated prompt and reference photos, not the post body", async () => {
  let receivedPrompt = "";
  let receivedRefs = 0;
  const body = post().body;
  const service = new ImageService(
    {
      async getProfile() {
        return profile();
      },
      async listReferenceImages() {
        return [{ bytes: Buffer.from("ref"), mimeType: "image/png" }];
      },
    } as never,
    { async getLatest() { return post(); } } as never,
    {
      async create(input: { generationPrompt: string; usedReferences: boolean }) {
        assert.equal(input.usedReferences, true);
        assert.doesNotMatch(input.generationPrompt, /Scheduler contracts matter more/);
        return {
          id: "cccccccc-cccc-4ccc-8ccc-cccccccccccc",
          createdAt: new Date(),
          postId: post().id,
          promptVersion: "image.v1",
          model: "fake-image",
          brief: {
            communicationObjective: "Authority",
            coreIdea: "Operational contract",
            subject: "Engineer at a whiteboard",
            visualMetaphor: "Quiet systems",
            environment: "Daylit office",
            composition: "Editorial",
            subjectPlacement: "Left third",
            wardrobe: "Simple knit",
            cameraFraming: "Medium",
            cameraPerspective: "Eye level",
            lighting: "Soft window",
            mood: "Calm",
            colorDirection: "Warm paper",
            backgroundHierarchy: "Soft tools",
            negativeSpace: "Right side",
            optionalHeadline: "",
            thingsToAvoid: ["Holograms"],
            aspectRatio: "1:1",
          },
          generationPrompt: input.generationPrompt,
          usedReferences: input.usedReferences,
          storageKey: "00000000-0000-4000-8000-000000000099.png",
          mimeType: "image/png",
        };
      },
    } as never,
    {
      async put() {
        return { key: "00000000-0000-4000-8000-000000000099.png" };
      },
    } as never,
    {
      async generateText(request: { purpose: string; user: string }) {
        if (request.user.includes("APPROVED CREATIVE BRIEF")) {
          return {
            text: JSON.stringify({
              prompt: "Editorial portrait of a platform engineer in a quiet office, no overlay text.",
            }),
            model: "fake-text",
          };
        }
        return {
          text: JSON.stringify({
            communicationObjective: "Show practical authority",
            coreIdea: "Operational contract",
            subject: "Recognizable engineer",
            visualMetaphor: "Quiet systems",
            environment: "Daylit office",
            composition: "Editorial cover",
            subjectPlacement: "Left third",
            wardrobe: "Simple knit",
            cameraFraming: "Medium close",
            cameraPerspective: "Eye level",
            lighting: "Soft window light",
            mood: "Calm confidence",
            colorDirection: "Warm paper tones",
            backgroundHierarchy: "Soft tools behind",
            negativeSpace: "Right side open",
            optionalHeadline: "",
            thingsToAvoid: ["Holograms"],
            aspectRatio: "1:1",
          }),
          model: "fake-text",
        };
      },
    },
    {
      async generateImage(request: { prompt: string; references: unknown[] }) {
        receivedPrompt = request.prompt;
        receivedRefs = request.references.length;
        assert.doesNotMatch(request.prompt, new RegExp(body.slice(20, 70)));
        return { bytes: Buffer.from("png"), mimeType: "image/png", model: "fake-image" };
      },
    },
  );

  const image = await service.generate();
  assert.equal(image.usedReferences, true);
  assert.match(receivedPrompt, /Editorial portrait/);
  assert.equal(receivedRefs, 1);
});

test("malformed brief JSON is not persisted", async () => {
  const service = new ImageService(
    {
      async getProfile() {
        return profile();
      },
      async listReferenceImages() {
        return [];
      },
    } as never,
    { async getLatest() { return post(); } } as never,
    {
      async create() {
        assert.fail("malformed brief must not be persisted");
      },
    } as never,
    {
      async put() {
        assert.fail("malformed brief must not be stored");
      },
    } as never,
    {
      async generateText() {
        return { text: '{"nope":true}', model: "fake" };
      },
    },
    {
      async generateImage() {
        assert.fail("must not generate an image from a malformed brief");
      },
    },
  );

  await assert.rejects(
    () => service.generate(),
    (error: unknown) =>
      error instanceof AppError && error.code === ERROR_CODES.MALFORMED_AI_OUTPUT,
  );
});

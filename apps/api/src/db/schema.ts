import {
  boolean,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import type {
  FactReview,
  ImageBrief,
  OpportunityPayload,
  PersonaPayload,
  QualityScore,
  SeoReview,
  StoryStrategy,
  WritingReview,
} from "@studio/shared";

export const profiles = pgTable("profiles", {
  id: uuid("id").primaryKey(),
  fullName: text("full_name").notNull().default(""),
  headline: text("headline").notNull().default(""),
  currentJobTitle: text("current_job_title").notNull().default(""),
  currentCompany: text("current_company").notNull().default(""),
  about: text("about").notNull().default(""),
  topSkills: jsonb("top_skills").$type<string[]>().notNull().default([]),
  technologies: jsonb("technologies").$type<string[]>().notNull().default([]),
  industries: jsonb("industries").$type<string[]>().notNull().default([]),
  yearsOfExperience: integer("years_of_experience"),
  architectureExperience: text("architecture_experience").notNull().default(""),
  leadershipExperience: text("leadership_experience").notNull().default(""),
  businessImpact: text("business_impact").notNull().default(""),
  subjectsOfInterest: jsonb("subjects_of_interest").$type<string[]>().notNull().default([]),
  subjectsToAvoid: jsonb("subjects_to_avoid").$type<string[]>().notNull().default([]),
  targetAudience: text("target_audience").notNull().default(""),
  preferredLanguage: text("preferred_language").notNull().default("English"),
  positioning: jsonb("positioning").$type<string[]>().notNull().default([]),
  desiredPerception: text("desired_perception").notNull().default(""),
  writingTones: jsonb("writing_tones").$type<string[]>().notNull().default([]),
  postLength: text("post_length").notNull().default("MEDIUM"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const professionalExperiences = pgTable("professional_experiences", {
  id: uuid("id").primaryKey(),
  profileId: uuid("profile_id")
    .notNull()
    .references(() => profiles.id, { onDelete: "cascade" }),
  role: text("role").notNull().default(""),
  company: text("company").notNull().default(""),
  startPeriod: text("start_period").notNull().default(""),
  endPeriod: text("end_period").notNull().default(""),
  description: text("description").notNull().default(""),
  responsibilities: text("responsibilities").notNull().default(""),
  achievements: text("achievements").notNull().default(""),
  technologies: jsonb("technologies").$type<string[]>().notNull().default([]),
  measurableOutcomes: text("measurable_outcomes").notNull().default(""),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const writingSamples = pgTable("writing_samples", {
  id: uuid("id").primaryKey(),
  profileId: uuid("profile_id")
    .notNull()
    .references(() => profiles.id, { onDelete: "cascade" }),
  body: text("body").notNull().default(""),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const uploadedPhotos = pgTable("uploaded_photos", {
  id: uuid("id").primaryKey(),
  profileId: uuid("profile_id")
    .notNull()
    .references(() => profiles.id, { onDelete: "cascade" }),
  storageKey: text("storage_key").notNull(),
  mimeType: text("mime_type").notNull(),
  sizeBytes: integer("size_bytes").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const professionalPersonas = pgTable("professional_personas", {
  id: uuid("id").primaryKey(),
  profileId: uuid("profile_id")
    .notNull()
    .references(() => profiles.id, { onDelete: "cascade" }),
  payload: jsonb("payload").$type<PersonaPayload>().notNull(),
  model: text("model").notNull(),
  promptVersion: text("prompt_version").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const researchRuns = pgTable("research_runs", {
  id: uuid("id").primaryKey(),
  profileId: uuid("profile_id")
    .notNull()
    .references(() => profiles.id, { onDelete: "cascade" }),
  personaId: uuid("persona_id")
    .notNull()
    .references(() => professionalPersonas.id, { onDelete: "cascade" }),
  queryTopics: jsonb("query_topics").$type<string[]>().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const newsArticles = pgTable("news_articles", {
  id: uuid("id").primaryKey(),
  runId: uuid("run_id")
    .notNull()
    .references(() => researchRuns.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  description: text("description").notNull().default(""),
  source: text("source").notNull(),
  url: text("url").notNull(),
  publishedAt: timestamp("published_at", { withTimezone: true }).notNull(),
  topics: jsonb("topics").$type<string[]>().notNull().default([]),
  provider: text("provider").notNull(),
  providerArticleId: text("provider_article_id").notNull(),
});

export const opportunitySets = pgTable("opportunity_sets", {
  id: uuid("id").primaryKey(),
  profileId: uuid("profile_id")
    .notNull()
    .references(() => profiles.id, { onDelete: "cascade" }),
  researchRunId: uuid("research_run_id")
    .notNull()
    .references(() => researchRuns.id, { onDelete: "cascade" }),
  personaId: uuid("persona_id")
    .notNull()
    .references(() => professionalPersonas.id, { onDelete: "cascade" }),
  promptVersion: text("prompt_version").notNull(),
  model: text("model").notNull(),
  selectedOpportunityId: uuid("selected_opportunity_id"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const contentOpportunities = pgTable("content_opportunities", {
  id: uuid("id").primaryKey(),
  setId: uuid("set_id")
    .notNull()
    .references(() => opportunitySets.id, { onDelete: "cascade" }),
  articleId: uuid("article_id")
    .notNull()
    .references(() => newsArticles.id, { onDelete: "cascade" }),
  payload: jsonb("payload").$type<OpportunityPayload>().notNull(),
  matchScore: integer("match_score").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const generatedPosts = pgTable("generated_posts", {
  id: uuid("id").primaryKey(),
  profileId: uuid("profile_id")
    .notNull()
    .references(() => profiles.id, { onDelete: "cascade" }),
  opportunityId: uuid("opportunity_id")
    .notNull()
    .references(() => contentOpportunities.id, { onDelete: "cascade" }),
  promptVersion: text("prompt_version").notNull(),
  model: text("model").notNull(),
  tone: text("tone").notNull(),
  angle: text("angle").notNull(),
  hook: text("hook").notNull(),
  body: text("body").notNull(),
  storyStrategy: jsonb("story_strategy").$type<StoryStrategy>().notNull(),
  writingReview: jsonb("writing_review").$type<WritingReview>().notNull(),
  factReview: jsonb("fact_review").$type<FactReview>().notNull(),
  seoReview: jsonb("seo_review").$type<SeoReview>().notNull(),
  quality: jsonb("quality").$type<QualityScore>().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const generatedImages = pgTable("generated_images", {
  id: uuid("id").primaryKey(),
  profileId: uuid("profile_id")
    .notNull()
    .references(() => profiles.id, { onDelete: "cascade" }),
  postId: uuid("post_id")
    .notNull()
    .references(() => generatedPosts.id, { onDelete: "cascade" }),
  promptVersion: text("prompt_version").notNull(),
  model: text("model").notNull(),
  brief: jsonb("brief").$type<ImageBrief>().notNull(),
  generationPrompt: text("generation_prompt").notNull(),
  usedReferences: boolean("used_references").notNull().default(false),
  storageKey: text("storage_key").notNull(),
  mimeType: text("mime_type").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

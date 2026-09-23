import type { ResearchRunPublic } from "@studio/shared";
import { notFound, validationError } from "../../app-error.js";
import type { PersonaService } from "../persona/persona-service.js";
import type { ProfileService } from "../profile/profile-service.js";
import { filterAndRankArticles } from "./article-filter.js";
import type { NewsProvider } from "./news-provider.js";
import type { ResearchRepository } from "./research-repository.js";
import { buildSearchTopics } from "./search-topics.js";

export class ResearchService {
  constructor(
    private readonly profiles: ProfileService,
    private readonly personas: PersonaService,
    private readonly research: ResearchRepository,
    private readonly news: NewsProvider,
    private readonly lookbackDays: number,
  ) {}

  async getLatest(): Promise<ResearchRunPublic | null> {
    const record = await this.research.getLatest();
    if (!record) {
      return null;
    }
    return this.toPublic(record);
  }

  async discover(): Promise<ResearchRunPublic> {
    const profile = await this.profiles.getProfile();
    const persona = await this.personas.getPersona();
    if (!profile || !persona) {
      throw notFound("Generate a persona before discovering topics.");
    }

    const queryTopics = buildSearchTopics(persona.persona);
    if (queryTopics.length === 0) {
      throw validationError(
        "The persona does not contain enough expertise terms to search for current events.",
      );
    }

    const from = new Date();
    from.setUTCDate(from.getUTCDate() - this.lookbackDays);

    const raw = await this.news.searchNews({
      topics: queryTopics,
      from,
      language: "en",
    });
    const articles = filterAndRankArticles(raw, queryTopics);
    const record = await this.research.create({
      personaId: persona.id,
      queryTopics,
      articles,
    });
    return this.toPublic(record);
  }

  private toPublic(
    record: NonNullable<Awaited<ReturnType<ResearchRepository["getLatest"]>>>,
  ): ResearchRunPublic {
    const articles = [...record.articles].sort(
      (left, right) => right.publishedAt.getTime() - left.publishedAt.getTime(),
    );
    return {
      id: record.run.id,
      createdAt: record.run.createdAt.toISOString(),
      queryTopics: record.run.queryTopics,
      emptyReason: articles.length === 0 ? "NO_RELEVANT_TOPICS" : null,
      articles: articles.map((article) => ({
        id: article.id,
        title: article.title,
        description: article.description,
        source: article.source,
        url: article.url,
        publishedAt: article.publishedAt.toISOString(),
        topics: article.topics,
      })),
    };
  }
}

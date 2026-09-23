import { providerUnavailable } from "../../app-error.js";
import { isHttpUrl } from "./article-filter.js";
import type {
  NewsProvider,
  NewsSearchQuery,
  NormalizedNewsArticle,
} from "./news-provider.js";

export const PREFERRED_NEWS_DOMAINS = [
  "github.blog",
  "kubernetes.io",
  "aws.amazon.com",
  "cloud.google.com",
  "azure.microsoft.com",
  "openai.com",
  "postgresql.org",
  "go.dev",
  "nodejs.org",
  "thenewstack.io",
  "infoq.com",
  "arstechnica.com",
  "techcrunch.com",
  "martinfowler.com",
  "react.dev",
  "blog.vuejs.org",
  "nextjs.org",
];

type NewsApiRawArticle = {
  title?: string | null;
  description?: string | null;
  url?: string | null;
  publishedAt?: string | null;
  source?: { name?: string | null } | null;
};

type NewsApiResponse = {
  status?: string;
  code?: string;
  message?: string;
  articles?: NewsApiRawArticle[];
};

export function normalizeNewsApiArticle(
  raw: NewsApiRawArticle,
  queryTopics: string[],
): NormalizedNewsArticle | null {
  const title = raw.title?.trim() ?? "";
  const url = raw.url?.trim() ?? "";
  const source = raw.source?.name?.trim() ?? "";
  const publishedAt = raw.publishedAt ? new Date(raw.publishedAt) : new Date(NaN);
  if (!title || !source || !isHttpUrl(url) || Number.isNaN(publishedAt.getTime())) {
    return null;
  }

  return {
    title,
    description: raw.description?.trim() ?? "",
    source,
    url,
    publishedAt,
    topics: queryTopics,
    provider: "newsapi",
    providerArticleId: url,
  };
}

export class NewsApiNewsProvider implements NewsProvider {
  constructor(
    private readonly apiKey: string,
    private readonly fetchImpl: typeof fetch = fetch,
  ) {}

  async searchNews(query: NewsSearchQuery): Promise<NormalizedNewsArticle[]> {
    if (!this.apiKey) {
      throw providerUnavailable("News discovery is not configured. Set NEWS_API_KEY and retry.");
    }

    const withDomains = await this.request(query, true);
    if (withDomains.length > 0) {
      return withDomains;
    }
    return this.request(query, false);
  }

  private async request(
    query: NewsSearchQuery,
    preferDomains: boolean,
  ): Promise<NormalizedNewsArticle[]> {
    const url = new URL("https://newsapi.org/v2/everything");
    url.searchParams.set("q", toNewsQuery(query.topics));
    url.searchParams.set("from", query.from.toISOString().slice(0, 10));
    url.searchParams.set("sortBy", "publishedAt");
    url.searchParams.set("pageSize", "30");
    url.searchParams.set("language", query.language ?? "en");
    if (preferDomains) {
      url.searchParams.set("domains", PREFERRED_NEWS_DOMAINS.join(","));
    }

    let response: Response;
    try {
      response = await this.fetchImpl(url, {
        headers: { "X-Api-Key": this.apiKey },
        signal: AbortSignal.timeout(15_000),
      });
    } catch {
      throw providerUnavailable("The news provider is unavailable.");
    }

    let body: NewsApiResponse;
    try {
      body = (await response.json()) as NewsApiResponse;
    } catch {
      throw providerUnavailable("The news provider returned an unreadable response.");
    }

    if (!response.ok || body.status === "error") {
      if (response.status === 401 || body.code === "apiKeyInvalid") {
        throw providerUnavailable("The news provider rejected the credentials.", 502);
      }
      if (response.status === 429 || body.code === "rateLimited") {
        throw providerUnavailable("The news provider is rate-limited. Retry in a moment.");
      }
      throw providerUnavailable("The news provider is unavailable.");
    }

    return (body.articles ?? [])
      .map((article) => normalizeNewsApiArticle(article, query.topics))
      .filter((article): article is NormalizedNewsArticle => article !== null);
  }
}

export function toNewsQuery(topics: string[]): string {
  const clauses = topics
    .map((topic) => topic.trim().replaceAll('"', ""))
    .filter(Boolean)
    .map((topic) => {
      const words = topic.split(/\s+/).filter(Boolean);
      if (words.length <= 3) {
        return `"${topic}"`;
      }
      return `(${words.join(" AND ")})`;
    });
  return clauses.join(" OR ").slice(0, 500);
}

import assert from "node:assert/strict";
import test from "node:test";
import { filterAndRankArticles } from "./article-filter.ts";
import type { NormalizedNewsArticle } from "./news-provider.ts";

const article = (
  overrides: Partial<NormalizedNewsArticle>,
): NormalizedNewsArticle => ({
  title: "Generic headline",
  description: "Something happened",
  source: "Example",
  url: "https://example.com/a",
  publishedAt: new Date("2026-08-10"),
  topics: ["Kubernetes"],
  provider: "newsapi",
  providerArticleId: "https://example.com/a",
  ...overrides,
});

test("drops zero-overlap and invalid articles", () => {
  const kept = filterAndRankArticles(
    [
      article({
        title: "Celebrity news",
        url: "https://example.com/celeb",
        providerArticleId: "https://example.com/celeb",
      }),
      article({
        title: "Kubernetes 1.32 released",
        url: "https://kubernetes.io/blog",
        providerArticleId: "https://kubernetes.io/blog",
      }),
      article({
        title: "Broken",
        url: "ftp://not-web",
        providerArticleId: "ftp",
      }),
    ],
    ["Kubernetes"],
  );

  assert.equal(kept.length, 1);
  assert.match(kept[0]?.title ?? "", /Kubernetes/);
});

test("matches a concrete article against a long persona topic", () => {
  const kept = filterAndRankArticles(
    [
      article({
        title: "React 19 is now stable",
        description: "The React team released a new version.",
        url: "https://react.dev/blog/react-19",
        providerArticleId: "https://react.dev/blog/react-19",
      }),
    ],
    ["React.js", "TypeScript"],
  );
  assert.equal(kept.length, 1);
});

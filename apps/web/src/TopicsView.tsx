import { useEffect, useState } from "react";
import type { ResearchRunPublic } from "@studio/shared";
import { discoverResearch, fetchResearch, type ApiError } from "./api";
import { useI18n } from "./i18n";

export function TopicsView() {
  const { m, t, dateLocale } = useI18n();
  const [research, setResearch] = useState<ResearchRunPublic | null>(null);
  const [status, setStatus] = useState<"loading" | "idle" | "discovering">("loading");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchResearch()
      .then((existing) => {
        if (!cancelled) {
          setResearch(existing);
          setStatus("idle");
        }
      })
      .catch((err: ApiError) => {
        if (!cancelled) {
          setError(err.message);
          setStatus("idle");
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  async function discover() {
    setError(null);
    setStatus("discovering");
    try {
      setResearch(await discoverResearch());
    } catch (err) {
      setError((err as ApiError).message);
    } finally {
      setStatus("idle");
    }
  }

  if (status === "loading") {
    return <p className="empty">{m.topics.loading}</p>;
  }

  return (
    <div>
      <p className="lede">{m.topics.lede}</p>
      {error ? <div className="error">{error}</div> : null}
      {research?.queryTopics.length ? (
        <p className="eyebrow">{t("topics.search", { topics: research.queryTopics.join(" · ") })}</p>
      ) : null}

      {status === "discovering" ? <p className="empty">{m.topics.discovering}</p> : null}

      {research && status !== "discovering" && research.articles.length > 0 ? (
        <div className="article-list">
          {research.articles.map((article) => (
            <article className="article-card" key={article.id}>
              <p className="eyebrow">
                {article.source} · {new Date(article.publishedAt).toLocaleDateString(dateLocale)}
              </p>
              <h3>
                <a href={article.url} target="_blank" rel="noreferrer">
                  {article.title}
                </a>
              </h3>
              {article.description ? <p>{article.description}</p> : null}
            </article>
          ))}
        </div>
      ) : null}

      {status === "idle" && research?.emptyReason === "NO_RELEVANT_TOPICS" ? (
        <p className="empty">{m.topics.emptyRelevant}</p>
      ) : null}

      {status === "idle" && !research ? <p className="empty">{m.topics.empty}</p> : null}

      <div className="actions">
        <button
          className="btn primary"
          type="button"
          disabled={status === "discovering"}
          onClick={() => void discover()}
        >
          {research ? m.topics.discoverAgain : m.topics.discover}
        </button>
      </div>
    </div>
  );
}

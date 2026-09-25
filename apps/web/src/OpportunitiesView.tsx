import { useEffect, useState } from "react";
import type { OpportunitySetPublic } from "@studio/shared";
import {
  fetchOpportunities,
  generateOpportunities,
  selectOpportunity,
  type ApiError,
} from "./api";
import { useI18n } from "./i18n";

export function OpportunitiesView({ onContinue }: { onContinue: () => void }) {
  const { m, t } = useI18n();
  const [set, setSet] = useState<OpportunitySetPublic | null>(null);
  const [status, setStatus] = useState<"loading" | "idle" | "generating" | "selecting">(
    "loading",
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchOpportunities()
      .then((existing) => {
        if (!cancelled) {
          setSet(existing);
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

  async function generate() {
    setError(null);
    setStatus("generating");
    try {
      setSet(await generateOpportunities());
    } catch (err) {
      setError((err as ApiError).message);
    } finally {
      setStatus("idle");
    }
  }

  async function select(id: string) {
    setError(null);
    setStatus("selecting");
    try {
      setSet(await selectOpportunity(id));
    } catch (err) {
      setError((err as ApiError).message);
    } finally {
      setStatus("idle");
    }
  }

  if (status === "loading") {
    return <p className="empty">{m.opportunities.loading}</p>;
  }

  return (
    <div>
      <p className="lede">{m.opportunities.lede}</p>
      {error ? <div className="error">{error}</div> : null}

      {status === "generating" ? <p className="empty">{m.opportunities.generating}</p> : null}

      {set && status !== "generating" && set.opportunities.length > 0 ? (
        <div className="article-list">
          {set.opportunities.map((opportunity) => (
            <article
              className={opportunity.selected ? "article-card selected" : "article-card"}
              key={opportunity.id}
            >
              <p className="eyebrow">{opportunity.article.source}</p>
              <div className="tags">
                <span className="tag">{m.opportunities.angles[opportunity.payload.angle]}</span>
                <span className="tag">
                  {t("opportunities.match", { score: opportunity.matchScore })}
                </span>
              </div>
              <h3>{opportunity.payload.topic}</h3>
              <p>
                <a href={opportunity.article.url} target="_blank" rel="noreferrer">
                  {opportunity.article.title}
                </a>
              </p>
              <p>
                <strong>{m.opportunities.whyFits}</strong> {opportunity.payload.whyItFits}
              </p>
              <p>
                <strong>{m.opportunities.whyAudience}</strong> {opportunity.payload.audienceCare}
              </p>
              <p>
                <strong>{m.opportunities.thesis}</strong> {opportunity.payload.thesis}
              </p>
              <p>
                <strong>{m.opportunities.evidence}</strong> {opportunity.payload.evidence.join(" · ")}
              </p>
              <p>
                <strong>{m.opportunities.risk}</strong> {opportunity.payload.credibilityRisk}
              </p>
              <button
                className={opportunity.selected ? "btn selected" : "btn ghost"}
                type="button"
                disabled={status === "selecting"}
                onClick={() => void select(opportunity.id)}
              >
                {opportunity.selected ? m.opportunities.selected : m.opportunities.choose}
              </button>
            </article>
          ))}
        </div>
      ) : null}

      {status === "idle" && set?.emptyReason === "NO_RELEVANT_TOPICS" ? (
        <p className="empty">{m.opportunities.emptyRelevant}</p>
      ) : null}

      {status === "idle" && !set ? <p className="empty">{m.opportunities.empty}</p> : null}

      <div className="actions">
        <button
          className="btn primary"
          type="button"
          disabled={status === "generating"}
          onClick={() => void generate()}
        >
          {set ? m.opportunities.regenerate : m.opportunities.generate}
        </button>
        {set?.selectedOpportunityId ? (
          <button className="btn ghost" type="button" onClick={onContinue}>
            {m.opportunities.continueWrite}
          </button>
        ) : null}
      </div>
    </div>
  );
}

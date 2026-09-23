import { useEffect, useState } from "react";
import type { PersonaPublic } from "@studio/shared";
import { fetchPersona, generatePersona, type ApiError } from "./api";
import { useI18n } from "./i18n";

export function PersonaView() {
  const { m } = useI18n();
  const [persona, setPersona] = useState<PersonaPublic | null>(null);
  const [status, setStatus] = useState<"loading" | "idle" | "generating">("loading");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchPersona()
      .then((existing) => {
        if (!cancelled) {
          setPersona(existing);
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
      setPersona(await generatePersona());
    } catch (err) {
      setError((err as ApiError).message);
    } finally {
      setStatus("idle");
    }
  }

  if (status === "loading") {
    return <p className="empty">{m.persona.loading}</p>;
  }

  return (
    <div>
      <p className="lede">{m.persona.lede}</p>
      {error ? <div className="error">{error}</div> : null}
      {persona?.evidenceWarning ? <div className="notice">{persona.evidenceWarning}</div> : null}
      {persona?.stale ? <div className="notice">{m.persona.stale}</div> : null}

      {status === "generating" ? <p className="empty">{m.persona.generating}</p> : null}

      {persona && status !== "generating" ? <PersonaResult persona={persona} /> : null}

      {!persona && status === "idle" ? <p className="empty">{m.persona.empty}</p> : null}

      <div className="actions">
        <button
          className="btn primary"
          type="button"
          disabled={status === "generating"}
          onClick={() => void generate()}
        >
          {persona ? m.persona.regenerate : m.persona.generate}
        </button>
      </div>
    </div>
  );
}

function PersonaResult({ persona }: { persona: PersonaPublic }) {
  const { m } = useI18n();
  const body = persona.persona;
  return (
    <div className="persona-result">
      <h3>{body.positioningStatement}</h3>
      <p className="lede">{body.careerNarrative}</p>
      <p className="eyebrow">
        {body.seniority} · {persona.model} · {persona.promptVersion}
      </p>

      <div className="grid-2">
        <Fact label={m.persona.coreExpertise} values={body.coreExpertise} />
        <Fact label={m.persona.supportingExpertise} values={body.supportingExpertise} />
        <Fact label={m.persona.contentPillars} values={body.contentPillars} />
        <Fact label={m.persona.differentiators} values={body.differentiators} />
      </div>

      <p>
        <strong>{m.persona.technicalDepth}.</strong> {body.technicalDepth}
      </p>
      <p>
        <strong>{m.persona.leadership}.</strong> {body.leadershipExposure}
      </p>
      <p>
        <strong>{m.persona.audience}.</strong> {body.targetAudience}
      </p>
      <p>
        <strong>{m.persona.perception}.</strong> {body.desiredPerception}
      </p>

      {body.proofPoints.length > 0 ? (
        <div>
          <h3>{m.persona.proofPoints}</h3>
          <ul className="promise-list">
            {body.proofPoints.map((point) => (
              <li key={point.claim}>
                <strong>{point.claim}</strong> — {point.evidence}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="bands">
        <Band title={m.persona.strong} tone="strong" items={body.strongAuthorityTopics} />
        <Band title={m.persona.credible} tone="credible" items={body.credibleTopics} />
        <Band title={m.persona.adjacent} tone="adjacent" items={body.adjacentTopics} />
        <Band title={m.persona.risky} tone="risky" items={body.riskyTopics} />
      </div>
    </div>
  );
}

function Fact({ label, values }: { label: string; values: string[] }) {
  const { m } = useI18n();
  return (
    <div className="field">
      <strong>{label}</strong>
      <div className="tags">
        {values.length === 0 ? <span className="empty">{m.persona.noneEvidence}</span> : null}
        {values.map((value) => (
          <span className="tag" key={value}>
            {value}
          </span>
        ))}
      </div>
    </div>
  );
}

function Band({
  title,
  tone,
  items,
}: {
  title: string;
  tone: "strong" | "credible" | "adjacent" | "risky";
  items: Array<{ topic: string; evidence: string }>;
}) {
  const { m } = useI18n();
  return (
    <section className={`band ${tone}`}>
      <strong>{title}</strong>
      {items.length === 0 ? <p className="empty">{m.common.none}</p> : null}
      {items.map((item) => (
        <p key={item.topic}>
          {item.topic}
          <br />
          <span className="eyebrow">{item.evidence}</span>
        </p>
      ))}
    </section>
  );
}

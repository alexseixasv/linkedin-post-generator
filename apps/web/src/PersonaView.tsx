import { useEffect, useState, type ReactNode } from "react";
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
      <p className="eyebrow">
        {body.seniority} · {persona.model} · {persona.promptVersion}
      </p>

      <div className="disclosures">
        <Disclosure title={m.persona.narrative}>
          <p>{body.careerNarrative}</p>
        </Disclosure>
        <Disclosure title={m.persona.coreExpertise} count={body.coreExpertise.length}>
          <TagList values={body.coreExpertise} empty={m.persona.noneEvidence} />
        </Disclosure>
        <Disclosure title={m.persona.supportingExpertise} count={body.supportingExpertise.length}>
          <TagList values={body.supportingExpertise} empty={m.persona.noneEvidence} />
        </Disclosure>
        <Disclosure title={m.persona.contentPillars} count={body.contentPillars.length}>
          <TagList values={body.contentPillars} empty={m.persona.noneEvidence} />
        </Disclosure>
        <Disclosure title={m.persona.differentiators} count={body.differentiators.length}>
          <TagList values={body.differentiators} empty={m.persona.noneEvidence} />
        </Disclosure>
        <Disclosure title={m.persona.technicalDepth}>
          <p>{body.technicalDepth}</p>
        </Disclosure>
        <Disclosure title={m.persona.leadership}>
          <p>{body.leadershipExposure}</p>
        </Disclosure>
        <Disclosure title={m.persona.audience}>
          <p>{body.targetAudience}</p>
        </Disclosure>
        <Disclosure title={m.persona.perception}>
          <p>{body.desiredPerception}</p>
        </Disclosure>
        <Disclosure title={m.persona.proofPoints} count={body.proofPoints.length}>
          <TopicList
            items={body.proofPoints.map((point) => ({ topic: point.claim, evidence: point.evidence }))}
            empty={m.common.none}
          />
        </Disclosure>
      </div>

      <p className="eyebrow disclosure-group">{m.persona.authorityMap}</p>
      <div className="disclosures">
        <Disclosure title={m.persona.strong} count={body.strongAuthorityTopics.length} tone="strong">
          <TopicList items={body.strongAuthorityTopics} empty={m.common.none} />
        </Disclosure>
        <Disclosure title={m.persona.credible} count={body.credibleTopics.length} tone="credible">
          <TopicList items={body.credibleTopics} empty={m.common.none} />
        </Disclosure>
        <Disclosure title={m.persona.adjacent} count={body.adjacentTopics.length} tone="adjacent">
          <TopicList items={body.adjacentTopics} empty={m.common.none} />
        </Disclosure>
        <Disclosure title={m.persona.risky} count={body.riskyTopics.length} tone="risky">
          <TopicList items={body.riskyTopics} empty={m.common.none} />
        </Disclosure>
      </div>
    </div>
  );
}

function Disclosure({
  title,
  count,
  tone,
  children,
}: {
  title: string;
  count?: number;
  tone?: "strong" | "credible" | "adjacent" | "risky";
  children: ReactNode;
}) {
  return (
    <details className={tone ? `disclosure ${tone}` : "disclosure"}>
      <summary>
        {tone ? <span className="pip" aria-hidden="true" /> : null}
        <span>{title}</span>
        {count !== undefined ? <span className="disclosure-count">{count}</span> : null}
        <Chevron />
      </summary>
      <div className="disclosure-body">{children}</div>
    </details>
  );
}

function Chevron() {
  return (
    <svg className="chevron" viewBox="0 0 16 16" aria-hidden="true">
      <path
        d="M4 6.5 8 10.5 12 6.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TagList({ values, empty }: { values: string[]; empty: string }) {
  if (values.length === 0) {
    return <p className="empty">{empty}</p>;
  }
  return (
    <div className="tags">
      {values.map((value) => (
        <span className="tag" key={value}>
          {value}
        </span>
      ))}
    </div>
  );
}

function TopicList({
  items,
  empty,
}: {
  items: Array<{ topic: string; evidence: string }>;
  empty: string;
}) {
  if (items.length === 0) {
    return <p className="empty">{empty}</p>;
  }
  return (
    <ul className="promise-list">
      {items.map((item) => (
        <li key={item.topic}>
          <strong>{item.topic}</strong> — {item.evidence}
        </li>
      ))}
    </ul>
  );
}

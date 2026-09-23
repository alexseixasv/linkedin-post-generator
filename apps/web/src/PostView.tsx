import { useEffect, useState } from "react";
import {
  ANGLE_TYPES,
  WRITING_TONES,
  type AngleType,
  type PostPublic,
  type WritingTone,
} from "@studio/shared";
import {
  changePostAngle,
  changePostTone,
  fetchPost,
  generateAlternativeHook,
  generatePost,
  rewritePostSection,
  type ApiError,
} from "./api";
import { useI18n } from "./i18n";

export function PostView() {
  const { m, t } = useI18n();
  const [post, setPost] = useState<PostPublic | null>(null);
  const [status, setStatus] = useState<"loading" | "idle" | "generating">("loading");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [tone, setTone] = useState<WritingTone>(WRITING_TONES[0]);
  const [angle, setAngle] = useState<AngleType>(ANGLE_TYPES[0]);
  const [section, setSection] = useState("");
  const [stage, setStage] = useState(m.post.stages[0]);

  useEffect(() => {
    let cancelled = false;
    fetchPost()
      .then((existing) => {
        if (!cancelled) {
          setPost(existing);
          if (existing) {
            setTone(existing.tone);
            setAngle(existing.angle);
          }
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

  useEffect(() => {
    if (status !== "generating") {
      return;
    }
    let index = 0;
    setStage(m.post.stages[0]);
    const timer = window.setInterval(() => {
      index = (index + 1) % m.post.stages.length;
      setStage(m.post.stages[index] ?? m.post.stages[0]);
    }, 2400);
    return () => window.clearInterval(timer);
  }, [status, m.post.stages]);

  async function run(action: () => Promise<PostPublic>) {
    setError(null);
    setCopied(false);
    setStatus("generating");
    setStage(m.post.stages[0]);
    try {
      const next = await action();
      setPost(next);
      setTone(next.tone);
      setAngle(next.angle);
    } catch (err) {
      setError((err as ApiError).message);
    } finally {
      setStatus("idle");
    }
  }

  async function copy() {
    if (!post) {
      return;
    }
    await navigator.clipboard.writeText(post.body);
    setCopied(true);
  }

  if (status === "loading") {
    return <p className="empty">{m.post.loading}</p>;
  }

  return (
    <div>
      <p className="lede">{m.post.lede}</p>
      {error ? <div className="error">{error}</div> : null}

      {status === "generating" ? <p className="empty">{stage}</p> : null}

      {post && status !== "generating" ? (
        <div className="post-result">
          <p className="eyebrow">
            {m.opportunities.angles[post.angle]} · {m.writing.tones[post.tone]} ·{" "}
            {t("post.score", { score: post.quality.score })}
          </p>
          <p className="post-body">{post.body}</p>
          <p>
            {m.post.source}{" "}
            <a href={post.sourceUrl} target="_blank" rel="noreferrer">
              {post.sourceTitle}
            </a>
          </p>

          <div className="bands">
            <div className="band strong">
              <p className="eyebrow">{m.post.story}</p>
              <p>{post.storyStrategy.structure}</p>
              <p>{post.storyStrategy.takeaway}</p>
            </div>
            <div className="band">
              <p className="eyebrow">{m.post.quality}</p>
              <p className="score">{post.quality.score}</p>
              <p>{post.quality.explanation}</p>
            </div>
          </div>

          <div className="band">
            <p className="eyebrow">{m.post.writingReview}</p>
            <p>{post.writingReview.summary}</p>
          </div>
          <div className="band">
            <p className="eyebrow">{m.post.factReview}</p>
            <p>{post.factReview.summary}</p>
            {post.factReview.unsupportedClaims.length > 0 ? (
              <p>
                <strong>{m.post.heldBack}</strong> {post.factReview.unsupportedClaims.join(" · ")}
              </p>
            ) : null}
          </div>
          <div className="band">
            <p className="eyebrow">{m.post.seo}</p>
            <p>{post.seoReview.summary}</p>
            <p>{post.seoReview.stuffingRisk}</p>
          </div>
        </div>
      ) : null}

      {status === "idle" && !post ? <p className="empty">{m.post.empty}</p> : null}

      <div className="actions">
        <button
          className="btn primary"
          type="button"
          disabled={status === "generating"}
          onClick={() => void run(generatePost)}
        >
          {post ? m.post.regenerate : m.post.write}
        </button>
        {post ? (
          <button className="btn ghost" type="button" onClick={() => void copy()}>
            {copied ? m.post.copied : m.post.copy}
          </button>
        ) : null}
      </div>

      {post && status !== "generating" ? (
        <div className="post-edits">
          <div className="actions">
            <button
              className="btn ghost"
              type="button"
              onClick={() => void run(generateAlternativeHook)}
            >
              {m.post.altHook}
            </button>
          </div>
          <div className="grid-2">
            <label className="field">
              {m.post.tone}
              <select value={tone} onChange={(event) => setTone(event.target.value as WritingTone)}>
                {WRITING_TONES.map((item) => (
                  <option key={item} value={item}>
                    {m.writing.tones[item]}
                  </option>
                ))}
              </select>
            </label>
            <label className="field">
              {m.post.angle}
              <select value={angle} onChange={(event) => setAngle(event.target.value as AngleType)}>
                {ANGLE_TYPES.map((item) => (
                  <option key={item} value={item}>
                    {m.opportunities.angles[item]}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="actions">
            <button
              className="btn ghost"
              type="button"
              onClick={() => void run(() => changePostTone(tone))}
            >
              {m.post.applyTone}
            </button>
            <button
              className="btn ghost"
              type="button"
              onClick={() => void run(() => changePostAngle(angle))}
            >
              {m.post.applyAngle}
            </button>
          </div>
          <label className="field full">
            {m.post.rewriteLabel}
            <textarea value={section} onChange={(event) => setSection(event.target.value)} />
          </label>
          <button
            className="btn ghost"
            type="button"
            disabled={!section.trim()}
            onClick={() => void run(() => rewritePostSection(section))}
          >
            {m.post.rewrite}
          </button>
        </div>
      ) : null}
    </div>
  );
}

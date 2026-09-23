import { useEffect, useState } from "react";
import type { GeneratedImagePublic } from "@studio/shared";
import { fetchImage, generateImage, type ApiError } from "./api";
import { useI18n } from "./i18n";

export function ImageView() {
  const { m } = useI18n();
  const [image, setImage] = useState<GeneratedImagePublic | null>(null);
  const [status, setStatus] = useState<"loading" | "idle" | "generating">("loading");
  const [error, setError] = useState<string | null>(null);
  const [stage, setStage] = useState(m.image.stages[0]);

  useEffect(() => {
    let cancelled = false;
    fetchImage()
      .then((existing) => {
        if (!cancelled) {
          setImage(existing);
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
    setStage(m.image.stages[0]);
    const timer = window.setInterval(() => {
      index = (index + 1) % m.image.stages.length;
      setStage(m.image.stages[index] ?? m.image.stages[0]);
    }, 2400);
    return () => window.clearInterval(timer);
  }, [status, m.image.stages]);

  async function generate() {
    setError(null);
    setStatus("generating");
    setStage(m.image.stages[0]);
    try {
      setImage(await generateImage());
    } catch (err) {
      setError((err as ApiError).message);
    } finally {
      setStatus("idle");
    }
  }

  if (status === "loading") {
    return <p className="empty">{m.image.loading}</p>;
  }

  return (
    <div>
      <p className="lede">{m.image.lede}</p>
      {error ? <div className="error">{error}</div> : null}
      {status === "generating" ? <p className="empty">{stage}</p> : null}

      {image && status !== "generating" ? (
        <div className="image-result">
          <img className="generated-image" src={image.url} alt={image.brief.coreIdea} />
          <p className="eyebrow">
            {image.usedReferences ? m.image.usedRefs : m.image.noRefs} · {image.brief.aspectRatio}
          </p>
          <div className="band">
            <p className="eyebrow">{m.image.brief}</p>
            <p>{image.brief.communicationObjective}</p>
            <p>{image.brief.coreIdea}</p>
            <p>
              {image.brief.subject} · {image.brief.environment}
            </p>
            {image.brief.optionalHeadline ? <p>{image.brief.optionalHeadline}</p> : null}
          </div>
        </div>
      ) : null}

      {status === "idle" && !image ? <p className="empty">{m.image.empty}</p> : null}

      <div className="actions">
        <button
          className="btn primary"
          type="button"
          disabled={status === "generating"}
          onClick={() => void generate()}
        >
          {image ? m.image.retry : m.image.generate}
        </button>
      </div>
    </div>
  );
}

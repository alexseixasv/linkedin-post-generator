import { useEffect, useState } from "react";
import type { GeneratedImagePublic } from "@studio/shared";
import { fetchImage, generateImage, type ApiError } from "./api";

const GENERATING_COPY = [
  "Art-directing a supporting image…",
  "Turning the brief into a generation prompt…",
  "Rendering the image…",
];

export function ImageView() {
  const [image, setImage] = useState<GeneratedImagePublic | null>(null);
  const [status, setStatus] = useState<"loading" | "idle" | "generating">("loading");
  const [error, setError] = useState<string | null>(null);
  const [stage, setStage] = useState(GENERATING_COPY[0]);

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
    const timer = window.setInterval(() => {
      index = (index + 1) % GENERATING_COPY.length;
      setStage(GENERATING_COPY[index] ?? GENERATING_COPY[0]);
    }, 2400);
    return () => window.clearInterval(timer);
  }, [status]);

  async function generate() {
    setError(null);
    setStatus("generating");
    setStage(GENERATING_COPY[0]);
    try {
      setImage(await generateImage());
    } catch (err) {
      setError((err as ApiError).message);
    } finally {
      setStatus("idle");
    }
  }

  if (status === "loading") {
    return <p className="empty">Loading image…</p>;
  }

  return (
    <div>
      <p className="lede">
        The image is art-directed from a brief, not pasted from the post. Retrying it will not
        rewrite the copy.
      </p>
      {error ? <div className="error">{error}</div> : null}
      {status === "generating" ? <p className="empty">{stage}</p> : null}

      {image && status !== "generating" ? (
        <div className="image-result">
          <img className="generated-image" src={image.url} alt={image.brief.coreIdea} />
          <p className="eyebrow">
            {image.usedReferences ? "Reference photos were used" : "No reference photos"} ·{" "}
            {image.brief.aspectRatio}
          </p>
          <div className="band">
            <p className="eyebrow">Creative brief</p>
            <p>{image.brief.communicationObjective}</p>
            <p>{image.brief.coreIdea}</p>
            <p>
              {image.brief.subject} · {image.brief.environment}
            </p>
            {image.brief.optionalHeadline ? <p>{image.brief.optionalHeadline}</p> : null}
          </div>
        </div>
      ) : null}

      {status === "idle" && !image ? (
        <p className="empty">No supporting image yet. Generate one from the current post.</p>
      ) : null}

      <div className="actions">
        <button
          className="btn primary"
          type="button"
          disabled={status === "generating"}
          onClick={() => void generate()}
        >
          {image ? "Retry image" : "Generate image"}
        </button>
      </div>
    </div>
  );
}

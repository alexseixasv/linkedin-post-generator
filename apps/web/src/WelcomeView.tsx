import { useI18n } from "./i18n";

export function WelcomeView({ onStart }: { onStart: () => void }) {
  const { m } = useI18n();

  return (
    <section className="welcome">
      <div className="hero-copy">
        <p className="eyebrow">{m.welcome.eyebrow}</p>
        <h1>{m.welcome.title}</h1>
        <p className="lede">{m.welcome.lede}</p>
        <div className="hero-actions">
          <button className="btn primary" type="button" onClick={onStart}>
            {m.welcome.cta}
          </button>
        </div>
      </div>

      <div className="welcome-block">
        <p className="eyebrow">{m.welcome.journeyEyebrow}</p>
        <h2>{m.welcome.journeyTitle}</h2>
        <ol className="journey-grid">
          {m.welcome.steps.map((step, index) => (
            <li className="journey-card" key={step.title}>
              <span className="journey-num">{String(index + 1).padStart(2, "0")}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>
      </div>

      <div className="welcome-block">
        <p className="eyebrow">{m.welcome.promisesEyebrow}</p>
        <h2>{m.welcome.promisesTitle}</h2>
        <div className="promise-grid">
          {m.welcome.promises.map((promise) => (
            <article className="promise-card" key={promise.title}>
              <h3>{promise.title}</h3>
              <p>{promise.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

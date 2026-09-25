import { useEffect, useState, type ReactNode } from "react";
import {
  POSITIONING_OPTIONS,
  POST_LENGTHS,
  WRITING_TONES,
  type ProfileInput,
  type ProfilePublic,
} from "@studio/shared";
import { ImageView } from "./ImageView";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { OpportunitiesView } from "./OpportunitiesView";
import { PersonaView } from "./PersonaView";
import { PostView } from "./PostView";
import { TopicsView } from "./TopicsView";
import { WelcomeView } from "./WelcomeView";
import { useI18n, type Messages } from "./i18n";
import { matchTerm, sameTerm, termLabel, type LocalizedTerm } from "./suggestions/localized";
import { LINKEDIN_INDUSTRIES } from "./suggestions/linkedin-industries";
import {
  AUDIENCES,
  audienceLabel,
  audienceValue,
  interestIdentity,
  interestLabel,
  parseAudienceValue,
  selectedIncludes,
  suggestedInterests,
} from "./suggestions/positioning-topics";
import { SKILL_SUGGESTIONS } from "./suggestions/skills";
import { TECHNOLOGY_SUGGESTIONS } from "./suggestions/technologies";
import {
  deletePhoto,
  emptyProfile,
  fetchProfile,
  saveProfile,
  uploadPhoto,
  type ApiError,
} from "./api";

const STEPS = [
  { id: "welcome" },
  { id: "identity" },
  { id: "experience" },
  { id: "positioning" },
  { id: "writing" },
  { id: "photos" },
  { id: "persona" },
  { id: "topics" },
  { id: "opportunities" },
  { id: "post" },
  { id: "image" },
] as const;

type StepId = (typeof STEPS)[number]["id"];

export function App() {
  const { m } = useI18n();
  const [step, setStep] = useState<StepId>("welcome");
  const [profile, setProfile] = useState<ProfileInput>(emptyProfile);
  const [saved, setSaved] = useState<ProfilePublic | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "saving" | "uploading">("loading");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchProfile()
      .then((existing) => {
        if (cancelled) return;
        if (existing) {
          setSaved(existing);
          setProfile(existing);
        }
        setStatus("idle");
      })
      .catch((err: ApiError) => {
        if (cancelled) return;
        setError(err.message);
        setStatus("idle");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const stepIndex = STEPS.findIndex((item) => item.id === step);
  const panel = panelCopy(step, m);

  async function persist(nextStep?: StepId) {
    setError(null);
    setStatus("saving");
    try {
      const result = await saveProfile(profile);
      setSaved(result);
      setProfile({ ...result });
      if (nextStep) setStep(nextStep);
    } catch (err) {
      setError((err as ApiError).message);
    } finally {
      setStatus("idle");
    }
  }

  async function onUpload(file: File) {
    setError(null);
    setStatus("uploading");
    try {
      await saveProfile(profile);
      const result = await uploadPhoto(file);
      setSaved(result);
      setProfile({ ...result });
    } catch (err) {
      setError((err as ApiError).message);
    } finally {
      setStatus("idle");
    }
  }

  async function onRemovePhoto(id: string) {
    setError(null);
    try {
      const result = await deletePhoto(id);
      setSaved(result);
      setProfile({ ...result });
    } catch (err) {
      setError((err as ApiError).message);
    }
  }

  return (
    <div className="shell">
      <header className="topbar">
        <button className="brand" type="button" onClick={() => setStep("welcome")}>
          {m.common.brandLead} <span>{m.common.brandAccent}</span>
        </button>
        <div className="topbar-end">
          <p className="eyebrow">{m.common.tagline}</p>
          <LanguageSwitcher />
        </div>
      </header>

      {step === "welcome" ? (
        <WelcomeView onStart={() => setStep("identity")} />
      ) : (
        <section className="panel">
          <p className="eyebrow">{panel.eyebrow}</p>
          <h2>{panel.title}</h2>
          <nav className="steps" aria-label={m.steps.nav}>
            {STEPS.filter((item) => item.id !== "welcome").map((item) => (
              <button
                key={item.id}
                className={item.id === step ? "step active" : "step"}
                onClick={() => setStep(item.id)}
                type="button"
              >
                {m.steps[item.id]}
              </button>
            ))}
          </nav>

          {error ? <div className="error">{error}</div> : null}
          {saved?.evidenceWarning &&
          step !== "persona" &&
          step !== "topics" &&
          step !== "opportunities" &&
          step !== "post" &&
          step !== "image" ? (
            <div className="notice">{saved.evidenceWarning}</div>
          ) : null}

          {step === "identity" ? (
            <IdentityForm profile={profile} onChange={setProfile} />
          ) : null}
          {step === "experience" ? (
            <ExperienceForm profile={profile} onChange={setProfile} />
          ) : null}
          {step === "positioning" ? (
            <PositioningForm profile={profile} onChange={setProfile} />
          ) : null}
          {step === "writing" ? (
            <WritingForm profile={profile} onChange={setProfile} />
          ) : null}
          {step === "photos" ? (
            <PhotoForm
              photos={saved?.photos ?? []}
              onUpload={onUpload}
              onRemove={onRemovePhoto}
              uploading={status === "uploading"}
            />
          ) : null}
          {step === "persona" ? <PersonaView /> : null}
          {step === "topics" ? <TopicsView /> : null}
          {step === "opportunities" ? (
            <OpportunitiesView onContinue={() => setStep("post")} />
          ) : null}
          {step === "post" ? <PostView /> : null}
          {step === "image" ? <ImageView /> : null}

          {step !== "persona" &&
          step !== "topics" &&
          step !== "opportunities" &&
          step !== "post" &&
          step !== "image" ? (
            <div className="actions">
              <button
                className="btn ghost"
                type="button"
                onClick={() => setStep(STEPS[Math.max(0, stepIndex - 1)]?.id ?? "welcome")}
              >
                {m.common.back}
              </button>
              <div>
                <p className="status">
                  {status === "saving"
                    ? m.status.saving
                    : status === "loading"
                      ? m.status.loadingProfile
                      : saved
                        ? m.status.saved
                        : m.status.notSaved}
                </p>
              </div>
              {step === "photos" ? (
                <button className="btn primary" type="button" onClick={() => persist("persona")}>
                  {m.common.saveContinue}
                </button>
              ) : (
                <button
                  className="btn primary"
                  type="button"
                  disabled={status === "saving"}
                  onClick={() => persist(STEPS[stepIndex + 1]?.id)}
                >
                  {m.common.saveContinue}
                </button>
              )}
            </div>
          ) : (
            <div className="actions">
              <button
                className="btn ghost"
                type="button"
                onClick={() =>
                  setStep(
                    step === "image"
                      ? "post"
                      : step === "post"
                        ? "opportunities"
                        : step === "opportunities"
                          ? "topics"
                          : step === "topics"
                            ? "persona"
                            : "photos",
                  )
                }
              >
                {m.common.back}
              </button>
              {step === "persona" ? (
                <button className="btn primary" type="button" onClick={() => setStep("topics")}>
                  {m.nav.continueTopics}
                </button>
              ) : null}
              {step === "topics" ? (
                <button
                  className="btn primary"
                  type="button"
                  onClick={() => setStep("opportunities")}
                >
                  {m.nav.continueAngles}
                </button>
              ) : null}
              {step === "post" ? (
                <button className="btn primary" type="button" onClick={() => setStep("image")}>
                  {m.nav.continueImage}
                </button>
              ) : null}
            </div>
          )}
        </section>
      )}
    </div>
  );
}

function IdentityForm({
  profile,
  onChange,
}: {
  profile: ProfileInput;
  onChange: (profile: ProfileInput) => void;
}) {
  const { m } = useI18n();
  return (
    <div className="grid-2">
      <Field label={m.identity.fullName}>
        <input
          value={profile.fullName}
          onChange={(event) => onChange({ ...profile, fullName: event.target.value })}
        />
      </Field>
      <Field label={m.identity.headline}>
        <input
          value={profile.headline}
          onChange={(event) => onChange({ ...profile, headline: event.target.value })}
        />
      </Field>
      <Field label={m.identity.currentTitle}>
        <input
          value={profile.currentJobTitle}
          onChange={(event) => onChange({ ...profile, currentJobTitle: event.target.value })}
        />
      </Field>
      <Field label={m.identity.currentCompany}>
        <input
          value={profile.currentCompany}
          onChange={(event) => onChange({ ...profile, currentCompany: event.target.value })}
        />
      </Field>
      <Field label={m.identity.years}>
        <input
          type="number"
          min={0}
          max={60}
          value={profile.yearsOfExperience ?? ""}
          onChange={(event) =>
            onChange({
              ...profile,
              yearsOfExperience: event.target.value === "" ? null : Number(event.target.value),
            })
          }
        />
      </Field>
      <Field label={m.identity.preferredLanguage}>
        <input
          value={profile.preferredLanguage}
          onChange={(event) => onChange({ ...profile, preferredLanguage: event.target.value })}
        />
      </Field>
      <Field className="full" label={m.identity.about}>
        <textarea
          value={profile.about}
          onChange={(event) => onChange({ ...profile, about: event.target.value })}
        />
      </Field>
      <Field className="full" label={m.identity.topSkills} hint={m.identity.topSkillsHint}>
        <TagInput
          values={profile.topSkills}
          suggestions={SKILL_SUGGESTIONS}
          placeholder={m.identity.searchPlaceholder}
          onChange={(topSkills) => onChange({ ...profile, topSkills })}
        />
      </Field>
      <Field className="full" label={m.identity.technologies} hint={m.identity.technologiesHint}>
        <TagInput
          values={profile.technologies}
          suggestions={TECHNOLOGY_SUGGESTIONS}
          placeholder={m.identity.searchPlaceholder}
          onChange={(technologies) => onChange({ ...profile, technologies })}
        />
      </Field>
      <Field className="full" label={m.identity.industries} hint={m.identity.industriesHint}>
        <TagInput
          values={profile.industries}
          suggestions={LINKEDIN_INDUSTRIES}
          allowCustom={false}
          placeholder={m.identity.industryPlaceholder}
          onChange={(industries) => onChange({ ...profile, industries })}
        />
      </Field>
    </div>
  );
}

function ExperienceForm({
  profile,
  onChange,
}: {
  profile: ProfileInput;
  onChange: (profile: ProfileInput) => void;
}) {
  const { m } = useI18n();
  return (
    <div>
      {profile.experiences.length === 0 ? <p className="empty">{m.experience.empty}</p> : null}
      {profile.experiences.map((experience, index) => (
        <article className="experience-card" key={experience.id ?? index}>
          <div className="grid-2">
            <Field label={m.experience.role}>
              <input
                value={experience.role}
                onChange={(event) =>
                  updateExperience(profile, onChange, index, { role: event.target.value })
                }
              />
            </Field>
            <Field label={m.experience.company}>
              <input
                value={experience.company}
                onChange={(event) =>
                  updateExperience(profile, onChange, index, { company: event.target.value })
                }
              />
            </Field>
            <Field label={m.experience.start}>
              <MonthYearSelect
                value={monthValue(experience.startPeriod)}
                max={currentMonth()}
                onChange={(startPeriod) =>
                  updateExperience(profile, onChange, index, { startPeriod })
                }
              />
            </Field>
            <div className="field">
              <span>{m.experience.end}</span>
              <MonthYearSelect
                value={monthValue(experience.endPeriod)}
                min={monthValue(experience.startPeriod) || undefined}
                max={currentMonth()}
                disabled={experience.endPeriod === PRESENT_PERIOD}
                onChange={(endPeriod) => updateExperience(profile, onChange, index, { endPeriod })}
              />
              <label className="period-current">
                <input
                  type="checkbox"
                  checked={experience.endPeriod === PRESENT_PERIOD}
                  onChange={(event) =>
                    updateExperience(profile, onChange, index, {
                      endPeriod: event.target.checked ? PRESENT_PERIOD : "",
                    })
                  }
                />
                {m.experience.current}
              </label>
            </div>
            <Field className="full" label={m.experience.description} hint={m.experience.descriptionHint}>
              <textarea
                className="role-description"
                value={roleDescription(experience)}
                onChange={(event) =>
                  updateExperience(profile, onChange, index, {
                    description: event.target.value,
                    achievements: "",
                  })
                }
              />
            </Field>
            <Field className="full" label={m.experience.roleTech} hint={m.experience.roleTechHint}>
              <TagInput
                values={experience.technologies}
                suggestions={TECHNOLOGY_SUGGESTIONS}
                featured={stackSuggestions(profile.technologies)}
                placeholder={m.identity.searchPlaceholder}
                onChange={(technologies) =>
                  updateExperience(profile, onChange, index, { technologies })
                }
              />
            </Field>
          </div>
          <button
            className="btn ghost"
            type="button"
            onClick={() =>
              onChange({
                ...profile,
                experiences: profile.experiences.filter((_, itemIndex) => itemIndex !== index),
              })
            }
          >
            {m.experience.removeRole}
          </button>
        </article>
      ))}
      <button
        className="btn ghost"
        type="button"
        onClick={() =>
          onChange({
            ...profile,
            experiences: [
              ...profile.experiences,
              {
                role: "",
                company: "",
                startPeriod: "",
                endPeriod: "",
                description: "",
                responsibilities: "",
                achievements: "",
                technologies: [],
                measurableOutcomes: "",
              },
            ],
          })
        }
      >
        {m.experience.add}
      </button>
    </div>
  );
}

function PositioningForm({
  profile,
  onChange,
}: {
  profile: ProfileInput;
  onChange: (profile: ProfileInput) => void;
}) {
  const { m, locale } = useI18n();
  const audience = parseAudienceValue(profile.targetAudience);
  const interests = suggestedInterests(profile.positioning, audience.known, profile.subjectsOfInterest);
  const visibleInterestIds = new Set(interests.map((item) => item.en));
  const customInterests = profile.subjectsOfInterest.filter(
    (value) => !visibleInterestIds.has(interestIdentity(value)),
  );
  const hasAudienceOrPosition = profile.positioning.length > 0 || audience.known.length > 0;
  return (
    <div>
      <div className="field">
        <span>{m.positioning.perception}</span>
        <div className="pills">
          {POSITIONING_OPTIONS.map((option) => {
            const selected = profile.positioning.includes(option);
            const positioning = selected
              ? profile.positioning.filter((item) => item !== option)
              : [...profile.positioning, option];
            return (
              <button
                key={option}
                type="button"
                className={selected ? "pill selected" : "pill"}
                onClick={() =>
                  onChange({
                    ...profile,
                    positioning,
                    desiredPerception: positioning.join(", "),
                  })
                }
              >
                {m.positioning.options[option]}
              </button>
            );
          })}
        </div>
      </div>
      <div className="field">
        <span>{m.positioning.audience}</span>
        <div className="pills">
          {AUDIENCES.map((option) => {
            const selected = audience.known.includes(option.en);
            const known = selected
              ? audience.known.filter((item) => item !== option.en)
              : [...audience.known, option.en];
            return (
              <button
                key={option.en}
                type="button"
                className={selected ? "pill selected" : "pill"}
                onClick={() =>
                  onChange({
                    ...profile,
                    targetAudience: audienceValue(known, audience.custom),
                  })
                }
              >
                {audienceLabel(option.en, locale)}
              </button>
            );
          })}
          {audience.custom.map((value) => (
            <button
              key={value}
              type="button"
              className="pill selected"
              onClick={() =>
                onChange({
                  ...profile,
                  targetAudience: audienceValue(
                    audience.known,
                    audience.custom.filter((item) => item !== value),
                  ),
                })
              }
            >
              {value}
            </button>
          ))}
        </div>
      </div>
      <div className="field">
        <span>{m.positioning.interest}</span>
        <span className="field-hint">
          {hasAudienceOrPosition ? m.positioning.interestHint : m.positioning.interestEmpty}
        </span>
        <div className="pills">
          {interests.map((option) => {
            const selected = selectedIncludes(profile.subjectsOfInterest, option);
            return (
              <button
                key={option.en}
                type="button"
                className={selected ? "pill selected" : "pill"}
                onClick={() =>
                  onChange({
                    ...profile,
                    subjectsOfInterest: selected
                      ? profile.subjectsOfInterest.filter((value) => interestIdentity(value) !== option.en)
                      : [...profile.subjectsOfInterest, option.en].slice(0, 30),
                  })
                }
              >
                {interestLabel(option.en, locale)}
              </button>
            );
          })}
          {customInterests.map((value) => (
            <button
              key={value}
              type="button"
              className="pill selected"
              onClick={() =>
                onChange({
                  ...profile,
                  subjectsOfInterest: profile.subjectsOfInterest.filter((item) => item !== value),
                })
              }
            >
              {interestLabel(value, locale)}
            </button>
          ))}
        </div>
      </div>
      <Field label={m.positioning.avoid}>
        <TagInput
          values={profile.subjectsToAvoid}
          onChange={(subjectsToAvoid) => onChange({ ...profile, subjectsToAvoid })}
        />
      </Field>
    </div>
  );
}

function WritingForm({
  profile,
  onChange,
}: {
  profile: ProfileInput;
  onChange: (profile: ProfileInput) => void;
}) {
  const { m } = useI18n();
  return (
    <div>
      <Field label={m.writing.tone}>
        <div className="pills">
          {WRITING_TONES.map((tone) => {
            const selected = profile.writingTones.includes(tone);
            return (
              <button
                key={tone}
                type="button"
                className={selected ? "pill selected" : "pill"}
                onClick={() =>
                  onChange({
                    ...profile,
                    writingTones: selected
                      ? profile.writingTones.filter((item) => item !== tone)
                      : [...profile.writingTones, tone].slice(0, 4),
                  })
                }
              >
                {m.writing.tones[tone]}
              </button>
            );
          })}
        </div>
      </Field>
      <Field label={m.writing.length}>
        <div className="pills">
          {POST_LENGTHS.map((length) => (
            <button
              key={length}
              type="button"
              className={profile.postLength === length ? "pill selected" : "pill"}
              onClick={() => onChange({ ...profile, postLength: length })}
            >
              {m.writing.lengths[length]}
            </button>
          ))}
        </div>
      </Field>
      <Field label={m.writing.sample}>
        <textarea
          value={profile.writingSamples[0]?.body ?? ""}
          onChange={(event) =>
            onChange({
              ...profile,
              writingSamples: event.target.value ? [{ body: event.target.value }] : [],
            })
          }
        />
      </Field>
    </div>
  );
}

function PhotoForm({
  photos,
  onUpload,
  onRemove,
  uploading,
}: {
  photos: NonNullable<ProfilePublic["photos"]>;
  onUpload: (file: File) => Promise<void>;
  onRemove: (id: string) => Promise<void>;
  uploading: boolean;
}) {
  const { m } = useI18n();
  return (
    <div>
      <p className="lede">{m.photos.lede}</p>
      <div className="photos">
        {photos.map((photo) => (
          <div className="photo-card" key={photo.id}>
            <img src={photo.url} alt={m.photos.alt} />
            <button className="btn ghost" type="button" onClick={() => onRemove(photo.id)}>
              {m.photos.remove}
            </button>
          </div>
        ))}
        {photos.length < 3 ? (
          <label className="photo-card photo-add">
            {uploading ? m.photos.uploading : m.photos.add}
            <input
              type="file"
              accept="image/png,image/jpeg,image/webp"
              hidden
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) void onUpload(file);
                event.target.value = "";
              }}
            />
          </label>
        ) : null}
      </div>
    </div>
  );
}

function Field({
  label,
  hint,
  children,
  className,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label className={className ? `field ${className}` : "field"}>
      {label}
      {hint ? <span className="field-hint">{hint}</span> : null}
      {children}
    </label>
  );
}

function dedupeTerms(terms: readonly LocalizedTerm[]) {
  const seen = new Set<string>();
  return terms.filter((term) => {
    const key = term.en.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function stackSuggestions(values: string[]): LocalizedTerm[] {
  const seen = new Set<string>();
  const terms: LocalizedTerm[] = [];
  for (const value of values) {
    const known = matchTerm(value, TECHNOLOGY_SUGGESTIONS) ?? sameTerm(value);
    const key = known.en.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    terms.push(known);
  }
  return terms;
}

const PRESENT_PERIOD = "present";

function currentMonth() {
  const today = new Date();
  return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}`;
}

function monthValue(value: string) {
  return /^\d{4}-\d{2}$/.test(value) ? value : "";
}

function parsePeriod(value: string) {
  const match = /^(\d{4})-(\d{2})$/.exec(value);
  if (!match) return { year: "", month: "" };
  return { year: match[1] ?? "", month: match[2] ?? "" };
}

function periodAllowed(year: string, month: string, min: string | undefined, max: string | undefined) {
  if (!year || !month) return true;
  const stamp = `${year}-${month}`;
  if (min && stamp < min) return false;
  if (max && stamp > max) return false;
  return true;
}

function MonthYearSelect({
  value,
  onChange,
  disabled,
  min,
  max,
}: {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  min?: string;
  max?: string;
}) {
  const { dateLocale, m } = useI18n();
  const parsed = parsePeriod(value);
  const [month, setMonth] = useState(parsed.month);
  const [year, setYear] = useState(parsed.year);

  useEffect(() => {
    setMonth(parsed.month);
    setYear(parsed.year);
  }, [parsed.month, parsed.year]);

  const today = new Date();
  const maxYear = max ? Number(max.slice(0, 4)) : today.getFullYear();
  const minYear = min ? Number(min.slice(0, 4)) : today.getFullYear() - 60;
  const years =
    maxYear >= minYear
      ? Array.from({ length: maxYear - minYear + 1 }, (_, index) => String(maxYear - index))
      : [];
  const months = Array.from({ length: 12 }, (_, index) => String(index + 1).padStart(2, "0")).filter((item) =>
    periodAllowed(year, item, min, max),
  );

  function commit(nextMonth: string, nextYear: string) {
    const monthOk = !nextMonth || periodAllowed(nextYear, nextMonth, min, max);
    const resolvedMonth = monthOk ? nextMonth : "";
    setMonth(resolvedMonth);
    setYear(nextYear);
    if (resolvedMonth && nextYear) onChange(`${nextYear}-${resolvedMonth}`);
    else if (!resolvedMonth && !nextYear) onChange("");
  }

  return (
    <div className="period-row">
      <select
        aria-label={m.experience.month}
        disabled={disabled}
        value={month}
        onChange={(event) => commit(event.target.value, year)}
      >
        <option value="">{m.experience.month}</option>
        {months.map((item) => {
          const name = new Intl.DateTimeFormat(dateLocale, { month: "long" }).format(
            new Date(2020, Number(item) - 1, 1),
          );
          return (
            <option key={item} value={item}>
              {name.charAt(0).toLocaleUpperCase(dateLocale) + name.slice(1)}
            </option>
          );
        })}
      </select>
      <select
        aria-label={m.experience.year}
        disabled={disabled}
        value={year}
        onChange={(event) => commit(month, event.target.value)}
      >
        <option value="">{m.experience.year}</option>
        {years.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
}

function roleDescription(experience: ProfileInput["experiences"][number]) {
  const description = experience.description.trim();
  const achievements = experience.achievements.trim();
  if (!achievements || description.includes(achievements)) return experience.description;
  if (!description) return experience.achievements;
  return `${experience.description}\n\n${experience.achievements}`;
}

function TagInput({
  values,
  onChange,
  suggestions,
  featured,
  allowCustom = true,
  placeholder,
}: {
  values: string[];
  onChange: (values: string[]) => void;
  suggestions?: readonly LocalizedTerm[];
  featured?: readonly LocalizedTerm[];
  allowCustom?: boolean;
  placeholder?: string;
}) {
  const { locale, m } = useI18n();
  const [draft, setDraft] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const unique = values;
  const query = draft.trim().toLowerCase();

  function isTaken(term: LocalizedTerm) {
    return unique.some((value) => matchTerm(value, [term]));
  }

  function labelFor(value: string) {
    if (!suggestions) return value;
    return matchTerm(value, suggestions)?.[locale] ?? value;
  }

  const catalog = suggestions
    ? dedupeTerms([...(featured ?? []), ...suggestions])
    : [];
  const matches =
    query.length > 0
      ? catalog
          .filter((item) => !isTaken(item))
          .filter((item) => `${item.en} ${item.pt} ${item.es}`.toLowerCase().includes(query))
          .slice(0, 8)
      : (featured ?? []).filter((item) => !isTaken(item)).slice(0, 8);
  const showList = open && suggestions !== undefined && (query.length > 0 || matches.length > 0);

  function addValue(next: string) {
    const value = next.trim();
    if (!value || unique.some((item) => labelFor(item).toLowerCase() === value.toLowerCase() || item.toLowerCase() === value.toLowerCase())) {
      setDraft("");
      setOpen(false);
      return;
    }
    onChange([...unique, value]);
    setDraft("");
    setOpen(false);
    setActive(0);
  }

  function addTerm(term: LocalizedTerm) {
    addValue(term.en);
  }

  function addDraft() {
    if (showList && matches[active]) {
      addTerm(matches[active]);
      return;
    }
    const exact = suggestions?.find(
      (item) => item.en.toLowerCase() === query || item.pt.toLowerCase() === query || item.es.toLowerCase() === query,
    );
    if (exact) {
      addTerm(exact);
      return;
    }
    if (allowCustom) addValue(draft);
  }

  return (
    <div>
      <div className="suggest">
        <div className="tag-row">
          <input
            value={draft}
            role="combobox"
            aria-expanded={showList}
            aria-autocomplete="list"
            onChange={(event) => {
              setDraft(event.target.value);
              setOpen(true);
              setActive(0);
            }}
            onFocus={() => setOpen(true)}
            onClick={() => setOpen(true)}
            onBlur={() => setOpen(false)}
            onKeyDown={(event) => {
              if (event.key === "ArrowDown" && matches.length > 0) {
                event.preventDefault();
                setOpen(true);
                setActive((index) => (index + 1) % matches.length);
                return;
              }
              if (event.key === "ArrowUp" && matches.length > 0) {
                event.preventDefault();
                setActive((index) => (index - 1 + matches.length) % matches.length);
                return;
              }
              if (event.key === "Escape") {
                setOpen(false);
                return;
              }
              if (event.key === "Enter") {
                event.preventDefault();
                addDraft();
              }
            }}
            placeholder={placeholder ?? m.identity.tagPlaceholder}
          />
          <button className="btn ghost" type="button" onClick={addDraft}>
            {m.common.add}
          </button>
        </div>
        {showList ? (
          <ul className="suggest-list" role="listbox">
            {matches.length === 0 ? <li className="suggest-empty">{m.identity.noMatches}</li> : null}
            {matches.map((item, index) => (
              <li key={item.en}>
                <button
                  type="button"
                  role="option"
                  aria-selected={index === active}
                  className={index === active ? "active" : undefined}
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => addTerm(item)}
                >
                  {termLabel(item, locale)}
                </button>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
      <div className="tags">
        {unique.map((value) => (
          <span className="tag" key={value}>
            {labelFor(value)}
            <button type="button" onClick={() => onChange(unique.filter((item) => item !== value))}>
              ×
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}

function panelCopy(step: StepId, messages: Messages) {
  switch (step) {
    case "persona":
      return messages.panel.persona;
    case "topics":
      return messages.panel.topics;
    case "opportunities":
      return messages.panel.opportunities;
    case "post":
      return messages.panel.post;
    case "image":
      return messages.panel.image;
    default:
      return messages.panel.profile;
  }
}

function updateExperience(
  profile: ProfileInput,
  onChange: (profile: ProfileInput) => void,
  index: number,
  patch: Partial<ProfileInput["experiences"][number]>,
) {
  onChange({
    ...profile,
    experiences: profile.experiences.map((experience, itemIndex) =>
      itemIndex === index ? { ...experience, ...patch } : experience,
    ),
  });
}

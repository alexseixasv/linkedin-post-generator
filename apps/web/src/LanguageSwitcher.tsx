import type { ReactNode } from "react";
import { useI18n, type Locale } from "./i18n";

export function LanguageSwitcher() {
  const { locale, setLocale, m } = useI18n();

  return (
    <div className="lang-switch" role="group" aria-label={m.language.switcher}>
      <FlagButton
        locale="en"
        current={locale}
        label={m.language.en}
        onSelect={setLocale}
      >
        <UsFlag />
      </FlagButton>
      <FlagButton
        locale="pt"
        current={locale}
        label={m.language.pt}
        onSelect={setLocale}
      >
        <BrFlag />
      </FlagButton>
      <FlagButton
        locale="es"
        current={locale}
        label={m.language.es}
        onSelect={setLocale}
      >
        <EsFlag />
      </FlagButton>
    </div>
  );
}

function FlagButton({
  locale,
  current,
  label,
  onSelect,
  children,
}: {
  locale: Locale;
  current: Locale;
  label: string;
  onSelect: (locale: Locale) => void;
  children: ReactNode;
}) {
  const selected = locale === current;
  return (
    <button
      type="button"
      className={selected ? "lang-btn active" : "lang-btn"}
      aria-label={label}
      aria-pressed={selected}
      title={label}
      onClick={() => onSelect(locale)}
    >
      {children}
    </button>
  );
}

function UsFlag() {
  return (
    <svg viewBox="0 0 22 15" aria-hidden="true">
      <rect width="22" height="15" fill="#bf0a30" />
      <rect y="1.15" width="22" height="1.15" fill="#fff" />
      <rect y="3.46" width="22" height="1.15" fill="#fff" />
      <rect y="5.77" width="22" height="1.15" fill="#fff" />
      <rect y="8.08" width="22" height="1.15" fill="#fff" />
      <rect y="10.38" width="22" height="1.15" fill="#fff" />
      <rect y="12.69" width="22" height="1.15" fill="#fff" />
      <rect width="9.2" height="8.08" fill="#002868" />
    </svg>
  );
}

function BrFlag() {
  return (
    <svg viewBox="0 0 22 15" aria-hidden="true">
      <rect width="22" height="15" fill="#009b3a" />
      <polygon points="11,2.1 19.6,7.5 11,12.9 2.4,7.5" fill="#fedd00" />
      <circle cx="11" cy="7.5" r="3" fill="#002776" />
    </svg>
  );
}

function EsFlag() {
  return (
    <svg viewBox="0 0 22 15" aria-hidden="true">
      <rect width="22" height="15" fill="#c60b1e" />
      <rect y="4" width="22" height="7" fill="#ffc400" />
    </svg>
  );
}

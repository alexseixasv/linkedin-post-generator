import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { en, type Messages } from "./locales/en";
import { es } from "./locales/es";
import { pt } from "./locales/pt";

export const LOCALES = ["en", "pt", "es"] as const;
export type Locale = (typeof LOCALES)[number];

const STORAGE_KEY = "studio.locale";
const DATE_LOCALES: Record<Locale, string> = {
  en: "en-US",
  pt: "pt-BR",
  es: "es-ES",
};

const catalog: Record<Locale, Messages> = { en, pt, es };

function isLocale(value: string | null): value is Locale {
  return value === "en" || value === "pt" || value === "es";
}

function detectLocale(): Locale {
  if (typeof window === "undefined") {
    return "en";
  }
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (isLocale(stored)) {
    return stored;
  }
  const language = window.navigator.language.toLowerCase();
  if (language.startsWith("pt")) return "pt";
  if (language.startsWith("es")) return "es";
  return "en";
}

function interpolate(template: string, vars?: Record<string, string | number>) {
  if (!vars) {
    return template;
  }
  return template.replace(/\{\{(\w+)\}\}/g, (_, key: string) => String(vars[key] ?? ""));
}

type I18nContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (path: string, vars?: Record<string, string | number>) => string;
  m: Messages;
  dateLocale: string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(detectLocale);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, locale);
    document.documentElement.lang = locale === "pt" ? "pt-BR" : locale === "es" ? "es" : "en";
    document.title = catalog[locale].common.documentTitle;
  }, [locale]);

  const value = useMemo<I18nContextValue>(() => {
    const messages = catalog[locale];
    return {
      locale,
      setLocale: setLocaleState,
      m: messages,
      dateLocale: DATE_LOCALES[locale],
      t(path, vars) {
        const found = path.split(".").reduce<unknown>((current, key) => {
          if (current && typeof current === "object" && key in current) {
            return (current as Record<string, unknown>)[key];
          }
          return undefined;
        }, messages);
        if (typeof found !== "string") {
          return path;
        }
        return interpolate(found, vars);
      },
    };
  }, [locale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export type { Messages };

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used inside I18nProvider");
  }
  return context;
}

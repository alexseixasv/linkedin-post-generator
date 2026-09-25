export type SuggestionLocale = "en" | "pt" | "es";

export type LocalizedTerm = {
  en: string;
  pt: string;
  es: string;
};

export function sameTerm(en: string): LocalizedTerm {
  return { en, pt: en, es: en };
}

export function matchTerm(value: string, terms: readonly LocalizedTerm[]) {
  const query = value.trim().toLowerCase();
  return terms.find(
    (term) =>
      term.en.toLowerCase() === query ||
      term.pt.toLowerCase() === query ||
      term.es.toLowerCase() === query,
  );
}

export function termLabel(term: LocalizedTerm, locale: SuggestionLocale) {
  return term[locale];
}

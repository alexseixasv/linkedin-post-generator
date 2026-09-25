import type { PositioningOption } from "@studio/shared";
import { matchTerm, type LocalizedTerm, type SuggestionLocale } from "./localized";

export const AUDIENCES = [
  { en: "Software Engineers", pt: "Engenheiros de software", es: "Ingenieros de software" },
  { en: "Engineering Managers", pt: "Gestores de engenharia", es: "Gerentes de ingeniería" },
  { en: "CTOs and VPs", pt: "CTOs e VPs", es: "CTOs y VPs" },
  { en: "Founders", pt: "Fundadores", es: "Fundadores" },
  { en: "Product Managers", pt: "Product managers", es: "Product managers" },
  { en: "Tech Recruiters", pt: "Recrutadores de tecnologia", es: "Reclutadores de tecnología" },
  { en: "Career Switchers", pt: "Quem muda de carreira", es: "Quienes cambian de carrera" },
  { en: "Data Professionals", pt: "Profissionais de dados", es: "Profesionales de datos" },
] as const satisfies readonly LocalizedTerm[];

type AudienceId = (typeof AUDIENCES)[number]["en"];

type InterestTopic = LocalizedTerm & {
  positioning: readonly PositioningOption[];
  audiences: readonly AudienceId[];
};

const MAX_SUGGESTED_INTERESTS = 18;

const INTEREST_TOPICS: readonly InterestTopic[] = [
  topic("System design", "Design de sistemas", "Diseño de sistemas", ["Technical Expert", "Architect", "Engineering Leader"], ["Software Engineers", "Engineering Managers", "CTOs and VPs"]),
  topic("API design", "Design de APIs", "Diseño de APIs", ["Technical Expert", "Architect"], ["Software Engineers"]),
  topic("Code quality", "Qualidade de código", "Calidad de código", ["Technical Expert", "Engineering Leader"], ["Software Engineers", "Engineering Managers"]),
  topic("Production debugging", "Depuração em produção", "Depuración en producción", ["Technical Expert"], ["Software Engineers"]),
  topic("Testing strategy", "Estratégia de testes", "Estrategia de pruebas", ["Technical Expert", "Engineering Leader"], ["Software Engineers", "Engineering Managers"]),
  topic("Software performance", "Performance de software", "Rendimiento de software", ["Technical Expert", "Architect", "Cloud Specialist"], ["Software Engineers"]),
  topic("Engineering management", "Gestão de engenharia", "Gestión de ingeniería", ["Engineering Leader"], ["Engineering Managers", "CTOs and VPs"]),
  topic("Hiring engineers", "Contratação de engenheiros", "Contratación de ingenieros", ["Engineering Leader", "Career Specialist", "Founder"], ["Engineering Managers", "CTOs and VPs", "Tech Recruiters", "Founders"]),
  topic("Team culture", "Cultura de time", "Cultura de equipo", ["Engineering Leader"], ["Engineering Managers"]),
  topic("Delivery and planning", "Entrega e planejamento", "Entrega y planificación", ["Engineering Leader", "Product Thinker"], ["Engineering Managers", "Product Managers"]),
  topic("Feedback and 1:1s", "Feedback e 1:1s", "Feedback y 1:1s", ["Engineering Leader"], ["Engineering Managers"]),
  topic("Technical strategy", "Estratégia técnica", "Estrategia técnica", ["Engineering Leader", "Architect"], ["CTOs and VPs", "Engineering Managers"]),
  topic("Shipping products", "Entregar produto", "Entregar producto", ["Builder", "Founder", "Product Thinker"], ["Software Engineers", "Founders", "Product Managers"]),
  topic("Side projects", "Projetos paralelos", "Proyectos paralelos", ["Builder", "Technology Influencer", "Educator"], ["Software Engineers", "Career Switchers"]),
  topic("MVP decisions", "Decisões de MVP", "Decisiones de MVP", ["Builder", "Founder", "Product Thinker"], ["Founders", "Product Managers"]),
  topic("Developer experience", "Experiência do desenvolvedor", "Experiencia del desarrollador", ["Builder", "Platform Specialist"], ["Software Engineers", "Engineering Managers"]),
  topic("Building in public", "Construir em público", "Construir en público", ["Builder", "Technology Influencer", "Educator"], ["Software Engineers", "Founders"]),
  topic("Software architecture", "Arquitetura de software", "Arquitectura de software", ["Architect", "Technical Expert"], ["Software Engineers", "CTOs and VPs", "Engineering Managers"]),
  topic("Distributed systems", "Sistemas distribuídos", "Sistemas distribuidos", ["Architect", "Technical Expert", "Platform Specialist"], ["Software Engineers", "CTOs and VPs"]),
  topic("Architecture trade-offs", "Trade-offs de arquitetura", "Trade-offs de arquitectura", ["Architect", "Engineering Leader"], ["CTOs and VPs", "Engineering Managers", "Software Engineers"]),
  topic("Domain modeling", "Modelagem de domínio", "Modelado de dominio", ["Architect", "Product Thinker", "Data Specialist"], ["Software Engineers", "Product Managers", "Data Professionals"]),
  topic("Teaching developers", "Ensinar desenvolvedores", "Enseñar a desarrolladores", ["Educator"], ["Software Engineers", "Career Switchers"]),
  topic("Learning in public", "Aprender em público", "Aprender en público", ["Educator", "Technology Influencer", "Career Specialist"], ["Career Switchers", "Software Engineers"]),
  topic("Technical writing", "Escrita técnica", "Escritura técnica", ["Educator", "Technology Influencer"], ["Software Engineers", "Engineering Managers"]),
  topic("Mentorship", "Mentoria", "Mentoría", ["Educator", "Engineering Leader", "Career Specialist"], ["Engineering Managers", "Career Switchers", "Software Engineers"]),
  topic("Explaining hard ideas", "Explicar ideias difíceis", "Explicar ideas difíciles", ["Educator", "Technology Influencer"], ["Software Engineers", "Career Switchers"]),
  topic("Building a startup", "Construir uma startup", "Construir una startup", ["Founder", "Builder"], ["Founders"]),
  topic("Founding as an engineer", "Fundar como pessoa técnica", "Fundar siendo técnico", ["Founder", "Architect"], ["Founders", "CTOs and VPs"]),
  topic("First engineering hires", "Primeiras contratações de engenharia", "Primeras contrataciones de ingeniería", ["Founder", "Engineering Leader"], ["Founders"]),
  topic("Applied AI", "IA aplicada", "IA aplicada", ["AI Specialist", "Technical Expert", "Technology Influencer"], ["Software Engineers", "Product Managers", "CTOs and VPs"]),
  topic("LLMs in production", "LLMs em produção", "LLMs en producción", ["AI Specialist", "Technical Expert"], ["Software Engineers", "Engineering Managers"]),
  topic("AI product decisions", "Decisões de produto com IA", "Decisiones de producto con IA", ["AI Specialist", "Product Thinker", "Founder"], ["Product Managers", "Founders", "CTOs and VPs"]),
  topic("Evaluating AI systems", "Avaliar sistemas de IA", "Evaluar sistemas de IA", ["AI Specialist", "Data Specialist"], ["Software Engineers", "Data Professionals"]),
  topic("AI workflow for engineers", "Fluxo de IA para engenheiros", "Flujo de IA para ingenieros", ["AI Specialist", "Educator", "Technology Influencer"], ["Software Engineers", "Career Switchers"]),
  topic("Data modeling", "Modelagem de dados", "Modelado de datos", ["Data Specialist", "Architect"], ["Data Professionals", "Software Engineers"]),
  topic("Metrics that matter", "Métricas que importam", "Métricas que importan", ["Data Specialist", "Product Thinker"], ["Data Professionals", "Product Managers"]),
  topic("Data platforms", "Plataformas de dados", "Plataformas de datos", ["Data Specialist", "Platform Specialist"], ["Data Professionals", "CTOs and VPs"]),
  topic("Data quality", "Qualidade de dados", "Calidad de datos", ["Data Specialist"], ["Data Professionals", "Engineering Managers"]),
  topic("Product discovery", "Descoberta de produto", "Descubrimiento de producto", ["Product Thinker", "Founder"], ["Product Managers", "Founders"]),
  topic("Prioritization", "Priorização", "Priorización", ["Product Thinker", "Engineering Leader"], ["Product Managers", "Engineering Managers", "Founders"]),
  topic("Product and engineering", "Produto e engenharia", "Producto e ingeniería", ["Product Thinker", "Engineering Leader"], ["Product Managers", "Engineering Managers"]),
  topic("Cloud architecture", "Arquitetura de cloud", "Arquitectura cloud", ["Cloud Specialist", "Architect"], ["Software Engineers", "CTOs and VPs"]),
  topic("Cloud cost", "Custo de cloud", "Costo de cloud", ["Cloud Specialist", "Engineering Leader"], ["CTOs and VPs", "Engineering Managers"]),
  topic("Reliability", "Confiabilidade", "Confiabilidad", ["Cloud Specialist", "Platform Specialist", "Technical Expert"], ["Software Engineers", "Engineering Managers"]),
  topic("Infrastructure as code", "Infraestrutura como código", "Infraestructura como código", ["Cloud Specialist", "Platform Specialist"], ["Software Engineers"]),
  topic("Platform engineering", "Engenharia de plataforma", "Ingeniería de plataforma", ["Platform Specialist", "Architect"], ["Software Engineers", "Engineering Managers", "CTOs and VPs"]),
  topic("Internal developer platform", "Plataforma interna de desenvolvedores", "Plataforma interna para desarrolladores", ["Platform Specialist"], ["Engineering Managers", "Software Engineers"]),
  topic("Developer productivity", "Produtividade de desenvolvedores", "Productividad de desarrolladores", ["Platform Specialist", "Engineering Leader"], ["Engineering Managers", "CTOs and VPs"]),
  topic("Tech careers", "Carreira em tecnologia", "Carrera en tecnología", ["Career Specialist", "Educator"], ["Career Switchers", "Software Engineers", "Tech Recruiters"]),
  topic("Interviews", "Entrevistas", "Entrevistas", ["Career Specialist"], ["Career Switchers", "Tech Recruiters", "Software Engineers"]),
  topic("Career growth", "Crescimento de carreira", "Crecimiento de carrera", ["Career Specialist", "Engineering Leader"], ["Software Engineers", "Engineering Managers", "Career Switchers"]),
  topic("Staff-plus path", "Caminho staff+", "Camino staff+", ["Career Specialist", "Engineering Leader"], ["Software Engineers", "Engineering Managers"]),
  topic("Tech trends", "Tendências de tecnologia", "Tendencias de tecnología", ["Technology Influencer", "AI Specialist"], ["Software Engineers", "Founders", "CTOs and VPs"]),
  topic("Building an audience", "Construir audiência", "Construir audiencia", ["Technology Influencer", "Educator"], ["Software Engineers", "Founders"]),
  topic("Content that teaches", "Conteúdo que ensina", "Contenido que enseña", ["Technology Influencer", "Educator"], ["Software Engineers", "Career Switchers"]),
  topic("Public technical opinions", "Opiniões técnicas em público", "Opiniones técnicas en público", ["Technology Influencer", "Technical Expert"], ["Software Engineers", "Engineering Managers"]),
  topic("Hiring signals", "Sinais de contratação", "Señales de contratación", ["Career Specialist", "Engineering Leader"], ["Tech Recruiters", "Engineering Managers"]),
  topic("Breaking into tech", "Entrar em tecnologia", "Entrar en tecnología", ["Career Specialist", "Educator"], ["Career Switchers"]),
  topic("Changing roles in tech", "Mudar de papel em tecnologia", "Cambiar de rol en tecnología", ["Career Specialist", "Educator"], ["Career Switchers", "Software Engineers"]),
];

function topic(
  en: string,
  pt: string,
  es: string,
  positioning: readonly PositioningOption[],
  audiences: readonly AudienceId[],
): InterestTopic {
  return { en, pt, es, positioning, audiences };
}

export function audienceLabel(value: string, locale: SuggestionLocale) {
  return matchTerm(value, AUDIENCES)?.[locale] ?? value;
}

export function parseAudienceValue(value: string): { known: string[]; custom: string[] } {
  const trimmed = value.trim();
  if (!trimmed) {
    return { known: [], custom: [] };
  }
  const parts = trimmed.split(", ").map((part) => part.trim()).filter(Boolean);
  const resolved = parts.map((part) => ({ part, en: matchTerm(part, AUDIENCES)?.en }));
  const known = resolved.flatMap((item) => (item.en ? [item.en] : []));
  if (known.length === parts.length) {
    return { known, custom: [] };
  }
  if (known.length === 0) {
    return { known: [], custom: [trimmed] };
  }
  return {
    known,
    custom: resolved.flatMap((item) => (item.en ? [] : [item.part])),
  };
}

export function audienceValue(known: readonly string[], custom: readonly string[]) {
  return [...known, ...custom].join(", ");
}

export function suggestedInterests(
  positioning: readonly string[],
  audiences: readonly string[],
  selected: readonly string[],
): InterestTopic[] {
  const ranked = INTEREST_TOPICS.map((item) => {
    const byPosition = item.positioning.some((option) => positioning.includes(option));
    const byAudience = item.audiences.some((option) => audiences.includes(option));
    return { item, score: (byPosition ? 1 : 0) + (byAudience ? 1 : 0) };
  })
    .filter((entry) => entry.score > 0 || selectedIncludes(selected, entry.item))
    .sort((left, right) => right.score - left.score);

  const visible: InterestTopic[] = [];
  for (const entry of ranked) {
    if (selectedIncludes(selected, entry.item) || visible.length < MAX_SUGGESTED_INTERESTS) {
      visible.push(entry.item);
    }
  }
  return visible;
}

export function interestIdentity(value: string) {
  return matchTerm(value, INTEREST_TOPICS)?.en ?? value;
}

export function interestLabel(value: string, locale: SuggestionLocale) {
  return matchTerm(value, INTEREST_TOPICS)?.[locale] ?? value;
}

export function selectedIncludes(selected: readonly string[], item: LocalizedTerm) {
  return selected.some((value) => interestIdentity(value) === item.en);
}

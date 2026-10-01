import type { Locale } from "@/shared/i18n/dictionaries";

export type PracticeArea = { title: Record<Locale, string>; description: Record<Locale, string> };

export const practiceAreas: readonly PracticeArea[] = [
  {
    title: { "pt-BR": "Modelagem de domínio", en: "Domain modeling" },
    description: {
      "pt-BR": "Modelos claros que refletem o problema a resolver.",
      en: "Clear models that reflect the problem being solved.",
    },
  },
  {
    title: { "pt-BR": "Integração de sistemas", en: "Systems integration" },
    description: {
      "pt-BR": "Aplicações e APIs com limites explícitos.",
      en: "Applications and APIs with explicit boundaries.",
    },
  },
  {
    title: { "pt-BR": "Entrega confiável", en: "Reliable delivery" },
    description: {
      "pt-BR": "Software operável do desenvolvimento à produção.",
      en: "Operable software from development to production.",
    },
  },
];

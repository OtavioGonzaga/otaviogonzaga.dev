export type Project = {
  slug: string;
  name: string;
  repositoryUrl: string;
  technologies: readonly string[];
  description: { "pt-BR": string; en: string };
};

export const projects: readonly Project[] = [
  {
    slug: "rustbot",
    name: "rustbot",
    repositoryUrl: "https://github.com/OtavioGonzaga/rustbot",
    technologies: ["Rust"],
    description: {
      "pt-BR": "Um projeto público em Rust selecionado como evidência de prática de engenharia.",
      en: "A public Rust project selected as evidence of engineering practice.",
    },
  },
  {
    slug: "blog-api",
    name: "blog-api",
    repositoryUrl: "https://github.com/OtavioGonzaga/blog-api",
    technologies: ["TypeScript"],
    description: {
      "pt-BR": "Uma API pública em TypeScript selecionada como evidência de prática de engenharia.",
      en: "A public TypeScript API selected as evidence of engineering practice.",
    },
  },
  {
    slug: "concorrencia",
    name: "concorrencia",
    repositoryUrl: "https://github.com/OtavioGonzaga/concorrencia",
    technologies: ["C++"],
    description: {
      "pt-BR": "Um projeto público em C++ selecionado como evidência de prática de engenharia.",
      en: "A public C++ project selected as evidence of engineering practice.",
    },
  },
];

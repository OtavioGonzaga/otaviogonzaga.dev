export type Project = {
  slug: string;
  name: string;
  repositoryUrl: string;
  technologies: readonly string[];
  category: { "pt-BR": string; en: string };
  description: { "pt-BR": string; en: string };
};

export const projects: readonly Project[] = [
  {
    slug: "kmux",
    name: "kmux",
    repositoryUrl: "https://github.com/OtavioGonzaga/kmux",
    technologies: ["Rust", "Clap", "SSH"],
    category: { "pt-BR": "CLI / FERRAMENTA DE SISTEMA", en: "CLI / SYSTEMS TOOL" },
    description: {
      "pt-BR":
        "Seleção e gerenciamento de identidades SSH sem reescrever ~/.ssh ou sobrecarregar tentativas de autenticação.",
      en: "SSH identity selection and management without rewriting ~/.ssh or overloading authentication attempts.",
    },
  },
  {
    slug: "kmux-desktop",
    name: "kmux desktop",
    repositoryUrl: "https://github.com/OtavioGonzaga/kmux-desktop",
    technologies: ["Tauri", "React", "TypeScript"],
    category: { "pt-BR": "DESKTOP / COMPANHEIRO", en: "DESKTOP / COMPANION" },
    description: {
      "pt-BR":
        "Um gerenciador desktop em Tauri + React para identidades SSH do kmux, criado como complemento visual da CLI.",
      en: "A Tauri + React desktop manager for kmux SSH identities, designed as a visual companion to the CLI.",
    },
  },
];

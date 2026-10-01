export const dictionaries = {
  "pt-BR": {
    language: "Idioma",
    theme: "Tema",
    system: "Sistema",
    light: "Claro",
    dark: "Escuro",
    home: "Início",
    profile: "Perfil",
    projects: "Projetos",
    role: "Engenheiro de Software",
    intro: "Olá, eu sou",
    availability: "Portfólio pessoal",
    skipToContent: "Pular para o conteúdo principal",
    about: "Sobre",
    education: "Formação",
    selectedProjects: "Projetos selecionados",
    projectRepository: "Ver repositório",
    githubActivity: "GitHub",
    repositories: "repositórios públicos",
    stars: "estrelas",
    githubUnavailable: "A atividade no GitHub não está disponível agora.",
    contact: "Contato",
  },
  en: {
    language: "Language",
    theme: "Theme",
    system: "System",
    light: "Light",
    dark: "Dark",
    home: "Home",
    profile: "Profile",
    projects: "Projects",
    role: "Software Engineer",
    intro: "Hi, I'm",
    availability: "Personal portfolio",
    skipToContent: "Skip to main content",
    about: "About",
    education: "Education",
    selectedProjects: "Selected projects",
    projectRepository: "View repository",
    githubActivity: "GitHub",
    repositories: "public repositories",
    stars: "stars",
    githubUnavailable: "GitHub activity is unavailable right now.",
    contact: "Contact",
  },
} as const;

export type Locale = keyof typeof dictionaries;
export type Dictionary = (typeof dictionaries)[Locale];

export function isLocale(value: string | undefined): value is Locale {
  return value === "pt-BR" || value === "en";
}

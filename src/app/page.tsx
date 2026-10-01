import { getGitHubSummary } from "@/modules/github/application/get-github-summary";
import { profile } from "@/modules/profile/content/profile";
import { projects } from "@/modules/projects/content/projects";
import { personStructuredData, websiteStructuredData } from "@/shared/seo/structured-data";
import { dictionaries } from "@/shared/i18n/dictionaries";
import { getLocale } from "@/shared/i18n/get-locale";
import { LanguageSelector } from "@/shared/ui/language-selector";
import { ThemeSelector } from "@/shared/ui/theme-selector";

export default async function Home() {
  const locale = await getLocale();
  const copy = dictionaries[locale];
  const github = await getGitHubSummary();

  return (
    <>
      <header className="site-header shell">
        <a className="wordmark" href="#main-content">
          otaviogonzaga.dev
        </a>
        <div className="preferences">
          <LanguageSelector label={copy.language} locale={locale} />
          <ThemeSelector
            label={copy.theme}
            options={{ system: copy.system, light: copy.light, dark: copy.dark }}
          />
        </div>
        <nav aria-label={copy.home} className="navigation">
          <a href="#about">{copy.about}</a>
          <a href="#projects">{copy.projects}</a>
          <a href="#contact">{copy.contact}</a>
        </nav>
      </header>
      <main className="shell main-content" id="main-content">
        <section aria-labelledby="intro-title" className="hero">
          <p className="eyebrow">{copy.availability}</p>
          <h1 id="intro-title">
            <span>{copy.intro}</span> Otavio Gonzaga
          </h1>
          <p className="role">{copy.role}</p>
        </section>
        <section aria-labelledby="about-title" className="content-section" id="about">
          <p className="eyebrow">{copy.about}</p>
          <h2 id="about-title">{profile.name}</h2>
          <p>{copy.role}.</p>
          <div className="education">
            <span>{copy.education}</span>
            <strong>{profile.education}</strong>
          </div>
        </section>
        <section aria-labelledby="projects-title" className="content-section" id="projects">
          <p className="eyebrow">{copy.selectedProjects}</p>
          <h2 id="projects-title">{copy.projects}</h2>
          <div className="project-grid">
            {projects.map((project) => (
              <article className="project-card" key={project.slug}>
                <h3>{project.name}</h3>
                <p>{project.description[locale]}</p>
                <ul aria-label={project.name}>
                  {project.technologies.map((technology) => (
                    <li key={technology}>{technology}</li>
                  ))}
                </ul>
                <a href={project.repositoryUrl} rel="noreferrer" target="_blank">
                  {copy.projectRepository} <span aria-hidden="true">↗</span>
                </a>
              </article>
            ))}
          </div>
        </section>
        <section aria-labelledby="github-title" className="content-section github-section">
          <p className="eyebrow">{copy.githubActivity}</p>
          <h2 id="github-title">GitHub</h2>
          {github ? (
            <p className="github-stats">
              <strong>{github.repositoryCount}</strong> {copy.repositories}{" "}
              <span aria-hidden="true">·</span> <strong>{github.stars}</strong> {copy.stars}
            </p>
          ) : (
            <p>{copy.githubUnavailable}</p>
          )}
          <a href={profile.githubUrl} rel="noreferrer" target="_blank">
            GitHub <span aria-hidden="true">↗</span>
          </a>
        </section>
        <section
          aria-labelledby="contact-title"
          className="content-section contact-section"
          id="contact"
        >
          <p className="eyebrow">{copy.contact}</p>
          <h2 id="contact-title">{profile.name}</h2>
          <div className="social-links">
            <a href={profile.githubUrl} rel="noreferrer" target="_blank">
              GitHub <span aria-hidden="true">↗</span>
            </a>
            <a href={profile.linkedinUrl} rel="noreferrer" target="_blank">
              LinkedIn <span aria-hidden="true">↗</span>
            </a>
          </div>
        </section>
      </main>
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteStructuredData()).replace(/</g, "\\u003c"),
        }}
        type="application/ld+json"
      />
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personStructuredData()).replace(/</g, "\\u003c"),
        }}
        type="application/ld+json"
      />
    </>
  );
}

import { getGitHubSummary } from "@/modules/github/application/get-github-summary";
import { practiceAreas } from "@/modules/profile/content/areas";
import { profile } from "@/modules/profile/content/profile";
import { projects } from "@/modules/projects/content/projects";
import { personStructuredData, websiteStructuredData } from "@/shared/seo/structured-data";
import { dictionaries } from "@/shared/i18n/dictionaries";
import { getLocale } from "@/shared/i18n/get-locale";
import { PreferencesMenu } from "@/shared/ui/preferences-menu";

export default async function Home() {
  const locale = await getLocale();
  const copy = dictionaries[locale];
  const github = await getGitHubSummary();

  return (
    <>
      <header className="site-header shell">
        <a className="wordmark" href="#main-content">
          ~/otavio
        </a>
        <nav aria-label={copy.home} className="navigation">
          <a href="#projects">{copy.work}</a>
          <a href="#about">{copy.aboutNav}</a>
          <a href={profile.githubUrl} rel="noreferrer" target="_blank">
            {copy.githubNav} ↗
          </a>
          <a href={profile.linkedinUrl} rel="noreferrer" target="_blank">
            {copy.linkedinNav} ↗
          </a>
          <PreferencesMenu locale={locale} labels={copy} preference="theme" />
          <PreferencesMenu locale={locale} labels={copy} preference="language" />
        </nav>
      </header>
      <main className="shell main-content" id="main-content">
        <section aria-labelledby="intro-title" className="hero">
          <p className="eyebrow">{copy.engineeringAreas}</p>
          <h1 id="intro-title">Otavio Gonzaga</h1>
          <p className="role">{copy.role}</p>
          <p className="hero-description">{copy.heroDescription}</p>
          <p className="status">
            <span />
            {copy.status}
          </p>
          <p className="stack">
            NestJS&nbsp;&nbsp; PostgreSQL&nbsp;&nbsp; Docker&nbsp;&nbsp; Rust&nbsp;&nbsp; Linux
          </p>
          <div className="actions">
            <a className="primary-action" href={profile.githubUrl} rel="noreferrer" target="_blank">
              GitHub ↗
            </a>
            <a className="ghost-action" href={profile.linkedinUrl} rel="noreferrer" target="_blank">
              LinkedIn ↗
            </a>
          </div>
        </section>
        <section aria-labelledby="about-title" className="content-section" id="about">
          <div className="split-section">
            <div>
              <p className="eyebrow">{copy.aboutNumber}</p>
              <h2 id="about-title">{copy.aboutTitle}</h2>
            </div>
            <div className="about-copy">
              <p>{copy.aboutFirst}</p>
              <p>{copy.aboutSecond}</p>
              <small>{copy.educationDetail}</small>
              <small>NESTJS / POSTGRESQL / CONTAINERS / CI/CD / RUST</small>
            </div>
          </div>
        </section>
        <section aria-labelledby="projects-title" className="content-section" id="projects">
          <div className="section-heading">
            <div>
              <p className="eyebrow">{copy.workNumber}</p>
              <h2 id="projects-title">{copy.workTitle}</h2>
            </div>
            <a href={profile.githubUrl} rel="noreferrer" target="_blank">
              github.com/OtavioGonzaga ↗
            </a>
          </div>
          <div className="project-grid">
            {projects.map((project) => (
              <article className="project-card" key={project.slug}>
                <div className="project-meta">
                  <span>0{projects.indexOf(project) + 1}</span>
                  <span>{project.category[locale]}</span>
                </div>
                <h3>
                  <a className="project-title-link" href={`/projects/${project.slug}`}>
                    {project.name}
                  </a>
                </h3>
                <p>{project.description[locale]}</p>
                <p className="project-stack">{project.technologies.join("  ·  ")}</p>
                <a href={project.repositoryUrl} rel="noreferrer" target="_blank">
                  {copy.projectRepository} <span aria-hidden="true">↗</span>
                </a>
              </article>
            ))}
          </div>
        </section>
        <section aria-labelledby="areas-title" className="content-section" id="areas">
          <p className="eyebrow">{copy.areasNumber}</p>
          <h2 id="areas-title">{copy.areasTitle}</h2>
          <div className="practice-grid">
            {practiceAreas.map((area) => (
              <article className="practice-card" key={area.title.en}>
                <h3>{area.title[locale]}</h3>
                <p>{area.description[locale]}</p>
              </article>
            ))}
          </div>
        </section>
        <section aria-labelledby="github-title" className="content-section github-section">
          <p className="eyebrow">{copy.githubNumber}</p>
          <h2 id="github-title">{copy.githubTitle}</h2>
          {github ? (
            <p className="github-stats">
              <strong>{github.repositoryCount}</strong> {copy.repositories}{" "}
              <span aria-hidden="true">·</span> <strong>{github.stars}</strong> {copy.stars}
            </p>
          ) : (
            <p>{copy.githubUnavailable}</p>
          )}
          <a href={profile.githubUrl} rel="noreferrer" target="_blank">
            GitHub ↗
          </a>
        </section>
        <section
          aria-labelledby="contact-title"
          className="content-section contact-section"
          id="contact"
        >
          <p className="eyebrow">{copy.contactNumber}</p>
          <h2 id="contact-title">{copy.contactTitle}</h2>
          <p>{copy.contactDescription}</p>
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
      <footer className="site-footer shell">
        <span>© 2026 Otavio Gonzaga</span>
        <nav aria-label={copy.contact} className="footer-links">
          <a href={profile.githubUrl} rel="noreferrer" target="_blank">
            GitHub
          </a>
          <span aria-hidden="true">·</span>
          <a href={profile.linkedinUrl} rel="noreferrer" target="_blank">
            LinkedIn
          </a>
          <span aria-hidden="true">·</span>
          <a href="/rss.xml">{copy.rss}</a>
        </nav>
      </footer>
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

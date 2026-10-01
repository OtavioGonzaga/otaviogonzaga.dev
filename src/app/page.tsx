import { getGitHubSummary } from "@/modules/github/application/get-github-summary";
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
          <a href="#projects">work</a>
          <a href="#about">about</a>
          <a href={profile.githubUrl} rel="noreferrer" target="_blank">
            github ↗
          </a>
          <a href={profile.linkedinUrl} rel="noreferrer" target="_blank">
            linkedin ↗
          </a>
          <PreferencesMenu locale={locale} labels={copy} />
        </nav>
      </header>
      <main className="shell main-content" id="main-content">
        <section aria-labelledby="intro-title" className="hero">
          <p className="eyebrow">SOFTWARE ENGINEERING / ARCHITECTURE / SYSTEMS</p>
          <h1 id="intro-title">Otavio Gonzaga</h1>
          <p className="role">{copy.role}</p>
          <p className="hero-description">
            I design and build software systems with a focus on clear models, maintainable
            architecture and reliable delivery.
          </p>
          <p className="status">
            <span />
            Brazil / UTC−3 &nbsp;·&nbsp; designing, building and evolving software
          </p>
          <p className="stack">
            NestJS&nbsp;&nbsp; PostgreSQL&nbsp;&nbsp; Docker&nbsp;&nbsp; Rust&nbsp;&nbsp; Linux
          </p>
          <div className="actions">
            <a className="primary-action" href={profile.githubUrl}>
              GitHub ↗
            </a>
            <a className="ghost-action" href={profile.linkedinUrl}>
              LinkedIn ↗
            </a>
          </div>
        </section>
        <section aria-labelledby="about-title" className="content-section" id="about">
          <div className="split-section">
            <div>
              <p className="eyebrow">01 / ABOUT</p>
              <h2 id="about-title">Engineering software from the domain outward.</h2>
            </div>
            <div className="about-copy">
              <p>
                My work spans the software lifecycle: understanding the domain, designing
                applications and APIs, integrating systems, working with data and operating what
                gets delivered.
              </p>
              <p>
                I care about explicit boundaries and code that reflects the problem it solves —
                using ideas such as Domain-Driven Design and Ports & Adapters when they improve
                clarity rather than as ceremony.
              </p>
              <small>B.Sc. in Software Engineering &nbsp;·&nbsp; UTFPR</small>
              <small>NESTJS / POSTGRESQL / CONTAINERS / CI/CD / RUST</small>
            </div>
          </div>
        </section>
        <section aria-labelledby="projects-title" className="content-section" id="projects">
          <div className="section-heading">
            <div>
              <p className="eyebrow">02 / SELECTED WORK</p>
              <h2 id="projects-title">Selected software projects and experiments.</h2>
            </div>
            <a href={profile.githubUrl}>github.com/OtavioGonzaga ↗</a>
          </div>
          <div className="project-grid">
            {projects.map((project) => (
              <article className="project-card" key={project.slug}>
                <div className="project-meta">
                  <span>0{projects.indexOf(project) + 1}</span>
                  <span>{project.category[locale]}</span>
                </div>
                <h3>{project.name}</h3>
                <p>{project.description[locale]}</p>
                <p className="project-stack">{project.technologies.join("  ·  ")}</p>
                <a href={project.repositoryUrl} rel="noreferrer" target="_blank">
                  {copy.projectRepository} <span aria-hidden="true">↗</span>
                </a>
              </article>
            ))}
          </div>
        </section>
        <section aria-labelledby="github-title" className="content-section github-section">
          <p className="eyebrow">04 / GITHUB</p>
          <h2 id="github-title">Public code as supporting evidence of the work.</h2>
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
          <p className="eyebrow">05 / CONTACT</p>
          <h2 id="contact-title">Work, collaboration or open-source discussion.</h2>
          <p>
            GitHub is the best place to inspect the work. LinkedIn is there when a conversation
            makes more sense than an issue or pull request.
          </p>
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
        <span>GitHub &nbsp;·&nbsp; LinkedIn &nbsp;·&nbsp; RSS later</span>
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

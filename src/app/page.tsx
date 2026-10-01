import { websiteStructuredData } from "@/shared/seo/structured-data";
import { dictionaries } from "@/shared/i18n/dictionaries";
import { getLocale } from "@/shared/i18n/get-locale";
import { LanguageSelector } from "@/shared/ui/language-selector";
import { ThemeSelector } from "@/shared/ui/theme-selector";

export default async function Home() {
  const locale = await getLocale();
  const copy = dictionaries[locale];

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
      </header>
      <main className="shell main-content" id="main-content">
        <section aria-labelledby="intro-title" className="hero">
          <p className="eyebrow">{copy.availability}</p>
          <h1 id="intro-title">
            <span>{copy.intro}</span> Otavio Gonzaga
          </h1>
          <p className="role">{copy.role}</p>
        </section>
      </main>
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteStructuredData()).replace(/</g, "\\u003c"),
        }}
        type="application/ld+json"
      />
    </>
  );
}

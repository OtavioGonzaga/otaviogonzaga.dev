import { websiteStructuredData } from "@/shared/seo/structured-data";

export default function Home() {
  return (
    <main className="shell" id="main-content" style={{ paddingBlock: "clamp(4rem, 12vw, 10rem)" }}>
      <section aria-labelledby="intro-title" className="card">
        <p style={{ color: "var(--accent)", fontWeight: 700, margin: 0 }}>otaviogonzaga.dev</p>
        <h1
          id="intro-title"
          style={{ fontSize: "clamp(2.25rem, 7vw, 5rem)", marginBlock: ".5rem 1rem" }}
        >
          Otavio Gonzaga
        </h1>
        <p style={{ color: "var(--foreground-muted)", fontSize: "1.25rem", margin: 0 }}>
          Software Engineer
        </p>
      </section>
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteStructuredData()).replace(/</g, "\\u003c"),
        }}
        type="application/ld+json"
      />
    </main>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { projects } from "@/modules/projects/content/projects";
import { dictionaries } from "@/shared/i18n/dictionaries";
import { getLocale } from "@/shared/i18n/get-locale";

type ProjectPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((candidate) => candidate.slug === slug);
  if (!project) return {};
  return {
    title: project.name,
    description: project.description["pt-BR"],
    alternates: { canonical: `/projects/${slug}` },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find((candidate) => candidate.slug === slug);
  if (!project) notFound();
  const locale = await getLocale();
  const copy = dictionaries[locale];

  return (
    <main className="shell project-page" id="main-content">
      <a className="back-link" href="/#projects">
        ← {copy.work}
      </a>
      <p className="eyebrow">{project.category[locale]}</p>
      <h1>{project.name}</h1>
      <p className="project-description">{project.description[locale]}</p>
      <p className="project-stack">{project.technologies.join("  ·  ")}</p>
      <a
        className="primary-action bg-accent font-mono"
        href={project.repositoryUrl}
        rel="noreferrer"
        target="_blank"
      >
        {copy.projectRepository} ↗
      </a>
    </main>
  );
}

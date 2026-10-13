import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/Reveal";
import { projectCategories, projects } from "@/content/projects";
import type { Locale } from "@/content/types";
import { ui } from "@/content/ui";
import { pad, t } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata({ locale, path: "projects", title: ui.projects.title[locale], description: ui.projects.subtitle[locale] });
}

export default async function ProjectsPage({ params }: Props) {
  const { locale } = await params;
  // Numeração contínua entre categorias (01, 02, …)
  const ordered = projectCategories.flatMap((c) => projects.filter((p) => p.category === c.id));

  return (
    <>
      <PageHeader
        label={ui.projects.title[locale]}
        title={ui.projects.title[locale]}
        subtitle={ui.projects.subtitle[locale]}
        meta={`${pad(projects.length)} ${ui.projects.title[locale]}`}
      />
      <div className="container-page space-y-20 py-16 md:py-24">
        {projectCategories.map((category, ci) => {
          const items = projects.filter((p) => p.category === category.id);
          if (items.length === 0) return null;
          return (
            <section key={category.id} aria-labelledby={`cat-${category.id}`}>
              <Reveal>
                <div className="mb-8 flex items-baseline gap-4">
                  <span className="font-label text-[11px] text-accent">{pad(ci + 1)}</span>
                  <h2 id={`cat-${category.id}`} className="font-display text-3xl text-foreground sm:text-4xl">
                    {t(category.title, locale)}
                  </h2>
                  <span className="h-px flex-1 bg-border" aria-hidden="true" />
                  <span className="font-label text-[10px] text-muted">{pad(items.length)}</span>
                </div>
              </Reveal>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((project) => (
                  <Reveal key={project.slug} className="h-full">
                    <ProjectCard project={project} index={ordered.indexOf(project) + 1} locale={locale} />
                  </Reveal>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { PhotoGallery } from "@/components/PhotoGallery";
import { ProjectLinks } from "@/components/ProjectCard";
import { Reveal } from "@/components/Reveal";
import { SectionLabel, TagList } from "@/components/ui";
import { getProject, projectCategories, projects } from "@/content/projects";
import { locales, type Locale } from "@/content/types";
import { ui } from "@/content/ui";
import { projectImages } from "@/lib/assets";
import { href, t } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ locale: Locale; slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () =>
  locales.flatMap((locale) => projects.map((p) => ({ locale, slug: p.slug })));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return pageMetadata({
    locale,
    path: `projects/${slug}`,
    title: `${project.name} – ${t(project.tagline, locale)}`,
    description: t(project.summary, locale),
  });
}

export default async function ProjectPage({ params }: Props) {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const images = projectImages(project.slug, project.cover);
  const category = projectCategories.find((c) => c.id === project.category);
  const next = projects[(projects.indexOf(project) + 1) % projects.length];

  const aboutBlocks = (
    [
      ["goal", project.about?.goal],
      ["whatIDid", project.about?.whatIDid],
      ["learned", project.about?.learned],
    ] as const
  ).filter(([, value]) => value);

  return (
    <article className="pb-24 pt-24 md:pt-28">
      <div className="container-page">
        <Link
          href={href(locale, "projects")}
          className="font-label group mb-8 inline-flex items-center gap-2 text-[11px] text-muted hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" aria-hidden="true" />
          {ui.projects.back[locale]}
        </Link>

        <header className="mb-10 grid gap-10 lg:grid-cols-[1fr_300px] lg:items-end">
          <div>
            {category && <SectionLabel>{t(category.title, locale)}</SectionLabel>}
            <h1 className="font-display text-5xl text-foreground sm:text-6xl md:text-7xl">
              {project.name}
              <span className="block text-muted">– {t(project.tagline, locale)}</span>
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-foreground/85">{t(project.summary, locale)}</p>
          </div>
            <aside className="h-fit border border-border">
              <dl className="divide-y divide-border">
                <div className="p-5">
                  <dt className="font-label mb-2 text-[10px] text-muted">{ui.projects.year[locale]}</dt>
                  <dd className="font-display text-3xl text-foreground">{project.year}</dd>
                </div>
                <div className="p-5">
                  <dt className="font-label mb-3 text-[10px] text-muted">{ui.projects.stack[locale]}</dt>
                  <dd>
                    <TagList tags={project.tags} />
                  </dd>
                </div>
                {(project.github || project.demo) && (
                  <div className="p-5">
                    <ProjectLinks project={project} locale={locale} showDetails={false} />
                  </div>
                )}
              </dl>
            </aside>
        </header>

        <Reveal>
          <PhotoGallery
            images={images}
            alt={project.name}
            layout="feature"
            labels={{
              open: ui.gallery.open[locale],
              close: ui.gallery.close[locale],
              previous: ui.gallery.previous[locale],
              next: ui.gallery.nextPhoto[locale],
            }}
          />
        </Reveal>

        {aboutBlocks.length > 0 && (
          <section className="mt-16 border-t border-border pt-10">
            <h2 className="font-display mb-8 text-3xl text-foreground">{ui.projects.about[locale]}</h2>
            <dl className="space-y-8">
              {aboutBlocks.map(([key, value]) => (
                <div key={key} className="grid gap-2 sm:grid-cols-[160px_1fr] sm:gap-6">
                  <dt className="font-label pt-1 text-[10px] text-accent">{ui.projects[key][locale]}</dt>
                  <dd className="leading-relaxed text-muted">{value && t(value, locale)}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}

        {next && next.slug !== project.slug && (
          <Link
            href={href(locale, `projects/${next.slug}`)}
            className="group mt-20 flex items-center justify-between border-t border-border pt-8"
          >
            <span>
              <span className="font-label block text-[10px] text-muted">{ui.projects.next[locale]}</span>
              <span className="font-display mt-2 block text-3xl text-foreground group-hover:text-accent-soft sm:text-4xl">
                {next.name}
              </span>
            </span>
            <ArrowRight className="h-6 w-6 text-muted transition-transform group-hover:translate-x-1 group-hover:text-accent-soft" aria-hidden="true" />
          </Link>
        )}
      </div>
    </article>
  );
}

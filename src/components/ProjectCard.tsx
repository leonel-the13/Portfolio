import Link from "next/link";
import { ArrowRight, ArrowUpRight, Github } from "lucide-react";
import type { Project } from "@/content/projects";
import type { Locale } from "@/content/types";
import { ui } from "@/content/ui";
import { projectImages } from "@/lib/assets";
import { href, pad, t } from "@/lib/i18n";
import { SmartImage } from "./SmartImage";
import { TagList } from "./ui";

export function ProjectLinks({ project, locale, showDetails = true }: { project: Project; locale: Locale; showDetails?: boolean }) {
  const link = "font-label inline-flex items-center gap-1.5 text-[11px] transition-colors";
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
      {showDetails && (
        <Link href={href(locale, `projects/${project.slug}`)} className={`${link} group/link text-accent-soft hover:text-foreground`}>
          {ui.projects.details[locale]}
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-0.5" aria-hidden="true" />
        </Link>
      )}
      {project.demo && (
        <a href={project.demo} target="_blank" rel="noopener noreferrer" className={`${link} text-muted hover:text-foreground`}>
          {ui.projects.demo[locale]}
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      )}
      {project.github && (
        <a href={project.github} target="_blank" rel="noopener noreferrer" className={`${link} text-muted hover:text-foreground`}>
          <Github className="h-3.5 w-3.5" aria-hidden="true" />
          {ui.projects.code[locale]}
        </a>
      )}
    </div>
  );
}

export function ProjectCard({ project, index, locale }: { project: Project; index: number; locale: Locale }) {
  const cover = projectImages(project.slug, project.cover)[0];
  return (
    <article className="spotlight group flex h-full flex-col border border-border bg-background transition-colors duration-300 hover:border-accent/40 hover:bg-secondary/40">
      <Link
        href={href(locale, `projects/${project.slug}`)}
        className="relative block aspect-[16/10] overflow-hidden border-b border-border"
        tabIndex={-1}
        aria-hidden="true"
      >
        <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.03]">
          <SmartImage
            src={cover}
            alt=""
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            fallbackTitle={project.name}
            fallbackLabel={t(project.tagline, locale)}
          />
        </div>
      </Link>
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-4 flex items-center justify-between">
          <span className="font-label text-[10px] text-accent">{pad(index)}</span>
          <span className="font-label text-[10px] text-muted">{project.year}</span>
        </div>
        <h3 className="font-display mb-1 text-2xl text-foreground">
          <Link href={href(locale, `projects/${project.slug}`)} className="hover:text-accent-soft">
            {project.name}
          </Link>
        </h3>
        <p className="font-label mb-4 text-[10px] text-muted">{t(project.tagline, locale)}</p>
        <p className="mb-6 text-sm leading-relaxed text-muted">{t(project.summary, locale)}</p>
        <div className="mt-auto space-y-5">
          <TagList tags={project.tags} />
          <ProjectLinks project={project} locale={locale} />
        </div>
      </div>
    </article>
  );
}

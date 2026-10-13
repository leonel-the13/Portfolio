import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { PhotoGallery } from "@/components/PhotoGallery";
import { Reveal } from "@/components/Reveal";
import { SectionLabel } from "@/components/ui";
import { galleryEvents, getEventCompetition, getGalleryEvent } from "@/content/gallery";
import { locales, type Locale } from "@/content/types";
import { ui } from "@/content/ui";
import { galleryImages } from "@/lib/assets";
import { href, t } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ locale: Locale; slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () =>
  locales.flatMap((locale) => galleryEvents.map((e) => ({ locale, slug: e.slug })));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const event = getGalleryEvent(slug);
  if (!event) return {};
  return pageMetadata({ locale, path: `gallery/${slug}`, title: event.title, description: event.description && t(event.description, locale) });
}

export default async function GalleryEventPage({ params }: Props) {
  const { locale, slug } = await params;
  const event = getGalleryEvent(slug);
  if (!event) notFound();

  const competition = getEventCompetition(event);
  const description = event.description ?? competition?.description;
  const photos = galleryImages(event.slug, event.cover);

  return (
    <article className="pb-24 pt-24 md:pt-28">
      <div className="container-page">
        <Link
          href={href(locale, "gallery")}
          className="font-label group mb-10 inline-flex items-center gap-2 text-[11px] text-muted hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" aria-hidden="true" />
          {ui.gallery.back[locale]}
        </Link>

        <header className="mb-10 grid gap-8 border-b border-border pb-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <SectionLabel>
              <time>{event.date}</time>
            </SectionLabel>
            <h1 className="font-display text-5xl text-foreground sm:text-6xl md:text-7xl">{event.title}</h1>
            {description && <p className="mt-6 max-w-2xl text-lg text-muted">{t(description, locale)}</p>}
          </div>
          {competition && (
            <dl className={`grid border border-border ${competition.level ? "grid-cols-2" : "grid-cols-1"}`}>
              <div className={`p-4 ${competition.level ? "border-r border-border" : ""}`}>
                <dt className="font-label mb-1 text-[10px] text-muted">{ui.gallery.result[locale]}</dt>
                <dd className={`font-display text-2xl ${competition.highlight ? "text-accent-soft" : "text-foreground"}`}>
                  {ui.competition.places[competition.position][locale]}
                </dd>
              </div>
              {competition.level && (
                <div className="p-4">
                  <dt className="font-label mb-1 text-[10px] text-muted">{ui.gallery.level[locale]}</dt>
                  <dd className="font-display text-2xl text-foreground">{t(competition.level, locale)}</dd>
                </div>
              )}
            </dl>
          )}
        </header>

        {photos.length === 0 && (
          <p className="font-label border border-dashed border-border p-10 text-center text-[11px] text-muted">{ui.gallery.empty[locale]}</p>
        )}
        <Reveal>
          <PhotoGallery
            images={photos}
            alt={event.title}
            labels={{
              open: ui.gallery.open[locale],
              close: ui.gallery.close[locale],
              previous: ui.gallery.previous[locale],
              next: ui.gallery.nextPhoto[locale],
            }}
          />
        </Reveal>

        {competition?.team && competition.team.length > 0 && (
          <section className="mt-16 border-t border-border pt-10">
            <h2 className="font-label mb-6 text-[11px] text-accent">[ {ui.gallery.team[locale]} ]</h2>
            <ul className="flex flex-wrap gap-2">
              {competition.team.map((member) => (
                <li key={member.name}>
                  {member.linkedin ? (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 border border-border px-3 py-2 text-sm text-foreground transition-colors hover:border-accent/50 hover:text-accent-soft"
                    >
                      {member.name}
                      <ArrowUpRight className="h-3.5 w-3.5 text-muted" aria-hidden="true" />
                    </a>
                  ) : (
                    <span className="inline-flex border border-accent/40 bg-accent/5 px-3 py-2 text-sm text-foreground">{member.name}</span>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </article>
  );
}

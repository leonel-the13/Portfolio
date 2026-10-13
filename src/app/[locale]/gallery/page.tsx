import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Camera } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { SmartImage } from "@/components/SmartImage";
import { galleryEvents } from "@/content/gallery";
import type { Locale } from "@/content/types";
import { ui } from "@/content/ui";
import { galleryImages } from "@/lib/assets";
import { href, pad } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata({ locale, path: "gallery", title: ui.gallery.title[locale], description: ui.gallery.subtitle[locale] });
}

export default async function GalleryPage({ params }: Props) {
  const { locale } = await params;
  return (
    <>
      <PageHeader
        label={ui.gallery.title[locale]}
        title={ui.gallery.title[locale]}
        subtitle={ui.gallery.subtitle[locale]}
        meta={`${pad(galleryEvents.length)} ${ui.gallery.events[locale]}`}
      />
      <div className="container-page py-16 md:py-24">
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {galleryEvents.map((event, i) => {
            const photos = galleryImages(event.slug, event.cover);
            const count = photos.length;
            return (
              <li key={event.slug}>
                <Reveal delay={(i % 3) * 0.05}>
                  <Link
                    href={href(locale, `gallery/${event.slug}`)}
                    className="group block border border-border transition-colors hover:border-accent/50"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.04]">
                        <SmartImage
                          src={photos[0]}
                          alt=""
                          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                          fallbackTitle={event.title}
                          fallbackLabel={event.date}
                        />
                      </div>
                      <span className="font-label absolute left-3 top-3 bg-[rgb(var(--photo-shade)/0.75)] px-2 py-1 text-[10px] text-white backdrop-blur-sm">
                        {pad(i + 1)}
                      </span>
                    </div>
                    <div className="flex items-end justify-between gap-4 p-5">
                      <div>
                        <p className="font-label mb-2 text-[10px] text-muted">
                          <time>{event.date}</time>
                          <span className="mx-2 text-border">/</span>
                          <Camera className="mr-1 inline h-3 w-3 align-[-2px]" aria-hidden="true" />
                          {count} {count === 1 ? ui.gallery.photo[locale] : ui.gallery.photos[locale]}
                        </p>
                        <h2 className="font-display text-2xl text-foreground group-hover:text-accent-soft">{event.title}</h2>
                      </div>
                      <ArrowRight className="mb-1 h-4 w-4 shrink-0 text-muted transition-transform group-hover:translate-x-1 group-hover:text-accent-soft" aria-hidden="true" />
                    </div>
                  </Link>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

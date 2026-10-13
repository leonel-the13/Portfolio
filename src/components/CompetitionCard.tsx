import Link from "next/link";
import { ArrowRight, Trophy } from "lucide-react";
import type { Competition } from "@/content/competitions";
import { galleryEvents } from "@/content/gallery";
import type { Locale } from "@/content/types";
import { ui } from "@/content/ui";
import { galleryImages } from "@/lib/assets";
import { href, t } from "@/lib/i18n";
import { SmartImage } from "./SmartImage";

const medal: Record<Competition["position"], string> = {
  1: "text-amber-300 border-amber-300/40",
  2: "text-slate-200 border-slate-200/40",
  3: "text-orange-300 border-orange-300/40",
  finalist: "text-sky-300 border-sky-300/40",
};

export function CompetitionCard({ competition, locale }: { competition: Competition; locale: Locale }) {
  const event = galleryEvents.find((e) => e.competition === competition.slug);
  const photos = event ? galleryImages(event.slug, event.cover) : [];
  const place = ui.competition.places[competition.position][locale];

  return (
    <article
      className={`spotlight group flex h-full flex-col overflow-hidden border bg-background transition-colors duration-300 ${
        competition.highlight ? "border-accent/70" : "border-border hover:border-accent/40"
      }`}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.03]">
          <SmartImage
            src={photos[0]}
            alt={competition.name}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            fallbackTitle={competition.name}
            fallbackLabel={String(competition.year)}
          />
        </div>
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgb(var(--photo-shade)/0.85)] via-transparent to-transparent"
          aria-hidden="true"
        />
        <span
          className={`font-label absolute left-3 top-3 inline-flex items-center gap-1.5 border bg-[rgb(var(--photo-shade)/0.75)] px-2 py-1 text-[10px] backdrop-blur-sm ${medal[competition.position]}`}
        >
          <Trophy className="h-3 w-3" aria-hidden="true" />
          {place}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="font-label mb-2 flex items-center gap-2 text-[10px] text-muted">
          <span>{competition.year}</span>
          {competition.level && (
            <>
              <span className="text-border">/</span>
              <span className={competition.highlight ? "text-accent-soft" : ""}>{t(competition.level, locale)}</span>
            </>
          )}
        </div>
        <h3 className="font-display text-2xl text-foreground">{competition.name}</h3>
        {photos.length > 0 && event && (
          <Link
            href={href(locale, `gallery/${event.slug}`)}
            className="font-label group/link mt-auto inline-flex items-center gap-1.5 pt-4 text-[11px] text-accent-soft hover:text-foreground"
          >
            {ui.competition.viewGallery[locale]}
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-0.5" aria-hidden="true" />
          </Link>
        )}
      </div>
    </article>
  );
}

import { ArrowUpRight } from "lucide-react";
import type { PathEntry } from "@/content/experience";
import type { Locale } from "@/content/types";
import { ui } from "@/content/ui";
import { pad, t } from "@/lib/i18n";
import { TagList } from "./ui";

export function TimelineItem({ entry, index, locale }: { entry: PathEntry; index: number; locale: Locale }) {
  return (
    <li className="relative grid grid-cols-[2.5rem_1fr] gap-x-4 sm:grid-cols-[3.5rem_1fr] sm:gap-x-6">
      {/* Número + linha vertical */}
      <div className="flex flex-col items-center">
        <span className="font-label flex h-10 w-10 items-center justify-center border border-accent/40 bg-background text-[11px] text-accent sm:h-12 sm:w-12">
          {pad(index)}
        </span>
        <span className="w-px flex-1 bg-border" aria-hidden="true" />
      </div>

      <div className="pb-12">
        <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-2 pt-2 sm:pt-3">
          <span className="font-label text-[10px] text-muted">{t(entry.dates, locale)}</span>
          <span className="h-px w-4 bg-border" aria-hidden="true" />
          <span
            className={`font-label border px-2 py-0.5 text-[10px] ${
              entry.type === "experience"
                ? "border-accent/40 text-accent-soft"
                : "border-border text-muted"
            }`}
          >
            {ui.path.types[entry.type][locale]}
          </span>
        </div>
        <h3 className="font-display text-2xl text-foreground sm:text-3xl">{t(entry.title, locale)}</h3>
        <p className="mt-1 text-sm">
          {entry.organizationUrl ? (
            <a
              href={entry.organizationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-accent-soft hover:text-foreground"
            >
              {entry.organization}
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          ) : (
            <span className="text-accent-soft">{entry.organization}</span>
          )}
        </p>
        {entry.description && (
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">{t(entry.description, locale)}</p>
        )}
        {entry.tags.length > 0 && (
          <div className="mt-5">
            <TagList tags={entry.tags} />
          </div>
        )}
      </div>
    </li>
  );
}

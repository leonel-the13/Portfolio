import type { SkillItem } from "@/content/skills";
import type { L, Locale } from "@/content/types";
import { pad, t } from "@/lib/i18n";

export function SkillGroup({
  title,
  items,
  index,
  locale,
}: {
  title: L;
  items: SkillItem[];
  index: number;
  locale: Locale;
}) {
  return (
    <div className="spotlight h-full bg-background p-6 transition-colors duration-300 hover:bg-secondary/40">
      <div className="mb-5 flex items-baseline gap-3">
        <span className="font-label text-[10px] text-accent">{pad(index)}</span>
        <h3 className="font-display text-2xl text-foreground">{t(title, locale)}</h3>
        <span className="h-px flex-1 bg-border" aria-hidden="true" />
      </div>
      <ul className="flex flex-wrap gap-2">
        {items.map((item) => {
          const label = t(item, locale);
          return (
            <li
              key={label}
              className="border border-border bg-secondary/30 px-3 py-1.5 text-[13px] text-foreground/90"
            >
              {label}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

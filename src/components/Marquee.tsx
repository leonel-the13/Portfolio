import { pad } from "@/lib/i18n";

/** Faixa contínua com as tecnologias (duplicada para o loop não ter cortes). */
export function Marquee({ items }: { items: string[] }) {
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((item, i) => (
        <li key={item} className="flex items-center gap-4 px-6">
          <span className="font-label text-[10px] text-accent">{pad(i + 1)}</span>
          <span className="font-display whitespace-nowrap text-2xl text-foreground/80 md:text-3xl">{item}</span>
          <span className="ml-6 h-1.5 w-1.5 rotate-45 bg-accent/60" aria-hidden="true" />
        </li>
      ))}
    </ul>
  );
  return (
    <div className="marquee overflow-hidden border-y border-border bg-secondary/30 py-5">
      <div className="marquee-track flex w-max">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}

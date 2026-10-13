import { DecryptText } from "./effects/DecryptText";
import { SectionLabel } from "./ui";

/** Cabeçalho das páginas interiores (Projectos, Percurso, Galeria). */
export function PageHeader({ label, title, subtitle, meta }: { label: string; title: string; subtitle: string; meta?: string }) {
  return (
    <section className="relative overflow-hidden border-b border-border pb-14 pt-32 md:pb-20 md:pt-40">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 70% 60% at 0% 0%, rgb(var(--accent-strong) / 0.16) 0%, transparent 60%)" }}
      />
      <div className="container-page relative">
        <SectionLabel>{label}</SectionLabel>
        <h1 className="font-display text-6xl leading-[0.88] text-foreground sm:text-7xl md:text-8xl">
          <DecryptText text={title} duration={900} />
        </h1>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <p className="max-w-xl text-lg text-muted">{subtitle}</p>
          {meta && <p className="font-label text-[10px] text-muted">{meta}</p>}
        </div>
      </div>
    </section>
  );
}

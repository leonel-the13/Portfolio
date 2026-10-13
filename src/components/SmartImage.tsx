import Image from "next/image";

/**
 * Mostra a imagem; sem imagem, gera uma capa com o título (estilo terminal),
 * para o card nunca ficar vazio nem mostrar um erro.
 */
export function SmartImage({
  src,
  alt,
  sizes,
  priority,
  fallbackTitle,
  fallbackLabel,
  className = "object-cover",
}: {
  src: string | null | undefined;
  alt: string;
  sizes: string;
  priority?: boolean;
  fallbackTitle: string;
  fallbackLabel?: string;
  className?: string;
}) {
  if (src) {
    return <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={className} />;
  }
  return (
    <div
      role="img"
      aria-label={alt || fallbackTitle}
      className="bg-grid absolute inset-0 flex flex-col justify-between overflow-hidden bg-secondary p-5"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 80% 70% at 100% 0%, rgb(var(--accent-strong) / 0.22), transparent 60%)" }}
        aria-hidden="true"
      />
      <div className="relative flex items-center gap-1.5" aria-hidden="true">
        <span className="h-2 w-2 rounded-full bg-[#ff5f57]/80" />
        <span className="h-2 w-2 rounded-full bg-[#febc2e]/80" />
        <span className="h-2 w-2 rounded-full bg-[#28c840]/80" />
      </div>
      <div className="relative" aria-hidden="true">
        {fallbackLabel && <p className="font-label mb-2 text-[10px] text-accent-soft">{fallbackLabel}</p>}
        <p className="font-display text-3xl leading-[0.95] text-foreground/90 sm:text-4xl">{fallbackTitle}</p>
        <p className="mt-3 font-mono text-[11px] text-muted">
          <span className="text-accent">$</span> cat README.md
        </p>
      </div>
    </div>
  );
}

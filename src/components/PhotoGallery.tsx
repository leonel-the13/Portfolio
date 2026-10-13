"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";

type Labels = {
  open: string;
  close: string;
  previous: string;
  next: string;
};

const subscribeNoop = () => () => {};

/**
 * Grelha de fotos com visualização em ecrã inteiro (teclado: ← → Esc; deslizar no telemóvel).
 * `layout="feature"` mostra a primeira foto grande, como nos detalhes de projecto.
 *
 * O lightbox é renderizado num portal em <body>, para nunca ficar preso dentro de um
 * elemento com transform/animação (o que o posicionava fora do ecrã).
 */
export function PhotoGallery({
  images,
  alt,
  labels,
  layout = "grid",
}: {
  images: string[];
  alt: string;
  labels: Labels;
  layout?: "grid" | "feature";
}) {
  const [active, setActive] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const touchX = useRef<number | null>(null);
  const mounted = useSyncExternalStore(subscribeNoop, () => true, () => false);

  const close = useCallback(() => {
    setActive(null);
    triggerRef.current?.focus();
  }, []);
  const step = useCallback(
    (dir: 1 | -1) => setActive((i) => (i === null ? i : (i + dir + images.length) % images.length)),
    [images.length],
  );

  useEffect(() => {
    if (active === null) return;
    closeRef.current?.focus();
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [active, close, step]);

  if (images.length === 0) return null;

  const tile = (src: string, i: number, extra = "") => (
    <button
      key={src}
      type="button"
      onClick={(e) => {
        triggerRef.current = e.currentTarget;
        setActive(i);
      }}
      aria-label={`${labels.open} ${i + 1} — ${alt}`}
      className={`group relative block overflow-hidden border border-border bg-secondary ${extra}`}
    >
      <Image
        src={src}
        alt={`${alt} — ${i + 1}`}
        fill
        sizes={i === 0 && layout === "feature" ? "(min-width: 1024px) 66vw, 100vw" : "(min-width: 1024px) 33vw, 50vw"}
        priority={i === 0}
        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
      />
      <span className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center bg-black/60 text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
        <Maximize2 className="h-4 w-4" aria-hidden="true" />
      </span>
    </button>
  );

  const lightbox =
    active !== null ? (
      <div
        role="dialog"
        aria-modal="true"
        aria-label={alt}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95"
        onClick={close}
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
          touchX.current = null;
        }}
      >
        <div className="relative h-[calc(100dvh-8rem)] w-[calc(100vw-2rem)] sm:w-[calc(100vw-9rem)]">
          <Image
            key={images[active]}
            src={images[active]}
            alt={`${alt} — ${active + 1}`}
            fill
            sizes="100vw"
            className="object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
        <button
          ref={closeRef}
          type="button"
          onClick={close}
          aria-label={labels.close}
          className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center border border-white/25 bg-black/60 text-white hover:border-white/70"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                step(-1);
              }}
              aria-label={labels.previous}
              className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-white/25 bg-black/60 text-white hover:border-white/70"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                step(1);
              }}
              aria-label={labels.next}
              className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-white/25 bg-black/60 text-white hover:border-white/70"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </>
        )}
        <p className="font-label absolute bottom-5 left-1/2 -translate-x-1/2 text-[11px] text-white/70">
          {String(active + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
        </p>
      </div>
    ) : null;

  return (
    <>
      {layout === "feature" ? (
        <div className="grid gap-3">
          {tile(images[0], 0, "aspect-[16/9] w-full")}
          {images.length > 1 && (
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
              {images.slice(1).map((src, i) => tile(src, i + 1, "aspect-[4/3]"))}
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {images.map((src, i) =>
            tile(src, i, i === 0 && images.length > 2 ? "col-span-2 row-span-2 aspect-square md:aspect-auto" : "aspect-square"),
          )}
        </div>
      )}
      {mounted && lightbox && createPortal(lightbox, document.body)}
    </>
  );
}

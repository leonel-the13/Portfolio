import { locales, type L, type Locale } from "@/content/types";

export const isLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

/** Devolve o texto no idioma activo. Strings simples (nomes próprios) passam como estão. */
export const t = (value: L | string, locale: Locale) =>
  typeof value === "string" ? value : value[locale];

export const otherLocale = (locale: Locale): Locale => (locale === "pt" ? "en" : "pt");

/** Caminho com prefixo de idioma, sempre com barra final (export estático). */
export const href = (locale: Locale, path = "") =>
  `/${locale}${path ? `/${path.replace(/^\/|\/$/g, "")}` : ""}/`;

export const pad = (n: number) => String(n).padStart(2, "0");

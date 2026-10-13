export const locales = ["pt", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "pt";

/** Texto traduzido. Todo o conteúdo visível do site usa este formato. */
export type L = Record<Locale, string>;

export type Link = { label: L; href: string };

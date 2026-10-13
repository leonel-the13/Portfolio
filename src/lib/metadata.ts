import type { Metadata } from "next";
import { profile, site } from "@/content/profile";
import { locales, type Locale } from "@/content/types";
import { href } from "./i18n";

const ogLocale: Record<Locale, string> = { pt: "pt_AO", en: "en_US" };

/** Metadados por página, com hreflang para PT e EN. `path` é relativo ao idioma. */
export function pageMetadata({
  locale,
  path = "",
  title,
  description,
  image,
}: {
  locale: Locale;
  path?: string;
  title?: string;
  description?: string;
  image?: string;
}): Metadata {
  const fullTitle = title ? `${title} — ${profile.name}` : profile.seo.title[locale];
  const desc = description ?? profile.seo.description[locale];
  const ogImage = image ?? "/images/og-cover.png";
  return {
    title: fullTitle,
    description: desc,
    alternates: {
      canonical: href(locale, path),
      languages: {
        ...Object.fromEntries(locales.map((l) => [l, href(l, path)])),
        "x-default": href("pt", path),
      },
    },
    openGraph: {
      type: "website",
      url: `${site.url}${href(locale, path)}`,
      siteName: profile.name,
      title: fullTitle,
      description: desc,
      locale: ogLocale[locale],
      images: [{ url: ogImage, width: 1200, height: 630, alt: profile.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: desc,
      images: [ogImage],
    },
  };
}

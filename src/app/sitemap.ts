import type { MetadataRoute } from "next";
import { galleryEvents } from "@/content/gallery";
import { site } from "@/content/profile";
import { projects } from "@/content/projects";
import { locales } from "@/content/types";
import { href } from "@/lib/i18n";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "projects",
    "path",
    "gallery",
    ...projects.map((p) => `projects/${p.slug}`),
    ...galleryEvents.map((e) => `gallery/${e.slug}`),
  ];
  return paths.map((path) => ({
    url: `${site.url}${href("pt", path)}`,
    alternates: {
      languages: Object.fromEntries(locales.map((l) => [l, `${site.url}${href(l, path)}`])),
    },
  }));
}

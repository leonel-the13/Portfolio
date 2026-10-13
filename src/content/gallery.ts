import type { L } from "./types";
import { competitions } from "./competitions";

export type GalleryEvent = {
  slug: string;
  title: string;
  /** AAAA-MM-DD. Enquanto não houver o dia certo, fica só o ano. */
  date: string;
  /** Liga o evento a uma competição (mostra posição, nível e equipa). */
  competition?: string;
  description?: L;
  /**
   * As fotos vêm da pasta public/images/gallery/<slug>/ (lidas no build): para adicionar
   * ou remover fotos, basta mexer nos ficheiros. Opcional: a foto a mostrar primeiro
   * (por defeito, "cover.*" ou a primeira por ordem do nome).
   */
  cover?: string;
};

// TODO(victor): substituir os anos pela data completa (AAAA-MM-DD) nos eventos que ainda só têm o ano
export const galleryEvents: GalleryEvent[] = [
  {
    slug: "cyber-drill",
    title: "Cyber Drill — AfricaCERT & SADC",
    // Data tirada das fotos da cerimónia
    date: "2026-10-09",
    competition: "cyber-drill",
    cover: "4.jpg",
  },
  {
    slug: "ftl-tourism-hackathon",
    title: "FTL Tourism Hackathon",
    // Datas tiradas das fotos (21–24 de Julho de 2026)
    date: "2026-07-21",
    competition: "ftl-tourism-hackathon",
  },
  {
    slug: "hackathon-ostja",
    title: "Hackathon OSTJA",
    date: "2026",
    competition: "hackathon-ostja",
  },
  {
    slug: "angotic-2026",
    title: "Angotic Hackathon 2026",
    date: "2026",
    competition: "angotic-2026",
  },
  {
    slug: "africell-code-fast",
    title: "Africell Code Fast",
    date: "2025",
    competition: "africell-code-fast",
  },
  {
    slug: "nasa-space-apps",
    title: "NASA Space Apps Challenge",
    date: "2025",
    competition: "nasa-space-apps",
  },
  {
    slug: "isptec-programacao",
    title: "Competição de Programação ISPTEC",
    date: "2024",
    competition: "isptec-programacao",
  },
];

export const getGalleryEvent = (slug: string) => galleryEvents.find((e) => e.slug === slug);
export const getEventCompetition = (event: GalleryEvent) =>
  competitions.find((c) => c.slug === event.competition);

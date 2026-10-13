import type { L } from "./types";

export type TeamMember = { name: string; linkedin?: string };

export type Competition = {
  slug: string;
  /** Lugar no pódio, ou "finalist" quando não houve ranking final. */
  position: 1 | 2 | 3 | "finalist";
  name: string;
  year: number;
  level?: L;
  /** Destaque visual leve (borda na cor de destaque). */
  highlight?: boolean;
  description?: L;
  team?: TeamMember[];
};

const me: TeamMember = { name: "Victor Kangombe" };
const joisson = { name: "Joisson Miguel", linkedin: "https://www.linkedin.com/in/joisson-miguel" };
const oriza = { name: "Oriza Ebo", linkedin: "https://www.linkedin.com/in/orisa-melzira-ebo-aab95a267" };
const reinaldo = { name: "Reinaldo Sambing", linkedin: "https://www.linkedin.com/in/rsambing" };
const jorge = { name: "Jorge Carvalho", linkedin: "https://www.linkedin.com/in/jorge-de-carvalho-366899333" };

export const competitions: Competition[] = [
  {
    slug: "cyber-drill",
    position: 1,
    name: "Cyber Drill — AfricaCERT & SADC",
    year: 2026,
    level: { pt: "Internacional", en: "International" },
    highlight: true,
    // TODO(victor): descrição e equipa do Cyber Drill
  },
  {
    slug: "hackathon-ostja",
    position: 1,
    name: "Hackathon OSTJA",
    year: 2026,
    level: { pt: "Nacional", en: "National" },
    team: [
      me,
      joisson,
      oriza,
      { name: "Willfredy Vieira Dias", linkedin: "https://www.linkedin.com/in/willfredy-vieira-dias" },
      { name: "Jessé Inglês", linkedin: "https://www.linkedin.com/in/jess%C3%A9ingl%C3%AAs" },
      { name: "Sebastião Sukuakueche", linkedin: "https://www.linkedin.com/in/sebastiao-sukuakueche" },
    ],
  },
  {
    slug: "angotic-2026",
    position: 2,
    name: "Angotic Hackathon",
    year: 2026,
    level: { pt: "Nacional", en: "National" },
    description: {
      pt: "Hackathon nacional realizado durante a conferência ANGOTIC 2026.",
      en: "National hackathon held during the ANGOTIC 2026 conference.",
    },
    team: [me, joisson, jorge],
  },
  {
    slug: "ftl-tourism-hackathon",
    position: "finalist",
    name: "FTL Tourism Hackathon",
    year: 2026,
    description: {
      pt: "Bootcamp sem ranking final: a equipa ficou entre os projectos finalistas.",
      en: "A bootcamp with no final ranking: the team was among the finalist projects.",
    },
    // TODO(victor): nível (nacional/internacional) e equipa do FTL
  },
  {
    slug: "africell-code-fast",
    position: 2,
    name: "Africell Code Fast",
    year: 2025,
    level: { pt: "Nacional", en: "National" },
    description: {
      pt: "Competição individual de programação rápida promovida pela Africell.",
      en: "Individual speed-coding competition run by Africell.",
    },
  },
  {
    slug: "nasa-space-apps",
    position: 3,
    name: "NASA Space Apps Challenge",
    year: 2025,
    level: { pt: "Nacional", en: "National" },
    team: [
      me,
      oriza,
      { name: "Ângela Amaro", linkedin: "https://www.linkedin.com/in/angeamaro" },
      reinaldo,
      { name: "Paulo Gaspar", linkedin: "https://www.linkedin.com/in/opaulogaspar" },
      { name: "Nuno Mendes", linkedin: "https://www.linkedin.com/in/nuno-mendes-07a259253" },
    ],
  },
  {
    slug: "isptec-programacao",
    position: 3,
    name: "Competição de Programação ISPTEC",
    year: 2024,
    level: { pt: "Universitário", en: "University" },
    team: [me, reinaldo, jorge],
  },
];

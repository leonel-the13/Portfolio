import type { L } from "./types";

export type PathEntryType = "experience" | "education";

export type PathEntry = {
  type: PathEntryType;
  dates: L;
  title: L;
  organization: string;
  organizationUrl?: string;
  description?: L;
  tags: string[];
};

/** Percurso, do mais recente para o mais antigo. */
export const pathEntries: PathEntry[] = [
  {
    type: "education",
    dates: { pt: "2026 – Presente", en: "2026 – Present" },
    title: { pt: "42 Advanced — DevOps & Segurança", en: "42 Advanced — DevOps & Security" },
    organization: "42 Luanda",
    // TODO(victor): website da 42 Luanda (organizationUrl) e uma frase sobre o Advanced
    tags: ["DevOps", "Security"],
  },
  {
    type: "experience",
    dates: { pt: "2026 – Presente", en: "2026 – Present" },
    title: { pt: "Engenheiro de Software", en: "Software Engineer" },
    organization: "C Software & Solutions (CSS)",
    // TODO(victor): website da C Software & Solutions (organizationUrl)
    description: {
      pt: "Desenvolvimento de APIs REST escaláveis em Java com JWT e soluções com multithreading. Conteinerização com Docker e NGINX, monitorização com Prometheus e Grafana, e práticas de DevSecOps nos pipelines.",
      en: "Building scalable REST APIs in Java with JWT and multithreaded solutions. Containerisation with Docker and NGINX, monitoring with Prometheus and Grafana, and DevSecOps practices in the pipelines.",
    },
    tags: ["Java", "Spring Boot", "Docker", "NGINX", "Prometheus", "Grafana"],
  },
  {
    type: "education",
    // TODO(victor): confirmar o ano de fim do Common Core
    dates: { pt: "2024 – 2026", en: "2024 – 2026" },
    title: { pt: "42 Common Core — Ciência da Computação", en: "42 Common Core — Computer Science" },
    organization: "42 Luanda",
    description: {
      pt: "Formação prática por projectos em C, C++, sistemas Unix, redes e infraestrutura.",
      en: "Hands-on, project-based training in C, C++, Unix systems, networking and infrastructure.",
    },
    tags: ["C", "C++", "Linux", "Docker"],
  },
  {
    type: "education",
    dates: { pt: "2022 – Presente", en: "2022 – Present" },
    title: { pt: "Licenciatura em Engenharia Informática", en: "BSc in Computer Engineering" },
    organization: "ISPTEC",
    organizationUrl: "https://www.isptec.co.ao",
    tags: [],
  },
  {
    type: "education",
    // TODO(victor): confirmar o ano de fim do ensino médio
    dates: { pt: "2020 – 2022", en: "2020 – 2022" },
    title: { pt: "Ensino Médio — Ciências Físicas e Biológicas", en: "Secondary School — Physical and Biological Sciences" },
    organization: "Complexo Escolar Privado Pim Pam Pum",
    tags: [],
  },
];

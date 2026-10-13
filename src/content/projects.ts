import type { L } from "./types";

export type ProjectCategory = "security-infra" | "backend-production" | "systems";

export type Project = {
  slug: string;
  name: string;
  tagline: L;
  year: number;
  category: ProjectCategory;
  summary: L;
  tags: string[];
  /**
   * As imagens vêm da pasta public/images/projects/<slug>/ (lidas no build).
   * Opcional: nome do ficheiro a mostrar primeiro; por defeito usa "cover.*" ou o primeiro por ordem.
   */
  cover?: string;
  github: string | null;
  demo: string | null;
  /** Secção "Sobre este projecto". Campos vazios não aparecem. */
  about?: { goal?: L; whatIDid?: L; learned?: L };
};

export const projectCategories: { id: ProjectCategory; title: L }[] = [
  { id: "security-infra", title: { pt: "Segurança & Infraestrutura", en: "Security & Infrastructure" } },
  { id: "backend-production", title: { pt: "Backend & Produção", en: "Backend & Production" } },
  { id: "systems", title: { pt: "Sistemas & Baixo Nível", en: "Systems & Low Level" } },
];

export const featuredProjectSlug = "cyber-lab";

export const projects: Project[] = [
  {
    slug: "cyber-lab",
    name: "Laboratório de Cibersegurança",
    tagline: { pt: "Prática ofensiva e defensiva", en: "Offensive and defensive practice" },
    year: 2026,
    category: "security-infra",
    summary: {
      pt: "Ambiente com Kali Linux e máquinas vulneráveis para prática de testes de intrusão e análise de ataques. Reconhecimento com Nmap, testes a aplicações web com Burp Suite e análise de tráfego com Wireshark.",
      en: "An environment with Kali Linux and vulnerable machines for practising penetration testing and attack analysis. Reconnaissance with Nmap, web application testing with Burp Suite and traffic analysis with Wireshark.",
    },
    tags: ["Kali Linux", "Nmap", "Burp Suite", "Wireshark"],
    // TODO(victor): link do repositório do laboratório
    github: null,
    demo: null,
  },
  {
    slug: "black-hole-academy",
    name: "Black Hole Academy",
    tagline: { pt: "Plataforma educacional", en: "Educational platform" },
    year: 2026,
    category: "backend-production",
    summary: {
      pt: "Backend em Java e Spring Boot com autenticação JWT; infraestrutura com Docker, NGINX e Prometheus.",
      en: "Java and Spring Boot backend with JWT authentication; infrastructure with Docker, NGINX and Prometheus.",
    },
    tags: ["Java 17", "Spring Boot", "PostgreSQL", "Docker", "NGINX", "Prometheus"],
    github: null,
    demo: null,
    about: {
      whatIDid: {
        pt: "Contribuí no backend com APIs REST, autenticação JWT e a configuração do NGINX como proxy reverso, com a aplicação em contentores Docker.",
        en: "I contributed to the backend with REST APIs, JWT authentication and the NGINX reverse proxy setup, with the application running in Docker containers.",
      },
    },
  },
  {
    slug: "monitoring-lab",
    name: "Laboratório de Monitorização",
    tagline: { pt: "Observabilidade de serviços", en: "Service observability" },
    year: 2026,
    category: "security-infra",
    summary: {
      pt: "Prometheus, Grafana e Node Exporter com dashboards de recursos e alertas de disponibilidade.",
      en: "Prometheus, Grafana and Node Exporter with resource dashboards and availability alerts.",
    },
    tags: ["Prometheus", "Grafana", "Node Exporter", "Docker Compose"],
    // TODO(victor): link do repositório
    github: null,
    demo: null,
  },
  {
    slug: "cesta-digital",
    name: "Cesta Digital",
    tagline: { pt: "Plataforma de doações", en: "Donation platform" },
    year: 2026,
    category: "backend-production",
    summary: {
      pt: "Backend com autenticação, acompanhamento de campanhas em tempo real, cache Redis e monitorização, orquestrado com Docker Compose.",
      en: "Backend with authentication, real-time campaign tracking, Redis caching and monitoring, orchestrated with Docker Compose.",
    },
    tags: ["NestJS", "Prisma", "Redis", "JWT"],
    github: null,
    demo: null,
  },
  {
    slug: "inception",
    name: "Inception",
    tagline: { pt: "Infraestrutura em contentores", en: "Containerised infrastructure" },
    year: 2025,
    category: "security-infra",
    summary: {
      pt: "NGINX com TLS, WordPress e MariaDB em contentores isolados, com rede própria e volumes persistentes. Projecto da 42 Luanda.",
      en: "NGINX with TLS, WordPress and MariaDB in isolated containers, with a dedicated network and persistent volumes. A 42 Luanda project.",
    },
    tags: ["Docker", "Docker Compose", "NGINX", "MariaDB", "TLS"],
    // TODO(victor): confirmar o link (o site antigo usava github.com/leonel-the13/inseption)
    github: null,
    demo: null,
    about: {
      whatIDid: {
        pt: "Só o contentor NGINX fica exposto ao host; o WordPress e a MariaDB comunicam numa rede privada.",
        en: "Only the NGINX container is exposed to the host; WordPress and MariaDB communicate over a private network.",
      },
    },
  },
  {
    slug: "mapa-turismo-acessivel",
    name: "Mapa de Turismo Acessível",
    tagline: { pt: "Mapa interactivo com KPIs", en: "Interactive map with KPIs" },
    year: 2025,
    category: "backend-production",
    summary: {
      pt: "API em Flask com dados geográficos, filtros de acessibilidade e dashboards de KPIs.",
      en: "Flask API serving geographic data, with accessibility filters and KPI dashboards.",
    },
    tags: ["Python", "Flask", "Folium", "Leaflet"],
    github: "https://github.com/leonel-the13/MTA",
    demo: null,
  },
  {
    slug: "webserv",
    name: "Servidor HTTP em C++",
    tagline: { pt: "HTTP/1.1 de raiz", en: "HTTP/1.1 from scratch" },
    year: 2025,
    category: "systems",
    summary: {
      pt: "Servidor HTTP/1.1 desenvolvido de raiz com sockets e tratamento manual de pedidos. Projecto da 42 Luanda.",
      en: "An HTTP/1.1 server built from scratch with sockets and manual request handling. A 42 Luanda project.",
    },
    tags: ["C++98", "Sockets", "HTTP/1.1"],
    // TODO(victor): link do repositório
    github: null,
    demo: null,
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

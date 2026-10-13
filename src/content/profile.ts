import type { L } from "./types";

export const site = {
  url: "https://victor-kangombe.me",
  /** Página de artigos: fica escondida até haver artigos publicados. */
  showArticles: false,
};

export const profile = {
  name: "Victor Kangombe",
  firstName: "Victor",
  lastName: "Kangombe",
  location: { pt: "Luanda, Angola", en: "Luanda, Angola" } as L,
  role: {
    pt: "Engenheiro de Software | Infraestrutura e Segurança da Informação",
    en: "Software Engineer | Infrastructure & Information Security",
  } as L,
  roleParts: [
    { pt: "Engenheiro de Software", en: "Software Engineer" },
    { pt: "Infraestrutura e Segurança da Informação", en: "Infrastructure & Information Security" },
  ] as L[],
  greeting: { pt: "Olá, eu sou", en: "Hi, I'm" } as L,
  terminal: {
    command: "whoami",
    output: "victor-kangombe — luanda, angola",
  },
  photo: "/images/profile.jpg",
  photoAlt: { pt: "Fotografia de Victor Kangombe", en: "Photo of Victor Kangombe" } as L,

  about: [
    {
      pt: "Sou Engenheiro de Software, com experiência no desenvolvimento de APIs em Java e na gestão de infraestrutura com Docker, NGINX e monitorização de serviços.",
      en: "I'm a Software Engineer with experience building APIs in Java and managing infrastructure with Docker, NGINX and service monitoring.",
    },
    {
      pt: "Interesso-me por segurança da informação, em particular pela monitorização de sistemas e pela resposta a incidentes. Gosto de trabalhar em equipa, de resolver problemas sob pressão e de aprender novas ferramentas depressa.",
      en: "I'm interested in information security, especially systems monitoring and incident response. I enjoy working in teams, solving problems under pressure and picking up new tools quickly.",
    },
  ] as L[],

  focus: [
    {
      icon: "server",
      title: { pt: "Backend", en: "Backend" },
      text: {
        pt: "APIs REST escaláveis em Java e Spring Boot",
        en: "Scalable REST APIs with Java and Spring Boot",
      },
    },
    {
      icon: "container",
      title: { pt: "Infraestrutura", en: "Infrastructure" },
      text: {
        pt: "Docker, NGINX e pipelines CI/CD",
        en: "Docker, NGINX and CI/CD pipelines",
      },
    },
    {
      icon: "activity",
      title: { pt: "Monitorização", en: "Monitoring" },
      text: {
        pt: "Métricas, dashboards e alertas com Prometheus e Grafana",
        en: "Metrics, dashboards and alerts with Prometheus and Grafana",
      },
    },
    {
      icon: "shield",
      title: { pt: "Segurança", en: "Security" },
      text: {
        pt: "Testes em laboratório, hardening e DevSecOps",
        en: "Lab testing, hardening and DevSecOps",
      },
    },
  ] as const satisfies ReadonlyArray<{ icon: string; title: L; text: L }>,

  languages: [
    { name: { pt: "Português", en: "Portuguese" }, level: { pt: "Nativo", en: "Native" } },
    { name: { pt: "Inglês", en: "English" }, level: { pt: "B2", en: "B2" } },
  ] as { name: L; level: L }[],

  contact: {
    email: "vicor32leonel@gmail.com",
    whatsapp: "244923794545",
    whatsappMessage: {
      pt: "Olá Victor, vi o seu portfólio e gostaria de falar consigo.",
      en: "Hi Victor, I saw your portfolio and would like to talk with you.",
    } as L,
    linkedin: "https://linkedin.com/in/victor-kangombe",
    github: "https://github.com/leonel-the13",
    title: { pt: "Vamos conversar", en: "Let's talk" } as L,
    text: {
      pt: "Estou aberto a oportunidades em segurança da informação, infraestrutura e desenvolvimento backend.",
      en: "I'm open to opportunities in information security, infrastructure and backend development.",
    } as L,
  },

  /** CV por idioma. Se o PDF de um idioma não existir, o site usa o outro. */
  cv: {
    pt: "/cv/Victor-Kangombe-CV-PT.pdf",
    // TODO(victor): adicionar public/cv/Victor-Kangombe-CV-EN.pdf (até lá, o site usa o PT)
    en: "/cv/Victor-Kangombe-CV-EN.pdf",
  } as L,

  seo: {
    title: {
      pt: "Victor Kangombe — Engenheiro de Software | Infraestrutura e Segurança",
      en: "Victor Kangombe — Software Engineer | Infrastructure & Security",
    } as L,
    description: {
      pt: "Portfólio de Victor Kangombe, Engenheiro de Software em Luanda, com foco em infraestrutura, monitorização e segurança da informação.",
      en: "Portfolio of Victor Kangombe, a Software Engineer in Luanda focused on infrastructure, monitoring and information security.",
    } as L,
  },
};

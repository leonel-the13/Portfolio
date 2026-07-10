"use client";

import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { useEffect, useState, useCallback, useRef } from "react";
import {
  siC,
  siCplusplus,
  siDart,
  siDocker,
  siGit,
  siMysql,
  siNestjs,
  siNginx,
  siNodedotjs,
  siOpenjdk,
  siPostgresql,
  siPython,
  siRedis,
  siSpringboot,
  siTypescript,
  siLinux,
  siGithub,
} from "simple-icons";

/* ─── Constants ─── */
const CONTACT_EMAIL = "vicor32leonel@gmail.com";
const CONTACT_LINKEDIN = "https://linkedin.com/in/victor-kangombe/";
const CONTACT_GITHUB = "https://github.com/leonel-the13";
const MATRIX_CHARS = "01アイウエオカキクケコサシスセソ";
const MATRIX_COLUMNS = 24;

/* ─── Types ─── */
type Translated = string | { pt: string; en: string };

type ProjectDetails = {
  role?: Translated;
  challenges?: Translated;
  outcome?: Translated;
};

type Project = {
  name: string;
  description: Translated;
  stack: string[];
  images: string[];
  github?: string;
  live?: string;
  details?: ProjectDetails;
};

type HackathonMember = {
  name: string;
  linkedin?: string;
};

type Hackathon = {
  title: string;
  position: string;
  positionClass: "gold" | "silver" | "bronze";
  year: string;
  scope: string;
  image: string;
  gallery: string[];
  description: Translated;
  team: "solo" | "team";
  members?: HackathonMember[];
};

type MatrixColumn = {
  id: string;
  stream: string;
  left: string;
  duration: string;
  delay: string;
};

/* ─── Translations ─── */
const TRANSLATIONS = {
  pt: {
    availableForWork: "Disponível para novos projetos",
    viewProjects: "Ver Projetos",
    getInTouch: "Entrar em contacto",
    heroStatsHackathons: "Hackathons",
    heroStatsProjects: "Projetos",
    heroStatsTechs: "Tecnologias",
    aboutTitle: "Sobre mim",
    aboutSubtitle: "Minha Jornada",
    aboutDesc: "Desenvolvedor focado em construir soluções robustas, escaláveis e eficientes, com forte conhecimento em backend e infraestrutura.",
    profileTitle: "Perfil",
    languagesTitle: "Idiomas",
    skillsTitle: "Tecnologias com que trabalho",
    skillsLabel: "Minha Stack",
    skillsDesc: "Ferramentas e linguagens que utilizo no dia-a-dia para desenvolvimento backend, DevOps e infraestrutura.",
    projectsTitle: "Trabalhos Selecionados",
    projectsLabel: "Projetos",
    projectsDesc: "Projetos com arquitetura limpa, responsabilidade bem definida e profundidade técnica real.",
    hackathonsTitle: "Hackathons e Prémios",
    hackathonsLabel: "Competições",
    hackathonsDesc: "Resultados obtidos em competições nacionais e internacionais.",
    contactTitle: "Vamos trabalhar juntos",
    contactLabel: "Contacto",
    contactDesc: "Tem um projeto em mente, quer discutir arquitetura ou simplesmente conectar-se? Entre em contacto e responderei brevemente.",
    footerText: "Victor Kangombe. Construído com Next.js",
    drawerSubtitle: "Detalhes do Projeto",
    drawerRole: "Minha Função:",
    drawerTechStack: "Tecnologias:",
    drawerOverview: "Visão Geral",
    drawerChallenges: "Desafios Técnicos",
    drawerOutcome: "Resultado Chave",
    modalTeamMembers: "Membros da Equipa",
    modalScope: "Escopo",
    modalTeamType: "Tipo de Equipa",
    modalSolo: "Solo",
    modalTeam: "Equipa",
    tabBio: "Bio",
    tabEducation: "Educação",
    tabConsole: "Console CLI",
    eduTitle1: "Especialização em DevOps e Cibersegurança",
    eduSchool1: "42 Advanced, 42 Luanda",
    eduDate1: "2026 - Presente",
    eduDesc1: "Especialização avançada focada em infraestrutura como código (IaC), CI/CD avançado, segurança defensiva e automação de processos de deployment.",
    eduTitle2: "Common Core (Ciência da Computação)",
    eduSchool2: "42 Luanda",
    eduDate2: "2024 - 2026",
    eduDesc2: "Estudo aprofundado e prático de programação de baixo nível em C/C++, concorrência de processos, redes de computadores, docker, virtualização e sistemas baseados em Unix.",
    eduTitle3: "Licenciatura em Engenharia Informática",
    eduSchool3: "Instituto Superior Politécnico de Tecnologias e Ciências (ISPTEC)",
    eduDate3: "2022 - Presente",
    eduDesc3: "Formação académica centrada em estruturas de dados, modelação de software, bases de dados relacionais e segurança de informação.",
    eduTitle4: "Ensino Médio - Ciências Físicas e Biológicas",
    eduSchool4: "Complexo Escolar Privado Pim Pam Pum (Lobito)",
    eduDate4: "2020 - 2022",
    eduDesc4: "Curso secundário com foco em matemática avançada, física teórica/prática e biologia celular.",
    langPt: "Português · Nativo",
    langEn: "Inglês · Intermédio",
    consoleWelcome: "Consola de Programador do Victor v1.0.0. Digite 'help' para comandos.",
    consoleHelp: "Comandos: help, about, skills, contact, clear, secret",
    consoleAbout: "Victor Kangombe: Desenvolvedor Backend / DevOps focado em criar APIs seguras, containerização e redes isoladas.",
    consoleSecret: "🐇 Siga o coelho branco... Efeito matrix activo!",
    consoleNotRecognized: "Comando não reconhecido: {cmd}. Digite 'help' para ajuda."
  },
  en: {
    availableForWork: "Available for new projects",
    viewProjects: "View Projects",
    getInTouch: "Get in Touch",
    heroStatsHackathons: "Hackathons",
    heroStatsProjects: "Projects",
    heroStatsTechs: "Technologies",
    aboutTitle: "About me",
    aboutSubtitle: "My Journey",
    aboutDesc: "Developer focused on building robust, scalable, and efficient solutions, with strong knowledge in backend and infrastructure.",
    profileTitle: "Profile",
    languagesTitle: "Languages",
    skillsTitle: "Technologies I work with",
    skillsLabel: "Tech Stack",
    skillsDesc: "Tools and languages I use daily for backend development, DevOps, and infrastructure.",
    projectsTitle: "Selected work",
    projectsLabel: "Projects",
    projectsDesc: "Projects with clear architecture, well-defined responsibility, and real technical depth.",
    hackathonsTitle: "Hackathons & Awards",
    hackathonsLabel: "Competitions",
    hackathonsDesc: "Results from national and international competitions.",
    contactTitle: "Let's work together",
    contactLabel: "Contact",
    contactDesc: "Have a project in mind, want to discuss architecture, or just connect? Reach out and I'll respond promptly.",
    footerText: "Victor Kangombe. Built with Next.js",
    drawerSubtitle: "Project Detail",
    drawerRole: "My Role:",
    drawerTechStack: "Tech Stack:",
    drawerOverview: "Overview",
    drawerChallenges: "Technical Challenges",
    drawerOutcome: "Key Outcome",
    modalTeamMembers: "Team Members",
    modalScope: "Scope",
    modalTeamType: "Team Type",
    modalSolo: "Solo",
    modalTeam: "Team",
    tabBio: "Bio",
    tabEducation: "Education",
    tabConsole: "CLI Console",
    eduTitle1: "DevOps & Cybersec Specialization",
    eduSchool1: "42 Advanced, 42 Luanda",
    eduDate1: "2026 - Present",
    eduDesc1: "Advanced track focusing on Infrastructure as Code (IaC), custom CI/CD pipelines, defensive server protection, and orchestration security.",
    eduTitle2: "Common Core (Computer Science)",
    eduSchool2: "42 Luanda",
    eduDate2: "2024 - 2026",
    eduDesc2: "Practical engineering curricula based on low-level development in C/C++, process concurrency, network programming, virtualization, and Unix architectures.",
    eduTitle3: "B.S. in Computer Engineering",
    eduSchool3: "Instituto Superior Politécnico de Tecnologias e Ciências (ISPTEC)",
    eduDate3: "2022 - Present",
    eduDesc3: "Higher education centering on advanced software modelling, DBMS systems, networking fundamentals, and programming paradigms.",
    eduTitle4: "High School - Physical & Biological Sciences",
    eduSchool4: "Complexo Escolar Privado Pim Pam Pum (Lobito)",
    eduDate4: "2020 - 2022",
    eduDesc4: "Secondary school credentials focusing on core mathematics, physics, and biological sciences.",
    langPt: "Portuguese · Native",
    langEn: "English · Intermediate",
    consoleWelcome: "Victor's Developer Console v1.0.0. Type 'help' for commands.",
    consoleHelp: "Commands: help, about, skills, contact, clear, secret",
    consoleAbout: "Victor Kangombe: Backend / DevOps developer focusing on secure APIs, containerization, and network isolation.",
    consoleSecret: "🐇 Follow the white rabbit... Matrix mode active!",
    consoleNotRecognized: "Command not recognized: {cmd}. Type 'help' for help."
  }
};

function getText(field: Translated | undefined, lang: 'pt' | 'en'): string {
  if (!field) return "";
  if (typeof field === "string") return field;
  return field[lang] || field.en || "";
}

/* ─── Data ─── */
const TECH_STACK = [
  { label: "Java", icon: siOpenjdk },
  { label: "TypeScript", icon: siTypescript },
  { label: "C++", icon: siCplusplus },
  { label: "C", icon: siC },
  { label: "Python", icon: siPython },
  { label: "Dart", icon: siDart },
  { label: "Spring Boot", icon: siSpringboot },
  { label: "Node.js", icon: siNodedotjs },
  { label: "NestJS", icon: siNestjs },
  { label: "PostgreSQL", icon: siPostgresql },
  { label: "MySQL", icon: siMysql },
  { label: "Redis", icon: siRedis },
  { label: "Docker", icon: siDocker },
  { label: "NGINX", icon: siNginx },
  { label: "Git", icon: siGit },
  { label: "GitHub", icon: siGithub },
  { label: "Linux", icon: siLinux },
];

const PROJECTS: Project[] = [
  {
    name: "Black Hole Academy",
    description: {
      pt: "Contribuição no backend com Java 17 e Spring Boot, focada em APIs REST, autenticação JWT e infraestrutura containerizada com Docker e NGINX.",
      en: "Backend contribution with Java 17 and Spring Boot, focused on REST APIs, JWT authentication, and containerized infrastructure with Docker and NGINX."
    },
    stack: ["Java 17", "Spring Boot", "PostgreSQL", "Docker", "WAF"],
    images: [
      "/projects/black-hole-academy/cover.png",
      "/projects/black-hole-academy/IMG_8096.jpeg",
      "/projects/black-hole-academy/IMG_8185.jpeg",
      "/projects/black-hole-academy/IMG_8233.jpeg",
      "/projects/black-hole-academy/16DA956F-2907-4EE4-A698-34B5D00B4EAC.JPG",
      "/projects/black-hole-academy/470DF929-B7F6-4404-9B9E-0DF349C78ABB.JPG",
      "/projects/black-hole-academy/FA6EA684-AF93-4B43-A4CB-EFA667358C76.JPG",
    ],
    details: {
      role: {
        pt: "Engenheiro de Backend",
        en: "Backend Engineer"
      },
      challenges: {
        pt: "Desenhar um sistema seguro de autenticação JWT e configurar o proxy reverso NGINX para lidar com alta concorrência com o mínimo de sobrecarga de containers.",
        en: "Designing a secure JWT authentication system and configuring the NGINX reverse proxy to handle high concurrency while keeping container overhead minimal."
      },
      outcome: {
        pt: "Containerização bem sucedida do aplicativo, resultando em implantações previsíveis e uma camada de API robusta e segura com proteção de rotas JWT.",
        en: "Successfully containerized the application, resulting in predictable deployments and a robust, secure API layer with JWT-based route protection."
      }
    }
  },
  {
    name: "Cesta Digital",
    description: {
      pt: "Backend de plataforma de doações com autenticação, monitoramento de campanhas em tempo real, cache Redis e monitoria de métricas.",
      en: "Donation platform backend with authentication, real-time campaign tracking, Redis caching, and monitoring."
    },
    stack: ["NestJS", "Prisma", "Redis", "JWT"],
    images: ["/projects/cesta-digital/cover.png"],
    details: {
      role: {
        pt: "Desenvolvedor Backend",
        en: "Backend Developer"
      },
      challenges: {
        pt: "Implementar uma camada de cache de baixa latência usando Redis para garantir estatísticas atualizadas instantaneamente sem sobrecarregar a base de dados.",
        en: "Implementing a low-latency caching layer with Redis to ensure real-time campaign statistics are updated instantly without overloading the database."
      },
      outcome: {
        pt: "Resposta inferior a 10ms nos endpoints de campanhas ativas e consistência total de dados usando Prisma ORM.",
        en: "Achieved sub-10ms response times for active campaign endpoints and ensured full data consistency using Prisma ORM."
      }
    }
  },
  {
    name: "Accessible Tourism Map",
    description: {
      pt: "Plataforma web com mapa interativo, filtros de acessibilidade e API Flask que serve dados geográficos com dashboards de KPI.",
      en: "Web platform with interactive map, accessibility filters, and Flask API serving geo-data with KPI dashboards."
    },
    stack: ["Python", "Flask", "Folium", "Leaflet"],
    images: ["/projects/tourism-map/cover.png"],
    github: "https://github.com/leonel-the13/MTA",
    details: {
      role: {
        pt: "Desenvolvedor Fullstack",
        en: "Fullstack Developer"
      },
      challenges: {
        pt: "Processar e renderizar conjuntos complexos de dados geográficos JSON numa interface de mapa responsiva e amigável para dispositivos móveis usando Leaflet e Folium.",
        en: "Parsing and rendering complex geographical JSON datasets on a mobile-friendly map interface using Leaflet and Folium."
      },
      outcome: {
        pt: "Criação de um mapa funcional de acessibilidade para turistas, integrado com Flask e oferecendo opções de filtragem ágeis.",
        en: "Created a fully functional accessibility map for tourists, integrated with Flask and offering highly responsive filtering options."
      }
    }
  },
  {
    name: "Inception",
    description: {
      pt: "Infraestrutura orquestrada: NGINX, WordPress e MariaDB rodando em containers Docker isolados com rede personalizada.",
      en: "Orchestrated infrastructure: NGINX, WordPress, and MariaDB running in isolated Docker containers with custom networking."
    },
    stack: ["Docker", "NGINX", "MariaDB", "Docker Compose"],
    images: ["/projects/inception/cover.png"],
    github: "https://github.com/leonel-the13/inseption",
    details: {
      role: {
        pt: "Administrador de Sistemas / DevOps",
        en: "System Administrator / DevOps"
      },
      challenges: {
        pt: "Estabelecer comunicação de rede segura multi-container onde apenas o container NGINX fica exposto ao host enquanto WordPress e MariaDB comunicam em rede privada.",
        en: "Establishing secure multi-container networking where only the NGINX container is exposed to the host while WordPress and MariaDB communicate in a private network."
      },
      outcome: {
        pt: "Configuração isolada e automatizada com Docker Compose e volumes persistentes criptografados.",
        en: "Implemented a fully isolated, automated container configuration script with custom Docker networking rules and persistent volumes."
      }
    }
  },
  {
    name: "Webserver",
    description: {
      pt: "Mecanismo HTTP construído de raiz com análise manual de pedidos, sockets e respostas tipadas. Compatível com HTTP/1.1.",
      en: "HTTP engine built from scratch with manual parsing, raw sockets, and typed responses. Compliant with HTTP/1.1."
    },
    stack: ["C++ 98", "Sockets", "HTTP/1.1"],
    images: ["/projects/webserver/cover.png"],
    details: {
      role: {
        pt: "Engenheiro de Software C++",
        en: "C++ Software Engineer"
      },
      challenges: {
        pt: "Lidar com múltiplas conexões simultâneas de clientes TCP de forma assíncrona sem bloquear a execução da thread principal, usando seletores de socket (select/poll).",
        en: "Handling multiple concurrent TCP client connections asynchronously without blocking the main program thread, using socket selectors (select/poll)."
      },
      outcome: {
        pt: "Construção de um servidor web HTTP/1.1 funcional capaz de lidar com uploads de ficheiros, ficheiros estáticos e scripts CGI simples.",
        en: "Built a fully functional HTTP/1.1 web server from scratch capable of handling file uploads, static file serving, and basic CGI scripts."
      }
    }
  },
  {
    name: "Born2beroot",
    description: {
      pt: "Projeto de segurança de servidores Linux: políticas de permissões, acessos SSH, regras de firewall e políticas de senha estritas.",
      en: "Linux hardening project: user permissions, SSH configuration, firewall rules, and security policies."
    },
    stack: ["Linux", "Security", "SSH", "UFW"],
    images: ["/projects/born2beroot/cover.png"],
    details: {
      role: {
        pt: "Analista de Segurança de Sistemas",
        en: "System Security Analyst"
      },
      challenges: {
        pt: "Configurar políticas sudoers rígidas, configurar um firewall UFW ativo e regras dinâmicas de SSH mantendo a estabilidade operacional do sistema.",
        en: "Configuring strict sudoer policies, setting up a secure UFW firewall, and configuring dynamic SSH access policies while preserving system stability."
      },
      outcome: {
        pt: "Auditoria e hardening bem-sucedidos de uma máquina virtual Debian, cumprindo rigorosos requisitos de segurança.",
        en: "Successfully audited and hardened a Debian virtual machine, achieving full compliance with strict security requirements."
      }
    }
  },
];

const HACKATHONS: Hackathon[] = [
  {
    title: "Hackathon OSTJA",
    position: "1st Place",
    positionClass: "gold",
    year: "2026",
    scope: "National",
    image: "/hackathons/hackathon-ostja/cover.jpg",
    gallery: [
      "/hackathons/hackathon-ostja/cover.jpg",
      "/hackathons/hackathon-ostja/IMG_8639.jpeg",
      "/hackathons/hackathon-ostja/IMG_8640.jpeg",
      "/hackathons/hackathon-ostja/CB8DB85C-3CD1-4B14-A29E-D8826D8F5BFF.JPG",
      "/hackathons/hackathon-ostja/Screenshot 2026-04-14 at 20.41.56.PNG",
    ],
    description: {
      pt: "Competição nacional organizada pela OSTJA. Desenvolvemos uma solução robusta respondendo a desafios reais de infraestrutura.",
      en: "National hackathon organized by OSTJA. Developed a full solution addressing real-world infrastructure challenges."
    },
    team: "team",
    members: [
      { name: "Vicor Kangombe" },
      { name: "Joisson Miguel", linkedin: "https://www.linkedin.com/in/joisson-miguel" },
      { name: "Oriza Ebo", linkedin: "https://www.linkedin.com/in/orisa-melzira-ebo-aab95a267" },
      { name: "Willfredy Vieira Dias", linkedin: "https://www.linkedin.com/in/willfredy-vieira-dias" },
      { name: "Jessé Inglês", linkedin: "https://www.linkedin.com/in/jess%C3%A9ingl%C3%AAs" },
      { name: "Sebastião Sukuakueche", linkedin: "https://www.linkedin.com/in/sebastiao-sukuakueche" },
    ],
  },
  {
    title: "ANGOTIC 2026",
    position: "2nd Place",
    positionClass: "silver",
    year: "2026",
    scope: "National",
    image: "/hackathons/angotic2026/cover.jpeg",
    gallery: [
      "/hackathons/angotic2026/cover.jpeg",
      "/hackathons/angotic2026/IMG_8664.jpeg",
      "/hackathons/angotic2026/IMG_9610.JPG",
      "/hackathons/angotic2026/IMG_9614.JPG",
      "/hackathons/angotic2026/IMG_9615.jpeg",
    ],
    description: {
      pt: "Hackathon de nível nacional inserido na conferência internacional ANGOTIC 2026. Desenvolvemos uma plataforma focada em tecnologia e conectividade.",
      en: "National hackathon held at the ANGOTIC 2026 conference. Developed a full solution with focus on technology and infrastructure."
    },
    team: "team",
    members: [
      { name: "Victor Kangombe" },
      { name: "Joisson Miguel", linkedin: "https://www.linkedin.com/in/joisson-miguel" },
      { name: "Jorge Carvalho", linkedin: "https://www.linkedin.com/in/jorge-de-carvalho-366899333" },
    ],
  },
  {
    title: "Africell Code Fast",
    position: "2nd Place",
    positionClass: "silver",
    year: "2025",
    scope: "National",
    image: "/hackathons/africell-code-fast/cover.JPEG",
    gallery: [
      "/hackathons/africell-code-fast/cover.JPEG",
      "/hackathons/africell-code-fast/IMG_6916.jpg",
      "/hackathons/africell-code-fast/IMG_6926.jpeg",
      "/hackathons/africell-code-fast/46E73182-9592-455E-98D9-FE336AFDF3F4.JPG",
      "/hackathons/africell-code-fast/4E768EB8-E82F-4147-B795-8D4F4EFFD1E1.JPG",
      "/hackathons/africell-code-fast/c06c1f88-8251-43a6-93e1-2ff3cfe6123f.JPG",
    ],
    description: {
      pt: "Competição de programação rápida patrocinada pela Africell. Focada em design de algoritmos, velocidade de escrita e depuração de erros.",
      en: "Speed coding competition sponsored by Africell. System Design, Build and Debug."
    },
    team: "solo",
    members: [],
  },
  {
    title: "NASA Space Apps Challenge",
    position: "3rd Place",
    positionClass: "bronze",
    year: "2025",
    scope: "International",
    image: "/hackathons/nasa-space-apps/cover.png",
    gallery: [
      "/hackathons/nasa-space-apps/cover.png",
      "/hackathons/nasa-space-apps/IMG_5767.jpeg",
      "/hackathons/nasa-space-apps/IMG_5783.jpeg",
      "/hackathons/nasa-space-apps/8080748F-8DE8-4F5F-81F9-46AC12DCE179.JPG",
    ],
    description: {
      pt: "Hackathon internacional promovido pela NASA. Desenvolvemos uma plataforma que processa dados públicos de satélites para fins científicos e terrestres.",
      en: "International hackathon by NASA. Worked on a solution leveraging open data for space and earth science applications."
    },
    team: "team",
    members: [
      { name: "Vicor Kangombe" },
      { name: "Oriza Ebo", linkedin: "https://www.linkedin.com/in/orisa-melzira-ebo-aab95a267" },
      { name: "Ângela Amaro", linkedin: "https://www.linkedin.com/in/angeamaro" },
      { name: "Reinaldo Sambing", linkedin: "https://www.linkedin.com/in/rsambing" },
      { name: "Paulo Gaspar", linkedin: "https://www.linkedin.com/in/opaulogaspar" },
      { name: "Nuno Mendes", linkedin: "https://www.linkedin.com/in/nuno-mendes-07a259253" },
    ],
  },
  {
    title: "ISPTEC Programming Competition",
    position: "3rd Place",
    positionClass: "bronze",
    year: "2023",
    scope: "University",
    image: "/hackathons/isptec-programming/cover.jpg",
    gallery: [
      "/hackathons/isptec-programming/cover.jpg",
    ],
    description: {
      pt: "Concurso universitário de programação competitiva do ISPTEC, resolvendo problemas complexos baseados em estruturas de dados e otimização.",
      en: "Competitive programming contest at ISPTEC university, focused on algorithms and problem-solving."
    },
    team: "team",
    members: [
      { name: "Vicor Kangombe" },
      { name: "Reinaldo Sambing", linkedin: "https://www.linkedin.com/in/rsambing" },
      { name: "Jorge Carvalho", linkedin: "https://www.linkedin.com/in/jorge-de-carvalho-366899333" },
    ],
  },
];

/* ─── Animations ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

/* ─── Matrix Helpers ─── */
const createMatrixColumns = (): MatrixColumn[] =>
  Array.from({ length: MATRIX_COLUMNS }, (_, i) => {
    const len = 20 + Math.floor(Math.random() * 20);
    const stream = Array.from(
      { length: len },
      () => MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)],
    ).join("");
    return {
      id: `m-${i}`,
      stream,
      left: `${(i / MATRIX_COLUMNS) * 100}%`,
      duration: `${12 + Math.random() * 10}s`,
      delay: `${Math.random() * 10}s`,
    };
  });

/* ─── Subcomponents ─── */

const StarIcon = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" className="star-decorator">
    <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4L12 0Z" />
  </svg>
);

function TerminalConsole({ lang }: { lang: 'pt' | 'en' }) {
  const [history, setHistory] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const terminalBodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHistory([
      lang === 'pt'
        ? TRANSLATIONS.pt.consoleWelcome
        : TRANSLATIONS.en.consoleWelcome
    ]);
  }, [lang]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    let output = '';
    if (cmd === 'help') {
      output = lang === 'pt' ? TRANSLATIONS.pt.consoleHelp : TRANSLATIONS.en.consoleHelp;
    } else if (cmd === 'about') {
      output = lang === 'pt' ? TRANSLATIONS.pt.consoleAbout : TRANSLATIONS.en.consoleAbout;
    } else if (cmd === 'skills') {
      output = "Java:    [██████████] 90%\nDocker:  [████████░░] 80%\nNestJS:  [████████░░] 80%\nLinux:   [█████████░] 90%";
    } else if (cmd === 'contact') {
      output = `Email: ${CONTACT_EMAIL}\nGitHub: github.com/leonel-the13\nLinkedIn: linkedin.com/in/victor-kangombe`;
    } else if (cmd === 'clear') {
      setHistory([]);
      setInput('');
      return;
    } else if (cmd === 'secret') {
      output = lang === 'pt' ? TRANSLATIONS.pt.consoleSecret : TRANSLATIONS.en.consoleSecret;
    } else {
      output = lang === 'pt' 
        ? TRANSLATIONS.pt.consoleNotRecognized.replace("{cmd}", cmd)
        : TRANSLATIONS.en.consoleNotRecognized.replace("{cmd}", cmd);
    }

    setHistory(prev => [...prev, `> ${input}`, output]);
    setInput('');
  };

  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [history]);

  return (
    <div className="terminal-window">
      <div className="terminal-header">
        <div className="terminal-dots">
          <span className="terminal-dot red" />
          <span className="terminal-dot yellow" />
          <span className="terminal-dot green" />
        </div>
        <span className="terminal-title">bash - victor@portfolio</span>
      </div>
      <div className="terminal-body" ref={terminalBodyRef}>
        {history.map((line, idx) => (
          <pre key={idx} className="terminal-line">{line}</pre>
        ))}
        <form onSubmit={handleCommand} className="terminal-input-row">
          <span className="terminal-prompt">&gt;&nbsp;</span>
          <input 
            type="text" 
            value={input} 
            onChange={e => setInput(e.target.value)} 
            className="terminal-input"
            placeholder="..."
          />
        </form>
      </div>
    </div>
  );
}

function ProjectCarousel({ images }: { images: string[] }) {
  const [current, setCurrent] = useState(0);
  const [hasError, setHasError] = useState<Record<number, boolean>>({});

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  const showPlaceholder = images.length === 0 || hasError[current];

  if (showPlaceholder) {
    return (
      <div className="project-carousel">
        <div
          style={{
            width: "100%",
            height: "100%",
            background:
              "linear-gradient(135deg, var(--bg-primary), var(--bg-elevated))",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--text-tertiary)",
            fontSize: "0.8125rem",
            fontFamily: "var(--font-mono)",
          }}
        >
          <span style={{ opacity: 0.6 }}>{"< no preview />"}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="project-carousel">
      <AnimatePresence mode="popLayout">
        <motion.img
          key={current}
          src={images[current]}
          alt="Project screenshot"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          onError={() => setHasError((prev) => ({ ...prev, [current]: true }))}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </AnimatePresence>
      {images.length > 1 && (
        <div style={{ position: "relative", zIndex: 10, width: "100%", height: "100%", pointerEvents: "none" }}>
          <button
            className="project-carousel-nav prev"
            onClick={(e) => {
              e.stopPropagation();
              setCurrent((c) => (c - 1 + images.length) % images.length);
            }}
            style={{ pointerEvents: "auto" }}
            aria-label="Previous image"
          >
            ‹
          </button>
          <button
            className="project-carousel-nav next"
            onClick={(e) => {
              e.stopPropagation();
              setCurrent((c) => (c + 1) % images.length);
            }}
            style={{ pointerEvents: "auto" }}
            aria-label="Next image"
          >
            ›
          </button>
          <div className="project-carousel-dots" style={{ pointerEvents: "auto" }}>
            {images.map((_, i) => (
              <button
                key={i}
                className={`project-carousel-dot ${i === current ? "active" : ""}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrent(i);
                }}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function HackathonImageCarousel({
  images,
  alt,
  defaultImage,
}: {
  images: string[];
  alt: string;
  defaultImage: string;
}) {
  const [current, setCurrent] = useState(0);
  const galleryImages = images && images.length > 0 ? images : [defaultImage];

  useEffect(() => {
    if (galleryImages.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % galleryImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [galleryImages.length]);

  return (
    <div className="hackathon-image-container">
      <AnimatePresence mode="popLayout">
        <motion.img
          key={current}
          src={galleryImages[current]}
          alt={alt}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </AnimatePresence>
    </div>
  );
}

function HackathonModal({
  hackathon,
  onClose,
  lang,
}: {
  hackathon: Hackathon;
  onClose: () => void;
  lang: 'pt' | 'en';
}) {
  const [currentImg, setCurrentImg] = useState(0);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h3 style={{ fontSize: "1.0625rem", fontWeight: 600 }}>
              {hackathon.title}
            </h3>
            <p
              style={{
                fontSize: "0.8125rem",
                color: "var(--text-tertiary)",
                marginTop: "0.125rem",
              }}
            >
              {hackathon.year} · {hackathon.scope}
            </p>
          </div>
          <button className="modal-close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>
        <div className="modal-body">
          {hackathon.gallery.length > 0 && (
            <div className="modal-gallery-carousel">
              <div className="modal-gallery-viewer">
                <AnimatePresence mode="popLayout">
                  <motion.img
                    key={currentImg}
                    src={hackathon.gallery[currentImg]}
                    alt={`${hackathon.title} image ${currentImg + 1}`}
                    loading="lazy"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="modal-gallery-img"
                  />
                </AnimatePresence>

                {hackathon.gallery.length > 1 && (
                  <>
                    <button
                      className="modal-carousel-nav prev"
                      onClick={() =>
                        setCurrentImg(
                          (c) => (c - 1 + hackathon.gallery.length) % hackathon.gallery.length
                        )
                      }
                      aria-label="Previous image"
                    >
                      ‹
                    </button>
                    <button
                      className="modal-carousel-nav next"
                      onClick={() =>
                        setCurrentImg(
                          (c) => (c + 1) % hackathon.gallery.length
                        )
                      }
                      aria-label="Next image"
                    >
                      ›
                    </button>
                    <div className="modal-carousel-dots">
                      {hackathon.gallery.map((_, idx) => (
                        <button
                          key={idx}
                          className={`modal-carousel-dot ${
                            idx === currentImg ? "active" : ""
                          }`}
                          onClick={() => setCurrentImg(idx)}
                          aria-label={`Go to image ${idx + 1}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
          <p
            style={{
              fontSize: "0.9375rem",
              color: "var(--text-secondary)",
              lineHeight: 1.7,
            }}
          >
            {getText(hackathon.description, lang)}
          </p>
          <div className="modal-meta">
            <span className="modal-meta-item">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg>
              {hackathon.position}
            </span>
            <span className="modal-meta-item">
              {hackathon.team === "solo" ? TRANSLATIONS[lang].modalSolo : TRANSLATIONS[lang].modalTeam}
            </span>
            <span className="modal-meta-item">{hackathon.scope}</span>
          </div>
          {hackathon.team === "team" &&
            hackathon.members &&
            hackathon.members.length > 0 && (
              <div className="modal-members">
                <p className="modal-members-title">{TRANSLATIONS[lang].modalTeamMembers}</p>
                {hackathon.members.map((member, i) => (
                  <div key={i} className="modal-member">
                    <span>{member.name}</span>
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noreferrer"
                      >
                        LinkedIn →
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}
        </div>
      </div>
    </div>
  );
}

function ProjectDrawer({
  project,
  onClose,
  lang,
}: {
  project: Project;
  onClose: () => void;
  lang: 'pt' | 'en';
}) {
  const [currentImg, setCurrentImg] = useState(0);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <motion.div
        className="drawer-content"
        onClick={(e) => e.stopPropagation()}
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
      >
        <div className="drawer-header">
          <div>
            <span className="drawer-subtitle">{TRANSLATIONS[lang].drawerSubtitle}</span>
            <h3 className="drawer-title">{project.name}</h3>
          </div>
          <button className="drawer-close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>

        <div className="drawer-body">
          {/* Large Image Carousel/Gallery */}
          {project.images.length > 0 && (
            <div className="drawer-gallery-container">
              <div className="drawer-gallery-viewer">
                <AnimatePresence mode="popLayout">
                  <motion.img
                    key={currentImg}
                    src={project.images[currentImg]}
                    alt={`${project.name} preview ${currentImg + 1}`}
                    loading="lazy"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="drawer-gallery-img"
                  />
                </AnimatePresence>

                {project.images.length > 1 && (
                  <>
                    <button
                      className="drawer-carousel-nav prev"
                      onClick={() =>
                        setCurrentImg(
                          (c) => (c - 1 + project.images.length) % project.images.length
                        )
                      }
                      aria-label="Previous image"
                    >
                      ‹
                    </button>
                    <button
                      className="drawer-carousel-nav next"
                      onClick={() =>
                        setCurrentImg(
                          (c) => (c + 1) % project.images.length
                        )
                      }
                      aria-label="Next image"
                    >
                      ›
                    </button>
                  </>
                )}
              </div>

              {project.images.length > 1 && (
                <div className="drawer-gallery-thumbnails">
                  {project.images.map((img, idx) => (
                    <button
                      key={idx}
                      className={`drawer-thumbnail-btn ${
                        idx === currentImg ? "active" : ""
                      }`}
                      onClick={() => setCurrentImg(idx)}
                    >
                      <img src={img} alt="" loading="lazy" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Details Metadata */}
          <div className="drawer-meta-section">
            {project.details?.role && (
              <div className="drawer-meta-row">
                <span className="drawer-meta-label">{TRANSLATIONS[lang].drawerRole}</span>
                <span className="drawer-meta-value">{getText(project.details.role, lang)}</span>
              </div>
            )}

            <div className="drawer-meta-row">
              <span className="drawer-meta-label">{TRANSLATIONS[lang].drawerTechStack}</span>
              <div className="drawer-tags">
                {project.stack.map((tech) => (
                  <span key={tech} className="tag">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {(project.github || project.live) && (
              <div className="drawer-links">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-primary"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <GithubIcon />
                    GitHub Repo
                  </a>
                )}
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-ghost"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalIcon />
                    Live Demo
                  </a>
                )}
              </div>
            )}
          </div>

          <div className="drawer-details-content">
            <div className="drawer-details-block">
              <h4>{TRANSLATIONS[lang].drawerOverview}</h4>
              <p>{getText(project.description, lang)}</p>
            </div>

            {project.details?.challenges && (
              <div className="drawer-details-block">
                <h4>{TRANSLATIONS[lang].drawerChallenges}</h4>
                <p>{getText(project.details.challenges, lang)}</p>
              </div>
            )}

            {project.details?.outcome && (
              <div className="drawer-details-block">
                <h4>{TRANSLATIONS[lang].drawerOutcome}</h4>
                <p>{getText(project.details.outcome, lang)}</p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ─── Icons (inline SVG) ─── */
const GithubIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const ExternalIcon = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const MailIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="M22 7l-10 7L2 7" />
  </svg>
);

const LinkedInIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const MenuIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
  >
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const CloseIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const DownloadIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

/* ─── Main Component ─── */
export default function Home() {
  const [matrixColumns, setMatrixColumns] = useState<MatrixColumn[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedHackathon, setSelectedHackathon] = useState<Hackathon | null>(
    null,
  );
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [lang, setLang] = useState<'pt' | 'en'>('pt');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [activeAboutTab, setActiveAboutTab] = useState<'bio' | 'education' | 'terminal'>('bio');

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
    const savedLang = localStorage.getItem('lang') as 'pt' | 'en' | null;
    if (savedLang) setLang(savedLang);
    setMatrixColumns(createMatrixColumns());
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  };

  const handleLangChange = (nextLang: 'pt' | 'en') => {
    setLang(nextLang);
    localStorage.setItem('lang', nextLang);
  };

  const t = useCallback((key: keyof typeof TRANSLATIONS.pt) => {
    return TRANSLATIONS[lang][key] || TRANSLATIONS.en[key] || "";
  }, [lang]);

  const closeMobileMenu = useCallback(() => setMobileMenuOpen(false), []);

  const navItems = [
    { label: lang === 'pt' ? 'Sobre' : 'About', href: "#about" },
    { label: lang === 'pt' ? 'Skills' : 'Skills', href: "#skills" },
    { label: lang === 'pt' ? 'Projetos' : 'Projects', href: "#projects" },
    { label: lang === 'pt' ? 'Competições' : 'Hackathons', href: "#hackathons" },
    { label: lang === 'pt' ? 'Contacto' : 'Contact', href: "#contact" },
  ];

  return (
    <div className="relative min-h-screen">
      <motion.div className="scroll-progress-bar" style={{ scaleX }} />
      {/* Background */}
      <div className="bg-gradient-base" />

      {/* Matrix Rain */}
      <div className="matrix-rain" aria-hidden="true">
        {matrixColumns.map((col) => (
          <span
            key={col.id}
            className="matrix-column"
            style={{
              left: col.left,
              animationDuration: col.duration,
              animationDelay: col.delay,
            }}
          >
            <span className="matrix-stream">{col.stream}</span>
          </span>
        ))}
      </div>

      {/* Header */}
      <header className="site-header">
        <nav className="site-nav">
          <a href="#" className="nav-brand">
            <img
              src="/ea9e27d6-dbae-480c-bd4b-f10d7463b5a4.JPG"
              alt="Victor Kangombe"
              className="nav-avatar"
              loading="lazy"
            />
            <span className="nav-name">Victor Kangombe</span>
          </a>

          <div className="nav-links">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="nav-link">
                {item.label}
              </a>
            ))}
          </div>

          <div className="nav-controls">
            {/* Lang selector capsule */}
            <button 
              className="control-capsule-btn"
              onClick={() => handleLangChange(lang === 'pt' ? 'en' : 'pt')}
              aria-label="Toggle language"
            >
              {lang.toUpperCase()}
            </button>

            {/* Theme selector circle */}
            <button 
              className="control-circle-btn"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              )}
            </button>

            <a href="/victor-resume-en.pdf" className="nav-cta" download>
              <DownloadIcon />
              Resume
            </a>
          </div>

          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </nav>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="mobile-nav">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="mobile-nav-link"
              onClick={closeMobileMenu}
            >
              {item.label}
            </a>
          ))}
          <a
            href="/victor-resume-en.pdf"
            className="mobile-nav-link"
            download
            onClick={closeMobileMenu}
          >
            ↓ Download Resume
          </a>
          <div className="mobile-menu-controls">
            <button 
              className="control-capsule-btn"
              onClick={() => {
                handleLangChange(lang === 'pt' ? 'en' : 'pt');
                closeMobileMenu();
              }}
            >
              {lang.toUpperCase()}
            </button>
            <button 
              className="control-circle-btn"
              onClick={() => {
                toggleTheme();
                closeMobileMenu();
              }}
            >
              {theme === 'dark' ? "Light Mode" : "Dark Mode"}
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="relative z-10">
        {/* ─── Hero ─── */}
        <section className="hero">
          <motion.div
            className="hero-container"
            variants={staggerContainer}
            initial="hidden"
            animate="show"
          >
            {/* Left Column */}
            <div className="hero-left">
              <motion.div variants={fadeUp} className="hero-badge">
                <span className="hero-badge-dot" />
                {t('availableForWork')}
              </motion.div>

              <motion.h1 variants={fadeUp} className="hero-name">
                Victor Kangombe
              </motion.h1>

              <motion.p variants={fadeUp} className="hero-role">
                Backend Engineer <span>|</span> Java <span>|</span> Node.js{" "}
                <span>|</span> DevOps
              </motion.p>

              <motion.p variants={fadeUp} className="hero-desc">
                Building scalable APIs, real-time systems and containerized
                infrastructure.
              </motion.p>

              <motion.div variants={fadeUp} className="hero-actions">
                <a href="#projects" className="btn-primary">
                  {t('viewProjects')}
                </a>
                <a href="#contact" className="btn-ghost">
                  {t('getInTouch')}
                </a>
              </motion.div>

              {/* Stats Row */}
              <motion.div variants={fadeUp} className="hero-stats">
                <div className="hero-stat-item">
                  <span className="hero-stat-number">5</span>
                  <span className="hero-stat-label">{t('heroStatsHackathons')}</span>
                </div>
                <div className="hero-stat-item">
                  <span className="hero-stat-number">6</span>
                  <span className="hero-stat-label">{t('heroStatsProjects')}</span>
                </div>
                <div className="hero-stat-item">
                  <span className="hero-stat-number">16</span>
                  <span className="hero-stat-label">{t('heroStatsTechs')}</span>
                </div>
              </motion.div>
            </div>

            {/* Right Column */}
            <div className="hero-right">
              <div className="hero-image-wrapper">
                <img
                  src="/victor.jpg"
                  alt="Victor Kangombe"
                  className="hero-profile-img"
                  loading="lazy"
                />
                <div className="hero-image-glow" />

                {/* Floating Tags */}
                <motion.span
                  className="floating-tag tag-java"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="#fbbf24" style={{ display: "inline-block" }}>
                    <path d={siOpenjdk.path} />
                  </svg>
                  Java
                </motion.span>
                <motion.span
                  className="floating-tag tag-docker"
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="#38bdf8" style={{ display: "inline-block" }}>
                    <path d={siDocker.path} />
                  </svg>
                  Docker
                </motion.span>
                <motion.span
                  className="floating-tag tag-nestjs"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="#f472b6" style={{ display: "inline-block" }}>
                    <path d={siNestjs.path} />
                  </svg>
                  NestJS
                </motion.span>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ─── About ─── */}
        <section id="about" className="section">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.div variants={fadeUp} className="section-capsule">
              <StarIcon />
              {t('aboutTitle')}
            </motion.div>
            <motion.h2 variants={fadeUp} className="section-title">
              {t('aboutSubtitle')}
            </motion.h2>
          </motion.div>

          <div className="about-grid-improved">
            {/* Left Column: Profile details */}
            <motion.div
              className="card profile-improved-card"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="profile-improved-header">
                <div className="profile-avatar-wrapper">
                  <img
                    src="/victor.jpg"
                    alt="Victor Kangombe"
                    className="profile-avatar"
                    loading="lazy"
                  />
                </div>
                <div className="profile-info">
                  <h3>Victor Kangombe</h3>
                  <p className="profile-role">
                    Backend Engineer · DevOps · Infra
                  </p>
                  <div className="profile-tags">
                    {["Luanda, Angola", "APIs", "Infra", "Security"].map(
                      (tag) => (
                        <span key={tag} className="tag-outline">
                          {tag}
                        </span>
                      ),
                    )}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Dynamic Screen/Tabs container */}
            <motion.div
              className="about-tab-container card"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="about-tabs-header">
                <button 
                  className={`about-tab-btn ${activeAboutTab === 'bio' ? 'active' : ''}`}
                  onClick={() => setActiveAboutTab('bio')}
                  type="button"
                >
                  {t('tabBio')}
                </button>
                <button 
                  className={`about-tab-btn ${activeAboutTab === 'education' ? 'active' : ''}`}
                  onClick={() => setActiveAboutTab('education')}
                  type="button"
                >
                  {t('tabEducation')}
                </button>
                <button 
                  className={`about-tab-btn ${activeAboutTab === 'terminal' ? 'active' : ''}`}
                  onClick={() => setActiveAboutTab('terminal')}
                  type="button"
                >
                  {t('tabConsole')}
                </button>
              </div>

              <div className="about-tab-content">
                {activeAboutTab === 'bio' && (
                  <div className="tab-pane-bio">
                    <p className="about-bio-text">{t('aboutDesc')}</p>
                    <div className="about-languages-block">
                      <h4 className="about-sub-heading">{t('languagesTitle')}</h4>
                      <ul className="about-list">
                        <li>{t('langPt')}</li>
                        <li>{t('langEn')}</li>
                      </ul>
                    </div>
                  </div>
                )}

                {activeAboutTab === 'education' && (
                  <div className="tab-pane-timeline">
                    <div className="timeline-item">
                      <span className="timeline-dot" />
                      <div className="timeline-meta">
                        <span className="timeline-date">{t('eduDate1')}</span>
                        <h4 className="timeline-title">{t('eduTitle1')}</h4>
                        <span className="timeline-school">{t('eduSchool1')}</span>
                      </div>
                      <p className="timeline-desc">{t('eduDesc1')}</p>
                    </div>
                    <div className="timeline-item">
                      <span className="timeline-dot" />
                      <div className="timeline-meta">
                        <span className="timeline-date">{t('eduDate2')}</span>
                        <h4 className="timeline-title">{t('eduTitle2')}</h4>
                        <span className="timeline-school">{t('eduSchool2')}</span>
                      </div>
                      <p className="timeline-desc">{t('eduDesc2')}</p>
                    </div>
                    <div className="timeline-item">
                      <span className="timeline-dot" />
                      <div className="timeline-meta">
                        <span className="timeline-date">{t('eduDate3')}</span>
                        <h4 className="timeline-title">{t('eduTitle3')}</h4>
                        <span className="timeline-school">{t('eduSchool3')}</span>
                      </div>
                      <p className="timeline-desc">{t('eduDesc3')}</p>
                    </div>
                    <div className="timeline-item">
                      <span className="timeline-dot" />
                      <div className="timeline-meta">
                        <span className="timeline-date">{t('eduDate4')}</span>
                        <h4 className="timeline-title">{t('eduTitle4')}</h4>
                        <span className="timeline-school">{t('eduSchool4')}</span>
                      </div>
                      <p className="timeline-desc">{t('eduDesc4')}</p>
                    </div>
                  </div>
                )}

                {activeAboutTab === 'terminal' && (
                  <TerminalConsole lang={lang} />
                )}
              </div>
            </motion.div>
          </div>
        </section>

        <hr className="divider" style={{ maxWidth: 1120, margin: "0 auto" }} />

        {/* ─── Skills ─── */}
        <section id="skills" className="section">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.div variants={fadeUp} className="section-capsule">
              <StarIcon />
              {t('skillsLabel')}
            </motion.div>
            <motion.h2 variants={fadeUp} className="section-title">
              {t('skillsTitle')}
            </motion.h2>
            <motion.p variants={fadeUp} className="section-desc">
              {t('skillsDesc')}
            </motion.p>
          </motion.div>

          <motion.div
            className="skills-grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
          >
            {TECH_STACK.map((tech) => (
              <motion.div
                key={tech.label}
                variants={fadeUp}
                className="skill-item"
                style={{ "--icon-color": `#${tech.icon.hex}` } as React.CSSProperties}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill={`#${tech.icon.hex}`}
                  aria-hidden="true"
                >
                  <path d={tech.icon.path} />
                </svg>
                <span>{tech.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </section>

        <hr className="divider" style={{ maxWidth: 1120, margin: "0 auto" }} />

        {/* ─── Projects ─── */}
        <section id="projects" className="section">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.div variants={fadeUp} className="section-capsule">
              <StarIcon />
              {t('projectsLabel')}
            </motion.div>
            <motion.h2 variants={fadeUp} className="section-title">
              {t('projectsTitle')}
            </motion.h2>
            <motion.p variants={fadeUp} className="section-desc">
              {t('projectsDesc')}
            </motion.p>
          </motion.div>

          <div className="projects-grid">
            {PROJECTS.map((project, idx) => (
              <motion.article
                key={project.name}
                className="card project-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
                onClick={() => setSelectedProject(project)}
                style={{ cursor: "pointer" }}
              >
                <ProjectCarousel images={project.images} />
                <div className="project-body">
                  <h3 className="project-name">{project.name}</h3>
                  <p className="project-desc">{getText(project.description, lang)}</p>
                  <div className="project-stack">
                    {project.stack.map((tech) => (
                      <span key={tech} className="tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                  {(project.github || project.live) && (
                    <div className="project-links">
                      {project.github && (
                        <a
                          href={project.github}
                          className="project-link"
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <GithubIcon />
                          GitHub
                        </a>
                      )}
                      {project.live && (
                        <a
                          href={project.live}
                          className="project-link"
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalIcon />
                          Live
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <hr className="divider" style={{ maxWidth: 1120, margin: "0 auto" }} />

        {/* ─── Hackathons ─── */}
        <section id="hackathons" className="section">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.div variants={fadeUp} className="section-capsule">
              <StarIcon />
              {t('hackathonsLabel')}
            </motion.div>
            <motion.h2 variants={fadeUp} className="section-title">
              {t('hackathonsTitle')}
            </motion.h2>
            <motion.p variants={fadeUp} className="section-desc">
              {t('hackathonsDesc')}
            </motion.p>
          </motion.div>

          <div className="hackathon-scroll">
            {HACKATHONS.map((hack, idx) => (
              <motion.div
                key={hack.title}
                className="card hackathon-card"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                onClick={() => setSelectedHackathon(hack)}
              >
                {hack.image || (hack.gallery && hack.gallery.length > 0) ? (
                  <HackathonImageCarousel
                    images={hack.gallery}
                    alt={hack.title}
                    defaultImage={hack.image}
                  />
                ) : (
                  <div className="hackathon-image-placeholder">
                    <span style={{ fontSize: "1.5rem" }}>
                      {hack.position === "1st Place"
                        ? "🥇"
                        : hack.position === "2nd Place"
                          ? "🥈"
                          : "🥉"}
                    </span>
                  </div>
                )}
                <div className="hackathon-body">
                  <div className={`hackathon-position ${hack.positionClass}`}>
                    {hack.position}
                  </div>
                  <h3 className="hackathon-title">{hack.title}</h3>
                  <p className="hackathon-scope">
                    {hack.year} · {hack.scope}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Hackathon Modal */}
        {selectedHackathon && (
          <HackathonModal
            hackathon={selectedHackathon}
            onClose={() => setSelectedHackathon(null)}
            lang={lang}
          />
        )}

        {/* Project Drawer */}
        <AnimatePresence>
          {selectedProject && (
            <ProjectDrawer
              project={selectedProject}
              onClose={() => setSelectedProject(null)}
              lang={lang}
            />
          )}
        </AnimatePresence>

        <hr className="divider" style={{ maxWidth: 1120, margin: "0 auto" }} />

        {/* ─── Contact ─── */}
        <section id="contact" className="contact-section">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="card-flat contact-card">
              <div>
                <div className="section-capsule">
                  <StarIcon />
                  {t('contactLabel')}
                </div>
                <h2 className="section-title">{t('contactTitle')}</h2>
                <p
                  className="section-desc"
                  style={{ marginTop: "0.5rem", maxWidth: 420 }}
                >
                  {t('contactDesc')}
                </p>
              </div>
              <div className="contact-links">
                <a href={`mailto:${CONTACT_EMAIL}`} className="btn-primary">
                  <MailIcon />
                  Email
                </a>
                <a
                  href={CONTACT_LINKEDIN}
                  className="btn-ghost"
                  target="_blank"
                  rel="noreferrer"
                >
                  <LinkedInIcon />
                  LinkedIn
                </a>
                <a
                  href={CONTACT_GITHUB}
                  className="btn-ghost"
                  target="_blank"
                  rel="noreferrer"
                >
                  <GithubIcon />
                  GitHub
                </a>
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <footer className="site-footer">
        © {new Date().getFullYear()} {t('footerText')}
      </footer>
    </div>
  );
}

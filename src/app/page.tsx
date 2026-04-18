"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  siC,
  siCplusplus,
  siCloudflare,
  siDart,
  siDocker,
  siGit,
  siJavascript,
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
} from "simple-icons";

const CONTACT_EMAIL = "vicor32leonel@gmail.com";
const CONTACT_LINKEDIN = "https://linkedin.com/in/victor-kangombe/";
const CONTACT_GITHUB = "https://github.com/leonel-the13";
const MATRIX_CHARS = "01#@$%*ABCDEF";
const MATRIX_COLUMNS = 18;

const PROJECTS = [
  {
    name: "Black Hole Academy",
    summary:
      "Contribuicao no backend com Java 17 e Spring Boot, com foco em APIs e infraestrutura.",
    stack: ["Java 17", "Spring Boot", "PostgreSQL", "Docker", "WAF"],
    flow: ["API", "Servico", "DB", "Redis", "ELK", "Nginx", "Observabilidade"],
  },
  {
    name: "InfraWatch",
    summary:
      "Backend de monitoramento em tempo real com alertas, SLA e WebSockets.",
    stack: ["NestJS", "PostgreSQL", "Prisma"],
    flow: ["Servicos", "Alertas", "Metricas", "SLA"],
  },
  {
    name: "Cesta Digital",
    summary: "Backend com autenticacao, doacoes em tempo real e monitoramento.",
    stack: ["NestJS", "Prisma", "Redis"],
    flow: ["Auth", "Campanhas", "Doacoes", "Cache"],
  },
  {
    name: "Mapa de Turismo Acessivel",
    summary: "Plataforma web com mapa interativo, filtros e API Flask.",
    stack: ["Python", "Flask", "Folium"],
    flow: ["Dados", "API", "Mapa", "KPIs"],
  },
  {
    name: "Inception",
    summary: "Infra orquestrada: NGINX, WordPress e MariaDB isolados.",
    stack: ["Docker", "NGINX", "MariaDB", "Docker Compose"],
    flow: ["NGINX", "WordPress", "DB"],
  },
  {
    name: "Webserver",
    summary: "HTTP engine com parsing manual, sockets e responses tipadas.",
    stack: ["C++ 98", "Sockets", "HTTP/1.1"],
    flow: ["Cliente", "Parser", "Roteador", "Resposta"],
  },
  {
    name: "Born2beroot",
    summary: "Hardening Linux, permissao e politicas de seguranca.",
    stack: ["Linux", "Seguranca", "SSH"],
    flow: ["Politicas", "Usuarios", "Auditoria"],
  },
];

const HACKATHONS = [
  {
    year: "2026",
    position: "1o Lugar",
    competition: "Hackathon OSTJA",
    scope: "Nacional",
  },
  {
    year: "2025",
    position: "2o Lugar",
    competition: "Africell Code Fast",
    scope: "Nacional",
  },
  {
    year: "2025",
    position: "3o Lugar",
    competition: "NASA Space Apps Challenge",
    scope: "Internacional",
  },
  {
    year: "2023",
    position: "3o Lugar",
    competition: "ISPTEC Programming Competition",
    scope: "Universidade",
  },
];

const ORBIT_ICONS = [
  { label: "Java", icon: siOpenjdk },
  { label: "C", icon: siC },
  { label: "C++", icon: siCplusplus },
  { label: "JavaScript", icon: siJavascript },
  { label: "TypeScript", icon: siTypescript },
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
  { label: "WAF", icon: siCloudflare },
  { label: "Git", icon: siGit },
];

const motionContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const motionItem = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

type MatrixColumn = {
  id: string;
  stream: string;
  left: string;
  duration: string;
  delay: string;
};

const createMatrixColumns = (): MatrixColumn[] =>
  Array.from({ length: MATRIX_COLUMNS }, (_, index) => {
    const streamLength = 36 + Math.floor(Math.random() * 16);
    const stream = Array.from({ length: streamLength }, () => {
      return MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)];
    }).join("");

    return {
      id: `matrix-${index}`,
      stream,
      left: `${index * (100 / MATRIX_COLUMNS)}%`,
      duration: `${10 + Math.random() * 8}s`,
      delay: `${Math.random() * 8}s`,
    };
  });

export default function Home() {
  const [matrixColumns, setMatrixColumns] = useState<MatrixColumn[]>([]);
  const [projectPage, setProjectPage] = useState(1);
  const projectsPerPage = 4;
  const totalProjectPages = Math.max(
    1,
    Math.ceil(PROJECTS.length / projectsPerPage),
  );
  const projectStart = (projectPage - 1) * projectsPerPage;
  const visibleProjects = PROJECTS.slice(
    projectStart,
    projectStart + projectsPerPage,
  );

  useEffect(() => {
    setMatrixColumns(createMatrixColumns());
  }, []);

  return (
    <div className="relative min-h-screen text-[var(--text-main)]">
      <div className="matrix-rain" aria-hidden="true">
        {matrixColumns.map((column) => (
          <span
            key={column.id}
            className="matrix-column"
            style={{
              left: column.left,
              animationDuration: column.duration,
              animationDelay: column.delay,
            }}
          >
            <span className="matrix-stream">{column.stream}</span>
          </span>
        ))}
      </div>
      <div className="scanlines" />
      <header className="fixed top-0 w-full z-20 bg-[rgba(2,12,27,0.75)] backdrop-blur border-b border-[var(--line-soft)]">
        <nav className="max-w-6xl mx-auto flex items-center justify-between px-5 sm:px-8 py-4">
          <div className="flex items-center gap-3">
            <span className="h-9 w-9 rounded-full bg-[var(--accent)]/20 border border-[var(--line-strong)] grid place-items-center text-sm font-semibold text-[var(--accent)]">
              VK
            </span>
            <div>
              <p className="text-sm tracking-[0.2em] text-[var(--accent)] uppercase">
                Centro de Comando
              </p>
              <p className="text-lg font-semibold">Victor Kangombe</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm text-[var(--text-dim)]">
            <a
              className="hover:text-[var(--accent)] transition"
              href="#overview"
            >
              Visao Geral
            </a>
            <a className="hover:text-[var(--accent)] transition" href="#stack">
              Tecnologias
            </a>
            <a
              className="hover:text-[var(--accent)] transition"
              href="#systems"
            >
              Infraestrutura
            </a>
            <a
              className="hover:text-[var(--accent)] transition"
              href="#projects"
            >
              Projetos
            </a>
            <a
              className="hover:text-[var(--accent)] transition"
              href="#hackathons"
            >
              Hackathons
            </a>
            <a
              className="hover:text-[var(--accent)] transition"
              href="#contact"
            >
              Contato
            </a>
          </div>
          <a
            href="#contact"
            className="hidden sm:inline-flex items-center gap-2 rounded-full border border-[var(--line-strong)] px-4 py-2 text-xs uppercase tracking-[0.2em] text-[var(--accent)] hover:bg-[var(--accent)]/10"
          >
            Canal Seguro
          </a>
        </nav>
      </header>

      <main className="relative z-10 pt-24 sm:pt-28">
        <section id="overview" className="relative overflow-hidden">
          <div className="grid-mesh" />
          <div className="section-block">
            <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] items-start">
              <motion.div
                variants={motionContainer}
                initial="hidden"
                animate="show"
              >
                <motion.p
                  variants={motionItem}
                  className="text-xs uppercase tracking-[0.4em] text-[var(--text-dim)]"
                >
                  Resumo Profissional
                </motion.p>
                <motion.h1
                  variants={motionItem}
                  className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight text-glow"
                >
                  Centro de Comando DevOps Ciber
                </motion.h1>
                <motion.p
                  variants={motionItem}
                  className="mt-4 text-base sm:text-lg text-[var(--text-dim)] max-w-xl"
                >
                  Desenvolvedor Backend e Infraestrutura - DevOps. Foco em Java
                  + Spring, APIs seguras e sistemas confiaveis com
                  observabilidade em tempo real.
                </motion.p>
                <motion.div variants={motionItem} className="mt-6 space-y-4">
                  <p className="text-sm uppercase tracking-[0.3em] text-[var(--accent)]">
                    Sobre Mim
                  </p>
                  <p className="text-sm text-[var(--text-dim)] max-w-xl">
                    Experiencia em programacao de sistemas, APIs seguras e
                    infraestrutura conteinerizada. Comunicacao clara e entrega
                    com qualidade tecnica.
                  </p>
                  <p className="text-sm text-[var(--text-dim)] max-w-xl">
                    Foco principal: Java e infraestrutura.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <a href="/resume.pdf" className="link-simple" download>
                      Baixar PDF
                    </a>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {[
                      "Java",
                      "Spring Boot",
                      "APIs REST",
                      "Docker",
                      "Observabilidade",
                    ].map((text) => (
                      <span
                        key={text}
                        className="text-xs uppercase tracking-[0.2em] text-[var(--accent)] border border-[var(--line-soft)] px-3 py-2 rounded-full"
                      >
                        {text}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>

              <motion.div
                variants={motionContainer}
                initial="hidden"
                animate="show"
              >
                <motion.div
                  variants={motionItem}
                  className="glow-border rounded-[var(--radius-lg)] bg-[rgba(10,25,47,0.6)] p-6 sm:p-8"
                >
                  <div className="flex flex-col sm:flex-row items-center gap-6">
                    <div className="avatar-ring">
                      <div className="avatar-core">
                        <div className="avatar-placeholder">
                          <img
                            src="/victor.jpg"
                            alt="Victor Kangombe"
                            className="avatar-photo"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="text-center sm:text-left">
                      <p className="text-xs uppercase tracking-[0.3em] text-[var(--text-dim)]">
                        No de Identidade
                      </p>
                      <h3 className="mt-2 text-xl font-semibold">
                        Victor Kangombe
                      </h3>
                      <p className="mt-2 text-sm text-[var(--text-dim)]">
                        Desenvolvedor Backend - Infraestrutura - DevOps
                      </p>
                      <div className="mt-4 flex flex-wrap justify-center sm:justify-start gap-2">
                        {["Luanda, Angola", "APIs", "Infra"].map((tag) => (
                          <span
                            key={tag}
                            className="text-[11px] uppercase tracking-[0.2em] border border-[var(--line-soft)] px-3 py-1 rounded-full text-[var(--accent)]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="mt-6">
                        <p className="text-xs uppercase tracking-[0.3em] text-[var(--text-dim)]">
                          Educacao
                        </p>
                        <div className="mt-2 space-y-2 text-sm text-[var(--text-dim)]">
                          <p>
                            Especialidade em DevOps & Segurança (42 Advanced) ·
                            presente
                          </p>
                          <p>
                            Engenheiro de Software (42 Common Core) · 2024 -
                            2026
                          </p>
                          <p>ISPTEC · presente</p>
                          <p>
                            Ensino medio em Ciências Físicas E Biológicas · 2020
                            - 2022
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        <section id="stack" className="section-block">
          <div className="stack-layout">
            <div>
              <h2 className="text-3xl sm:text-4xl font-semibold">
                Tecnologias
              </h2>
              <p className="mt-3 text-[var(--text-dim)] max-w-2xl">
                Tecnologias que uso diariamente em backend, DevOps e seguranca.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {ORBIT_ICONS.map((tech) => (
                  <span
                    key={tech.label}
                    className="text-[11px] uppercase tracking-[0.2em] border border-[var(--line-soft)] px-3 py-1 rounded-full text-[var(--accent)]"
                  >
                    {tech.label}
                  </span>
                ))}
              </div>
            </div>
            <div className="orbit-system float-slow" aria-label="Globo hacker">
              <div className="hacker-globe" />
              <div className="orbit-ring orbit-ring-1">
                {ORBIT_ICONS.slice(0, 8).map((tech, index) => (
                  <span
                    key={tech.label}
                    className="orbit-icon"
                    style={{
                      ["--angle" as string]: `${index * 45}deg`,
                      ["--radius" as string]: "150px",
                      color: `#${tech.icon.hex}`,
                    }}
                    title={tech.label}
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d={tech.icon.path} />
                    </svg>
                  </span>
                ))}
              </div>
              <div className="orbit-ring orbit-ring-2">
                {ORBIT_ICONS.slice(8, 16).map((tech, index) => (
                  <span
                    key={tech.label}
                    className="orbit-icon"
                    style={{
                      ["--angle" as string]: `${index * 45 + 22.5}deg`,
                      ["--radius" as string]: "205px",
                      color: `#${tech.icon.hex}`,
                    }}
                    title={tech.label}
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d={tech.icon.path} />
                    </svg>
                  </span>
                ))}
              </div>
              <p className="orbit-hint">Orbita continua</p>
            </div>
          </div>
        </section>

        <section id="systems" className="section-block">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <h2 className="text-3xl sm:text-4xl font-semibold">
                Visao de Infraestrutura
              </h2>
              <p className="mt-3 text-[var(--text-dim)] max-w-2xl">
                Painel de observabilidade inspirado em Grafana, com leitura
                rapida de disponibilidade, fluxo de dados e postura de
                seguranca.
              </p>
              <div className="mt-6 grid gap-4">
                <div className="glow-border rounded-[var(--radius-md)] bg-[rgba(10,25,47,0.55)] p-5">
                  <p className="text-xs uppercase tracking-[0.3em] text-[var(--accent)]">
                    Experiencia em Infraestrutura
                  </p>
                  <ul className="mt-3 space-y-2 text-sm text-[var(--text-dim)]">
                    <li>
                      Orquestracao com Docker Compose em ambientes locais.
                    </li>
                    <li>
                      Reverse proxy, isolamento de servicos e dependencias.
                    </li>
                    <li>Monitorizacao com metricas e alertas.</li>
                  </ul>
                </div>
              </div>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  {
                    title: "Fluxo de Dados",
                    detail:
                      "Usuario -> API -> Redis -> DB -> Logs -> Monitoramento",
                  },
                  {
                    title: "Escudo de Ameacas",
                    detail:
                      "WAF ativo, regras dinamicas, deteccao de anomalias.",
                  },
                  {
                    title: "Saude da Pipeline",
                    detail:
                      "Builds, deploys e rollback com telemetria em tempo real.",
                  },
                  {
                    title: "Conformidade",
                    detail:
                      "Auditoria, privilegio minimo e politicas de acesso.",
                  },
                ].map((card) => (
                  <div
                    key={card.title}
                    className="glow-border rounded-[var(--radius-md)] bg-[rgba(10,25,47,0.55)] p-5"
                  >
                    <p className="text-xs uppercase tracking-[0.3em] text-[var(--accent)]">
                      {card.title}
                    </p>
                    <p className="mt-3 text-sm text-[var(--text-dim)]">
                      {card.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="glow-border rounded-[var(--radius-lg)] bg-[rgba(2,12,27,0.65)] p-6 sm:p-8">
              <h3 className="text-sm uppercase tracking-[0.3em] text-[var(--text-dim)]">
                Sinais de Capacidade
              </h3>
              <div className="mt-6 space-y-4">
                {[
                  {
                    label: "Sistemas Distribuidos",
                    detail:
                      "Descoberta de servicos, retentativas, controle de carga",
                  },
                  {
                    label: "Postura de Seguranca",
                    detail: "WAF, hardening, resposta a incidentes",
                  },
                  {
                    label: "Observabilidade",
                    detail: "Rastreamento, metricas, logs, alertas",
                  },
                  {
                    label: "Algoritmos",
                    detail: "Resolucao de problemas, otimizacao, estruturas",
                  },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-[var(--radius-md)] border border-[var(--line-soft)] bg-[rgba(0,245,255,0.04)] p-4"
                  >
                    <p className="text-xs uppercase tracking-[0.25em] text-[var(--accent)]">
                      {stat.label}
                    </p>
                    <p className="mt-2 text-sm text-[var(--text-dim)]">
                      {stat.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="section-block">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-3xl sm:text-4xl font-semibold">
                Projetos Selecionados
              </h2>
              <p className="mt-3 text-[var(--text-dim)] max-w-2xl">
                Projetos apresentados com fluxo, tecnologia e responsabilidade
                bem definidos.
              </p>
            </div>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {visibleProjects.map((project) => (
              <article
                key={project.name}
                className="glow-border rounded-[var(--radius-lg)] bg-[rgba(10,25,47,0.55)] p-6 sm:p-7"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-[var(--text-main)]">
                    {project.name}
                  </h3>
                  <span className="text-xs uppercase tracking-[0.3em] text-[var(--accent)]">
                    Ativo
                  </span>
                </div>
                <p className="mt-3 text-sm text-[var(--text-dim)]">
                  {project.summary}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="text-[11px] uppercase tracking-[0.2em] border border-[var(--line-soft)] px-3 py-1 rounded-full text-[var(--accent)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="mt-6 rounded-[var(--radius-md)] border border-[var(--line-soft)] p-4 bg-[rgba(1,8,20,0.7)]">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--text-dim)]">
                    Fluxo de Dados
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {project.flow.map((node) => (
                      <span
                        key={node}
                        className="px-3 py-2 rounded-full bg-[rgba(0,245,255,0.08)] text-xs text-[var(--text-main)]"
                      >
                        {node}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--text-dim)] text-center sm:text-left">
              Pagina {projectPage} de {totalProjectPages}
            </p>
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="link-simple disabled:opacity-40"
                onClick={() => setProjectPage((page) => Math.max(1, page - 1))}
                disabled={projectPage === 1}
              >
                Anterior
              </button>
              <button
                type="button"
                className="link-simple disabled:opacity-40"
                onClick={() =>
                  setProjectPage((page) =>
                    Math.min(totalProjectPages, page + 1),
                  )
                }
                disabled={projectPage === totalProjectPages}
              >
                Proxima
              </button>
            </div>
          </div>
        </section>

        <section id="hackathons" className="section-block">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-3xl sm:text-4xl font-semibold">Hackathons</h2>
              <p className="mt-3 text-[var(--text-dim)] max-w-2xl">
                Resultados em competicoes nacionais e internacionais.
              </p>
            </div>
            <span className="text-xs uppercase tracking-[0.3em] text-[var(--accent)]">
              Destaques
            </span>
          </div>
          <div className="mt-8 hackathon-table">
            <div className="hackathon-row">
              <span className="hackathon-head">Ano</span>
              <span className="hackathon-head">Posicao</span>
              <span className="hackathon-head">Competicao</span>
              <span className="hackathon-head">Escala</span>
            </div>
            {HACKATHONS.map((item) => (
              <div
                key={`${item.year}-${item.competition}`}
                className="hackathon-row"
              >
                <span>{item.year}</span>
                <span className="text-[var(--accent)] font-semibold">
                  {item.position}
                </span>
                <span>{item.competition}</span>
                <span className="text-[var(--text-dim)]">{item.scope}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="section-block-tight">
          <div className="glow-border rounded-[var(--radius-lg)] bg-[rgba(2,12,27,0.75)] p-5 sm:p-8 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-3xl sm:text-4xl font-semibold">
                Contato Seguro
              </h2>
              <p className="mt-3 text-[var(--text-dim)] max-w-xl">
                Quer colaborar, revisar arquitetura ou abrir um canal seguro?
                Envie uma mensagem e respondo com prioridade.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href={`mailto:${CONTACT_EMAIL}`} className="link-simple">
                Enviar email
              </a>
              <a
                href={CONTACT_LINKEDIN}
                className="link-simple"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
              <a
                href={CONTACT_GITHUB}
                className="link-simple"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
              <a href="#overview" className="link-simple">
                Voltar ao topo
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

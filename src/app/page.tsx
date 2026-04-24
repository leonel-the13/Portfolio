"use client";

import { motion } from "framer-motion";
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
type Project = {
  name: string;
  description: string;
  stack: string[];
  images: string[];
  github?: string;
  live?: string;
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
  description: string;
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
    description:
      "Backend contribution with Java 17 and Spring Boot, focused on REST APIs, JWT authentication, and containerized infrastructure with Docker and NGINX.",
    stack: ["Java 17", "Spring Boot", "PostgreSQL", "Docker", "WAF"],
    images: ["/projects/black-hole-academy/cover.png"],
  },
  {
    name: "Cesta Digital",
    description:
      "Donation platform backend with authentication, real-time campaign tracking, Redis caching, and monitoring.",
    stack: ["NestJS", "Prisma", "Redis", "JWT"],
    images: ["/projects/cesta-digital/cover.png"],
  },
  {
    name: "Accessible Tourism Map",
    description:
      "Web platform with interactive map, accessibility filters, and Flask API serving geo-data with KPI dashboards.",
    stack: ["Python", "Flask", "Folium", "Leaflet"],
    images: ["/projects/tourism-map/cover.png"],
    github: "https://github.com/leonel-the13/MTA",
  },
  {
    name: "Inception",
    description:
      "Orchestrated infrastructure: NGINX, WordPress, and MariaDB running in isolated Docker containers with custom networking.",
    stack: ["Docker", "NGINX", "MariaDB", "Docker Compose"],
    images: ["/projects/inception/cover.png"],
    github: "https://github.com/leonel-the13/inseption",
  },
  {
    name: "Webserver",
    description:
      "HTTP engine built from scratch with manual parsing, raw sockets, and typed responses. Compliant with HTTP/1.1.",
    stack: ["C++ 98", "Sockets", "HTTP/1.1"],
    images: ["/projects/webserver/cover.png"],
  },
  {
    name: "Born2beroot",
    description:
      "Linux hardening project: user permissions, SSH configuration, firewall rules, and security policies.",
    stack: ["Linux", "Security", "SSH", "UFW"],
    images: ["/projects/born2beroot/cover.png"],
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
    gallery: [],
    description:
      "National hackathon organized by OSTJA. Developed a full solution addressing real-world infrastructure challenges.",
    team: "team",
    members: [
      {
        name: "Vicor Kangombe",
      },
      {
        name: "Joisson Miguel",
        linkedin: "https://www.linkedin.com/in/joisson-miguel",
      },
      {
        name: "Oriza Ebo",
        linkedin: "https://www.linkedin.com/in/orisa-melzira-ebo-aab95a267",
      },
      {
        name: "Willfredy Vieira Dias",
        linkedin: "https://www.linkedin.com/in/willfredy-vieira-dias",
      },
      {
        name: "Jessé Inglês",
        linkedin: "https://www.linkedin.com/in/jess%C3%A9ingl%C3%AAs",
      },
      {
        name: "Sebastião Sukuakueche  ",
        linkedin: "https://www.linkedin.com/in/sebastiao-sukuakueche",
      },
    ],
  },
  {
    title: "Africell Code Fast",
    position: "2nd Place",
    positionClass: "silver",
    year: "2025",
    scope: "National",
    image: "/hackathons/africell-code-fast/cover.JPEG",
    gallery: [],
    description:
      "Speed coding competition sponsored by Africell. System Design, Build and Debug.",
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
    gallery: [],
    description:
      "International hackathon by NASA. Worked on a solution leveraging open data for space and earth science applications.",
    team: "team",
    members: [
      { name: "Vicor Kangombe" },
      {
        name: "Oriza Ebo",
        linkedin: "https://www.linkedin.com/in/orisa-melzira-ebo-aab95a267",
      },
      {
        name: "Ângela Amaro",
        linkedin: "https://www.linkedin.com/in/angeamaro",
      },
      {
        name: "Reinaldo Sambing",
        linkedin: "https://www.linkedin.com/in/rsambing",
      },
      {
        name: "Paulo Gaspar",
        linkedin: "https://www.linkedin.com/in/opaulogaspar",
      },
      {
        name: "Nuno Mendes",
        linkedin: "https://www.linkedin.com/in/nuno-mendes-07a259253",
      },
    ],
  },
  {
    title: "ISPTEC Programming Competition",
    position: "3rd Place",
    positionClass: "bronze",
    year: "2023",
    scope: "University",
    image: "/hackathons/isptec-programming/cover.jpg",
    gallery: [],
    description:
      "Competitive programming contest at ISPTEC university, focused on algorithms and problem-solving.",
    team: "team",
    members: [
      { name: "Vicor Kangombe" },
      {
        name: "Reinaldo Sambing",
        linkedin: "https://www.linkedin.com/in/rsambing",
      },
      {
        name: "Jorge Carvalho",
        linkedin: "https://www.linkedin.com/in/jorge-de-carvalho-366899333",
      },
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
      <img
        src={images[current]}
        alt="Project screenshot"
        onError={() => setHasError((prev) => ({ ...prev, [current]: true }))}
      />
      {images.length > 1 && (
        <>
          <button
            className="project-carousel-nav prev"
            onClick={(e) => {
              e.stopPropagation();
              setCurrent((c) => (c - 1 + images.length) % images.length);
            }}
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
            aria-label="Next image"
          >
            ›
          </button>
          <div className="project-carousel-dots">
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
        </>
      )}
    </div>
  );
}

function HackathonModal({
  hackathon,
  onClose,
}: {
  hackathon: Hackathon;
  onClose: () => void;
}) {
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
            <div className="modal-gallery">
              {hackathon.gallery.map((img, i) => (
                <img key={i} src={img} alt={`${hackathon.title} ${i + 1}`} />
              ))}
            </div>
          )}
          <p
            style={{
              fontSize: "0.9375rem",
              color: "var(--text-secondary)",
              lineHeight: 1.7,
            }}
          >
            {hackathon.description}
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
              {hackathon.team === "solo" ? "Solo" : "Team"}
            </span>
            <span className="modal-meta-item">{hackathon.scope}</span>
          </div>
          {hackathon.team === "team" &&
            hackathon.members &&
            hackathon.members.length > 0 && (
              <div className="modal-members">
                <p className="modal-members-title">Team Members</p>
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

  useEffect(() => {
    setMatrixColumns(createMatrixColumns());
  }, []);

  const closeMobileMenu = useCallback(() => setMobileMenuOpen(false), []);

  const navItems = [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Hackathons", href: "#hackathons" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <div className="relative min-h-screen">
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

          <a href="/Victor-Resume.pdf" className="nav-cta" download>
            <DownloadIcon />
            Resume
          </a>

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
            href="/Victor-Resume.pdf"
            className="mobile-nav-link"
            download
            onClick={closeMobileMenu}
          >
            ↓ Download Resume
          </a>
        </div>
      )}

      {/* Main Content */}
      <main className="relative z-10">
        {/* ─── Hero ─── */}
        <section className="hero">
          <motion.div
            className="hero-content"
            variants={staggerContainer}
            initial="hidden"
            animate="show"
          >
            <motion.div variants={fadeUp} className="hero-badge">
              <span className="hero-badge-dot" />
              Available for work
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
                View Projects
              </a>
              <a href="#contact" className="btn-ghost">
                Get in Touch
              </a>
            </motion.div>
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
            <motion.p variants={fadeUp} className="section-label">
              About
            </motion.p>
            <motion.h2 variants={fadeUp} className="section-title">
              Backend-focused engineer
            </motion.h2>
            <motion.p variants={fadeUp} className="section-desc">
              Backend Developer focused on Java (Spring Boot) and Node.js
              (NestJS), building APIs with JWT authentication, Redis caching and
              Docker-based infrastructure.
            </motion.p>
          </motion.div>

          <div className="about-grid">
            <motion.div
              className="card-flat about-card"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <p className="about-card-title">Experience</p>
              <p className="about-text">
                Experience designing backend systems with reverse proxy (NGINX),
                real-time communication and observability practices. Interested
                in system reliability, DevOps and applied cybersecurity.
              </p>
            </motion.div>

            <motion.div
              className="card-flat about-card"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <p className="about-card-title">Education</p>
              <ul className="about-list">
                <li>
                  DevOps & Security Specialization (42 Advanced) · present
                </li>
                <li>Software Engineering (42 Common Core) · 2024 – 2026</li>
                <li>ISPTEC – Computer Science · present</li>
                <li>
                  High School – Physical & Biological Sciences · 2020 – 2022
                </li>
              </ul>
            </motion.div>

            <motion.div
              className="card-flat about-card"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <p className="about-card-title">Profile</p>
              <div className="profile-card" style={{ padding: 0 }}>
                <img
                  src="/victor.jpg"
                  alt="Victor Kangombe"
                  className="profile-avatar"
                />
                <div className="profile-info">
                  <h3>Victor Kangombe</h3>
                  <p className="profile-role">
                    Backend Engineer · DevOps · Infrastructure
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

            <motion.div
              className="card-flat about-card"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <p className="about-card-title">Languages</p>
              <ul className="about-list">
                <li>Portuguese · Native</li>
                <li>English · Intermediate</li>
              </ul>
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
            <motion.p variants={fadeUp} className="section-label">
              Tech Stack
            </motion.p>
            <motion.h2 variants={fadeUp} className="section-title">
              Technologies I work with
            </motion.h2>
            <motion.p variants={fadeUp} className="section-desc">
              Tools and languages I use daily for backend development, DevOps
              and infrastructure.
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
            <motion.p variants={fadeUp} className="section-label">
              Projects
            </motion.p>
            <motion.h2 variants={fadeUp} className="section-title">
              Selected work
            </motion.h2>
            <motion.p variants={fadeUp} className="section-desc">
              Projects with clear architecture, well-defined responsibility and
              real technical depth.
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
              >
                <ProjectCarousel images={project.images} />
                <div className="project-body">
                  <h3 className="project-name">{project.name}</h3>
                  <p className="project-desc">{project.description}</p>
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
            <motion.p variants={fadeUp} className="section-label">
              Competitions
            </motion.p>
            <motion.h2 variants={fadeUp} className="section-title">
              Hackathons & Awards
            </motion.h2>
            <motion.p variants={fadeUp} className="section-desc">
              Results from national and international competitions.
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
                {hack.image ? (
                  <img
                    src={hack.image}
                    alt={hack.title}
                    className="hackathon-image"
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
          />
        )}

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
                <p className="section-label">Contact</p>
                <h2 className="section-title">Let&#39;s work together</h2>
                <p
                  className="section-desc"
                  style={{ marginTop: "0.5rem", maxWidth: 420 }}
                >
                  Have a project in mind, want to discuss architecture or just
                  connect? Reach out and I&#39;ll respond promptly.
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
        © {new Date().getFullYear()} Victor Kangombe. Built with Next.js
      </footer>
    </div>
  );
}

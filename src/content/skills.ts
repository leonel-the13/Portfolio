import type { L } from "./types";

/** Um item é um nome próprio (string) ou um texto traduzido (L). */
export type SkillItem = string | L;

export const skills: { title: L; items: SkillItem[] }[] = [
  {
    title: { pt: "Segurança", en: "Security" },
    items: [
      "OWASP Top 10",
      { pt: "Segurança de APIs (JWT)", en: "API security (JWT)" },
      { pt: "Hardening de servidores Linux", en: "Linux server hardening" },
      "DevSecOps",
    ],
  },
  {
    title: { pt: "Ferramentas", en: "Tools" },
    items: ["Kali Linux", "Nmap", "Burp Suite", "Wireshark"],
  },
  {
    title: { pt: "Monitorização", en: "Monitoring" },
    items: [
      "Prometheus",
      "Grafana",
      { pt: "Alertas", en: "Alerting" },
      "Health checks",
      { pt: "Análise de logs", en: "Log analysis" },
    ],
  },
  {
    title: { pt: "Sistemas & Redes", en: "Systems & Networking" },
    items: [
      { pt: "Linux (administração e troubleshooting)", en: "Linux (administration and troubleshooting)" },
      "TCP/IP",
      "DNS",
      "HTTP/HTTPS",
    ],
  },
  {
    title: { pt: "Infraestrutura", en: "Infrastructure" },
    items: [
      "Docker",
      "Docker Compose",
      "NGINX",
      { pt: "Kubernetes (básico)", en: "Kubernetes (basic)" },
      "GitHub Actions (CI/CD)",
    ],
  },
  {
    title: { pt: "Desenvolvimento & Dados", en: "Development & Data" },
    items: [
      "Java (Spring Boot)",
      "Node.js (NestJS)",
      "TypeScript",
      "Python",
      "C/C++",
      "Bash",
      "PostgreSQL",
      "MySQL",
      "MariaDB",
      "Redis",
    ],
  },
];

# Redesign do portfólio — victor-kangombe.me

> Ficheiro de instruções para o Claude (Claude Code ou claude.ai).
> Objectivo: reconstruir **victor-kangombe.me** com a estrutura e o estilo de **rsambing.me**, usando o conteúdo do meu CV actual (perfil de Engenheiro de Software com foco em Infraestrutura e Segurança da Informação).
> As imagens serão adicionadas manualmente por mim. Usa apenas placeholders com os nomes de ficheiro indicados na secção 9.

---

## 1. Contexto

- **Dono:** Victor Kangombe, Luanda, Angola.
- **Posicionamento novo:** Engenheiro de Software | Infraestrutura e Segurança da Informação. Interesse em SOC (monitorização e resposta a incidentes).
- **Site actual:** single-page em Next.js, posicionado como "Backend Engineer | Java | Node.js | DevOps".
- **Site de referência:** https://rsambing.me (Next.js, multi-página, bilingue EN/PT).
- **Tom:** profissional, sóbrio e factual. Sem exageros, sem emojis, sem frases de marketing. O site tem de bater certo com o CV.

---

## 2. Análise do site actual (o que mudar)

| Problema actual                                             | Correcção                                                                                   |
| ----------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| Título "Backend Engineer \| Java \| Node.js \| DevOps"      | "Engenheiro de Software \| Infraestrutura e Segurança da Informação"                        |
| Badge "Disponível para novos projetos" (soa a freelancer)   | Remover, ou "Aberto a oportunidades em Segurança da Informação"                             |
| Contadores: 16 tecnologias no hero, mas 17 na secção Skills | Remover os contadores ou calculá-los automaticamente a partir dos dados                     |
| Não tem experiência profissional                            | Adicionar a C Software & Solutions (página Percurso)                                        |
| Não mostra nada de segurança                                | Adicionar o Laboratório de Cibersegurança, a categoria Segurança nas skills e o Cyber Drill |
| Falta o Cyber Drill nas competições                         | Adicionar em primeiro lugar                                                                 |
| Inglês "intermediate" (o CV diz B2)                         | Inglês B2                                                                                   |
| Skills em lista plana (inclui Dart, que não está no CV)     | Agrupar por categoria, igual ao CV (secção 7.4)                                             |
| Tudo numa só página                                         | Multi-página como a referência (secção 4)                                                   |
| CV ligado só em inglês                                      | Ligar o CV em PT e EN                                                                       |

---

## 3. Análise da referência (rsambing.me)

O que consegui confirmar a partir do conteúdo da página:

- **Stack:** Next.js com `next/image`. O projecto destacado usa Tailwind CSS e Framer Motion, provavelmente as mesmas do site.
- **Idiomas:** rotas `/en` e `/pt`.
- **Navegação:** Home, Gallery, Projects, Path, Articles.
- **Etiquetas numeradas** em formato `[ 01 / ABOUT ]`, `[ 03 / SKILLS ]`. Os cards também são numerados (01–04) e o projecto destacado tem a etiqueta "Featured Project - 01".
- **Home, por ordem:**
  1. Hero com imagem de fundo, "Hi, I'm", nome, cargo, botões "View My Work" e "Get In Touch", e indicador "Scroll"
  2. About com 2 parágrafos e 4 cards numerados (título e uma linha)
  3. Projecto destacado com imagem, título, descrição, tags, links (Details, Demo, GitHub) e "View All Projects →"
  4. Skills em 6 categorias numeradas, em texto simples
  5. Get In Touch com botão de email, botão WhatsApp (mensagem pré-preenchida), GitHub e LinkedIn
  6. Footer com © 2026 e links
- **Projects (`/projects`):** grupos "Open Source & Repositories" e "Production Projects". O card tem imagem, etiqueta numerada, título, descrição, tags e links.
- **Detalhe do projecto (`/projects/[slug]`):** "Back to Projects", galeria de screenshots com ecrã inteiro, título no formato "Nome – frase de benefício", resumo, tags, links e secção "About this project".
- **Path (`/experience`):** timeline numerada (01…07), da mais recente para a mais antiga. Cada entrada tem datas, cargo (H3), organização com link, descrição de 1 a 3 frases a começar por verbo, e tags.
- **Gallery (`/gallery`):** lista de momentos (título e data AAAA-MM-DD), cada um com página própria.
- **Articles (`/articles`):** filtro, contador "Showing X of Y", cards com título, data, excerto e tags, e link externo para o Medium.

**Não consegui confirmar** cores, fontes, espaçamentos e animações, porque a página foi lida como texto. Antes de definires o estilo final, pede-me screenshots de rsambing.me (hero, about, projectos, timeline) e copia a direcção visual a partir deles. Enquanto não houver screenshots, usa a direcção da secção 5.

---

## 4. Arquitectura do novo site

**Stack**

- Next.js (App Router) com TypeScript
- Tailwind CSS
- Framer Motion (animações discretas de entrada ao fazer scroll)
- next-intl para PT (por defeito) e EN, com selector de idioma no header
- `lucide-react` para ícones
- Deploy na Vercel; manter o domínio victor-kangombe.me

**Rotas**

| Rota                        | Conteúdo                                                          |
| --------------------------- | ----------------------------------------------------------------- |
| `/[locale]`                 | Home: hero, sobre, projecto destacado, skills, contacto           |
| `/[locale]/projects`        | Todos os projectos, agrupados por categoria                       |
| `/[locale]/projects/[slug]` | Detalhe de cada projecto                                          |
| `/[locale]/path`            | Percurso: timeline com experiência, formação e competições        |
| `/[locale]/gallery`         | Galeria de eventos e competições                                  |
| `/[locale]/gallery/[slug]`  | Fotos de um evento                                                |
| `/[locale]/articles`        | Opcional: fica escondido até haver artigos (flag `SHOW_ARTICLES`) |

**Dados**

- Todo o conteúdo vem de ficheiros em `/content` (`profile.ts`, `experience.ts`, `projects.ts`, `skills.ts`, `competitions.ts`, `gallery.ts`), com textos em PT e EN.
- Não pode haver texto de conteúdo escrito à mão nos componentes. Assim, para actualizar o site, só edito `/content`.
- Os contadores (se existirem) são calculados a partir dos dados.

---

## 5. Direcção visual (provisória, até chegarem screenshots)

- **Tema escuro por defeito**, com opção de tema claro.
- **Paleta sóbria:** fundo quase preto (`#0B0F14`), texto `#E6EDF3`, texto secundário `#8B949E`, uma cor de destaque (verde terminal `#3FB950` ou azul `#58A6FF`; escolher uma e manter).
- **Tipografia:** sans-serif limpa para o texto (Inter ou Geist) e monoespaçada (JetBrains Mono ou Geist Mono) para etiquetas, tags, datas e números.
- **Etiquetas de secção** em mono, no formato `[ 01 / SOBRE ]`, como na referência.
- **Cards** com borda fina (`1px`, cor subtil), cantos pouco arredondados e hover com leve mudança de borda ou elevação. Sem sombras pesadas.
- **Animações:** fade e slide curtos (200–400 ms) na entrada de secções. Respeitar `prefers-reduced-motion`.
- **Detalhe de identidade (segurança):** o hero pode ter uma linha estilo terminal, por exemplo `$ whoami → victor-kangombe`, com cursor a piscar. Só um detalhe, sem transformar o site num tema "hacker".
- **Layout:** largura máxima de cerca de 1100 px, bom espaçamento vertical entre secções, e responsivo a partir de 360 px.

---

## 6. Navegação, header e footer

- **Header:** nome (link para a home), links Início, Projectos, Percurso, Galeria, selector PT/EN, e botão "CV" que abre o PDF no idioma activo.
- **Mobile:** menu hambúrguer.
- **Footer:** "© 2026 Victor Kangombe", GitHub, LinkedIn e email.

---

## 7. Conteúdo (PT / EN)

### 7.1 Hero

- **PT:** "Olá, eu sou" / **Victor Kangombe** / "Engenheiro de Software | Infraestrutura e Segurança da Informação"
- **EN:** "Hi, I'm" / **Victor Kangombe** / "Software Engineer | Infrastructure & Information Security"
- **Linha terminal:** `$ whoami` → `victor-kangombe — luanda, angola`
- **Botões:** "Ver projectos" / "View my work" e "Entrar em contacto" / "Get in touch"

### 7.2 Sobre — `[ 01 / SOBRE ]`

**PT**

> Sou Engenheiro de Software, com experiência no desenvolvimento de APIs em Java e na gestão de infraestrutura com Docker, NGINX e monitorização de serviços.
>
> Interesso-me por segurança da informação, em particular pela monitorização de sistemas e pela resposta a incidentes. Gosto de trabalhar em equipa, de resolver problemas sob pressão e de aprender novas ferramentas depressa.

**EN**

> I'm a Software Engineer with experience building APIs in Java and managing infrastructure with Docker, NGINX and service monitoring.
>
> I'm interested in information security, especially systems monitoring and incident response. I enjoy working in teams, solving problems under pressure and picking up new tools quickly.

**4 cards numerados**

| #   | PT                                                                          | EN                                                                          |
| --- | --------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| 01  | **Backend** — APIs REST escaláveis em Java e Spring Boot                    | **Backend** — Scalable REST APIs with Java and Spring Boot                  |
| 02  | **Infraestrutura** — Docker, NGINX e pipelines CI/CD                        | **Infrastructure** — Docker, NGINX and CI/CD pipelines                      |
| 03  | **Monitorização** — Métricas, dashboards e alertas com Prometheus e Grafana | **Monitoring** — Metrics, dashboards and alerts with Prometheus and Grafana |
| 04  | **Segurança** — Testes em laboratório, hardening e DevSecOps                | **Security** — Lab testing, hardening and DevSecOps                         |

### 7.3 Projectos — `[ 02 / PROJECTOS ]`

**Destaque na home:** Laboratório de Cibersegurança.

**Categorias na página `/projects`:**

- "Segurança & Infraestrutura": Laboratório de Cibersegurança, Laboratório de Monitorização, Inception
- "Backend & Produção": Black Hole Academy, Cesta Digital, Mapa de Turismo Acessível
- "Sistemas & Baixo Nível": Servidor HTTP em C++

| slug                     | Título                                                       | Ano  | Resumo (PT)                                                                                                                                                                                                 | Tags                                                        | Links                               |
| ------------------------ | ------------------------------------------------------------ | ---- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- | ----------------------------------- |
| `cyber-lab`              | Laboratório de Cibersegurança – Prática ofensiva e defensiva | 2026 | Ambiente com Kali Linux e máquinas vulneráveis para prática de testes de intrusão e análise de ataques. Reconhecimento com Nmap, testes a aplicações web com Burp Suite e análise de tráfego com Wireshark. | Kali Linux, Nmap, Burp Suite, Wireshark                     | GitHub (a preencher)                |
| `black-hole-academy`     | Black Hole Academy – Plataforma educacional                  | 2026 | Backend em Java e Spring Boot com autenticação JWT; infraestrutura com Docker, NGINX e Prometheus.                                                                                                          | Java 17, Spring Boot, PostgreSQL, Docker, NGINX, Prometheus | —                                   |
| `monitoring-lab`         | Laboratório de Monitorização – Observabilidade de serviços   | 2026 | Prometheus, Grafana e Node Exporter com dashboards de recursos e alertas de disponibilidade.                                                                                                                | Prometheus, Grafana, Node Exporter, Docker Compose          | GitHub (a preencher)                |
| `cesta-digital`          | Cesta Digital – Plataforma de doações                        | 2026 | Backend com autenticação, acompanhamento de campanhas em tempo real, cache Redis e monitorização, orquestrado com Docker Compose.                                                                           | NestJS, Prisma, Redis, JWT                                  | —                                   |
| `inception`              | Inception – Infraestrutura em contentores                    | 2025 | NGINX com TLS, WordPress e MariaDB em contentores isolados, com rede própria e volumes persistentes. Projecto da 42 Luanda.                                                                                 | Docker, Docker Compose, NGINX, MariaDB, TLS                 | GitHub (a preencher)                |
| `mapa-turismo-acessivel` | Mapa de Turismo Acessível – Mapa interactivo com KPIs        | 2025 | API em Flask com dados geográficos, filtros de acessibilidade e dashboards de KPIs.                                                                                                                         | Python, Flask, Folium, Leaflet                              | https://github.com/leonel-the13/MTA |
| `webserv`                | Servidor HTTP em C++ – HTTP/1.1 de raiz                      | 2025 | Servidor HTTP/1.1 desenvolvido de raiz com sockets e tratamento manual de pedidos. Projecto da 42 Luanda.                                                                                                   | C++98, Sockets, HTTP/1.1                                    | GitHub (a preencher)                |

Os textos em EN dos projectos devem ser traduções fiéis destes, sem acrescentar funcionalidades. Os links "a preencher" ficam como `null`, e o botão só aparece se houver URL.

**Página de detalhe:** voltar aos projectos, galeria de screenshots (placeholders) com ecrã inteiro, título, resumo, tags, links (Código / Demo), e secção "Sobre este projecto" com campos opcionais: `objectivo`, `o que fiz`, `o que aprendi`. Uma secção vazia não aparece.

### 7.4 Skills — `[ 03 / COMPETÊNCIAS ]`

Seis categorias numeradas, iguais ao CV:

| #   | PT                      | EN                   | Itens                                                                                                    |
| --- | ----------------------- | -------------------- | -------------------------------------------------------------------------------------------------------- |
| 01  | Segurança               | Security             | OWASP Top 10, segurança de APIs (JWT), hardening de servidores Linux, DevSecOps                          |
| 02  | Ferramentas             | Tools                | Kali Linux, Nmap, Burp Suite, Wireshark                                                                  |
| 03  | Monitorização           | Monitoring           | Prometheus, Grafana, alertas, health checks, análise de logs                                             |
| 04  | Sistemas & Redes        | Systems & Networking | Linux (administração e troubleshooting), TCP/IP, DNS, HTTP/HTTPS                                         |
| 05  | Infraestrutura          | Infrastructure       | Docker, Docker Compose, NGINX, Kubernetes (básico), GitHub Actions (CI/CD)                               |
| 06  | Desenvolvimento & Dados | Development & Data   | Java (Spring Boot), Node.js (NestJS), TypeScript, Python, C/C++, Bash, PostgreSQL, MySQL, MariaDB, Redis |

Mostrar como texto ou tags simples, sem barras de percentagem nem "níveis".

### 7.5 Percurso (`/path`) — `[ PERCURSO ]`

**Subtítulo PT:** "Experiência, formação e competições que marcaram o meu percurso."
**Subtítulo EN:** "Experience, education and competitions along my journey."

Timeline numerada, da mais recente para a mais antiga. Cada entrada tem um tipo (Experiência, Formação ou Competição), mostrado como etiqueta mono.

| #   | Datas           | Tipo        | Título                                                   | Organização                       | Descrição (PT)                                                                                                                                                                                            | Tags                                                  |
| --- | --------------- | ----------- | -------------------------------------------------------- | --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| 01  | 2026 – Presente | Experiência | Engenheiro de Software                                   | C Software & Solutions            | Desenvolvimento de APIs REST escaláveis em Java com JWT e soluções com multithreading. Conteinerização com Docker e NGINX, monitorização com Prometheus e Grafana, e práticas de DevSecOps nos pipelines. | Java, Spring Boot, Docker, NGINX, Prometheus, Grafana |
| 02  | 2026            | Competição  | 1.º lugar — Cyber Drill                                  | AfricaCERT & SADC (internacional) | (descrição a preencher por mim)                                                                                                                                                                           | Cibersegurança                                        |
| 03  | 2025 – Presente | Formação    | Licenciatura em Engenharia Informática                   | ISPTEC                            | —                                                                                                                                                                                                         | —                                                     |
| 04  | 2024 – Presente | Formação    | Ciência da Computação (Common Core + DevOps & Segurança) | 42 Luanda                         | Formação prática por projectos em C, C++, sistemas Unix, redes e infraestrutura.                                                                                                                          | C, C++, Linux, Docker                                 |

### 7.6 Competições

Grelha de cards na home (secção `[ 04 / COMPETIÇÕES ]`) e também listadas no Percurso. Cada card tem imagem, badge de posição, nome, ano e nível.

| Posição | Competição                       | Ano  | Nível                                                   |
| ------- | -------------------------------- | ---- | ------------------------------------------------------- |
| 1.º     | Cyber Drill — AfricaCERT & SADC  | 2026 | Internacional                                           |
| 1.º     | Hackathon OSTJA                  | 2026 | Nacional                                                |
| 2.º     | Angotic Hackathon                | 2026 | Nacional                                                |
| 2.º     | Africell Code Fast               | 2025 | Nacional                                                |
| 3.º     | NASA Space Apps Challenge        | 2025 | Nacional (confirmar: o site actual diz "internacional") |
| 3.º     | Competição de Programação ISPTEC | 2023 | Universitário                                           |

O Cyber Drill tem destaque visual leve (borda na cor de destaque), sem exagero.

### 7.7 Galeria (`/gallery`)

**Subtítulo PT:** "Momentos, eventos e competições do meu percurso."
**Subtítulo EN:** "Moments, events and competitions along my journey."

Uma entrada por competição ou evento (título e data AAAA-MM-DD), cada uma com página própria e grelha de fotos com lightbox. As fotos são placeholders.

### 7.8 Contacto — `[ 05 / CONTACTO ]`

- **PT:** "Vamos conversar" — "Estou aberto a oportunidades em segurança da informação, infraestrutura e desenvolvimento backend."
- **EN:** "Let's talk" — "I'm open to opportunities in information security, infrastructure and backend development."
- **Botões:**
  - Email (`mailto:vicor32leonel@gmail.com`)
  - WhatsApp (`https://wa.me/244923794545`, mensagem PT pré-preenchida: "Olá Victor, vi o seu portfólio e gostaria de falar consigo.")
  - LinkedIn (https://linkedin.com/in/victor-kangombe)
  - GitHub (https://github.com/leonel-the13)
- **Idiomas** (pode ficar aqui ou no Sobre): Português — nativo · Inglês — B2

---

## 8. SEO e metadados

- **Título PT:** "Victor Kangombe — Engenheiro de Software | Infraestrutura e Segurança"
- **Descrição PT:** "Portfólio de Victor Kangombe, Engenheiro de Software em Luanda, com foco em infraestrutura, monitorização e segurança da informação."
- Equivalentes em EN.
- Open Graph e Twitter card (`summary_large_image`) com `/images/og-cover.png` (1200×630).
- `hreflang` para PT e EN, `sitemap.xml` e `robots.txt`.
- Favicon a partir das iniciais "VK".

---

## 9. Imagens (eu adiciono manualmente)

Cria esta estrutura com placeholders (bloco cinzento com o nome do ficheiro), para eu só substituir os ficheiros:

```
/public/images/
  profile.jpg              (foto de perfil, 800x800)
  hero-bg.jpg              (fundo do hero, opcional)
  og-cover.png             (1200x630)
  projects/
    cyber-lab-1.png ... cyber-lab-3.png
    black-hole-academy-1.png ...
    monitoring-lab-1.png ...
    cesta-digital-1.png ...
    inception-1.png ...
    mapa-turismo-acessivel-1.png ...
    webserv-1.png ...
  competitions/
    cyber-drill.jpg
    ostja.jpg
    angotic.jpg
    africell-code-fast.jpg
    nasa-space-apps.jpg
    isptec-programacao.jpg
  gallery/<slug-do-evento>/1.jpg, 2.jpg, ...
/public/cv/
  Victor-Kangombe-CV-PT.pdf
```

Se uma imagem não existir, o componente mostra o placeholder em vez de quebrar.

---

## 10. Qualidade

- Lighthouse acima de 90 em Performance, Acessibilidade e SEO.
- Contraste AA, navegação por teclado e `alt` em todas as imagens.
- Sem texto inventado: se faltar informação, deixa um comentário `// TODO(victor): ...` em vez de inventar.
- Código limpo, com componentes reutilizáveis (`SectionLabel`, `ProjectCard`, `TimelineItem`, `SkillGroup`, `CompetitionCard`).
- No fim, dá-me a lista dos ficheiros criados e dos TODOs que tenho de preencher.

---

## 11. Ordem de trabalho para o Claude

1. Pedir-me screenshots de rsambing.me, se ainda não as tiver dado, e ajustar a secção 5.
2. Criar o projecto Next.js com Tailwind, Framer Motion e next-intl.
3. Criar `/content` com todos os dados acima (PT e EN).
4. Construir o layout (header, footer, selector de idioma, tema).
5. Construir a Home, depois Projectos e o detalhe, Percurso e Galeria.
6. SEO, sitemap e placeholders de imagens.
7. Rever o responsivo (360 px, 768 px, 1280 px) e a acessibilidade.
8. Listar os TODOs pendentes.

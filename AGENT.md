# AGENT.md — Portfolio Context

> Lê este ficheiro **sempre** que recebes um novo prompt do Victor antes de qualquer acção.
> Actualiza este ficheiro sempre que fizeres mudanças significativas ao projecto.
> A especificação completa do redesign está em `portfolio-redesign.md`.

---

## Projecto

**Tipo:** Next.js 16 (App Router) + TypeScript + Tailwind CSS v4 + Framer Motion, export estático (`out/`)
**Dono:** Victor Kangombe — Engenheiro de Software | Infraestrutura e Segurança da Informação
**Domínio:** https://victor-kangombe.me
**Referência visual:** https://rsambing.me
**GitHub:** https://github.com/leonel-the13 · **LinkedIn:** https://linkedin.com/in/victor-kangombe · **Email:** vicor32leonel@gmail.com

---

## Regra principal

**Todo o texto vem de `src/content/`.** Os componentes não têm texto escrito à mão. Para actualizar o site, edita só `src/content/`:

| Ficheiro | Conteúdo |
|---|---|
| `profile.ts` | Nome, cargo, sobre, cards de foco, idiomas, contactos, CV, SEO, `site.url` |
| `projects.ts` | Projectos, categorias, projecto em destaque (`featuredProjectSlug`) |
| `skills.ts` | 6 categorias de competências |
| `experience.ts` | Timeline do Percurso (experiência e formação) |
| `competitions.ts` | Competições + equipas |
| `gallery.ts` | Eventos da galeria e as fotos de cada um |
| `ui.ts` | Textos de interface (navegação, botões, títulos) |

Texto traduzido usa `{ pt, en }`. Nomes próprios ficam como string simples.
Se faltar informação, deixa `// TODO(victor): ...` em vez de inventar.

---

## Rotas

| Rota | Ficheiro |
|---|---|
| `/` | `src/app/(root)/page.tsx` — redirecciona para `/pt/` ou `/en/` |
| `/[locale]` | Home: hero, sobre, destaque, competências, competições, contacto |
| `/[locale]/projects` e `/[locale]/projects/[slug]` | Lista e detalhe de projectos |
| `/[locale]/path` | Percurso (timeline de experiência e formação) |
| `/[locale]/gallery` e `/[locale]/gallery/[slug]` | Galeria e fotos de cada evento (lightbox) |

Há dois root layouts: `(root)/layout.tsx` (só o redirect) e `[locale]/layout.tsx` (site).
Artigos: desligado (`site.showArticles = false`), ainda sem rota.

---

## Componentes (`src/components/`)

`ui.tsx` (SectionLabel, SectionHeader, Tag, TagList, ButtonLink), `Header`, `Footer`, `PageHeader`, `ProjectCard` (+ ProjectLinks), `TimelineItem`, `SkillGroup`, `CompetitionCard`, `PhotoGallery` (grelha + lightbox), `SmartImage` (imagem ou placeholder), `Reveal` (fade-in ao fazer scroll), `icons.tsx`.

Efeitos (`src/components/effects/`): `DecryptText` (títulos decifram-se ao entrar no ecrã), `TypeText` (escrita letra a letra no hero), `CountUp` (números), `GlobalEffects` (barra de progresso de scroll, spotlight nos cards com a classe `.spotlight`, assinatura na consola). `SessionTerminal` mostra dados da sessão do visitante, calculados só no browser. `Marquee` é a faixa de tecnologias. A transição entre páginas está em `src/app/[locale]/template.tsx` (CSS). Todas as animações respeitam `prefers-reduced-motion`.

`src/lib/assets.ts` lê as fotos das pastas no build (`galleryImages`, `projectImages`): **as fotos não se listam no conteúdo**, vêm de `public/images/gallery/<slug>/` e `public/images/projects/<slug>/`. Sem fotos, `SmartImage` gera uma capa com o título. O lightbox (`PhotoGallery`) é renderizado num portal em `<body>`. `npm run images` prepara fotos novas (HEIC → JPG, 1600px, sem EXIF/GPS).

---

## Design system (`src/app/globals.css`)

- Tema escuro por defeito, tema claro opcional (`data-theme` no `<html>`, guardado em `localStorage`).
- Tokens RGB em `:root`: `--background`, `--foreground`, `--muted`, `--secondary`, `--border`, `--accent` (#3B82F6), `--accent-strong`, `--accent-soft`. Usados como `bg-background`, `text-muted`, `border-accent/40`, etc.
- Fontes: Bebas Neue (`font-display`, títulos em maiúsculas), Archivo (texto), JetBrains Mono (`font-label`, etiquetas em maiúsculas).
- Cantos rectos, bordas de 1px, sem sombras pesadas. Etiquetas no formato `[ 01 / SOBRE ]`.

---

## Imagens

```
public/images/profile.jpg            foto (hero)
public/images/og-cover.png           1200×630 (gerada a partir da foto)
public/images/projects/<slug>/       screenshots de cada projecto
public/images/gallery/<slug>/        fotos de cada evento
public/images/competitions/          imagens de competições sem pasta de galeria (cyber-drill.jpg)
originals/images/...                  fotos originais em alta resolução (fora do site, no .gitignore)
public/cv/Victor-Kangombe-CV-PT.pdf  (o EN ainda não existe; o botão CV em inglês usa o PT)
```

---

## Histórico

### 2026-10-13 — Redesign completo
- Single-page substituído por site multi-página bilingue (PT/EN) inspirado em rsambing.me.
- Novo posicionamento: Infraestrutura e Segurança da Informação. Adicionados experiência (C Software & Solutions), Cyber Drill, Laboratório de Cibersegurança e de Monitorização.
- Conteúdo movido para `src/content/`; imagens reorganizadas em `public/images/`.
- SEO: metadados por página, hreflang, Open Graph, `sitemap.xml`, `robots.txt`, favicon "VK".

### 2026-10-13 — Animações e detalhes de cibersegurança
- Foto do hero mais nítida (degradês só nas margens), mira à volta do rosto e linha de scan.
- Terminal `recon.sh` com dados da sessão do visitante (inspirado em lrafael.tech), estatísticas calculadas dos dados, faixa de tecnologias, títulos com efeito decrypt, spotlight nos cards, barra de progresso, transição entre páginas, estado "sistemas operacionais" no footer.
- Fotos novas do Cyber Drill e do FTL Tourism Hackathon convertidas (HEIC → JPG, máx. 1600px, sem EXIF/GPS); originais em `originals/`.
- CV PT novo em `public/cv/`; o CV EN antigo (posicionamento "Backend Engineer") foi removido.

### 2026-10-13 — Fotos dinâmicas, Percurso completo, correcção do lightbox
- Fotos lidas das pastas no build; capas geradas quando não há imagens; `npm run images` para preparar fotos novas.
- Lightbox em portal (antes abria fora do ecrã por causa da animação de página com `fill-mode: both`, e a página parecia congelada).
- Percurso: Ensino Médio (Pim Pam Pum, 2020), ISPTEC (2022), 42 Common Core, CSS (2026), 42 Advanced DevOps & Security (2026).
- ISPTEC Programação passou a 2024; FTL Tourism Hackathon como "Finalista" (bootcamp sem ranking).
- Percurso só com experiência e formação (competições ficam na home e na galeria).

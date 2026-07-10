# AGENT.md — Portfolio Context

> Lê este ficheiro **sempre** que recebes um novo prompt do Victor antes de qualquer acção.
> Actualiza este ficheiro sempre que fizeres mudanças significativas ao projecto.

---

## 🗂️ Projecto

**Tipo:** Next.js 14 (App Router) + TypeScript  
**Localização:** `/home/vleonlel/Documents/Portfolio`  
**Dono:** Victor Kangombe — Backend Engineer (Java, Node.js, DevOps)  
**Repo GitHub:** https://github.com/leonel-the13  
**LinkedIn:** https://linkedin.com/in/victor-kangombe/  
**Email:** vicor32leonel@gmail.com  

---

## 🗃️ Estrutura de Ficheiros

```
Portfolio/
├── src/app/
│   ├── page.tsx        ← Componente principal (1 único ficheiro, ~1100 linhas)
│   └── globals.css     ← Todos os estilos (~1094 linhas, CSS puro com tokens)
├── public/
│   ├── victor.jpg              ← Foto de perfil
│   ├── ea9e27d6-...JPG         ← Foto do nav avatar
│   ├── victor-resume-en.pdf
│   ├── projects/
│   │   ├── black-hole-academy/ ← cover.png + 6 imagens JPG/JPEG
│   │   ├── cesta-digital/      ← cover.png apenas
│   │   ├── tourism-map/        ← cover.png apenas
│   │   ├── inception/          ← cover.png apenas
│   │   ├── webserver/          ← cover.png apenas
│   │   └── born2beroot/        ← cover.png apenas
│   └── hackathons/
│       ├── africell-code-fast/ ← cover.JPEG + 5 imagens
│       ├── angotic2026/        ← cover.jpeg + 4 imagens (IMG_8664, IMG_9610, IMG_9614, IMG_9615)
│       ├── hackathon-ostja/    ← cover.jpg + 4 imagens (IMG_8639, IMG_8640, CB8DB85C, Screenshot)
│       ├── isptec-programming/ ← cover.jpg apenas
│       └── nasa-space-apps/    ← cover.png + 3 imagens (IMG_5767, IMG_5783, 8080748F)
```

---

## 🎨 Design System (globals.css)

**Paleta:**
- Fundo: `#0b0f1a` (deep), `#101624` (primary), `#141a2e` (card)
- Accent: `#38bdf8` (azul cyan)
- Texto: `#e2e8f0` (primary), `#94a3c2` (secondary), `#64748b` (tertiary)
- Accent-green: `#34d399`, Accent-amber: `#fbbf24`, Accent-rose: `#f472b6`

**Fontes:** Inter (sans), JetBrains Mono (mono)  
**Radius:** sm=8px, md=12px, lg=16px, xl=20px  
**Header height:** 64px  

---

## 🧩 Componentes em page.tsx

| Componente | Descrição |
|---|---|
| `ProjectCarousel` | Carousel automático (5s), dots + nav buttons, fade transition |
| `HackathonModal` | Modal com carousel e dots indicator, equipa, meta |
| `ProjectDrawer` | Painel lateral que surge do lado direito com carousel de imagens, stack, função, desafios e resultados do projecto |
| `Home` (main) | Componente principal, renderiza tudo |

**Sections:** Hero → About → Skills → Projects → Hackathons → Contact

---

## 📦 Dados — PROJECTS array

| Nome | Imagens | GitHub |
|---|---|---|
| Black Hole Academy | cover.png + 6 JPGs | — |
| Cesta Digital | cover.png | — |
| Accessible Tourism Map | cover.png | https://github.com/leonel-the13/MTA |
| Inception | cover.png | https://github.com/leonel-the13/inseption |
| Webserver | cover.png | — |
| Born2beroot | cover.png | — |

---

## 🏆 Dados — HACKATHONS array

| Hackathon | Posição | Galeria | Team |
|---|---|---|---|
| Hackathon OSTJA | 🥇 1st (Gold) | 5 imagens | Team (6 pessoas) |
| ANGOTIC 2026 | 🥈 2nd (Silver) | 5 imagens | Team (3 pessoas) |
| Africell Code Fast | 🥈 2nd (Silver) | 6 imagens | Solo |
| NASA Space Apps | 🥉 3rd (Bronze) | 4 imagens | Team (6 pessoas) |
| ISPTEC Programming | 🥉 3rd (Bronze) | 1 imagem | Team (3 pessoas) |

---

## 🤝 Membros de Equipa Recorrentes

| Nome | LinkedIn |
|---|---|
| Joisson Miguel | https://www.linkedin.com/in/joisson-miguel |
| Oriza Ebo | https://www.linkedin.com/in/orisa-melzira-ebo-aab95a267 |
| Reinaldo Sambing | https://www.linkedin.com/in/rsambing |
| Jorge Carvalho | https://www.linkedin.com/in/jorge-de-carvalho-366899333|
| Willfredy Vieira Dias | https://www.linkedin.com/in/willfredy-vieira-dias |
| Jessé Inglês | https://www.linkedin.com/in/jess%C3%A9ingl%C3%AAs |
| Sebastião Sukuakueche | https://www.linkedin.com/in/sebastiao-sukuakueche |
| Ângela Amaro | https://www.linkedin.com/in/angeamaro |
| Paulo Gaspar | https://www.linkedin.com/in/opaulogaspar |
| Nuno Mendes | https://www.linkedin.com/in/nuno-mendes-07a259253 |

---

## 📝 Histórico de Mudanças

### 2026-07-10 (Sessão 1)
- Adicionadas todas as imagens disponíveis nos arrays `images[]` dos projetos
- Populados todos os `gallery[]` dos hackathons com imagens existentes

### 2026-07-10 (Sessão 2) — CONCLUÍDO
- Criado `AGENT.md` e `task.md`.
- Adicionado hackathon ANGOTIC 2026 (2º lugar, Nacional, 3 membros: Victor, Joisson, Jorge)
- Implementadas transições de crossfade suaves no `ProjectCarousel` e no `HackathonImageCarousel` via Framer Motion.
- Adicionado auto-rotate nos cards dos hackathons.
- Redesenhado Hero layout para modelo de duas colunas (Split columns) com badges flutuantes e stats em formato de cards.
- Implementado Project detail drawer lateral, ativado ao clicar num card de projecto.
- Atualizado HackathonModal com slideshow interactivo com dots e setas de navegação.
- Adicionado efeitos de hover glow personalizados na lista de Skills (corresponde a cor de cada tecnologia simples-icons), barra de progresso de scroll no topo da página e borda animada (hue-gradient rotation) na foto de perfil da secção About.

---

## ⚠️ Notas Importantes

1. **Um único ficheiro:** Todo o código está em `src/app/page.tsx` — evitar dividir sem instrução do Victor
2. **CSS puro:** Não usar Tailwind inline mesmo que já esteja importado no topo do CSS
3. **Framer Motion:** Agora utilizado para carousels com `AnimatePresence`.


# victor-kangombe.me

Portfólio de Victor Kangombe — Engenheiro de Software | Infraestrutura e Segurança da Informação.

Site multi-página e bilingue (PT/EN), gerado como HTML estático.

## Stack

- Next.js (App Router, `output: "export"`) + TypeScript
- Tailwind CSS v4
- Framer Motion
- lucide-react

## Comandos

```bash
npm install
npm run dev     # http://localhost:3000/pt/
npm run build   # gera o site estático em out/
npm run lint
```

## Actualizar conteúdo

Todo o texto está em [`src/content/`](src/content). Não é preciso mexer nos componentes:

- `profile.ts` — sobre, contactos, CV, SEO
- `projects.ts` — projectos
- `experience.ts` — percurso
- `skills.ts` — competências
- `competitions.ts` — competições
- `gallery.ts` — galeria
- `ui.ts` — textos de interface

## Fotos

As fotos são lidas das pastas durante o build. Não é preciso listá-las no código:

- `public/images/gallery/<evento>/` — fotos de cada evento da galeria
- `public/images/projects/<projecto>/` — screenshots de cada projecto

Para adicionar ou remover fotos, basta pôr ou tirar ficheiros da pasta e fazer build.
A primeira foto (capa) é a chamada `cover.*`, ou a indicada em `cover` no conteúdo; as restantes seguem a ordem do nome (1, 2, 10…).
Sem fotos, o card mostra uma capa gerada com o título.

Fotos directas do telemóvel (HEIC, muito grandes): corre `npm run images` antes do build.
Converte para JPG, reduz para 1600px, aplica a rotação e remove metadados (incluindo GPS).
Os originais ficam guardados em `originals/` (fora do site e do git).

## Licença

Uso pessoal.

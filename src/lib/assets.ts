import { existsSync, readdirSync } from "node:fs";
import path from "node:path";

const PUBLIC = path.join(process.cwd(), "public");

/** Formatos que os browsers mostram. HEIC fica de fora (corre `npm run images` para converter). */
const WEB_IMAGE = /\.(jpe?g|png|webp|avif|gif)$/i;
const UNSUPPORTED = /\.(heic|heif|tiff?|raw|dng)$/i;

/** Verifica, durante o build, se um ficheiro existe em /public. */
export const publicFileExists = (src: string) => existsSync(path.join(PUBLIC, decodeURI(src)));

const warned = new Set<string>();

/**
 * Lista as imagens de uma pasta em /public, lida durante o build.
 * Para adicionar ou remover fotos, basta pôr ou tirar ficheiros da pasta.
 *
 * Ordem: o ficheiro `cover` (ou o indicado em `first`) vem primeiro;
 * os restantes seguem a ordem natural dos nomes (1, 2, 10…).
 */
export function listImages(folder: string, first?: string): string[] {
  const dir = path.join(PUBLIC, folder);
  if (!existsSync(dir)) return [];

  const files = readdirSync(dir).filter((f) => !f.startsWith("."));
  const skipped = files.filter((f) => UNSUPPORTED.test(f));
  if (skipped.length && !warned.has(folder)) {
    warned.add(folder);
    console.warn(`⚠ ${folder}: ${skipped.length} imagem(ns) em formato não suportado pelos browsers (${skipped.join(", ")}). Corre "npm run images" para converter.`);
  }

  const rank = (f: string) => (first && f === first ? 0 : /^cover\./i.test(f) ? 1 : 2);
  return files
    .filter((f) => WEB_IMAGE.test(f))
    .sort((a, b) => rank(a) - rank(b) || a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }))
    .map((f) => `/${folder}/${encodeURIComponent(f)}`);
}

export const projectImages = (slug: string, first?: string) => listImages(`images/projects/${slug}`, first);
export const galleryImages = (slug: string, first?: string) => listImages(`images/gallery/${slug}`, first);

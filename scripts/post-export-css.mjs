import { promises as fs } from "node:fs";
import path from "node:path";

const outDir = path.resolve("out");
const chunksDir = path.join(outDir, "_next", "static", "chunks");
const stableCssName = "styles.css";
const stableCssPath = path.join(outDir, stableCssName);

async function getCssFiles() {
  const entries = await fs.readdir(chunksDir, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".css"))
    .map((entry) => path.join(chunksDir, entry.name))
    .sort();
}

async function writeStableCss(cssFiles) {
  const contents = await Promise.all(
    cssFiles.map((file) => fs.readFile(file, "utf8")),
  );
  const merged = contents.join("\n\n");
  await fs.writeFile(stableCssPath, merged, "utf8");
}

async function listHtmlFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await listHtmlFiles(fullPath)));
    } else if (entry.isFile() && entry.name.endsWith(".html")) {
      files.push(fullPath);
    }
  }

  return files;
}

async function rewriteHtmlCssLinks(htmlFiles) {
  const cssHrefPattern = /href="\/_next\/static\/chunks\/[^\"]+\.css"/g;

  await Promise.all(
    htmlFiles.map(async (file) => {
      const content = await fs.readFile(file, "utf8");
      const updated = content.replace(
        cssHrefPattern,
        `href="/${stableCssName}"`,
      );

      if (updated !== content) {
        await fs.writeFile(file, updated, "utf8");
      }
    }),
  );
}

async function run() {
  const cssFiles = await getCssFiles();

  if (cssFiles.length === 0) {
    throw new Error("No CSS files found in out/_next/static/chunks.");
  }

  await writeStableCss(cssFiles);

  const htmlFiles = await listHtmlFiles(outDir);
  await rewriteHtmlCssLinks(htmlFiles);

  console.log(
    `Generated ${stableCssPath} and updated ${htmlFiles.length} HTML files.`,
  );
}

run().catch((error) => {
  console.error(error.message);
  process.exit(1);
});

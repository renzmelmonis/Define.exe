import { cp, mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import path from "node:path";
export const root = fileURLToPath(new URL("../", import.meta.url));
export const pages = {
  "index.html": ["home", "Your pocket IT dictionary"],
  "dictionary.html": ["dictionary", "Dictionary"],
  "saved.html": ["saved", "Saved terms"],
  "quiz.html": ["quiz", "Mini quiz"],
  "welcome.html": ["welcome", "Welcome"],
  "profile.html": ["profile", "Your local profile"],
};
export const redirects = {
  "home.html": "index.html",
  "index..html": "welcome.html",
  "log in.html": "welcome.html",
  "search.html": "dictionary.html",
  "Favoritelist.html": "saved.html",
  "localstorage.html": "profile.html",
  "coc selection.html": "dictionary.html",
  "coc1.html": "dictionary.html?category=coc1",
  "coc2.html": "dictionary.html?category=coc2",
  "coc3.html": "dictionary.html?category=coc3",
  "others.html": "dictionary.html?category=others",
  "COC 1 DICTIONARY.html": "dictionary.html?category=coc1",
  "COC 2 DICTIONARY.html": "dictionary.html?category=coc2",
  "COC 3 DICTIONARY.html": "dictionary.html?category=coc3",
  "OTHERS DICTIONARY.html": "dictionary.html?category=others",
  "mini quiz.html": "quiz.html",
  "easy quiz.html": "quiz.html?level=easy",
  "MEDQUIZ.html": "quiz.html?level=medium",
  "hard quiz.html": "quiz.html?level=hard",
};
export async function build() {
  const out = path.join(root, "dist");
  await mkdir(out, { recursive: true });
  await cp(path.join(root, "public"), out, { recursive: true });
  await mkdir(path.join(out, "assets"), { recursive: true });
  const sourceFiles = (await readdir(path.join(root, "src"))).sort();
  const sources = await Promise.all(
    sourceFiles.map(async (file) => [
      file,
      await readFile(path.join(root, "src", file), "utf8"),
    ]),
  );
  const hash = createHash("sha256")
    .update(JSON.stringify(sources))
    .digest("hex")
    .slice(0, 10);
  const assetName = (file) => file.replace(/\.(js|css)$/, `.${hash}.$1`);
  for (const [file, source] of sources) {
    const content = file.endsWith(".js")
      ? source.replace(
          /(["'])\.\/([\w-]+\.js)\1/g,
          (match, quote, dependency) =>
            `${quote}./${assetName(dependency)}${quote}`,
        )
      : source;
    await writeFile(path.join(out, "assets", assetName(file)), content);
  }
  for (const [file, [page, title]] of Object.entries(pages)) {
    await writeFile(
      path.join(out, file),
      `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"><meta name="theme-color" content="#dff2ff"><meta name="description" content="Look up ICT terms, save your discoveries, and test your knowledge with Define.exe."><title>${title} · Define.exe</title><link rel="icon" href="assets/favicon.svg" type="image/svg+xml"><link rel="manifest" href="manifest.json"><link rel="preload" href="assets/fonts/silkscreen-bold.ttf" as="font" type="font/ttf" crossorigin><link rel="stylesheet" href="assets/${assetName("styles.css")}"><script type="module" src="assets/${assetName("app.js")}"></script></head><body data-page="${page}"><a class="skip-link" href="#main">Skip to content</a><div id="app"></div><noscript><main class="no-script"><h1>Define.exe needs JavaScript</h1><p>Enable JavaScript to search the dictionary, save terms, and take quizzes.</p></main></noscript></body></html>`,
    );
  }
  for (const [file, target] of Object.entries(redirects)) {
    await writeFile(
      path.join(out, file),
      `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta http-equiv="refresh" content="0;url=${target}"><title>Opening Define.exe</title></head><body><p>This page has moved. <a href="${target}">Continue to Define.exe</a>.</p></body></html>`,
    );
  }
  return out;
}
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  await rm(path.join(root, "dist"), { recursive: true, force: true });
  await build();
  console.log("Built Define.exe → dist/");
}

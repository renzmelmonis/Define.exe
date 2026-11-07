// Build the static website. No framework or bundler is needed.
import { cp, mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import path from "node:path";

const projectURL = new URL("../", import.meta.url);
export const root = fileURLToPath(projectURL);

export const pages = {
  "index.html": ["home", "Your pocket IT dictionary"],
  "dictionary.html": ["dictionary", "Dictionary"],
  "saved.html": ["saved", "Saved terms"],
  "quiz.html": ["quiz", "Mini quiz"],
  "welcome.html": ["welcome", "Welcome"],
  "profile.html": ["profile", "Your local profile"],
};

function pageHTML(pageName, title, stylesheet, application) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
    <meta name="theme-color" content="#dff2ff">
    <meta
      name="description"
      content="Look up ICT terms, save your discoveries, and test your knowledge with Define.exe."
    >
    <title>${title} · Define.exe</title>
    <link rel="icon" href="assets/favicon.svg" type="image/svg+xml">
    <link rel="manifest" href="manifest.json">
    <link
      rel="preload"
      href="assets/fonts/silkscreen-bold.ttf"
      as="font"
      type="font/ttf"
      crossorigin
    >
    <link rel="stylesheet" href="assets/${stylesheet}">
    <script type="module" src="assets/${application}"></script>
  </head>
  <body data-page="${pageName}">
    <a class="skip-link" href="#main">Skip to content</a>
    <div id="app"></div>
    <noscript>
      <main class="no-script">
        <h1>Define.exe needs JavaScript</h1>
        <p>Enable JavaScript to search the dictionary, save terms, and take quizzes.</p>
      </main>
    </noscript>
  </body>
</html>
`;
}

export async function build() {
  const outputDirectory = path.join(root, "dist");
  const publicDirectory = path.join(root, "public");
  const sourceDirectory = path.join(root, "src");
  const assetDirectory = path.join(outputDirectory, "assets");

  await rm(outputDirectory, { recursive: true, force: true });
  await mkdir(outputDirectory, { recursive: true });
  await cp(publicDirectory, outputDirectory, { recursive: true });
  await mkdir(assetDirectory, { recursive: true });

  const filenames = await readdir(sourceDirectory);
  filenames.sort();
  const sourceFiles = [];

  for (const filename of filenames) {
    const sourcePath = path.join(sourceDirectory, filename);
    const text = await readFile(sourcePath, "utf8");
    sourceFiles.push({ name: filename, text: text });
  }

  // A changed filename prevents browsers from using an older cached script.
  const hashBuilder = createHash("sha256");
  const sourceText = JSON.stringify(sourceFiles);
  hashBuilder.update(sourceText);
  const completeHash = hashBuilder.digest("hex");
  const buildHash = completeHash.slice(0, 10);

  function assetName(filename) {
    return filename.replace(/\.(js|css)$/, "." + buildHash + ".$1");
  }

  function rewriteImport(match, quote, dependency) {
    const hashedName = assetName(dependency);
    return quote + "./" + hashedName + quote;
  }

  for (const source of sourceFiles) {
    let content = source.text;
    if (source.name.endsWith(".js")) {
      const localImport = /(["'])\.\/([\w-]+\.js)\1/g;
      content = content.replace(localImport, rewriteImport);
    }
    const outputName = assetName(source.name);
    const outputPath = path.join(assetDirectory, outputName);
    await writeFile(outputPath, content);
  }

  const stylesheet = assetName("styles.css");
  const application = assetName("app.js");
  const pageFiles = Object.keys(pages);

  for (const filename of pageFiles) {
    const settings = pages[filename];
    const pageName = settings[0];
    const title = settings[1];
    const html = pageHTML(pageName, title, stylesheet, application);
    const outputPath = path.join(outputDirectory, filename);
    await writeFile(outputPath, html);
  }

  return outputDirectory;
}

const currentFile = fileURLToPath(import.meta.url);
if (process.argv[1] === currentFile) {
  await build();
  console.log("Built Define.exe → dist/");
}

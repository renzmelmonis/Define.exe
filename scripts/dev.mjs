// Serve only the built website. Project records and Git files stay private.
import http from "node:http";
import { readFile, stat } from "node:fs/promises";
import { watch } from "node:fs";
import path from "node:path";
import { build, root } from "./build.mjs";

const outputDirectory = await build();
let port = 4173;
if (process.env.PORT !== undefined) {
  port = Number(process.env.PORT);
}

const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".ttf": "font/ttf",
};

async function handleRequest(request, response) {
  try {
    const requestURL = new URL(request.url, "http://localhost");
    let pathname = decodeURIComponent(requestURL.pathname);
    if (pathname === "/") {
      pathname = "/index.html";
    }

    const filename = path.resolve(outputDirectory, "." + pathname);
    const allowedPrefix = outputDirectory + path.sep;
    if (!filename.startsWith(allowedPrefix)) {
      response.writeHead(403);
      response.end();
      return;
    }

    const fileInformation = await stat(filename);
    if (!fileInformation.isFile()) {
      throw new Error("This path is not a file.");
    }

    const extension = path.extname(filename);
    let contentType = contentTypes[extension];
    if (contentType === undefined) {
      contentType = "application/octet-stream";
    }

    const contents = await readFile(filename);
    response.writeHead(200, {
      "Content-Type": contentType,
      "Cache-Control": "no-store",
    });
    response.end(contents);
  } catch {
    response.writeHead(404, {
      "Content-Type": "text/html; charset=utf-8",
    });
    response.end(`
      <h1>Page not found</h1>
      <a href="/index.html">Return to Define.exe</a>
    `);
  }
}

function announceServer() {
  console.log("Define.exe ready at http://127.0.0.1:" + port);
}

const server = http.createServer(handleRequest);
server.listen(port, "127.0.0.1", announceServer);

let rebuildTimer = null;
let building = false;

async function rebuildFiles() {
  if (building) {
    return;
  }

  building = true;
  try {
    await build();
    console.log("Rebuilt. Refresh your browser.");
  } catch (error) {
    console.error(error.message);
  } finally {
    building = false;
  }
}

function scheduleRebuild() {
  clearTimeout(rebuildTimer);
  rebuildTimer = setTimeout(rebuildFiles, 120);
}

const watchedFolders = ["src", "public"];
for (const folder of watchedFolders) {
  const folderPath = path.join(root, folder);
  watch(folderPath, { recursive: true }, scheduleRebuild);
}

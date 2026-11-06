import http from "node:http";
import { readFile, stat } from "node:fs/promises";
import { watch } from "node:fs";
import path from "node:path";
import { build, root } from "./build.mjs";
const out = await build();
const port = Number(process.env.PORT || 4173);
const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".ttf": "font/ttf",
};
http
  .createServer(async (req, res) => {
    try {
      const pathname = decodeURIComponent(
        new URL(req.url, "http://localhost").pathname,
      );
      const file = path.resolve(
        out,
        "." + (pathname === "/" ? "/index.html" : pathname),
      );
      if (!file.startsWith(out + path.sep)) {
        res.writeHead(403);
        res.end();
        return;
      }
      if (!(await stat(file)).isFile()) throw new Error("missing");
      res.writeHead(200, {
        "Content-Type": types[path.extname(file)] || "application/octet-stream",
        "Cache-Control": "no-store",
      });
      res.end(await readFile(file));
    } catch {
      res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
      res.end(
        '<h1>Page not found</h1><a href="/index.html">Return to Define.exe</a>',
      );
    }
  })
  .listen(port, "127.0.0.1", () =>
    console.log(`Define.exe ready at http://127.0.0.1:${port}`),
  );
let timer;
let building = false;
for (const dir of ["src", "public"])
  watch(path.join(root, dir), { recursive: true }, () => {
    clearTimeout(timer);
    timer = setTimeout(async () => {
      if (building) return;
      building = true;
      try {
        await build();
        console.log("Rebuilt. Refresh your browser.");
      } catch (e) {
        console.error(e.message);
      } finally {
        building = false;
      }
    }, 120);
  });

// Ask Node.js to check every handwritten JavaScript file before running it.
import { readdir } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectURL = new URL("../", import.meta.url);
const projectRoot = fileURLToPath(projectURL);
const folders = ["src", "scripts", "tests"];

for (const folder of folders) {
  const folderPath = path.join(projectRoot, folder);
  const filenames = await readdir(folderPath);

  for (const filename of filenames) {
    const isJavaScript = filename.endsWith(".js");
    const isModule = filename.endsWith(".mjs");
    if (!isJavaScript && !isModule) {
      continue;
    }

    const filePath = path.join(folderPath, filename);
    const result = spawnSync(process.execPath, ["--check", filePath], {
      stdio: "inherit",
    });
    if (result.status !== 0) {
      process.exit(1);
    }
  }
}
console.log("All JavaScript syntax checks passed.");

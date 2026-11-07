import test from "node:test";
import assert from "node:assert/strict";
import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
import { build, pages } from "../scripts/build.mjs";

test("build emits only the current pages with complete asset links", async function () {
  const outputDirectory = await build();
  const filenames = Object.keys(pages);

  for (const filename of filenames) {
    const settings = pages[filename];
    const pageName = settings[0];
    const outputPath = path.join(outputDirectory, filename);
    const html = await readFile(outputPath, "utf8");
    assert.ok(html.includes('data-page="' + pageName + '"'));
    assert.ok(html.includes('name="viewport"'));
    assert.ok(html.includes('lang="en"'));

    const assetPattern = /(?:src|href)="(assets\/[^"#]+|manifest\.json)"/g;
    const assetLinks = html.matchAll(assetPattern);
    for (const asset of assetLinks) {
      const assetPath = path.join(outputDirectory, asset[1]);
      const information = await stat(assetPath);
      assert.ok(information.isFile(), filename + ": " + asset[1]);
    }
  }

  const outputFiles = await readdir(outputDirectory);
  let htmlCount = 0;
  for (const filename of outputFiles) {
    if (filename.endsWith(".html")) {
      assert.ok(Object.hasOwn(pages, filename));
      htmlCount = htmlCount + 1;
    }
  }
  assert.equal(htmlCount, 6);

  const manifestPath = path.join(outputDirectory, "manifest.json");
  const manifestText = await readFile(manifestPath, "utf8");
  const manifest = JSON.parse(manifestText);
  assert.equal(manifest.name, "Define.exe");
  for (const icon of manifest.icons) {
    const iconPath = path.join(outputDirectory, icon.src);
    const information = await stat(iconPath);
    assert.ok(information.isFile());
  }
});

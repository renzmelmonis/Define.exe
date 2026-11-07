import test from "node:test";
import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { build, pages, redirects } from "../scripts/build.mjs";

test("build emits all canonical pages, complete asset links, and all legacy redirects", async function () {
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

  const oldFilenames = Object.keys(redirects);
  assert.equal(oldFilenames.length, 19);
  for (const filename of oldFilenames) {
    const destination = redirects[filename];
    const outputPath = path.join(outputDirectory, filename);
    const html = await readFile(outputPath, "utf8");
    assert.ok(html.includes('content="0;url=' + destination + '"'));
    const destinationParts = destination.split("?");
    assert.ok(Object.hasOwn(pages, destinationParts[0]));
  }

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

import test from "node:test";
import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { build, pages, redirects } from "../scripts/build.mjs";

test("build emits all canonical pages, complete asset links, and all legacy redirects", async () => {
  const out = await build();
  for (const [file, [page]] of Object.entries(pages)) {
    const html = await readFile(path.join(out, file), "utf8");
    assert.ok(html.includes(`data-page="${page}"`));
    assert.ok(html.includes('name="viewport"'));
    assert.ok(html.includes('lang="en"'));
    for (const asset of [
      ...html.matchAll(/(?:src|href)="(assets\/[^"#]+|manifest\.json)"/g),
    ].map((m) => m[1])) {
      assert.ok(
        (await stat(path.join(out, asset))).isFile(),
        `${file}: ${asset}`,
      );
    }
  }
  assert.equal(Object.keys(redirects).length, 19);
  for (const [file, target] of Object.entries(redirects)) {
    const html = await readFile(path.join(out, file), "utf8");
    assert.ok(html.includes(`content="0;url=${target}"`));
    assert.ok(Object.hasOwn(pages, target.split("?")[0]));
  }
  const manifest = JSON.parse(
    await readFile(path.join(out, "manifest.json"), "utf8"),
  );
  assert.equal(manifest.name, "Define.exe");
  for (const icon of manifest.icons)
    assert.ok((await stat(path.join(out, icon.src))).isFile());
});

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync, readdirSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

// 逐字保真測試：repo 裡每個「上游逐字檔」的 SHA-256 必須等於
// test/fixtures/verbatim.sha256.json 釘死的值（該 manifest 從 npm tarball
// superpowers-zh@1.7.10 產生）。同時禁止多餘檔案混進逐字範圍。
// 這讓「100% 原樣複製」從宣稱變成可自動驗證的事實（playbook N4）。
const ROOT = fileURLToPath(new URL('..', import.meta.url));
const manifest = JSON.parse(readFileSync(join(ROOT, 'test', 'fixtures', 'verbatim.sha256.json'), 'utf8'));

const sha256 = (p) => createHash('sha256').update(readFileSync(p)).digest('hex');

// 逐字範圍：manifest 涵蓋的頂層路徑
function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(p));
    else out.push(p);
  }
  return out;
}

test('保真: 每個 manifest 檔案的 SHA-256 逐字相符', () => {
  const entries = Object.entries(manifest);
  assert.equal(entries.length, 107, 'manifest 釘 107 個檔案');
  for (const [rel, expected] of entries) {
    const p = join(ROOT, rel);
    assert.equal(sha256(p), expected, `${rel}: SHA-256 不符（上游逐字內容被改過）`);
  }
});

test('保真: 逐字範圍內沒有 manifest 外的多餘檔案', () => {
  const inScope = new Set(Object.keys(manifest));
  for (const dir of ['skills', 'hooks', 'bin', 'assets', 'docs', '.claude-plugin', '.codex', '.codex-plugin', '.cursor-plugin', '.opencode', '.pi']) {
    for (const p of walk(join(ROOT, dir))) {
      const rel = relative(ROOT, p);
      assert.ok(inScope.has(rel), `${rel}: 逐字範圍內多了 manifest 沒有的檔案`);
    }
  }
  for (const f of ['CLAUDE.md', 'GEMINI.md', 'README.zh-Hant.md', 'RELEASE-NOTES.md', 'RELEASE-NOTES.zh.md', 'gemini-extension.json']) {
    assert.ok(inScope.has(f), `${f}: 應在 manifest 內`);
  }
});

test('保真: manifest 與 THIRD_PARTY_NOTICES.md 的 SHA-256 表一致', () => {
  const notices = readFileSync(join(ROOT, 'THIRD_PARTY_NOTICES.md'), 'utf8');
  const table = new Map(
    [...notices.matchAll(/^\| `([^`]+)` \| `([0-9a-f]{64})` \|$/gm)].map((m) => [m[1], m[2]]),
  );
  assert.ok(table.size >= 107, `NOTICES 表至少 107 行（實際 ${table.size}）`);
  for (const [rel, hash] of Object.entries(manifest)) {
    assert.equal(table.get(rel), hash, `NOTICES 表 ${rel} 與 manifest 一致`);
  }
});

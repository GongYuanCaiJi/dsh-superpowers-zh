import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

// 結構測試：github:/本地安裝後「可 boot」的最低保證。
// 被 package.json 的 prepare 在每次 install 時執行，因此只做零依賴的檔案檢查，
// 且必須在任何合法安裝狀態下通過（這裡驗的是形狀，不是上游逐字內容）。
const ROOT = fileURLToPath(new URL('..', import.meta.url));

test('套件形狀: skills/ 有 20 個目錄且各含 SKILL.md', () => {
  const skillsDir = join(ROOT, 'skills');
  assert.ok(existsSync(skillsDir), 'skills/ 存在');
  const dirs = readdirSync(skillsDir, { withFileTypes: true }).filter((e) => e.isDirectory());
  assert.equal(dirs.length, 20, '20 個 skill 目錄');
  for (const d of dirs) {
    assert.ok(
      existsSync(join(skillsDir, d.name, 'SKILL.md')),
      `skills/${d.name}/SKILL.md 存在`,
    );
  }
});

test('套件形狀: 必要檔案都在（boot 所需）', () => {
  for (const f of ['package.json', 'index.js', 'cordis.patch.yml', 'LICENSE']) {
    assert.ok(existsSync(join(ROOT, f)), `${f} 存在`);
  }
  const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8'));
  assert.equal(pkg.dsh?.bundle?.patch, './cordis.patch.yml', 'dsh.bundle.patch 指向 cordis.patch.yml');
});

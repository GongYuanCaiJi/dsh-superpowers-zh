import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

// package.json / cordis.patch.yml / LICENSE / THIRD_PARTY_NOTICES 的公开契约。
// 这层是「移植包装」：每条断言对应 playbook 的一条规则，改包装必须先改这里。
const ROOT = fileURLToPath(new URL('..', import.meta.url));
const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8'));

test('package.json: 身分与 description', () => {
  assert.equal(pkg.name, 'dsh-superpowers-zh');
  assert.equal(pkg.version, '0.1.0');
  assert.equal(pkg.license, 'MIT');
  // description 写进上游名（A 报告 10/16）且与 GitHub description 一字不差（16/18）
  const expected =
    'DeepSeek Harness 插件：中文版 Superpowers 技能包，20 个中文 AI 编程 skills（移植自 superpowers-zh）';
  assert.equal(pkg.description, expected);
  assert.ok(pkg.description.includes('superpowers-zh'), 'description 含上游名');
});

test('package.json: scripts 依 playbook（每删一个上游 script 都有理由，见交付回报）', () => {
  for (const s of ['test', 'prepare', 'prepack', 'prepublishOnly']) {
    assert.ok(pkg.scripts?.[s], `scripts.${s} 存在`);
  }
  // 上游三个 script 删除理由：site/site:deploy/version 引用未发布进 npm tarball 的
  // 档案（site/build.mjs、scripts/sync-plugin-version.js、wrangler），是上游自己的
  // 文件站/发布流程，不属可移植套件逻辑。
  for (const gone of ['site', 'site:deploy', 'version']) {
    assert.equal(pkg.scripts?.[gone], undefined, `scripts.${gone} 已删（理由见交付回报）`);
  }
});

test('package.json: dsh 插件合约', () => {
  assert.equal(pkg.dsh?.bundle?.patch, './cordis.patch.yml');
  assert.equal(pkg.main, 'index.js', 'dsh 由 main 載入 cordis 插件');
  assert.equal(pkg.types, 'index.d.ts', 'types 指向 index.d.ts（playbook 必備欄位）');
  assert.equal(pkg.dependencies?.['@deepseek-ai/dsh-skill'], '0.1.0-rc.6', '精確釘版（playbook：不用 caret）');
  for (const f of ['index.js', 'index.d.ts', 'cordis.patch.yml', 'THIRD_PARTY_NOTICES.md', 'test/', 'skills/', 'docs/']) {
    assert.ok(pkg.files?.includes(f), `files 含 ${f}`);
  }
  // 上游 files 里的全部项目都保留（不挑不筛）
  for (const f of ['bin/', 'hooks/', 'assets/', '.claude-plugin/', '.cursor-plugin/', '.codex/INSTALL.md', '.codex-plugin/', '.opencode/INSTALL.md', '.opencode/plugins/', '.pi/extensions/', 'CLAUDE.md', 'GEMINI.md', 'RELEASE-NOTES.md', 'RELEASE-NOTES.zh.md', 'gemini-extension.json', 'README.md', 'LICENSE']) {
    assert.ok(pkg.files?.includes(f), `上游 files 保留 ${f}`);
  }
  assert.equal(pkg.keywords?.includes('dsh-plugin'), true, 'keywords 含 dsh-plugin');
  assert.equal(pkg.keywords?.includes('superpowers'), true, 'keywords 保留上游');
  assert.equal(pkg.repository?.url, 'git+https://github.com/GongYuanCaiJi/dsh-superpowers-zh.git');
  assert.equal(pkg.homepage, 'https://github.com/GongYuanCaiJi/dsh-superpowers-zh');
  assert.equal(pkg.bugs?.url, 'https://github.com/GongYuanCaiJi/dsh-superpowers-zh/issues');
  assert.ok(pkg.author, 'author 存在');
  assert.equal(pkg.engines?.node, '>=20.0.0');
});

test('cordis.patch.yml: insert 本插件', () => {
  const patch = readFileSync(join(ROOT, 'cordis.patch.yml'), 'utf8');
  assert.match(patch, /^-\s*insert:/m, '顶层 insert 条目');
  assert.match(patch, /- id: dsh-superpowers-zh/, 'insert 本插件 id');
  assert.match(patch, /name: dsh-superpowers-zh/, 'insert 本插件 name');
});

test('LICENSE: 上游逐字 + 移植者角色行（无 NOASSERTION 前缀）', () => {
  const license = readFileSync(join(ROOT, 'LICENSE'), 'utf8');
  assert.ok(license.includes('Copyright (c) 2026 jnMetaCode'), '上游 copyright 行逐字保留');
  assert.ok(license.includes('Copyright (c) 2026 GongYuanCaiJi (dsh port)'), '移植者行标 (dsh port) 角色');
  assert.ok(license.includes('MIT License'), 'MIT 全文');
  assert.ok(!license.includes('Original work:'), '无会让 GitHub 认不出 MIT 的前缀');
  assert.ok(!license.includes('Modified work:'), '无会让 GitHub 认不出 MIT 的前缀');
});

test('THIRD_PARTY_NOTICES.md: 钉住上游 tarball 身分', () => {
  const notices = readFileSync(join(ROOT, 'THIRD_PARTY_NOTICES.md'), 'utf8');
  for (const pin of [
    '`1.7.10`',
    'sha512-ljI1CMQm1t4Snu2viy6iQVz8SKKKjhDG0p2hrXLts+TCRrL4mETalI7xig+qfM45bz6RL9KNq4CS9HLO8heX6g==',
    '5eb94074766c6e90d74dc81f334f115a03584e1e',
    'd83d3f9dc20218e576df09df7c68cfea62df7353',
  ]) {
    assert.ok(notices.includes(pin), `NOTICES 含 ${pin}`);
  }
});

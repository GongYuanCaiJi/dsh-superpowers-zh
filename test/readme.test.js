import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

// README 的公開契約（cn-repo-conventions N=73 + A 報告 N=18 + playbook G1/H1）：
// 雙語兩段都要改到、未發布就不准裸名安裝、attribution 與回連齊備。
const ROOT = fileURLToPath(new URL('..', import.meta.url));
const readme = readFileSync(join(ROOT, 'README.md'), 'utf8');

test('README: 雙語兩段都存在', () => {
  assert.match(readme, /^# 🦸 dsh-superpowers-zh$/m, '中文段標題');
  assert.match(readme, /^# dsh-superpowers-zh$/m, '英文段標題');
  assert.match(readme, /^## English$/m, '切換器錨點');
});

test('README: 兩段都有安裝指令（github: + 本地路徑），無裸名', () => {
  // 未發布到 npm → 裸名 `add dsh-superpowers-zh` 會 404（playbook G1/H1，中過兩次）
  assert.equal(readme.match(/add dsh-superpowers-zh/g)?.length ?? 0, 0, '零裸名安裝');
  const cn = readme.split('## English')[0];
  const en = readme.split('## English')[1];
  assert.ok(cn.includes('add github:GongYuanCaiJi/dsh-superpowers-zh'), '中文段有 github: 安裝');
  assert.ok(en.includes('add github:GongYuanCaiJi/dsh-superpowers-zh'), '英文段有 github: 安裝');
  assert.ok(cn.includes('allowBuilds'), '中文段有 allowBuilds 提示');
  assert.ok(en.includes('allowBuilds'), '英文段有 allowBuilds 提示');
  assert.ok(cn.includes('git clone https://github.com/GongYuanCaiJi/dsh-superpowers-zh.git'), '中文段有本地路徑');
  assert.ok(en.includes('git clone https://github.com/GongYuanCaiJi/dsh-superpowers-zh.git'), '英文段有本地路徑');
});

test('README: attribution 與回連（A 報告：措辭 port/移植、回連 ≥2、上游連結指套件本體）', () => {
  assert.ok(readme.includes('移植自'), '用「移植」措辭');
  const upstreamPkgLinks = (readme.match(/https:\/\/www\.npmjs\.com\/package\/superpowers-zh/g) ?? []).length;
  assert.ok(upstreamPkgLinks >= 2, `回連上游套件本體 ≥2（實際 ${upstreamPkgLinks}）`);
  assert.ok(readme.includes('THIRD_PARTY_NOTICES.md'), '引用逐字自驗文件');
});

test('README: 請給上游 star（兩段）', () => {
  const cn = readme.split('## English')[0];
  const en = readme.split('## English')[1];
  assert.ok(cn.includes('请也给上游点个 star'), '中文段有 star 呼籲');
  assert.ok(en.includes('please star the upstream'), '英文段有 star 呼籲');
});

// dsh-superpowers-zh — cordis 插件入口。
//
// 職責只有一個：把本套件 skills/ 目錄下的 20 個 SKILL.md 註冊進 dsh 的
// skills registry（ctx.skills.registerProvider，runtime provider）。
// 註冊形狀照 dsh-lens（已發布、同機制的真實插件）的 dist/skills.js。
//
// skills/ 本身是上游 superpowers-zh@1.7.10 的逐字複製，這裡不碰內容；
// 逐字保真由 test/verbatim.test.js 對 test/fixtures/verbatim.sha256.json 驗證。

import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { BUNDLED_SKILL_RANK } from '@deepseek-ai/dsh-skill';

export const name = 'dsh-superpowers-zh';

const PROVIDER = name;
const INVOCATION = { modelInvocable: true, userInvocable: true };
const DEFAULT_ROOT = fileURLToPath(new URL('./skills/', import.meta.url));

/**
 * 列出 skills/ 下每個含 SKILL.md 的目錄，轉成 dsh skill registry 的候選。
 * 只掃一層（與 dsh 的檔案系統 loader 同深度規則）。
 * @param root - skills 根目錄（測試可注入自訂 fixture 根）
 */
export function listBundledSkills(root = DEFAULT_ROOT) {
  if (!existsSync(root)) return [];
  const skills = [];
  for (const entry of readdirSync(root, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const skillFile = join(root, entry.name, 'SKILL.md');
    if (!existsSync(skillFile)) continue;
    const body = readFileSync(skillFile, 'utf8');
    const fm = parseFrontmatter(body);
    skills.push({
      name: fm.name || entry.name,
      description: fm.description || firstParagraph(body),
      invocation: INVOCATION,
      provider: PROVIDER,
      source: 'bundled',
      rank: BUNDLED_SKILL_RANK,
      resourceBase: { kind: 'directory', path: join(root, entry.name) },
      locator: skillFile,
    });
  }
  return skills;
}

/** 從 SKILL.md 的 YAML frontmatter 抽出 name / description（純解析，不做 fallback）。 */
export function parseFrontmatter(markdown) {
  const match = /^---\n([\s\S]*?)\n---/u.exec(markdown);
  if (!match) return {};
  const block = match[1] ?? '';
  const field = (key) => {
    const line = new RegExp(`^${key}:\\s*(.+)$`, 'mu').exec(block)?.[1]?.trim();
    return line === undefined ? undefined : line.replace(/^['"]|['"]$/g, '').trim();
  };
  return { name: field('name'), description: field('description') };
}

/** frontmatter 之後的第一段非空、非標題文字（description 缺漏時的 fallback）。 */
function firstParagraph(markdown) {
  const body = markdown.replace(/^---[\s\S]*?---\n?/u, '');
  return body
    .split('\n')
    .map((line) => line.trim())
    .find((line) => line && !line.startsWith('#'));
}

/** 註冊 provider 進 dsh skills registry；ctx.inject 拿不到 skills 就不註冊。 */
export function registerSuperpowersSkills(ctx) {
  ctx.inject(['skills'], (skillCtx) => {
    const candidates = listBundledSkills();
    if (candidates.length === 0) return;
    const provider = {
      name: PROVIDER,
      list: () => Promise.resolve(candidates),
      async get(candidate) {
        if (typeof candidate.locator !== 'string' || !existsSync(candidate.locator)) return undefined;
        return {
          name: candidate.name,
          description: candidate.description,
          invocation: candidate.invocation,
          provider: candidate.provider,
          source: candidate.source,
          resourceBase: candidate.resourceBase,
          content: readFileSync(candidate.locator, 'utf8'),
        };
      },
    };
    skillCtx.skills.registerProvider(() => provider);
  });
}

export function apply(ctx) {
  registerSuperpowersSkills(ctx);
}

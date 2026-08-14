import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { listBundledSkills, parseFrontmatter, registerSuperpowersSkills } from '../index.js';

// 上游 skills/ 下的目錄清單（釘死：新增目錄卻沒更新測試 = 測試失敗）
const EXPECTED_SKILLS = [
  'brainstorming',
  'chinese-code-review',
  'chinese-commit-conventions',
  'chinese-documentation',
  'chinese-git-workflow',
  'dispatching-parallel-agents',
  'executing-plans',
  'finishing-a-development-branch',
  'mcp-builder',
  'receiving-code-review',
  'requesting-code-review',
  'subagent-driven-development',
  'systematic-debugging',
  'test-driven-development',
  'using-git-worktrees',
  'using-superpowers',
  'verification-before-completion',
  'workflow-runner',
  'writing-plans',
  'writing-skills',
];

const ROOT = fileURLToPath(new URL('..', import.meta.url));

function skillDirs() {
  return readdirSync(join(ROOT, 'skills'), { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .sort();
}

test('catalog: 剛好列出上游 20 個 skills，無多無少', () => {
  assert.deepEqual(skillDirs(), [...EXPECTED_SKILLS].sort());
  const candidates = listBundledSkills();
  assert.equal(candidates.length, EXPECTED_SKILLS.length);
  assert.deepEqual(candidates.map((c) => c.name).sort(), [...EXPECTED_SKILLS].sort());
});

test('catalog: 每個 candidate 都是 dsh 可用的形狀', () => {
  for (const c of listBundledSkills()) {
    assert.match(c.name, /^[a-z0-9]+(?:-[a-z0-9]+)*$/, `name 必須 kebab-case: ${c.name}`);
    assert.equal(c.name, c.resourceBase.path.split('/').pop(), `name 應等於目錄名: ${c.name}`);
    assert.ok(c.description.length > 0, `description 非空: ${c.name}`);
    assert.equal(c.provider, 'dsh-superpowers-zh');
    assert.equal(c.source, 'bundled');
    assert.equal(c.rank, 600, 'BUNDLED_SKILL_RANK');
    assert.deepEqual(c.invocation, { modelInvocable: true, userInvocable: true });
    assert.equal(c.resourceBase.kind, 'directory');
    assert.ok(existsSync(c.resourceBase.path), `resourceBase 目錄存在: ${c.name}`);
    assert.ok(existsSync(c.locator), `SKILL.md 存在: ${c.name}`);
    assert.ok(c.locator.endsWith('SKILL.md'));
  }
});

test('frontmatter: 上游 20 個 skills 的 name 都來自 frontmatter 且與目錄一致', () => {
  for (const dir of EXPECTED_SKILLS) {
    const body = readFileSync(join(ROOT, 'skills', dir, 'SKILL.md'), 'utf8');
    const fm = parseFrontmatter(body);
    assert.equal(fm.name, dir, `${dir}: frontmatter name 應等於目錄名`);
    assert.ok(fm.description && fm.description.length > 0, `${dir}: frontmatter description 非空`);
  }
});

test('註冊線路: registerProvider 收到能 list + get 的 provider，get 回傳真實檔案內容', async () => {
  // 刻意不做 identity stub：register 線路如果接錯（例如把 request 直接餵 run），
  // list/get 的產物對不上真實檔案，這個測試會紅。
  let registered = null;
  const mockCtx = {
    inject: (_deps, fn) => {
      const skillCtx = {
        skills: {
          registerProvider: (create) => {
            registered = create();
          },
        },
      };
      fn(skillCtx);
    },
  };
  registerSuperpowersSkills(mockCtx);
  assert.ok(registered, 'registerProvider 必須被呼叫');
  assert.equal(registered.name, 'dsh-superpowers-zh');

  const candidates = await registered.list();
  assert.equal(candidates.length, EXPECTED_SKILLS.length);
  for (const c of candidates) {
    const skill = await registered.get(c);
    assert.ok(skill, `get 必須回傳 skill: ${c.name}`);
    assert.equal(skill.name, c.name);
    assert.equal(skill.content, readFileSync(c.locator, 'utf8'), `${c.name}: content 必須是檔案逐字內容`);
    assert.deepEqual(skill.resourceBase, c.resourceBase);
  }
  // 不存在的 skill → undefined（不能炸）
  const missing = await registered.get({ name: 'no-such-skill', locator: '/nonexistent/SKILL.md' });
  assert.equal(missing, undefined);
});

test('frontmatter 解析: 引號/無引號/沒有 frontmatter', () => {
  const quoted = parseFrontmatter('---\nname: foo\ndescription: "帶 引號 的 描述"\n---\nbody');
  assert.equal(quoted.name, 'foo');
  assert.equal(quoted.description, '帶 引號 的 描述');
  const plain = parseFrontmatter('---\nname: bar\ndescription: 無引號描述\n---\nbody');
  assert.equal(plain.description, '無引號描述');
  const noFrontmatter = parseFrontmatter('沒有 frontmatter 的內容');
  assert.deepEqual(noFrontmatter, {});
});

test('fallback: 缺 description 的 SKILL.md 用第一段非標題文字', () => {
  const fixture = join(ROOT, 'test', 'fixtures', 'tmp-no-desc');
  rmSync(fixture, { recursive: true, force: true });
  mkdirSync(join(fixture, 'no-desc-skill'), { recursive: true });
  writeFileSync(
    join(fixture, 'no-desc-skill', 'SKILL.md'),
    '---\nname: no-desc-skill\n---\n# 標題\n這是第一段描述文字\n',
  );
  try {
    const [c] = listBundledSkills(fixture);
    assert.equal(c.name, 'no-desc-skill');
    assert.equal(c.description, '這是第一段描述文字');
  } finally {
    rmSync(fixture, { recursive: true, force: true });
  }
});

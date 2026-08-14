// dsh-superpowers-zh 的型別宣告（playbook：package.json 必須有 types）。
// 套件本體是純 JS cordis 插件；這裡宣告對外可用的 API，供 TS 消費者使用。

/** dsh skill registry 的候選技能（candidate）。 */
export interface SkillCandidate {
  name: string;
  description: string;
  invocation: { modelInvocable: boolean; userInvocable: boolean };
  provider: string;
  source: string;
  rank: number;
  resourceBase: { kind: 'directory'; path: string };
  locator: string;
}

/** get() 回傳的完整技能定義。 */
export interface BundledSkill extends SkillCandidate {
  content: string;
}

/** cordis 插件名（dsh 載入時用）。 */
export const name: string;

/** 列出 skills/ 下每個含 SKILL.md 的目錄轉成的候選。 */
export function listBundledSkills(root?: string): SkillCandidate[];

/** 從 SKILL.md 的 YAML frontmatter 抽出 name / description（純解析，不做 fallback）。 */
export function parseFrontmatter(
  markdown: string,
): { name?: string; description?: string };

/** 註冊 provider 進 dsh skills registry。 */
export function registerSuperpowersSkills(ctx: {
  inject(deps: string[], fn: (ctx: { skills: unknown }) => void): void;
}): void;

/** cordis apply 入口。 */
export function apply(ctx: unknown): void;

# 🦸 dsh-superpowers-zh

简体中文 | [English](#english)

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)
[![DSH](https://img.shields.io/badge/DSH-DeepSeek%20Harness-blue.svg)](https://github.com/deepseek-ai/deepseek-harness)
[![上游](https://img.shields.io/badge/移植自-superpowers--zh-orange.svg)](https://www.npmjs.com/package/superpowers-zh)

> **一句话：把 20 个开箱即用的中文 AI 编程 skills 装进 DeepSeek Harness，agent 按需自动调用（移植自 superpowers-zh）。**

移植自 [`superpowers-zh`](https://www.npmjs.com/package/superpowers-zh)（MIT，上游
[`obra/superpowers`](https://github.com/obra/superpowers) 的中文增强版）。上游 npm 包
109 个文件全部搬入，其中 107 个逐字保留（SHA-256 钉在
[`THIRD_PARTY_NOTICES.md`](./THIRD_PARTY_NOTICES.md)），只做了让 dsh 能加载它的最小包装改动。

## ✨ 功能

- 🧪 **测试驱动开发** —— `test-driven-development`、`systematic-debugging` 等核心工作流技能
- 🈶 **中文专属技能** —— `chinese-code-review`、`chinese-commit-conventions`、`chinese-documentation`、`chinese-git-workflow`
- 📋 **规划与执行** —— `writing-plans`、`executing-plans`、`subagent-driven-development`、`dispatching-parallel-agents`
- 🔍 **代码审查** —— `requesting-code-review`、`receiving-code-review`
- 🧩 **扩展能力** —— `mcp-builder`、`workflow-runner`、`brainstorming`、`writing-skills` 等
- 🎯 **自动发现** —— 安装后 skills 出现在 dsh 的 catalog，agent 按 `description` 自动匹配调用，无需手动引用

## 📸 效果

安装并启动 dsh 后，20 个 skills 会出现在 agent 的可用技能目录里（示意）：

```
<available_skills>
  <skill name="test-driven-development">在实现任何功能或修复 bug 时使用，在编写实现代码之前</skill>
  <skill name="systematic-debugging">遇到任何 bug、测试失败或异常行为时使用，在提出修复方案之前执行</skill>
  <skill name="chinese-code-review">中文 review 沟通参考——话术模板、分级标注…</skill>
  …共 20 个
</available_skills>
```

agent 遇到对应场景会自动 `read` 并执行 `SKILL.md` 里的完整流程。

## 📦 安装

本插件尚未发布到 npm，用 GitHub 或本地路径安装：

```bash
dsh plugin --profile <你的 profile> add github:GongYuanCaiJi/dsh-superpowers-zh
```

若 pnpm 拦下构建脚本，在 profile 的 `pnpm-workspace.yaml` 里把本包加进
`allowBuilds`（安装时的 `prepare` 只做结构自检，无编译步骤）。

从本地目录安装：

```bash
git clone https://github.com/GongYuanCaiJi/dsh-superpowers-zh.git
cd dsh-superpowers-zh && npm install
dsh plugin --profile <你的 profile> add /path/to/dsh-superpowers-zh
```

## 🚀 使用

不需要手动引用任何 skill。启动 dsh 后直接说你的需求，agent 会按场景调用对应技能：

```text
> 帮我用 TDD 实现一个函数
> 我的测试一直挂，帮我系统排查
> 帮我审查刚改的代码
```

想确认 skills 是否已加载，直接问 agent「你有哪些 skills」。

## 🔧 本移植版与上游的差异

1. `skills/`、`hooks/`、`bin/`、`docs/` 等 107 个文件逐字复制，SHA-256 钉在 `THIRD_PARTY_NOTICES.md`
2. 新增 `index.js`：把 `skills/` 注册进 dsh skills registry（与 dsh-lens 相同的 runtime provider 机制）
3. 新增 `cordis.patch.yml` + `package.json` 的 `dsh.bundle`：dsh 插件加载入口
4. `package.json`：`main` 改指 `index.js`；scripts 依移植产线规范增删（`site`/`site:deploy`/`version` 引用未随 npm 包发布的文件，删除）；description 与 repository 改指本 repo
5. `LICENSE`：上游 copyright 行逐字保留，另加 `(dsh port)` 移植者行
6. 上游 `README.md` → `docs/UPSTREAM-README.md`（逐字保留；原版 23 工具安装说明在那里）

## ❓ 常见问题

**为什么是中文？** 上游 `superpowers-zh` 本身就是 obra/superpowers 的完整汉化，
本移植版不重复翻译，只保留上游原文。

**和 obra/superpowers 什么关系？** 本包是 `superpowers-zh`（上游 25 万+ star 项目的中文增强版）的 dsh 移植，skills 内容与上游逐字一致。

**想看给其他工具（Claude Code / Cursor 等）的安装说明？** 见 [`docs/UPSTREAM-README.md`](./docs/UPSTREAM-README.md)。

## 📄 License

MIT。上游版权归 [jnMetaCode](https://github.com/jnMetaCode)（superpowers-zh）与
[obra/superpowers](https://github.com/obra/superpowers) 所有，移植版权归
[GongYuanCaiJi](https://github.com/GongYuanCaiJi)（dsh port）。详见 [`LICENSE`](./LICENSE)。

如果你觉得这个技能包有用，**请也给上游点个 star** ⭐：
[`superpowers-zh`](https://github.com/jnMetaCode/superpowers-zh) ·
[`obra/superpowers`](https://github.com/obra/superpowers)

---

## English

# dsh-superpowers-zh

[简体中文](#简体中文) | English

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)
[![DSH](https://img.shields.io/badge/DSH-DeepSeek%20Harness-blue.svg)](https://github.com/deepseek-ai/deepseek-harness)
[![Upstream](https://img.shields.io/badge/port-of-superpowers--zh-orange.svg)](https://www.npmjs.com/package/superpowers-zh)

> **One line: 20 ready-to-use Chinese AI-coding skills for DeepSeek Harness, auto-discovered by the agent (port of superpowers-zh).**

A port of [`superpowers-zh`](https://www.npmjs.com/package/superpowers-zh) (MIT),
the Chinese-enhanced edition of [`obra/superpowers`](https://github.com/obra/superpowers).
All 109 files of the upstream npm package are carried over; 107 are byte-for-byte
identical (SHA-256 pinned in [`THIRD_PARTY_NOTICES.md`](./THIRD_PARTY_NOTICES.md)),
with only the minimal packaging changes needed for dsh to load them.

## ✨ Features

- 🧪 **Core workflows** — `test-driven-development`, `systematic-debugging`, `verification-before-completion`
- 🈶 **Chinese-native skills** — `chinese-code-review`, `chinese-commit-conventions`, `chinese-documentation`, `chinese-git-workflow`
- 📋 **Planning & execution** — `writing-plans`, `executing-plans`, `subagent-driven-development`, `dispatching-parallel-agents`
- 🔍 **Code review** — `requesting-code-review`, `receiving-code-review`
- 🧩 **Extensions** — `mcp-builder`, `workflow-runner`, `brainstorming`, `writing-skills` and more
- 🎯 **Auto-discovery** — skills appear in the dsh catalog; the agent matches them by `description` on demand

## 📸 Preview

After install, all 20 skills show up in the agent's available-skills catalog
and are loaded on demand by reading their `SKILL.md`.

## 📦 Install

Not published to npm yet — install from GitHub or a local path:

```bash
dsh plugin --profile <your-profile> add github:GongYuanCaiJi/dsh-superpowers-zh
```

If pnpm blocks build scripts, add this package to `allowBuilds` in the profile's
`pnpm-workspace.yaml` (its `prepare` only runs a no-build structure self-check).

From a local checkout:

```bash
git clone https://github.com/GongYuanCaiJi/dsh-superpowers-zh.git
cd dsh-superpowers-zh && npm install
dsh plugin --profile <your-profile> add /path/to/dsh-superpowers-zh
```

## 🚀 Usage

No manual skill reference needed. Just describe your task; the agent invokes the
matching skill automatically. Ask the agent "what skills do you have" to confirm
the catalog is loaded.

## 🔧 What changed vs upstream

1. 107 files (skills/, hooks/, bin/, docs/, …) copied verbatim — SHA-256 pinned in `THIRD_PARTY_NOTICES.md`
2. New `index.js`: registers `skills/` into the dsh skills registry (same runtime-provider mechanism as dsh-lens)
3. New `cordis.patch.yml` + `dsh.bundle` in package.json: the dsh plugin loading entry
4. package.json: `main` now points to `index.js`; scripts adjusted per port-line conventions (`site`/`site:deploy`/`version` reference files not shipped in the npm tarball); description/repository point to this repo
5. LICENSE: upstream copyright line kept verbatim, plus a `(dsh port)` line
6. Upstream `README.md` → `docs/UPSTREAM-README.md` (verbatim; the original 23-tool install docs live there)

## ❓ FAQ

**Why Chinese?** The upstream `superpowers-zh` is already a full localization of
obra/superpowers; this port keeps the upstream text as-is and does not re-translate.

**How is this related to obra/superpowers?** This package is the dsh port of
`superpowers-zh`, the Chinese-enhanced edition of the 250k+ star original. Skill
contents are byte-identical to upstream.

**Looking for install docs for other tools (Claude Code / Cursor / …)?**
See [`docs/UPSTREAM-README.md`](./docs/UPSTREAM-README.md).

## 📄 License

MIT. Upstream copyright [jnMetaCode](https://github.com/jnMetaCode) (superpowers-zh)
and [obra/superpowers](https://github.com/obra/superpowers); port copyright
[GongYuanCaiJi](https://github.com/GongYuanCaiJi) (dsh port). See [`LICENSE`](./LICENSE).

If you find this useful, **please star the upstream too** ⭐:
[`superpowers-zh`](https://github.com/jnMetaCode/superpowers-zh) ·
[`obra/superpowers`](https://github.com/obra/superpowers)

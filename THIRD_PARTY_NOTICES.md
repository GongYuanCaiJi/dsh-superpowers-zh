# THIRD_PARTY_NOTICES

本套件（`dsh-superpowers-zh`）是 npm 套件 **`superpowers-zh`** 的移植（port），
上游授权 **MIT**。逐字保留的宣称以本档钉死的杂凑为准，任何人可自行验证。

## 上游

| 栏位 | 值 |
|---|---|
| 套件 | `superpowers-zh` |
| 版本（钉死） | `1.7.10` |
| 发布时间 | `2026-08-12T11:07:24.991Z` |
| 授权 | MIT（Copyright (c) 2026 jnMetaCode） |
| 上游 repo | <https://github.com/jnMetaCode/superpowers-zh> |
| tarball | <https://registry.npmjs.org/superpowers-zh/-/superpowers-zh-1.7.10.tgz> |
| dist.integrity | `sha512-ljI1CMQm1t4Snu2viy6iQVz8SKKKjhDG0p2hrXLts+TCRrL4mETalI7xig+qfM45bz6RL9KNq4CS9HLO8heX6g==` |
| dist.shasum | `5eb94074766c6e90d74dc81f334f115a03584e1e` |
| gitHead | `d83d3f9dc20218e576df09df7c68cfea62df7353` |

## 移植说明

- 上游 npm tarball（`package/` 内）的 109 个档案全数搬入本 repo，其中
  **107 档逐字未改**（下表）；两个档案依移植需求改写、不属逐字范围：
  - `package.json` —— dsh 插件合约（`dsh.bundle.patch`、`main`、scripts 增删、
    description、repository 等），每项改动理由见 README「本移植版与上游的差异」；
  - `LICENSE` —— MIT 全文与上游 copyright 行逐字保留，另加移植者行
    `Copyright (c) 2026 GongYuanCaiJi (dsh port)`（playbook B2 / A 报告）。
- 唯一路径变更：上游 `README.md` → `docs/UPSTREAM-README.md`（内容一字未改，
  在逐字表内；repo 门面的 `README.md` 是移植版自己的双语说明，非上游档案的改写）。
- 本 repo 新增（非上游）档案：`README.md`、`THIRD_PARTY_NOTICES.md`、
  `index.js`、`index.d.ts`、`cordis.patch.yml`、`test/`、`.gitignore`、
  `package-lock.json`。
- 逐字档案的 SHA-256 与 `test/fixtures/verbatim.sha256.json` 相同
  （`test/verbatim.test.js` 自动核对两者）。

## 逐字档案 SHA-256（107 档）

| `.claude-plugin/marketplace.json` | `5927be27df1a0ccc6acdd3e55abb40d53330c7aa089c0c3e783f746bcc1990ae` |
| `.claude-plugin/plugin.json` | `fb05531c95566cd3f91df93c90b15adaf8ee535392540604d26f450d37d97267` |
| `.codex-plugin/plugin.json` | `149e1011de7c527695d18a3bbc308691a5354b8401ff73fb11ba0d08c483b283` |
| `.codex/INSTALL.md` | `3d3cafa6ee2758fd45e5d5090fe4c9fdba97005175ad05d5ee82dc8c28e3f0bd` |
| `.cursor-plugin/plugin.json` | `e406a0e0eea79579022377bf07a93b1b7bf17578b772de39baccb2c0fae1179b` |
| `.opencode/INSTALL.md` | `7b683af9ae995588bd2f1f6cbba8a42a3191651590dd3a031bc63398aa6a6833` |
| `.opencode/plugins/superpowers.js` | `4c937a034510674c32eda0d9ffaa913406f26d5ef495e6ac92e7706907aac199` |
| `.pi/extensions/superpowers.ts` | `39c27000c047f8a1399a76e032e4cd239d7bdb0be168a121f46a2ac719deaae0` |
| `CLAUDE.md` | `88e37c54ff787506b47ac8d390e1eace476df5916a4f7ccc711eb79b723f970b` |
| `GEMINI.md` | `aa496116b9d7417a9db86f5e6bcceaccfab8a19e51d0249c354d7076fa920e4d` |
| `README.zh-Hant.md` | `29946d061806ad51f9d3a4daaa7dd7e115b395b71128d9bc0a9fa47b68a42896` |
| `RELEASE-NOTES.md` | `f7ce0934f1a3133903b4d4b2d98eb816f9f841cd224aec8c1ff101aecf21eea2` |
| `RELEASE-NOTES.zh.md` | `57a5ff52aa72014d85ce41b86be7223fd510de5e5f664d61d009fca4cb72b914` |
| `assets/app-icon.png` | `b7477eb39b5109617fe37e51dd65d8bdd8dff6c40fda49adfbc21eec445777ee` |
| `assets/qr-wechat.jpg` | `64193331757391128d233273e0ad2a9b6273d180d4e8de969d15859f6251249d` |
| `assets/sponsors/compshare.jpg` | `01ceb0b03fb75019ed9d792bf3e840f36a49f41a0a33a6ef1d56b24c90abeef0` |
| `assets/sponsors/cubence.jpg` | `e53f564d40c885253457737f476cd69b6206d28cdaab6e6be6576e4530b2ad25` |
| `assets/superpowers-small.svg` | `54a632d9ee6197ccbc10d43d42217e23d08375bea63ba8eb4b6af757c1535038` |
| `bin/superpowers-zh.js` | `8b01ac324ce7edad465af94e9db989edda5b37fc62a0efc438f20bf58c83c9a6` |
| `docs/README.aider.md` | `351eea53e22e4d03709d63496bffd7047e80af50a734ad92d47f045b8c6c878a` |
| `docs/README.antigravity.md` | `db7617635617a818651c59a15c866c617a1a4e1329aa2be3985e27d2cbf6c3f9` |
| `docs/README.cline.md` | `a74b0dbd74300e26c8ebb8bd99376dd249a267c50d271f7fe8836cea5afb6671` |
| `docs/README.codearts.md` | `d4f3568f7ca6dbd28bf061d08c91f46d7fd5edc4d73dbe12a09db86a0678a768` |
| `docs/README.codebuddy.md` | `31e6bd33c34d91747a854982fa1f332448941db98a6064e8a4656afc3082e5ea` |
| `docs/README.codex.md` | `b802bed833a017e5a1e0aeb31eb7aa82a21755a761af729dd204ada9572a4643` |
| `docs/README.crush.md` | `450abd9646bd63d4c2675e5d6e8b7902ec137ed871df03c65f4e4688b5e08cbf` |
| `docs/README.deerflow.md` | `14c7e67a3688f19b7bf99ee054677541a095932d3fdcbd3faecc3d2f66a4b992` |
| `docs/README.gemini-cli.md` | `cb691e4eddbe3bd69cc622105a319554d31619521e1218d874891d75987a334e` |
| `docs/README.hermes.md` | `97649b41723cdcf1825abfa54bbd9470268ff9c3311a439142197eed27a11994` |
| `docs/README.kilocode.md` | `3ab3364c9776b7d6d3fd45bd61afd10020e1199b64bc9565e524d617e56e3437` |
| `docs/README.kimi.md` | `038dae3378dc60d528a55ccbc9ed4a8065d2d121b71d2cb4e52fccac49b5c9b2` |
| `docs/README.kiro.md` | `0a77c70317ad97dc51c38b9547e915714ddcc97ec4a82c9a81652010431acbe5` |
| `docs/README.openclaw.md` | `cabded060c7ea4e0243eff469adae335187258b25c94e1b53582ff0d0c5076f7` |
| `docs/README.opencode.md` | `79f4f2bcedea1a548bf03cb0f6842176eacf8ef43b36bf89f324dcbe124852aa` |
| `docs/README.pi.md` | `41ff64080a20447488e9d6aa3058b596547c796d07a107e058130aead5115ab1` |
| `docs/README.qoder.md` | `9c0bad6811aa1253fb87000015d3573ae49b0a0c5da80f7127b8df830894a686` |
| `docs/README.qwen.md` | `0c1c3b1df59209a7348e13bd39615365ba4178d672e2a8d1a31bdf96a7f22e25` |
| `docs/README.trae.md` | `dc8fcf4276369694d0072cd3fd3a77f2544c93e4a51173aaae985299c6a36134` |
| `docs/README.vscode.md` | `0b2d93b53a2f060c691439f445c97b29b5b5920aef537ff0b0de50dfb236466c` |
| `docs/README.windsurf.md` | `5d3fac4989dd9ace5a360def888be1ed2807c0935f17266ea2669b9a3f033f7b` |
| `docs/UPSTREAM-README.md` | `996e18366c5bd4cf8a1394befd6e3f736c61b6deee310b21252d1eb1f64d2ba6` |
| `docs/assets/RECORDING-GUIDE.md` | `4cd3820efe5c15b9c6f5e4afb78b9908b891c922dad1ef45731ca5f58151c2e0` |
| `docs/assets/demo.tape` | `1169ca35d4fdf4a2574a42dcd261cfc017a9234bb91e1bf4b7e70eaeed4ec3df` |
| `gemini-extension.json` | `096d3ce6f12a2fdcb043fd9b6e4fde90c211950c4b745a6c2c1db05ed276cc40` |
| `hooks/hooks-cursor.json` | `53d8ceb3ff5d8bb1c4f283f238cc868b8c1af22e40a3ac30f6d6e4173effefbd` |
| `hooks/hooks.json` | `47fd72cc8bedf31c72702b35b4ed7bab670294d658c4ce518330337525a3798b` |
| `hooks/run-hook.cmd` | `d3d9c6199678dab2858e60509dde5e7414f13c2a2b5e48a38b1d368b6e1d6abb` |
| `hooks/session-start` | `88a060272ca8047e0d1cd73a016e1cebba8396807a44be1e296d7c02dcbb9934` |
| `skills/brainstorming/SKILL.md` | `91e11cf6de77ae183a7fb7b2046e2e71181af537c3ca79a42fc6c37cf6bdc64c` |
| `skills/brainstorming/scripts/frame-template.html` | `6a8a4e58bd6a44b904e2e3c57de774481d909204597e1498de53f1b2fecc4c4e` |
| `skills/brainstorming/scripts/helper.js` | `43c6d69954a46ec34a2a262bcc62a9a7e83e839c739f199cb72646d397c686e3` |
| `skills/brainstorming/scripts/server.cjs` | `2d2961ea8d11f56c5f4c3a1a68d22709efa5d7601a2246d8c880774e7e9e8412` |
| `skills/brainstorming/scripts/start-server.sh` | `a4e5ae84275bcaacd2f84345afeabe59cf7b00ba080e123da7cc1fb226f12847` |
| `skills/brainstorming/scripts/stop-server.sh` | `0b5ccbbd57f62d3ed88993f7940b5ee0e5c0fc9b21c550c623da4f6292e47daf` |
| `skills/brainstorming/spec-document-reviewer-prompt.md` | `da789cac8a2e87c58a173ff7ba760d4b95396452e8c632d43fdee5613f4937f4` |
| `skills/brainstorming/visual-companion.md` | `89346ef13eaca9d8ef784dc9eaba90b8e9c7da9be70dc287c86340685cf9cde0` |
| `skills/chinese-code-review/SKILL.md` | `51326bc6e097ff69251b36335c31c768ba0dc8ca8204d2c81b8a4826ffab0682` |
| `skills/chinese-commit-conventions/SKILL.md` | `64dad78d77bb872394322f79b580078eea1739bed01111894ffffbfdec492e4f` |
| `skills/chinese-documentation/SKILL.md` | `58323397177b6343bd3234f9e4acd8891d58f08cf8076b26fd98296308203a0a` |
| `skills/chinese-git-workflow/SKILL.md` | `e428dc6f0c3883941e15598db5f5d9ec066a3d3528cbbd565d98273aad900aa1` |
| `skills/dispatching-parallel-agents/SKILL.md` | `5aa29e0838943f26b46e09e9e49b69f9f3580af5ebaeb7a2d87533dadf0295b2` |
| `skills/executing-plans/SKILL.md` | `1b25bb251f226897ce8dcae888748efa25c6931d37e8c1f3f61a543571fa3e68` |
| `skills/finishing-a-development-branch/SKILL.md` | `6e891b0115346a8195b502e259f13fe1bce503091852a7e577e2628916e64f5b` |
| `skills/mcp-builder/SKILL.md` | `42a4afe5def8a3469a983fc80b29792ab9d7a876b2c03ea8bb5ad187fbb3ba5c` |
| `skills/receiving-code-review/SKILL.md` | `f8d534ce6edf899aafbb6054a86e8f1da0187c118be0b4039d86cfde611c5a34` |
| `skills/requesting-code-review/SKILL.md` | `4629ab5686d32a1e6bea243eaf9a9aa400edba50e49b15f00d597992ccb10895` |
| `skills/requesting-code-review/code-reviewer.md` | `ccc7014dbb57ed8aa6efb3b19b00926d27b5f211b89484b5ec809301bf3b64b8` |
| `skills/subagent-driven-development/SKILL.md` | `27081029a6b06e8f9d6cea6bc1ab8b444869dcd5575383760e0c4ec11b6229c4` |
| `skills/subagent-driven-development/implementer-prompt.md` | `a219b0831c4dc63958e2561ffdbfc77c5a10a5a6a2b46f7ab5c885cd766bf81d` |
| `skills/subagent-driven-development/re-review-prompt.md` | `4c67842b4cacda81f2d29409c08184bb436f7dfc18d810cf6eb8adb7a09266d3` |
| `skills/subagent-driven-development/scripts/review-package` | `fac3d4bd7f94369e8037b9ead2a8a502dca6ab333902b560b9455dbb3c450ebe` |
| `skills/subagent-driven-development/scripts/sdd-workspace` | `95a09d9d3983ad1aafd093ca72b4587946dea885c6e302caa02a779a2f911c31` |
| `skills/subagent-driven-development/scripts/task-brief` | `0073ffecc7adc2c4068bcdcabb463d94403f2b5120ad646b253851c457bb2f03` |
| `skills/subagent-driven-development/task-reviewer-prompt.md` | `bd08cce3163368c1f32ae066e8a8598a6fe28ed87ea68c56b8091b01ff8eb6e6` |
| `skills/systematic-debugging/CREATION-LOG.md` | `b482ef9a918fbfc6c369729e8160633ddfa2332466dd362ee73f1527c239ef8b` |
| `skills/systematic-debugging/SKILL.md` | `f0e3e21f0d815706a6d16a1dd2310b076a54e6f9ddfc501cfb5a334c62bd3fd3` |
| `skills/systematic-debugging/condition-based-waiting-example.ts` | `40ae5ebe497fdf310200e43fe986552546d0a22837c0d39e855db1cfd33eb88e` |
| `skills/systematic-debugging/condition-based-waiting.md` | `2a5d25ecb445393ad02e0d7298a81479ba440a843ee1f50212d9cfe2c6436ea9` |
| `skills/systematic-debugging/defense-in-depth.md` | `2a082550717d83734c7b1dc35f1d06c5018f050d632702ccc7c98d3f26018e7f` |
| `skills/systematic-debugging/find-polluter.sh` | `dd7b8f13c4cc2a24b33ff87b18da9248f3e1c80a085c3316224f69ff0fa5c43c` |
| `skills/systematic-debugging/root-cause-tracing.md` | `ad70421ae445b1ca24630c94d3cff1c66387629445a90d705ec52fb56aec9ee5` |
| `skills/systematic-debugging/test-academic.md` | `fe2ba480d78ac0d686dc025f41c2a32a43d642bf533f91b0c6053a04d35d6486` |
| `skills/systematic-debugging/test-pressure-1.md` | `0b6a915db0054577819834c79be9eb614e97bddba10d73768e1fbe91cfed048a` |
| `skills/systematic-debugging/test-pressure-2.md` | `b2030aeffba07050e8ad573ddf87486457c4a016a786bb326235bebd856f2016` |
| `skills/systematic-debugging/test-pressure-3.md` | `96b50a52e2c7989c9cf20fb752c47c1e9a3a70dc362f8f7989f8f5b64dac7708` |
| `skills/test-driven-development/SKILL.md` | `701d23255e599cb5ca8a68c5ecb92c601e89ab2311292a4dd6c7a0fec7f74178` |
| `skills/test-driven-development/writing-good-tests.md` | `d25657adb7c0d801d40b9a72e76fc23965a45854f2dd15222400c7cc8f44ce63` |
| `skills/using-git-worktrees/SKILL.md` | `13ec7407756b0ad5594afae3736af0531899db10e2bcd7a93cc4f5d836c09d4d` |
| `skills/using-superpowers/SKILL.md` | `3da2066e0fe0fe0022f48cc6363b8f0dab1cca5c0ba77d8a387505d0d48ff9ed` |
| `skills/using-superpowers/references/antigravity-tools.md` | `82743f2a0d4c9f82ccee21781d66c2e357fa608fe5a36d848a6140e09553591d` |
| `skills/using-superpowers/references/codex-tools.md` | `c5366eec718d61739fbe6c072e093aee87b54844b168cfc26d12b508b248f404` |
| `skills/using-superpowers/references/copilot-tools.md` | `df2fe6e337d017c476a45ac4fce588d4859af8653d4b8eaa2c069ba9d67a6e09` |
| `skills/using-superpowers/references/gemini-tools.md` | `62bf71b424e9bc646a253a1ef47132b8a44cfc41da59dc32318872ff60ce885b` |
| `skills/using-superpowers/references/hermes-tools.md` | `feb7eb909c25606c21df60538af5956379f43ba657f0167969682e90f7aa36ef` |
| `skills/using-superpowers/references/pi-tools.md` | `e89e2d5c7b89cdd2a511aa7ad3c191290baaaed8913006c30f283ac7c4b091fb` |
| `skills/using-superpowers/references/qoder-tools.md` | `47f2fea4c700bf2bcf91f233f549aea47847597d5c3ecd1da620f9cdecff2556` |
| `skills/verification-before-completion/SKILL.md` | `bd976c5f28413d08b3a7dc3026549a6ff43fab4e282b74842a9389cc2034eda4` |
| `skills/workflow-runner/SKILL.md` | `445b25e66a8ab8cd1102e4bebdf8cd616a520b8d78e3684a0ffe6b3a11804e31` |
| `skills/writing-plans/SKILL.md` | `ab0692c3515b2460ce18f8bba0ac764f86c3671f4b6bdd16a2387c8965ae0c0a` |
| `skills/writing-plans/plan-document-reviewer-prompt.md` | `e48509e5bfc1dc62eee080721263ee20cdfca563320f352d6fb26a904fec1d11` |
| `skills/writing-skills/SKILL.md` | `729d4eebd071d4c5f435abc886b28b1729da3789876a30186ef2751be6a5da2e` |
| `skills/writing-skills/anthropic-best-practices.md` | `0b5c85d5b2ae26ac3a27ca7238f588ce2e078c1dc4cfa2359b2702d6eb3a2c52` |
| `skills/writing-skills/examples/CLAUDE_MD_TESTING.md` | `0b379a3415e185d3c434b3ad283d8aa132f3022c2a4f210f168865b5986bcef0` |
| `skills/writing-skills/graphviz-conventions.dot` | `e2890a593c91370e384b42f2f67b1a6232c9e69dddea7891a0c1c46d7b20b694` |
| `skills/writing-skills/persuasion-principles.md` | `0031b99c8109ecc65db5d62751f09d24cf1c59c90022968c314fa1066c016fc9` |
| `skills/writing-skills/render-graphs.js` | `ccda971a87bb185f8febf81c56b556a20d026fa980c17b35fa3e8824fbb37852` |
| `skills/writing-skills/testing-skills-with-subagents.md` | `e19de39a5f13ed7c99f4f63c5745142e74dcf7f8fc27b022c4e0c27d95945efc` |

## 自行验证

```bash
# 用 npm 官方 tarball 重算并比对（逐字范围 = 上游 package/ 内容）
npm pack superpowers-zh@1.7.10   # 得到 superpowers-zh-1.7.10.tgz
mkdir -p /tmp/spz && tar xzf superpowers-zh-1.7.10.tgz -C /tmp/spz
# 每个档案逐字比对（README.md 对应 docs/UPSTREAM-README.md）
diff -r /tmp/spz/package/skills skills && echo skills-OK
cmp /tmp/spz/package/README.md docs/UPSTREAM-README.md && echo readme-OK
# SHA-256 对表
shasum -a 256 skills/*/SKILL.md   # 与上表比对
```

## 授权

上游 MIT LICENSE 保留于本 repo 的 `LICENSE`（上游 copyright 行逐字 + 移植者
角色行）。本 NOTICES 档的内容不构成额外授权限制。

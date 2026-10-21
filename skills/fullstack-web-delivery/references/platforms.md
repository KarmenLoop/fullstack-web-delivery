# Platform installation and capability limits

Documentation routes were reviewed on October 21, 2026. Only Codex desktop has a completed local field trial. An installation path is not proof of execution compatibility. Copy the entire skill folder and preserve relative references. Keep one unambiguous source per target.

| Host | Documented route | Observed status |
| --- | --- | --- |
| Codex local | ~/.agents/skills/ or project .agents/skills/; invoke $fullstack-web-delivery | Desktop loaded and used; CLI/cloud NOT_RUN |
| Claude Code local | ~/.claude/skills/ or project .claude/skills/ | Documentation reviewed; runtime NOT_RUN |
| Cursor | ~/.cursor/skills/ or project .cursor/skills/; shared .agents/skills/ also documented | Runtime NOT_RUN |
| Qoder IDE / CLI | ~/.qoder/skills/ or project .qoder/skills/ | Runtime NOT_RUN |
| WorkBuddy | Add Skill -> Upload Skill | Actual import acceptance NOT_RUN |
| Koder / Koder CLI | Verify the current loader; use explicit file reading until verified | Native discovery/tools/runtime NOT_RUN |

QoderWork is a different product with its own documented directory. Older Codex versions may use other locations. Verify actual discovery rather than relying on conflicting precedence rules. Host-specific metadata stays in agents/openai.yaml; generic frontmatter remains portable.

For a file-capable host, ask it to read the actual absolute path to SKILL.md and load relevant relative references. Supply the task, existing material, authorization, and review gates. This is manual use, not proof of native skill discovery.

Cloud sessions must receive the files through their supported project/import mechanism. Localhost in a cloud container refers to that container. Missing network means research pending; missing browser means browser work NOT_RUN; missing terminal/file write means a planning/handover result. Scheduled continuation requires actual scheduling support and a user request.

For each host record product/version/OS, install path, skill hash, discovery, reference reading, interview/plan, files/commands, full business flow, preview, and recovery. Report documented route, loaded, executed, previewed, and full-flow acceptance separately.

Sources: [Codex](https://learn.chatgpt.com/docs/customization/overview#skills), [Claude Code](https://code.claude.com/docs/en/skills), [Cursor](https://cursor.com/help/customization/skills), [Qoder IDE](https://docs.qoder.com/extensions/skills), [Qoder CLI](https://docs.qoder.com/cli/Skills), [QoderWork](https://docs.qoder.com/qoderwork/skills), [WorkBuddy](https://www.codebuddy.cn/docs/workbuddy/From-Beginner-to-Expert-Guide/Function-Description/Skills-Market).

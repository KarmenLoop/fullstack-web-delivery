# Platform setup and verification matrix

The portable artifact is `skills/fullstack-web-delivery/`. It contains a normal SKILL.md, conditional Markdown references, legal notices, and optional Codex metadata. The core instructions do not hard-code a host's tool API or grant execution permissions.

| Target | Documented entry | Runtime evidence |
| --- | --- | --- |
| Codex local | ~/.agents/skills/ or project .agents/skills/ | Desktop used in the local trial; CLI/cloud not run |
| Claude Code | ~/.claude/skills/ or project .claude/skills/ | Not run |
| Cursor | ~/.cursor/skills/, project .cursor/skills/, or supported shared .agents/skills/ | Not run |
| Qoder IDE / CLI | ~/.qoder/skills/ or project .qoder/skills/ | Not run |
| WorkBuddy | Add Skill / Upload Skill | Archive import not run |
| Koder / Koder CLI | Inspect the current loader; explicit file-reading fallback | Native import and full flow not run |

These routes were documented in the source research; validate the target version before installation. Keep one source per host rather than depending on ambiguous precedence. QoderWork is distinct from Qoder IDE. Host metadata is optional outside its product.

A manual prompt can ask the agent to read an actual absolute SKILL.md path, load relevant relative references, reuse the brief, deliver the plan, and continue authorized local work. That proves only the reading route you actually exercise.

Cloud/container sessions need their own accessible copy and supported preview forwarding. Your computer's skill files and localhost are not automatically present there. Do not package client credentials with the skill.

For each target record version/OS, path/hash, discovery, conditional-reference reading, decision quality, plan ordering, files/commands, full business flow, preview, and recovery. A loaded skill is not automatically a full-flow pass. The detailed sources and fallbacks are in the [portable platform reference](../skills/fullstack-web-delivery/references/platforms.md).

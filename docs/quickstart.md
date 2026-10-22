# Quickstart

## Choose the right entry

For an agent-driven project, install the portable skill. For a runnable demonstration, start the example. Installing a skill does not start a server, create accounts, grant tool permissions, or import cloud credentials.

## Install without overwriting an existing skill

Clone the official repository. For a fresh Codex installation, create `~/.agents/skills` and copy the complete `skills/fullstack-web-delivery` folder there. If that destination already exists, inspect its version and origin first. Keep one unambiguous installation; use the host's supported replacement process when updating. The release skill archive contains only this standalone folder and its legal notices.

For Claude Code, Cursor, Qoder, WorkBuddy, Koder, and cloud sessions, follow [platform setup](platforms.md). A file-capable agent can instead read the actual absolute path to `SKILL.md` and load its relative references. Manual reading is not native discovery.

## Start a project

```text
Use $fullstack-web-delivery.
Project: [business, audience, primary task].
Existing material: [paths or supplied context].
Required capabilities: [public pages, accounts, forms, administration, integrations].
Visual and writing constraints: [known decisions or references].
Authority: deliver the complete plan first, then continue local development.
Review gates: [only the gates I explicitly require].
Acceptance: [the critical end-to-end tasks and devices].
```

The agent should summarize known facts, inspect technical details, ask only for missing decisions, and deliver a complete plan before implementation. If you ask only for a plan, implementation should not start. If you already authorize local work without another review gate, delivery of the plan should lead into development.

## Expected artifacts

The project should retain its plan, page and interaction contracts, APIs/data model, content sources, decision/progress record, acceptance results, commands, and screenshots. A small project can use short tables instead of separate CSV files. The deliverable should say where the form is stored and where an authorized employee can see it.

## Run and operate SENSU

From `examples/sensu-enterprise`: `npm ci`, `npm run setup`, `npm run build`, and `npm start`. Use Node 22.13+ within Node 22. Open loopback port4319. Setup generates random local credentials in `.local/demo-access.json`; never commit that folder.

Use a fictional inquiry, match its returned reference in the workspace, inspect it as read-only staff, then advance it as administrator and inspect the history. See [the complete walkthrough](example-guide.md). Stop the owned server with Ctrl+C. The explicit cleanup command is destructive to this demonstration's local records; run it only when those records are no longer needed.


## Generate the implementation contracts

After answered discovery, request the complete plan and the project-specific UI/UX, design, page, action, motion and module specifications together. The skill now does this before implementation. See [the specification tutorial](specifications.md) and [populated example](generated/sensu/README.md). The optional Python renderer uses no third-party runtime packages and protects existing outputs.

The complete example also includes [six operable interaction studies](interaction-studies.md) at `/interaction-lab`. They are alternatives to select by task; installing the skill does not add six effects to every project.

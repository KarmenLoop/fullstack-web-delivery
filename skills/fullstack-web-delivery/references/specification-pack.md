# From discovery answers to implementation contracts

Generate a project-specific specification pack as part of the complete plan, before implementation. Reuse the answers, source inventory and authority already established. Do not restart the interview or ask users to decide facts the source can answer. Ask only for a consequential missing business decision; continue independent scope.

## Required outputs

- **UI/UX prompt:** a copyable implementation brief in the requested language. Name the audience, primary tasks, business context, reference adoption/rejection, composition, content, tokens, pages, navigation, states, motion, constraints, authority and acceptance. Fill it with this project's facts. A prompt saying only "premium Apple-inspired design" is incomplete.
- **Visual choice record:** for new sites or substantial visual redesigns, identify the representative task, shared constraints, three layout directions and actual preview/capture references. Retain pending selection or its real feedback/delegation source in the existing decision ledger. Follow [visual decisions](visual-decisions.md); update the implementation prompt and affected contracts after selection. Preserve an already chosen layout or targeted-fix scope.
- **Page contracts:** stable page ID, actual route, who reads it, task, entry/return path, section content and order, real or pending copy, primary/secondary action, role/data/API, phone behavior, and acceptance IDs. Separate actual URLs, templates and state variants.
- **Action/state contracts:** stable ID, page, role, trigger and actual destination/API/local operation; default, focus, press, loading, empty, disabled, error, success, interruption and recovery where relevant. Explain what confirms success and how linked elements derive from it.
- **Motion specification:** purpose, trigger, affected elements, order/overlap, measured distance, duration/curve/spring, exit, interruption, reduced-motion and keyboard/touch alternatives, performance cost and verification. Use [the pattern contracts](interaction-patterns.md) when appropriate.
- **Module specifications:** frontend/component responsibilities; backend/API contracts; authentication/authorization; data schema/lifecycle; content/claims/media; local startup/preview; acceptance evidence. Include payment, commerce, migration, upload, notification or integrations only if required. Mark omitted modules with a reason, rather than installing them by default.
- **Traceability:** requirement → page/action → component/API → data/role → observable scenario → result/evidence. Start results as NOT_RUN. A generated document is not a passing implementation.

## Practical rendering

The host can write these documents directly using its normal file tools. The optional Python standard-library helper `scripts/generate_project_specs.py` renders a structured answered brief into 16 English documents, including a file-integrity manifest. It is a renderer, not a discovery model, research agent or automatic publication grant. Populate decisions from actual answers first. It validates required page/task/action/role relationships and refuses an existing output directory to protect authored changes. Use a new revision directory and review the diff; do not overwrite a user's design work.

CLI: `python3 scripts/generate_project_specs.py --brief answered-brief.json --out project-specs-v1`. Python 3.9+ is supported. Paths are relative to the skill folder in this example. Other host environments can render the same contracts without Python. New-project documents follow the user's requested language; the bundled helper and published example are English.

Use the repository's [populated example input](https://github.com/KarmenLoop/fullstack-web-delivery/blob/main/docs/specification-inputs/sensu.json) and [generated pack](https://github.com/KarmenLoop/fullstack-web-delivery/tree/main/docs/generated/sensu) to understand the schema. The example's authority applies only to that owner's trial. Never carry it into an unrelated project.

## Design prompt quality gate

A different client in a different field must produce a different content/task architecture, not just swapped colors. Research the relevant industry's strongest references first. Extract observed principles and declare what is rejected. Taste's marketing composition guidance does not automatically govern an operational table or form. Apple-like continuity does not require copying Apple's type, assets or glass effects. Preserve an appropriate existing brand.

Before expanding templates, build the representative page and its highest-risk interaction. Inspect realistic content, current device width, focus, motion and failure states. Update the contracts if implementation evidence changes a decision. Inspect winning computed values and later responsive/cascade overrides; the first source declaration may be obsolete. Keep code, docs and acceptance IDs synchronized.

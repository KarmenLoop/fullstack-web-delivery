# Generate project-specific specifications

Discovery is complete when the agent can explain the audience, core task, content, roles, data, visual direction, scope and acceptance. Forty questions are a pool, not a quota. Existing answers remain authoritative until corrected. Inspect source and tools for technical facts; ask only for business decisions that change the outcome.

The next handoff is a complete plan plus concrete implementation contracts. The [SENSU input](specification-inputs/sensu.json) and [16-file output](generated/sensu/README.md) show this using the owner's existing answers. The original Chinese trial and later English-publication instruction are both retained as decisions; the renderer does not silently change the client's language.

## What gets written

| Document | What an implementer can decide from it |
| --- | --- |
| UI-UX-PROMPT.md | Copyable, populated brief with actual audiences, pages, actions, brand, authority and acceptance |
| DESIGN-SPEC.md | Typography, colors, composition, spacing, components, navigation, feedback, assets and accessibility |
| PAGE-SPECS.md | Who sees each route, their task, section content, action, hierarchy and phone behavior |
| INTERACTION-SPECS.md | Actor, trigger, destination, state, feedback, motion, recovery and verification |
| MOTION-SPECS.md | Choreography, timing/physics, interruption, alternatives and acceptance |
| FRONTEND-SPEC.md | Rendering, routes, component boundaries, layout, state and semantics |
| BACKEND-SPEC.md | API methods/paths, callers, validation, errors, idempotency and business writes |
| AUTH-SPEC.md | Session lifecycle, roles, server enforcement and isolated credentials |
| DATA-SPEC.md | Entities, persistence, legal transitions, audit, retention and cleanup |
| CONTENT-SPEC.md | Tone, factual claims, source material, media and applicable commercial boundaries |
| PREVIEW-SPEC.md | Runtime, setup, startup, actual browser entry, ownership and restart |
| ACCEPTANCE-SPEC.md | Scenarios, commands, evidence levels, defects, rechecks and remaining limits |
| DECISIONS.md | Reused answers, sources, assumptions, research and actual authority |
| TRACEABILITY.csv | Requirement/page/role/target/scenario; every generated result starts NOT_RUN |
| spec-manifest.json | Input fingerprint and exact output hashes; integrity is separate from acceptance |
| README.md | Document index and scope |

## Run the optional renderer

Python 3.9+ and its standard library are sufficient. From the repository root:

```sh
python3 skills/fullstack-web-delivery/scripts/generate_project_specs.py \
  --brief docs/specification-inputs/sensu.json \
  --out /tmp/sensu-specs-v1
python3 scripts/test_specifications.py -v
```

Choose a new output directory. A second run to an existing directory stops with exit 2, preserving authored changes. Compare revisions rather than replacing edited documents. Validation and complete rendering precede output writes. Unique routes/page IDs, non-empty tasks, declared actors, valid page references and declared route targets are checked. API/local targets remain explicit contracts; the helper does not inspect or execute them.

The input object contains project, purpose, audience, language, brand, research, authorization, decisions, assumptions, pages, roles, design, interactions, motion and modules. Each module has `status: required` or `not_applicable` plus a concrete specification or omission reason. A static site should not acquire login, storage or API scaffolding. The tests exercise that difference. Extend a relevant module specification for commerce, files or integrations only when those are actually in scope.

This helper renders English documents from supplied facts. The host agent remains responsible for discovery, source research, project decisions, requested-language writing, implementation and actual acceptance. Hosts without Python can write the same contracts directly. The example's authorization is a historical project fact, never portable permission to publish or alter another project.

## Write a useful UI/UX prompt

The 0.6.0 renderer includes the [three-layout review protocol](visual-decisions.md) in the implementation prompt. For new sites and substantial visual redesigns, the initial design contracts provide shared constraints while the layout choice remains pending. After a real selection or explicit delegation, update composition, page/action/motion contracts and the existing decision record. Preserve specifically chosen designs and targeted-fix scope. The helper writes instructions; it does not build prototypes, open a browser or claim user feedback occurred.

A useful prompt names the page's reader and decision, actual content, primary action, success/failure states, brand tokens, composition, data/API dependencies and acceptance. Describe the reference principle and rejection decision: for example, use Apple-like continuity and clear feedback while preserving the client's existing brand. Do not ask for "premium, modern, award-winning" and expect those adjectives to substitute for decisions.

The implementation prompt should link each action to its contract and require real navigation. Specify immediate press feedback, pending versus confirmed result, preserved input on failure, linked-state ownership, interrupted/repeated operation, keyboard/touch and reduced motion. Choose advanced patterns by task. An operational workspace needs readable records and recoverable actions; marketing composition guidance does not replace those responsibilities.

Update the documents when a verified implementation fact changes the plan. Keep actual results in a separate execution ledger; an intact generated manifest proves the example was generated reproducibly, not that every scenario passed.

# Frontend specification

Project: SENSU Digital — enterprise site, interaction studies and motion atlas. Output language: English public example; use the client-requested language for new projects.

Scope: required.

Use the existing React SSR, React Router and Vite modules. Keep public templates and admin components separate by responsibility. The lab is an isolated route with query-driven study/view selection. Every enabled control has the target defined in INTERACTION-SPECS. Preserve semantic links, headings, labels, native validation, keyboard order and focus after asynchronous replacements. Inherit src/tokens.css and use scoped lab CSS. Design at real content lengths; inspect desktop 1440px and phone 390px plus the actual preview viewport. The motion atlas is a separate inherited-identity route with scoped appearance tokens, a named native rail, inline disclosures and one selected department ID. Successful command queries recover the shared model and invalidate stale initial loading errors.

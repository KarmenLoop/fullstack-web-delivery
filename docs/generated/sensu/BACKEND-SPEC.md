# Backend specification

Project: SENSU Digital — enterprise site, interaction studies and motion atlas. Output language: English public example; use the client-requested language for new projects.

Scope: required.

Same-origin Express API: GET /api/health, GET /api/session, POST /api/login, POST /api/logout, POST /api/inquiries, GET /api/admin/inquiries, GET /api/admin/inquiries/:id, PATCH /api/admin/inquiries/:id. Public inquiries accept strict validated fields, consent, honeypot and idempotency. Staff queries support search/status/pagination. Update includes expected version, legal transition and transactional audit. Return structured validation, 401, 403, conflict and rate-limit errors; inspect actual server schemas before implementing consumers. Lab completion is local simulation and must never call the inquiry write endpoint. GET /api/demo/access-map accepts one optional q string, at most 160 characters; duplicate/unknown fields return 422. Its server-owned fictional policy supports exact English/Chinese user-access revocation questions and role/team search. Other permission subjects return unsupported-query, null permission and no role IDs. POST is unsupported. It is separate from actual staff authorization.

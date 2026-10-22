# Backend specification

Project: SENSU Digital — enterprise site and interaction studies. Output language: English public example; use the client-requested language for new projects.

Scope: required.

Same-origin Express API: GET /api/health, GET /api/session, POST /api/login, POST /api/logout, POST /api/inquiries, GET /api/admin/inquiries, GET /api/admin/inquiries/:id, PATCH /api/admin/inquiries/:id. Public inquiries accept strict validated fields, consent, honeypot and idempotency. Staff queries support search/status/pagination. Update includes expected version, legal transition and transactional audit. Return structured validation, 401, 403, conflict and rate-limit errors; inspect actual server schemas before implementing consumers. Lab completion is local simulation and must never call the inquiry write endpoint.

# Auth specification

Project: SENSU Digital — enterprise site and interaction studies. Output language: English public example; use the client-requested language for new projects.

Scope: required.

Visitors consult without login. Staff session is server-owned and persistent; administrator can read/update, viewer can only read. Never use hidden buttons as authorization. Rotate session on login, destroy on logout, HttpOnly/SameSite cookie, same-origin and CSRF checks for mutations. Generate isolated local credentials via npm run setup; retrieve from .local/demo-access.json and never publish them. Test anonymous, viewer, administrator, invalid/limited login, stale session and logout.

# SENSU Digital: complete local example

SENSU is a fictional digital-services company for small and medium-sized teams. The example connects a public site to a real local inquiry API, SQLite, staff sessions, and role-limited administration. Version 0.4.1 localizes the earlier trial into English and is checked separately from its historical evidence.

## Start

Use Node 22.13+ within the Node 22 release line. Local checks used22.23.2. Its built-in SQLite API emits an experimental notice; that notice is not a failed test. From this repository:

```sh
cd examples/sensu-enterprise
npm ci
npm run setup
npm run build
npm start
```

The website is `http://127.0.0.1:4319/`, staff entry is `/login`, and workspace is `/admin`. Setup creates the local database and random administrator/read-only credentials in `.local/demo-access.json`. It preserves existing passwords. No password belongs in a README, issue, or screenshot.

The server uses loopback only. `npm run dev` starts development mode; `npm start` serves the production build. Do not run both on the same port. On macOS/Linux, `PORT=4321 npm start` selects another free port; use `SITE_ORIGIN=http://127.0.0.1:4321 npm run verify:http` for its route check. Stop a manually started server with Ctrl+C. The local process receipt records its own PID/cwd/port/mode; verify ownership before stopping another terminal's process.

## Pages and roles

| Surface | Routes | Purpose |
| --- | --- | --- |
| Public content | /, /services, /services/website, /services/systems, /services/automation, /method, /about, /contact, /privacy | Understand, choose, and submit |
| Staff sign-in | /login | Credential verification and rotated session |
| Workspace | /admin | Search/filter, inspect, and authorized processing |
| Not found | Any unrecognized route | Actual404 and recovery action |

Visitors need no account. A read-only employee can inspect the records but cannot update status. An administrator can advance New -> In progress -> Done. The server checks roles, version, and legal transitions; the browser's hidden controls are only presentation.

## Operate the same inquiry end to end

1. Choose Automation on the home/service pages and follow its consultation action. Check the service preset.
2. Submit a fictional name, company, `.test` email, service, and at least ten characters of project detail. Read the local-demo notice and consent.
3. Save the returned reference. The result is local persistence, not an email delivery claim.
4. Sign in using the generated read-only account. Search that reference and inspect its details. Status controls are unavailable.
5. Sign out and use the administrator account. Find the same reference, mark it in progress, then done. Inspect both history events.
6. Refresh/restart and inspect the same record and valid session as specified by the acceptance contract.

To examine failure recovery, use invalid input and an authorized browser network interruption. Keep the form values and inspect the result before retrying an uncertain save. A new inquiry uses a new idempotency key; retrying the same operation follows its existing key.

## API responsibilities

| Method/path | Boundary |
| --- | --- |
| GET /api/session | Bootstrap CSRF and current session |
| POST /api/login | Validation, throttling, password verification, session rotation |
| POST /api/logout | Invalidate current session |
| POST /api/inquiries | Anonymous validated/limited/CSRF-protected/idempotent creation |
| GET /api/admin/inquiries | Authenticated search, status, pagination, and statistics |
| GET /api/admin/inquiries/:id | Authenticated detail and history |
| PATCH /api/admin/inquiries/:id | Administrator, current version, legal next state, atomic audit |

The source of truth is `server/api.mjs`; accepted payloads are strict. Do not add the role field to a login payload. Server-generated error messages are usable English and do not expose internal stacks.

## Storage, accounts, and cleanup

`.local/sensu.sqlite` holds password hashes, expiring sessions, inquiries, and events. `.local/runtime.json` contains a private session secret. These files are excluded from Git and release source archives. Setup on another machine creates new accounts and empty records; screenshots are evidence, not a seed database.

`npm run accounts:reset` explicitly rotates local passwords and invalidates sessions. To clear this project's test inquiries/history/sessions while preserving accounts, run the following only when those records are disposable:

```sh
npm run data:clear -- --confirm-local
```

Maintenance behavior is tested in isolated temporary directories. The live preview is not automatically cleared. No payment, external CRM, email delivery, real client content, or public deployment is included. Cookie/hosting/content/operations review is required for any separately authorized external deployment.

The [license](licensing.md) permits running the example unchanged; adaptations need written permission. Use the skill with your own independent project for unrestricted independent outputs under the stated exception.

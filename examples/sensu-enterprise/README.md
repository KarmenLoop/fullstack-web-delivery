# SENSU Digital example

A complete English local demonstration of a fictional enterprise website, public inquiry form, staff sign-in, and role-based inquiry workspace. It uses React SSR, a same-origin Express API, and local SQLite. Copyright (c) 2026 KarmenLoop; see the repository LICENSE and NOTICE. You may run this example unchanged locally. Adapting its source requires written permission.

Use Node 22.13+ within Node 22. From this directory run:

```sh
npm ci
npm run setup
npm run build
npm start
```

Open http://127.0.0.1:4319/ or /login. Setup creates random credentials in .local/demo-access.json. Nothing in .local belongs in source control. Stop the owned process with Ctrl+C. For development use npm run dev; for a different free port set PORT before starting.

Run npm test for real HTTP and isolated maintenance checks. With production mode running, run npm run verify:http. For another port set SITE_ORIGIN accordingly. Tests create separate temporary data and do not clear the live preview.

The workflow is visitor submission -> saved reference -> staff lookup -> administrator New/In progress/Done transitions with transactional history. Read-only users cannot write, including through direct API requests. No email, payment, external CRM, or real customer contact is included.

The explicit command npm run data:clear -- --confirm-local removes this project's local inquiries, history, and sessions while preserving accounts. Use it only for disposable trial data. npm run accounts:reset rotates local passwords and invalidates sessions.

See [the complete example guide](../../docs/example-guide.md), [verification](../../docs/verification.md), and [license guide](../../docs/licensing.md). Source archives exclude .local, node_modules, and generated dist. Initialization after extraction creates fresh credentials and empty inquiry data.

# Engineering, authentication, data, and preview

Inspect the actual runtime, scripts, lockfile, source state, rules, and tools. Choose the simplest architecture that meets the task. Explicit frontend/backend responsibilities do not require separate repositories or services. Where multiple processes are necessary, document ports, order, proxy, CORS, cookies, health, and stopping.

Build a vertical flow: page -> input/action -> API boundary -> rules -> durable state -> feedback. Public rendering, anonymous writes, sign-in, and protected administration remain distinct paths. Mocks may support an identified design phase; final acceptance uses the selected real storage and backend.

Use maintained authentication primitives appropriate to the stack. Cover credential hashing, session rotation, CSRF/source checks, throttling, recovery where required, and OAuth state/PKCE where applicable. The server derives identity from trusted state and checks resources/organizations/roles. Hidden UI controls are not authorization. Test anonymous reads, direct forbidden writes, logout, expiration, and cross-resource boundaries appropriate to scope.

Validate inputs on the server; provide timely client feedback, required guidance, pending markers, and meaningful focus. A success receipt means the contract's save/acceptance state, not an invented notification. Preserve input on a network failure and express an uncertain result accurately. Inspect or reuse an idempotency key before retrying.

Apply legal state transitions server-side and commit audits with state. Document schema, migration, indexes, ownership, retention, backup, deletion, and applicable upload controls. External integrations need actual credentials, contracts, timeout/retry, verification, and sandbox/real evidence. Do not send real messages or payments without the user's relevant authorization.

# # Local preview

Use the repository's actual install, setup, migration, dev, build, production, and check commands. Isolate data and random test accounts. Verify a free port; do not terminate unknown services. Bind loopback unless broader exposure is authorized. Record process ownership and address, then operate the real pages. A ready log is startup evidence only.

Verify development and production separately. For persistent data/sessions, check actual restart behavior. A remote container's localhost is not the user's machine; use its supported preview/forwarding and disclose access. Without a browser, complete supported terminal checks and mark browser work NOT_RUN.

Retain the requested working preview and provide a scoped stop procedure. Exclude local credentials, tokens, cookies, secrets, runtime databases, process receipts, node_modules, and generated builds from source packages.

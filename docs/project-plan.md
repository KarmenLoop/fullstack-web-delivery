# Complete project and website planning template

The plan is delivered before implementation. Fill it with project decisions and evidence rather than leaving headings as completion claims. Its delivery is distinct from an approval gate.

# # 1. Project definition

Record the business, segment, audience, user tasks, market/language, desired outcome, measurable acceptance, present/later scope, existing source, authorized work, review gates, owner, deadline, constraints, supplied material, and unresolved dependencies.

Classify entries as user decision, verified fact, reversible assumption, or pending. Each pending item needs a blocked scope, responsible owner, and recovery condition. Technical facts should be inspected rather than asked back to the user.

# # 2. Architecture and responsibilities

| Area | Specify |
| --- | --- |
| Public frontend | Rendering strategy, routes, content sources, metadata, navigation, responsive behavior |
| UI and UX | Layout responsibility, hierarchy, primary paths, feedback, recovery, accessibility, motion |
| API boundary | Validation, authentication, authorization, limits, source/CSRF checks, errors |
| Business layer | Entities, legal states, idempotency, ownership, transactions, auditing |
| Accounts | Sign-in, roles, sessions, rotation, expiry, logout, required recovery |
| Administration | Search/filter/details, state actions, permitted roles, audit and appropriate export |
| Storage | Schema, indexes, constraints, relations, retention, migration, backups and deletion |
| Files/media | Types, limits, permission, storage, delivery and cleanup where relevant |
| Integrations | Official APIs, configuration, sandbox/real boundary, failure and reconciliation |
| Operations | Runtime/processes, ports, preview, deployment preparation, observation and rollback |

Explain actual process boundaries. Separate responsibilities do not force separate services. Give a recommended route, useful alternatives, tradeoffs, dependencies, and switch conditions.

# # 3. Sitemap, page counts, and menus

Count layout templates, actual business URLs, and state/language variants separately. Show the calculation. For example: one service-detail template may support three or thirty content URLs. Empty/loading/error/permission states need a count and route policy; they are not automatically separate indexable pages.

For every page: identifier, route/template, audience, purpose/task, entry path, sections, primary/secondary action, source of truth, role, SEO, API, content owner, and acceptance identifiers.

Show primary menus, secondary groupings, detail ownership, footer, signed-in differences, admin menu, and mobile equivalents. Define current state, expansion, Escape, keyboard/focus, touch, cross-level return, external links, and redesign redirects. Navigation labels should match their destination's task.

# # 4. Home, product, and service content

The homepage should explain who it serves, what problem it solves, the relevant offering, why it is credible, and how to act. Its composition follows the business rather than a universal section quota. Each section has one clear purpose.

A product template may contain identity/category, audience, value, specifications, comparison, pricing/inquiry, usage/delivery conditions, evidence, FAQ, and action. A service template may contain problem, audience, scope, exclusions, steps, outputs, timing basis, collaboration, pricing basis, evidence, FAQ, and consultation. Render the promised fields for every record; schema alone is not page acceptance.

Write titles, labels, descriptions, controls, validation, pending, empty, error, receipt, and recovery copy. Define the language and the specific qualities borrowed from a writing reference. Avoid invented results, copied testimonials, and unsupported time or performance promises.

# # 5. Company material and brand

Collect necessary public identity, operating entity/market, service/product facts, contacts, background, content owner, approved brand assets, evidence, policies, and maintenance responsibility. Avoid collecting identity documents without need.

Build a fact/source/permission table. Write the story from its audience, problem, real origin, approach, and evidence. If real case studies are absent, use truthful process demonstrations or a material collection plan. Portraits, recordings, video, quotations, and client marks need use/channel/term/region/editing/withdrawal permission.

# # 6. Form-to-admin contract

For each form document submitter, purpose, fields, required/length/type constraints, accessible labels and guidance, privacy, spam protection, endpoint, record/schema, administrator URL, reader/writer roles, processing owner, legal states, receipt, duplicates, failure/unknown result, retries, and retention.

The plan must say exactly where the business sees the submission. Saving, notifying, and completing follow-up are different states. A network interruption may occur after saving; define how to inspect or retry the same operation without duplicates.

For each API specify method/path, caller, identity/roles/resources, input/output, status/error codes, idempotency, pagination, rate/size limits, writes, audits, and test scenarios. Explain where credentials live without placing real secrets in the plan.

# # 7. Transactions and external wording

Where applicable, cover prices, currency, taxes, price basis, orders, payment, callbacks, fulfillment, renewal/cancellation, refunds, after-sales, support, privacy, content/media license, interpretation, and disputes. Verify the actual market and facts before legal claims. Use sandbox evidence separately from real transactions. A blanket unilateral interpretation-rights sentence is not a substitute for clear applicable rules.

Where no transaction exists, say why the branch is not applicable. Do not add fictional pricing or checkout to a consultation demonstration.

# # 8. Implementation and local preview

Break work into a runnable baseline and complete business increments. For each increment specify input, prerequisites, roles, state/data/API effects, output, responsible party, completion rule, evidence, and next dependency-ready task. Keep a usable preview throughout development.

Give exact working directory, runtime, install/setup/migration/dev/build/production/check commands, ports, account generation/retrieval, configuration, and stop procedure. Bind local previews appropriately. Identify mock versus real service and remote versus local access.

# # 9. Delivery, review, and acceptance

Map every requirement to an operated scenario and inspectable evidence. Cover normal/failure/permission/data, keyboard/mobile/motion, production build, and agreed persistence. Match the same business identifier across receipt, database, staff detail, state, and history.

Deliver source, directory index, plan, content/source/permission records, API/storage, preview/admin/login entry points, credential retrieval method, verification, defects, deployment conditions, and rollback. Use explicit PASS/FAIL/NOT_RUN/BLOCKED/NOT_APPLICABLE with the tested source/environment and executor. Author verification, independent review, and deployment are separate.

# Business-flow development decisions

| Situation | Next action |
| --- | --- |
| The user already supplied the decision or authorization | Reuse it; resolve only a material conflict |
| Startup, API existence, tool availability, or runtime is unknown | Inspect current source and actual tools |
| A business rule, fact, or material preference is missing | Ask a focused decision question |
| A low-impact choice is reversible and delegated | Record a reasoned default and continue |
| A necessary credential, fact, or permission is absent | Mark the affected branch and its recovery condition; continue independent work |
| New evidence invalidates the route | Revise affected plans/contracts; explain scope or commitment changes |

Deliver the complete plan before implementation. Establish a runnable baseline and representative page, then select the next complete business flow by satisfied dependencies, value, and uncertainty. Verify it immediately. Preserve failure evidence, repair affected scope, and continue after it passes.

For an inquiry site: representative page -> visitor submission and durable receipt -> employee sign-in and same-record reading -> administrator transition and audit -> page/interaction expansion -> production regression and restart. An account product or transaction sandbox may need a different dependency order.

For every increment retain the requirement/acceptance identifier, prerequisites, page states, API contract, data changes, roles, completion rule, actual evidence, and next step. Use the project's existing tracker rather than creating duplicate ledgers.

Public rendering, anonymous submission, sign-in, and protected administration have different boundaries. Authenticate and authorize protected requests before business operations. Server-side state transitions and their audit records commit in one transaction. External notification is a separate result after persistence.

See the maintained diagrams and a concrete example in [the repository workflow guide](https://github.com/KarmenLoop/fullstack-web-delivery/blob/main/docs/workflow.md). The portable rules in this reference remain usable without that optional guide.

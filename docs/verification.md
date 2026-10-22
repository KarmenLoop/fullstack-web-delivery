# Verification and evidence boundaries

## Specification and interaction extension 0.5.0

This extension reuses the owner's answered brief and local-development/publication authority. It adds project-specific specifications and a separate interaction workbench; the existing business APIs remain the same. The generated pack is an implementation contract, not an acceptance result.

| Check | Actual scope and result | Evidence |
| --- | --- | --- |
| Specification renderer | Six meaningful tests, exit 0: populated contracts, conditional static scope, invalid references, missing task, existing-output protection, deterministic integrity | [Raw tests](../evidence/v0.5-specification-tests.log) |
| Application suite | 13 tests, exit 0, including existing HTTP/auth/data/maintenance coverage and two bounded-geometry cases | [Raw tests](../evidence/v0.5-example-tests.log) |
| Production build | Client and SSR build, exit 0; final bundle is about 530 kB / 168 kB gzip and produces a chunk-size advisory | [Command record](../evidence/v0.5-command-checks.json) |
| Production routes | 13 routes including 404; landmarks, metadata, status codes and CSP | [Readback](../evidence/v0.5-production-routes.json) |
| Existing local record | Fresh isolated login reads the same completed reference/version/audit after new production startup; anonymous and logged-out access denied | [Readback](../evidence/v0.5-production-readback.json) |
| Author browser operation | Completion pending/error/retry, linked reversal, stack keys, wheel pointer/keyboard/select, live reduced preference, true radial origin/history and production snap navigation | [Observed checks, retained failures and limits](../evidence/v0.5-browser.json) |
| Corrected visual evidence | 13 unique full-page JPEGs, actual CSS widths 1440/390/1280 and matching file dimensions; 15 reviewer inputs include two duplicate entry copies | [Capture integrity](../evidence/v0.5-captures.json) |
| Independent finish review | Initial fix disposition; five listed source/screenshot corrections then resolved, scoped ship verdict | [Initial report](../evidence/interaction-finish-review.md), [verdict](../evidence/interaction-finish-verdict.md) |
| Design documentation | Incumbent-system comparison; does not impose SENSU's brand on the reusable skill | [Documentation report](../evidence/interaction-design-documentation.md) |

Observed repairs include mixed scroll coordinates, a completed reveal retaining a zero or stale pixel clip, inherited checkbox sizing, and a reduced-motion hook that did not update its mounted state. Changing hook structure during development required a full reload after hot-refresh reported an order mismatch. The historical failed checks remain in the browser record. Independent review added precise origin, snap-rest, in-flight cancellation and icon/heading corrections; its verdict scores those five fixes only.

Raw CDP and a pointer action became temporarily unavailable during browser document processing. The supported full-page screenshot API recovered after the browser was presented, with JPEG dimensions verified against the DOM. A navigation timeout and click timeout were inspected before continuation; keyboard operation supplied some phone captures. No hidden recovery tab was left behind. The manual Impeccable detector ran once on the changed UI targets, exit 0 with no findings; that is a mechanical result, not a design certificate.

Physical touch devices, paused native touch gestures and held-pointer instrumentation remain NOT_RUN. The browser did not support Input.dispatchTouchEvent; the later raw-input branch was unavailable. Source guards were reviewed, but those constraints are not runtime touch proof. The initial pointer wheel operation and the in-flight reduced-motion check are author observations. Neither the reviewer nor these stills establish frame rate, independent temporal quality, a full accessibility/security audit, other agent-host behavior or production readiness. Hosted CI supplies separate automated evidence for the final commit.

## English publication 0.4.1

The example was localized and checked in its own directory with fresh local accounts and SQLite data. The old preview and earlier release archives remained separate. Current checks ran on macOS with Node 22.23.2 / npm 10.9.8. See [the command record](../evidence/publication-checks.json) and [relative source fingerprints](../evidence/source-fingerprint.json).

| Check | Actual result | Evidence |
| --- | --- | --- |
| Skill structure | PASS | [Validator output](../evidence/skill-validation.log) |
| Formal HTTP/maintenance suite |11/11, exit 0 | [Raw output](../evidence/example-tests.log) |
| Client and SSR build | Exit0 | [Build output](../evidence/example-build.log) |
| Production HTTP |12 routes including 404, metadata/landmarks/CSP | [Route data](../evidence/publication-routes.json) |
| Live API boundaries |8/8, including anonymous401, missing-CSRF403, direct read-only write403, logout401 | [API record](../evidence/publication-api.json) |
| Public browser views |9 routes at actual 1440/390 CSS pixels;18 checks | [Browser record](../evidence/publication-browser.json) |
| Real same-record flow | Receipt -> viewer -> admin -> Done/version3/two audit events | [Browser](../evidence/publication-browser.json) and [API](../evidence/publication-api.json) |
| Form/sign-in focus | Success heading, reset first field, wrong-password alert | [Browser record](../evidence/publication-browser.json) |
| Phone workspace | Visible written state/action;44px detail button; settled Escape return to its stable row | [Browser record](../evidence/publication-browser.json) |
| Production restart | Original valid session and completed record retained; browser reloaded | [Readback](../evidence/publication-restart.json) |
| Repository links, English text, legal-copy parity, question pool and media | Checkable with python scripts/check_repository.py | CI and [repository output](../evidence/repository-check.json) |

The first post-restart read was sent before the listener became ready and received ECONNREFUSED. Owned-process/listener readiness was checked before the successful readback. A browser alert wait also reported a timeout despite a visible match; a fresh DOM read confirmed the active error before continuation. The consent collector was retargeted from Privacy to Contact. These were preserved as probe/startup distinctions, not recast as product persistence failures.

Localization repairs included a Chinese-specific heading split, phone header wrapping, consent punctuation, singular record wording, and moving generated HTTP evidence into ignored local state. The final English captures show the actual application, not a proposed mockup.

## Historical trial evidence

The earlier 0.3.0 local rerun used ten existing answers, zero repeated questions, and the existing backend in a redesign. It recorded 11 formal tests,8 live API checks,18 public views,12 production routes, and persistence across two restart modes. Its independent screenshot/source reviewer resolved five requested design corrections. That scope is not independent complete runtime QA or human design approval.

The first 0.2.0 trial and 0.3.0 rerun informed 0.4.0 rules. Those historical claims are summarized in the portable [field-trial reference](../skills/fullstack-web-delivery/references/field-trial.md); private local logs and machine paths are not public release data. Fresh 0.4.1 results above are not inferred from that history.

## Hosted CI and limits

The [Verify workflow](https://github.com/KarmenLoop/fullstack-web-delivery/actions/workflows/verify.yml) independently runs repository structure checks and the formal example tests/build/production routes on a GitHub-hosted Linux runner. Its current run status is authoritative for that automated scope. It is not a second agent's browser evaluation, physical-device test, complete security/accessibility audit, or production deployment.

Other hosts, real phones, independent complete runtime QA, full accessibility/performance audits, transaction sandboxes, external delivery, and the website's public deployment remain NOT_RUN. Source archives exclude credentials, cookies/CSRF, secrets, databases, process state, node_modules, and dist. Distribution manifests and checksums establish file integrity, not product certification.

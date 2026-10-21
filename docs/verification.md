# Verification and evidence boundaries

## English publication 0.4.1

The example was localized and checked in its own directory with fresh local accounts and SQLite data. The old preview and earlier release archives remained separate. Current checks ran on macOS with Node22.23.2/npm10.9.8. See [the command record](../evidence/publication-checks.json) and [relative source fingerprints](../evidence/source-fingerprint.json).

| Check | Actual result | Evidence |
| --- | --- | --- |
| Skill structure | PASS | [Validator output](../evidence/skill-validation.log) |
| Formal HTTP/maintenance suite |11/11, exit0 | [Raw output](../evidence/example-tests.log) |
| Client and SSR build | Exit0 | [Build output](../evidence/example-build.log) |
| Production HTTP |12 routes including404, metadata/landmarks/CSP | [Route data](../evidence/publication-routes.json) |
| Live API boundaries |8/8, including anonymous401, missing-CSRF403, direct read-only write403, logout401 | [API record](../evidence/publication-api.json) |
| Public browser views |9 routes at actual1440/390 CSS pixels;18 checks | [Browser record](../evidence/publication-browser.json) |
| Real same-record flow | Receipt -> viewer -> admin -> Done/version3/two audit events | [Browser](../evidence/publication-browser.json) and [API](../evidence/publication-api.json) |
| Form/sign-in focus | Success heading, reset first field, wrong-password alert | [Browser record](../evidence/publication-browser.json) |
| Phone workspace | Visible written state/action;44px detail button; settled Escape return to its stable row | [Browser record](../evidence/publication-browser.json) |
| Production restart | Original valid session and completed record retained; browser reloaded | [Readback](../evidence/publication-restart.json) |
| Repository links, English text, legal-copy parity, question pool and media | Checkable with python scripts/check_repository.py | CI and [repository output](../evidence/repository-check.json) |

The first post-restart read was sent before the listener became ready and received ECONNREFUSED. Owned-process/listener readiness was checked before the successful readback. A browser alert wait also reported a timeout despite a visible match; a fresh DOM read confirmed the active error before continuation. The consent collector was retargeted from Privacy to Contact. These were preserved as probe/startup distinctions, not recast as product persistence failures.

Localization repairs included a Chinese-specific heading split, phone header wrapping, consent punctuation, singular record wording, and moving generated HTTP evidence into ignored local state. The final English captures show the actual application, not a proposed mockup.

## Historical trial evidence

The earlier 0.3.0 local rerun used ten existing answers, zero repeated questions, and the existing backend in a redesign. It recorded11 formal tests,8 live API checks,18 public views,12 production routes, and persistence across two restart modes. Its independent screenshot/source reviewer resolved five requested design corrections. That scope is not independent complete runtime QA or human design approval.

The first 0.2.0 trial and 0.3.0 rerun informed 0.4.0 rules. Those historical claims are summarized in the portable [field-trial reference](../skills/fullstack-web-delivery/references/field-trial.md); private local logs and machine paths are not public release data. Fresh 0.4.1 results above are not inferred from that history.

## Hosted CI and limits

The [Verify workflow](https://github.com/KarmenLoop/fullstack-web-delivery/actions/workflows/verify.yml) independently runs repository structure checks and the formal example tests/build/production routes on a GitHub-hosted Linux runner. Its current run status is authoritative for that automated scope. It is not a second agent's browser evaluation, physical-device test, complete security/accessibility audit, or production deployment.

Other hosts, real phones, independent complete runtime QA, full accessibility/performance audits, transaction sandboxes, external delivery, and the website's public deployment remain NOT_RUN. Source archives exclude credentials, cookies/CSRF, secrets, databases, process state, node_modules, and dist. Distribution manifests and checksums establish file integrity, not product certification.

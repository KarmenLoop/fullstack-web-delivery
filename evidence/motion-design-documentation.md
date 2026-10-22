<!-- Copyright (c) 2026 KarmenLoop. All rights reserved. -->
<!-- SPDX-License-Identifier: LicenseRef-KarmenLoop-Source-Available-No-Modification-1.0 -->

# Motion atlas design documentation

Recorded on 2026-10-22 from the implemented SENSU example. This is a scoped record of an ordinary extension to its confirmed cream/forest identity, including the requested dark appearance. Values below describe source; they do not establish computed-style, runtime, physical-device, performance or comprehensive accessibility acceptance.

## Overview

The atlas is a code-led motion workbench. One department selection connects the relationship path, illustrative activity, permission count and inline detail. A separate lesson explains scroll mechanisms, and a reversible card study explains continuity. Real staff sign-in retains its actual API/session boundary.

The [product](../PRODUCT.md), [surface brief](../docs/motion-atlas-brief.md) and [upgrade plan](../docs/upgrade-v0.7-plan.md) preserve the existing identity and authorize this precise extension. The reusable delivery skill must still choose expression for each client's field, audience and task. SENSU's colors, composition and specimen effects are example-specific.

No root `DESIGN.md` or `.impeccable/design.json` is created or replaced. The documenter's canonical section order is used here, within the assigned evidence boundary; source remains the token authority. This extends the [incumbent documentation](interaction-design-documentation.md), rather than inventing a new visual world, metaphor, tonal ramp or global brand mandate.

Source examined: [MotionAtlas.jsx](../examples/sensu-enterprise/src/MotionAtlas.jsx), [atlas CSS](../examples/sensu-enterprise/src/motion-atlas.css), [MotionPrimitives.jsx](../examples/sensu-enterprise/src/MotionPrimitives.jsx), [primitive CSS](../examples/sensu-enterprise/src/motion-primitives.css), [App.jsx](../examples/sensu-enterprise/src/App.jsx), [shared tokens](../examples/sensu-enterprise/src/tokens.css), [global CSS](../examples/sensu-enterprise/src/styles.css), [live motion preference](../examples/sensu-enterprise/src/useMotionPreference.js), and the [fictional server policy](../examples/sensu-enterprise/server/access-demo.mjs).

The [finish review](motion-finish-review.md) ends with `disposition: ship` for its two scored fixes: bounded permission-query interpretation and a valid workspace destination after initial loading failure. That disposition covers its stated source/capture scope. The four accepted publication captures are [desktop](../docs/images/motion-atlas-desktop.jpg), [dark](../docs/images/motion-atlas-dark.jpg), [phone viewport](../docs/images/motion-atlas-mobile.jpg) and [dark command dialog](../docs/images/motion-command-dark.jpg). Their inspection/provenance is recorded by the reviewer; this pass did not operate a browser or rerun a detector. The private reference video and extracted frames are not publication assets.

## Colors

The atlas maps the incumbent cream/forest relationship into local semantic tokens. The theme class is applied both to the page and to the portaled command dialog so the same roles survive the portal boundary.

| Atlas token | Light | Dark | Responsibility |
| --- | --- | --- | --- |
| `--ma-bg` | `#f5f4ed` | `#121e19` | Page ground and command input ground. |
| `--ma-panel` | `#fffef9` | `#1a2b22` | Workspace, map buttons, mechanism cards and command panel. |
| `--ma-ink` | `#193e32` | `#e3ebdc` | Main text, headings and control labels. |
| `--ma-muted` | `#496256` | `#adc0b2` | Supporting text and static map leaves. |
| `--ma-line` | `#cbd4c8` | `#41554a` | Dividers, control borders and unselected relationships. |
| `--ma-soft` | `#e7ecdf` | `#253a2e` | Secondary surfaces, role cards and quiet activity cells. |
| `--ma-accent` | `#28664c` | `#b8d98f` | Active path, focus outline, progress and selected borders. |
| `--ma-active` | `#d9ecc3` | `#354d32` | Selected controls, hover and continuity card. |
| `--ma-dot` | `#3a8059` | `#c7e8a4` | Moving trace and its settled reduced-motion marker. |

These are scoped additions, not replacements for shared `--paper` (`#f6f5ef`), `--pale` (`#edf0e6`), `--ink` (`#173d30`), `--green` (`#245b46`), `--muted` (`#58685f`) or `--line` (`#dce2d5`). The theme sets its corresponding CSS `color-scheme`; it does not recolor the public site, login or administrator pages.

The four nonzero heatmap levels are local data encodings: light `#a9c894`, `#7faa6c`, `#538443`, `#326332`; dark `#405e37`, `#63864a`, `#8eb365`, `#bedb91`. Zero uses the soft surface. Values remain available in a text table with a 0–12 legend; color is not the only carrier of the sample data.

The login primitive retains separate incumbent-compatible literals: surface `#184b3b`, white text, node/check `#e4f5c4`, and status/focus `#245b46`. These do not become atlas theme tokens.

**The Shared Selection Rule.** A single department ID determines the map, activity, role and detail; a color transition never establishes a different data state.

## Typography

The page inherits the installed/platform stack: `"PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`. No new font asset or display identity is introduced. The winning later global body rule is 16px/1.7; the earlier 15px declaration is overridden.

| Atlas role | Implemented treatment |
| --- | --- |
| Main title | `clamp(34px, 4vw, 52px)` / 1.1; maximum 26ch. |
| Section heading | 28px / 1.2; 25px at 600px and below. Workspace heading is 24px, then 23px on phones. |
| Component heading | 18px / 1.35, with local 15–17px variants. |
| Heading character | Weight 550, tracking −0.025em, balanced wrapping. |
| Intro | 17px; 15px at 600px and below; maximum 66ch. |
| Body and explanation | Paragraph line height 1.65, maximum 70ch; scoped component copy commonly 12–15px. |
| Controls and metadata | Ordinary buttons 14px/1.4; small copy 12px/1.6; map buttons 12px, then 11px on phones. Query input remains 16px. |
| Count | 32px/1.15, weight 600, tabular numerals; two-digit visual minimum, one stable accessible value. |

Small diagram/table labels are specimen-local information density, not a new minimum body-text standard for client sites. The inherited system font stack is recorded as the incumbent fallback, not canonized as a newly selected display face.

## Layout

The header has a 1280px maximum width, 48px side padding and 84px minimum height. Main content has a 1184px maximum width and `48px 40px 0` padding. The workspace uses 24px padding and a map/activity grid of `minmax(0, 1.6fr) minmax(245px, 1fr)` with a 28px gap. Activity is separated by a line rather than another floating panel. The role grid has three columns; an expanded card spans two while remaining in document flow.

The scroll story has two equal columns with a 72px gap. Its context uses native sticky positioning at 28px; the section, rather than a page-wide scroll trap, bounds it. Major sections after the workspace use 88px top separation. Mechanism cards form a native horizontal overflow rail: three visible cards at desktop, 16px gaps, 230px minimum card width and proximity snapping. A measured trailing spacer permits alignment of the final card.

At 850px and below, header/main gutters become 24px, map/activity stack, the role grid becomes two columns and the story gap becomes 36px. At 600px and below, header/main gutters become 18px, navigation moves to its own row, the toolbar stacks, roles and transfer slots become one column, expanded roles span one column, sticky context returns to normal flow, and rail cards use an 86% basis. Major section separation becomes 56px. The map stays 255px tall with visible 83px-wide department controls; the desktop map is 280px tall.

The command panel is viewport-bound: `min(620px, calc(100vw - 32px))`, top 14vh, maximum height 72vh and internal overflow. On phones it moves to 5vh with an 88vh maximum height. This preserves a local scrolling region rather than requiring the dialog to fit at one captured height.

## Elevation & Depth

Most depth comes from quiet surface changes, borders and geometry. The command overlay uses `#10241c80`; its panel alone has the atlas shadow `0 24px 70px #07170f40`. The login orb uses `0 8px 24px #1c594230` plus `inset 0 0 13px #d9f4ae20`. These scoped shadows do not impose a global shadow rule.

The scroll lesson's offset plane is a bounded decorative layer. Labels and controls remain still; parallax ranges from +16px to −16px with actual section scroll progress. The layer is hidden from accessibility APIs and loses its offset under reduced motion.

## Shapes

Atlas controls, map nodes, root label and query field use 8px corners. Workspace and command panel use 16px corners. Role, mechanism and transfer surfaces use 12px corners; activity cells use 3px corners. Controls normally reserve at least 44px height. The login surface is 56px tall and changes from a full-width 8px-corner button surface to a 56px circle with 28px radius while retaining the same submit button. Shared 14px/8px radius tokens remain unchanged.

SVG relationships and data cells are functional geometry. They are not an illustration style that future client sites must reproduce.

## Components

All atlas focus targets use a 2px accent outline with a 4px offset. Buttons expose native disabled state; selected nodes expose `aria-pressed`; disclosure buttons expose `aria-expanded`/`aria-controls`. Hover backgrounds are limited to fine pointers that support hover. The command field has a visible label, and its result/source text remains readable independently of motion.

| Component and responsibility | State and motion contract | Reduced motion, interruption and recovery |
| --- | --- | --- |
| `MotionAtlas`: model and appearance owner | Initial model loading → model or alert/retry. Theme changes immediately and persists only `light`/`dark` in local storage key `sensu-motion-appearance`. | Storage failure is tolerated. Initial request is aborted on cleanup; an epoch prevents an older model load from replacing a later successful command result. Appearance requires no animation. |
| `Constellation`: selected relationship | Department selection immediately updates state. Base paths grow over 0.5s with 0.05s per-department delay; active path uses 0.5s easing `[0.23,1,0.32,1]`; trace follows a 0.65s linear route. Selection status names the department. | A new revision replaces the previous selected trace. Reduced motion shows full paths and a static endpoint. Department buttons remain the operating interface. |
| `Heatmap` and `Odometer`: related data feedback | Loaded role permissions drive the count; null renders an em dash rather than a false zero. Digits roll for 0.25s with the atlas ease. Activity cells scale 0.94→1 and fade 0.4→1 over 0.2s, staggered by column/row. | Durations and stagger become zero. The count has one accessible label; the decorative digits/cells are hidden. Native details exposes all 28 illustrative values. No live-analytics claim is added. |
| Role disclosure: details with yielding neighbors | Stable department keys, native hidden detail, normal-flow grid expansion and layout transforms. Spring is `type: spring`, duration 0.5s, bounce 0.2. One role can expand; collapsing can leave its department selected. | Reduced motion disables layout interpolation. Content uses the same role IDs and shows fictional assignment, permissions and no-write status. Expansion does not cover adjacent content. |
| Command dialog: question → source → department | Button or Meta/Ctrl+K opens immediately. Radix manages modal focus; input receives focus. Query states are idle/pending/ready/error; request length is capped at 160 characters. Results include policy version and source rule. | Editing, resubmitting, closing and unmounting abort the relevant request. Errors offer resubmission; unsupported subjects and no matches have explicit summaries without role buttons. Successful queries publish the workspace model and clear load errors before results become selectable. Selection closes the dialog, scrolls instantly to the workspace and focuses its matching node; ordinary dismissal restores the previous connected focus target or command trigger. |
| `Reveal` and `ScrollStudy`: explain distinct drivers | Reveal uses IntersectionObserver threshold 0.12 and one 300ms opacity/12px entrance; rail delays cap at 160ms. Progress uses actual section scroll position and reverses with it. Native overflow/snap keeps vertical scrolling intact. | Content is visible before enhancement and when IntersectionObserver is absent. Reduced motion skips reveal and parallax, uses instant rail buttons, and retains real scroll progress. Observer/animation/listener cleanup is explicit. Previous/Next, a focusable rail and native scrollbar offer alternatives; edge buttons disable. |
| `CardTransfer`: continuity study | One stable `layoutId` moves DEMO-01 between available/assigned slots using the 0.5s spring. The same toggle reverses it; written status names its state. | Reduced motion sets duration zero. The study explicitly does not change an inquiry. It is a local specimen, without persistence or a server-success claim. |
| `AuthSubmit` and `Login`: real authentication feedback | Idle → pending orbit → check only after `/api/login` confirms the user. Pending disables the form fieldset and duplicate submission is guarded. The surface spring is 0.5s/bounce 0.2; nodes/check use 0.25s; pending CSS orbit is 1.8s linear. Navigation follows confirmed success after 420ms. | API failure clears busy, preserves input and focuses the written alert. Unmount guards state writes and clears navigation timer. Reduced motion disables layout/orbit and node/check timing, and navigates without the 420ms delay. The check expresses an actual session response, not elapsed animation time. |

The app applies `MotionConfig reducedMotion="user"`; the shared hook subscribes to live `matchMedia` changes through `useSyncExternalStore`. Global CSS removes smooth scrolling and greatly shortens CSS animation/transition duration for reduced motion; atlas CSS also resets descendant scroll behavior. Source contracts and stills do not prove temporal smoothness or assistive-technology behavior.

## Do's and Don'ts

- **Do** start each client task with audience, operation, content, states and actual success authority. Reuse the mechanism only when it clarifies that task.
- **Do** adapt semantic color roles, typography, spacing and component density to the client's confirmed identity. The scoped dark palette is an implementation example, not a universal theme preset.
- **Do** specify driver, timing, interruption, reduced-motion outcome, keyboard/touch alternative and error/retry for each chosen effect. Preserve an understandable static state before adding movement.
- **Do** keep data and animation coupled by stable IDs. Preserve the atlas's explicit fictional/read-only boundary if reusing its sample policy; connect real permission changes only through separately authorized server behavior.
- **Do** separate local state feedback from real persistence. Login success follows its API; transfer remains a labeled local study.
- **Don't** apply the map, heatmap, scroll rail or every demonstrated entrance to unrelated customer pages merely because this workbench contains them.
- **Don't** present a viewport capture as device acceptance, a still as frame-rate evidence, or the two-fix ship verdict as a comprehensive product/a11y audit.
- **Don't** distribute the private reference clip or extracted frames as site, documentation or release assets. Use only the accepted actual captures with their provenance.

Not canonized or repaired: incumbent CSS accumulation, the inherited platform display fallback, and specimen-local small labels/corners remain scoped observations. No new prohibition, decorative identity, synthesized token scale or unrun acceptance result is introduced. This pass changed only this evidence file and invoked no browser, detector, test suite or build.

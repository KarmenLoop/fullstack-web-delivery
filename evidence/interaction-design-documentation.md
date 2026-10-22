<!-- Copyright (c) 2026 KarmenLoop. All rights reserved. -->
<!-- SPDX-License-Identifier: LicenseRef-KarmenLoop-Source-Available-No-Modification-1.0 -->

# Interaction lab design documentation

Recorded on 2026-10-22. Scope: the current SENSU example source and the existing finish-review record. This pass documents an ordinary extension of the incumbent cream/forest system. It does not establish a replacement identity, an approved visual composition, independent runtime acceptance, or physical-device acceptance.

## Documentation boundary

The repository distributes a reusable website-delivery skill. SENSU is its fictional example, so SENSU's visual rules do not belong in a repository-wide `DESIGN.md` or `.impeccable/design.json`. Neither file was created. The example-specific [design specification](../docs/generated/sensu/DESIGN-SPEC.md) remains part of the [16-file generated specification pack](../docs/generated/sensu/README.md); generated prose is a handoff aid, while implemented source determines current values.

The [product context](../PRODUCT.md), [surface brief](../docs/interaction-lab-brief.md), and [version 0.5 plan](../docs/upgrade-v0.5-plan.md) identify this as an Operate/Experience workbench with six specified mechanisms. They supply no new approved visual world. The current lab is an index, one active specimen, its written state and its explanation. Public service pages and the inquiry workspace retain their separate tasks and compositions.

## Source examined

- [Shared tokens](../examples/sensu-enterprise/src/tokens.css): six colors, two radii and the installed/platform font stack.
- [Incumbent styles](../examples/sensu-enterprise/src/styles.css): global typography, controls, layout, responsive overrides, focus and reduced-motion rules. Later declarations were checked instead of treating the first occurrence as the final value.
- [Incumbent application](../examples/sensu-enterprise/src/App.jsx): representative action, navigation and dialog components, the shared spring, the lab route, and the separate inquiry API calls.
- [Lab source](../examples/sensu-enterprise/src/InteractionLab.jsx) and [lab styles](../examples/sensu-enterprise/src/interaction-lab.css): all six state contracts, local geometry, navigation, responsive composition and current trailing overrides.
- [Motion preference subscription](../examples/sensu-enterprise/src/useMotionPreference.js) and [interaction math](../examples/sensu-enterprise/src/interaction-math.mjs): live preference updates, bounded wheel projection and the radial coverage calculation.
- [Finish verdict](interaction-finish-verdict.md): the independent review's source-and-screenshot disposition for five material corrections.

No UI, application source, runtime configuration, generated specification or license was changed in this pass.

## Incumbent system and the lab extension

These are observed source facts, not newly approved design tokens.

| Role | Shared source value | Lab use |
| --- | --- | --- |
| Paper | `--paper: #f6f5ef` | Page background; text on the selected index item and completion control. |
| Pale | `--pale: #edf0e6` | The first tone in linked progress; the existing site also uses this for secondary surfaces and hover. |
| Ink | `--ink: #173d30` | Primary text, selected navigation, completion, progress ring and timeline. |
| Green | `--green: #245b46` | The shared focus color; the existing site's primary action color. |
| Muted | `--muted: #58685f` | Supporting copy and written status. |
| Line | `--line: #dce2d5` | Incumbent form and surface border. The lab has a scoped border exception below. |
| Rounded surfaces | `--radius: 14px`; `--radius-small: 8px` | Retained unchanged. The lab's smaller specimen geometry is local. |
| Font | `"PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` | Inherited by the lab and its controls. These are installed/platform fallbacks; no custom font file, custom display face or font-license claim is introduced. |

The current incumbent body resolves in source to `16px` with line height `1.7`: a later body rule overrides the earlier `15px`. Its public page container is later set to `min(1280px, calc(100% - 112px))`, then to 64px total gutters at 1100px and 40px total gutters at 760px. These public-page values do not replace the lab's own shell.

The incumbent primary button's later rules set a 50px minimum height, 9px radius and `14px 22px` padding; form controls retain an 8px radius and 48px minimum height. The shared action and lab use the same spring definition (`stiffness: 360`, `damping: 30`). The lab reuses Radix's drawn SVG icon vocabulary and native controls rather than introducing an icon font or a new control library.

### Local specimen exceptions

| Scope | Current source values | Meaning and boundary |
| --- | --- | --- |
| Lab surfaces | Border `#d2d9cb`; canvas `#eeefe7` with border `#dfe3d7`; document/stack paper `#fcfcf6`; snap/wheel/radial base `#fafbf3` | Closely related tones group the specimen. They are not additions to the six shared root colors. |
| State tones | Completion error `#754332`; particles `#537644`; linked progress `#edf0e6`, `#e7eedf`, `#dce9d4`, `#cfe2c7`, `#c0d9b8` | Error has written recovery; the linked ramp is selected by the completed count. These are local state treatments, not a universal semantic scale. |
| Radial destinations | Activity `#dce7d1`; preferences `#e7e1d4` | Differentiate the three specimen views without becoming new site sections or brand accents. |
| Corners | Index/select 5px; small controls/document/snap cards 6px; stack/radial 7px; canvas/wheel 8px | Compact workbench shapes; preserve the shared radius tokens rather than rewriting them to match local geometry. |
| Completion control | 56px high; 208px wide before success and 56px after success; radius 28px | The pill becomes a circle while keeping the same button element. This geometry belongs to the completion study. |
| Depth | Thin borders, tonal surfaces, overlap and transforms; no lab `box-shadow` declaration | Stacked cards and the radial layer express depth through position and occlusion. The incumbent detail drawer has its own shadow; the lab's flat surfaces do not establish a site-wide ban on shadows. |

### Type and hierarchy

| Lab role | Current source treatment |
| --- | --- |
| Intro display | `clamp(30px, 3.5vw, 54px)`, weight 520, line height 1.05, tracking -0.04em; 35px at 700px and below. |
| Study heading | `clamp(17px, 1.8vw, 25px)`, weight 500, line height 1.35; 20px at 700px and below. |
| Specimen heading | Base 24px, weight 500, line height 1.15; study-specific rules use 16–32px depending on the scene and viewport. |
| Scene body | Base 13px/1.65; individual study and phone rules use 11–13px. |
| Written status | 11px/1.65, muted, with a reserved 36px minimum height. |
| Explanation | State-flow heading 13px/1.5; paragraph 12px/1.75 with a 620px maximum width. |
| Index | 12px labels at desktop, 11px on phones; selected item reverses to paper on ink and exposes `aria-current`. |

The current JSX starts directly with content headings and the written state-flow explanation. Existing `.lab-eyebrow` declarations have no matching lab JSX use; they are residual CSS, not an approved label pattern to reproduce.

## Layout and state presentation

The lab header and main have a 1440px maximum width and 52px horizontal padding. Its workbench uses a 248px index plus `minmax(0, 1fr)` content column. At 1000px, side padding becomes 28px and the index becomes 210px. At 700px, side padding becomes 20px, the index becomes a two-column grid above the canvas, and its supporting action SVG is hidden. The active study remains discoverable by text and selected state.

The canvas has an 8px border radius, a 420px minimum height and `28px 36px` padding at desktop; phone rules use a 440px minimum height and `22px 16px` padding. The final CSS rule makes the contract explanation a block, overriding its earlier grid declaration. Each pattern mounts a single study keyed by the selected query parameter; selecting a different pattern starts that study's local state again.

Ordinary lab buttons have a 44px minimum height. The native wheel select uses 16px text. The lab confines checkbox overrides to 18px controls with label hit areas; it does not change the incumbent contact form. `:focus-visible` uses a 2px green outline with a 5px offset. Written statuses use `role="status"` and `aria-live="polite"`. Hover changes are contained by `(hover: hover)`, while active states and keyboard controls remain available independently.

## Six implemented feedback contracts

This table describes source behavior. It is not a record that this documentation pass operated the controls.

| Study and route value | State and visible result | Recovery, alternatives and reduced motion |
| --- | --- | --- |
| Completion, `pattern=completion` | Idle → pending → success/error after a labeled 650ms local simulation. Success changes the stable button to a check circle; 10 particles appear only on successful completion. Pending cannot submit twice. | A failure checkbox selects the simulated error; error exposes retry and written recovery. Reset returns to idle outside pending. Reduced motion sets layout/check duration to zero and removes particles. This never saves business data. |
| Linked, `pattern=linked` | Four native checkboxes produce one count. The percent, ring, numeric label, background and final copy all derive from it. The ring animates for 0.28s; percent/background use 0.24s. | Unchecking reverses the same state. Native checkbox operation remains available. Reduced motion keeps all results and sets the animation durations to zero. |
| Stack, `pattern=stack` | One button toggles `aria-expanded`; stable card keys retain identity. Three cards move between a slightly rotated stack and 111px-spaced expansion with the shared spring and 0.035s stagger. | Repeated input changes the existing animation target. Collapsed secondary cards are `aria-hidden`; cards contain no interactive controls. Reduced motion changes directly to the requested layout. |
| Snap, `pattern=snap` | A native contained scroll area has mandatory vertical center snapping. Selection and timeline commit only when no pointer/touch is held and the nearest card center is within 2px. Native `scrollend` is preferred; the 160ms fallback is enabled only without it. | Previous/Next and Arrow Up/Down, Home and End choose bounded cards. Written status distinguishes scrolling from settled selection. Reduced motion uses instant programmatic scrolling and zero-duration timeline updates. |
| Wheel, `pattern=wheel` | Seven half-hour ticks from 09:00 to 12:00 use a 44px step. Projection includes velocity × 0.18, rounds to a tick and clamps to the valid range. A spring (`stiffness: 240`, `damping: 29`) settles before committing the selected value. | A new drag invalidates/stops prior animation. Arrow keys, Home/End and a labeled native select provide the same choices. A live reduced-motion change invalidates the old completion, stops motion, sets a bounded tick and synchronizes value/status. |
| Radial, `pattern=radial&view=…` | Overview, activity and preferences are URL-backed views. Pointer activation uses the actual panel-relative point; keyboard activation uses the trigger center. Coverage uses the farthest-corner radius, including origins outside the panel. Reveal duration is 0.38s with easing `[0.22, 1, 0.36, 1]`. | Modified link activation retains native behavior. Back/Forward follows the URL without a fabricated click origin. The old layer is inert and hidden from accessibility APIs. Settled content removes the pixel circle clip for resizing. Reduced motion renders the destination directly. Reminder changes are local to the mounted study view. |

The live preference hook subscribes to `matchMedia` changes through `useSyncExternalStore`; its server snapshot is `false`. CSS also removes lab transitions, smooth scrolling and active transforms under reduced motion. These are implementation facts; they do not substitute for assistive-technology or temporal browser verification.

The lab route is registered in the existing app. Its source imports no inquiry API helper and performs no business save. The app shell still checks session state separately. The footer offers an explicit link to the actual contact flow, which remains implemented in the incumbent application.

## Drift and decisions not canonized

- The generated design specification says the existing body is 15px. The later incumbent stylesheet makes it 16px. This report records the current source value; it does not repair the generated pack or change runtime styling.
- The public site has accumulated later CSS overrides, while the lab has its own scoped tones, corners and smaller informational type. Neither the initial CSS declarations nor the local specimen exceptions are promoted into a new global token scale.
- Residual eyebrow selectors are not a reusable component rule. The existing platform font stack is recorded as a fallback stack, without presenting it as a newly approved display-type identity.
- No metaphor, tonal ramp, new shadow vocabulary, invented component, human design approval or replacement visual world is added to make this pass appear more complete.

## Evidence and checks

| Check actually performed | Result |
| --- | --- |
| Read the source/context paths above using bounded `cat`, `sed` and `rg` reads; inspect later rules and all six lab implementations. | Completed; inspected files are listed above. This was a source review, not computed-style or runtime execution. |
| `rg --files` for root design records, lab assets and the generated pack. | Root `DESIGN.md` and `.impeccable/design.json` were absent; the generated SENSU pack contains 16 files. No global system file was added. |
| `sips -g pixelWidth -g pixelHeight docs/images/interaction-*.jpg` | Exit 0; 13 documentation JPEGs returned dimensions. Six desktop captures are 1440px wide, six phone captures are 390px wide, and the additional capture is 1280px wide. This is image metadata evidence only. |
| Relative-link, six-study, generated-file-count and required-capture-width checks against this report and the named local files. | Completed with exit 0 after writing this report; no browser, server, test suite or build was invoked by this documentation pass. |

The local Python standard-library validation returned: `PASS: 18 relative links, 6 study contracts, 16 generated files, 13 JPEG dimensions, English public documentation, copyright notice.` It also confirmed that the two repository-wide design files remain absent. JPEG dimensions were parsed from their frame headers without generating or altering images.

The current main capture metadata is 1440×1007 for [desktop](../docs/images/interaction-lab-desktop.jpg), 390×1204 for [phone](../docs/images/interaction-lab-mobile.jpg), and 1280×991 for the [additional in-app width](../docs/images/interaction-user-1280.jpg). The other study captures are indexed by the `interaction-<pattern>-desktop.jpg` and `interaction-<pattern>-mobile.jpg` filenames under `docs/images/`.

The existing [independent finish verdict](interaction-finish-verdict.md) records the radial origin, snap settlement, live reduced-motion wheel handling, removed label treatment and action-icon consistency as resolved at source-and-screenshot scope. It reports no independent browser execution or temporal detector rerun. That disposition is retained at its stated scope. Existing author-operated runtime records remain separate; no new runtime pass, human composition approval, physical touch acceptance, full accessibility audit or device-performance result is claimed here.

## Rights and distribution

This original documentation follows the repository's [custom source-available license](../LICENSE), including KarmenLoop copyright, preservation of notices, its independently created output exception and third-party rights. No third-party skill instructions, font files or new third-party design assets are bundled. Local operational data, credentials, databases and `.local` content were outside this pass.

## Typography correction follow-up

Resolved on 2026-10-22: the regenerated `docs/generated/sensu/DESIGN-SPEC.md` and `docs/generated/sensu/UI-UX-PROMPT.md` now both state the winning shared body rule as `16px/1.7`, lab body as 11–13px, metadata as 9–11px and scene headings as 16–32px. A bounded text check of these two files returned exit 0 and confirmed the corrected values. This resolves the generated-typography drift recorded above; the initial observation is preserved as review history. The residual unused eyebrow CSS remains as previously recorded. No global design file or UI/source-style change was made by this follow-up.

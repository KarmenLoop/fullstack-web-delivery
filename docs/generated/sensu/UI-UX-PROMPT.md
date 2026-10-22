# Project-specific UI/UX implementation prompt

Project: SENSU Digital — enterprise site, interaction studies and motion atlas. Output language: English public example; use the client-requested language for new projects.

Implement the following project in its existing context. Reuse these answers; do not restart discovery.

Purpose: Help SME buyers choose a service and submit an inquiry; let authorized staff process it; demonstrate six purposeful feedback patterns.

Audience: SME business visitors, administrator, read-only staff, and developers evaluating the isolated lab.

Visual direction: Confirmed warm paper #f6f5ef and forest ink #173d30; restrained editorial B2B hierarchy; inherit the existing token system. Different page tasks need different compositions, not a repeated feature-card skin.

## Design rules

Composition: Use the existing editorial brand on public service pages: clear business proposition, specific service choices and a visible inquiry path. Treat administration as an operational record workspace. Treat the lab as an index plus one active mechanism and its explanation. Do not repeat one marketing-card grid across these different tasks.

Typography: Inherit --font from src/tokens.css: installed PingFang SC, Hiragino Sans GB, Microsoft YaHei and system sans fallbacks; no custom font license is claimed. The winning shared body rule is 16px/1.7; lab body typically 11–13px, metadata 9–11px, scene headings 16–32px, display 35px on phones up to 54px on desktop. Keep text readable at the actual viewport and browser zoom; headings need a clear hierarchy, not repeated labels above them.

Color: Paper #f6f5ef; pale #edf0e6; ink #173d30; green #245b46; muted #58685f; line #dce2d5. Use green/ink for state and focus, tinted pale surfaces for grouping. Error state has written recovery as well as a muted rust treatment. Validate text contrast in the actual combinations; color never carries state alone.

Spacing: Existing radius tokens are 14px and 8px. The lab uses fine borders, 5–8px specimen surfaces and 28px completion pill/circle geometry. Desktop shell uses 52px side gutters; phone 20px. Group related controls tightly; separate content, state and explanation. Reserve enough card height for phone wrapping; use fluid minmax columns rather than fixed page widths.

Components: Reuse Radix dialog/icons and native button, link, checkbox, select and form semantics. Controls have visible hover/focus/pressed/disabled states; ordinary hit targets are at least 44px, including label hit area. A disabled control needs an understandable reason. Use a consistent SVG icon vocabulary. Keep success button DOM/focus stable; collapse hidden content and outgoing transition layers must not add focus targets.

Navigation: Public primary navigation: Home, Services, Approach, About, with inquiry as primary CTA and privacy/staff entry in supporting navigation. Service details return to the service index. The separate lab uses six study links and query-driven view links; honor history, modified clicks and keyboard activation. Admin has search/status/paging and record details, not public marketing navigation.

Feedback: Distinguish press, pending, confirmed result, recoverable error, empty, disabled and interrupted states. Derive coordinated visuals from a single business state. Success follows the real response; lab work is labeled simulation. Stop in-flight motion when reduced motion becomes active. Avoid fake progress, duplicate writes, lost form input and hidden errors.

Accessibility: Semantic landmarks/headings; meaningful labels; visible keyboard focus; stable focus after async form replacement and dialog exit; native alternatives for gestures; written final state; aria-live only for useful results. Respect live prefers-reduced-motion changes, touch scrolling outside contained gestures and zoom. Browser operation is not a full assistive-technology audit.

Responsive: Inspect 1440px desktop, 390px phone and the actual in-app width. Phone layouts expose action and state without hover; admin record details remain operable. Lab index becomes two columns above one canvas. Prevent page overflow and clipped copy, but verify task completion separately. Resizing a completed radial view must not leave a stale pixel clip.

Assets: Fictional brand and authored mechanism scenes; existing architectural illustration is labeled synthetic. Do not invent client logos, awards, portraits, recordings or customer outcomes. Verify rights/provenance before adding real assets. No third-party skill content or brand skin is copied.

Research and reference decisions: Use industry leaders for task architecture before generic inspiration. Apple informs clarity, direct response and continuity; do not copy its identity. Taste informs marketing composition and deliberate density, not dashboard dogma. Impeccable informs audience/task contracts, coherent states, responsive review and scoped finish evidence. Existing Motion, Radix and native CSS fit this codebase; no new dependency or copied third-party skill text.

## Established decisions

- Owner: fictional digital-services enterprise for SME customers; websites, systems, automation.
- Owner: cream/forest restrained editorial direction; concise factual copy.
- Owner: reuse the ten existing discovery answers; do not repeat the interview.
- Owner: public home, services and three detail routes, method, about, contact and privacy.
- Owner: visitor consultation without login; administrator and read-only staff.
- Owner: name, company, email, service and requirement; searchable/filterable admin details and status.
- Owner: new → in_progress → done; local data; explicit cleanup command.
- Owner: desktop, phone, keyboard and reduced motion; fine springs and progressive presentation.
- Owner: add six named advanced patterns and automatically generated UI/UX plus module specifications.
- Later publication instruction: English public materials, retained copyright and no-modification source-available terms.
- Owner: inspect the supplied reference clip locally; implement purposeful scroll mechanisms, real login feedback, a read-only sourced permission query, linked graph/activity/inline detail, card transfer and dark appearance; update the full skill package.

## Required page contracts

### P01 · /

**Audience:** Prospective SME decision maker

**Task:** Understand whether the services match the business need.

**Content:** Specific proposition; three services; interactive mechanism preview; working method; honest fictional-demo disclosure.

**Primary Action:** Explore services → /services; Start an inquiry → /contact.

**Hierarchy:** Lead with the task; group supporting evidence and details before the next action.

**Responsive:** One reading column on phones; retain the primary action, keyboard order and visible feedback.

### P02 · /services

**Audience:** Prospective buyer comparing scope

**Task:** Choose the appropriate service.

**Content:** Three service summaries with audience, outputs and detail links.

**Primary Action:** Open the relevant service detail.

**Hierarchy:** Lead with the task; group supporting evidence and details before the next action.

**Responsive:** One reading column on phones; retain the primary action, keyboard order and visible feedback.

### P03 · /services/website

**Audience:** Buyer evaluating websites

**Task:** Evaluate scope, exclusions and next step.

**Content:** Problem; audience; specific deliverables; three service-specific steps; exclusions; FAQ.

**Primary Action:** Start an inquiry → /contact; carry or allow selection of service.

**Hierarchy:** Lead with the task; group supporting evidence and details before the next action.

**Responsive:** One reading column on phones; retain the primary action, keyboard order and visible feedback.

### P04 · /services/systems

**Audience:** Buyer evaluating business systems

**Task:** Evaluate scope, exclusions and next step.

**Content:** Problem; audience; specific deliverables; three service-specific steps; exclusions; FAQ.

**Primary Action:** Start an inquiry → /contact; carry or allow selection of service.

**Hierarchy:** Lead with the task; group supporting evidence and details before the next action.

**Responsive:** One reading column on phones; retain the primary action, keyboard order and visible feedback.

### P05 · /services/automation

**Audience:** Buyer evaluating automation

**Task:** Evaluate scope, exclusions and next step.

**Content:** Problem; audience; specific deliverables; three service-specific steps; exclusions; FAQ.

**Primary Action:** Start an inquiry → /contact; carry or allow selection of service.

**Hierarchy:** Lead with the task; group supporting evidence and details before the next action.

**Responsive:** One reading column on phones; retain the primary action, keyboard order and visible feedback.

### P06 · /method

**Audience:** Buyer assessing collaboration

**Task:** Understand the work and acceptance sequence.

**Content:** Discovery, design contracts, complete business increments, verification and handover.

**Primary Action:** Start an inquiry → /contact.

**Hierarchy:** Lead with the task; group supporting evidence and details before the next action.

**Responsive:** One reading column on phones; retain the primary action, keyboard order and visible feedback.

### P07 · /about

**Audience:** Buyer checking identity and credibility

**Task:** Understand the fictional company and its operating principles.

**Content:** Clearly fictional brand story; SME focus; principles and service boundaries. No invented endorsements or statistics.

**Primary Action:** Discuss the project → /contact.

**Hierarchy:** Lead with the task; group supporting evidence and details before the next action.

**Responsive:** One reading column on phones; retain the primary action, keyboard order and visible feedback.

### P08 · /contact

**Audience:** Visitor; no account required

**Task:** Submit a consultation inquiry and retain its reference.

**Content:** Name, company, email, service type, requirement; privacy consent; errors; pending; success reference; reset.

**Primary Action:** POST /api/inquiries; staff see the same reference at /admin.

**Hierarchy:** Lead with the task; group supporting evidence and details before the next action.

**Responsive:** One reading column on phones; retain the primary action, keyboard order and visible feedback.

### P09 · /privacy

**Audience:** Visitor before submitting contact data

**Task:** Understand local-demo data use and limits.

**Content:** Fields collected; purpose; local storage; staff access; cleanup method; no real production-policy claims.

**Primary Action:** Return to /contact.

**Hierarchy:** Lead with the task; group supporting evidence and details before the next action.

**Responsive:** One reading column on phones; retain the primary action, keyboard order and visible feedback.

### P10 · /login

**Audience:** Administrator or read-only staff

**Task:** Sign in to the inquiry workspace.

**Content:** Email/password labels; validation; pending; invalid credentials; rate limit; return to /admin.

**Primary Action:** POST /api/login; open /admin on success.

**Hierarchy:** Lead with the task; group supporting evidence and details before the next action.

**Responsive:** One reading column on phones; retain the primary action, keyboard order and visible feedback.

### P11 · /admin

**Audience:** Administrator and read-only staff

**Task:** Find and inspect inquiries; administrator advances legal status.

**Content:** Session/role; search; status filters; paged list; details drawer; actor/time audit; update pending/error/conflict; logout.

**Primary Action:** GET /api/admin/inquiries and details; administrator PATCH selected record.

**Hierarchy:** Lead with the task; group supporting evidence and details before the next action.

**Responsive:** Use a readable record layout on phones. Keep status, detail action and close control discoverable; trap/restore focus in the dialog.

### P12 · /interaction-lab

**Audience:** Developer or designer evaluating feedback

**Task:** Operate six explicit feedback studies and inspect their contracts.

**Content:** Six-item index; one live canvas; local-simulation disclosure; state/recovery note; back link.

**Primary Action:** Choose a pattern via URL query; operate its live controls.

**Hierarchy:** Operate/Experience workbench. Index supports one focal mechanism, followed by its contract.

**Responsive:** Two-column compact study index then one canvas on phones; no hidden primary actions or page overflow.

### P13 · /motion-atlas

**Audience:** Developers and operators exploring the declared demonstration policy and motion mechanisms.

**Task:** Ask an access question, inspect its source, trace a department and compare purposeful scroll/continuity mechanisms.

**Content:** Field-guide title; read-only policy workspace with command search, relationship paths, illustrative heatmap, role count and expanding department cards; scroll story with sticky context and native comparison rail; reversible card transfer; link to actual staff login.

**Primary Action:** Ask about access, follow a sourced result to a department, then operate the motion studies.

**Hierarchy:** Workspace first; named scroll mechanisms and continuity lessons below; appearance and route navigation remain available.

**Responsive:** Stack graph/activity and cards at phone width; retain 44px department controls, native horizontal rail, input text at 16px, in-flow detail and a bounded command dialog. Sticky context returns to normal flow on narrow screens.

## Required interaction contracts

### I01 · P01

**Role:** visitor

**Trigger:** Activate a service link

**Target:** route:/services

**States:** default / hover / pressed / focus / destination

**Feedback:** Current link and destination heading are visible.

**Motion:** Press response 100–160ms; restrained page reveal; reduced-motion immediate.

**Recovery:** Native link supports open-in-tab and browser history.

**Verify:** Open services using pointer and keyboard; verify URL, heading and Back.

### I02 · P08

**Role:** visitor

**Trigger:** Submit a valid consented inquiry

**Target:** api:POST /api/inquiries

**States:** editing / invalid / submitting / saved / recoverable error

**Feedback:** Immediate submitting label and duplicate protection; success only after persisted response; reference is selectable.

**Motion:** Short progress/success transition; focus the result after form replacement; no ordinary-business confetti.

**Recovery:** Preserve entered data on error; retry with the same idempotency key; reset returns focus to first field.

**Verify:** Submit, match reference in staff details and audit; test invalid fields, repeat, timeout uncertainty and reset focus.

### I03 · P10

**Role:** staff

**Trigger:** Submit credentials

**Target:** api:POST /api/login

**States:** editing / signing in / invalid / limited / authenticated

**Feedback:** Disable duplicate submission; show specific recovery; navigate only after session acknowledgment.

**Motion:** Pending real login morphs the surface into a bounded orb; nodes form a check only after the server confirms. Reduced motion keeps immediate written feedback and removes the transition wait. Invalid credentials restore the full button and focus the error.

**Recovery:** Keep email; do not expose secret or stack trace; allow retry after limit.

**Verify:** Operate valid/invalid login and logout; anonymous admin API is rejected.

### I04 · P11

**Role:** admin

**Trigger:** Advance an inquiry to the next legal status

**Target:** api:PATCH /api/admin/inquiries/:id

**States:** new → in_progress → done; pending / conflict / forbidden / failure

**Feedback:** Keep reference and current status visible; update summary/details/audit from successful response.

**Motion:** Drawer spring 360/30, interruptible exit; restore focus to the originating detail action.

**Recovery:** Conflict fetches latest version before retry; failed writes retain confirmed state; read-only role cannot mutate.

**Verify:** Check two legal transitions, version conflict, audit actor/time, read-only 403 and dialog Escape/focus.

### I05 · P12

**Role:** visitor

**Trigger:** Complete the local review study

**Target:** local:completion

**States:** idle / pending / success / error / reset

**Feedback:** Explicit simulation; pending immediately; acknowledged success shrinks to a circle then draws check and emits ten decorative particles.

**Motion:** FLIP silhouette spring 360/30; check 200ms after 120ms; particles 420ms; reduced-motion no displacement/particles.

**Recovery:** Disable duplicate work; failed response retains review and provides retry; leaving study clears timer.

**Verify:** Observe pending before success; inject failure, retry, reset and keyboard completion.

### I06 · P12

**Role:** visitor

**Trigger:** Toggle a readiness item

**Target:** local:linked-progress

**States:** 0–4 completed; reversible

**Feedback:** Checkbox, ring, count and light top surface share one count.

**Motion:** Ring 280ms; numeric value 240ms; color 240ms. Retarget from current values; no per-frame React renders.

**Recovery:** Uncheck reverses all feedback; textual final count remains available with reduced motion.

**Verify:** Check/uncheck including rapid reversal; verify ring/count/text and zero/full states.

### I07 · P12

**Role:** visitor

**Trigger:** Open or gather the specification cards

**Target:** local:stack

**States:** gathered / expanding / open / gathering

**Feedback:** Expanded state and label match the card arrangement.

**Motion:** Spring 360/30; bounded 35ms ordering, reversed on gather; immediate reduced-motion layout.

**Recovery:** Repeat reverses existing motion; hidden cards are not focusable; toggle retains focus.

**Verify:** Rapidly open/gather; verify stable order, labels and no clipped text at phone width.

### I08 · P12

**Role:** visitor

**Trigger:** Scroll or move between workflow cards

**Target:** local:snap

**States:** scrolling / snapping / settled selection

**Feedback:** Timeline advances after settled center selection, not at the first scroll pixel.

**Motion:** Native scroll snap; prefer scrollend. Quiet fallback is only for browsers without it, requires released pointer/touch and center alignment within two CSS pixels; timeline draws 240ms after commit.

**Recovery:** Previous/next and Arrow/Home/End retain access; reduced-motion navigation scrolls instantly.

**Verify:** Scroll and use Next/End/Home; confirm centered card and timeline agree after settle.

### I09 · P12

**Role:** visitor

**Trigger:** Drag, key-select or choose a consultation slot

**Target:** local:wheel

**States:** dragging / settling / selected bounded slot

**Feedback:** Selected time commits at rest; visible/native alternatives remain available.

**Motion:** 44px tick; velocity projection 180ms; spring 240/29; 0.18 elasticity; bounded index 0–6.

**Recovery:** New drag stops old animation; Arrow/Home/End and select provide alternatives; reduced-motion instant selection. If reduced motion becomes active during a spring, stop it and immediately commit the bounded target.

**Verify:** Flick both ways and over bounds; interrupt settling; compare spinbutton, native select and selected-time text.

### I10 · P12

**Role:** visitor

**Trigger:** Choose Overview, Activity or Preferences

**Target:** local:radial-route

**States:** current view / entering view / settled

**Feedback:** URL query and active link identify actual content; Back/Forward restores selection.

**Motion:** Circle begins at input coordinates or keyboard trigger center; radius covers farthest corner; 380ms ease; reduced-motion instant. Keep the actual origin even when the tab is below the panel; remove clipping after settlement so resizing remains safe.

**Recovery:** Last navigation wins; old layer inert and hidden from accessibility; no hidden focus targets.

**Verify:** Operate all views, preference checkbox, rapid switch, keyboard Enter, Back/Forward and reduced motion.

### I11 · P13

**Role:** visitor

**Trigger:** Open Command+K or the visible command control, then submit a question or team.

**Target:** api:GET /api/demo/access-map

**States:** Idle, pending, sourced matches, no match, unsupported question, error/retry, closed.

**Feedback:** Return matching role IDs and the policy version/rule. Focus input on open, source department on selection, and the prior valid control on Escape.

**Motion:** Command opening is immediate. Source selection triggers the map sequence separately.

**Recovery:** Abort replaced queries, preserve entered text on error, bound input and never turn a lookup into an access mutation. Publish a successful result into the workspace model, clear its prior load error and invalidate older initial responses before offering department navigation.

**Verify:** Ask the stated permission question in English and Chinese; compare role IDs to the policy, inspect no-match and role-source focus; verify invalid query/write boundaries. Audit, billing, ambiguous and multi-scope questions must not inherit user-access answers. Reproduce initial loading failure, then recover through a successful query and focus its rendered department.

### I12 · P13

**Role:** visitor

**Trigger:** Select a department node or expand its role card.

**Target:** local:department-selection

**States:** Operations, Security or Delivery; one optional expanded detail; trace revision.

**Feedback:** One selected department drives the path, trace, sample activity, role count and inline detail.

**Motion:** Bounded path drawing and a single root-to-node trace; local heatmap stagger; layout transforms let neighboring cards move.

**Recovery:** Rapid selection replaces the prior trace; reduced motion resolves directly; stable native buttons retain focus.

**Verify:** Select/reverse departments, verify matching IDs/counts, in-flow expansion, native focus and reduced-motion equivalents.

### I13 · P13

**Role:** visitor

**Trigger:** Assign or return the same example card.

**Target:** local:card-transfer

**States:** Available or assigned; stable DEMO-01 identity.

**Feedback:** The same card and reference appear at the destination; status states the local demonstration boundary.

**Motion:** Shared layout identity with bounded spring; immediate placement with reduced motion.

**Recovery:** Reverse during movement; retain the logical target and keep the action operable.

**Verify:** Assign, reverse and repeat at desktop/phone widths; confirm a single card and matching status.

### I14 · P13

**Role:** visitor

**Trigger:** Activate the appearance control.

**Target:** local:appearance

**States:** Light or dark; local preference if storage is available.

**Feedback:** All atlas and command surfaces use semantic theme tokens and a visible toggle label.

**Motion:** Immediate color/surface update, no required sweeping transition.

**Recovery:** Storage unavailable keeps the selected appearance for the current visit; no credentials or query content are persisted.

**Verify:** Switch both ways, reopen the command surface, reload for preference persistence, and inspect text/focus contrast.

### I15 · P13

**Role:** visitor

**Trigger:** Scroll the lesson or operate the comparison rail controls/keys.

**Target:** local:scroll-study

**States:** Section progress, one-time reveals, bounded decorative offset, native sticky range and actual rail position.

**Feedback:** Different mechanisms use distinct triggers; native scrolling and written content remain usable.

**Motion:** Threshold reveal differs from position-linked progress. Small decorative parallax; native sticky and proximity snap; no vertical-wheel hijacking.

**Recovery:** Resize/reduced motion retains readability, stops active reveal transforms and removes parallax; final rail item remains reachable.

**Verify:** Measure actual progress at two positions, sticky containment, horizontal endpoints and key navigation; inspect desktop/phone and reduced-motion paths.

## Layout comparison and visual decisions

For a new website or substantial visual redesign, use these contracts as the shared brief for three materially different representative layouts. Compare information order, composition, hierarchy or navigation using the same truthful content, core action and brand constraints; color swaps alone are insufficient. Build and operate the primary interaction in each option, verify actual desktop and phone widths, then open a reachable A/B/C comparison in the user-facing browser. Provide direct option links, matched labeled views and concise tradeoffs before asking for selection, combination or revision feedback.

Reuse a specifically chosen layout or supplied design and keep targeted fixes in scope. An agreed palette alone does not choose a layout. Preserve pending decisions and continue independent authorized work; wait for required feedback before expanding dependent templates. When visual choice is explicitly delegated, record the reasoned agent selection and show its basis without calling it human approval. Update this prompt, the design contracts and the existing decision ledger after selection.

For later consequential layout, navigation or interaction choices, show a focused working comparison, annotated views or a flow diagram before asking. Mark unavailable browser operation NOT_RUN and distinguish wireframes or mockups from working pages.

## Build and inspect

Read DESIGN-SPEC.md, MOTION-SPECS.md, MOTION-MAP.md and the module specifications linked in README.md. Every enabled control must navigate to its declared destination or perform its stated action. Start feedback at input, distinguish pending from success, preserve input on failure, prevent duplicate submissions, and retain visible keyboard focus. Specify empty, loading, error, disabled, success and interrupted states where applicable. Use content-driven layouts and real copy. Preserve native links, controls, browser history and touch scrolling.

Map every Ixx contract to an operated scenario and evidence. Test normal, pending, failure, duplicate, unauthorized, stale version, empty and recovery paths relevant to that action. Verify desktop/phone, focus, keyboard, reduced motion and rapid reversal; drag/settle evidence is separate from screenshots. Run npm test, npm run build and production HTTP route checks; verify database/session restart where affected. Record PASS/FAIL/NOT_RUN, actual command/exit, source revision and limits. Retain failed attempts and repairs. Physical devices, frame-rate certification and other agent hosts are NOT_RUN unless actually tested.

Show the complete plan and these contracts before implementation. Continue only within this authority: The owner has authorized this local implementation, preview, verification, direct repair and update to the existing public repository/release. New projects must inherit their own actual authority; this example grants none.

Pending facts and assumptions:

- No real company identity, endorsements, production service credentials, transactions or deployment target is supplied. They remain outside this fictional local trial.
- The six studies are alternatives chosen by task, not a requirement to animate every business screen.

Deliver source, startup/preview instructions, actual verification evidence and honest limits. Do not invent customer proof, copy a reference identity, treat a screenshot as motion proof, or claim a platform was tested because a skill file loads there.

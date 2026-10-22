# Motion placement and driver map

Project: SENSU Digital — enterprise site, interaction studies and motion atlas. Output language: English public example; use the client-requested language for new projects.

Each effect belongs to a page, element and task. The driver must be actual scroll, input or confirmed state. Acceptance remains NOT_RUN until operated.

## M01 · scroll reveal

**Page:** P13

**Action:** I15

**Element:** Lesson rows and mechanism cards

**Purpose:** Introduce grouped explanatory content once.

**Trigger:** First viewport intersection

**Driver:** IntersectionObserver threshold, with visible default content.

**Timing:** 300ms ease-out; local stagger bounded to 160ms.

**Interruption:** A newer input/selection replaces the previous target; async responses are cancelled or ignored after replacement/unmount. Keep logical state immediate.

**Reduced:** Remove nonessential translation, parallax, orbit and path travel. Keep written status, direct progress, selected values and native control behavior.

**Fallback:** Readable visible content, native links/buttons/scrolling and direct state change. Keep unsupported branches explicitly unverified.

**Verify:** Operate the mapped action and compare its page, selected IDs, state, focus, normal/reduced behavior and actual viewport; keep temporal and physical-device evidence separate.

## M02 · scroll-linked animation

**Page:** P13

**Action:** I15

**Element:** Lesson progress track

**Purpose:** Explain progress through the business sequence.

**Trigger:** Section scroll position

**Driver:** Actual normalized section progress, reversible with scroll.

**Timing:** Direct position mapping; no time-based lag.

**Interruption:** A newer input/selection replaces the previous target; async responses are cancelled or ignored after replacement/unmount. Keep logical state immediate.

**Reduced:** Remove nonessential translation, parallax, orbit and path travel. Keep written status, direct progress, selected values and native control behavior.

**Fallback:** Readable visible content, native links/buttons/scrolling and direct state change. Keep unsupported branches explicitly unverified.

**Verify:** Operate the mapped action and compare its page, selected IDs, state, focus, normal/reduced behavior and actual viewport; keep temporal and physical-device evidence separate.

## M03 · parallax

**Page:** P13

**Action:** I15

**Element:** Decorative plane behind the three step labels

**Purpose:** Separate decorative depth from stable reading content.

**Trigger:** Section scroll position

**Driver:** Transform only the isolated decorative plane.

**Timing:** Bounded +16px to -16px; no content movement.

**Interruption:** A newer input/selection replaces the previous target; async responses are cancelled or ignored after replacement/unmount. Keep logical state immediate.

**Reduced:** Remove nonessential translation, parallax, orbit and path travel. Keep written status, direct progress, selected values and native control behavior.

**Fallback:** Readable visible content, native links/buttons/scrolling and direct state change. Keep unsupported branches explicitly unverified.

**Verify:** Operate the mapped action and compare its page, selected IDs, state, focus, normal/reduced behavior and actual viewport; keep temporal and physical-device evidence separate.

## M04 · sticky

**Page:** P13

**Action:** I15

**Element:** Lesson explanation aside

**Purpose:** Keep context beside the longer sequence.

**Trigger:** Native vertical scroll within the lesson

**Driver:** CSS position:sticky and its containing section.

**Timing:** Native placement; no animated fake pinning.

**Interruption:** A newer input/selection replaces the previous target; async responses are cancelled or ignored after replacement/unmount. Keep logical state immediate.

**Reduced:** Remove nonessential translation, parallax, orbit and path travel. Keep written status, direct progress, selected values and native control behavior.

**Fallback:** Readable visible content, native links/buttons/scrolling and direct state change. Keep unsupported branches explicitly unverified.

**Verify:** Operate the mapped action and compare its page, selected IDs, state, focus, normal/reduced behavior and actual viewport; keep temporal and physical-device evidence separate.

## M05 · scroll snap

**Page:** P13

**Action:** I15

**Element:** Mechanism comparison rail

**Purpose:** Settle an overflowing collection at a readable item.

**Trigger:** Native scroll or explicit navigation

**Driver:** CSS proximity snap and actual scroll position, with measured trailing space.

**Timing:** Browser-owned settlement; reduced motion uses instant explicit navigation.

**Interruption:** A newer input/selection replaces the previous target; async responses are cancelled or ignored after replacement/unmount. Keep logical state immediate.

**Reduced:** Remove nonessential translation, parallax, orbit and path travel. Keep written status, direct progress, selected values and native control behavior.

**Fallback:** Readable visible content, native links/buttons/scrolling and direct state change. Keep unsupported branches explicitly unverified.

**Verify:** Operate the mapped action and compare its page, selected IDs, state, focus, normal/reduced behavior and actual viewport; keep temporal and physical-device evidence separate.

## M06 · horizontal scroll

**Page:** P13

**Action:** I15

**Element:** Mechanism comparison rail

**Purpose:** Compare related mechanisms without redirecting the page.

**Trigger:** Scrollbar, keys or Previous/Next

**Driver:** Native overflow-x with controls and endpoint feedback.

**Timing:** Native scroll; explicit smooth only when motion is allowed.

**Interruption:** A newer input/selection replaces the previous target; async responses are cancelled or ignored after replacement/unmount. Keep logical state immediate.

**Reduced:** Remove nonessential translation, parallax, orbit and path travel. Keep written status, direct progress, selected values and native control behavior.

**Fallback:** Readable visible content, native links/buttons/scrolling and direct state change. Keep unsupported branches explicitly unverified.

**Verify:** Operate the mapped action and compare its page, selected IDs, state, focus, normal/reduced behavior and actual viewport; keep temporal and physical-device evidence separate.

## M07 · morph

**Page:** P10

**Action:** I03

**Element:** Actual staff sign-in submit surface

**Purpose:** Acknowledge an in-flight credential request.

**Trigger:** POST /api/login starts

**Driver:** Actual pending state; no artificial success clock.

**Timing:** Bounded layout spring, 0.5s perceptual duration, bounce 0.2.

**Interruption:** A newer input/selection replaces the previous target; async responses are cancelled or ignored after replacement/unmount. Keep logical state immediate.

**Reduced:** Remove nonessential translation, parallax, orbit and path travel. Keep written status, direct progress, selected values and native control behavior.

**Fallback:** Readable visible content, native links/buttons/scrolling and direct state change. Keep unsupported branches explicitly unverified.

**Verify:** Operate the mapped action and compare its page, selected IDs, state, focus, normal/reduced behavior and actual viewport; keep temporal and physical-device evidence separate.

## M08 · node check / path drawing

**Page:** P10

**Action:** I03

**Element:** Actual sign-in orb

**Purpose:** Confirm successful session establishment.

**Trigger:** Login API confirms a user

**Driver:** Confirmed response only; nodes form the check before navigation.

**Timing:** 250ms node/path change; normal navigation after a bounded 420ms confirmation, reduced motion immediate.

**Interruption:** A newer input/selection replaces the previous target; async responses are cancelled or ignored after replacement/unmount. Keep logical state immediate.

**Reduced:** Remove nonessential translation, parallax, orbit and path travel. Keep written status, direct progress, selected values and native control behavior.

**Fallback:** Readable visible content, native links/buttons/scrolling and direct state change. Keep unsupported branches explicitly unverified.

**Verify:** Operate the mapped action and compare its page, selected IDs, state, focus, normal/reduced behavior and actual viewport; keep temporal and physical-device evidence separate.

## M09 · shared element transition

**Page:** P13

**Action:** I13

**Element:** DEMO-01 transfer card

**Purpose:** Preserve identity across a change of placement.

**Trigger:** Assign or return control

**Driver:** Single local target state and stable layout ID.

**Timing:** 0.5s spring, bounce 0.2; rapid input retargets.

**Interruption:** A newer input/selection replaces the previous target; async responses are cancelled or ignored after replacement/unmount. Keep logical state immediate.

**Reduced:** Remove nonessential translation, parallax, orbit and path travel. Keep written status, direct progress, selected values and native control behavior.

**Fallback:** Readable visible content, native links/buttons/scrolling and direct state change. Keep unsupported branches explicitly unverified.

**Verify:** Operate the mapped action and compare its page, selected IDs, state, focus, normal/reduced behavior and actual viewport; keep temporal and physical-device evidence separate.

## M10 · number ticker

**Page:** P13

**Action:** I12

**Element:** Selected role permission count

**Purpose:** Make a changed known count legible without shifting the row.

**Trigger:** Selected role changes

**Driver:** Loaded policy role.permissions.length; never fabricated analytics.

**Timing:** 250ms digit transform; tabular figures and stable accessible value.

**Interruption:** A newer input/selection replaces the previous target; async responses are cancelled or ignored after replacement/unmount. Keep logical state immediate.

**Reduced:** Remove nonessential translation, parallax, orbit and path travel. Keep written status, direct progress, selected values and native control behavior.

**Fallback:** Readable visible content, native links/buttons/scrolling and direct state change. Keep unsupported branches explicitly unverified.

**Verify:** Operate the mapped action and compare its page, selected IDs, state, focus, normal/reduced behavior and actual viewport; keep temporal and physical-device evidence separate.

## M11 · path drawing

**Page:** P13

**Action:** I12

**Element:** Workspace-to-department relationship edges

**Purpose:** Make the declared hierarchy visible.

**Trigger:** Map mounts or selection changes

**Driver:** Versioned server model and selected department ID.

**Timing:** 500ms bounded line draw; no infinite graph animation.

**Interruption:** A newer input/selection replaces the previous target; async responses are cancelled or ignored after replacement/unmount. Keep logical state immediate.

**Reduced:** Remove nonessential translation, parallax, orbit and path travel. Keep written status, direct progress, selected values and native control behavior.

**Fallback:** Readable visible content, native links/buttons/scrolling and direct state change. Keep unsupported branches explicitly unverified.

**Verify:** Operate the mapped action and compare its page, selected IDs, state, focus, normal/reduced behavior and actual viewport; keep temporal and physical-device evidence separate.

## M12 · route tracing

**Page:** P13

**Action:** I12

**Element:** Workspace-to-selected-department light point

**Purpose:** Show the actual root path for the selection.

**Trigger:** Department selection revision

**Driver:** The selected root/trunk/branch coordinates.

**Timing:** 650ms single explanatory trace; replaced by the next selection.

**Interruption:** A newer input/selection replaces the previous target; async responses are cancelled or ignored after replacement/unmount. Keep logical state immediate.

**Reduced:** Remove nonessential translation, parallax, orbit and path travel. Keep written status, direct progress, selected values and native control behavior.

**Fallback:** Readable visible content, native links/buttons/scrolling and direct state change. Keep unsupported branches explicitly unverified.

**Verify:** Operate the mapped action and compare its page, selected IDs, state, focus, normal/reduced behavior and actual viewport; keep temporal and physical-device evidence separate.

## M13 · heatmap wave

**Page:** P13

**Action:** I12

**Element:** Four sample weeks beside the map

**Purpose:** Link the same selection to its illustrative activity.

**Trigger:** Selected department/revision changes

**Driver:** Declared synthetic values from the same demo model.

**Timing:** 200ms local cell response; stagger remains below 150ms.

**Interruption:** A newer input/selection replaces the previous target; async responses are cancelled or ignored after replacement/unmount. Keep logical state immediate.

**Reduced:** Remove nonessential translation, parallax, orbit and path travel. Keep written status, direct progress, selected values and native control behavior.

**Fallback:** Readable visible content, native links/buttons/scrolling and direct state change. Keep unsupported branches explicitly unverified.

**Verify:** Operate the mapped action and compare its page, selected IDs, state, focus, normal/reduced behavior and actual viewport; keep temporal and physical-device evidence separate.

## M14 · layout animation / inline disclosure

**Page:** P13

**Action:** I12

**Element:** Department role cards

**Purpose:** Reveal details at their source while neighbors yield.

**Trigger:** Role toggle or sourced department selection

**Driver:** Stable IDs, native disclosure button, in-flow hidden region.

**Timing:** Bounded layout spring, no overlay or focus theft.

**Interruption:** A newer input/selection replaces the previous target; async responses are cancelled or ignored after replacement/unmount. Keep logical state immediate.

**Reduced:** Remove nonessential translation, parallax, orbit and path travel. Keep written status, direct progress, selected values and native control behavior.

**Fallback:** Readable visible content, native links/buttons/scrolling and direct state change. Keep unsupported branches explicitly unverified.

**Verify:** Operate the mapped action and compare its page, selected IDs, state, focus, normal/reduced behavior and actual viewport; keep temporal and physical-device evidence separate.

## M15 · theme change

**Page:** P13

**Action:** I14

**Element:** Atlas and command appearance

**Purpose:** Support the requested light/dark reading context.

**Trigger:** Appearance control

**Driver:** Semantic tokens and a local-only preference.

**Timing:** Immediate surface/text update; no spatial reveal required.

**Interruption:** A newer input/selection replaces the previous target; async responses are cancelled or ignored after replacement/unmount. Keep logical state immediate.

**Reduced:** Remove nonessential translation, parallax, orbit and path travel. Keep written status, direct progress, selected values and native control behavior.

**Fallback:** Readable visible content, native links/buttons/scrolling and direct state change. Keep unsupported branches explicitly unverified.

**Verify:** Operate the mapped action and compare its page, selected IDs, state, focus, normal/reduced behavior and actual viewport; keep temporal and physical-device evidence separate.

## M16 · instant command feedback

**Page:** P13

**Action:** I11

**Element:** Command+K palette

**Purpose:** Support a frequent keyboard task without added latency.

**Trigger:** Keyboard shortcut or visible trigger

**Driver:** Focus-managed dialog with a real bounded policy query.

**Timing:** Immediate open/close; animation deliberately omitted.

**Interruption:** A newer input/selection replaces the previous target; async responses are cancelled or ignored after replacement/unmount. Keep logical state immediate.

**Reduced:** Remove nonessential translation, parallax, orbit and path travel. Keep written status, direct progress, selected values and native control behavior.

**Fallback:** Readable visible content, native links/buttons/scrolling and direct state change. Keep unsupported branches explicitly unverified.

**Verify:** Operate the mapped action and compare its page, selected IDs, state, focus, normal/reduced behavior and actual viewport; keep temporal and physical-device evidence separate.

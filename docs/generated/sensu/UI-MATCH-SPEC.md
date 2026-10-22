# UI matching and finish decisions

Project: SENSU Digital — enterprise site, interaction studies and motion atlas. Output language: English public example; use the client-requested language for new projects.

## U01 · Tabular numerals and reserved numeric width

**Page:** P13

**Element:** Selected-role permission count

**Audience:** Developer inspecting the declared policy

**Task:** Compare changing counts without the label shifting

**Choice:** adopt

**Reason:** The count changes with the selected department and must remain readable during the existing odometer transition.

**Implementation:** Use lining/tabular figures in the chosen font; reserve the actual supported digit range and expose the current accessible value immediately. Inspect font-loading fallback and 9/10/100 boundaries before increasing the range.

**States:** Unknown value uses a dash; loaded value comes from the selected source role.

**Motion:** Digit tracks may settle visually; text and accessible value update with the authoritative model.

**Fallback:** Immediate static number with adequate width if animation or numeric features are unavailable.

**Verify:** Compare 111/888 and 9/10/100 using the actual font and locale; inspect label position and reduced motion.

**Action:** I12

**Execution:** NOT_RUN. This is a design decision, not proof of implementation.

## U02 · Concentric radius geometry

**Page:** P13

**Element:** Command panel and its inset input surface

**Audience:** Keyboard and pointer user searching the policy

**Task:** Perceive a consistent nested shape without distracting corner gaps

**Choice:** adopt

**Reason:** The search input is a visible inset surface inside a rounded command panel.

**Implementation:** Measure actual edge-to-edge inset, including any border, and derive aligned outer radius from inner radius plus inset. Preserve the existing panel size and compensate optically for unequal insets.

**States:** Closed/open, focus, pending, error and unsupported result retain stable geometry.

**Motion:** Command opens immediately; geometry must not delay input focus.

**Fallback:** Simple readable rectangles if clipping or available width makes decorative rounding unsuitable.

**Verify:** Inspect actual computed radii/insets and focused input at desktop/phone width; no clipped focus ring or pinched corner.

**Action:** I11

**Execution:** NOT_RUN. This is a design decision, not proof of implementation.

## U03 · Bounded grouped entrance

**Page:** P01

**Element:** Home proposition, supporting explanation and primary action

**Audience:** SME visitor evaluating services

**Task:** Understand the proposition and find the next action in reading order

**Choice:** adopt

**Reason:** Three meaningful parts can establish hierarchy; a long whole-page arrival would delay reading.

**Implementation:** Keep content visible by default; use existing animation stack for small per-group offsets, around 25-50ms apart, with total ordering delay bounded around 150-200ms after inspection.

**States:** Initial view, repeat navigation and unavailable enhancement preserve immediate content and native links.

**Motion:** Heading, explanation and action form a short sequence; cancel on unmount/live reduced preference and avoid accumulating queues.

**Fallback:** Immediate resting content and feedback under reduced motion or failed enhancement.

**Verify:** Keyboard action is available immediately; inspect repeated navigation, text lengths and live reduced preference.

**Action:** I01

**Execution:** NOT_RUN. This is a design decision, not proof of implementation.

## U04 · Balanced heading wrapping

**Page:** P01

**Element:** Main proposition heading

**Audience:** Visitor reading real service copy

**Task:** Read a balanced title at the current width

**Choice:** adopt

**Reason:** Short multi-line headings should retain a deliberate measure across actual language and font conditions.

**Implementation:** Use a suitable max inline size and text-wrap: balance as enhancement. Keep language metadata correct and inspect the actual copy rather than hardcoding line breaks.

**States:** Font loading, longer translation, enlarged text and responsive widths.

**Motion:** No animation required for line breaking.

**Fallback:** Normal wrapping with a content-appropriate measure; preserve readable copy without clipping.

**Verify:** Inspect desktop, 390px, enlarged text and a longer localized title; avoid a stranded final word where feasible.

**Action:** None; static presentation.

**Execution:** NOT_RUN. This is a design decision, not proof of implementation.

## U05 · Soft layered elevation

**Page:** P13

**Element:** Raised command surface and focus/error boundaries

**Audience:** User reading results against different scene grounds

**Task:** Distinguish elevation while preserving unmistakable input and focus

**Choice:** adopt

**Reason:** Subtle contact and ambient layers can separate the command surface; operational boundaries still need clear edges.

**Implementation:** Tune low-opacity contact/ambient shadow tokens to light/dark grounds. Keep input, focus, error and diagram lines where they carry information.

**States:** Light/dark, focus, errors and forced-colors mode.

**Motion:** Surface feedback remains brief and does not wait for an ambient effect.

**Fallback:** Explicit system-color border and visible focus when shadows are unavailable or removed by forced colors.

**Verify:** Inspect alternate grounds and forced colors; no muddy halo, lost input boundary or hidden focus ring.

**Action:** I11

**Execution:** NOT_RUN. This is a design decision, not proof of implementation.

## U06 · Environment-sampled metallic card

**Page:** P13

**Element:** Optional card material specimen

**Audience:** Developer comparing an intentional premium material

**Task:** Evaluate whether reflective texture improves the card study

**Choice:** defer

**Reason:** The current continuity task is already legible in the incumbent surface. A new GPU specimen needs a separate implementation and device evidence; the capability is retained as a conditional recipe.

**Implementation:** If selected later: declare an authored/licensed environment texture; horizontal/vertical blur and desaturation; bevel normals with stable grain; reflected sample; one bounded spring drives card and shader transform; complete lifecycle and semantic DOM fallback.

**States:** Texture loading, ready, pointer leave/cancel, unsupported/lost context, restore and teardown.

**Motion:** One shared spring retargets from current state; reduced motion/coarse pointer use a neutral material.

**Fallback:** Readable static CSS surface; no screen/camera capture is implied.

**Verify:** NOT_RUN for the GPU implementation; later verify resource budget, actual device frame time, CORS/image failure, context loss and cleanup.

**Action:** I13

**Execution:** NOT_RUN. This is a design decision, not proof of implementation.

## U07 · Reflective tilt on operational rows

**Page:** P11

**Element:** Inquiry records and status controls

**Audience:** Administrator and read-only staff

**Task:** Find a record and make a trustworthy processing decision

**Choice:** omit

**Reason:** Moving reflective rows would compete with status reading, stable targets and permission boundaries.

**Implementation:** Keep ordinary readable surfaces, stable semantic controls and existing state feedback; add no GPU dependency to this task.

**States:** Search, empty, detail, pending, conflict, read-only and error.

**Motion:** Use only the existing purposeful drawer/state feedback; no decorative tilt.

**Fallback:** Standard readable table or phone list.

**Verify:** Verify state/action discoverability and permission feedback with actual records; do not substitute a material screenshot for the business flow.

**Action:** I04

**Execution:** NOT_RUN. This is a design decision, not proof of implementation.

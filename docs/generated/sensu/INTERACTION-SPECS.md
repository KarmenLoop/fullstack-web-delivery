# Action and state contracts

Project: SENSU Digital — enterprise site and interaction studies. Output language: English public example; use the client-requested language for new projects.

## I01 · P01

**Role:** visitor

**Trigger:** Activate a service link

**Target:** route:/services

**States:** default / hover / pressed / focus / destination

**Feedback:** Current link and destination heading are visible.

**Motion:** Press response 100–160ms; restrained page reveal; reduced-motion immediate.

**Recovery:** Native link supports open-in-tab and browser history.

**Verify:** Open services using pointer and keyboard; verify URL, heading and Back.

## I02 · P08

**Role:** visitor

**Trigger:** Submit a valid consented inquiry

**Target:** api:POST /api/inquiries

**States:** editing / invalid / submitting / saved / recoverable error

**Feedback:** Immediate submitting label and duplicate protection; success only after persisted response; reference is selectable.

**Motion:** Short progress/success transition; focus the result after form replacement; no ordinary-business confetti.

**Recovery:** Preserve entered data on error; retry with the same idempotency key; reset returns focus to first field.

**Verify:** Submit, match reference in staff details and audit; test invalid fields, repeat, timeout uncertainty and reset focus.

## I03 · P10

**Role:** staff

**Trigger:** Submit credentials

**Target:** api:POST /api/login

**States:** editing / signing in / invalid / limited / authenticated

**Feedback:** Disable duplicate submission; show specific recovery; navigate only after session acknowledgment.

**Motion:** Restrained button press; error appears without layout jump; reduced-motion instant.

**Recovery:** Keep email; do not expose secret or stack trace; allow retry after limit.

**Verify:** Operate valid/invalid login and logout; anonymous admin API is rejected.

## I04 · P11

**Role:** admin

**Trigger:** Advance an inquiry to the next legal status

**Target:** api:PATCH /api/admin/inquiries/:id

**States:** new → in_progress → done; pending / conflict / forbidden / failure

**Feedback:** Keep reference and current status visible; update summary/details/audit from successful response.

**Motion:** Drawer spring 360/30, interruptible exit; restore focus to the originating detail action.

**Recovery:** Conflict fetches latest version before retry; failed writes retain confirmed state; read-only role cannot mutate.

**Verify:** Check two legal transitions, version conflict, audit actor/time, read-only 403 and dialog Escape/focus.

## I05 · P12

**Role:** visitor

**Trigger:** Complete the local review study

**Target:** local:completion

**States:** idle / pending / success / error / reset

**Feedback:** Explicit simulation; pending immediately; acknowledged success shrinks to a circle then draws check and emits ten decorative particles.

**Motion:** FLIP silhouette spring 360/30; check 200ms after 120ms; particles 420ms; reduced-motion no displacement/particles.

**Recovery:** Disable duplicate work; failed response retains review and provides retry; leaving study clears timer.

**Verify:** Observe pending before success; inject failure, retry, reset and keyboard completion.

## I06 · P12

**Role:** visitor

**Trigger:** Toggle a readiness item

**Target:** local:linked-progress

**States:** 0–4 completed; reversible

**Feedback:** Checkbox, ring, count and light top surface share one count.

**Motion:** Ring 280ms; numeric value 240ms; color 240ms. Retarget from current values; no per-frame React renders.

**Recovery:** Uncheck reverses all feedback; textual final count remains available with reduced motion.

**Verify:** Check/uncheck including rapid reversal; verify ring/count/text and zero/full states.

## I07 · P12

**Role:** visitor

**Trigger:** Open or gather the specification cards

**Target:** local:stack

**States:** gathered / expanding / open / gathering

**Feedback:** Expanded state and label match the card arrangement.

**Motion:** Spring 360/30; bounded 35ms ordering, reversed on gather; immediate reduced-motion layout.

**Recovery:** Repeat reverses existing motion; hidden cards are not focusable; toggle retains focus.

**Verify:** Rapidly open/gather; verify stable order, labels and no clipped text at phone width.

## I08 · P12

**Role:** visitor

**Trigger:** Scroll or move between workflow cards

**Target:** local:snap

**States:** scrolling / snapping / settled selection

**Feedback:** Timeline advances after settled center selection, not at the first scroll pixel.

**Motion:** Native scroll snap; prefer scrollend. Quiet fallback is only for browsers without it, requires released pointer/touch and center alignment within two CSS pixels; timeline draws 240ms after commit.

**Recovery:** Previous/next and Arrow/Home/End retain access; reduced-motion navigation scrolls instantly.

**Verify:** Scroll and use Next/End/Home; confirm centered card and timeline agree after settle.

## I09 · P12

**Role:** visitor

**Trigger:** Drag, key-select or choose a consultation slot

**Target:** local:wheel

**States:** dragging / settling / selected bounded slot

**Feedback:** Selected time commits at rest; visible/native alternatives remain available.

**Motion:** 44px tick; velocity projection 180ms; spring 240/29; 0.18 elasticity; bounded index 0–6.

**Recovery:** New drag stops old animation; Arrow/Home/End and select provide alternatives; reduced-motion instant selection. If reduced motion becomes active during a spring, stop it and immediately commit the bounded target.

**Verify:** Flick both ways and over bounds; interrupt settling; compare spinbutton, native select and selected-time text.

## I10 · P12

**Role:** visitor

**Trigger:** Choose Overview, Activity or Preferences

**Target:** local:radial-route

**States:** current view / entering view / settled

**Feedback:** URL query and active link identify actual content; Back/Forward restores selection.

**Motion:** Circle begins at input coordinates or keyboard trigger center; radius covers farthest corner; 380ms ease; reduced-motion instant. Keep the actual origin even when the tab is below the panel; remove clipping after settlement so resizing remains safe.

**Recovery:** Last navigation wins; old layer inert and hidden from accessibility; no hidden focus targets.

**Verify:** Operate all views, preference checkbox, rapid switch, keyboard Enter, Back/Forward and reduced motion.

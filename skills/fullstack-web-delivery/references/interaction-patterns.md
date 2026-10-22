# Purposeful advanced feedback

These are optional recipes chosen by the user's task. Six simultaneous effects are not a design system. Use native controls and scrolling first; use an existing animation library when choreography or physics needs it. Prefer transform/opacity, motion values and FLIP; do not run React state updates for every animation frame. Clip-path reveals are an explicit, bounded exception that require rendering-cost checks.

## 1. Completion morph, check and particles

Use for an occasional, meaningful completion. Input → visible press feedback (roughly 100–160ms) → pending → acknowledged success or recoverable failure. Keep the button DOM/focus stable. Morph its silhouette with FLIP or transform, then draw a normalized SVG check (about 180–220ms). A short bounded particle burst is optional and decorative. Never show success before the operation succeeds; a timed demo must say it is simulated. Disable duplicate work. Preserve content on failure; offer retry and reset. Clear pending timers/requests on unmount. Reduced motion shows the result immediately, without displacement or particles. Verify pending, success, failure, retry, duplicate input and focus.

## 2. Checklist with coordinated progress

Native checkbox → one completed-count state → ring, number and supporting surface. Animate related values together (roughly 200–280ms), with the newest input retargeting from the current value. Unchecking reverses all derived responses. Expose the final count as text; decorative rolling digits must not spam a live region. Reduced motion retains instant values. Verify zero/full, check/uncheck and rapid reversal; visual progress must never imply backend work that has not happened.

## 3. Reversible stacked cards

A semantic expand button owns aria-expanded and aria-controls. Preserve card identity and document order. Use transform-based offsets, a restrained spring and small ordered delays; reverse order when gathering. Reserve enough space for actual text and phone wrapping. A second input interrupts from the current position. Collapsed hidden content cannot contain active focus targets. Reduced motion changes layout immediately. Verify halfway reversal, focus, content clipping and long text.

## 4. Snapping cards with a settled timeline

Prefer a contained native scroll-snap region. Prefer genuine scrollend. Use a bounded quiet fallback only where that event is unavailable; require released pointer/touch and center alignment before committing the nearest card. A paused gesture is not settled. Draw only the line segments implied by that settled index; avoid a separate invented progress clock. Provide explicit previous/next and keyboard arrows/Home/End. Keep page touch scrolling outside the region. Reduced motion removes smooth navigation. Verify drag/scroll, settled center, disabled bounds and timeline agreement. A screenshot cannot establish settling behavior.

## 5. Bounded inertial wheel

Use when a small ordered choice benefits from physical manipulation; a native select remains the accessible alternative. Drag with a motion value; project release velocity to a tick, clamp to valid choices, then spring to rest. Commit the selected value when settled. New input stops the old animation; elastic overshoot never commits an invalid value. If reduced motion becomes active mid-spring, stop and immediately commit a bounded tick. Scope touch-action:none to the wheel, not the page. Include spinbutton value/text plus Arrow/Home/End; reduced motion uses immediate bounded selection. Verify both bounds, velocity, interruption, keyboard and select equivalence. Real-device feel and frame-rate claims require separate device/performance evidence.

## 6. Click-origin circular navigation

Use for occasional spatial transitions where location aids continuity. The new view must be a real route/history state, not a cosmetic overlay over unchanged content. Capture the trigger's coordinates relative to the destination panel; for keyboard input use the trigger center. Keep the true origin even outside the panel and remove the settled clip so resizing remains safe. Radius must cover the farthest corner. Animate a bounded circle reveal (roughly 300–400ms), with an inert, aria-hidden outgoing layer. Rapid input resolves to the newest destination. Preserve Back/Forward, modified-link clicks and meaningful focus. Reduced motion switches immediately or uses a short opacity change. Verify origin, destination, interruption, no hidden focus targets and history.

## Completion gate for every control

Every enabled control acts; every link reaches a supported destination; every asynchronous action distinguishes pending, confirmed result and failure. Specify disabled reasons, validation, duplicate prevention, uncertainty and recovery. Use immediate restrained feedback on routine work; reserve exceptional choreography for a justified moment. Animation alone never establishes a usable product.

The example's exact values are implementation choices, not universal presets. Derive new values from the client's task, element size and existing tokens. See official [Motion accessibility](https://motion.dev/docs/react-accessibility), [Motion drag](https://motion.dev/docs/react-drag), and [CSS Scroll Snap](https://www.w3.org/TR/css-scroll-snap-1/) for current behavior; verify APIs when changing libraries.

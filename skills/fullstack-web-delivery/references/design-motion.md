# UI, UX, and purposeful motion

Define region responsibilities, hierarchy, primary path, supporting information, feedback, and recovery. Components need applicable default, hover, focus, pressed, disabled, loading, success, and error states. Empty states explain why and offer a next step. Test realistic long names, mixed text, missing images, zero records, and large values.

Choose breakpoints from content. Inspect menus, local table scroll, drawers, sticky regions, touch targets, and keyboard behavior. Measure actual CSS widths. No page overflow is necessary but insufficient: primary phone state and action must be discoverable. Required fields need guidance and stable accessible labels; descriptions should not pollute field names.

Maintain an interaction contract for each applicable entrance: trigger, preconditions, pending state, success, failure, retry/cancel, keyboard/focus, touch, API/data, motion, and evidence. Define open/close, Escape, backdrop policy, focus entry/return, and replaced triggers. Check error/success/reset focus and wait for exit completion before asserting return focus.

First define the purpose of motion: hierarchy, arrival, feedback, continuity, direct manipulation, or explanation. Useful starting ranges are roughly 100-180ms for control feedback, 180-320ms for progressive arrival, and 180-300ms or a restrained spring for layers. These are design starting points, not universal pass thresholds. Record the actual library-supported parameters, interruption, exit, reentry, cleanup, and reduced-motion behavior.

Prefer transform/opacity where suitable. Preserve immediate usable content and allow interruption. Respect prefers-reduced-motion by removing unnecessary travel, looping, parallax, and overshoot while retaining a clear state. A screenshot cannot prove spring quality or frame rate; use operated scenarios or recordings where needed.

Compare matching screenshots for hierarchy, type, density, color, imagery, and responsiveness. Report specific differences rather than unexplained similarity scores. Automated detection covers only its checks. [WCAG2.2](https://www.w3.org/WAI/WCAG22/quickref/) can be a target; claim conformance only for actually audited scope.

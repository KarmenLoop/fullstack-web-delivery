## verdict

The current capture gate passes: all 15 explicitly supplied JPEGs open correctly, show the document top and complete page, and match their named study. Main captures are 1440×1007, 390×1204, and 1280×991; the study captures use the expected 1440/390 widths. The old PNGs were treated as initial-review history.

1. **Resolved — radial origin.** `InteractionLab.jsx:747–758` now preserves the actual panel-relative pointer position or keyboard trigger center without clamping. The radial desktop, phone, and 1280 captures show a fully revealed destination. The author record additionally reports a below-panel origin at y=323.328 for a 288px panel; that is author runtime evidence, not independent temporal acceptance.
2. **Resolved — snap settlement.** `InteractionLab.jsx:404–455` now rejects held pointer/touch input and card-center distances above 2px, prefers native `scrollend`, and enables the 160ms fallback only without that native event. Updated snap captures show a centered card, matching timeline, and settled status. The author record reports production Next reaching Design; paused native touch and held-pointer behavior remain NOT_RUN.
3. **Resolved — live reduced motion in the wheel.** `InteractionLab.jsx:564–574` now invalidates the previous completion ticket, stops the active control, sets a bounded tick directly, and updates selection and phase when reduced motion becomes active. Updated wheel captures show consistent visible time, native select, and status. The author record reports an in-flight switch settling to 12:00 with selected index 6; independent temporal verification remains unperformed.
4. **Resolved — banned eyebrows.** The current completion and snap captures begin directly with their content headings; every study explanation begins with its state-flow heading. Source removes the review-note, snap-phase, and interaction-contract labels. The headings retain clear hierarchy after removal.
5. **Resolved — action icon consistency.** Updated captures show drawn action arrows and stack controls; source uses Radix `ArrowTopRightIcon`, `ArrowUpIcon`, `ArrowDownIcon`, `PlusIcon`, and `MinusIcon`. The phone index hides its supporting SVG and visibly retains a compact two-column layout. Explanatory state-flow arrows remain ordinary notation.

No material regression from the correction batch is visible in the supplied recaptures or the source reviewed for these five fixes.

## remaining

Clear for the five scored corrections at the source-and-screenshot scope. The earlier failures and recovery notes remain present in `evidence/v0.5-browser.json`; its observations remain author-operated runtime evidence. Physical touch, paused native touch gestures, and held-pointer instrumentation remain NOT_RUN, and this reviewer performed no browser execution or detector rerun.

This ship covers the scored fixes, not the whole surface.

disposition: ship

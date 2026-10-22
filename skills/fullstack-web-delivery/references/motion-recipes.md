# Implement connected motion

Use the project's existing animation and component stack where appropriate. These recipes explain mechanisms; they do not require a new dependency. Persist the selected values and business boundaries in [the placement map](motion-placement.md). The bundled SENSU example is a runnable reference, not a visual template for every client.

## Scroll responsibilities

- **Reveal:** observe a section threshold, run one opacity/12px entrance, then disconnect. Keep the resting content visible before enhancement. Cancel the active animation and disconnect on unmount or a live change to reduced motion.
- **Linked progress:** derive a 0–1 value from the section's real scroll range; map it to transform scale or path progress. Reverse naturally when scrolling back. Keep timing-based entrances separate.
- **Parallax:** map that same range to a small decorative offset, such as +16px to -16px. Keep labels and controls stationary. Reduced motion removes depth movement.
- **Sticky:** use a bounded native sticky element inside its explanation section. Inspect overflow ancestors and available height. At narrow widths return context to normal flow.
- **Horizontal/snap:** use native overflow, proximity snap, a visible scrollbar and a focusable named region. Previous/Next use measured item positions and clamp endpoints. Preserve vertical wheel behavior. Add measured tail space when the last item otherwise cannot reach the intended start alignment; remeasure on resize. Verify last item, reverse navigation and keyboard scrolling.

Example CSS starting point:

    .rail { display: flex; overflow-x: auto; scroll-snap-type: x proximity; }
    .rail > article { flex: 0 0 min(22rem, 85vw); scroll-snap-align: start; }
    .context { position: sticky; top: 1.5rem; align-self: start; }
    @media (max-width: 48rem) { .context { position: static; } }
    @media (prefers-reduced-motion: reduce) { .rail { scroll-behavior: auto; } }

[Motion scroll values](https://motion.dev/docs/react-use-scroll) and [native CSS snap](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll_snap) document these different drivers.

## Authenticated orb and node check

Keep one stable native submit button and a clear accessible name. Idle/press acknowledges input; pending contracts the inner surface to a circle and may move decorative nodes. Disable duplicate submission. Only a successful real authentication response may rearrange nodes into a check and draw its path. Then commit the authenticated client state and navigate after a short bounded confirmation beat; reduced motion uses zero extra delay. An animation finishing cannot authenticate a user.

On failure restore the full control, retain inputs, explain recovery and focus the error. Clear timers and invalidate late responses on unmount. Decorative SVG stays hidden from assistive technology; a written live status carries the state. In the example, App.jsx owns the API-confirmed boundary and MotionPrimitives.jsx owns its presentation.

## Rolling counts

Use tabular digit tracks, with a fixed row height and transform offset derived from the current number. Expose the new accessible number immediately while visual digits settle. Unknown data displays a dash rather than an invented zero. Clamp the supported display range; reduced motion changes digits immediately. Selection, count and disclosure share the same loaded model.

## Command search and relationship response

Open Command+K / Ctrl+K immediately with a labeled button alternative. Focus the query, trap focus while open, support Escape and return focus to the opener or the selected destination. Start feedback before the network completes. Bound input, cancel obsolete requests and show errors, no-match and unsupported questions honestly.

A natural-language interface still needs a declared source and exact capability scope. The SENSU sample answers only a bounded English/Chinese user-access revocation question from a server-owned fictional policy. Other permission subjects return unsupported; no model or keyword match grants authority. Keep this read-only study separate from actual staff authorization. A successful result must also publish/recover its workspace model; protect it from a stale initial load error before offering a destination.

Render SVG relationships from source IDs and shared coordinates, with native HTML node buttons as the operable controls. Selecting a department updates one ID. That ID drives path drawing, a root-to-target light trace, matching count, heatmap and inline detail. No unrelated timer chain determines the selected entity. A reduced path shows the complete relationship immediately.

## Heatmap and yielding detail

Cell values determine color, accompanied by a legend and readable value table. Label synthetic activity. A short bounded wave introduces the newly selected data; it is not a continuous attention loop. Reduced motion shows final cells immediately.

Inline cards use stable keys, aria-expanded, an identified controlled region and normal-flow content. Neighbor cards yield through layout transforms rather than absolute overlays. Reversal starts from current geometry; focus stays on the relevant trigger. [Motion layout transitions](https://motion.dev/docs/react-motion-component) describe the layout mechanism used in the example.

## Card continuity and theme

Move one card identity between two actual slots, using a shared element/layout identifier. Support rapid reversal and one written destination status. A local animation study must identify its state as local; a real business move waits for its API result and audit contract.

Use semantic appearance tokens for page, panel, text, line, active, focus, diagram and error states, including portaled dialogs and native color-scheme. Persist only the intended local preference and handle unavailable storage. Preserve information hierarchy in both appearances. Theme motion must not delay the user's next action.

## Source guide

In the complete package, examples/sensu-enterprise/src/MotionAtlas.jsx implements selection, command recovery, relationship/heatmap, disclosures, scroll and card continuity; MotionPrimitives.jsx implements the orb/check and digits; App.jsx connects real authentication; server/access-demo.mjs and server/api.mjs provide the fictional read-only policy and bounded route. Inspect current source and runtime before adapting these mechanisms to a client's real business rules.

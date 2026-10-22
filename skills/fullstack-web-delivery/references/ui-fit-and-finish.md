# Match UI details to the reader and task

Read this after the brief is understood and when inspecting typography, nested surfaces, entrances, headings or elevation. Use [metallic surfaces](metallic-surfaces.md) only when a material study is justified. Preserve the client's industry, brand and core task.

## Record the match before styling

Produce UI-MATCH-SPEC.md with one record per relevant decision: page, optional action, element, audience/task, technique, adopt/defer/omit choice, reason, implementation, states, motion, fallback and verification. Include useful rejection decisions, such as omitting a reflective material from a dense administration table. These are design decisions; execution begins as NOT_RUN.

Choose the smallest treatment that improves reading, grouping, feedback or identity. Ordinary content needs craft, not a quota of effects. If a new material changes the visual direction materially, use the existing [visual decision workflow](visual-decisions.md). Reuse an already chosen layout for targeted polish.

## Five craft decisions

| Detail | Match it to | Implementation and limits | Verify |
| --- | --- | --- | --- |
| Tabular numerals | Counts, prices, clocks, changing percentages and numeric columns | Use the chosen typeface's lining/tabular figures; prose keeps its normal font. Reserve width for the expected sign, digit count, grouping, currency and decimal separators. Tabular digits alone do not prevent a 99-to-100 width change. | Compare 111/888, 9/10/100, negatives and localized values in the actual font after font loading; surrounding labels stay still. |
| Concentric radii | A rounded surface nested at a uniform inset | For aligned rounded rectangles, outer radius = inner radius + measured edge-to-edge inset. Include border thickness in that inset when applicable. Use shared tokens rather than unrelated radius guesses. Unequal insets, pills and elliptical corners need per-axis geometry or an optical correction. | Inspect padding and both corners at actual size and narrow widths; no pinched or overly loose corner gap. |
| Grouped stagger | A short hierarchy: heading, explanation, action; a newly arrived small group | Reveal related parts in reading order with opacity and short travel. Start around 25–50 ms offsets and cap the total ordering delay around 150–200 ms; adapt to context. Large tables and frequent actions update immediately. | Content is available before enhancement; action feedback starts at input; interrupted/repeated entry cannot stack queues; reduced motion resolves immediately. |
| Balanced headings | Short multi-line titles and section headings | Use a content-appropriate measure and text-wrap: balance as enhancement. Keep language metadata correct; test real translations. Do not hardcode line breaks for one screenshot. Browser balancing is not a guarantee that every language/width avoids a short final line. | Inspect actual copy at desktop/phone widths, longer translation, fallback font and enlarged text; no clipped or artificially forced heading. |
| Soft layered elevation | A raised panel, card or dialog that needs separation from its ground | Combine a faint near-contact shadow with a broader low-opacity shadow; align color/strength to the scene. Keep necessary input, error, focus, chart and high-contrast boundaries. In dark scenes, subtle edges or surface contrast may communicate depth better. | Test different grounds, light/dark and forced colors. Depth remains visible without a muddy halo; focus and errors remain unmistakable. |

Starter CSS; values must be adapted to the project:

    .metric {
      font-variant-numeric: lining-nums tabular-nums;
      display: inline-block;
      min-inline-size: 5ch;
      text-align: end;
    }
    .nested-surface {
      --inner-radius: 14px;
      --edge-inset: 12px;
      padding: var(--edge-inset);
      border-radius: calc(var(--inner-radius) + var(--edge-inset));
    }
    .nested-surface > .inner { border-radius: var(--inner-radius); }
    .heading { max-inline-size: 24ch; text-wrap: balance; }
    .raised {
      box-shadow: 0 1px 2px rgb(12 24 18 / 0.05),
                  0 8px 24px rgb(12 24 18 / 0.08);
    }
    @media (forced-colors: active) {
      .raised { box-shadow: none; border: 1px solid CanvasText; }
    }

The numeric width is a starting reserve, not a universal digit limit. The radius example assumes no extra border. Multiple shadow syntax, tabular figures and balanced wrapping are documented by [MDN numerals](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/font-variant-numeric), [text wrapping](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/text-wrap) and [shadows](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/box-shadow).

## Arrival is a sequence, not a blocked screen

Keep the resting content visible. On a relevant threshold, animate a small set of children from a short offset to their existing positions, using the current stack or Web Animations. Bound the group delay; data rows should not wait one by one. Track active animations, cancel on unmount and live reduced-motion change, and disconnect observers. Keep keyboard order equal to reading order. An entrance finishing never confirms a save, login or payment.

Match one local rhythm: a heading can lead its explanation and action; a fast repeated tool should respond immediately. Check [motion placement](motion-placement.md) for actual drivers and interruption contracts.

## A reusable implementation prompt

Fill these fields from the current project, then include them in the UI/UX prompt:

    Reader and task: [who needs to decide or do what]
    Page / element / optional action ID: [existing identifiers]
    Adopt / defer / omit: [technique and a task-specific reason]
    Typography / geometry / surface tokens: [actual values and relationships]
    Trigger and state owner: [input, scroll or confirmed data]
    Motion: [parts, order, maximum delay, interruption]
    Material route: [ordinary CSS / translucent CSS / optional WebGL]
    Fallback: [readable static content, reduced motion, coarse pointer, forced colors]
    Verification: [actual copy, numeric range, widths, fonts and recovery scenario]

Before expanding components, inspect the representative combination at its real size. Preserve matched decisions and observed defects separately; do not claim that a prompt or intact generated manifest proves visual quality.

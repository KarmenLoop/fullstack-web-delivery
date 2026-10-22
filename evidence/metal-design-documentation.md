# Metal card design documentation

## Overview

This record describes the implemented material study inside the incumbent SENSU MotionAtlas. The scope is the `Material` navigation anchor and the component between the scroll study and continuity study in `examples/sensu-enterprise/src/MotionAtlas.jsx`. It is an extension of the existing cream and forest interface, with an authored aluminium specimen as its focal object. It does not establish a new brand, visual world or repository-wide design system.

The surface follows the persisted Experience mode and direction in `docs/metal-card-brief.md`: the card leads, ordinary controls remain legible, and processing stages explain how the material is made. `PRODUCT.md` supplies the fictional SENSU context, incumbent identity and separation of source, screenshot, runtime and device evidence. There was no root `DESIGN.md` or `.impeccable/design.json` at this pass; neither is created by this scoped record.

### Evidence checked

The documentation pass read `PRODUCT.md`, `docs/metal-card-brief.md` and the latest `disposition: ship` section of `evidence/metal-finish-review.md`. It inspected `examples/sensu-enterprise/src/MetalCard.jsx`, `metal-card.css`, `metal/renderer.js`, `metal/math.mjs`, `metal/quad.vert.glsl`, `metal/blur.frag.glsl` and `metal/material.frag.glsl`, plus their integration in `MotionAtlas.jsx`. The inherited values were checked against `motion-atlas.css`, `styles.css` and `tokens.css` in the same source directory.

The three required current images were opened and compared with that source. Image dimensions were also read from the files.

| Capture | Image dimensions | Viewport evidence and visible result |
| --- | --- | --- |
| `.impeccable/review/metal-desktop.png` | 3024 × 1718 | The finish review records a 1512 × 772 CSS viewport. The heading, complete silver specimen, top wordmark, title, lower labels and caption are visible, with material controls beside it. |
| `.impeccable/review/metal-mobile-gpu.png` | 3024 × 1718 | The frame reports a 390 × 844 responsive viewport. The corrected capture includes the heading, full card and caption together; the renderer status and beginning of the controls follow below. |
| `.impeccable/review/metal-mobile-fallback.png` | 390 × 844 | The full neutral static specimen, readable copy, explicit WebGL2-unavailable status and beginning of the disabled control column remain visible. |

These are section viewport captures. The phone GPU recapture resolves the earlier crop finding in `evidence/metal-finish-review.md`; the earlier `disposition: recapture` remains historical. The excluded `.impeccable/review/metal-mobile.png` is not used here. The current finish review found no material fixes within its source/capture scope.

This documentation pass performed source and image inspection only. It did not run the browser, shaders, tests, GPU readback, context recovery, pointer timing or a physical device. The finish review's ship disposition and any supplied runtime reports keep their original scopes. A static image supports composition and visible state, not frame rate, temporal spring quality, recovery behavior or physical-device acceptance.

## Colors

The surrounding interface uses the existing atlas custom properties rather than a separate metal-card palette. The reviewed captures show the light theme; dark values below are source evidence only.

| Existing token | Light value | Dark value | Relationship in this extension |
| --- | --- | --- | --- |
| `--ma-bg` | `#f5f4ed` | `#121e19` | Atlas ground around the material section. |
| `--ma-panel` | `#fffef9` | `#1a2b22` | Native select background. |
| `--ma-ink` | `#193e32` | `#e3ebdc` | Heading, control labels, status, caption and diagnostic text. |
| `--ma-muted` | `#496256` | `#adc0b2` | Supporting explanation and pipeline detail. |
| `--ma-line` | `#cbd4c8` | `#41554a` | Native control and inherited button borders. |
| `--ma-soft` | `#e7ecdf` | `#253a2e` | Specimen stage, preview ground and report surface. |
| `--ma-accent` | `#28664c` | `#b8d98f` | Range and checkbox accent, inherited focus outline. |
| `--ma-active` | `#d9ecc3` | `#354d32` | Inherited enabled-button hover fill on fine pointers. |

The specimen has two local fixed colors in `metal-card.css`: dark copy (`#16251d`) and the static surface (`#c5cec8`). These belong to the material object, not the surrounding theme. The GPU face is computed from the reflected environment, a neutral base (`vec3(0.29, 0.31, 0.30)`), a reflection multiplier (`vec3(0.66, 0.65, 0.64)`), light and grain; a single flat silver swatch would misdescribe it.

`studioTexture()` authors both environments locally at 512 × 256. Cool studio starts from `#26352f` and uses pale lights (`#e8f3ec`, `#fbfcfa`, `#bbd5cc`); warm gallery starts from `#443a30` with warmer lights (`#ffe6b3`, `#f2eee2`, `#bfb9b0`). The vertical blur pass desaturates by 0.72 before the material samples it. Those colors describe the reflected scene, not new UI accents.

## Typography

The component inherits the existing `--font` stack from `tokens.css`: `"PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`. The base body is 15px with a 1.7 line height; the atlas overrides paragraph rhythm to 1.65. No new font asset or display family was introduced.

| Role | Implemented treatment | Responsive relationship |
| --- | --- | --- |
| Section heading | 28px, weight 550, line height 1.2, tracking −0.025em | 25px at the incumbent 600px breakpoint. |
| Section purpose | 14px, maximum 43ch | Moves beneath the heading at 600px. |
| Specimen title | `clamp(32px, 4.3vw, 60px)`, weight 550, line height 0.98, tracking −0.035em | `clamp(30px, 8vw, 48px)` at 760px; the explicit two-line title is retained. |
| Specimen wordmark | 13px, weight 650, tracking 0.01em; secondary text weight 450 | 11px at 760px. |
| Specimen lower labels | 12px | 10px at 760px. |
| Control legend | 18px, weight 550 | Same role in the stacked layout. |
| Status, labels and caption | 13px | Outputs and angles use tabular numerals and stay on one line. |
| Native select | 16px | Preserved at phone width. |
| Inherited action button | 14px, line height 1.4 | Wraps with its peers as needed. |
| Supporting explanation | 12px, line height 1.6 | Kept separate from the specimen title. |
| Pipeline caption | 13px, line height 1.4; detail 12px | Caption becomes 12px at 760px. |

The inherited system stack is recorded as implementation truth, not promoted into a new reusable display-font policy. The strong size contrast and two-line specimen title are visible in all three required captures.

## Layout

The material section inherits the atlas main container (maximum 1184px, centered, with 48px 40px 0 padding). At 600px the main padding becomes 28px 18px 0. The section starts with a direct heading and short explanation; the incumbent section-heading row has a 30px gap and 28px bottom margin, becoming a block with an 18px bottom margin at 600px.

The material workspace uses two columns: `minmax(0, 1.65fr)` for the specimen and `minmax(230px, 0.8fr)` for controls, separated by 40px. At 760px it becomes one column with a 24px gap, preserving specimen-before-controls DOM order. This is the relationship visible in the desktop and corrected phone GPU captures.

The specimen stage has 32px 20px 20px padding, reduced to 22px 12px 14px at 760px. Its stationary hit area fills the available width at a 1.586 aspect ratio. The card fills that area; only the inner card transforms. Copy padding is `clamp(20px, 3vw, 36px)`, fixed at 22px in the smaller layout. The caption sits 26px below the hit area.

The source, horizontal blur and vertical blur/desaturation previews form three equal columns. Their gap changes from 20px to 12px at 760px; each preview keeps a 2:1 ratio. They occur below the main workspace rather than competing with the specimen in its first viewport. Action buttons wrap with an 8px gap. Raw diagnostics appear only after the explicit GPU-check action.

## Elevation & Depth

Depth combines GPU surface shading with a separate layered CSS shadow. The shader renders a rounded-rectangle distance field, estimates its edge gradient and builds bevel normals. It rotates those normals using the same current angles as the CSS card, normalizes the view ray and samples the environment using the reflected ray. Stable spatial grain perturbs the normal and face; it is not a time-driven noise animation.

The renderer uses two distinct 512 × 256 RGBA8 framebuffer targets. Horizontal blur decodes source color into linear space; vertical blur consumes that result and applies desaturation. Each blur direction samples offsets from −8 through 8. The face shader encodes its output back to display color. The visible pipeline canvases are populated from the authored source and actual framebuffer readback in the implementation.

The card's initial stylesheet shadow is `0 2px 4px rgb(12 24 18 / 0.08), 0 24px 40px -16px rgb(12 24 18 / 0.28)`. Renderer painting replaces it with three softer layers. The main offset is `x = −cos(lightAngle) × 18 + rotateY × 1.2` and `y = sin(lightAngle) × 18 − rotateX × 1.2`; its opacity is `0.12 + lightPower × 0.1`. A wider layer scales the offset by 1.6 and adds 8px vertically. This projection responds to the same light controls and spring pose as the GPU face. It is a CSS approximation, with no ray-traced shadow or full-PBR claim.

The shader uses the CSS-pixel size of the specimen, a 28px corner radius, a default 14px bevel and a 1000px view-distance convention matching the hit area's 1000px CSS perspective. The rendering buffer follows the hit area with device-pixel ratio capped at 1.5. These are component rendering relationships, not general elevation tokens for other surfaces.

## Shapes

The object is a rounded rectangular specimen: 28px card corners, inherited by its canvas and static backing. The stage uses 16px corners. Selects, inherited buttons, pipeline previews and the report use 8px corners. The stage and report are tonal containers; the card's edge is expressed by its bevel and shading rather than an added decorative border.

Native selects retain a 1px atlas-line border, 8px 12px padding and a 44px minimum height. Buttons inherit a 1px border, 10px 14px padding and the same 44px minimum height. Range inputs have a 28px minimum height; the pointer-motion checkbox is 18px inside a label with a 44px minimum height. In forced colors, the canvas and static surface are hidden and the card becomes a `CanvasText` outline with readable `CanvasText` copy.

## Components

**The Shared Pose rule.** The two current spring angles drive CSS rotation, shader tilt and the displayed angle readout. Pointer mapping is clamped to ±6 degrees on each axis against the stable hit area. `springStep()` uses stiffness 180 and damping 24, caps elapsed time at 0.032 seconds and subdivides at 1/120 second. It snaps to target when distance is below 0.0001 and velocity below 0.001. These are source facts; this pass did not judge their temporal feel.

Fine-pointer movement is enabled only when hover and pointer capability match, reduced motion is off and the Pointer spring checkbox is on. Pointer leave or cancellation targets the neutral pose. Coarse-pointer, keyboard and reduced-motion paths keep a neutral card while the material controls remain available. Frames stop when settled, offscreen, hidden, lost or disposed; teardown disconnects observers and releases owned GPU resources.

**The Readable Specimen rule.** The wordmark, specimen title and lower labels remain semantic DOM content above the canvas. Diagnostic normal, reflection and light views hide that overlay visually and from accessibility output; the finished-material view restores it. The canvas itself is decorative to assistive technology. The static path retains the same DOM content, exposes renderer status and disables unavailable material controls rather than presenting a functioning GPU state.

Controls use native labels, selects, ranges and checkbox semantics. Defaults are Cool studio, Finished material, blur radius 2.8px, grain 0.035, light direction 135 degrees and intensity 0.75. Blur is bounded to 0–6 in 0.1 steps; grain to 0–0.08 in 0.005 steps; direction to 0–360 in 5-degree steps; intensity to 0–1.5 in 0.05 steps. Controls inherit the atlas focus outline (2px accent with a 4px offset). Fine-pointer button hover uses the existing active fill.

**The Inspectable Pipeline rule.** Source, horizontal and vertical/desaturation stages are named beneath their canvases. The explicit Check GPU pixels action compares actual readback hashes in the implementation; its report separates stage pixels, tilt, bevel, grain, light and GL error state. Context-loss testing is available only when the extension exists, with a restore action in the lost state and retry in the error state. These source paths describe the designed feedback and recovery contract; their runtime acceptance remains in the original execution evidence.

## Do's and Don'ts

- Do inherit atlas palette, typography, ordinary controls and focus treatment when extending this component.
- Do preserve one pose source for the CSS object, GPU reflection and angle readout.
- Do keep the specimen readable when the renderer is unavailable and retain an explicit renderer status.
- Do identify GPU highlights and reflection separately from the CSS shadow projection.
- Do distinguish the captured light-theme appearance from dark-theme source support, and responsive viewport evidence from physical-device acceptance.
- Do not turn the local material colors, card dimensions, shader parameters or shadow formula into repository-wide tokens.
- Do not treat a capture, a source path or the finish review's bounded ship disposition as a fresh runtime check.

Existing drift remains unmodified: `PRODUCT.md` still describes the extension through the 0.7 motion-atlas plan, while the material extension has its own current brief and source. The context loader also reported no incumbent visual implementation despite this nested example being present. These are context/discovery limits, not authority to replace the existing visual world. The inherited system-font display usage is described above without canonizing it as a new display policy. No incumbent file, global design artifact or runtime implementation was repaired by this documentation pass.

# Match UI finish to the task

Version 0.8.0 adds five craft rules and an optional reflective-material route to the portable skill and specification renderer. It updates instructions, filled contracts and documentation. The existing application runtime remains version 0.7.0; no new WebGL specimen or new browser acceptance is claimed.

## What the agent writes after discovery

The answered brief now produces 18 documents. [UI-MATCH-SPEC.md](generated/sensu/UI-MATCH-SPEC.md) records page/element, reader/task, optional action, technique, adopt/defer/omit choice, reason, implementation, states, motion, fallback and verification. Its filled decisions also appear directly in the [UI/UX prompt](generated/sensu/UI-UX-PROMPT.md), alongside the page/action and motion contracts. Generation still starts execution at NOT_RUN.

The agent fills these decisions from actual requirements and source inspection. The optional Python helper renders supplied decisions; it does not infer the client's taste, inspect a video, install a renderer or approve a design. Invalid page/action references, duplicate decision IDs, missing reasons/fallbacks and invalid choices are rejected before output writes. Static presentation may omit an action ID.

| Rule | Best match | Concrete constraint |
| --- | --- | --- |
| Tabular numerals | Metrics, prices, clocks and numeric columns | Use the actual font's tabular figures and reserve the expected formatted range; 99 -> 100 still needs room |
| Concentric radii | Uniformly inset rounded surfaces | Outer radius = inner radius + measured edge inset, including relevant border thickness; correct unequal geometry |
| Grouped stagger | A short hierarchy of heading, explanation and action | Small bounded offsets; immediate usable content, no long table or action queue |
| Balanced headings | Short multi-line headings | Content-appropriate measure, progressive balanced wrapping, real copy/language/font/width checks |
| Layered shadows | Raised cards and dialogs | Subtle contact/ambient depth; preserve necessary input, focus, error and high-contrast edges |

The [portable craft reference](../skills/fullstack-web-delivery/references/ui-fit-and-finish.md) contains starter CSS, adaptation criteria and verification. The populated example adopts these five rules as design contracts, defers a GPU material specimen and omits reflective tilt from inquiry rows. Those choices demonstrate fit by task, not verified new visual changes in this release.

## Reflective card implementation route

The [material reference](../skills/fullstack-web-delivery/references/metallic-surfaces.md) separates ordinary CSS, a CSS translucent/foil approximation, custom WebGL and an existing physically based renderer. The choice depends on the client's identity, content, frequency of use and device cost.

For the requested custom route, declare an authorized environment texture; prepare horizontal and vertical blur passes and a restrained desaturation/tint; construct bevel normals with stable surface grain; sample the environment using reflected view direction; and drive both card and reflection from the same bounded spring values. The reference gives the math contract, shared coordinate-space requirements and implementation decisions. It is a recipe, not a complete compiled renderer.

A CSS tilt and an independently moving highlight can disagree. The transform, view direction and material need a common convention. Semantic DOM content stays above the decorative canvas, with stable controls and readable static alternatives. Texture failure/CORS, unsupported or lost context, resize/DPR, reduced motion, coarse pointer, hidden/offscreen state and resource cleanup are part of the selected route's acceptance. An environment texture does not imply permission to capture the user's camera, screen or arbitrary DOM.

Relevant primary references are [numeric figures](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/font-variant-numeric), [wrapping](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/text-wrap), [shadow layers](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/box-shadow), [multipass image processing](https://webglfundamentals.org/webgl/lessons/webgl-image-processing-continued.html), [spring values](https://motion.dev/docs/react-use-spring) and [existing PBR material controls](https://threejs.org/docs/pages/MeshStandardMaterial.html). The craft and route-selection recommendations are this project's synthesis of the brief and those mechanisms.

## What was learned from the supplied video

The owner's approximately 31.323-second clip was inspected locally using 16 coarse frames and 16 denser samples. Visible moments include an opening capsule with arrow feedback and a growing circular stroke, perspective changes on translucent cards, a grouped card composition, an expanding/compressing photo strip, linked clock/map scenes and changing background palette. These appearances inform optional task matches below.

| Visible mechanism | Potential task | Required adaptation |
| --- | --- | --- |
| Opening capsule / growing circular stroke | An infrequent intentional entry or completed transition | Immediate action state, bounded duration, accessible focus/destination and reduced-motion alternative |
| Translucent cards / edge highlights | A small information or product specimen against a controlled ground | Keep text contrast, silhouette and a solid fallback; choose a material route explicitly |
| Grouped composition | Introduce related content without one moving slab | Follow reading order and cap total stagger |
| Photo strip expansion | Select and inspect a portfolio image | Stable selected identity, keyboard/touch access, caption and no hover-only information |
| Clock/map/palette coordination | Explain one selected place or scene | One authoritative selection; distinguish actual data from decorative atmosphere |

The original video's source implementation was not supplied. The user's metallic shader pipeline is recorded as a requested implementation approach; the clip alone does not establish that its author used that pipeline. No timing curve, exact frame rate, input latency or device performance was inferred as measured fact. Clip pixels, extracted frames, branding and personal text are not redistributed.

## Verify and adapt

Run the specification tests and repository checks, then inspect the generated decisions and prompt together. The [0.8 evidence](../evidence/v0.8-ui-matching-checks.json) separates this instruction/renderer work from the prior [running application evidence](verification.md). A future selected GPU implementation needs its own actual browser/device acceptance; a recipe or intact document manifest does not supply it.

## Later implementation

Version 0.9.0 adopts the separately requested reflective specimen in the motion atlas, including light/shadow controls and actual WebGL execution. Read [the material tutorial](metal-material-study.md) and [versioned verification](verification.md). The 0.8 generated design snapshot and its NOT_RUN traceability remain historical contracts; they are not silently rewritten as completed tests.

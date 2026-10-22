# Images, diagrams, and provenance

Historical study/capture record: **0.4.1 / 0.5.0 / 0.7.0 / 0.9.0**. The current release is **0.9.1**; its new browser capture is on the [project page](../README.md). The captures below retain their original scope and are not fresh acceptance of every feature.

The README media live in this repository, so a clone or release contains them without an external image host. Captures are taken from the English example in a real browser at measured CSS viewports. They show fictional test material, no passwords, and no real customer records.

| File | Purpose |
| --- | --- |
| images/website-desktop.png | Recorded 1440px English home view |
| images/website-mobile.png | Recorded 390px English home view |
| images/admin-desktop.png | Recorded 1440px staff workspace |
| images/admin-mobile.png | Recorded 390px record list |
| images/inquiry-receipt.png | Actual local receipt, matched to the staff record |
| images/workflow.svg | Authored overview of the documented workflow |

`examples/sensu-enterprise/public/assets/atrium.png` is the previously AI-generated architectural illustration used on the About page. It does not represent a real office, photographer's commission, or customer engagement. Its first-party distribution is governed by the repository's terms to the extent rights apply. Screenshots/diagrams use the same applicable notice; reference brands are not endorsements.

[Media evidence](../evidence/publication-browser.json) records the actual capture dimensions and observed results. Static images cannot prove spring motion, keyboard interaction, persistence, or backend enforcement; those checks are recorded separately. Images are visual evidence, not a claim that a human approved the design or an independent runtime reviewer operated it.


## Version 0.5 interaction captures

Recorded v0.5.0 `images/interaction-*.jpg` files are actual full-page captures of the production example after the five review corrections. Thirteen unique images cover six studies at 1440/390 CSS pixels and the actual 1280px preview width. Their exact dimensions and hashes are in [the capture manifest](../evidence/v0.5-captures.json). Keyboard-focus rings in some captures are intentional observed state. No generated mockup substitutes for the running interface.

The PNG files under `evidence/initial-interaction-review/` preserve earlier review inputs and are not the current interface. The independent [initial review](../evidence/interaction-finish-review.md) and [five-fix verdict](../evidence/interaction-finish-verdict.md) retain their distinct scopes. Reviewer entry copies under the ignored local `.impeccable/review` directory are excluded from source archives to avoid duplicates; current unique captures are public in docs/images.

## Version 0.7 motion captures

Four current JPEGs show actual browser states: light desktop, dark desktop, light phone and a dark command result. See [exact dimensions and hashes](../evidence/v0.7-captures.json). The command image is settled dialog-state evidence at a measured desktop viewport, not a second whole-site acceptance. Each image carries embedded capture provenance. Original owner video and extracted frames remain private and are excluded from all archives. Invalid/stale captures and the blank raw-CDP pending frame are excluded. Stills establish appearance/state only; they do not certify animation timing or frame rate.

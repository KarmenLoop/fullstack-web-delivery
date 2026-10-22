# Match and build reflective materials

Use this when the brief explicitly requests metal, brushed/frosted reflections, a material card or pointer-driven tilt. Choose a suitable isolated hero, product specimen or identity card. Dense forms, reading surfaces and operational records usually favor a simpler surface. Record the choice and reason in UI-MATCH-SPEC.md; reuse the existing stack and justify any new dependency.

## Separate the material routes

| Route | What it delivers | Appropriate cost |
| --- | --- | --- |
| Ordinary CSS | Semantic surface, nested radii, soft elevation and optional static highlight | Default when content and task need clarity |
| CSS translucency / foil approximation | Layered gradients, highlights and optional supported backdrop filtering | A light decorative treatment with readable solid fallback; no claim of physically sampled metal |
| Custom WebGL material | Explicit environment texture, roughened sample, bevel normals, grain and coupled reflection | A deliberate specimen whose visual value justifies GPU, lifecycle and testing work |
| Existing PBR renderer | Geometry, environment lighting, metalness/roughness and normal detail in the incumbent renderer | Prefer when the project already owns a 3D scene; a separate custom blur shader may be unnecessary |

A video can establish appearance and apparent sequence, not its original shader, library, exact curve or measured frame rate. Record the owner's requested pipeline as an implementation route, separately from what the clip visibly establishes. Preserve source media and keep it private unless redistribution is authorized.

## Custom pipeline

1. **Declare the environment source.** Use an authored/licensed image, an authorized supplied texture or the project's own rendered scene. A WebGL canvas cannot automatically read arbitrary DOM pixels or the user's surroundings. A live camera/screen capture is a different integration requiring its own authorization and controls. Handle image failure, CORS and orientation before enhancing the card. Keep semantic content available while loading.
2. **Prepare a rough reflection texture.** Decode color to the renderer's chosen working space. Apply horizontal then vertical blur in separate render targets; never sample the attachment currently being written. Normalize the kernel, update texel size after resize and clamp edges appropriately. Desaturate toward luminance to taste, then apply the intended tint. A softened monochrome image is one art-direction component, not a complete physical metal model. [Texture/FBO ping-pong](https://webglfundamentals.org/webgl/lessons/webgl-image-processing-continued.html) explains the multipass mechanism.
3. **Shape normals, not just color.** Use actual bevel geometry, a rounded-rectangle distance field or a normal map. Derive a smooth corner/edge transition, add small stable spatial grain, then normalize. Keep the grain tied to surface coordinates so it does not swim each frame. Flat center and bevel need different normal directions. Blurring color alone does not create a bevel.
4. **Sample the environment with reflection.** Compute the incident view direction and normal in the same space; reflected direction is I - 2 * dot(N, I) * N. Normalize the incident direction I = surfacePosition - cameraPosition and normalize N. Map that direction using the declared cube/equirectangular convention, then sample the prepared environment. In a 2D distortion approximation, explicitly call it an approximation and bound UV offsets. Roughness controls reflection softness; edge highlight, tint and subtle grain shape the visual finish.
5. **Give light and shadow distinct owners.** Define ambient reflection, directional face light, specular highlight and bevel edge response. Name light direction/intensity and roughness; keep highlights below a readable text layer. A soft shadow should move opposite the light, vary with elevation/pose and retain a near-contact layer. A CSS layered projection is a useful approximation for a DOM card, not a ray-traced GPU shadow. Avoid stacking unrelated animated gradients over a sampled material. Supply a light-only view when debugging and test opposite directions, zero intensity and dark grounds.
6. **Couple pointer and material.** Normalize pointer position relative to the current card bounds, clamp it, and set a bounded target such as +/- 4–7 degrees. One pair of spring values drives both the card transform and the shader's view/normal transform. A CSS-only tilt with an unrelated moving highlight will slide visibly. Reuse the same camera/projection convention or document the optical approximation. On leave/cancel, spring to neutral from the current value; new input retargets the existing spring. [Motion springs](https://motion.dev/docs/react-use-spring) provide an existing-stack option.

For an existing PBR route, use the renderer's environment, roughness and normal controls rather than pasting a second lighting system over it. [Three.js MeshStandardMaterial](https://threejs.org/docs/pages/MeshStandardMaterial.html) documents those responsibilities. Keep the same material vocabulary and apply the project's color-management configuration.

## Minimal math contract

These are mechanism equations, not a complete drop-in shader or a verified GPU implementation:

    // Blur pass: direction is (1, 0), then (0, 1).
    blurred(uv) = sum(weight[i] * source(uv + direction * texelSize * i));
    sum(weight) = 1;
    gray = dot(workingSpaceColor, vec3(0.2126, 0.7152, 0.0722));
    roughEnvironment = mix(workingSpaceColor, vec3(gray), desaturation);

    // Both incident view direction I and normal N use one coordinate space.
    I = normalize(surfacePosition - cameraPosition);
    N = normalize(bevelNormal + stableSurfaceGrain * grainStrength);
    reflected = I - 2.0 * dot(N, I) * N;
    reflectedColor = sampleEnvironment(reflected, roughness);

Declare how sampleEnvironment maps direction and chooses roughness filtering. Luminance coefficients assume a compatible linear working space. Gamma/transfer encoding happens at the appropriate input/output boundaries, not repeatedly between blur passes. In a PBR implementation use its established functions instead of substituting this illustrative contract.

## Pointer and lifecycle contract

Keep text, links and buttons in semantic DOM above a decorative canvas. The canvas is hidden from assistive technology and does not intercept their pointer events. Avoid transforming a hit target away from a pointer path so it jitters in and out of hover. Keyboard interaction stays stable; coarse-pointer/touch input keeps native scroll and gets a neutral/static material unless direct manipulation is actually required.

The motion owner stores target, current values and velocity; it does not update React state on every frame. Retarget without resetting velocity. Reduced motion stops decorative tilt and can render one static frame. Render while input, texture or size changes; stop once the spring settles, while offscreen or while the page is hidden. Resume from current state rather than advancing through hidden elapsed time.

Choose and measure a per-component pixel/resource budget, with capped device-pixel ratio and reduced-resolution blur targets as starting options. Inspect target completeness and compile errors. On unsupported WebGL, missing texture or context loss, show the solid/CSS fallback while DOM content keeps working. Define restoration explicitly. Release owned listeners, animation callbacks, buffers, programs, textures and render targets on teardown. [WebGL practice guidance](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/WebGL_best_practices) covers resource and platform constraints; it does not certify this component.

## Material prompt and acceptance

Fill in the current project's reader/task, placement, brand, material route, environment source/license, silhouette/insets, bevel scale, roughness/grain/tint, light direction/intensity, face/bevel highlights, shadow mechanism and pose response, shared tilt/view transform, input range, spring values, static fallback, accessibility and resource budget. Keep actual content and actions crisp; the shader carries atmosphere.

Verify neutral and extreme input, leave/cancel, rapid reentry, resize/DPR, long text, light/dark grounds, keyboard/focus, coarse pointer, live reduced motion, image/CORS failure, unavailable/lost context, offscreen/hidden-page stop, restoration and teardown. Measure frame time on actual target hardware before claiming performance. A still, source review or shader recipe cannot prove smoothness or device compatibility.

## Working example and evidence boundary

The repository example implements this route in `examples/sensu-enterprise/src/MetalCard.jsx` and `src/metal/`. Its authored 512x256 studio/gallery panorama enters a 17-tap normalized Gaussian horizontal target, then a vertical/desaturation target. Input is decoded to linear color; final output is encoded once. RGBA8 targets and the custom highlight are an LDR art-directed model, not a complete PBR/HDR renderer. A 28px rounded-distance-field silhouette, 14px bevel and stable grain shape normalized reflection normals.

One mass-1, stiffness-180, damping-24 spring drives bounded +/-6 degree tilt and material rotation with the same 1000px perspective convention. A stable hit area prevents hover jitter. Light direction/intensity affect GPU face/highlight response; a separately documented CSS projection supplies contact and cast-shadow layers. Render only on changes or while the spring settles; cap backing DPR at 1.5.

`Check GPU pixels` reads the real two targets and compares material pixels under tilt, bevel, grain and opposite light fixtures. Save the report through the UI. These checks show execution and changed output, not aesthetic fidelity, temporal smoothness or measured performance. Test context loss/restoration, native controls, actual pointer retargeting and static alternatives separately. The standalone Skill archive includes this contract; the complete repository archive includes the runnable example.

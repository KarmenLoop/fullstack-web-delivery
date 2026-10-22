// Copyright (c) 2026 KarmenLoop. All rights reserved.
import vertex from "./quad.vert.glsl?raw";
import blur from "./blur.frag.glsl?raw";
import material from "./material.frag.glsl?raw";
import { springStep, pixelHash } from "./math.mjs";

const EW = 512,
  EH = 256;
const rad = Math.PI / 180;
function studioTexture(scene) {
  const canvas = document.createElement("canvas");
  canvas.width = EW;
  canvas.height = EH;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = scene === "gallery" ? "#443a30" : "#26352f";
  ctx.fillRect(0, 0, EW, EH);
  const lights =
    scene === "gallery"
      ? [
          [90, 130, 90, 240, "#ffe6b3"],
          [320, 105, 130, 100, "#f2eee2"],
          [465, 180, 30, 210, "#bfb9b0"],
        ]
      : [
          [65, 110, 35, 220, "#e8f3ec"],
          [250, 110, 125, 230, "#fbfcfa"],
          [435, 150, 35, 180, "#bbd5cc"],
        ];
  for (const [x, y, width, height, color] of lights) {
    const glow = ctx.createRadialGradient(
      x,
      y,
      0,
      x,
      y,
      Math.max(width, height),
    );
    glow.addColorStop(0, color);
    glow.addColorStop(0.55, color + "88");
    glow.addColorStop(1, color + "00");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, EW, EH);
    ctx.fillStyle = color;
    ctx.fillRect(x - width / 2, y - height / 2, width, height);
  }
  return canvas;
}
function program(gl, fragment, resources) {
  const shaders = [];
  try {
    for (const [type, source] of [
      [gl.VERTEX_SHADER, vertex],
      [gl.FRAGMENT_SHADER, fragment],
    ]) {
      const shader = gl.createShader(type);
      shaders.push(shader);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
        throw new Error(gl.getShaderInfoLog(shader));
    }
    const p = gl.createProgram();
    resources.programs.push(p);
    shaders.forEach((s) => gl.attachShader(p, s));
    gl.linkProgram(p);
    if (!gl.getProgramParameter(p, gl.LINK_STATUS))
      throw new Error(gl.getProgramInfoLog(p));
    return p;
  } finally {
    shaders.forEach((s) => gl.deleteShader(s));
  }
}

export function createMetalRenderer({
  canvas,
  card,
  hitbox,
  previews,
  angles,
  onStatus,
}) {
  const gl = canvas.getContext("webgl2", {
    alpha: true,
    antialias: false,
    premultipliedAlpha: false,
  });
  if (!gl)
    throw new Error(
      "WebGL2 is unavailable. The static surface remains usable.",
    );
  let resources,
    blurProgram,
    materialProgram,
    vao,
    environment,
    horizontal,
    vertical,
    extension;
  let sourceCanvas,
    frame = 0,
    lastTime = 0,
    disposed = false,
    lost = false,
    visible = true;
  let motionEnabled = true,
    drawCount = 0,
    width = 600,
    height = 378;
  let target = [0, 0],
    current = [0, 0],
    velocity = [0, 0];
  let settings = {
    environment: "studio",
    roughness: 2.8,
    grain: 0.035,
    view: 0,
    lightAngle: 135,
    lightPower: 0.75,
  };
  let pointerEvents = 0;

  function texture() {
    const tex = gl.createTexture();
    resources.textures.push(tex);
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    return tex;
  }
  function targetTexture() {
    const tex = texture();
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA8,
      EW,
      EH,
      0,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      null,
    );
    const fbo = gl.createFramebuffer();
    resources.framebuffers.push(fbo);
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    gl.framebufferTexture2D(
      gl.FRAMEBUFFER,
      gl.COLOR_ATTACHMENT0,
      gl.TEXTURE_2D,
      tex,
      0,
    );
    if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) !== gl.FRAMEBUFFER_COMPLETE)
      throw new Error("A blur framebuffer is incomplete.");
    return { tex, fbo };
  }
  function bind(p, tex, fbo, w, h) {
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    gl.viewport(0, 0, w, h);
    gl.useProgram(p);
    gl.bindVertexArray(vao);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, tex);
  }
  function draw() {
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    drawCount++;
  }
  function read(fbo, w, h) {
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    const bytes = new Uint8Array(w * h * 4);
    gl.readPixels(0, 0, w, h, gl.RGBA, gl.UNSIGNED_BYTE, bytes);
    return bytes;
  }
  function preview(target, bytes) {
    const image = new ImageData(EW, EH);
    const encode = (x) =>
      Math.round(
        255 *
          (x <= 0.0031308 ? x * 12.92 : 1.055 * Math.pow(x, 1 / 2.4) - 0.055),
      );
    // Render-target bottom row becomes canvas top row for the environment convention.
    for (let i = 0; i < bytes.length; i += 4) {
      image.data[i] = encode(bytes[i] / 255);
      image.data[i + 1] = encode(bytes[i + 1] / 255);
      image.data[i + 2] = encode(bytes[i + 2] / 255);
      image.data[i + 3] = 255;
    }
    target.width = EW;
    target.height = EH;
    target.getContext("2d").putImageData(image, 0, 0);
  }
  function prepare() {
    sourceCanvas = studioTexture(settings.environment);
    gl.bindTexture(gl.TEXTURE_2D, environment);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      sourceCanvas,
    );
    bind(blurProgram, environment, horizontal.fbo, EW, EH);
    const uniform = (name) => gl.getUniformLocation(blurProgram, name);
    gl.uniform1i(uniform("uSource"), 0);
    gl.uniform2f(uniform("uTexel"), 1 / EW, 1 / EH);
    gl.uniform1f(uniform("uSigma"), settings.roughness);
    gl.uniform2f(uniform("uDirection"), 1, 0);
    gl.uniform1i(uniform("uDecode"), 1);
    gl.uniform1f(uniform("uDesaturate"), 0);
    draw();
    bind(blurProgram, horizontal.tex, vertical.fbo, EW, EH);
    gl.uniform2f(uniform("uDirection"), 0, 1);
    gl.uniform1i(uniform("uDecode"), 0);
    gl.uniform1f(uniform("uDesaturate"), 0.72);
    draw();
    previews[0].width = EW;
    previews[0].height = EH;
    previews[0].getContext("2d").drawImage(sourceCanvas, 0, 0);
    preview(previews[1], read(horizontal.fbo, EW, EH));
    preview(previews[2], read(vertical.fbo, EW, EH));
  }
  function render(tilt = current, grain = settings.grain, bevel = 14) {
    if (disposed || lost) return;
    bind(materialProgram, vertical.tex, null, canvas.width, canvas.height);
    const u = (name) => gl.getUniformLocation(materialProgram, name);
    gl.uniform1i(u("uEnvironment"), 0);
    gl.uniform2f(u("uSize"), width, height);
    gl.uniform2f(u("uTilt"), tilt[0] * rad, tilt[1] * rad);
    gl.uniform1f(u("uRadius"), 28);
    gl.uniform1f(u("uBevel"), bevel);
    gl.uniform1f(u("uGrain"), grain);
    gl.uniform3f(
      u("uLight"),
      Math.cos(settings.lightAngle * rad) * 0.8,
      Math.sin(settings.lightAngle * rad) * 0.8,
      1,
    );
    gl.uniform1f(u("uLightPower"), settings.lightPower);
    gl.uniform1f(u("uRoughness"), settings.roughness);
    gl.uniform1i(u("uView"), settings.view);
    draw();
    canvas.dataset.draws = String(drawCount);
    canvas.dataset.tilt = tilt.map((v) => v.toFixed(3)).join(",");
  }
  function paint() {
    card.style.transform =
      "rotateX(" + current[0] + "deg) rotateY(" + current[1] + "deg)";
    // A layered CSS projection complements the GPU surface. It is not a ray-traced shadow.
    const sx = -Math.cos(settings.lightAngle * rad) * 18 + current[1] * 1.2;
    const sy = Math.sin(settings.lightAngle * rad) * 18 - current[0] * 1.2;
    const opacity = 0.12 + settings.lightPower * 0.1;
    card.style.boxShadow =
      "0 2px 4px rgb(12 24 18 / 0.10), " +
      sx.toFixed(1) +
      "px " +
      sy.toFixed(1) +
      "px 32px -10px rgb(12 24 18 / " +
      opacity +
      "), " +
      (sx * 1.6).toFixed(1) +
      "px " +
      (sy * 1.6 + 8).toFixed(1) +
      "px 54px -18px rgb(12 24 18 / " +
      opacity * 0.7 +
      ")";
    angles.textContent =
      current[0].toFixed(1) + "° / " + current[1].toFixed(1) + "°";
    render();
  }
  function active() {
    return visible && !document.hidden && !lost && !disposed;
  }
  function tick(time) {
    frame = 0;
    if (!active()) return;
    const dt = lastTime ? (time - lastTime) / 1000 : 1 / 60;
    lastTime = time;
    for (let axis = 0; axis < 2; axis++)
      [current[axis], velocity[axis]] = springStep(
        current[axis],
        velocity[axis],
        target[axis],
        dt,
      );
    paint();
    if (
      velocity.some((v) => v !== 0) ||
      current.some((v, i) => v !== target[i])
    )
      schedule();
    else {
      lastTime = 0;
      canvas.dataset.animating = "false";
    }
  }
  function schedule() {
    if (!frame && active()) {
      canvas.dataset.animating = "true";
      frame = requestAnimationFrame(tick);
    }
  }
  function stop() {
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
    lastTime = 0;
    canvas.dataset.animating = "false";
  }
  function resize() {
    const rect = hitbox.getBoundingClientRect();
    width = Math.max(1, rect.width);
    height = Math.max(1, rect.height);
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    if (!lost) paint();
  }
  function release() {
    if (!resources || lost) return;
    resources.textures.forEach((t) => gl.deleteTexture(t));
    resources.framebuffers.forEach((f) => gl.deleteFramebuffer(f));
    resources.programs.forEach((p) => gl.deleteProgram(p));
    resources.buffers.forEach((b) => gl.deleteBuffer(b));
    if (vao) gl.deleteVertexArray(vao);
  }
  function initialize() {
    resources = { textures: [], framebuffers: [], programs: [], buffers: [] };
    blurProgram = program(gl, blur, resources);
    materialProgram = program(gl, material, resources);
    vao = gl.createVertexArray();
    gl.bindVertexArray(vao);
    const buffer = gl.createBuffer();
    resources.buffers.push(buffer);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW,
    );
    for (const p of [blurProgram, materialProgram]) {
      const location = gl.getAttribLocation(p, "aPosition");
      gl.enableVertexAttribArray(location);
      gl.vertexAttribPointer(location, 2, gl.FLOAT, false, 0, 0);
    }
    environment = texture();
    horizontal = targetTexture();
    vertical = targetTexture();
    gl.disable(gl.DEPTH_TEST);
    gl.disable(gl.BLEND);
    extension = gl.getExtension("WEBGL_lose_context");
    prepare();
    resize();
    const error = gl.getError();
    if (error !== gl.NO_ERROR)
      throw new Error("WebGL initialization error " + error);
    onStatus({
      state: "ready",
      message: "WebGL2 ready · two linked programs · two complete blur targets",
      canLose: !!extension,
    });
  }
  function onLost(event) {
    event.preventDefault();
    lost = true;
    stop();
    target = [0, 0];
    current = [0, 0];
    velocity = [0, 0];
    angles.textContent = "0.0° / 0.0°";
    card.style.transform = "none";
    onStatus({
      state: "lost",
      message:
        "Context lost. Static content is available; restore to rebuild GPU resources.",
      canLose: !!extension,
    });
  }
  function onRestored() {
    lost = false;
    try {
      initialize();
      schedule();
    } catch (error) {
      stop();
      release();
      onStatus({ state: "error", message: error.message, canLose: false });
    }
  }
  function onVisibility() {
    if (document.hidden) stop();
    else schedule();
  }
  canvas.addEventListener("webglcontextlost", onLost);
  canvas.addEventListener("webglcontextrestored", onRestored);
  document.addEventListener("visibilitychange", onVisibility);
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(hitbox);
  const intersection = new IntersectionObserver((entries) => {
    visible = entries[0].isIntersecting;
    if (!visible) stop();
    else schedule();
  });
  intersection.observe(hitbox);
  try {
    initialize();
  } catch (error) {
    disposed = true;
    stop();
    release();
    resizeObserver.disconnect();
    intersection.disconnect();
    canvas.removeEventListener("webglcontextlost", onLost);
    canvas.removeEventListener("webglcontextrestored", onRestored);
    document.removeEventListener("visibilitychange", onVisibility);
    throw error;
  }
  return {
    setTarget(next) {
      pointerEvents++;
      if (motionEnabled && !lost) {
        target = next;
        schedule();
      }
    },
    neutral() {
      target = [0, 0];
      schedule();
    },
    setMotion(enabled) {
      motionEnabled = enabled;
      if (!enabled) {
        stop();
        target = [0, 0];
        current = [0, 0];
        velocity = [0, 0];
        paint();
      }
    },
    update(next) {
      const needsPrepare =
        next.environment !== settings.environment ||
        next.roughness !== settings.roughness;
      settings = { ...settings, ...next };
      if (!lost) {
        if (needsPrepare) prepare();
        paint();
      }
    },
    lose() {
      extension?.loseContext();
    },
    restore() {
      extension?.restoreContext();
    },
    inspect() {
      if (lost || disposed)
        throw new Error("Restore WebGL before checking pixels.");
      const h = read(horizontal.fbo, EW, EH),
        v = read(vertical.fbo, EW, EH);
      const savedView = settings.view;
      settings.view = 0;
      const capture = (tilt, grain, bevel) => {
        render(tilt, grain, bevel);
        return pixelHash(read(null, canvas.width, canvas.height));
      };
      const base = capture([0, 0], 0, 14),
        tilted = capture([5, -6], 0, 14);
      const flat = capture([0, 0], 0, 0),
        grained = capture([0, 0], 0.065, 14);
      const savedLight = [settings.lightAngle, settings.lightPower];
      settings.lightAngle = 35;
      settings.lightPower = 1;
      const lightA = capture([0, 0], 0, 14);
      settings.lightAngle = 215;
      const lightB = capture([0, 0], 0, 14);
      [settings.lightAngle, settings.lightPower] = savedLight;
      settings.view = savedView;
      paint();
      const result = {
        api: "WebGL2",
        runtime: {
          visible,
          documentHidden: document.hidden,
          pointerEvents,
          motionEnabled,
        },
        springAngles: [...current],
        targetAngles: [...target],
        environment: "Authored " + settings.environment + " panorama, 512x256",
        programsLinked: 2,
        framebuffersComplete: 2,
        blurAxes: [
          [1, 0],
          [0, 1],
        ],
        stagePixels: {
          horizontal: pixelHash(h),
          verticalDesaturated: pixelHash(v),
          different: pixelHash(h) !== pixelHash(v),
        },
        materialPixels: {
          base,
          tilted,
          flat,
          grained,
          lightA,
          lightB,
          tiltChangesPixels: base !== tilted,
          bevelChangesPixels: base !== flat,
          grainChangesPixels: base !== grained,
          lightChangesPixels: lightA !== lightB,
        },
        lighting: {
          angle: settings.lightAngle,
          power: settings.lightPower,
          shadow:
            "Layered CSS projection driven by light direction and spring pose",
        },
        drawingBuffer: [canvas.width, canvas.height],
        cssCard: [width, height],
        viewport: [window.innerWidth, window.innerHeight],
        pageWidth: document.documentElement.scrollWidth,
        devicePixelRatio: window.devicePixelRatio,
        spring: {
          current: [...current],
          target: [...target],
          velocity: [...velocity],
          motionEnabled,
        },
        glError: gl.getError(),
        drawCount,
      };
      result.passed =
        result.stagePixels.different &&
        result.materialPixels.tiltChangesPixels &&
        result.materialPixels.bevelChangesPixels &&
        result.materialPixels.grainChangesPixels &&
        result.materialPixels.lightChangesPixels &&
        result.glError === 0;
      return result;
    },
    dispose() {
      disposed = true;
      stop();
      resizeObserver.disconnect();
      intersection.disconnect();
      canvas.removeEventListener("webglcontextlost", onLost);
      canvas.removeEventListener("webglcontextrestored", onRestored);
      document.removeEventListener("visibilitychange", onVisibility);
      release();
    },
  };
}

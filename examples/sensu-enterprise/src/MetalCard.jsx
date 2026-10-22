// Copyright (c) 2026 KarmenLoop. All rights reserved.
import React, { useEffect, useRef, useState } from "react";
import { createMetalRenderer } from "./metal/renderer.js";
import { pointerTarget } from "./metal/math.mjs";
import { useMotionPreference } from "./useMotionPreference.js";
import "./metal-card.css";

export default function MetalCard() {
  const canvas = useRef(null),
    card = useRef(null),
    hitbox = useRef(null),
    angles = useRef(null);
  const raw = useRef(null),
    horizontal = useRef(null),
    vertical = useRef(null),
    renderer = useRef(null);
  const [status, setStatus] = useState({
    state: "loading",
    message: "Preparing the local environment texture.",
    canLose: false,
  });
  const [environment, setEnvironment] = useState("studio"),
    [roughness, setRoughness] = useState(2.8);
  const [grain, setGrain] = useState(0.035),
    [view, setView] = useState(0),
    [report, setReport] = useState(null);
  const [lightAngle, setLightAngle] = useState(135),
    [lightPower, setLightPower] = useState(0.75);
  const [retry, setRetry] = useState(0),
    [motion, setMotion] = useState(true),
    [fine, setFine] = useState(false);
  const reduced = useMotionPreference();
  useEffect(() => {
    const media = matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setFine(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    let live = true;
    try {
      renderer.current = createMetalRenderer({
        canvas: canvas.current,
        card: card.current,
        hitbox: hitbox.current,
        angles: angles.current,
        previews: [raw.current, horizontal.current, vertical.current],
        onStatus: (next) => {
          if (live) {
            setStatus(next);
            setReport(null);
          }
        },
      });
    } catch (error) {
      setStatus({ state: "error", message: error.message, canLose: false });
    }
    return () => {
      live = false;
      renderer.current?.dispose();
      renderer.current = null;
    };
  }, [retry]);
  useEffect(() => {
    renderer.current?.update({
      environment,
      roughness,
      grain,
      view,
      lightAngle,
      lightPower,
    });
    setReport(null);
  }, [environment, roughness, grain, view, lightAngle, lightPower, retry]);
  useEffect(
    () => renderer.current?.setMotion(motion && fine && !reduced),
    [motion, fine, reduced, retry],
  );
  const ready = status.state === "ready";
  function inspect() {
    try {
      setReport(renderer.current.inspect());
    } catch (error) {
      setReport({ passed: false, error: error.message });
    }
  }
  function saveReport() {
    const url = URL.createObjectURL(
      new Blob([JSON.stringify(report, null, 2)], { type: "application/json" }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = "sensu-metal-gpu-report.json";
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return (
    <section id="material" className="ma-section metal-study">
      <div className="ma-section-heading">
        <h2>Light becomes a material.</h2>
        <p>
          Move across the card. Reflection, edge light and shadow follow its
          pose.
        </p>
      </div>
      <div className="metal-workspace">
        <div className="metal-experience">
          <div
            ref={hitbox}
            className="metal-hitbox"
            onPointerMove={(event) => {
              if (event.pointerType !== "touch" && fine && !reduced && motion)
                renderer.current?.setTarget(
                  pointerTarget(
                    event.clientX,
                    event.clientY,
                    hitbox.current.getBoundingClientRect(),
                  ),
                );
            }}
            onPointerLeave={() => renderer.current?.neutral()}
            onPointerCancel={() => renderer.current?.neutral()}
          >
            <div
              ref={card}
              className={"metal-card" + (!ready ? " metal-fallback" : "")}
            >
              <div className="metal-static-surface" aria-hidden="true" />
              <canvas
                ref={canvas}
                className="metal-canvas"
                aria-hidden="true"
              />
              <div
                className="metal-content"
                aria-hidden={ready && view !== 0}
                style={{ opacity: ready && view !== 0 ? 0 : 1 }}
              >
                <span className="metal-wordmark">
                  SENSU <span>Surface studio</span>
                </span>
                <div className="metal-title">
                  Brushed
                  <br />
                  aluminium.
                </div>
                <div className="metal-card-bottom">
                  <span>Material specimen</span>
                  <span>Light / grain / form</span>
                </div>
              </div>
            </div>
          </div>
          <div className="metal-caption">
            <span>
              {view === 1
                ? "Rotated bevel normals"
                : view === 2
                  ? "Sampled environment reflection"
                  : view === 3
                    ? "Directional light and bevel highlights"
                    : "Authored aluminium study"}
            </span>
            <span ref={angles} className="metal-angles">
              0.0° / 0.0°
            </span>
          </div>
          <p className="ma-small">
            {!ready
              ? "Static surface. Material controls resume when WebGL2 is available."
              : reduced
                ? "Reduced motion: neutral pose. Light controls remain available."
                : !fine
                  ? "Touch and keyboard keep a neutral surface. Use the controls to inspect it."
                  : motion
                    ? "Move to tilt; leave to settle. The hit area stays still."
                    : "Pointer motion paused. Material controls remain available."}
          </p>
        </div>
        <div className="metal-controls">
          <p
            role="status"
            className="metal-status"
            data-renderer-state={status.state}
          >
            {status.message}
          </p>
          <fieldset disabled={!ready}>
            <legend>Material controls</legend>
            <label htmlFor="metal-environment">Environment</label>
            <select
              id="metal-environment"
              value={environment}
              onChange={(e) => setEnvironment(e.target.value)}
            >
              <option value="studio">Cool studio</option>
              <option value="gallery">Warm gallery</option>
            </select>
            <label htmlFor="metal-view">View</label>
            <select
              id="metal-view"
              value={view}
              onChange={(e) => setView(Number(e.target.value))}
            >
              <option value={0}>Finished material</option>
              <option value={1}>Bevel normals</option>
              <option value={2}>Reflection only</option>
              <option value={3}>Light only</option>
            </select>
            <label htmlFor="metal-roughness">
              Blur radius <output>{roughness.toFixed(1)} px</output>
            </label>
            <input
              id="metal-roughness"
              type="range"
              min="0"
              max="6"
              step="0.1"
              value={roughness}
              onChange={(e) => setRoughness(Number(e.target.value))}
            />
            <label htmlFor="metal-grain">
              Surface grain <output>{grain.toFixed(3)}</output>
            </label>
            <input
              id="metal-grain"
              type="range"
              min="0"
              max="0.08"
              step="0.005"
              value={grain}
              onChange={(e) => setGrain(Number(e.target.value))}
            />
            <label htmlFor="metal-light-angle">
              Light direction <output>{lightAngle}°</output>
            </label>
            <input
              id="metal-light-angle"
              type="range"
              min="0"
              max="360"
              step="5"
              value={lightAngle}
              onChange={(e) => setLightAngle(Number(e.target.value))}
            />
            <label htmlFor="metal-light-power">
              Light intensity <output>{lightPower.toFixed(2)}</output>
            </label>
            <input
              id="metal-light-power"
              type="range"
              min="0"
              max="1.5"
              step="0.05"
              value={lightPower}
              onChange={(e) => setLightPower(Number(e.target.value))}
            />
            <label className="metal-motion-check">
              <input
                type="checkbox"
                checked={motion}
                onChange={(e) => setMotion(e.target.checked)}
              />
              Pointer spring
            </label>
          </fieldset>
          <div className="metal-actions">
            <button type="button" onClick={inspect} disabled={!ready}>
              Check GPU pixels
            </button>
            {status.state === "lost" ? (
              <button
                type="button"
                onClick={() => renderer.current?.restore()}
                disabled={!status.canLose}
              >
                Restore WebGL
              </button>
            ) : (
              <button
                type="button"
                onClick={() => renderer.current?.lose()}
                disabled={!ready || !status.canLose}
              >
                Test context loss
              </button>
            )}
            {status.state === "error" && (
              <button
                type="button"
                onClick={() => {
                  setStatus({
                    state: "loading",
                    message: "Retrying the renderer.",
                    canLose: false,
                  });
                  setRetry((v) => v + 1);
                }}
              >
                Retry renderer
              </button>
            )}
          </div>
        </div>
      </div>
      <p className="ma-small metal-light-note">
        Directional light shapes the face and bevel. A soft, layered shadow
        moves opposite the light and responds to tilt. The shadow is a CSS
        projection; the surface reflection and highlights are rendered on the
        GPU.
      </p>
      <div
        className="metal-pipeline"
        aria-label="Actual environment processing stages"
      >
        {[
          [raw, "Environment texture", "Authored locally · 512 × 256"],
          [horizontal, "Horizontal blur", "GPU pass · direction 1, 0"],
          [
            vertical,
            "Vertical blur + desaturation",
            "GPU pass · direction 0, 1",
          ],
        ].map(([ref, title, text]) => (
          <figure key={title}>
            <canvas ref={ref} aria-hidden="true" />
            <figcaption>
              <strong>{title}</strong>
              <span>{text}</span>
            </figcaption>
          </figure>
        ))}
      </div>
      <p className="ma-small">
        Two separate framebuffers soften an authored studio panorama.
        Rounded-rectangle normals and stable grain redirect its reflection. No
        camera, screen capture or external image is used.
      </p>
      {report && (
        <div className="metal-report">
          <button type="button" onClick={saveReport}>
            Save GPU report
          </button>
          <p role="status">
            {report.passed
              ? "GPU checks passed: blur stages, tilt, bevel, grain and light change the actual pixels."
              : "A GPU check did not pass. Inspect the readback below."}
          </p>
          <details open>
            <summary>Read GPU checks</summary>
            <pre>{JSON.stringify(report, null, 2)}</pre>
          </details>
        </div>
      )}
    </section>
  );
}

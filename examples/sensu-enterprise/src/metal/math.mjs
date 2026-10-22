// Copyright (c) 2026 KarmenLoop. All rights reserved.
export function springStep(value, velocity, target, elapsed) {
  const dt = Math.min(Math.max(elapsed, 0), 0.032);
  const steps = Math.max(1, Math.ceil(dt / (1 / 120)));
  const step = dt / steps;
  for (let i = 0; i < steps; i++) {
    velocity += (180 * (target - value) - 24 * velocity) * step;
    value += velocity * step;
  }
  if (Math.abs(target - value) < 0.0001 && Math.abs(velocity) < 0.001) {
    return [target, 0];
  }
  return [value, velocity];
}
export function pixelHash(bytes) {
  let hash = 2166136261;
  for (const byte of bytes) hash = Math.imul(hash ^ byte, 16777619);
  return (hash >>> 0).toString(16).padStart(8, "0");
}
export function pointerTarget(x, y, rect) {
  const clamp = (n) => Math.max(-1, Math.min(1, n));
  return [
    -clamp((y - rect.top - rect.height / 2) / (rect.height / 2)) * 6,
    clamp((x - rect.left - rect.width / 2) / (rect.width / 2)) * 6,
  ];
}

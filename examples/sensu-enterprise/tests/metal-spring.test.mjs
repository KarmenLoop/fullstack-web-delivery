// Copyright (c) 2026 KarmenLoop. All rights reserved.
import test from "node:test";
import assert from "node:assert/strict";
import { springStep, pointerTarget } from "../src/metal/math.mjs";
test("spring settles, retargets with velocity and bounds long frame gaps", () => {
  let value = 0, velocity = 0;
  for (let frame = 0; frame < 20; frame++) [value, velocity] = springStep(value, velocity, 6, 1 / 60);
  assert.ok(value > 0 && value < 6.1);
  const movingVelocity = velocity;
  const next = springStep(value, movingVelocity, -6, 1 / 60);
  assert.notEqual(next[0], -6); assert.notEqual(next[1], 0);
  for (let frame = 0; frame < 300; frame++) [value, velocity] = springStep(value, velocity, -6, 1 / 60);
  assert.equal(value, -6); assert.equal(velocity, 0);
  assert.deepEqual(springStep(0, 0, 6, 20), springStep(0, 0, 6, 0.032));
});
test("pointer mapping uses the stable hit area and clamps external coordinates", () => {
  const rect = { left: 100, top: 200, width: 600, height: 400 };
  assert.deepEqual(pointerTarget(400, 400, rect).map(n => n || 0), [0, 0]);
  assert.deepEqual(pointerTarget(10000, -10000, rect), [6, 6]);
});

// Copyright (c) 2026 KarmenLoop. All rights reserved.
// SPDX-License-Identifier: LicenseRef-KarmenLoop-Source-Available-No-Modification-1.0
import test from "node:test";
import assert from "node:assert/strict";
import { wheelTarget, revealRadius } from "../src/interaction-math.mjs";
test("wheel projects velocity, rounds to a tick and contains overshoot at both bounds", () => {
  assert.equal(wheelTarget(-44, 0, 7), 1);
  assert.equal(wheelTarget(-44, -500, 7), 3);
  assert.equal(wheelTarget(300, 2000, 7), 0);
  assert.equal(wheelTarget(-1000, -2000, 7), 6);
});
test("radial reveal covers the farthest corner from edge and center origins", () => {
  assert.equal(revealRadius(0, 0, 300, 400), 500);
  assert.equal(revealRadius(150, 200, 300, 400), 250);
});

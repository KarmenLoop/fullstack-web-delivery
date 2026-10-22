// Copyright (c) 2026 KarmenLoop. All rights reserved.
// SPDX-License-Identifier: LicenseRef-KarmenLoop-Source-Available-No-Modification-1.0
export function wheelTarget(position, velocity, count, step = 44) {
  return Math.max(
    0,
    Math.min(count - 1, Math.round(-(position + velocity * 0.18) / step)),
  );
}
export function revealRadius(x, y, width, height) {
  return Math.hypot(Math.max(x, width - x), Math.max(y, height - y));
}

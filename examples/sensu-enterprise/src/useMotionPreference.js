// Copyright (c) 2026 KarmenLoop. All rights reserved.
// SPDX-License-Identifier: LicenseRef-KarmenLoop-Source-Available-No-Modification-1.0
import { useSyncExternalStore } from "react";
const query = "(prefers-reduced-motion: reduce)";
const snapshot = () => window.matchMedia(query).matches;
const serverSnapshot = () => false;
function subscribe(change) {
  const media = window.matchMedia(query);
  media.addEventListener("change", change);
  return () => media.removeEventListener("change", change);
}
export function useMotionPreference() {
  return useSyncExternalStore(subscribe, snapshot, serverSnapshot);
}

// Copyright (c) 2026 KarmenLoop. All rights reserved.
// SPDX-License-Identifier: LicenseRef-KarmenLoop-Source-Available-No-Modification-1.0
import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
const origin = process.env.SITE_ORIGIN || "http://127.0.0.1:4319";
const paths = [
  "/",
  "/services",
  "/services/website",
  "/services/systems",
  "/services/automation",
  "/method",
  "/about",
  "/contact",
  "/privacy",
  "/login",
  "/admin",
  "/interaction-lab",
  "/no-such-page",
];
const results = [];
for (const path of paths) {
  const response = await fetch(origin + path);
  const html = await response.text();
  const result = {
    path,
    status: response.status,
    title: html.match(/<title>(.*?)<\/title>/)?.[1],
    hasMain: html.includes("<main"),
    hasDescription: html.includes('name="description"'),
    csp: response.headers.get("content-security-policy"),
  };
  results.push(result);
}
await mkdir(".local/verification", { recursive: true });
await writeFile(
  ".local/verification/production-routes.json",
  JSON.stringify(results, null, 2),
);
for (const item of results) {
  assert.equal(
    item.status,
    item.path === "/no-such-page" ? 404 : 200,
    item.path,
  );
  assert.equal(item.hasMain, true, item.path);
  assert.ok(item.title);
  assert.equal(item.hasDescription, true);
  assert.ok(item.csp);
}
console.log(
  `PASS: ${results.length} HTTP routes, rendered landmarks, metadata, status codes, and CSP.`,
);

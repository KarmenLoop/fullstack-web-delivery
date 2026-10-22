// Copyright (c) 2026 KarmenLoop. All rights reserved.
// SPDX-License-Identifier: LicenseRef-KarmenLoop-Source-Available-No-Modification-1.0
import test from "node:test";
import assert from "node:assert/strict";
import { once } from "node:events";
import { createApplication, apiErrors } from "../server/api.mjs";
async function fixture(t) {
  const origin = "http://127.0.0.1:4319";
  const { app, db } = createApplication({
    filename: ":memory:",
    secret: "isolated-test-only-secret-for-access-demo",
    origin,
  });
  app.use(apiErrors);
  const server = app.listen(0, "127.0.0.1");
  await once(server, "listening");
  t.after(async () => {
    await new Promise((resolve) => server.close(resolve));
    db.close();
  });
  const base = "http://127.0.0.1:" + server.address().port;
  return {
    db,
    base,
    origin,
    async get(path) {
      const response = await fetch(base + path);
      return { status: response.status, data: await response.json() };
    },
  };
}
test("permission answers come from the declared fictional rule in English and Chinese", async (t) => {
  const f = await fixture(t);
  for (const question of [
    "Who can revoke user access?",
    "\u8c01\u80fd\u5220\u9664\u7528\u6237\u6743\u9650",
  ]) {
    const { status, data } = await f.get(
      "/api/demo/access-map?q=" + encodeURIComponent(question),
    );
    assert.equal(status, 200);
    assert.equal(data.mode, "fictional-read-only");
    assert.equal(data.mutationSupported, false);
    assert.equal(data.query.sourceRule, "rules.revoke-user-access");
    assert.deepEqual(data.query.roleIds, ["workspace-admin", "security-owner"]);
    for (const id of data.query.roleIds) {
      const role = data.roles.find((role) => role.id === id);
      assert.ok(role.permissions.includes("users.access.revoke"));
      assert.ok(
        data.departments.some(
          (department) => department.id === role.departmentId,
        ),
      );
    }
    assert.equal(
      data.roles
        .find((role) => role.id === "project-viewer")
        .permissions.includes("users.access.revoke"),
      false,
    );
  }
  assert.equal(f.db.prepare("SELECT COUNT(*) AS n FROM users").get().n, 0);
});
test("unsupported permission subjects never inherit the user-access answer", async (t) => {
  const f = await fixture(t);
  for (const question of [
    "Who can revoke audit permissions?",
    "Who can delete billing access?",
    "Who can revoke user access and audit permissions?",
    "Who can revoke permissions?",
    "\u8c01\u80fd\u5220\u9664\u5ba1\u8ba1\u6743\u9650",
  ]) {
    const { status, data } = await f.get(
      "/api/demo/access-map?q=" + encodeURIComponent(question),
    );
    assert.equal(status, 200);
    assert.equal(data.query.kind, "unsupported");
    assert.equal(data.query.sourceRule, "unsupported-query");
    assert.equal(data.query.permission, null);
    assert.deepEqual(data.query.roleIds, []);
    assert.match(data.query.summary, /unsupported/);
  }
});
test("bounded query validation and unsupported writes preserve business data", async (t) => {
  const f = await fixture(t);
  for (const suffix of ["?q=" + "x".repeat(161), "?q=a&q=b", "?other=field"]) {
    assert.equal((await f.get("/api/demo/access-map" + suffix)).status, 422);
  }
  const session = await fetch(f.base + "/api/session"),
    data = await session.json();
  const cookie = session.headers.getSetCookie()[0].split(";")[0];
  const response = await fetch(f.base + "/api/demo/access-map", {
    method: "POST",
    headers: {
      Origin: f.origin,
      Cookie: cookie,
      "X-CSRF-Token": data.csrfToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      role: "project-viewer",
      permission: "users.access.revoke",
    }),
  });
  assert.equal(response.status, 404);
  for (const table of ["users", "inquiries", "inquiry_events"])
    assert.equal(f.db.prepare("SELECT COUNT(*) AS n FROM " + table).get().n, 0);
});
test("search and empty results do not invent a permission answer", async (t) => {
  const f = await fixture(t);
  const delivery = (await f.get("/api/demo/access-map?q=Delivery")).data;
  assert.equal(delivery.query.kind, "search");
  assert.deepEqual(delivery.query.roleIds, ["project-viewer"]);
  assert.equal(delivery.query.permission, null);
  const unknown = (await f.get("/api/demo/access-map?q=unknown-department"))
    .data;
  assert.deepEqual(unknown.query.roleIds, []);
  assert.equal(unknown.query.permission, null);
});

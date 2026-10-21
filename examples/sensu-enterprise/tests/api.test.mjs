// Copyright (c) 2026 KarmenLoop. All rights reserved.
// SPDX-License-Identifier: LicenseRef-KarmenLoop-Source-Available-No-Modification-1.0
import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { randomUUID } from "node:crypto";
import { once } from "node:events";
import { createApplication, apiErrors } from "../server/api.mjs";
import { passwordHash } from "../server/database.mjs";

const trustedOrigin = "http://127.0.0.1:4317";
const payload = () => ({
  name: "Test Visitor",
  company: "Local Verification Company",
  email: "visitor@example.test",
  service: "website",
  message: "This inquiry is for isolated local acceptance checks only.",
  consent: true,
  website: "",
  requestKey: randomUUID(),
});
async function fixture(t, limits = {}) {
  const directory = await mkdtemp(join(tmpdir(), "sensu-api-test-"));
  const filename = join(directory, "test.sqlite");
  let instance, server, base;
  async function start() {
    instance = createApplication({
      filename,
      secret: "test-only-secret-that-is-never-used-by-the-demo",
      origin: trustedOrigin,
      limits,
    });
    instance.app.use(apiErrors);
    server = instance.app.listen(0, "127.0.0.1");
    await once(server, "listening");
    base = `http://127.0.0.1:${server.address().port}`;
  }
  async function stop() {
    await new Promise((resolve, reject) =>
      server.close((error) => (error ? reject(error) : resolve())),
    );
    instance.db.close();
  }
  await start();
  for (const [email, role] of [
    ["admin@sensu.test", "admin"],
    ["viewer@sensu.test", "viewer"],
  ])
    instance.db
      .prepare("INSERT INTO users(email,password_hash,role) VALUES(?,?,?)")
      .run(email, passwordHash("Fixture-pass-2026"), role);
  t.after(async () => {
    await stop();
    await rm(directory, { recursive: true, force: true });
  });
  function client() {
    let cookie = "",
      csrf = "";
    return {
      get cookie() {
        return cookie;
      },
      set cookie(value) {
        cookie = value;
      },
      async call(
        path,
        { method = "GET", body, origin = trustedOrigin, token = true } = {},
      ) {
        const response = await fetch(base + path, {
          method,
          headers: {
            ...(cookie ? { Cookie: cookie } : {}),
            ...(body ? { "Content-Type": "application/json" } : {}),
            ...(method === "GET"
              ? {}
              : { Origin: origin, ...(token ? { "X-CSRF-Token": csrf } : {}) }),
          },
          ...(body ? { body: JSON.stringify(body) } : {}),
        });
        for (const entry of response.headers.getSetCookie())
          if (entry.startsWith("sensu.sid=")) cookie = entry.split(";")[0];
        const data = await response.json();
        if (data.csrfToken) csrf = data.csrfToken;
        return { status: response.status, data, headers: response.headers };
      },
      async bootstrap() {
        return this.call("/api/session");
      },
      async login(email = "admin@sensu.test") {
        await this.bootstrap();
        return this.call("/api/login", {
          method: "POST",
          body: { email, password: "Fixture-pass-2026" },
        });
      },
    };
  }
  return {
    client,
    get db() {
      return instance.db;
    },
    async restart() {
      await stop();
      await start();
    },
  };
}

test("anonymous access, login failure, session rotation and logout are enforced", async (t) => {
  const f = await fixture(t),
    c = f.client();
  assert.equal((await c.call("/api/admin/inquiries")).status, 401);
  await c.bootstrap();
  const before = c.cookie;
  assert.equal(
    (
      await c.call("/api/login", {
        method: "POST",
        body: { email: "admin@sensu.test", password: "wrong" },
      })
    ).status,
    401,
  );
  assert.equal((await c.login()).status, 200);
  assert.notEqual(c.cookie, before);
  assert.equal((await c.call("/api/session")).data.user.role, "admin");
  const authenticated = c.cookie;
  assert.equal((await c.call("/api/logout", { method: "POST" })).status, 200);
  c.cookie = authenticated;
  assert.equal((await c.call("/api/admin/inquiries")).status, 401);
});
test("form validation, consent, honeypot and strict fields reject invalid input", async (t) => {
  const f = await fixture(t),
    c = f.client();
  await c.bootstrap();
  for (const change of [
    { name: "a" },
    { email: "invalid" },
    { message: "x" },
    { consent: false },
    { website: "https://spam.test" },
    { role: "admin" },
  ]) {
    assert.equal(
      (
        await c.call("/api/inquiries", {
          method: "POST",
          body: { ...payload(), ...change },
        })
      ).status,
      422,
    );
  }
  assert.equal(f.db.prepare("SELECT COUNT(*) AS n FROM inquiries").get().n, 0);
});
test("a submitted inquiry is durable and idempotency detects changed payloads", async (t) => {
  const f = await fixture(t),
    c = f.client();
  await c.bootstrap();
  const body = payload();
  const first = await c.call("/api/inquiries", { method: "POST", body });
  assert.equal(first.status, 201);
  assert.match(first.data.id, /^SX-[A-F0-9]{12}$/);
  const again = await c.call("/api/inquiries", { method: "POST", body });
  assert.equal(again.status, 200);
  assert.equal(again.data.id, first.data.id);
  assert.equal(again.data.replayed, true);
  assert.equal(
    (
      await c.call("/api/inquiries", {
        method: "POST",
        body: { ...body, company: "Different Company" },
      })
    ).status,
    409,
  );
  assert.equal(f.db.prepare("SELECT COUNT(*) AS n FROM inquiries").get().n, 1);
  await f.restart();
  assert.equal(
    f.db.prepare("SELECT id FROM inquiries").get().id,
    first.data.id,
  );
});
test("same-origin and CSRF checks reject untrusted mutations", async (t) => {
  const f = await fixture(t),
    c = f.client();
  await c.bootstrap();
  assert.equal(
    (
      await c.call("/api/inquiries", {
        method: "POST",
        body: payload(),
        token: false,
      })
    ).status,
    403,
  );
  assert.equal(
    (
      await c.call("/api/inquiries", {
        method: "POST",
        body: payload(),
        origin: "https://other.example",
      })
    ).status,
    403,
  );
  assert.equal(f.db.prepare("SELECT COUNT(*) AS n FROM inquiries").get().n, 0);
});
test("viewer can read a real inquiry but cannot change its status", async (t) => {
  const f = await fixture(t),
    visitor = f.client();
  await visitor.bootstrap();
  const created = await visitor.call("/api/inquiries", {
    method: "POST",
    body: payload(),
  });
  const reader = f.client();
  assert.equal((await reader.login("viewer@sensu.test")).status, 200);
  assert.equal((await reader.call("/api/admin/inquiries")).data.total, 1);
  assert.equal(
    (await reader.call(`/api/admin/inquiries/${created.data.id}`)).data.email,
    "visitor@example.test",
  );
  assert.equal(
    (
      await reader.call(`/api/admin/inquiries/${created.data.id}`, {
        method: "PATCH",
        body: { status: "in_progress", version: 1 },
      })
    ).status,
    403,
  );
  assert.equal(
    f.db.prepare("SELECT status FROM inquiries").get().status,
    "new",
  );
});
test("state changes, optimistic conflict and actor audit are consistent", async (t) => {
  const f = await fixture(t),
    c = f.client();
  await c.bootstrap();
  const {
    data: { id },
  } = await c.call("/api/inquiries", { method: "POST", body: payload() });
  await c.login();
  assert.equal(
    (
      await c.call(`/api/admin/inquiries/${id}`, {
        method: "PATCH",
        body: { status: "done", version: 1 },
      })
    ).status,
    422,
  );
  const updated = await c.call(`/api/admin/inquiries/${id}`, {
    method: "PATCH",
    body: { status: "in_progress", version: 1 },
  });
  assert.equal(updated.status, 200);
  assert.equal(updated.data.version, 2);
  assert.equal(
    (
      await c.call(`/api/admin/inquiries/${id}`, {
        method: "PATCH",
        body: { status: "done", version: 1 },
      })
    ).status,
    409,
  );
  assert.equal(
    (
      await c.call(`/api/admin/inquiries/${id}`, {
        method: "PATCH",
        body: { status: "done", version: 2 },
      })
    ).status,
    200,
  );
  const detail = await c.call(`/api/admin/inquiries/${id}`);
  assert.equal(detail.data.status, "done");
  assert.equal(detail.data.events.length, 2);
  assert.equal(detail.data.events[0].actor, "admin@sensu.test");
});
test("search, filters, pagination and special characters use real stored data", async (t) => {
  const f = await fixture(t, { inquiries: 100 }),
    c = f.client();
  await c.bootstrap();
  for (let i = 0; i < 12; i++)
    assert.equal(
      (
        await c.call("/api/inquiries", {
          method: "POST",
          body: {
            ...payload(),
            company: i === 0 ? "Special_%Company" : `Test Company${i}`,
          },
        })
      ).status,
      201,
    );
  await c.login();
  const first = await c.call("/api/admin/inquiries");
  assert.equal(first.data.total, 12);
  assert.equal(first.data.items.length, 10);
  assert.equal(
    (await c.call("/api/admin/inquiries?page=2")).data.items.length,
    2,
  );
  assert.equal(
    (await c.call("/api/admin/inquiries?q=" + encodeURIComponent("_%"))).data
      .total,
    1,
  );
  assert.equal(
    (
      await c.call(
        "/api/admin/inquiries?q=" + encodeURIComponent("' OR 1=1 --"),
      )
    ).data.total,
    0,
  );
  assert.equal(
    (await c.call("/api/admin/inquiries?status=done")).data.total,
    0,
  );
  assert.equal((await c.call("/api/admin/inquiries?page=-1")).status, 422);
});
test("sessions survive server restart, expire, and carry HttpOnly and SameSite cookies", async (t) => {
  const f = await fixture(t),
    c = f.client();
  const logged = await c.login();
  const cookies = logged.headers.getSetCookie().join(";");
  assert.match(cookies, /HttpOnly/);
  assert.match(cookies, /SameSite=Lax/);
  await f.restart();
  assert.equal((await c.call("/api/admin/inquiries")).status, 200);
  f.db.prepare("UPDATE sessions SET expires=?").run(Date.now() - 1);
  assert.equal((await c.call("/api/admin/inquiries")).status, 401);
});
test("login and form rate limits return explicit recoverable errors", async (t) => {
  const f = await fixture(t, { login: 2, inquiries: 2 }),
    c = f.client();
  await c.bootstrap();
  for (let i = 0; i < 2; i++)
    assert.equal(
      (
        await c.call("/api/login", {
          method: "POST",
          body: { email: "admin@sensu.test", password: "wrong" },
        })
      ).status,
      401,
    );
  assert.equal(
    (
      await c.call("/api/login", {
        method: "POST",
        body: { email: "admin@sensu.test", password: "wrong" },
      })
    ).status,
    429,
  );
  for (let i = 0; i < 2; i++)
    assert.equal(
      (await c.call("/api/inquiries", { method: "POST", body: payload() }))
        .status,
      201,
    );
  assert.equal(
    (await c.call("/api/inquiries", { method: "POST", body: payload() }))
      .status,
    429,
  );
});

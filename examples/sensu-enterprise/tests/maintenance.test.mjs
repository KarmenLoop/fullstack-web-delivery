// Copyright (c) 2026 KarmenLoop. All rights reserved.
// SPDX-License-Identifier: LicenseRef-KarmenLoop-Source-Available-No-Modification-1.0
import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, mkdir, rm, readFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { openDatabase } from "../server/database.mjs";
test("the cleanup command requires an explicit scope and preserves staff accounts", async (t) => {
  const directory = await mkdtemp(join(tmpdir(), "sensu-maintenance-"));
  await mkdir(join(directory, ".local"));
  t.after(() => rm(directory, { recursive: true, force: true }));
  const db = openDatabase(join(directory, ".local/sensu.sqlite"));
  db.prepare("INSERT INTO users(email,password_hash,role) VALUES(?,?,?)").run(
    "staff@example.test",
    "fixture:hash",
    "viewer",
  );
  db.prepare(
    "INSERT INTO inquiries(id,request_key,payload_digest,name,company,email,service,message,created_at,updated_at) VALUES(?,?,?,?,?,?,?,?,?,?)",
  ).run(
    "fixture-inquiry",
    "fixture-key",
    "fixture-digest",
    "Test",
    "Test Company",
    "test@example.test",
    "website",
    "Local cleanup test",
    "2026-10-21",
    "2026-10-21",
  );
  const script = resolve("scripts/clear-data.mjs");
  const denied = spawnSync(process.execPath, [script], {
    cwd: directory,
    encoding: "utf8",
  });
  assert.equal(denied.status, 1);
  assert.equal(
    db.prepare("SELECT COUNT(*) AS count FROM inquiries").get().count,
    1,
  );
  const allowed = spawnSync(process.execPath, [script, "--confirm-local"], {
    cwd: directory,
    encoding: "utf8",
  });
  assert.equal(allowed.status, 0);
  assert.equal(
    db.prepare("SELECT COUNT(*) AS count FROM inquiries").get().count,
    0,
  );
  assert.equal(
    db.prepare("SELECT COUNT(*) AS count FROM users").get().count,
    1,
  );
  db.close();
});
test("setup creates local random credentials and preserves them until explicit rotation", async (t) => {
  const directory = await mkdtemp(join(tmpdir(), "sensu-setup-"));
  t.after(() => rm(directory, { recursive: true, force: true }));
  const script = resolve("scripts/setup.mjs");
  const run = (extra) =>
    spawnSync(process.execPath, [script, ...extra], {
      cwd: directory,
      encoding: "utf8",
    });
  assert.equal(run([]).status, 0);
  const before = JSON.parse(
    await readFile(join(directory, ".local/demo-access.json"), "utf8"),
  );
  assert.equal(before.users.length, 2);
  assert.notEqual(before.users[0].password, before.users[1].password);
  assert.ok(before.users.every((u) => u.password.length >= 20));
  assert.equal(run([]).status, 0);
  assert.deepEqual(
    JSON.parse(
      await readFile(join(directory, ".local/demo-access.json"), "utf8"),
    ),
    before,
  );
  assert.equal(run(["--rotate"]).status, 0);
  const after = JSON.parse(
    await readFile(join(directory, ".local/demo-access.json"), "utf8"),
  );
  assert.notEqual(after.users[0].password, before.users[0].password);
});

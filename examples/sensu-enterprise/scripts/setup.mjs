// Copyright (c) 2026 KarmenLoop. All rights reserved.
// SPDX-License-Identifier: LicenseRef-KarmenLoop-Source-Available-No-Modification-1.0
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { randomBytes } from "node:crypto";
import { openDatabase, passwordHash } from "../server/database.mjs";

const directory = resolve(".local");
await mkdir(directory, { recursive: true, mode: 0o700 });
let config;
try {
  config = JSON.parse(
    await readFile(resolve(directory, "runtime.json"), "utf8"),
  );
} catch (error) {
  if (error.code !== "ENOENT") throw error;
  config = { secret: randomBytes(48).toString("hex") };
  await writeFile(
    resolve(directory, "runtime.json"),
    JSON.stringify(config, null, 2),
    { mode: 0o600, flag: "wx" },
  );
}
const db = openDatabase(resolve(directory, "sensu.sqlite"));
const exists = db.prepare("SELECT COUNT(*) AS count FROM users").get().count;
if (!exists || process.argv.includes("--rotate")) {
  const users = [
    {
      email: "admin@sensu.test",
      role: "admin",
      password: randomBytes(15).toString("base64url"),
    },
    {
      email: "viewer@sensu.test",
      role: "viewer",
      password: randomBytes(15).toString("base64url"),
    },
  ];
  db.exec("BEGIN IMMEDIATE");
  try {
    for (const user of users)
      db.prepare(
        "INSERT INTO users(email,password_hash,role) VALUES(?,?,?) ON CONFLICT(email) DO UPDATE SET password_hash=excluded.password_hash,role=excluded.role",
      ).run(user.email, passwordHash(user.password), user.role);
    if (exists) db.exec("DELETE FROM sessions");
    db.exec("COMMIT");
  } catch (error) {
    db.exec("ROLLBACK");
    throw error;
  }
  await writeFile(
    resolve(directory, "demo-access.json"),
    JSON.stringify(
      { scope: "Isolated local demonstration only", users },
      null,
      2,
    ),
    { mode: 0o600 },
  );
}
db.close();
console.log("Local database ready. Demo credentials: .local/demo-access.json");

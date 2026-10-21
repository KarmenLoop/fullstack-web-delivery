// Copyright (c) 2026 KarmenLoop. All rights reserved.
// SPDX-License-Identifier: LicenseRef-KarmenLoop-Source-Available-No-Modification-1.0
import { resolve } from "node:path";
import { openDatabase } from "../server/database.mjs";
if (!process.argv.includes("--confirm-local")) {
  console.error(
    "To clear this trial’s inquiries and sessions, run: npm run data:clear -- --confirm-local",
  );
  process.exit(1);
}
const db = openDatabase(resolve(".local/sensu.sqlite"));
db.exec(
  "BEGIN IMMEDIATE; DELETE FROM inquiry_events; DELETE FROM inquiries; DELETE FROM sessions; COMMIT;",
);
db.close();
console.log(
  "Cleared only this project’s trial inquiries, history, and sessions. Staff accounts preserved.",
);

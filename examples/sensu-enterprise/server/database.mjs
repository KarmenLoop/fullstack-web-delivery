// Copyright (c) 2026 KarmenLoop. All rights reserved.
// SPDX-License-Identifier: LicenseRef-KarmenLoop-Source-Available-No-Modification-1.0
import { DatabaseSync } from "node:sqlite";
import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import session from "express-session";

export function passwordHash(password, salt = randomBytes(16).toString("hex")) {
  return `${salt}:${scryptSync(password, salt, 64).toString("hex")}`;
}

export function passwordMatches(password, encoded) {
  const [salt, hash] = encoded.split(":");
  const actual = scryptSync(password, salt, 64);
  const expected = Buffer.from(hash, "hex");
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

export function openDatabase(filename) {
  const db = new DatabaseSync(filename);
  db.exec(
    `PRAGMA journal_mode=WAL; PRAGMA foreign_keys=ON; PRAGMA busy_timeout=3000;`,
  );
  const version = db.prepare("PRAGMA user_version").get().user_version;
  if (version !== 0 && version !== 1)
    throw new Error("Unsupported database version");
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY, email TEXT NOT NULL UNIQUE, password_hash TEXT NOT NULL,
      role TEXT NOT NULL CHECK(role IN ('admin','viewer'))
    );
    CREATE TABLE IF NOT EXISTS sessions (
      sid TEXT PRIMARY KEY, data TEXT NOT NULL, expires INTEGER NOT NULL
    );
    CREATE INDEX IF NOT EXISTS session_expiry ON sessions(expires);
    CREATE TABLE IF NOT EXISTS inquiries (
      id TEXT PRIMARY KEY, request_key TEXT NOT NULL UNIQUE, payload_digest TEXT NOT NULL,
      name TEXT NOT NULL, company TEXT NOT NULL, email TEXT NOT NULL,
      service TEXT NOT NULL, message TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'new' CHECK(status IN ('new','in_progress','done')),
      version INTEGER NOT NULL DEFAULT 1, created_at TEXT NOT NULL, updated_at TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS inquiry_created ON inquiries(created_at DESC);
    CREATE TABLE IF NOT EXISTS inquiry_events (
      id INTEGER PRIMARY KEY, inquiry_id TEXT NOT NULL REFERENCES inquiries(id),
      actor_id INTEGER NOT NULL REFERENCES users(id), from_status TEXT NOT NULL,
      to_status TEXT NOT NULL, created_at TEXT NOT NULL
    );
    PRAGMA user_version=1;
  `);
  return db;
}

export class SQLiteSessionStore extends session.Store {
  constructor(db) {
    super();
    this.db = db;
  }
  get(sid, callback) {
    try {
      const row = this.db
        .prepare("SELECT data, expires FROM sessions WHERE sid=?")
        .get(sid);
      if (!row) return callback(null, null);
      if (row.expires <= Date.now()) {
        this.db.prepare("DELETE FROM sessions WHERE sid=?").run(sid);
        return callback(null, null);
      }
      callback(null, JSON.parse(row.data));
    } catch (error) {
      callback(error);
    }
  }
  set(sid, value, callback = () => {}) {
    try {
      const expires = value.cookie.expires
        ? new Date(value.cookie.expires).getTime()
        : Date.now() + 28_800_000;
      this.db
        .prepare(
          "INSERT INTO sessions(sid,data,expires) VALUES(?,?,?) ON CONFLICT(sid) DO UPDATE SET data=excluded.data, expires=excluded.expires",
        )
        .run(sid, JSON.stringify(value), expires);
      this.db.prepare("DELETE FROM sessions WHERE expires<=?").run(Date.now());
      callback(null);
    } catch (error) {
      callback(error);
    }
  }
  destroy(sid, callback = () => {}) {
    try {
      this.db.prepare("DELETE FROM sessions WHERE sid=?").run(sid);
      callback(null);
    } catch (error) {
      callback(error);
    }
  }
  touch(sid, value, callback) {
    this.set(sid, value, callback);
  }
}

// Copyright (c) 2026 KarmenLoop. All rights reserved.
// SPDX-License-Identifier: LicenseRef-KarmenLoop-Source-Available-No-Modification-1.0
import express from "express";
import session from "express-session";
import helmet from "helmet";
import { rateLimit } from "express-rate-limit";
import { z } from "zod";
import {
  createHash,
  randomBytes,
  randomUUID,
  timingSafeEqual,
} from "node:crypto";
import {
  openDatabase,
  passwordMatches,
  passwordHash,
  SQLiteSessionStore,
} from "./database.mjs";

const inquiryInput = z
  .object({
    name: z.string().trim().min(2).max(60),
    company: z.string().trim().min(2).max(120),
    email: z
      .email()
      .max(160)
      .transform((value) => value.toLowerCase()),
    service: z.enum(["website", "systems", "automation"]),
    message: z.string().trim().min(10).max(3000),
    consent: z.literal(true),
    website: z.literal("").default(""),
    requestKey: z.uuid(),
  })
  .strict();
const loginInput = z
  .object({ email: z.email().max(160), password: z.string().min(1).max(200) })
  .strict();
const transitionInput = z
  .object({
    status: z.enum(["in_progress", "done"]),
    version: z.number().int().positive(),
  })
  .strict();
const listInput = z
  .object({
    q: z.string().trim().max(160).default(""),
    status: z.enum(["all", "new", "in_progress", "done"]).default("all"),
    page: z.coerce.number().int().min(1).max(100000).default(1),
  })
  .strict();
const sessionName = "sensu.sid";
const nextStatus = { new: "in_progress", in_progress: "done" };

function safeTokenMatches(a, b) {
  if (typeof a !== "string" || typeof b !== "string") return false;
  const left = Buffer.from(a),
    right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}
function serialize(row) {
  return {
    id: row.id,
    name: row.name,
    company: row.company,
    email: row.email,
    service: row.service,
    message: row.message,
    status: row.status,
    version: row.version,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}
export function createApplication({
  filename,
  secret,
  origin,
  production = false,
  limits = {},
}) {
  const db = openDatabase(filename),
    app = express();
  const invalidHash = passwordHash(randomBytes(24).toString("hex"));
  app.disable("x-powered-by");
  app.use(
    helmet({
      contentSecurityPolicy: production
        ? {
            directives: {
              "upgrade-insecure-requests": null,
              "script-src": ["'self'"],
              "style-src": ["'self'", "'unsafe-inline'"],
              "img-src": ["'self'", "data:"],
              "connect-src": ["'self'"],
            },
          }
        : false,
      strictTransportSecurity: false,
    }),
  );
  app.use(express.json({ limit: "16kb" }));
  app.use(
    "/api",
    session({
      name: sessionName,
      secret,
      store: new SQLiteSessionStore(db),
      resave: false,
      saveUninitialized: false,
      rolling: true,
      cookie: {
        httpOnly: true,
        sameSite: "lax",
        secure: false,
        maxAge: 28_800_000,
      },
    }),
  );
  app.use("/api", (req, res, next) => {
    res.set("Cache-Control", "no-store");
    req.session.csrfToken ||= randomBytes(32).toString("hex");
    if (!["GET", "HEAD", "OPTIONS"].includes(req.method)) {
      if (
        req.get("origin") !== origin ||
        !safeTokenMatches(req.get("x-csrf-token"), req.session.csrfToken)
      )
        return res.status(403).json({
          code: "CSRF_INVALID",
          message:
            "Your session check expired. Refresh the page and try again.",
        });
    }
    next();
  });
  app.get("/api/health", (req, res) =>
    res.json({
      status: "ok",
      database: db.prepare("SELECT 1 AS ok").get().ok === 1,
    }),
  );
  app.get("/api/session", (req, res) => {
    const user = req.session.userId
      ? db
          .prepare("SELECT id,email,role FROM users WHERE id=?")
          .get(req.session.userId)
      : null;
    res.json({ user: user || null, csrfToken: req.session.csrfToken });
  });
  const limiter = (limit, message) =>
    rateLimit({
      windowMs: 900000,
      limit,
      standardHeaders: "draft-8",
      legacyHeaders: false,
      handler: (req, res) =>
        res.status(429).json({ code: "RATE_LIMITED", message }),
    });
  app.post(
    "/api/login",
    limiter(limits.login ?? 8, "Too many sign-in attempts. Try again later."),
    (req, res, next) => {
      const parsed = loginInput.safeParse(req.body);
      if (!parsed.success)
        return res
          .status(422)
          .json({
            code: "INPUT_INVALID",
            message: "Check the email and password format.",
          });
      const { email, password } = parsed.data;
      const user = db
        .prepare("SELECT * FROM users WHERE email=?")
        .get(email.toLowerCase());
      const valid = passwordMatches(
        password,
        user?.password_hash || invalidHash,
      );
      if (!user || !valid)
        return res
          .status(401)
          .json({
            code: "LOGIN_FAILED",
            message: "The email or password is incorrect.",
          });
      req.session.regenerate((error) => {
        if (error) return next(error);
        req.session.userId = user.id;
        req.session.csrfToken = randomBytes(32).toString("hex");
        req.session.save((error) =>
          error
            ? next(error)
            : res.json({
                user: { id: user.id, email: user.email, role: user.role },
                csrfToken: req.session.csrfToken,
              }),
        );
      });
    },
  );
  app.post("/api/logout", (req, res, next) =>
    req.session.destroy((error) => {
      if (error) return next(error);
      res.clearCookie(sessionName, {
        httpOnly: true,
        sameSite: "lax",
        secure: false,
      });
      res.json({ ok: true });
    }),
  );
  app.post(
    "/api/inquiries",
    limiter(limits.inquiries ?? 15, "Too many submissions. Try again later."),
    (req, res) => {
      const parsed = inquiryInput.safeParse(req.body);
      if (!parsed.success)
        return res.status(422).json({
          code: "INPUT_INVALID",
          message: "Check required fields, email format, and privacy consent.",
        });
      const { requestKey, website, ...data } = parsed.data;
      const digest = createHash("sha256")
        .update(JSON.stringify(data))
        .digest("hex");
      const existing = db
        .prepare("SELECT id,payload_digest FROM inquiries WHERE request_key=?")
        .get(requestKey);
      if (existing) {
        if (existing.payload_digest !== digest)
          return res.status(409).json({
            code: "REQUEST_CONFLICT",
            message: "This submission has changed. Start a new inquiry.",
          });
        return res.json({ id: existing.id, received: true, replayed: true });
      }
      const id = `SX-${randomUUID().replaceAll("-", "").slice(0, 12).toUpperCase()}`,
        now = new Date().toISOString();
      db.prepare(
        "INSERT INTO inquiries(id,request_key,payload_digest,name,company,email,service,message,created_at,updated_at) VALUES(?,?,?,?,?,?,?,?,?,?)",
      ).run(
        id,
        requestKey,
        digest,
        data.name,
        data.company,
        data.email,
        data.service,
        data.message,
        now,
        now,
      );
      res.status(201).json({ id, received: true, replayed: false });
    },
  );
  app.use("/api/admin", (req, res, next) => {
    const user = req.session.userId
      ? db
          .prepare("SELECT id,email,role FROM users WHERE id=?")
          .get(req.session.userId)
      : null;
    if (!user)
      return res
        .status(401)
        .json({
          code: "LOGIN_REQUIRED",
          message: "Sign in to the workspace first.",
        });
    req.user = user;
    next();
  });
  app.get("/api/admin/inquiries", (req, res) => {
    const parsed = listInput.safeParse(req.query);
    if (!parsed.success)
      return res
        .status(422)
        .json({
          code: "INPUT_INVALID",
          message: "The search parameters are invalid.",
        });
    const { q, status, page } = parsed.data,
      conditions = [],
      params = [];
    if (status !== "all") {
      conditions.push("status=?");
      params.push(status);
    }
    if (q) {
      conditions.push(
        "(name LIKE ? ESCAPE '\\' OR company LIKE ? ESCAPE '\\' OR email LIKE ? ESCAPE '\\' OR id LIKE ? ESCAPE '\\')",
      );
      const term = `%${q.replace(/[\\%_]/g, "\\$&")}%`;
      params.push(term, term, term, term);
    }
    const where = conditions.length ? " WHERE " + conditions.join(" AND ") : "";
    const total = db
      .prepare("SELECT COUNT(*) AS count FROM inquiries" + where)
      .get(...params).count;
    const rows = db
      .prepare(
        "SELECT * FROM inquiries" +
          where +
          " ORDER BY created_at DESC, id LIMIT 10 OFFSET ?",
      )
      .all(...params, (page - 1) * 10);
    const stats = { new: 0, in_progress: 0, done: 0 };
    for (const row of db
      .prepare("SELECT status,COUNT(*) AS count FROM inquiries GROUP BY status")
      .all())
      stats[row.status] = row.count;
    res.json({ items: rows.map(serialize), total, page, pageSize: 10, stats });
  });
  app.get("/api/admin/inquiries/:id", (req, res) => {
    const row = db
      .prepare("SELECT * FROM inquiries WHERE id=?")
      .get(req.params.id);
    if (!row)
      return res
        .status(404)
        .json({ code: "NOT_FOUND", message: "This inquiry was not found." });
    const events = db
      .prepare(
        "SELECT e.from_status AS fromStatus,e.to_status AS toStatus,e.created_at AS createdAt,u.email AS actor FROM inquiry_events e JOIN users u ON u.id=e.actor_id WHERE inquiry_id=? ORDER BY e.id",
      )
      .all(row.id);
    res.json({ ...serialize(row), events });
  });
  app.patch("/api/admin/inquiries/:id", (req, res) => {
    if (req.user.role !== "admin")
      return res
        .status(403)
        .json({
          code: "FORBIDDEN",
          message: "Read-only staff cannot change inquiry status.",
        });
    const parsed = transitionInput.safeParse(req.body);
    if (!parsed.success)
      return res
        .status(422)
        .json({
          code: "INPUT_INVALID",
          message: "The status or version is invalid.",
        });
    db.exec("BEGIN IMMEDIATE");
    try {
      const row = db
        .prepare("SELECT * FROM inquiries WHERE id=?")
        .get(req.params.id);
      if (!row) {
        db.exec("ROLLBACK");
        return res
          .status(404)
          .json({ code: "NOT_FOUND", message: "This inquiry was not found." });
      }
      if (row.version !== parsed.data.version) {
        db.exec("ROLLBACK");
        return res.status(409).json({
          code: "VERSION_CONFLICT",
          message:
            "This inquiry has changed. Reopen its details before continuing.",
        });
      }
      if (nextStatus[row.status] !== parsed.data.status) {
        db.exec("ROLLBACK");
        return res.status(422).json({
          code: "STATUS_INVALID",
          message: "Advance status in order: New, In progress, then Done.",
        });
      }
      const now = new Date().toISOString();
      db.prepare(
        "UPDATE inquiries SET status=?,version=version+1,updated_at=? WHERE id=?",
      ).run(parsed.data.status, now, row.id);
      db.prepare(
        "INSERT INTO inquiry_events(inquiry_id,actor_id,from_status,to_status,created_at) VALUES(?,?,?,?,?)",
      ).run(row.id, req.user.id, row.status, parsed.data.status, now);
      db.exec("COMMIT");
      res.json(
        serialize(db.prepare("SELECT * FROM inquiries WHERE id=?").get(row.id)),
      );
    } catch (error) {
      db.exec("ROLLBACK");
      throw error;
    }
  });
  app.use("/api", (req, res) =>
    res
      .status(404)
      .json({ code: "NOT_FOUND", message: "The API endpoint was not found." }),
  );
  return { app, db };
}

export function apiErrors(error, req, res, next) {
  if (res.headersSent) return next(error);
  const status =
    error.status === 413
      ? 413
      : error.type === "entity.parse.failed"
        ? 400
        : 500;
  if (status === 500) console.error("REQUEST_FAILED", error.message);
  res.status(status).json({
    code: status === 500 ? "SERVER_ERROR" : "INPUT_INVALID",
    message:
      status === 500
        ? "The request could not be completed. Try again later."
        : "The submitted content is invalid or too large.",
  });
}

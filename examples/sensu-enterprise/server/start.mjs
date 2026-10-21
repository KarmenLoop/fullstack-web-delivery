// Copyright (c) 2026 KarmenLoop. All rights reserved.
// SPDX-License-Identifier: LicenseRef-KarmenLoop-Source-Available-No-Modification-1.0
import { readFile, writeFile, unlink } from "node:fs/promises";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { createApplication, apiErrors } from "./api.mjs";
import express from "express";

const production = process.argv.includes("--production");
const port = Number(process.env.PORT || 4319);
if (!Number.isSafeInteger(port) || port < 1024 || port > 65535)
  throw new Error("Invalid local port");
const config = JSON.parse(
  await readFile(resolve(".local/runtime.json"), "utf8").catch((error) => {
    throw new Error("Run npm run setup before starting.", { cause: error });
  }),
);
const { app, db } = createApplication({
  filename: resolve(".local/sensu.sqlite"),
  secret: config.secret,
  origin: `http://127.0.0.1:${port}`,
  production,
});
let vite, template, render;
if (production) {
  template = await readFile(resolve("dist/index.html"), "utf8");
  ({ render } = await import(
    pathToFileURL(resolve("dist/server/entry-server.js")).href
  ));
  app.use(express.static(resolve("dist"), { index: false }));
} else {
  const { createServer } = await import("vite");
  vite = await createServer({
    server: { middlewareMode: true },
    appType: "custom",
  });
  app.use(vite.middlewares);
}
app.use(async (req, res, next) => {
  if (req.method !== "GET") return res.status(405).send("Method not allowed");
  if (req.path.startsWith("/assets/") || req.path.startsWith("/src/"))
    return res.status(404).send("Not found");
  try {
    let html = production
      ? template
      : await vite.transformIndexHtml(
          req.originalUrl,
          await readFile(resolve("index.html"), "utf8"),
        );
    const renderPage = production
      ? render
      : (await vite.ssrLoadModule("/src/entry-server.jsx")).render;
    const result = renderPage(req.originalUrl);
    html = html
      .replace("<!--app-html-->", result.html)
      .replace("<!--page-title-->", result.title)
      .replace("<!--page-description-->", result.description);
    res.status(result.status).type("html").send(html);
  } catch (error) {
    if (vite) vite.ssrFixStacktrace(error);
    next(error);
  }
});
app.use(apiErrors);
const receiptPath = resolve(".local/preview-process.json");
const server = app.listen(port, "127.0.0.1", async () => {
  await writeFile(
    receiptPath,
    JSON.stringify(
      {
        pid: process.pid,
        cwd: process.cwd(),
        port,
        mode: production ? "production" : "development",
        startedAt: new Date().toISOString(),
      },
      null,
      2,
    ),
    { mode: 0o600 },
  );
  console.log(
    `SENSU ${production ? "production" : "development"} ready: http://127.0.0.1:${port}`,
  );
});
server.on("error", (error) => {
  console.error(
    error.code === "EADDRINUSE"
      ? "Port is occupied. Select another PORT; no existing process was stopped."
      : error,
  );
  process.exitCode = 1;
  vite?.close();
  db.close();
});
async function stop() {
  server.close(async () => {
    await vite?.close();
    db.close();
    try {
      const receipt = JSON.parse(await readFile(receiptPath, "utf8"));
      if (receipt.pid === process.pid) await unlink(receiptPath);
    } catch (error) {
      if (error.code !== "ENOENT") console.error(error.message);
    }
    process.exit(0);
  });
}
process.once("SIGTERM", stop);
process.once("SIGINT", stop);

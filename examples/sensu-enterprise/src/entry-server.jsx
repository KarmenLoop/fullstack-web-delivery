// Copyright (c) 2026 KarmenLoop. All rights reserved.
// SPDX-License-Identifier: LicenseRef-KarmenLoop-Source-Available-No-Modification-1.0
import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import App from "./App.jsx";
import { pageMeta, routes } from "./content.js";
export function render(url) {
  const path = new URL(url, "http://localhost").pathname;
  const meta = pageMeta(path);
  return {
    html: renderToString(
      <StaticRouter location={url}>
        <App />
      </StaticRouter>,
    ),
    ...meta,
    status: routes.includes(path) ? 200 : 404,
  };
}

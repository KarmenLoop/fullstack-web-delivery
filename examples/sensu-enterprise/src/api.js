// Copyright (c) 2026 KarmenLoop. All rights reserved.
// SPDX-License-Identifier: LicenseRef-KarmenLoop-Source-Available-No-Modification-1.0
let csrfToken = null;
let sessionPromise = null;
async function decode(response) {
  let data;
  try {
    data = await response.json();
  } catch (cause) {
    const error = new Error(
      "The service response could not be read. Refresh and try again.",
      { cause },
    );
    error.code = "RESPONSE_INVALID";
    throw error;
  }
  if (!response.ok) {
    const error = new Error(
      data.message || "The request could not be completed.",
    );
    error.status = response.status;
    error.code = data.code;
    throw error;
  }
  if (data.csrfToken) csrfToken = data.csrfToken;
  return data;
}
export async function request(path, { method = "GET", body } = {}) {
  if (!csrfToken && path !== "/api/session") await getSession();
  let response;
  try {
    response = await fetch(path, {
      method,
      credentials: "same-origin",
      headers: {
        ...(body ? { "Content-Type": "application/json" } : {}),
        ...(["GET", "HEAD"].includes(method)
          ? {}
          : { "X-CSRF-Token": csrfToken }),
      },
      ...(body ? { body: JSON.stringify(body) } : {}),
    });
  } catch (cause) {
    const error = new Error(
      "The connection was interrupted, so the result is unconfirmed. Check your connection and retry.",
      { cause },
    );
    error.code = "NETWORK_ERROR";
    throw error;
  }
  const data = await decode(response);
  if (path === "/api/logout") csrfToken = null;
  return data;
}
export function getSession() {
  sessionPromise ||= request("/api/session").finally(() => {
    sessionPromise = null;
  });
  return sessionPromise;
}

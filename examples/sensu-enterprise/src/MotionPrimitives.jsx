// Copyright (c) 2026 KarmenLoop. All rights reserved.
// SPDX-License-Identifier: LicenseRef-KarmenLoop-Source-Available-No-Modification-1.0
import React from "react";
import { motion } from "motion/react";
import { useMotionPreference } from "./useMotionPreference.js";
import "./motion-primitives.css";

export function AuthSubmit({ phase }) {
  const reduced = useMotionPreference();
  const active = phase === "pending" || phase === "success";
  const check = [
    [14, 27],
    [20, 33],
    [26, 38],
    [32, 30],
    [38, 22],
    [44, 14],
  ];
  const text =
    phase === "pending"
      ? "Signing in…"
      : phase === "success"
        ? "Signed in"
        : "Sign in";
  return (
    <div className="auth-feedback">
      <button className="auth-submit" type="submit" aria-label={text}>
        <motion.span
          layout={!reduced}
          className={"auth-surface" + (active ? " auth-orb" : "")}
          style={{ width: active ? 56 : "100%", borderRadius: active ? 28 : 8 }}
          transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
          aria-hidden="true"
        >
          {active ? (
            <svg
              viewBox="0 0 56 56"
              className={
                "auth-nodes " + (phase === "pending" ? "auth-pending" : "")
              }
            >
              {check.map(([x, y], index) => {
                const angle = (index / 6) * Math.PI * 2;
                return (
                  <motion.circle
                    key={index}
                    r="2.5"
                    animate={{
                      cx: phase === "success" ? x : 28 + Math.cos(angle) * 15,
                      cy: phase === "success" ? y : 28 + Math.sin(angle) * 15,
                    }}
                    transition={{ duration: reduced ? 0 : 0.25 }}
                  />
                );
              })}
              {phase === "success" && (
                <motion.path
                  d="M14 27L26 38L44 14"
                  fill="none"
                  strokeWidth="1.4"
                  initial={{ pathLength: reduced ? 1 : 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: reduced ? 0 : 0.25 }}
                />
              )}
            </svg>
          ) : (
            <span>
              {text}
              <svg viewBox="0 0 24 24">
                <path d="M5 12h14m-6-6 6 6-6 6" />
              </svg>
            </span>
          )}
        </motion.span>
      </button>
      <span className="auth-state" role="status" aria-live="polite">
        {active ? text : ""}
      </span>
    </div>
  );
}

export function Odometer({ value, label }) {
  const reduced = useMotionPreference();
  if (value == null)
    return (
      <span className="ma-odometer" aria-label={label + ": loading"}>
        —
      </span>
    );
  const digits = String(value).padStart(2, "0").split("");
  return (
    <span className="ma-odometer" role="img" aria-label={label + ": " + value}>
      <span aria-hidden="true" className="ma-digits">
        {digits.map((digit, index) => (
          <span className="ma-digit" key={index}>
            <motion.span
              className="ma-digit-track"
              animate={{
                transform: "translateY(-" + Number(digit) * 10 + "%)",
              }}
              transition={{
                duration: reduced ? 0 : 0.25,
                ease: [0.23, 1, 0.32, 1],
              }}
            >
              {Array.from({ length: 10 }, (_, n) => (
                <span key={n}>{n}</span>
              ))}
            </motion.span>
          </span>
        ))}
      </span>
    </span>
  );
}

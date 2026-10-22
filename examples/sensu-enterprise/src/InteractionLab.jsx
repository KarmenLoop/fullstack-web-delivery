// Copyright (c) 2026 KarmenLoop. All rights reserved.
// SPDX-License-Identifier: LicenseRef-KarmenLoop-Source-Available-No-Modification-1.0
import React, { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  ArrowTopRightIcon,
  DashboardIcon,
  ActivityLogIcon,
  MixerHorizontalIcon,
  PlusIcon,
  MinusIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from "@radix-ui/react-icons";
import { animate, motion, useMotionValue } from "motion/react";
import { useMotionPreference as useReducedMotion } from "./useMotionPreference.js";
import { wheelTarget, revealRadius } from "./interaction-math.mjs";
import "./interaction-lab.css";

const spring = { type: "spring", stiffness: 360, damping: 30 };
const patterns = [
  [
    "completion",
    "Complete with clarity",
    "Acknowledge the action. Then confirm the result.",
    "Press → pending → success or retry",
    "A stable button keeps focus while its silhouette changes. The check and particles follow a successful local response.",
  ],
  [
    "linked",
    "One change, shared response",
    "Let related information move together.",
    "Check → progress → count → atmosphere",
    "All four responses derive from the same completed-item count. Reversing a choice reverses the feedback.",
  ],
  [
    "stack",
    "Make room for detail",
    "Open a small collection without losing its place.",
    "Stack → ordered expansion → return",
    "The cards retain their identity. A new input reverses the current spring, including halfway through expansion.",
  ],
  [
    "snap",
    "Settle before advancing",
    "Connect the reading position to the timeline.",
    "Scroll → snap → settled selection → line",
    "Native scrolling preserves touch behavior. The timeline commits only after scrolling settles, with explicit previous and next controls.",
  ],
  [
    "wheel",
    "Choose with momentum",
    "A light flick finds a precise resting point.",
    "Drag → inertia → bounded tick → selection",
    "Velocity projects the next tick; a spring settles within bounds. Keyboard and a native select provide the same choices.",
  ],
  [
    "radial",
    "Carry the point of contact",
    "Connect the trigger to its destination.",
    "Choose view → URL → origin reveal",
    "The reveal starts at the pressed tab. The selected view lives in the URL, including Back and Forward.",
  ],
];
function State({ children }) {
  return (
    <p className="lab-state" role="status" aria-live="polite">
      {children}
    </p>
  );
}
function Completion() {
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState("idle");
  const [fail, setFail] = useState(false);
  const timer = useRef();
  useEffect(() => () => clearTimeout(timer.current), []);
  function save() {
    if (phase === "pending" || phase === "success") return;
    setPhase("pending");
    timer.current = setTimeout(() => setPhase(fail ? "error" : "success"), 650);
  }
  return (
    <div className="lab-completion">
      <div className="lab-document">
        <h3>Ready for handover</h3>
        <p>
          The page audience, primary action and recovery states are documented.
        </p>
        <div className="lab-document-rule" />
        <small>Local interaction study · no business data is saved</small>
      </div>
      <div className="lab-complete-anchor">
        <motion.button
          layout
          className={`lab-complete ${phase}`}
          style={{ width: phase === "success" ? 56 : 208 }}
          transition={reduced ? { duration: 0 } : spring}
          whileTap={reduced ? {} : { scale: 0.95 }}
          disabled={phase === "pending"}
          aria-label={
            phase === "success"
              ? "Completed"
              : phase === "error"
                ? "Retry completion"
                : "Complete review"
          }
          onClick={save}
        >
          {phase === "success" ? (
            <svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true">
              <motion.path
                d="M7 16l6 6L25 9"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: reduced ? 1 : 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  delay: reduced ? 0 : 0.12,
                  duration: reduced ? 0 : 0.2,
                }}
              />
            </svg>
          ) : (
            <span>
              {phase === "pending"
                ? "Completing…"
                : phase === "error"
                  ? "Try again"
                  : "Complete review"}
              <span aria-hidden="true">
                {phase === "pending" ? (
                  " ·"
                ) : (
                  <ArrowTopRightIcon aria-hidden="true" />
                )}
              </span>
            </span>
          )}
        </motion.button>
        {phase === "success" && !reduced && (
          <div className="lab-particles" aria-hidden="true">
            {Array.from({ length: 10 }, (_, i) => (
              <motion.i
                key={i}
                initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                animate={{
                  x: Math.cos((i * Math.PI) / 5) * 69,
                  y: Math.sin((i * Math.PI) / 5) * 69,
                  opacity: 0,
                  scale: 0.4,
                }}
                transition={{ duration: 0.42, delay: 0.18, ease: "easeOut" }}
              />
            ))}
          </div>
        )}
      </div>
      <State>
        {phase === "success"
          ? "Review completed. You can reset and try again."
          : phase === "pending"
            ? "Waiting for the simulated response…"
            : phase === "error"
              ? "Could not complete. Your review is preserved; retry when ready."
              : "Ready when you are."}
      </State>
      <div className="lab-demo-controls">
        <label>
          <input
            type="checkbox"
            checked={fail}
            disabled={phase === "pending"}
            onChange={(e) => setFail(e.target.checked)}
          />{" "}
          Simulate a failed response
        </label>
        <button
          className="lab-text-button"
          disabled={phase === "pending"}
          onClick={() => setPhase("idle")}
        >
          Reset study
        </button>
      </div>
    </div>
  );
}
function RollingCount({ value, reduced }) {
  const number = useMotionValue(value),
    node = useRef();
  useEffect(() => {
    const control = animate(number, value, {
      duration: reduced ? 0 : 0.24,
      ease: "easeOut",
    });
    return () => control.stop();
  }, [value, reduced, number]);
  useEffect(
    () =>
      number.on("change", (v) => {
        if (node.current) node.current.textContent = String(Math.round(v));
      }),
    [number],
  );
  return (
    <span ref={node} aria-hidden="true">
      {value}
    </span>
  );
}
function Linked() {
  const reduced = useReducedMotion(),
    [checked, setChecked] = useState([false, false, false, false]);
  const count = checked.filter(Boolean).length;
  return (
    <div className="lab-linked">
      <motion.div
        className="lab-progress-top"
        animate={{
          backgroundColor: [
            "#edf0e6",
            "#e7eedf",
            "#dce9d4",
            "#cfe2c7",
            "#c0d9b8",
          ][count],
        }}
        transition={{ duration: reduced ? 0 : 0.24 }}
      >
        <div>
          <h3>
            Small steps.
            <br />
            Visible progress.
          </h3>
          <p>
            <RollingCount value={count * 25} reduced={reduced} />% complete
          </p>
        </div>
        <svg
          className="lab-ring"
          viewBox="0 0 100 100"
          aria-label={`${count} of 4 tasks complete`}
          role="img"
        >
          <circle
            cx="50"
            cy="50"
            r="41"
            fill="none"
            stroke="#173d3015"
            strokeWidth="5"
          />
          <motion.circle
            cx="50"
            cy="50"
            r="41"
            fill="none"
            stroke="var(--ink)"
            strokeWidth="5"
            strokeLinecap="round"
            transform="rotate(-90 50 50)"
            strokeDasharray="257.61"
            animate={{ strokeDashoffset: 257.61 * (1 - count / 4) }}
            transition={{ duration: reduced ? 0 : 0.28 }}
          />
          <text x="50" y="56" textAnchor="middle">
            {count}/4
          </text>
        </svg>
      </motion.div>
      <div className="lab-checklist">
        {[
          "Define the primary visitor task",
          "Connect the form to the staff view",
          "Test failure and recovery",
          "Verify keyboard and phone layout",
        ].map((label, i) => (
          <label key={label}>
            <input
              type="checkbox"
              checked={checked[i]}
              onChange={() =>
                setChecked((items) => items.map((v, j) => (j === i ? !v : v)))
              }
            />
            <span>{label}</span>
            <small>0{i + 1}</small>
          </label>
        ))}
      </div>
      <State>
        {count} of 4 tasks complete.{" "}
        {count === 4
          ? "Ready for the final review."
          : "Every choice updates the same progress state."}
      </State>
    </div>
  );
}
const stackItems = [
  [
    "01",
    "Audience & purpose",
    "Who is this page for, and what should they do?",
  ],
  [
    "02",
    "Actions & recovery",
    "What changes, what can fail, and how can someone continue?",
  ],
  ["03", "Evidence & handover", "How do we know the complete path works?"],
];
function Stack() {
  const reduced = useReducedMotion(),
    [open, setOpen] = useState(false);
  return (
    <div className="lab-stack">
      <div className="lab-stack-toolbar">
        <p>Three connected specifications</p>
        <button
          className="lab-small-button"
          aria-expanded={open}
          aria-controls="spec-stack"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Gather cards" : "Explore cards"}{" "}
          <span aria-hidden="true">{open ? <MinusIcon /> : <PlusIcon />}</span>
        </button>
      </div>
      <div className="lab-stack-stage" id="spec-stack">
        {stackItems.map(([n, title, body], i) => (
          <motion.article
            key={n}
            className="lab-stack-card"
            style={{ zIndex: 3 - i }}
            aria-hidden={!open && i > 0}
            initial={false}
            animate={{
              y: open ? i * 111 : i * 13,
              x: open ? 0 : i * 5,
              rotate: open ? 0 : i * 1.5,
              scale: open ? 1 : 1 - i * 0.035,
            }}
            transition={
              reduced
                ? { duration: 0 }
                : { ...spring, delay: (open ? i : 2 - i) * 0.035 }
            }
          >
            <span>{n}</span>
            <div>
              <h3>{title}</h3>
              <p>{body}</p>
            </div>
          </motion.article>
        ))}
      </div>
      <State>
        {open
          ? "All three cards are open."
          : "Cards gathered. Open to read all three."}
      </State>
    </div>
  );
}
const steps = [
  [
    "Discover",
    "Clarify the task",
    "Reuse answers. Resolve only the choices that affect the work.",
  ],
  [
    "Design",
    "Make the contract visible",
    "Define content, actions, state, motion and recovery together.",
  ],
  [
    "Build",
    "Connect a complete flow",
    "Carry the same reference from submission to staff review.",
  ],
  [
    "Verify",
    "Inspect the actual result",
    "Operate the flow, repair failures and retain the evidence.",
  ],
];
function Snap() {
  const reduced = useReducedMotion(),
    viewport = useRef(),
    timeout = useRef(),
    nativeEnd = useRef(false),
    ended = useRef(false),
    pointer = useRef(false),
    touch = useRef(false),
    moving = useRef(false);
  const [selected, setSelected] = useState(0),
    [scrolling, setScrolling] = useState(false);
  function settle() {
    const el = viewport.current;
    if (!el || pointer.current || touch.current) return;
    const middle = el.getBoundingClientRect().top + el.clientHeight / 2;
    const nearest = [...el.querySelectorAll("article")].reduce(
      (best, card, index) => {
        const distance = Math.abs(
          card.getBoundingClientRect().top + card.offsetHeight / 2 - middle,
        );
        return distance < best.distance ? { index, distance } : best;
      },
      { index: 0, distance: Infinity },
    );
    // Quiet input alone is not a resting snap. Require center alignment too.
    if (nearest.distance > 2) return;
    moving.current = false;
    setScrolling(false);
    setSelected(nearest.index);
  }
  function fallback() {
    clearTimeout(timeout.current);
    if (!nativeEnd.current) timeout.current = setTimeout(settle, 160);
  }
  useEffect(() => {
    const el = viewport.current;
    nativeEnd.current = "onscrollend" in el;
    const releasePointer = () => {
      pointer.current = false;
      if (ended.current) settle();
      else fallback();
    };
    const releaseTouch = () => {
      touch.current = false;
      if (ended.current) settle();
      else fallback();
    };
    const onEnd = () => {
      ended.current = true;
      settle();
    };
    el.addEventListener("scrollend", onEnd);
    window.addEventListener("pointerup", releasePointer);
    window.addEventListener("pointercancel", releasePointer);
    window.addEventListener("touchend", releaseTouch);
    window.addEventListener("touchcancel", releaseTouch);
    return () => {
      clearTimeout(timeout.current);
      el.removeEventListener("scrollend", onEnd);
      window.removeEventListener("pointerup", releasePointer);
      window.removeEventListener("pointercancel", releasePointer);
      window.removeEventListener("touchend", releaseTouch);
      window.removeEventListener("touchcancel", releaseTouch);
    };
  }, []);
  function choose(index) {
    const el = viewport.current,
      card = el.querySelectorAll("article")[Math.max(0, Math.min(3, index))];
    const top =
      el.scrollTop +
      card.getBoundingClientRect().top -
      el.getBoundingClientRect().top -
      (el.clientHeight - card.offsetHeight) / 2;
    el.scrollTo({ top, behavior: reduced ? "instant" : "smooth" });
    if (Math.abs(top - el.scrollTop) <= 2) settle();
  }
  return (
    <div className="lab-snap-layout">
      <div className="lab-timeline" aria-label="Workflow progress">
        {steps.map(([label], i) => (
          <div key={label} className={i <= selected ? "active" : ""}>
            <span>{String(i + 1).padStart(2, "0")}</span>
            <p>{label}</p>
            {i < 3 && (
              <span className="lab-timeline-track">
                <motion.i
                  animate={{ scaleY: selected > i ? 1 : 0 }}
                  transition={{ duration: reduced ? 0 : 0.24 }}
                />
              </span>
            )}
          </div>
        ))}
      </div>
      <div className="lab-snap-main">
        <div
          className="lab-snap-viewport"
          ref={viewport}
          tabIndex="0"
          role="region"
          aria-label="Scrollable workflow cards"
          onPointerDown={() => {
            pointer.current = true;
          }}
          onTouchStart={() => {
            touch.current = true;
          }}
          onScroll={() => {
            ended.current = false;
            if (!moving.current) {
              moving.current = true;
              setScrolling(true);
            }
            fallback();
          }}
          onKeyDown={(e) => {
            const map = {
              ArrowDown: selected + 1,
              ArrowUp: selected - 1,
              Home: 0,
              End: 3,
            };
            if (e.key in map) {
              e.preventDefault();
              choose(map[e.key]);
            }
          }}
        >
          {steps.map(([label, title, body], i) => (
            <article key={label} data-selected={selected === i}>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
        <div className="lab-snap-controls">
          <button
            className="lab-small-button"
            disabled={selected === 0}
            onClick={() => choose(selected - 1)}
          >
            <ArrowUpIcon aria-hidden="true" /> Previous
          </button>
          <span>{selected + 1} / 4</span>
          <button
            className="lab-small-button"
            disabled={selected === 3}
            onClick={() => choose(selected + 1)}
          >
            Next <ArrowDownIcon aria-hidden="true" />
          </button>
        </div>
        <State>
          {scrolling
            ? "Scrolling… The timeline waits for a resting, centered card."
            : `Settled on ${steps[selected][0].toLowerCase()}. The timeline follows the resting card.`}
        </State>
      </div>
    </div>
  );
}
const slots = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00"];
function Wheel() {
  const reduced = useReducedMotion(),
    y = useMotionValue(-88),
    control = useRef(),
    ticket = useRef(0),
    target = useRef(2),
    [selected, setSelected] = useState(2),
    [phase, setPhase] = useState("settled");
  useEffect(() => () => control.current?.stop(), []);
  useEffect(() => {
    if (reduced) {
      ++ticket.current;
      control.current?.stop();
      const next =
        phase === "dragging" ? wheelTarget(y.get(), 0, 7) : target.current;
      y.set(-next * 44);
      setSelected(next);
      setPhase("settled");
    }
  }, [reduced, y]);
  function choose(index, velocity = 0) {
    const next = Math.max(0, Math.min(6, index)),
      current = ++ticket.current;
    target.current = next;
    control.current?.stop();
    setPhase("settling");
    control.current = animate(
      y,
      -next * 44,
      reduced
        ? { duration: 0 }
        : { type: "spring", stiffness: 240, damping: 29, velocity },
    );
    control.current.then(() => {
      if (ticket.current === current) {
        setSelected(next);
        setPhase("settled");
      }
    });
  }
  return (
    <div className="lab-wheel-layout">
      <div className="lab-wheel-copy">
        <h3>
          A time that
          <br />
          feels right.
        </h3>
        <p>Drag the wheel, use the arrow keys, or choose a time below.</p>
        <label className="lab-select-label" htmlFor="time-alternative">
          Choose time
          <select
            id="time-alternative"
            value={selected}
            onChange={(e) => choose(Number(e.target.value))}
          >
            {slots.map((s, i) => (
              <option value={i} key={s}>
                {s}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <div
          className="lab-wheel"
          tabIndex="0"
          role="spinbutton"
          aria-label="Consultation time wheel"
          aria-valuemin={0}
          aria-valuemax={6}
          aria-valuenow={selected}
          aria-valuetext={slots[selected]}
          onKeyDown={(e) => {
            const map = {
              ArrowDown: selected + 1,
              ArrowUp: selected - 1,
              Home: 0,
              End: 6,
            };
            if (e.key in map) {
              e.preventDefault();
              choose(map[e.key]);
            }
          }}
        >
          <div className="lab-wheel-selection" aria-hidden="true" />
          <motion.div
            className="lab-wheel-track"
            aria-hidden="true"
            style={{ y, touchAction: "none" }}
            drag="y"
            dragConstraints={{ top: -264, bottom: 0 }}
            dragElastic={reduced ? 0 : 0.18}
            dragMomentum={false}
            onDragStart={() => {
              ++ticket.current;
              control.current?.stop();
              setPhase("dragging");
            }}
            onDragEnd={(_, info) =>
              choose(
                wheelTarget(y.get(), reduced ? 0 : info.velocity.y, 7),
                reduced ? 0 : info.velocity.y,
              )
            }
          >
            {slots.map((slot) => (
              <div key={slot}>{slot}</div>
            ))}
          </motion.div>
        </div>
        <State>
          {phase === "settled"
            ? `Selected ${slots[selected]}.`
            : `${phase === "dragging" ? "Dragging" : "Settling"}… Selection commits at rest.`}
        </State>
      </div>
    </div>
  );
}
const views = ["overview", "activity", "preferences"];
function RadialContent({ view, decorative = false }) {
  const [reminders, setReminders] = useState(true);
  return view === "activity" ? (
    <div>
      <h3>Keep the thread.</h3>
      <ul className="lab-activity">
        <li>
          <span>09:30</span>Project brief received
        </li>
        <li>
          <span>10:15</span>Page contracts prepared
        </li>
        <li>
          <span>11:00</span>Review scheduled
        </li>
      </ul>
    </div>
  ) : view === "preferences" ? (
    <div>
      <h3>
        Make space
        <br />
        for focus.
      </h3>
      <label className="lab-preference">
        <span>Review reminders</span>
        <input
          type="checkbox"
          checked={reminders}
          tabIndex={decorative ? -1 : 0}
          onChange={(e) => setReminders(e.target.checked)}
        />
      </label>
      <p>Reminders {reminders ? "enabled" : "paused"} for this study.</p>
    </div>
  ) : (
    <div>
      <h3>A clear next step.</h3>
      <p>
        The design brief is ready. Continue to activity for the recent changes,
        or adjust your preferences.
      </p>
      <div className="lab-radial-note">
        <span>Next review</span>
        <strong>Today · 11:00</strong>
      </div>
    </div>
  );
}
function Radial() {
  const reduced = useReducedMotion(),
    [params, setParams] = useSearchParams(),
    panel = useRef(),
    pending = useRef(),
    previous = useRef(),
    [transition, setTransition] = useState(null);
  const view = views.includes(params.get("view"))
    ? params.get("view")
    : "overview";
  useEffect(() => {
    if (pending.current !== view) setTransition(null);
    pending.current = null;
    previous.current = view;
  }, [view, reduced]);
  function navigate(e, next) {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0)
      return;
    e.preventDefault();
    if (next === view) return;
    const box = panel.current.getBoundingClientRect(),
      button = e.currentTarget.getBoundingClientRect();
    const x =
        (e.detail ? e.clientX : button.left + button.width / 2) - box.left,
      y = (e.detail ? e.clientY : button.top + button.height / 2) - box.top;
    setTransition(
      reduced
        ? null
        : {
            x,
            y,
            radius: revealRadius(x, y, box.width, box.height),
            old: view,
          },
    );
    pending.current = next;
    setParams({ pattern: "radial", view: next }, { preventScrollReset: true });
  }
  return (
    <div className="lab-radial">
      <div className="lab-radial-panel" ref={panel}>
        {transition?.old && (
          <div
            className={`lab-radial-layer ${transition.old} lab-old-layer`}
            aria-hidden="true"
            inert
          >
            <RadialContent view={transition.old} decorative />
          </div>
        )}
        <motion.section
          key={view}
          className={`lab-radial-layer ${view}`}
          data-settled={!transition?.old}
          aria-label={`${view} view`}
          initial={
            transition
              ? {
                  clipPath: `circle(0px at ${transition.x}px ${transition.y}px)`,
                }
              : false
          }
          animate={{
            clipPath: transition
              ? `circle(${transition.radius}px at ${transition.x}px ${transition.y}px)`
              : "circle(150% at 50% 50%)",
          }}
          transition={{
            duration: reduced ? 0 : 0.38,
            ease: [0.22, 1, 0.36, 1],
          }}
          onAnimationComplete={() =>
            setTransition((t) => (t?.old ? { ...t, old: null } : t))
          }
        >
          <RadialContent view={view} />
        </motion.section>
      </div>
      <nav className="lab-bottom-nav" aria-label="Study views">
        {views.map((item, i) => (
          <Link
            key={item}
            to={`?pattern=radial&view=${item}`}
            aria-current={view === item ? "page" : undefined}
            onClick={(e) => navigate(e, item)}
          >
            <span aria-hidden="true">
              {
                [
                  <DashboardIcon />,
                  <ActivityLogIcon />,
                  <MixerHorizontalIcon />,
                ][i]
              }
            </span>
            {item[0].toUpperCase() + item.slice(1)}
          </Link>
        ))}
      </nav>
      <State>
        Current view: {view}. Back and Forward restore the selected view.
      </State>
    </div>
  );
}
const components = {
  completion: Completion,
  linked: Linked,
  stack: Stack,
  snap: Snap,
  wheel: Wheel,
  radial: Radial,
};
export default function InteractionLab() {
  const [params] = useSearchParams(),
    pattern =
      patterns.find((p) => p[0] === params.get("pattern")) || patterns[0],
    Study = components[pattern[0]],
    reduced = useReducedMotion();
  return (
    <div className="interaction-lab">
      <header className="lab-header">
        <Link to="/" className="lab-brand">
          SENSU <span> / FIELD NOTES</span>
        </Link>
        <a href="https://github.com/KarmenLoop/fullstack-web-delivery">
          Source & documentation <ArrowTopRightIcon aria-hidden="true" />
        </a>
      </header>
      <main id="main">
        <div className="lab-intro">
          <div>
            <h1 tabIndex={-1}>
              Every action
              <br />
              <span>deserves a response.</span>
            </h1>
          </div>
          <p>
            Six ways to make state visible. <br />
            Choose a study. Try it, reverse it, <br />
            and see how the interface responds.
          </p>
        </div>
        <div className="lab-workbench">
          <nav className="lab-index" aria-label="Interaction studies">
            {patterns.map(([id, title], i) => (
              <Link
                to={`?pattern=${id}`}
                key={id}
                aria-current={id === pattern[0] ? "page" : undefined}
              >
                <span>0{i + 1}</span>
                <strong>{title}</strong>
                <ArrowTopRightIcon aria-hidden="true" />
              </Link>
            ))}
            <p className="lab-index-note">
              Built on the existing cream and forest design system.
              <br />
              <br />
              {reduced
                ? "Reduced motion is active. Tasks remain fully available."
                : "Motion follows state. It never substitutes for a result."}
            </p>
          </nav>
          <section className="lab-study" aria-labelledby="study-heading">
            <div className="lab-study-heading">
              <h2 id="study-heading">{pattern[2]}</h2>
            </div>
            <div className={`lab-canvas lab-${pattern[0]}-canvas`}>
              <Study key={pattern[0]} />
            </div>
            <div className="lab-contract">
              <h3>{pattern[3]}</h3>
              <p>{pattern[4]}</p>
            </div>
          </section>
        </div>
        <footer className="lab-footer">
          <span>Fictional project. Real controls. Local demonstrations.</span>
          <Link to="/contact">
            Explore the complete inquiry flow{" "}
            <ArrowTopRightIcon aria-hidden="true" />
          </Link>
        </footer>
      </main>
    </div>
  );
}

// Copyright (c) 2026 KarmenLoop. All rights reserved.
// SPDX-License-Identifier: LicenseRef-KarmenLoop-Source-Available-No-Modification-1.0
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import * as Dialog from "@radix-ui/react-dialog";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  Cross2Icon,
  MagnifyingGlassIcon,
  MoonIcon,
  SunIcon,
  PlusIcon,
  MinusIcon,
} from "@radix-ui/react-icons";
import { motion, LayoutGroup, useScroll, useTransform } from "motion/react";
import { Odometer } from "./MotionPrimitives.jsx";
import MetalCard from "./MetalCard.jsx";
import { useMotionPreference } from "./useMotionPreference.js";
import "./motion-atlas.css";

const ease = [0.23, 1, 0.32, 1];
const spring = { type: "spring", duration: 0.5, bounce: 0.2 };
const terms = [
  [
    "Scroll reveal",
    "A threshold starts one short entrance. The content stays readable if the animation never runs.",
    "reveal",
  ],
  [
    "Scroll-linked",
    "Progress follows actual scroll position and reverses with it. There is no timed imitation.",
    "linked",
  ],
  [
    "Parallax",
    "A small difference in decorative layer speed suggests depth. Reading and controls stay still.",
    "parallax",
  ],
  [
    "Sticky",
    "Context stays beside the content until its own section ends. Native scrolling remains in charge.",
    "sticky",
  ],
  [
    "Scroll snap",
    "The browser settles an overflowing rail at a useful alignment. It does not lock the whole page.",
    "snap",
  ],
  [
    "Horizontal scroll",
    "A local rail keeps related comparisons together, with buttons, keys and a visible scrollbar.",
    "horizontal",
  ],
];

async function readPolicy(query, signal) {
  const response = await fetch(
    "/api/demo/access-map?q=" + encodeURIComponent(query),
    { signal, credentials: "same-origin" },
  );
  const data = await response.json();
  if (!response.ok)
    throw new Error(data.message || "The demo policy could not be read.");
  return data;
}

function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null),
    seen = useRef(false);
  const reduced = useMotionPreference();
  useEffect(() => {
    if (reduced || seen.current || !window.IntersectionObserver) return;
    let animation;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        seen.current = true;
        animation = ref.current.animate(
          [
            { opacity: 0.35, transform: "translateY(12px)" },
            { opacity: 1, transform: "translateY(0)" },
          ],
          { duration: 300, delay, easing: "cubic-bezier(0.23,1,0.32,1)" },
        );
        observer.disconnect();
      },
      { threshold: 0.12 },
    );
    observer.observe(ref.current);
    return () => {
      observer.disconnect();
      animation?.cancel();
    };
  }, [delay, reduced]);
  return (
    <div className={className} ref={ref}>
      {children}
    </div>
  );
}

function ScrollStudy() {
  const section = useRef(null),
    rail = useRef(null);
  const reduced = useMotionPreference();
  const { scrollYProgress } = useScroll({
    target: section,
    offset: ["start center", "end center"],
  });
  const depth = useTransform(
    scrollYProgress,
    [0, 1],
    ["translateY(16px)", "translateY(-16px)"],
  );
  const [index, setIndex] = useState(0);
  function move(delta) {
    const next = Math.max(0, Math.min(terms.length - 1, index + delta));
    rail.current.children[next].scrollIntoView({
      behavior: reduced ? "instant" : "smooth",
      block: "nearest",
      inline: "start",
    });
  }
  useEffect(() => {
    const node = rail.current;
    function resize() {
      const last = node.lastElementChild;
      node.style.setProperty(
        "--ma-rail-tail",
        Math.max(
          0,
          node.clientWidth - last.getBoundingClientRect().width - 16,
        ) + "px",
      );
    }
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(node);
    function update() {
      const left = node.getBoundingClientRect().left;
      const positions = Array.from(node.children, (child) =>
        Math.abs(child.getBoundingClientRect().left - left),
      );
      setIndex(positions.indexOf(Math.min(...positions)));
    }
    node.addEventListener("scroll", update, { passive: true });
    return () => {
      node.removeEventListener("scroll", update);
      observer.disconnect();
    };
  }, []);
  return (
    <section id="scroll-study" className="ma-section">
      <div className="ma-section-heading">
        <h2>Give scrolling a job.</h2>
        <p>Six mechanisms, each with a different responsibility.</p>
      </div>
      <div className="ma-scroll-story" ref={section}>
        <aside className="ma-sticky-context">
          <div className="ma-progress-track">
            <motion.div
              style={{ scaleY: scrollYProgress, transformOrigin: "top" }}
            />
          </div>
          <div>
            <h3>One inquiry, three steps.</h3>
            <p>
              The explanation stays in view while the sequence advances. Scroll
              back to reverse the progress.
            </p>
            <div className="ma-depth-scene" aria-hidden="true">
              <motion.div
                className="ma-depth-plane"
                style={{ transform: reduced ? "none" : depth }}
              />
              <span>Visitor</span>
              <span>Validation</span>
              <span>Recorded result</span>
            </div>
            <p className="ma-small">
              The offset plane is decorative parallax. Labels and controls do
              not move with it.
            </p>
          </div>
        </aside>
        <div className="ma-story-steps">
          {[
            [
              "Explain before input",
              "Give the visitor a clear purpose, required fields and privacy context. Reveal introduces this explanation once.",
            ],
            [
              "Keep the result honest",
              "A submitted form enters pending state. Its receipt follows the server's save, rather than the end of an animation.",
            ],
            [
              "Preserve the connection",
              "The same reference appears in staff details and audit history. Motion explains the change; the data establishes it.",
            ],
          ].map(([title, text]) => (
            <Reveal key={title} className="ma-story-step">
              <h3>{title}</h3>
              <p>{text}</p>
            </Reveal>
          ))}
        </div>
      </div>
      <div className="ma-rail-heading">
        <p id="ma-rail-label">Compare the scroll mechanisms</p>
        <div className="ma-rail-actions">
          <button
            type="button"
            onClick={() => move(-1)}
            disabled={index === 0}
            aria-label="Previous scroll mechanism"
          >
            <ArrowLeftIcon />
          </button>
          <span aria-live="polite">
            {index + 1} / {terms.length}
          </span>
          <button
            type="button"
            onClick={() => move(1)}
            disabled={index === terms.length - 1}
            aria-label="Next scroll mechanism"
          >
            <ArrowRightIcon />
          </button>
        </div>
      </div>
      <div
        className="ma-mechanism-rail"
        tabIndex={0}
        ref={rail}
        role="region"
        aria-labelledby="ma-rail-label"
      >
        {terms.map(([name, text, id], i) => (
          <Reveal
            key={id}
            className="ma-mechanism"
            delay={Math.min(i * 40, 160)}
          >
            <div className={"ma-term-diagram ma-term-" + id} aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <h3>{name}</h3>
            <p>{text}</p>
          </Reveal>
        ))}
      </div>
      <p className="ma-small">
        Native horizontal overflow + proximity snap. Use Previous/Next, arrow
        keys in the rail, or the scrollbar. Vertical scrolling is never
        redirected.
      </p>
    </section>
  );
}

function Constellation({ data, selected, revision, onSelect }) {
  const reduced = useMotionPreference();
  const department = data.departments.find((d) => d.id === selected);
  const x = department.x * 6.4;
  return (
    <div className="ma-constellation" aria-label="Department relationship map">
      <svg viewBox="0 0 640 280" preserveAspectRatio="none" aria-hidden="true">
        {data.departments.map((d, index) => {
          const dx = d.x * 6.4;
          const permissions = data.roles.find(
            (role) => role.departmentId === d.id,
          ).permissions;
          return (
            <g key={d.id}>
              <motion.path
                d={"M320 35V105H" + dx + "V196"}
                className="ma-map-edge"
                initial={{ pathLength: reduced ? 1 : 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: reduced ? 0 : 0.5,
                  delay: reduced ? 0 : index * 0.05,
                }}
              />
              {permissions.map((permission, leaf) => {
                const angle = (leaf / permissions.length) * Math.PI + Math.PI;
                const lx = dx + Math.cos(angle) * 44,
                  ly = 196 + Math.sin(angle) * 46;
                return (
                  <g key={permission}>
                    <path
                      d={"M" + dx + " 196L" + lx + " " + ly}
                      className="ma-map-leaf"
                    />
                    <circle cx={lx} cy={ly} r="2.5" className="ma-leaf-dot" />
                  </g>
                );
              })}
            </g>
          );
        })}
        <motion.path
          key={"path-" + revision}
          d={"M320 35V105H" + x + "V196"}
          className="ma-map-active"
          initial={{ pathLength: reduced ? 1 : 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: reduced ? 0 : 0.5, ease }}
        />
        {reduced ? (
          <circle cx={x} cy="196" r="4" className="ma-trace-dot" />
        ) : (
          <motion.circle
            key={"trace-" + revision}
            r="4"
            className="ma-trace-dot"
            initial={{ transform: "translate(320px,35px)" }}
            animate={{
              transform: [
                "translate(320px,35px)",
                "translate(320px,105px)",
                "translate(" + x + "px,105px)",
                "translate(" + x + "px,196px)",
              ],
            }}
            transition={{
              duration: 0.65,
              ease: "linear",
              times: [0, 0.25, 0.7, 1],
            }}
          />
        )}
      </svg>
      <div className="ma-map-root">Sample workspace</div>
      {data.departments.map((d) => (
        <button
          key={d.id}
          type="button"
          id={"ma-node-" + d.id}
          className={"ma-node" + (selected === d.id ? " is-selected" : "")}
          style={{ left: d.x + "%", top: d.y + "%" }}
          aria-pressed={selected === d.id}
          onClick={() => onSelect(d.id)}
        >
          {d.name}
        </button>
      ))}
    </div>
  );
}

function Heatmap({ data, selected, revision }) {
  const reduced = useMotionPreference();
  const values = data.activity[selected];
  return (
    <div className="ma-activity">
      <h3>Activity responds with the path.</h3>
      <p>
        {data.departments.find((d) => d.id === selected).name} · four sample
        weeks
      </p>
      <div className="ma-heatmap" aria-hidden="true">
        {values.map((value, i) => (
          <motion.span
            key={revision + "-" + i}
            className={"ma-heat-" + Math.min(4, Math.floor(value / 3))}
            initial={
              reduced ? false : { opacity: 0.4, transform: "scale(0.94)" }
            }
            animate={{ opacity: 1, transform: "scale(1)" }}
            transition={{
              duration: reduced ? 0 : 0.2,
              delay: reduced ? 0 : (i % 7) * 0.018 + Math.floor(i / 7) * 0.012,
            }}
          />
        ))}
      </div>
      <div className="ma-heat-legend">
        <span>0 events</span>
        <span>12 events</span>
      </div>
      <details className="ma-values">
        <summary>Read the sample values</summary>
        <table>
          <caption>Illustrative events, Monday through Sunday</caption>
          <tbody>
            {Array.from({ length: 4 }, (_, week) => (
              <tr key={week}>
                <th scope="row">Week {week + 1}</th>
                {values.slice(week * 7, week * 7 + 7).map((v, day) => (
                  <td key={day}>{v}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </details>
      <p className="ma-small">{data.activityLabel}</p>
    </div>
  );
}

function CardTransfer() {
  const reduced = useMotionPreference();
  const [assigned, setAssigned] = useState(false);
  const card = (
    <motion.div
      layoutId="ma-handoff-card"
      className="ma-transfer-card"
      transition={reduced ? { duration: 0 } : spring}
    >
      <strong>Website inquiry</strong>
      <span>Reference DEMO-01 · local continuity study</span>
    </motion.div>
  );
  return (
    <section id="continuity" className="ma-section">
      <div className="ma-section-heading">
        <h2>Keep the object recognizable.</h2>
        <p>One card moves to its destination; its identity stays the same.</p>
      </div>
      <LayoutGroup id="ma-transfer">
        <div className="ma-transfer">
          <div className="ma-transfer-slot">
            <h3>Available</h3>
            {!assigned ? card : <p>Moved to the destination.</p>}
          </div>
          <div className="ma-transfer-slot">
            <h3>Assigned</h3>
            {assigned ? card : <p>Ready for the same card.</p>}
          </div>
        </div>
      </LayoutGroup>
      <div className="ma-transfer-actions">
        <button type="button" onClick={() => setAssigned(!assigned)}>
          {assigned ? "Return the card" : "Assign the card"}
          <ArrowRightIcon />
        </button>
        <p role="status">
          {assigned ? "DEMO-01 is assigned." : "DEMO-01 is available."} This
          study does not change an inquiry.
        </p>
      </div>
      <div className="ma-auth-link">
        <div>
          <h3>Authentication has a real result.</h3>
          <p>
            The staff sign-in button becomes a compact orb while the request is
            pending. Its nodes form a check only after the API confirms the
            session.
          </p>
        </div>
        <Link to="/login">
          Open staff sign-in <ArrowRightIcon />
        </Link>
      </div>
    </section>
  );
}

export default function MotionAtlas() {
  const reduced = useMotionPreference();
  const [theme, setTheme] = useState("light");
  const [model, setModel] = useState(null),
    [loadError, setLoadError] = useState(""),
    [reload, setReload] = useState(0);
  const [selected, setSelected] = useState("operations"),
    [expanded, setExpanded] = useState(null),
    [revision, setRevision] = useState(0);
  const [open, setOpen] = useState(false),
    [query, setQuery] = useState(""),
    [result, setResult] = useState(null),
    [queryState, setQueryState] = useState("idle"),
    [queryError, setQueryError] = useState("");
  const commandTrigger = useRef(null),
    queryInput = useRef(null),
    returnFocus = useRef(null),
    destinationFocus = useRef(null),
    queryAbort = useRef(null),
    modelEpoch = useRef(0),
    workspace = useRef(null);
  useEffect(() => {
    try {
      const saved = localStorage.getItem("sensu-motion-appearance");
      if (saved === "light" || saved === "dark") setTheme(saved);
    } catch {}
  }, []);
  useEffect(() => {
    const controller = new AbortController();
    const epoch = ++modelEpoch.current;
    setLoadError("");
    readPolicy("", controller.signal)
      .then((data) => {
        if (!controller.signal.aborted && epoch === modelEpoch.current)
          setModel(data);
      })
      .catch((error) => {
        if (!controller.signal.aborted && epoch === modelEpoch.current)
          setLoadError(error.message);
      });
    return () => controller.abort();
  }, [reload]);
  useEffect(() => () => queryAbort.current?.abort(), []);
  function openCommand() {
    returnFocus.current = document.activeElement;
    setOpen(true);
  }
  useEffect(() => {
    function key(event) {
      if (
        (event.metaKey || event.ctrlKey) &&
        !event.altKey &&
        !event.shiftKey &&
        !event.isComposing &&
        event.key.toLowerCase() === "k"
      ) {
        event.preventDefault();
        openCommand();
      }
    }
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, []);
  function changeTheme() {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    try {
      localStorage.setItem("sensu-motion-appearance", next);
    } catch {}
  }
  function selectDepartment(id) {
    setSelected(id);
    setExpanded(id);
    setRevision((v) => v + 1);
  }
  async function runQuery(text) {
    setQuery(text);
    setResult(null);
    setQueryError("");
    setQueryState("pending");
    queryAbort.current?.abort();
    const controller = new AbortController();
    queryAbort.current = controller;
    try {
      const data = await readPolicy(text, controller.signal);
      if (!controller.signal.aborted) {
        ++modelEpoch.current;
        setModel(data);
        setLoadError("");
        setResult(data);
        setQueryState("ready");
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        setQueryError(error.message);
        setQueryState("error");
      }
    }
  }
  function chooseRole(role) {
    selectDepartment(role.departmentId);
    destinationFocus.current = "ma-node-" + role.departmentId;
    setOpen(false);
    workspace.current.scrollIntoView({ behavior: "instant", block: "start" });
  }
  const activeRole = model?.roles.find(
    (role) => role.departmentId === selected,
  );
  const scopeClass = "ma-theme-" + theme;
  return (
    <div className={"motion-atlas " + scopeClass}>
      <a href="#main" className="skip-link">
        Skip to main content
      </a>
      <header className="ma-header">
        <Link to="/">
          SENSU <span>Digital</span>
        </Link>
        <nav aria-label="Motion atlas navigation">
          <a href="#workspace">Access map</a>
          <a href="#scroll-study">Scroll</a>
          <a href="#material">Material</a>
          <a href="#continuity">Continuity</a>
          <Link to="/interaction-lab">Six studies</Link>
        </nav>
        <button
          type="button"
          onClick={changeTheme}
          aria-label={
            theme === "light"
              ? "Switch to dark appearance"
              : "Switch to light appearance"
          }
          aria-pressed={theme === "dark"}
        >
          {theme === "light" ? <MoonIcon /> : <SunIcon />}
          <span>{theme === "light" ? "Dark" : "Light"}</span>
        </button>
      </header>
      <main id="main" className="ma-main">
        <div className="ma-intro">
          <h1>A field guide to motion.</h1>
          <p>
            Trace a relationship, inspect its source, and see how the interface
            responds. Every effect has a task, a state and a quieter
            alternative.
          </p>
        </div>
        <section
          id="workspace"
          className="ma-workspace ma-section"
          ref={workspace}
        >
          <div className="ma-workspace-toolbar">
            <div>
              <h2>Follow a permission.</h2>
              <p>Fictional, read-only policy · separate from staff accounts</p>
            </div>
            <button
              type="button"
              ref={commandTrigger}
              onClick={openCommand}
              aria-keyshortcuts="Meta+K Control+K"
            >
              <MagnifyingGlassIcon />
              Ask about access <kbd>⌘ K</kbd>
            </button>
          </div>
          {loadError ? (
            <div className="ma-load-error" role="alert">
              <p>{loadError}</p>
              <button type="button" onClick={() => setReload((v) => v + 1)}>
                Retry policy loading
              </button>
            </div>
          ) : !model ? (
            <p role="status" className="ma-loading">
              Loading the sample policy…
            </p>
          ) : (
            <>
              <div className="ma-map-and-activity">
                <div className="ma-map-region">
                  <Constellation
                    data={model}
                    selected={selected}
                    revision={revision}
                    onSelect={selectDepartment}
                  />
                  <p role="status" className="ma-selection-status">
                    {model.departments.find((d) => d.id === selected).name}{" "}
                    selected. Trace starts at the workspace; related activity
                    and details use the same department.
                  </p>
                </div>
                <Heatmap data={model} selected={selected} revision={revision} />
              </div>
              <div className="ma-policy-summary">
                <div>
                  <Odometer
                    value={activeRole.permissions.length}
                    label="Permissions in selected role"
                  />
                  <span>permissions in this role</span>
                </div>
                <div>
                  <strong>{activeRole.name}</strong>
                  <span>Source: {model.version}</span>
                </div>
                <p>Example policy only. This interface cannot change access.</p>
              </div>
              <LayoutGroup id="ma-role-details">
                <div className="ma-role-grid">
                  {model.departments.map((d) => {
                    const role = model.roles.find(
                        (r) => r.departmentId === d.id,
                      ),
                      isExpanded = expanded === d.id;
                    return (
                      <motion.article
                        key={d.id}
                        layout={!reduced}
                        className={
                          "ma-role-card" + (isExpanded ? " is-expanded" : "")
                        }
                        transition={reduced ? { duration: 0 } : spring}
                      >
                        <button
                          type="button"
                          aria-expanded={isExpanded}
                          aria-controls={"ma-detail-" + d.id}
                          onClick={() => {
                            setSelected(d.id);
                            setExpanded(isExpanded ? null : d.id);
                            if (selected !== d.id) setRevision((v) => v + 1);
                          }}
                        >
                          <span>
                            <strong>{d.name}</strong>
                            <span>{role.name}</span>
                          </span>
                          {isExpanded ? <MinusIcon /> : <PlusIcon />}
                        </button>
                        <div
                          id={"ma-detail-" + d.id}
                          hidden={!isExpanded}
                          className="ma-role-detail"
                        >
                          <p>{d.responsibility}</p>
                          <p>
                            Illustrative assignment: {role.people.join(", ")}.
                          </p>
                          <ul>
                            {role.permissions.map((permission) => (
                              <li key={permission}>
                                <code>{permission}</code>
                              </li>
                            ))}
                          </ul>
                          <p className="ma-small">
                            Role ID: {role.id}. No live account or permission
                            write.
                          </p>
                        </div>
                      </motion.article>
                    );
                  })}
                </div>
              </LayoutGroup>
            </>
          )}
        </section>
        <ScrollStudy />
        <MetalCard />
        <CardTransfer />
        <footer className="ma-footer">
          <p>
            Local educational example · Keyboard and reduced-motion paths
            included
          </p>
          <Link to="/contact">
            Open the real inquiry flow <ArrowRightIcon />
          </Link>
        </footer>
      </main>
      <Dialog.Root
        open={open}
        onOpenChange={(value) => {
          setOpen(value);
          if (!value) {
            queryAbort.current?.abort();
            if (queryState === "pending") setQueryState("idle");
          }
        }}
      >
        <Dialog.Portal>
          <Dialog.Overlay className={"ma-command-overlay " + scopeClass} />
          <Dialog.Content
            className={"ma-command-panel " + scopeClass}
            onOpenAutoFocus={(event) => {
              event.preventDefault();
              queryInput.current?.focus();
            }}
            onCloseAutoFocus={(event) => {
              event.preventDefault();
              const target = destinationFocus.current
                ? document.getElementById(destinationFocus.current)
                : returnFocus.current;
              destinationFocus.current = null;
              (target?.isConnected && target !== document.body
                ? target
                : commandTrigger.current
              )?.focus({
                preventScroll: true,
              });
            }}
          >
            <div className="ma-command-heading">
              <Dialog.Title>Ask about access</Dialog.Title>
              <Dialog.Close asChild>
                <button type="button" aria-label="Close access search">
                  <Cross2Icon />
                </button>
              </Dialog.Close>
            </div>
            <Dialog.Description>
              Search the fictional server policy. Answers include their rule and
              role source; no permissions are changed.
            </Dialog.Description>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                runQuery(query);
              }}
            >
              <label htmlFor="ma-query">Question or team</label>
              <div className="ma-query-input">
                <MagnifyingGlassIcon />
                <input
                  ref={queryInput}
                  id="ma-query"
                  autoComplete="off"
                  maxLength={160}
                  value={query}
                  placeholder="Who can revoke user access?"
                  onChange={(event) => {
                    setQuery(event.target.value);
                    queryAbort.current?.abort();
                    setResult(null);
                    setQueryState("idle");
                  }}
                />
                <button type="submit">Search</button>
              </div>
            </form>
            <button
              type="button"
              className="ma-suggested"
              onClick={() => runQuery("Who can revoke user access?")}
            >
              Who can revoke user access? <ArrowRightIcon />
            </button>
            {queryState === "pending" && (
              <p role="status">Checking the demo policy…</p>
            )}
            {queryError && queryState === "error" && (
              <p role="alert">{queryError} Submit again to retry.</p>
            )}
            {result && (
              <div className="ma-query-result" aria-live="polite">
                <p>{result.query.summary}</p>
                <p className="ma-small">
                  {result.version} · {result.query.sourceRule}
                </p>
                {result.roles
                  .filter((role) => result.query.roleIds.includes(role.id))
                  .map((role) => (
                    <button
                      key={role.id}
                      type="button"
                      onClick={() => chooseRole(role)}
                    >
                      <span>
                        <strong>{role.name}</strong>
                        <span>
                          {role.people.join(", ")} · {role.departmentId}
                        </span>
                      </span>
                      <ArrowRightIcon />
                    </button>
                  ))}
              </div>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}

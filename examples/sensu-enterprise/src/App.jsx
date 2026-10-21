// Copyright (c) 2026 KarmenLoop. All rights reserved.
// SPDX-License-Identifier: LicenseRef-KarmenLoop-Source-Available-No-Modification-1.0
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Link,
  NavLink,
  Routes,
  Route,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import * as Dialog from "@radix-ui/react-dialog";
import {
  ArrowRightIcon,
  ArrowTopRightIcon,
  CheckIcon,
  Cross2Icon,
  HamburgerMenuIcon,
  Component1Icon,
  ExitIcon,
  MagnifyingGlassIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ReloadIcon,
  LockClosedIcon,
} from "@radix-ui/react-icons";
import {
  motion,
  AnimatePresence,
  MotionConfig,
  useReducedMotion,
} from "motion/react";
import { services, statuses, pageMeta } from "./content.js";
import { request, getSession } from "./api.js";

const Session = createContext(null);
const Arrow = () => <ArrowRightIcon aria-hidden="true" />;
const spring = { type: "spring", stiffness: 360, damping: 30 };
function Action({ to, children, secondary = false, ...props }) {
  const reduced = useReducedMotion();
  return (
    <motion.span
      className="action-wrap"
      whileTap={reduced ? {} : { scale: 0.97 }}
      transition={spring}
    >
      {to ? (
        <Link
          className={`button ${secondary ? "button-secondary" : ""}`}
          to={to}
          {...props}
        >
          {children}
          <Arrow />
        </Link>
      ) : (
        <button
          className={`button ${secondary ? "button-secondary" : ""}`}
          {...props}
        >
          {children}
        </button>
      )}
    </motion.span>
  );
}
function Brand() {
  return (
    <Link className="brand" to="/" aria-label="SENSU Digital home">
      <Component1Icon aria-hidden="true" />
      <span>
        SENSU<span className="brand-en">DIGITAL</span>
      </span>
    </Link>
  );
}
const nav = [
  ["/", "Home"],
  ["/services", "Services"],
  ["/method", "Approach"],
  ["/about", "About"],
];
function Header() {
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();
  const location = useLocation();
  useEffect(() => setOpen(false), [location.pathname]);
  return (
    <header className="site-header">
      <div className="header-inner">
        <Brand />
        <nav className="desktop-nav" aria-label="Main navigation">
          {nav.map(([to, label]) => (
            <NavLink end={to === "/"} key={to} to={to}>
              {label}
            </NavLink>
          ))}
        </nav>
        <Link className="header-cta" to="/contact">
          Let’s talk <ArrowTopRightIcon aria-hidden="true" />
        </Link>
        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger asChild>
            <button
              className="icon-button mobile-menu"
              aria-label="Open navigation menu"
            >
              <HamburgerMenuIcon />
            </button>
          </Dialog.Trigger>
          <Dialog.Portal forceMount>
            <AnimatePresence>
              {open && (
                <React.Fragment key="mobile-menu">
                  <Dialog.Overlay asChild forceMount>
                    <motion.div
                      className="overlay"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: reduced ? 0 : 0.15 }}
                    />
                  </Dialog.Overlay>
                  <Dialog.Content asChild forceMount>
                    <motion.div
                      className="menu-panel"
                      initial={{ x: reduced ? 0 : 40, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: reduced ? 0 : 40, opacity: 0 }}
                      transition={reduced ? { duration: 0 } : spring}
                    >
                      <div className="dialog-heading">
                        <Dialog.Title>Explore SENSU</Dialog.Title>
                        <Dialog.Close asChild>
                          <button
                            className="icon-button"
                            aria-label="Close navigation menu"
                          >
                            <Cross2Icon />
                          </button>
                        </Dialog.Close>
                      </div>
                      <Dialog.Description className="sr-only">
                        Choose a page, or press Escape to close.
                      </Dialog.Description>
                      <nav aria-label="Mobile navigation">
                        {nav.map(([to, label]) => (
                          <NavLink end={to === "/"} key={to} to={to}>
                            {label}
                            <Arrow />
                          </NavLink>
                        ))}
                        <Link to="/contact">
                          Start an inquiry
                          <Arrow />
                        </Link>
                      </nav>
                    </motion.div>
                  </Dialog.Content>
                </React.Fragment>
              )}
            </AnimatePresence>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </header>
  );
}
function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <Brand />
        <p>Clear business. Connected work.</p>
        <div>
          <Link to="/privacy">Privacy</Link>
          <Link to="/login">Staff sign-in</Link>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 KarmenLoop · SENSU demo</span>
        <span>Fictional company demo · Use test information only</span>
      </div>
    </footer>
  );
}
function Shell({ children }) {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to main content
      </a>
      <Header />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}
function PageIntro({ label, title, children }) {
  return (
    <div className="page-intro container">
      <h1 tabIndex={-1}>{title}</h1>
      {children && <p className="intro-copy">{children}</p>}
    </div>
  );
}
function ConsultationCTA() {
  return (
    <section className="consult-section container" data-reveal>
      <div>
        <h2>
          Start with one
          <br />
          specific problem.
        </h2>
        <p>
          Tell us about your business, what happens today, and what you want to
          change.
        </p>
      </div>
      <Action to="/contact">Discuss your project</Action>
    </section>
  );
}
function ServiceRows({ extended = false }) {
  return (
    <div className="service-rows">
      {services.map((s) => (
        <Link
          to={`/services/${s.id}`}
          className="service-row"
          key={s.id}
          data-reveal
        >
          <div>
            <h3>{s.title}</h3>
          </div>
          <div>
            <p>{s.summary}</p>
            {extended && (
              <p className="muted service-description">{s.description}</p>
            )}
            <div className="service-tags">
              {s.tags.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          </div>
          <span className="round-arrow">
            <Arrow />
          </span>
        </Link>
      ))}
    </div>
  );
}
const studioStories = [
  {
    id: "website",
    title: "Websites",
    heading: "Help the right people understand your work.",
    description: "Connect your brand, services, and a working inquiry flow.",
    steps: ["Explore services", "Send an inquiry", "Follow up"],
    action: "Plan my website",
  },
  {
    id: "systems",
    title: "Business systems",
    heading: "Keep information and people connected.",
    description:
      "Bring requests, people, and status into one practical workflow.",
    steps: ["One inbox", "Shared ownership", "Visible progress"],
    action: "Map my workflow",
  },
  {
    id: "automation",
    title: "Automation",
    heading: "Give repeated work a reliable path.",
    description:
      "Connect existing systems, route tasks, and make exceptions visible.",
    steps: ["Trigger", "Check and run", "Trace results"],
    action: "Explore automation",
  },
];
function WorkflowPreview({ story }) {
  return (
    <div className={`workflow-preview preview-${story.id}`}>
      <div className="workflow-heading">
        <span className="mini-brand">
          <Component1Icon />
          SENSU
        </span>
        <span>Service delivery example</span>
      </div>
      {story.id === "website" ? (
        <div className="mini-website">
          <div className="mini-website-title">
            <h3>
              A clearer story,
              <br />a useful next step.
            </h3>
            <span>
              Clear content
              <br />
              Useful paths
            </span>
          </div>
          <div className="mini-website-sections">
            <span>Brand and content</span>
            <span>Services and value</span>
            <span>Inquiries and follow-up</span>
          </div>
        </div>
      ) : story.id === "systems" ? (
        <div className="mini-board">
          <h3>A shared request workspace</h3>
          <div className="mini-board-columns">
            {[
              ["New", "Website content map"],
              ["In progress", "Roles and access"],
              ["Done", "Inquiry flow check"],
            ].map(([state, task]) => (
              <div key={state}>
                <span className={`mini-state mini-${state}`}>{state}</span>
                <p>{task}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="mini-automation">
          <h3>Put routine work on a clear path.</h3>
          <div className="automation-path">
            <span>Request received</span>
            <Arrow />
            <span>Rules checked</span>
            <Arrow />
            <span>Task assigned</span>
          </div>
          <p>
            <CheckIcon />A traceable result
            <span>Human review for exceptions</span>
          </p>
        </div>
      )}
      <div className="workflow-bottom">
        {story.steps.map((step, index) => (
          <React.Fragment key={step}>
            <span>{step}</span>
            {index < 2 && <Arrow />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
function ServiceStudio() {
  const [active, setActive] = useState("website");
  const reduced = useReducedMotion();
  const story = studioStories.find((item) => item.id === active);
  const tabRefs = useRef([]);
  function keys(event, index) {
    const next =
      event.key === "ArrowRight"
        ? (index + 1) % 3
        : event.key === "ArrowLeft"
          ? (index + 2) % 3
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? 2
              : null;
    if (next !== null) {
      event.preventDefault();
      setActive(studioStories[next].id);
      tabRefs.current[next]?.focus();
    }
  }
  return (
    <section className="studio" aria-label="Service scenarios">
      <div className="studio-bar">
        <div
          className="studio-tabs"
          role="tablist"
          aria-label="Choose a service scenario"
        >
          {studioStories.map((item, index) => (
            <button
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              role="tab"
              aria-selected={active === item.id}
              tabIndex={active === item.id ? 0 : -1}
              aria-controls={`scene-${item.id}`}
              id={`tab-${item.id}`}
              onKeyDown={(event) => keys(event, index)}
              onClick={() => setActive(item.id)}
              key={item.id}
              className={active === item.id ? "selected" : ""}
            >
              <span>{item.title}</span>
              {active === item.id && (
                <motion.span
                  className="studio-tab-indicator"
                  layoutId="studio-active"
                  transition={reduced ? { duration: 0 } : spring}
                  aria-hidden="true"
                />
              )}
            </button>
          ))}
        </div>
        <span className="demo-caption">
          Illustrative scenario · Not a client case study
        </span>
      </div>
      <motion.div
        key={active}
        role="tabpanel"
        id={`scene-${active}`}
        aria-labelledby={`tab-${active}`}
        className="studio-scene"
        initial={false}
        animate={{ opacity: 1 }}
        transition={reduced ? { duration: 0 } : { duration: 0.16 }}
      >
        <div className="studio-narrative">
          <h2>{story.heading}</h2>
          <p>{story.description}</p>
          <Link className="text-link" to={`/contact?service=${active}`}>
            {story.action}
            <Arrow />
          </Link>
        </div>
        <WorkflowPreview story={story} />
      </motion.div>
    </section>
  );
}
function Home() {
  return (
    <Shell>
      <section className="sense-hero container">
        <div className="sense-hero-heading">
          <h1 tabIndex={-1}>
            Clear websites,
            <br />
            connected work.
          </h1>
          <div className="sense-hero-intro">
            <p>
              Websites, business systems, and automation for small teams.
              <br className="desktop-only" />
              Turn an idea into a usable experience, with a workflow behind it.
            </p>
            <div className="sense-actions">
              <Action to="/contact">Discuss your project</Action>
              <Link className="text-link" to="/services">
                Explore services
                <Arrow />
              </Link>
            </div>
          </div>
        </div>
        <ServiceStudio />
        <div className="sense-hero-foot">
          <span>Clear business. Connected work.</span>
          <span>Purposeful design · Defined scope · Verifiable delivery</span>
        </div>
      </section>
      <section className="sense-services container">
        <div className="sense-section-heading">
          <h2>
            Different needs.
            <br />A clear next step.
          </h2>
          <p>
            From your public story to internal work.
            <br />
            Start with the problem that matters now.
          </p>
        </div>
        <ServiceRows extended />
      </section>
      <section className="sense-method container">
        <div className="sense-method-intro">
          <h2>
            Useful experiences
            <br />
            start with your work.
          </h2>
          <p>
            Agree on the goal, then shape the path. Each stage produces
            something concrete to review.
          </p>
          <Link className="text-link" to="/method">
            See our approach
            <Arrow />
          </Link>
        </div>
        <ol className="sense-process">
          {[
            [
              "Define the goal",
              "Identify users, problems, and scope in a complete project plan.",
            ],
            [
              "Shape the experience",
              "Use real content to connect pages, interactions, and data.",
            ],
            [
              "Build and verify",
              "Run the core workflow and check its actual results.",
            ],
          ].map(([title, copy], index) => (
            <li key={title}>
              <span>{index + 1}</span>
              <div>
                <h3>{title}</h3>
                <p>{copy}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
      <section className="sense-delivery container">
        <h2>
          A useful handover,
          <br />
          ready for what follows.
        </h2>
        <div>
          {[
            [
              "A complete project plan",
              "Goals, pages, content, and data on one shared map.",
            ],
            [
              "An understandable implementation",
              "Source, API contracts, and instructions for future maintenance.",
            ],
            [
              "Results you can inspect",
              "Match each visitor action to the record in the workspace.",
            ],
          ].map(([title, copy]) => (
            <article key={title}>
              <CheckIcon aria-hidden="true" />
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>
      <ConsultationCTA />
    </Shell>
  );
}

function Services() {
  return (
    <Shell>
      <PageIntro
        label="Services"
        title={
          <>
            Tools that fit
            <br />
            the way you work.
          </>
        }
      >
        Choose what you need for your public presence, team workflows, or
        repeated tasks.
      </PageIntro>
      <section className="container service-index">
        <ServiceRows extended />
      </section>
      <ConsultationCTA />
    </Shell>
  );
}
function ServiceDetail() {
  const path = useLocation().pathname;
  const s = services.find((item) => path === `/services/${item.id}`);
  if (!s) return <NotFound />;
  return (
    <Shell>
      <div className="container detail-back">
        <Link className="text-link" to="/services">
          <ChevronLeftIcon />
          All services
        </Link>
      </div>
      <PageIntro label={s.english} title={s.title}>
        {s.summary}
      </PageIntro>
      <section className="container detail-layout">
        <div>
          <h2>{s.problem}</h2>
          <p className="body-large">{s.description}</p>
          <p>{s.audience}</p>
          <div className="scope-block">
            <h2>What you receive</h2>
            {s.deliverables.map((d) => (
              <div className="scope-item" key={d}>
                <CheckIcon />
                {d}
              </div>
            ))}
            <p className="scope-note">Scope: {s.excludes}</p>
          </div>
          <section
            className="detail-process"
            aria-label={`${s.title} implementation steps`}
          >
            <h2>How we proceed</h2>
            <ol>
              {s.steps.map(([title, description]) => (
                <li key={title}>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </li>
              ))}
            </ol>
          </section>
          <div className="faq">
            <h2>Common questions</h2>
            {s.questions.map(([q, a]) => (
              <details key={q}>
                <summary>{q}</summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </div>
        <aside className="detail-aside">
          <h3>
            Understand first.
            <br />
            Then define the work.
          </h3>
          <p>
            You do not need a technical specification. Start with your business
            and the problem.
          </p>
          <Action to={`/contact?service=${s.id}`}>Discuss {s.title}</Action>
          <small>
            Illustrative scope only. This is not a commercial quote or delivery
            commitment.
          </small>
        </aside>
      </section>
    </Shell>
  );
}
function Method() {
  const steps = [
    [
      "Understand and define",
      "Understand key roles, the work, the users, and the constraints.",
      "Project goals, sitemap, features, and acceptance scope",
    ],
    [
      "Design and align",
      "Resolve content hierarchy, interaction, and visual direction in representative pages.",
      "Content plan, component rules, and core interactions",
    ],
    [
      "Build and connect",
      "Start with one complete business flow across UI, permissions, APIs, and storage.",
      "Runnable source, data model, and API documentation",
    ],
    [
      "Verify and hand over",
      "Operate the real pages, inspect the saved result, and check failure recovery.",
      "Preview, verification records, startup, and maintenance instructions",
    ],
  ];
  return (
    <Shell>
      <PageIntro
        label="Approach"
        title={
          <>
            Keep every step
            <br />
            connected.
          </>
        }
      >
        Stay aligned from the first idea to actual use with concrete stage
        outputs.
      </PageIntro>
      <section className="container process-list">
        {steps.map(([title, desc, output], i) => (
          <article key={title} data-reveal>
            <span className="process-index">{i + 1}</span>
            <div>
              <h2>{title}</h2>
              <p>{desc}</p>
            </div>
            <div className="process-output">
              <span>Stage outputs</span>
              <p>{output}</p>
            </div>
          </article>
        ))}
      </section>
      <ConsultationCTA />
    </Shell>
  );
}
function About() {
  return (
    <Shell>
      <PageIntro
        label="About SENSU"
        title={
          <>
            Bring digital work
            <br />
            back to business.
          </>
        }
      >
        A clear problem. Appropriate tools. Inspectable results.
      </PageIntro>
      <section className="container about-layout">
        <img
          src="/assets/atrium.png"
          alt="AI-generated illustration of architecture and a green courtyard"
          width="1536"
          height="1024"
        />
        <div>
          <h2>
            Understand the work.
            <br />
            Then choose the tools.
          </h2>
          <p>
            A website, system, or automation should make a specific piece of
            work clearer and easier.
          </p>
          <p>
            This demonstration starts with who is using the product and what
            they need to do. Pages, data, and workflows follow. Interface
            quality and reliable operations belong in the same delivery.
          </p>
          <div className="notice">
            <strong>About this fictional company</strong>
            <p>
              SENSU Digital is a fictional brand created to test a development
              workflow. It has no real client endorsements, business
              credentials, or commercial offers. The spatial illustration is
              AI-generated.
            </p>
          </div>
        </div>
      </section>
      <ConsultationCTA />
    </Shell>
  );
}
function Contact() {
  const [params] = useSearchParams();
  const preset = services.some((s) => s.id === params.get("service"))
    ? params.get("service")
    : "website";
  const [values, setValues] = useState({
    name: "",
    company: "",
    email: "",
    service: preset,
    message: "",
    consent: false,
    website: "",
  });
  const [busy, setBusy] = useState(false),
    [error, setError] = useState(""),
    [receipt, setReceipt] = useState(null);
  const key = useRef(null);
  const resultHeading = useRef(null),
    errorTarget = useRef(null),
    nameTarget = useRef(null),
    resetFocus = useRef(false);
  useEffect(() => {
    if (receipt) resultHeading.current?.focus();
    else if (resetFocus.current) {
      resetFocus.current = false;
      nameTarget.current?.focus();
    }
  }, [receipt]);
  useEffect(() => {
    if (error && !busy) errorTarget.current?.focus();
  }, [error, busy]);
  const reduced = useReducedMotion();
  function field(event) {
    const { name, value, type, checked } = event.target;
    setValues((v) => ({ ...v, [name]: type === "checkbox" ? checked : value }));
  }
  async function submit(event) {
    event.preventDefault();
    setBusy(true);
    setError("");
    key.current ||= crypto.randomUUID();
    try {
      setReceipt(
        await request("/api/inquiries", {
          method: "POST",
          body: { ...values, requestKey: key.current },
        }),
      );
    } catch (error) {
      setError(error.message);
      if (error.code === "REQUEST_CONFLICT") key.current = null;
    } finally {
      setBusy(false);
    }
  }
  function reset() {
    resetFocus.current = true;
    setReceipt(null);
    key.current = null;
    setValues({
      name: "",
      company: "",
      email: "",
      service: preset,
      message: "",
      consent: false,
      website: "",
    });
  }
  return (
    <Shell>
      <PageIntro
        label="Start an inquiry"
        title={<>Tell us about your project.</>}
      >
        Start with a specific need. No account is required; a saved inquiry
        returns a reference number.
      </PageIntro>
      <section className="container contact-layout">
        <div className="contact-intro">
          <h2>Useful starting points</h2>
          <ul>
            {[
              "Who your business serves",
              "The problem you want to solve",
              "Features and materials you already have",
              "Timing and how you want to work",
            ].map((t) => (
              <li key={t}>
                <CheckIcon />
                {t}
              </li>
            ))}
          </ul>
          <div className="contact-note">
            <span>A local demonstration</span>
            <p>
              Use a test name and email. Inquiries stay in this local database
              for workspace verification. No email is sent and nobody is
              contacted.
            </p>
          </div>
        </div>
        <div className="form-panel">
          {receipt ? (
            <motion.div
              className="receipt"
              role="status"
              aria-live="polite"
              initial={{ opacity: 0, y: reduced ? 0 : 8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <span className="success-mark">
                <CheckIcon />
              </span>
              <h2 ref={resultHeading} tabIndex={-1}>
                Inquiry received
              </h2>
              <p>
                Your inquiry is saved in the local demonstration. Find the same
                reference in the staff workspace.
              </p>
              <div className="receipt-number">
                <span>Reference number</span>
                <strong>{receipt.id}</strong>
              </div>
              <p className="muted">
                No email was sent. Processing status is recorded in the
                workspace.
              </p>
              <div className="receipt-actions">
                <Action onClick={reset}>Start another inquiry</Action>
                <Link className="text-link" to="/services">
                  Back to services <Arrow />
                </Link>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={submit}>
              <div className="form-heading">
                <h2>Describe what you need</h2>
                <p>
                  All fields below are required. Use demonstration information.
                </p>
              </div>
              <fieldset disabled={busy}>
                <div className="field-pair">
                  <label>
                    Your name
                    <input
                      name="name"
                      ref={nameTarget}
                      autoComplete="name"
                      value={values.name}
                      onChange={field}
                      minLength={2}
                      maxLength={60}
                      placeholder="How should we address you?"
                      required
                    />
                  </label>
                  <label>
                    Company name
                    <input
                      name="company"
                      autoComplete="organization"
                      value={values.company}
                      onChange={field}
                      minLength={2}
                      maxLength={120}
                      placeholder="Your company"
                      required
                    />
                  </label>
                </div>
                <label>
                  Contact email
                  <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    value={values.email}
                    onChange={field}
                    maxLength={160}
                    placeholder="name@example.com"
                    required
                  />
                </label>
                <label>
                  Service of interest
                  <select
                    aria-label="Service of interest"
                    name="service"
                    value={values.service}
                    onChange={field}
                  >
                    {services.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.title}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  Project details
                  <textarea
                    aria-label="Project details"
                    aria-describedby="message-hint"
                    name="message"
                    value={values.message}
                    onChange={field}
                    minLength={10}
                    maxLength={3000}
                    rows={5}
                    placeholder="What do you want to achieve? What is getting in the way?"
                    required
                  />
                  <span id="message-hint" className="field-hint">
                    10–3000 characters, {values.message.length}/3000
                  </span>
                </label>
                <div className="honeypot" aria-hidden="true">
                  <label>
                    Website address
                    <input
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                      value={values.website}
                      onChange={field}
                    />
                  </label>
                </div>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="consent"
                    checked={values.consent}
                    onChange={field}
                    required
                  />
                  <span>
                    I have read the{" "}
                    <Link to="/privacy">local demo privacy notice</Link>, and
                    agree to save this test inquiry for functionality checks.
                  </span>
                </label>
                {error && (
                  <p
                    ref={errorTarget}
                    tabIndex={-1}
                    className="error-message"
                    role="alert"
                  >
                    {error}
                  </p>
                )}
                <button className="button submit-button" type="submit">
                  {busy ? "Saving…" : "Send inquiry"}
                  {busy ? <ReloadIcon className="spin" /> : <Arrow />}
                </button>
              </fieldset>
            </form>
          )}
        </div>
      </section>
    </Shell>
  );
}
function Privacy() {
  return (
    <Shell>
      <PageIntro label="Privacy" title="Know where your data goes.">
        Applies to this local demonstration. Updated October 22, 2026.
      </PageIntro>
      <article className="container prose">
        <h2>What is collected and why</h2>
        <p>
          The form saves a test name, company, email, service, and project
          description to verify submission and staff processing. Do not submit
          real personal, client, or commercially sensitive information.
        </p>
        <h2>Storage and access</h2>
        <p>
          Records are stored in the local SQLite database running this website.
          Administrators and read-only staff can inspect inquiries. Only
          administrators can advance their status. Session cookies maintain
          sign-in and help protect state-changing requests.
        </p>
        <h2>Retention and cleanup</h2>
        <p>
          Test records remain on this machine until the maintainer runs the
          scoped cleanup command. Cleanup affects this project only. Records are
          not sent to third parties or used for marketing.
        </p>
        <h2>Company and media</h2>
        <p>
          SENSU Digital is fictional. The spatial image is AI- generated and
          does not represent a real office or client project. There are no real
          portraits, recordings, or customer reviews.
        </p>
        <h2>Local access</h2>
        <p>
          The website listens on the loopback address only. It uses no
          advertising trackers, analytics cookies, or real email notifications.
          This demonstration notice does not replace a privacy policy prepared
          for a real business and its applicable market.
        </p>
        <Link className="text-link" to="/contact">
          Back to inquiry <Arrow />
        </Link>
      </article>
    </Shell>
  );
}
function Login() {
  const { user, ready, setUser } = useContext(Session);
  const navigate = useNavigate();
  const [email, setEmail] = useState(""),
    [password, setPassword] = useState(""),
    [busy, setBusy] = useState(false),
    [error, setError] = useState("");
  const loginErrorTarget = useRef(null);
  useEffect(() => {
    if (error && !busy) loginErrorTarget.current?.focus();
  }, [error, busy]);
  useEffect(() => {
    if (ready && user) navigate("/admin", { replace: true });
  }, [ready, user, navigate]);
  async function submit(event) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const data = await request("/api/login", {
        method: "POST",
        body: { email, password },
      });
      setUser(data.user);
      navigate("/admin");
    } catch (error) {
      setError(error.message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className="login-page">
      <div className="login-visual">
        <Brand />
        <div className="login-workflow" aria-hidden="true">
          <span>Request received</span>
          <Arrow />
          <span>Staff follow-up</span>
          <Arrow />
          <span>Recorded outcome</span>
        </div>
        <div>
          <p>
            Every inquiry,
            <br />a clear next step.
          </p>
          <span>SENSU Digital · Fictional company demo</span>
        </div>
      </div>
      <main className="login-main" id="main">
        <Link className="text-link login-back" to="/">
          <ChevronLeftIcon />
          Back to website
        </Link>
        <form className="login-form" onSubmit={submit}>
          <span className="login-icon">
            <LockClosedIcon />
          </span>
          <h1 tabIndex={-1}>Sign in to the workspace</h1>
          <p>View and follow up on business inquiries.</p>
          <fieldset disabled={busy}>
            <label>
              Work email
              <input
                type="email"
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                maxLength={160}
                required
                placeholder="Your work email"
              />
            </label>
            <label>
              Password
              <input
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                maxLength={200}
                required
                placeholder="Enter your password"
              />
            </label>
            {error && (
              <p
                ref={loginErrorTarget}
                tabIndex={-1}
                role="alert"
                className="error-message"
              >
                {error}
              </p>
            )}
            <button className="button submit-button" type="submit">
              {busy ? "Signing in…" : "Sign in"}
              <Arrow />
            </button>
          </fieldset>
          <p className="login-note">
            For authorized staff. Access is limited by administrator and
            read-only roles.
          </p>
        </form>
      </main>
    </div>
  );
}
function Status({ value }) {
  return <span className={`status status-${value}`}>{statuses[value]}</span>;
}
const formatDate = (value) =>
  new Intl.DateTimeFormat("en-US", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(value));
function Admin() {
  const { user, ready, setUser } = useContext(Session);
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const q = params.get("q") || "",
    status = params.get("status") || "all",
    page = Number(params.get("page") || 1);
  const [search, setSearch] = useState(q),
    [data, setData] = useState(null),
    [loading, setLoading] = useState(true),
    [error, setError] = useState(""),
    [refresh, setRefresh] = useState(0);
  const [open, setOpen] = useState(false),
    [detail, setDetail] = useState(null),
    [detailError, setDetailError] = useState(""),
    [saving, setSaving] = useState(false);
  const trigger = useRef(null),
    advanceRef = useRef(null),
    titleRef = useRef(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (ready && !user) navigate("/login", { replace: true });
  }, [ready, user, navigate]);
  useEffect(() => {
    if (!ready || !user) return;
    let active = true;
    setLoading(true);
    setError("");
    request(
      `/api/admin/inquiries?${new URLSearchParams({ q, status, page: String(page) })}`,
    )
      .then((value) => {
        if (active) setData(value);
      })
      .catch((error) => {
        if (active) {
          setError(error.message);
          if (error.status === 401) {
            setUser(null);
            navigate("/login", { replace: true });
          }
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [q, status, page, refresh, ready, user, setUser, navigate]);
  function filters(values) {
    setParams({ ...Object.fromEntries(params), ...values });
  }
  async function show(item, event) {
    trigger.current = event.currentTarget.id;
    setDetail(null);
    setDetailError("");
    setOpen(true);
    try {
      setDetail(await request(`/api/admin/inquiries/${item.id}`));
    } catch (error) {
      setDetailError(error.message);
    }
  }
  async function advance() {
    setSaving(true);
    setDetailError("");
    try {
      await request(`/api/admin/inquiries/${detail.id}`, {
        method: "PATCH",
        body: {
          status: detail.status === "new" ? "in_progress" : "done",
          version: detail.version,
        },
      });
      setDetail(await request(`/api/admin/inquiries/${detail.id}`));
      setRefresh((v) => v + 1);
    } catch (error) {
      setDetailError(error.message);
    } finally {
      setSaving(false);
      requestAnimationFrame(() => {
        (advanceRef.current || titleRef.current)?.focus();
      });
    }
  }
  async function logout() {
    try {
      await request("/api/logout", { method: "POST" });
      setUser(null);
      navigate("/login", { replace: true });
    } catch (error) {
      setError(error.message);
    }
  }
  if (!ready || !user)
    return (
      <main id="main" className="admin-wait" role="status">
        Checking your session…
      </main>
    );
  const stats = data?.stats || { new: 0, in_progress: 0, done: 0 };
  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <Brand />
        <span className="workspace-label">Workspace</span>
        <NavLink className="sidebar-link" to="/admin">
          <Component1Icon />
          Inquiries
        </NavLink>
        <div className="sidebar-bottom">
          <Link to="/">
            View website
            <ArrowTopRightIcon />
          </Link>
          <p>Local demonstration workspace</p>
        </div>
      </aside>
      <div className="admin-workspace">
        <header className="admin-topbar">
          <span>Inquiries</span>
          <div>
            <span>{user.email}</span>
            <span className="role-label">
              {user.role === "admin" ? "Administrator" : "Read-only staff"}
            </span>
            <button
              className="icon-button"
              aria-label="Sign out"
              onClick={logout}
            >
              <ExitIcon />
            </button>
          </div>
        </header>
        <main className="admin-main" id="main">
          <div className="admin-title">
            <div>
              <h1 tabIndex={-1}>Inquiry workspace</h1>
              <p>Review incoming requests and follow each step.</p>
            </div>
            <button
              className="button button-secondary"
              onClick={() => setRefresh((v) => v + 1)}
              disabled={loading}
            >
              <ReloadIcon className={loading ? "spin" : ""} />
              Refresh list
            </button>
          </div>
          <div className="stats-grid">
            {Object.entries(statuses).map(([key, label]) => (
              <button
                key={key}
                className={`stat-card ${status === key ? "selected" : ""}`}
                onClick={() => filters({ status: key, page: "1" })}
              >
                <span>{label}</span>
                <strong>{data ? stats[key] : "—"}</strong>
                <span className="stat-foot">
                  View {label} inquiries <Arrow />
                </span>
              </button>
            ))}
          </div>
          <section className="inquiry-section" aria-busy={loading}>
            <div className="list-heading">
              <h2 id="inquiry-heading" tabIndex={-1}>
                {status === "all" && !q ? "All inquiries" : "Filtered results"}{" "}
                <span>{loading ? "…" : (data?.total ?? 0)}</span>
              </h2>
              <form
                className="search-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  filters({ q: search, page: "1" });
                }}
              >
                <MagnifyingGlassIcon aria-hidden="true" />
                <input
                  aria-label="Search inquiries"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  maxLength={160}
                  placeholder="Search company, name, or reference"
                />
                <button type="submit">Search</button>
              </form>
            </div>
            <div className="filter-row">
              <label>
                Status
                <select
                  aria-label="Status"
                  value={status}
                  onChange={(e) =>
                    filters({ status: e.target.value, page: "1" })
                  }
                >
                  <option value="all">All statuses</option>
                  {Object.entries(statuses).map(([key, label]) => (
                    <option key={key} value={key}>
                      {label}
                    </option>
                  ))}
                </select>
              </label>
              <span>
                {user.role === "viewer"
                  ? "Read-only access: inspect details; status changes are unavailable."
                  : "Process in order: New, In progress, then Done."}
              </span>
            </div>
            {error && (
              <p role="alert" className="error-message">
                {error}
              </p>
            )}
            {loading ? (
              <div className="empty-state" role="status">
                <ReloadIcon className="spin" />
                <h3>Loading inquiries</h3>
              </div>
            ) : !data?.items.length ? (
              <div className="empty-state">
                <MagnifyingGlassIcon />
                <h3>No inquiries found</h3>
                <p>
                  Adjust the search or submit a test inquiry through the
                  website.
                </p>
                <button
                  className="text-link"
                  onClick={() => {
                    setSearch("");
                    setParams({});
                  }}
                >
                  Clear filters <Arrow />
                </button>
              </div>
            ) : (
              <>
                <ul className="mobile-inquiries" aria-label="Inquiry list">
                  {data.items.map((item) => (
                    <li key={item.id}>
                      <div className="mobile-inquiry-heading">
                        <h3>{item.company}</h3>
                        <Status value={item.status} />
                      </div>
                      <p>
                        {item.name} · {item.email}
                      </p>
                      <small>{item.id}</small>
                      <div className="mobile-inquiry-bottom">
                        <span>
                          {services.find((s) => s.id === item.service)?.title}
                          <br />
                          {formatDate(item.createdAt)}
                        </span>
                        <button
                          id={`view-mobile-${item.id}`}
                          className="table-action"
                          onClick={(event) => show(item, event)}
                          aria-label={`View inquiry ${item.id}`}
                        >
                          View details
                          <Arrow />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="table-scroll">
                  <table>
                    <thead>
                      <tr>
                        <th>Company and contact</th>
                        <th>Service</th>
                        <th>Status</th>
                        <th>Submitted</th>
                        <th aria-label="Actions"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.items.map((item) => (
                        <tr key={item.id}>
                          <td>
                            <strong>{item.company}</strong>
                            <span>
                              {item.name} · {item.email}
                            </span>
                            <small>{item.id}</small>
                          </td>
                          <td>
                            {services.find((s) => s.id === item.service)?.title}
                          </td>
                          <td>
                            <Status value={item.status} />
                          </td>
                          <td className="date-cell">
                            {formatDate(item.createdAt)}
                          </td>
                          <td>
                            <button
                              id={`view-${item.id}`}
                              className="table-action"
                              onClick={(e) => show(item, e)}
                              aria-label={`View inquiry ${item.id}`}
                            >
                              View
                              <Arrow />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="pagination">
                  <span>
                    Page {page} of {Math.max(1, Math.ceil(data.total / 10))} ·{" "}
                    {data.total} {data.total === 1 ? "record" : "records"}
                  </span>
                  <div>
                    <button
                      className="icon-button"
                      aria-label="Previous page"
                      disabled={page <= 1}
                      onClick={() => filters({ page: String(page - 1) })}
                    >
                      <ChevronLeftIcon />
                    </button>
                    <button
                      className="icon-button"
                      aria-label="Next page"
                      disabled={page * 10 >= data.total}
                      onClick={() => filters({ page: String(page + 1) })}
                    >
                      <ChevronRightIcon />
                    </button>
                  </div>
                </div>
              </>
            )}
          </section>
        </main>
      </div>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal forceMount>
          <AnimatePresence>
            {open && (
              <React.Fragment key="inquiry-detail">
                <Dialog.Overlay asChild forceMount>
                  <motion.div
                    className="overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: reduced ? 0 : 0.15 }}
                  />
                </Dialog.Overlay>
                <Dialog.Content
                  asChild
                  forceMount
                  onCloseAutoFocus={(e) => {
                    e.preventDefault();
                    requestAnimationFrame(() => {
                      (
                        document.getElementById(trigger.current) ||
                        document.getElementById("inquiry-heading")
                      )?.focus();
                    });
                  }}
                >
                  <motion.section
                    className="detail-drawer"
                    initial={{ x: reduced ? 0 : 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: reduced ? 0 : 100, opacity: 0 }}
                    transition={reduced ? { duration: 0 } : spring}
                  >
                    <div className="dialog-heading">
                      <Dialog.Title ref={titleRef} tabIndex={-1}>
                        Inquiry details
                      </Dialog.Title>
                      <Dialog.Close asChild>
                        <button
                          className="icon-button"
                          aria-label="Close inquiry details"
                        >
                          <Cross2Icon />
                        </button>
                      </Dialog.Close>
                    </div>
                    <Dialog.Description className="drawer-description">
                      Inspect the request, its current status, and its history.
                    </Dialog.Description>
                    {detailError && (
                      <p role="alert" className="error-message">
                        {detailError}
                      </p>
                    )}
                    {!detail ? (
                      <p role="status">Loading details…</p>
                    ) : (
                      <>
                        <div className="drawer-company">
                          <h2>{detail.company}</h2>
                          <div aria-live="polite">
                            <Status value={detail.status} />
                          </div>
                          <p>{detail.id}</p>
                        </div>
                        <dl className="detail-fields">
                          <div>
                            <dt>Contact</dt>
                            <dd>{detail.name}</dd>
                          </div>
                          <div>
                            <dt>Contact email</dt>
                            <dd>{detail.email}</dd>
                          </div>
                          <div>
                            <dt>Requested service</dt>
                            <dd>
                              {
                                services.find((s) => s.id === detail.service)
                                  ?.title
                              }
                            </dd>
                          </div>
                          <div>
                            <dt>Submitted</dt>
                            <dd>{formatDate(detail.createdAt)}</dd>
                          </div>
                        </dl>
                        <div className="message-content">
                          <h3>Project details</h3>
                          <p>{detail.message}</p>
                        </div>
                        <div className="history">
                          <h3>Activity</h3>
                          <div>
                            <span className="history-point" />
                            <p>
                              Inquiry received
                              <small>{formatDate(detail.createdAt)}</small>
                            </p>
                          </div>
                          {detail.events.map((event, i) => (
                            <div key={i}>
                              <span className="history-point" />
                              <p>
                                Status changed to {statuses[event.toStatus]}
                                <small>
                                  {event.actor} · {formatDate(event.createdAt)}
                                </small>
                              </p>
                            </div>
                          ))}
                        </div>
                        <div className="drawer-actions">
                          {user.role === "admin" && detail.status !== "done" ? (
                            <button
                              ref={advanceRef}
                              className="button submit-button"
                              disabled={saving}
                              onClick={advance}
                            >
                              {saving
                                ? "Saving…"
                                : detail.status === "new"
                                  ? "Mark in progress"
                                  : "Mark done"}
                              <Arrow />
                            </button>
                          ) : (
                            <p>
                              {user.role === "viewer"
                                ? "This account has read-only access."
                                : "This inquiry is complete."}
                            </p>
                          )}
                        </div>
                      </>
                    )}
                  </motion.section>
                </Dialog.Content>
              </React.Fragment>
            )}
          </AnimatePresence>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
function NotFound() {
  return (
    <Shell>
      <section className="container not-found">
        <h1 tabIndex={-1}>This page could not be found.</h1>
        <p>Return home or start again with our services.</p>
        <Action to="/">Back to home</Action>
      </section>
    </Shell>
  );
}
function RouteEffects() {
  const location = useLocation();
  useEffect(() => {
    const meta = pageMeta(location.pathname);
    document.title = meta.title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", meta.description);
    window.scrollTo(0, 0);
    document.querySelector("h1")?.focus({ preventScroll: true });
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const elements = document.querySelectorAll("[data-reveal]");
    if (reduced) return;
    document.documentElement.classList.add("js-motion");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [location.pathname]);
  return null;
}
export default function App() {
  const [user, setUser] = useState(null),
    [ready, setReady] = useState(false);
  useEffect(() => {
    getSession()
      .then((data) => setUser(data.user))
      .catch(() => {})
      .finally(() => setReady(true));
  }, []);
  return (
    <Session.Provider value={{ user, setUser, ready }}>
      <MotionConfig reducedMotion="user">
        <RouteEffects />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/method" element={<Method />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MotionConfig>
    </Session.Provider>
  );
}

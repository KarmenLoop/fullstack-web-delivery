# Page contracts

Project: SENSU Digital — enterprise site and interaction studies. Output language: English public example; use the client-requested language for new projects.

## P01 · /

**Audience:** Prospective SME decision maker

**Task:** Understand whether the services match the business need.

**Content:** Specific proposition; three services; interactive mechanism preview; working method; honest fictional-demo disclosure.

**Primary Action:** Explore services → /services; Start an inquiry → /contact.

**Hierarchy:** Lead with the task; group supporting evidence and details before the next action.

**Responsive:** One reading column on phones; retain the primary action, keyboard order and visible feedback.

## P02 · /services

**Audience:** Prospective buyer comparing scope

**Task:** Choose the appropriate service.

**Content:** Three service summaries with audience, outputs and detail links.

**Primary Action:** Open the relevant service detail.

**Hierarchy:** Lead with the task; group supporting evidence and details before the next action.

**Responsive:** One reading column on phones; retain the primary action, keyboard order and visible feedback.

## P03 · /services/website

**Audience:** Buyer evaluating websites

**Task:** Evaluate scope, exclusions and next step.

**Content:** Problem; audience; specific deliverables; three service-specific steps; exclusions; FAQ.

**Primary Action:** Start an inquiry → /contact; carry or allow selection of service.

**Hierarchy:** Lead with the task; group supporting evidence and details before the next action.

**Responsive:** One reading column on phones; retain the primary action, keyboard order and visible feedback.

## P04 · /services/systems

**Audience:** Buyer evaluating business systems

**Task:** Evaluate scope, exclusions and next step.

**Content:** Problem; audience; specific deliverables; three service-specific steps; exclusions; FAQ.

**Primary Action:** Start an inquiry → /contact; carry or allow selection of service.

**Hierarchy:** Lead with the task; group supporting evidence and details before the next action.

**Responsive:** One reading column on phones; retain the primary action, keyboard order and visible feedback.

## P05 · /services/automation

**Audience:** Buyer evaluating automation

**Task:** Evaluate scope, exclusions and next step.

**Content:** Problem; audience; specific deliverables; three service-specific steps; exclusions; FAQ.

**Primary Action:** Start an inquiry → /contact; carry or allow selection of service.

**Hierarchy:** Lead with the task; group supporting evidence and details before the next action.

**Responsive:** One reading column on phones; retain the primary action, keyboard order and visible feedback.

## P06 · /method

**Audience:** Buyer assessing collaboration

**Task:** Understand the work and acceptance sequence.

**Content:** Discovery, design contracts, complete business increments, verification and handover.

**Primary Action:** Start an inquiry → /contact.

**Hierarchy:** Lead with the task; group supporting evidence and details before the next action.

**Responsive:** One reading column on phones; retain the primary action, keyboard order and visible feedback.

## P07 · /about

**Audience:** Buyer checking identity and credibility

**Task:** Understand the fictional company and its operating principles.

**Content:** Clearly fictional brand story; SME focus; principles and service boundaries. No invented endorsements or statistics.

**Primary Action:** Discuss the project → /contact.

**Hierarchy:** Lead with the task; group supporting evidence and details before the next action.

**Responsive:** One reading column on phones; retain the primary action, keyboard order and visible feedback.

## P08 · /contact

**Audience:** Visitor; no account required

**Task:** Submit a consultation inquiry and retain its reference.

**Content:** Name, company, email, service type, requirement; privacy consent; errors; pending; success reference; reset.

**Primary Action:** POST /api/inquiries; staff see the same reference at /admin.

**Hierarchy:** Lead with the task; group supporting evidence and details before the next action.

**Responsive:** One reading column on phones; retain the primary action, keyboard order and visible feedback.

## P09 · /privacy

**Audience:** Visitor before submitting contact data

**Task:** Understand local-demo data use and limits.

**Content:** Fields collected; purpose; local storage; staff access; cleanup method; no real production-policy claims.

**Primary Action:** Return to /contact.

**Hierarchy:** Lead with the task; group supporting evidence and details before the next action.

**Responsive:** One reading column on phones; retain the primary action, keyboard order and visible feedback.

## P10 · /login

**Audience:** Administrator or read-only staff

**Task:** Sign in to the inquiry workspace.

**Content:** Email/password labels; validation; pending; invalid credentials; rate limit; return to /admin.

**Primary Action:** POST /api/login; open /admin on success.

**Hierarchy:** Lead with the task; group supporting evidence and details before the next action.

**Responsive:** One reading column on phones; retain the primary action, keyboard order and visible feedback.

## P11 · /admin

**Audience:** Administrator and read-only staff

**Task:** Find and inspect inquiries; administrator advances legal status.

**Content:** Session/role; search; status filters; paged list; details drawer; actor/time audit; update pending/error/conflict; logout.

**Primary Action:** GET /api/admin/inquiries and details; administrator PATCH selected record.

**Hierarchy:** Lead with the task; group supporting evidence and details before the next action.

**Responsive:** Use a readable record layout on phones. Keep status, detail action and close control discoverable; trap/restore focus in the dialog.

## P12 · /interaction-lab

**Audience:** Developer or designer evaluating feedback

**Task:** Operate six explicit feedback studies and inspect their contracts.

**Content:** Six-item index; one live canvas; local-simulation disclosure; state/recovery note; back link.

**Primary Action:** Choose a pattern via URL query; operate its live controls.

**Hierarchy:** Operate/Experience workbench. Index supports one focal mechanism, followed by its contract.

**Responsive:** Two-column compact study index then one canvas on phones; no hidden primary actions or page overflow.

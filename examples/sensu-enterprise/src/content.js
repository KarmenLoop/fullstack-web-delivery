// Copyright (c) 2026 KarmenLoop. All rights reserved.
// SPDX-License-Identifier: LicenseRef-KarmenLoop-Source-Available-No-Modification-1.0
export const services = [
  {
    id: "website",
    title: "Websites",
    english: "Web & Brand",
    summary: "Help the right people understand your business.",
    description:
      "Connect information architecture, brand expression, content, and inquiries in a clear business website.",
    tags: ["Brand and content", "Interaction design", "Inquiries"],
    problem: "More pages should make the choice clearer.",
    audience:
      "For small and medium-sized businesses that need a clear product story and a useful inquiry path.",
    deliverables: [
      "Sitemap and content architecture",
      "Shared page and component rules",
      "Responsive website and inquiry workspace",
      "Source, startup instructions, and acceptance records",
    ],
    steps: [
      [
        "Map the audience and content",
        "Identify customers, service scope, and existing material; produce a sitemap and content inventory.",
      ],
      [
        "Design the pages and paths",
        "Define representative pages, shared components, and the inquiry flow, including where each field is stored.",
      ],
      [
        "Build and inspect the result",
        "Build responsive pages and a staff workspace; verify submission and processing with the same reference.",
      ],
    ],
    excludes:
      "Excludes unauthorized case studies, brand-asset purchases, and third-party service fees.",
    questions: [
      [
        "Can we keep existing content?",
        "Inventory the content first, then agree on what to retain, rewrite, or migrate.",
      ],
      [
        "Who maintains the website?",
        "Define the owner in the plan and provide instructions and the required administration tools.",
      ],
    ],
  },
  {
    id: "systems",
    title: "Business systems",
    english: "Business Systems",
    summary: "Turn scattered information into a practical workflow.",
    description:
      "Organize roles, permissions, and data around the work your team does every day.",
    tags: ["Workflow mapping", "Roles and access", "Shared data"],
    problem: "More spreadsheets can mean less visible progress.",
    audience:
      "For teams that need shared records, less duplicate entry, and clear ownership and status.",
    deliverables: [
      "Workflow and permission matrix",
      "Data model and API contracts",
      "Operational pages and staff workspace",
      "Migration preparation and verification records",
    ],
    steps: [
      [
        "Map roles and tasks",
        "Identify who handles each task and when; record workflows, permissions, and data fields.",
      ],
      [
        "Define states and contracts",
        "Agree on legal transitions, access boundaries, and inputs and outputs before implementation.",
      ],
      [
        "Verify incrementally and hand over",
        "Build by core task, verify permissions and records, then provide operating instructions.",
      ],
    ],
    excludes:
      "Compatibility and historical migration depend on inspection of the actual systems and data.",
    questions: [
      [
        "Can you connect existing systems?",
        "Inspect the APIs, account permissions, and data contracts before agreeing on scope.",
      ],
      [
        "Can staff have different access?",
        "Design server-side access around roles and resource ownership, then test unauthorized requests.",
      ],
    ],
  },
  {
    id: "automation",
    title: "Automation",
    english: "Workflow Automation",
    summary: "Give repeated work a reliable workflow.",
    description:
      "Connect triggers, data preparation, and state changes while preserving exception handling and human review.",
    tags: ["Task triggers", "System integration", "Recovery"],
    problem: "Manual steps should not hide the outcome.",
    audience:
      "For teams with stable processes that want to reduce repetitive manual work.",
    deliverables: [
      "Trigger and execution flow",
      "API and data transformation contracts",
      "Exception, retry, and human review paths",
      "Observable results and handover documentation",
    ],
    steps: [
      [
        "Define triggers and exceptions",
        "Map inputs, triggers, execution rules, and human handoff in a workflow diagram.",
      ],
      [
        "Connect APIs and actions",
        "Verify APIs and permissions; define transformation, timeout, retry, and result checks.",
      ],
      [
        "Verify results and recovery",
        "Check success, failure, and uncertain outcomes; provide execution, recovery, and handoff instructions.",
      ],
    ],
    excludes:
      "Excludes external messages, transactions, and production data changes without explicit authorization.",
    questions: [
      [
        "Which tasks suit automation?",
        "Start with repeated tasks that have clear rules and verifiable outcomes.",
      ],
      [
        "What happens when execution fails?",
        "Distinguish a failure from an uncertain outcome; inspect records before deciding whether to retry.",
      ],
    ],
  },
];
export const statuses = {
  new: "New",
  in_progress: "In progress",
  done: "Done",
};
export const routes = [
  "/",
  "/services",
  ...services.map((s) => `/services/${s.id}`),
  "/method",
  "/about",
  "/contact",
  "/privacy",
  "/login",
  "/admin",
  "/interaction-lab",
];
export function pageMeta(path) {
  const service = services.find((s) => path === `/services/${s.id}`);
  const title =
    service?.title ||
    {
      "/": "Clear websites, connected work",
      "/services": "Services",
      "/method": "Approach",
      "/about": "About SENSU",
      "/contact": "Start an inquiry",
      "/privacy": "local demo privacy notice",
      "/login": "Staff sign-in",
      "/admin": "Inquiries",
      "/interaction-lab": "Interaction studies",
    }[path] ||
    "Page not found";
  return {
    title: `${title} | SENSU Digital`,
    description:
      service?.description ||
      "SENSU Digital: websites, business systems, and automation. A fictional local demonstration.",
  };
}

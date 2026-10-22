// Copyright (c) 2026 KarmenLoop. All rights reserved.
// SPDX-License-Identifier: LicenseRef-KarmenLoop-Source-Available-No-Modification-1.0
const departments = [
  {
    id: "operations",
    name: "Operations",
    responsibility: "Coordinate work and membership.",
    x: 17,
    y: 70,
  },
  {
    id: "security",
    name: "Security",
    responsibility: "Review access and audit decisions.",
    x: 50,
    y: 70,
  },
  {
    id: "delivery",
    name: "Delivery",
    responsibility: "Read requests and coordinate delivery.",
    x: 83,
    y: 70,
  },
];
const roles = [
  {
    id: "workspace-admin",
    name: "Workspace administrator",
    departmentId: "operations",
    people: ["Alex Morgan"],
    permissions: [
      "users.read",
      "users.access.revoke",
      "inquiries.read",
      "inquiries.update",
    ],
  },
  {
    id: "security-owner",
    name: "Security owner",
    departmentId: "security",
    people: ["Jordan Lee"],
    permissions: ["users.read", "users.access.revoke", "audit.read"],
  },
  {
    id: "project-viewer",
    name: "Project viewer",
    departmentId: "delivery",
    people: ["Sam Patel"],
    permissions: ["users.read", "inquiries.read"],
  },
];
export function accessDemo(query = "") {
  const normalized = query.trim().toLocaleLowerCase("en-US");
  const question = normalized.replace(/[?\uFF1F.!\u3002]+$/u, "").trim();
  // This demonstration answers one declared policy, not arbitrary IAM questions.
  const isPolicyQuestion =
    /^(?:who\s+(?:can|may)\s+)?(?:revoke|remove|delete)\s+(?:user|member)\s+(?:access|permissions?)$/u.test(
      question,
    ) ||
    /^(?:\u8c01\u80fd|\u8c01\u53ef\u4ee5)?(?:\u5220\u9664|\u64a4\u9500|\u79fb\u9664)(?:\u7528\u6237|\u6210\u5458)(?:\u6743\u9650|\u8bbf\u95ee\u6743\u9650)$/u.test(
      question,
    );
  const unsupportedPolicyQuestion =
    !isPolicyQuestion &&
    /revoke|remove|delete|permission|access|\u5220\u9664|\u64a4\u9500|\u79fb\u9664|\u6743\u9650/u.test(
      question,
    );
  const matches = isPolicyQuestion
    ? roles.filter((role) => role.permissions.includes("users.access.revoke"))
    : unsupportedPolicyQuestion
      ? []
      : roles.filter(
          (role) =>
            !normalized ||
            [
              role.name,
              ...role.people,
              departments.find((d) => d.id === role.departmentId).name,
            ]
              .join(" ")
              .toLowerCase()
              .includes(normalized),
        );
  return {
    mode: "fictional-read-only",
    version: "demo-policy-1",
    mutationSupported: false,
    source:
      "Server-owned illustrative policy. Separate from actual SENSU staff accounts.",
    departments,
    roles,
    activity: Object.fromEntries(
      departments.map((department, departmentIndex) => [
        department.id,
        Array.from(
          { length: 28 },
          (_, index) => (index * 7 + departmentIndex * 11 + (index % 5)) % 13,
        ),
      ]),
    ),
    activityLabel:
      "Illustrative events across four sample weeks; not live analytics.",
    query: {
      text: query.trim(),
      kind: isPolicyQuestion
        ? "policy"
        : unsupportedPolicyQuestion
          ? "unsupported"
          : "search",
      sourceRule: isPolicyQuestion
        ? "rules.revoke-user-access"
        : unsupportedPolicyQuestion
          ? "unsupported-query"
          : "roles.name-and-department",
      permission: isPolicyQuestion ? "users.access.revoke" : null,
      roleIds: matches.map((role) => role.id),
      summary: isPolicyQuestion
        ? "These roles can revoke user access under the illustrative policy."
        : unsupportedPolicyQuestion
          ? "This sample answers only who can revoke user access. Other permission subjects are unsupported. Search a role or department, or ask who can revoke user access."
          : matches.length
            ? "Matching roles in the sample workspace."
            : "No matching role. Try Operations, Security, Delivery, or ask who can revoke user access.",
    },
  };
}

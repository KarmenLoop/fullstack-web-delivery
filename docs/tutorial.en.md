# Fullstack Web Delivery: user guide

English | [简体中文](tutorial.zh-CN.md) · [Project](../README.md)

This guide matches **v0.9.1**.

## 1. Download and verify

From the release, download [`fullstack-web-delivery-complete-v0.9.1.zip`](https://github.com/KarmenLoop/fullstack-web-delivery/releases/tag/v0.9.1) and its checksum file or manifest. Compare the complete SHA-256 before extracting: use shasum -a 256 on macOS, sha256sum on Linux, or Get-FileHash -Algorithm SHA256 in PowerShell. Byte consistency relies on obtaining the expected hash from a trusted source.

## 2. Install and load

Choose the complete ZIP for the example and bilingual guides. The smaller skill ZIP contains only the portable workflow. Put its fullstack-web-delivery folder in one host-supported skill directory, using a fresh destination.

Refresh host discovery or open a new session, explicitly read the installed SKILL.md, and check the version above. The skill needs no separate model account; the host supplies its own model, tools, and permissions.

## 3. Configure and try one task

For the SENSU example use Node 22.13+ within Node 22 and npm. In examples/sensu-enterprise run npm ci, npm run setup, npm run build, then npm start. Open http://127.0.0.1:4319. Setup writes random local access details to .local/demo-access.json; keep that file private.

Submit a fictional inquiry, find its returned reference in the read-only staff view, and use the administrator role to advance its status. Reload and check that the history remains.

## 4. Develop a repeatable workflow

Use the website skill for one bounded page change. Check the real form and its error path before declaring it complete. Material studies and older captures keep their recorded versions; they are not fresh device or performance acceptance.

Keep the version, actual command, exit code, resulting files, and unverified limits together. Use synthetic data for the first check.

## 5. Troubleshoot, update, and remove

If the host cannot find the skill, check its configured discovery root and SKILL.md readability. A checksum mismatch needs a fresh verified download; do not skip it.

Finish active writes and back up the skill and private task data separately. Extract updates into a new directory and verify before switching. For rollback, restore the older skill while retaining newer user records and evidence. Uninstall only its exact skill directory or discovery entry; separately registered schedules must be cancelled and confirmed in their host.

## 6. License

[KarmenLoop Source-Available No-Modification License 1.0](../LICENSE). This is concise user guidance; consult the original license for use and redistribution terms.

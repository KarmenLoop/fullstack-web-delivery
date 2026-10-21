# Third-party materials

The first-party custom license does not override dependency licenses or platform rights. Runtime packages are fetched through npm and pinned in the example lockfile; node_modules and generated builds are not redistributed in source releases.

The [dependency inventory](docs/dependency-inventory.json) records installed package versions, declared licenses, and copied notice files under third_party/licenses. Available notice text is preserved unchanged. This is a declaration/notice inventory, not a complete legal, security, or production audit. Packages absent from the local platform are not claimed as installed.

Direct dependencies include React/React DOM, Express, express-session, express-rate-limit, Helmet, Zod, React Router, Radix Dialog/Icons, and Motion. Development uses Vite and its React plugin. Their respective notices and licenses continue to control those components. The example also uses the host Node.js SQLite implementation.

Primer Brand and Carbon were studied but neither their implementation nor branded assets are shipped. Apple HIG, Thoughtworks, Work & Co, Stripe, and Linear are reference sources, not code dependencies, licensors of this project, or endorsers. See [reference research](docs/reference-research.md) and [media provenance](docs/media.md).

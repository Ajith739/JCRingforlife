# JavaScript release migration

Branch: `feat/js-production-cleanup`. The existing React/Vite storefront and admin, Express/SQLite API, session auth, order workflows, and payment split/refund-request code were retained.

## Source and tooling

All project-owned `.ts` and `.tsx` files under `src/admin`, `server`, `tests`, and the Playwright/Vitest configurations were converted to `.js` or `.jsx`. TypeScript-only syntax was removed with the TypeScript transpiler, then builds and tests verified behavior. Backend relative imports now carry `.js` so Node runs the API directly. `tsconfig.json`, `typescript`, `typescript-eslint`, `tsx`, and the direct `@types/*` packages were removed. Vite builds without `tsc`; Node runs the backend without a TypeScript loader. ESLint uses a JavaScript flat config.

The checked-in `.gitignore` now covers dependency folders, generated outputs, caches, logs, local databases, private keys and environment files while retaining `.env.example`, package lock, configuration, source, and public assets. No tracked `.env`, private key, or SQLite file was found. No Git history was rewritten.

## Interface

The floating “Make it your workspace” panel and its supporting layout CSS were removed. First-time theme choice is Light Mode, using a new preference key so stale demo theme settings cannot force Dark Mode. The regular header theme menu remains available.

Payments & Finance now includes payment overview, transactions, split configuration, beneficiaries, settlements, refunds, and financial reports. Partners includes manufacturers, distributors, and franchise owners. The finance list pages use aligned summary cards, searchable/status-filtered tables, pagination, detail views, horizontal scroll for narrow screens, and explicit empty states. Beneficiaries can be added and edited with contact and territory details. Split rules retain the two-/three-party fixed and percentage preview and show unallocated totals. All amounts shown on empty ledgers are zero or explicitly unavailable; allocation previews never imply a provider payout.

## Verification and limits

`npm ci --ignore-scripts`, `npm run lint`, `npm run build`, `npm test` (24 passing), `npm run test:e2e` (9 passing), `node scripts/production-smoke.mjs`, and `npm audit` (0 findings) completed on this host. Browser checks covered all finance/partner routes at 1440, 1024, 768, 390, and 360 pixels. No project-owned TS/TSX files remain outside third-party/generated output.

Payment processing, provider webhooks, bank settlement, customer refund execution, and beneficiary recovery remain unavailable until a marketplace provider and verified merchant/beneficiary accounts are supplied. The finance UI and API show records and pending workflows, not real money movement. See [finance implementation](jcringforlife-finance.md).

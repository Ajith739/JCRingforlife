# Aion Rings admin delivery

Source checkout: `/Users/abinesh/Documents/GitHub/JCRingforlife`  
Branch: `feat/aion-phoenix-admin`  
Reference evidence: [Phoenix analysis](phoenix-reference-analysis.md)  
Inspection and architecture: [Strategy](aion-admin-strategy.md)

## Run locally

Use Node **24.13 or newer**.

```sh
cd /Users/abinesh/Documents/GitHub/JCRingforlife
npm ci
npm run dev
```

Open **http://localhost:5173/login**. Sign in with **admin@aionrings.demo** / **AionDemo2026!** or select **Explore development workspace**. This browser-only demo needs no backend. Synthetic records and edits live in browser storage. These credentials are intentionally visible in frontend code and must never be used for real administration. Do not put real customer data in this workspace.

`npm run dev` starts Vite only. `npm run dev:api` opts into the existing Express/SQLite backend; Vite proxies `/api` to 127.0.0.1:3001 in that mode. The browser demo keeps admin actions local and labels unavailable external integrations.

## Configure a real workspace

```sh
cp .env.example .env
# Set ADMIN_DEMO=false, SESSION_SECRET, APP_ORIGIN and DATABASE_PATH in .env.
npm run admin:create
npm run catalog:init
npm run dev:api
```

`admin:create` prompts for an email, name and a hidden password. There are no built-in real administrator credentials. `catalog:init` creates a **draft** founder product and 24 zero-stock variants without altering existing catalog records. Its initial $149 price comes from the provided storefront's founder offer; review price and availability before activating it. The default pre-order SKU is `AION-FOUNDER` and can be changed with `PREORDER_PRODUCT_SKU`.

Activate the reviewed product in **Products** before accepting storefront reservations. Reservations do not require physical stock and do not deduct it. Fulfillment requires paid orders, shipment tracking and sufficient stock. Do not activate an old launch/delivery promise without business review; the existing storefront includes historical delivery copy.

For production with real authentication, select API mode during build and run the backend:

```sh
VITE_ADMIN_DATA_MODE=api npm run build
NODE_ENV=production npm start
```

Serve behind an HTTPS reverse proxy on the same origin as the API. Set `APP_ORIGIN` to that exact HTTPS origin, configure a random `SESSION_SECRET` of at least 32 characters, and put `DATABASE_PATH` on a persistent local disk. The service trusts one reverse proxy. Configure that proxy appropriately; do not expose it through an untrusted proxy chain. Back up SQLite with a SQLite-aware backup procedure. The server is suitable for one application instance using a local SQLite database; multi-instance hosting needs an appropriate shared data/session store. Apply operational monitoring and recovery procedures before live launch.

## Pages and implementation checklist

| Route | Delivered behavior | Operational boundary |
|---|---|---|
| `/admin` | API-derived KPIs, sales, finish rankings, status distribution, recent orders/activity, stock alerts, date ranges, CSV | Synthetic only when development mode is explicitly enabled |
| `/admin/products` | List, category/status/search, sort, pagination, add/edit, detail modal, image URL, archive selection, protected delete | Product images use existing assets or HTTPS URLs; no binary upload service |
| `/admin/variants` | Parent product, three finishes, sizes 6–13, unique SKU, stock, image, override price, threshold, availability | Existing stock can change only via inventory workflow |
| `/admin/preorders` | Filtered listing, manual creation, detail routes, customer/finish/size, payment state, notes, timeline, valid reservation transitions | Confirmed reservation converts once into a linked order |
| `/admin/orders` | Listing, details, status/payment filters, manual unpaid orders, tracking, notes, fulfillment transitions | Shipment deducts stock transactionally; live refunds require provider |
| `/admin/orders/:id`, `/admin/preorders/:id` | Items, totals, customer/shipping, timeline, tracking, confirmation dialogs | No fabricated payment success |
| `/admin/inventory` | Available stock, low/out-of-stock filters, validated adjustment, movement history and CSV | Prevents negative inventory and logs actor/reason |
| `/admin/customers` | Searchable directory, add/edit, profile routes, status, relevant contact details and notes | CSV excludes addresses/notes; no health or card data collected by admin |
| `/admin/customers/:id` | Customer profile, order/pre-order histories, editable notes | Record retained for order history |
| `/admin/payments` | Payment summaries, order links and export | Provider not connected; status is recorded data |
| `/admin/coupons` | Creation/edit/delete, dates, usage limits, fixed/percentage validation, export | Existing checkout still needs coupon API integration |
| `/admin/content` | Banner, FAQ and product content CRUD, publishing state | Existing static storefront still needs content consumption |
| `/admin/support` | Customer-linked requests, priority, state, service notes | No external helpdesk/email synchronization |
| `/admin/returns` | Order-linked returns/replacements, reason, state and notes | No refund or carrier action is implied |
| `/admin/reports/sales` | Date-filtered revenue/orders/preorders, finish/size reports and export | Revenue uses paid stored orders in USD |
| `/admin/reports/inventory` | Current stock, low stock, finish/size distribution, retail stock value | Retail value is not cost accounting |
| `/admin/reports/customers` | Customer totals, selected-period acquisition, countries, orders and CSV | No external attribution platform |
| `/admin/staff` | Role overview, invitation endpoint, role/account updates | Admin only; invitation email needs configured webhook |
| `/admin/settings` | Store, profile, workspace notifications, shipping preferences, integrations, password changes | Credentials remain server-side; currency preference does not convert amounts |
| `/admin/audit` | Searchable/exportable audit trail | Admin only; append-only through application workflows |
| `/login` | Email/password, visibility, remember me, errors, redirect and development entry | Real backend credentials and secure session cookie |
| `/forgot-password` | Generic account response, reset email request | Requires transactional email webhook |
| `/reset-password` | Token expiry/single-use validation, password rules, confirmation and session revocation | Live mail delivery not tested without provider |
| `/verify-email` | Request verification link or consume token | Requires transactional email webhook |
| `/lock-screen` | Profile display, backend session lock, password reauthentication, return route | All protected API reads/writes reject locked sessions |
| `/logout` | Destroys backend session and clears client data | No frontend-only logout shortcut |
| `/coming-soon` | Branded announcement and working return links | No invented date/countdown |
| `/maintenance` | Original ring illustration, retry/return controls, dark mode | Production server returns HTTP 503 |
| `/403`, `/404`, `/500` | Independent responsive Aion error compositions | Production server returns the matching HTTP code |
| Unknown admin routes | Missing-page treatment | Production server returns HTTP 404 |
| Existing `/preorder` | Actual validated reservation submission, customer/order persistence, retry deduplication, saved reference | Unpaid; no unverified email claim; configured active SKU required |
| Existing storefront routes | Preserved storefront brand, catalog, cart, guides and navigation | Existing `/checkout` remains a simulated payment flow |

## Shared interaction checklist

- Fixed 64px header, 254px sidebar, persistent 72px compact rail, mobile drawer/backdrop and active routes.
- Quick-navigation search, Cmd/Ctrl+K, mobile search trigger, notifications with mark-read, account/profile/lock/logout controls.
- Light/dark/system theme, persistence, scoped theme tokens, focus outlines and reduced-motion support.
- Search, sorting, counted tabs, filters, selectable rows, archive bulk action, pagination and CSV exports with spreadsheet-formula neutralization.
- Reusable labeled editors, validation, dialogs with Escape and focus containment/restoration, confirmation flows and toasts.
- Responsive charts, explicitly labeled development data, loading skeletons, meaningful empty and server-error states.
- Lazy admin/features so the admin charting code is not loaded on the storefront.

## Backend data model and API

One Node/Express service uses SQLite tables `users`, `sessions`, `tokens`, `settings`, and `records`. `records` stores typed entity payloads under product, variant, order, pre-order, customer, inventory movement, coupon, content, support, return and audit entities. Variants refer to parent products; orders retain item snapshots. Relationship validation and stock updates run on the server. SQLite transactions cover multi-record operations.

- `GET /api/auth/session` obtains session state and CSRF token.
- `POST /api/auth/login`, `logout`, `lock`, `unlock`, `forgot-password`, `reset-password`, `verification-request`, `verify-email`, `change-password` implement session/account workflows.
- `GET/POST /api/admin/data/:entity`, `PUT/DELETE /api/admin/data/:entity/:id` implement allowed resource operations.
- `POST /api/admin/orders/create` creates an unpaid manual order/reservation.
- `POST /api/admin/orders/:kind/:id/action` handles transitions, tracking, notes and provider-gated refund requests.
- `POST /api/admin/inventory/adjust` records validated stock movements.
- `GET/PUT /api/admin/settings`, `PUT /api/admin/profile` save preferences.
- `POST /api/admin/staff`, `PUT /api/admin/staff/:id` manage staff access.
- `POST /api/storefront/reservations` persists unpaid reservations with a retry key, validates configured product/variants and returns only a saved reference.

Mutating requests require the `X-CSRF-Token` from the session endpoint. Session cookies are HttpOnly, SameSite Strict, and Secure in production. Passwords use salted scrypt; only token hashes are stored. Role checks run on the backend, and password/access changes invalidate previous sessions. Rate limits and origin checks apply.

## Remaining integrations and limits

1. **Payments/refunds:** no provider credentials, adapter or payment webhook was supplied. Admin refunds return an explicit service-unavailable error and execute no transaction. The existing checkout simulation is preserved and must be replaced with a provider-hosted payment flow before accepting real card information.
2. **Email:** set `EMAIL_WEBHOOK_URL` and `EMAIL_WEBHOOK_TOKEN` for a trusted HTTPS transactional service. The POST payload is `{to, subject, url}`. Reset/invitation/verification token logic is tested locally; real delivery is not tested. This setup does not send pre-order confirmation mail.
3. **Shipping:** manual tracking is stored; labels, live carrier tracking, and shipping notifications need an adapter.
4. **Marketing:** saved coupon and content workflows work in the API, but the current storefront does not yet consume them. Usage counting must be tied to verified checkout completion.
5. **External Aion services:** no original database/API or Azure credentials were present. No live production records were imported or modified.
6. **Brand and timing:** admin uses Aion branding; the user-supplied JCRingforlife storefront branding and historical delivery copy remain intact except the reservation success message now accurately describes persistence without promising email.
7. **Assets:** original CSS utility artwork and existing ring assets are used. No proprietary Phoenix source is redistributed. New image upload/storage and malware scanning are outside the provided integrations.
8. **Verification:** automated checks are recorded below. They do not constitute a penetration test, accounting audit, email deliverability test or a test of unconfigured external services.

## Verification

Run:

```sh
npm run typecheck
npm run lint
npm test
npm run build
npm run test:e2e
node scripts/production-smoke.mjs
```

- TypeScript and ESLint pass.
- **19 unit/API tests** pass: commerce validation, route status codes, protected reads, CSRF, product CRUD, duplicate SKUs, inventory, order rules, lock/unlock, unavailable-service states, password strength, expired/single-use reset tokens, session invalidation, viewer authorization, storefront reservation persistence/deduplication, empty pricing overrides, and long-range analytics/date boundaries.
- **Five admin browser suites** pass: auth/error routes, every admin navigation route, search/themes/sidebar persistence, product CRUD, inventory validation, order transitions, lock/logout, and screenshots at **1440, 1024, 768 and 390px**. A sixth storefront browser test passes for the preserved storefront and full reservation form.
- Production smoke passes with a temporary database: development access remains disabled even when requested, protected APIs reject anonymous access, SPA routes serve, and utility/unknown HTTP status codes are correct.
- `npm audit --omit=dev`: **0 vulnerabilities**. Full audit reports 7 moderate issues in the TypeScript ESLint/minimatch development-only dependency chain; no high or critical issues remain.
- Build succeeds. The existing storefront entry bundle remains above Vite's 500KB advisory threshold; admin route and feature bundles are split. The shared chart/analytics chunk is approximately 425KB before gzip (120KB gzip); the dashboard feature itself is approximately 9.5KB. No build error is suppressed.
- Automated tests use local synthetic data. Screenshots in `docs/phoenix-evidence/aion-*` contain development records only.

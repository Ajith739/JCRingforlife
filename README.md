# JCRingforlife

JavaScript React/Vite storefront and Phoenix-inspired admin for Aion Smart Rings, backed by Express and SQLite. DoneDoc is a distributor beneficiary.

Use Node 24.13+ and run all commands from this root:

```
npm ci
npm run dev
```

Open http://localhost:5173 for the storefront or `/login` for the browser demonstration. Development-only demo credentials remain `admin@aionrings.demo` / `AionDemo2026!`; demo records stay in this browser.

`npm run dev:api` starts the API and integrated UI in API mode. Configure `.env` from `.env.example`, then run `npm run admin:create` to create an actual administrator. `npm run dev:admin` starts the separate admin UI entry on port 5174; the integrated server on 5173 supplies its shared assets. No separate package install is required per application.

`npm run build` builds both applications. `npm run build:frontend` and `npm run build:admin` build them individually. Production builds use API authentication. Start them with `NODE_ENV=production npm start` behind HTTPS after configuring the server environment.

Validation: `npm run lint`, `npm test`, `npm run test:e2e`, `node scripts/production-smoke.mjs`.

See [audit](docs/PROJECT_AUDIT.md), [architecture](docs/ARCHITECTURE.md), [deployment](docs/DEPLOYMENT.md), [cleanup](docs/CLEANUP_REPORT.md), [UI fixes](docs/UI_FIXES.md), and [production checklist](docs/PRODUCTION_CHECKLIST.md).

Checkout and live financial processing remain unconfigured. No real payments, beneficiary payouts or customer refunds are executed by the current demo.

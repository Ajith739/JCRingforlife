# Deployment

Run commands from the repository root with Node 24.13 or newer:

```
npm ci
npm run build
NODE_ENV=production npm start
```

Set `SESSION_SECRET` to a random secret of at least 32 characters, `APP_ORIGIN` to the HTTPS public origin, and `DATABASE_PATH` to persistent local storage. Configure these as server environment variables. Never expose email or payment secrets through Vite variables. See `.env.example`. Production builds now use the real API by default; browser demo access is development-only. `ADMIN_DEMO` cannot enable backend demo access in production.

Serve behind a trusted HTTPS reverse proxy to 127.0.0.1:3001. Preserve `/api`, `/assets`, `/admin-assets`, and all application routes. The Node server serves both output folders and retains HTTP status codes for utility pages. Check `GET /api/health`. SQLite is appropriate for one server instance; use a SQLite-aware backup procedure and persistent storage. Multi-instance deployment needs a shared database/session architecture.

Payment provider onboarding, signed webhooks, real transfers/refunds/reconciliation and transactional email remain unconfigured. Storefront checkout is simulated; do not accept real payments until integration and provider sandbox tests are completed. Existing historical product delivery copy needs business review.

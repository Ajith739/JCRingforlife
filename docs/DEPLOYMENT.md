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

## Vercel viewing deployment

Import the repository with **Root Directory = repository root**. The checked-in `vercel.json` selects Node `24.x` from package.json, installs with `npm ci`, runs `scripts/build-vercel.mjs`, and publishes `dist/frontend`. Its SPA rewrite supports direct storefront, authentication, and `/admin/*` links. Framework is explicitly unset because the Vite configuration lives in a subdirectory. Remove conflicting command/output overrides in the Vercel project settings, then redeploy.

This target is an explicit browser demonstration: its build sets `VITE_ADMIN_DATA_MODE=preview`. Log in at `/login` with `admin@aionrings.demo` / `AionDemo2026!`, or select Explore development workspace. Data is synthetic, saved in the browser, and no API server or real money movement is involved. The regular `npm run build` continues to default to real API authentication. Vercel does not run the persistent SQLite Express server in this setup.

Install/build commands strip `npm_config_cache_dir` and `NPM_CONFIG_CACHE_DIR` before npm starts. If the `Unknown env config "cache-dir"` warning appears elsewhere in Vercel, remove that obsolete variable from the project's Build Environment settings; npm's supported setting is `npm_config_cache`. No repository `.npmrc` defines `cache-dir`.

ESLint was upgraded to the maintained v10 line. The unused hooks lint plugin was removed, and minimatch is overridden to its patched v11 line to avoid the audit advisory in ESLint's dependency tree. Clean install, lint and tests verify this combination. Storefront pages are lazy loaded so the largest current Vercel JavaScript chunk is about 425 KB; the chunk warning threshold was not increased.

Local verification: `npm run build:vercel`, then `node node_modules/vite/bin/vite.js preview --config frontend/vite.config.js --port 4173`; in another terminal run `node scripts/verify-vercel-preview.mjs`. Set `PREVIEW_URL=https://your-deployment.vercel.app` to run that same browser check against a deployed public preview. It requires installed Chrome.

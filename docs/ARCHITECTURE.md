# Architecture

- `frontend/src`: customer storefront, cart, guides and reservation form.
- `frontend/public`: public assets shared at their existing URLs.
- `backend/admin/src`: React admin layouts, features, reusable components, theme and API adapter.
- `backend/api/src`: Express app, SQLite access, authentication, commerce and finance endpoints.
- `backend/shared`: runtime validation, variant constants, state transitions and financial calculations shared across UI/API/tests.
- `tests`: maintained unit/API/browser tests.

One root npm package and lockfile install all dependencies. `frontend/vite.config.js` builds `dist/frontend`; `backend/admin/vite.config.js` builds `dist/admin`. The API serves storefront assets and admin assets from those outputs and selects the correct HTML for existing routes. Development on port 5173 retains the integrated lazy admin routes; optional `dev:admin` runs the standalone admin entry at 5174. Public media remains centralized to avoid duplication. No database schema or existing database path was changed.

# Production checklist

- JavaScript/JSX-only maintained application source.
- Separate storefront/admin build outputs and API source.
- Existing session/CSRF/role validation and SQLite schema preserved.
- Production builds default to API authentication; development browser demo retained.
- Environment/key/database/build ignores validated; no sensitive tracked candidate files found.
- Separate builds, lint, unit/API, browser routes, and production smoke checks run; see final delivery report for results.

Remaining: provider selection and merchant/beneficiary onboarding; signed webhook and reconciliation integration; real refund/recovery/settlement execution and sandbox verification; partner-specific details, order attribution and earnings workflows; full financial report charts; monitoring, backups, external email/carriers, deployment review and storefront launch-copy review. The storefront bundle remains above Vite's 500KB advisory. This checklist does not certify live payment readiness.

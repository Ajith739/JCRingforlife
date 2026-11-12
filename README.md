# JCRingforlife storefront + Aion Rings administration

React storefront with a Phoenix-inspired Aion admin. The default workspace is a browser-only demo; no API server is needed.

```sh
npm ci
npm run dev
```

Open **http://localhost:5173/login** and sign in with **admin@aionrings.demo** / **AionDemo2026!**, or choose **Explore development workspace**. Demo records are synthetic and saved in this browser. Requires Node 24.13+. The storefront remains at `/`.

The existing backend remains available as an opt-in integration via `npm run dev:api`. For a real workspace, set up `.env`, run `npm run admin:create` and optionally `npm run catalog:init`. The browser demo is not secure production authentication; deploy the API mode for real administrator access.

- [Setup, complete page checklist, verification, and remaining integrations](docs/aion-admin-delivery.md)
- [Phoenix reference evidence](docs/phoenix-reference-analysis.md)
- [Visual comparison](docs/aion-visual-comparison.md)
- [Inspection and architecture decisions](docs/aion-admin-strategy.md)

Payment processing/refunds, email delivery, carrier services, and storefront coupon/content consumption need configured integrations. The existing checkout is still simulated and must not be used for real payments.

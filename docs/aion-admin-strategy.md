# Project inspection and implementation strategy

## Baseline

The initially opened `/Users/abinesh/Documents/ring-back` contained only the `rea/` tool repository, not an Aion application. The user then supplied `/Users/abinesh/Documents/GitHub/JCRingforlife`. Work moved to that existing checkout. Its clean baseline was `cd5ec2c`; all implementation is on the new `feat/aion-phoenix-admin` branch. REA remains untouched. The initial scratch scaffold under `ring-back/aion-admin` is not the delivered application.

The supplied application uses React 18, React Router, Vite, Tailwind, Framer Motion and GSAP. Existing reusable assets include three ring finish images and static `src/data/products.js` catalog information. `src/context/CartContext.jsx` manages browser-local cart state. `src/pages/PreorderPage.jsx` and `CheckoutPage.jsx` simulate submissions; the latter simulates payment and receipt messaging. No server, database, middleware, authenticated admin routes, API client, deploy credentials, or live order integration exists in the checkout. Historical documents mention an Azure endpoint, but no authorized endpoint or credential is configured; it has not been contacted.

## Architecture

Keep React 18 and storefront components. Dispatch `/admin/*` and public auth/utility routes to a separately lazy-loaded TypeScript admin tree. Scope every admin style beneath `.aion-admin`; avoid global theme changes. Keep storefront URL paths, cart data and product data intact. Replace the simulated unpaid pre-order submission with a validated reservation API; preserve the existing checkout simulation and explicitly document its limit. Upgrade vulnerable tooling/router versions and run storefront smoke checks after changes.

Implement reusable layout, theme/toasts, tables, dialogs, record editors, date selectors and chart components. React Query provides API caching and mutation invalidation. Features use the same API in development and production. Production starts with no business records; development seeding is opt-in and visibly labeled.

Because no backend exists to reuse, add one Express service with Node SQLite persistence and server-side sessions. This is an initial backend, not a replacement for a hidden service. Use one parent ring and 24 finish/size variants in development; do not create a product per size. Store financial values in the existing USD denomination. Server-side actions validate transitions, references, unique SKUs, stock levels and authorization, with audit records. Existing hosted services can be integrated behind the client API adapter when supplied.

## Boundaries and assumptions

- Aion branding applies to the new admin; the existing JCRingforlife storefront brand is preserved.
- Ring images come from the existing project's assets; no Phoenix commercial assets are reused.
- Development figures and customers are synthetic. They never imply live sales, payment collection or customers.
- Manual admin orders are unpaid until a future verified payment integration updates them.
- Marketing records, shipping preferences and reporting currency preferences are stored but do not silently alter the existing storefront. The unpaid reservation form explicitly writes to the admin API and returns a saved reference without claiming email delivery.
- No live refund, shipping label or email service is claimed without configuration and end-to-end service testing.
- Production host must provide HTTPS, an exact APP_ORIGIN, a persistent database disk and a SESSION_SECRET of at least 32 characters. The current service binds loopback, intended behind a local reverse proxy.

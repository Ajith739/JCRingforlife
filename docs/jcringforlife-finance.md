# JCRingforlife finance upgrade

JCRingforlife is the selling/admin platform. Aion is the product brand. DoneDoc is a distributor beneficiary. The current Express service uses SQLite and secure sessions; the default Vite workspace uses browser-only synthetic data. There is no configured payment provider or real payment verification source in the repository. The existing storefront checkout remains simulated.

## Implemented

- Phoenix-style admin branding and finance navigation.
- Beneficiary directory for manufacturers, distributors, and franchise owners. API writes require the admin role; records include onboarding status. Demo records are explicitly illustrative.
- Split rules with fixed minor-unit or basis-point percentage shares, product/franchise scope, effective time, active status, validation, and preview. API changes append rule-version snapshots and audit events. Active rules require verified beneficiary onboarding; overlapping active scope is rejected.
- Integer allocation engine uses largest remainder to make percentage shares add up exactly to the distributable amount. Proportional refund recovery targets use the same minor-unit discipline. Automated tests cover $100 two-party, $120 three-party, invalid shares, rounding, and $60 proportional recovery.
- Backend storage for provider-confirmed payment allocations and refund requests, with allocation references to rule version, pending-settlement state, and separate refund/recovery state. Refund requests prevent over-refunding based on outstanding requests. There is no public endpoint that can mark an arbitrary payment captured.

## Activation boundaries

The finance UI is a configuration and demonstration workspace. No provider is connected. Nothing here charges a card, transfers funds, issues a customer refund, or confirms a bank payout. The API has no trusted webhook handler yet, so `recordCapturedPayment` is deliberately not exposed as an HTTP operation. The demo mode stores finance records in browser localStorage; API mode stores them in existing SQLite records. Demo mode is not secure financial administration.

Before live use, the business must supply operating/beneficiary countries, transaction currencies, merchant account and provider eligibility, provider sandbox credentials, payout/KYC requirements, tax/shipping/fee/discount distribution policy, and refund approval policy. Select and verify a marketplace provider against current official documentation, then implement signed webhook verification, idempotency constraints, transfer/reversal requests, settlement reconciliation, provider event persistence, and sandbox tests. The current generic records table also needs financial relational constraints and unique provider-reference indexes before processing real payments. Add role granularity and dual approval for money movement. Customer notifications require an email provider.

Run `npm run dev` for a no-backend browser demonstration, or `npm run dev:api` to use the protected API. Build with `VITE_ADMIN_DATA_MODE=api npm run build` only when deploying with the API, and keep payment processing disabled until the above integration is complete.

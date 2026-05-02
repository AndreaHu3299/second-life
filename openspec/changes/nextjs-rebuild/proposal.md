## Why

The current site is a static Vue prototype with mocked client-side state. Rebuilding it on a production-ready Next.js stack will preserve the warm product concept while enabling scalable routing, bilingual rendering, authentication, data persistence, image upload, and realtime communication.

## What Changes

- Replace the static single-page implementation with a Next.js App Router application using TypeScript and React.
- Introduce a shared design system with Tailwind CSS, shadcn/ui primitives, and Framer Motion interactions while preserving the existing warm visual language.
- Move localization to a structured next-intl setup with zh-CN as default and full bilingual coverage.
- Add a typed server/data foundation with Prisma and PostgreSQL-ready domain models for users, items, chat, wishlist, and meetup flows.
- Add Auth.js-based authentication scaffolding with email/OTP-style entry points and protected flows for post, adopt, and message actions.
- Establish application architecture for mock-first development now, with clear paths to real storage, realtime chat, observability, and deployment later.
- **BREAKING**: Remove the current static HTML/Vue entrypoint architecture and replace it with a Next.js monolith.

## Capabilities

### New Capabilities
- `nextjs-app-foundation`: App Router, TypeScript, Tailwind, shadcn/ui, motion, query, and project structure for the rebuild.
- `data-platform`: Prisma schema, seed data, repository/server data access patterns, and PostgreSQL-ready domain models.
- `route-handler-api`: Next.js Route Handlers for mock-first and future real API flows.

### Modified Capabilities
- `landing-page`: Reimplement the landing experience in Next.js while preserving existing product requirements and responsive navigation behavior.
- `authentication`: Move guest gating and login/register flows to Auth.js-oriented architecture and protected routes/actions.
- `localization`: Move bilingual rendering and persistence to next-intl-driven routing and message management.
- `item-management`: Rebuild browse, detail, and share flows on typed server/client boundaries with seeded and user-managed data.
- `communication`: Rebuild messages and chat flow in the new app architecture with realtime-ready abstractions.
- `adoption-workflow`: Reimplement wishlist, statuses, and adoption lifecycle on typed state and persisted models.

## Impact

- Affected code: all existing frontend entrypoints and UI implementation files.
- New dependencies: Next.js, React, TypeScript, Tailwind CSS, shadcn/ui-related packages, Framer Motion, next-intl, TanStack Query, Prisma, Auth.js, and supporting tooling.
- Affected systems: routing, rendering, localization, authentication, persistence model, development workflow, and deployment target.
- Deployment target shifts from static hosting to Next.js-compatible hosting such as Vercel.

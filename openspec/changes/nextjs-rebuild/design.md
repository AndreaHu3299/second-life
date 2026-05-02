## Context

The repository currently ships a static Vue prototype with a single HTML entrypoint, localStorage-backed session state, and mock item data. The rebuild needs to preserve the existing warm, bilingual, mobile-first product behavior while moving to a production-oriented stack that can grow into real auth, persistence, uploads, and realtime chat without another architectural reset.

The main constraints are: keep zh-CN as the default language, maintain anonymous browsing with gated post/adopt/chat flows, preserve the current emotional product voice, and implement in a way that allows mock data during early development while being database-ready. The existing OpenSpec capabilities for landing, auth, localization, item management, communication, and adoption workflow already define product behavior and should remain valid after the rewrite.

## Goals / Non-Goals

**Goals:**
- Establish a Next.js App Router monolith as the new application foundation.
- Introduce typed domain models and server boundaries suitable for Prisma/PostgreSQL.
- Preserve and reimplement the current user-facing requirements in the new stack.
- Support bilingual rendering through structured locale routing and shared messages.
- Enable protected actions through Auth.js-compatible architecture, even if some flows stay mocked initially.
- Create reusable UI and data patterns for landing, browse, detail, share, messages, and profile surfaces.

**Non-Goals:**
- Full production integration with external providers such as Pusher, Ably, S3/R2, or social auth in the first pass.
- Full moderation/admin tooling.
- Advanced geo-search or search-engine integration beyond simple filtering.
- A dedicated separate backend service; this remains a Next.js monolith for now.

## Decisions

### 1. Use Next.js App Router with locale segment routing
- Decision: Structure the app under `app/[locale]` and use `next-intl` for locale-aware rendering.
- Rationale: This keeps zh-CN and en first-class at the route layer, improves SSR/SEO readiness, and fits the recommended stack.
- Alternatives considered:
  - Pages Router: older model with less alignment to the proposed stack.
  - Client-only i18n: simpler short term, but weaker for route-driven localization and server rendering.

### 2. Keep a monolith with Route Handlers and server components first
- Decision: Implement UI, data fetching, and API endpoints within the same Next.js codebase.
- Rationale: It minimizes complexity while allowing gradual extraction later if needed.
- Alternatives considered:
  - Separate API service now: more overhead and slower iteration.
  - Pure client-only data layer: too limiting for auth, seeded data, and future persistence.

### 3. Adopt Tailwind CSS plus a small shared component system
- Decision: Use Tailwind for styling, shadcn/ui-style primitives for accessible building blocks, and Framer Motion for micro-interactions.
- Rationale: This combination supports fast iteration, consistency, and the warm tactile UI required by the product.
- Alternatives considered:
  - CSS modules only: workable, but slower to scale consistently across many app surfaces.
  - A heavier component framework: risks visual drift from the desired custom aesthetic.

### 4. Use Prisma models even while some flows remain seeded or mocked
- Decision: Define Prisma schema for core entities (`User`, `Item`, `ItemStory`, `AdoptionRequest`, `ChatThread`, `Message`, `MeetupRequest`, `Wishlist`, `Badge`) and keep repository functions that can read seeded mocks until full DB wiring is complete.
- Rationale: This avoids rewriting the data model later and gives typed interfaces now.
- Alternatives considered:
  - Mock-only JSON structures with no schema: fastest short term, but causes migration churn.
  - Supabase/Firebase-specific modeling first: faster MVP, but less aligned to the proposed relational architecture.

### 5. Use Auth.js-compatible boundaries with guest-safe pages
- Decision: Centralize session handling and route protection patterns around Auth.js, while allowing browse/home/detail to stay public.
- Rationale: The app needs anonymous discovery with gated write/chat actions; Auth.js fits that split cleanly.
- Alternatives considered:
  - Custom auth state only: insufficient for long-term security and provider expansion.
  - Force-auth app: conflicts with core browse-first product requirements.

### 6. Separate server state from local UI state
- Decision: Use TanStack Query for client-consumed async state and minimal local state via React state or Zustand where interaction state is shared.
- Rationale: Browse lists, messages, wishlist, and profile views benefit from caching and invalidation; modals and transient filters should stay lightweight.
- Alternatives considered:
  - Global Zustand for everything: too much responsibility in client state.
  - React state only: becomes cumbersome for invalidation and mutation-heavy surfaces.

### 7. Preserve mock-first experience with progressive infrastructure hooks
- Decision: Seed warm bilingual item data and message fixtures into a dedicated data layer while defining adapters for future uploads, realtime messaging, observability, and analytics.
- Rationale: This enables a polished rebuild now without blocking on every external integration.
- Alternatives considered:
  - Fully real integrations from day one: slower and riskier.
  - Keep everything entirely fake: blocks credible transition to production flows.

## Risks / Trade-offs

- [Migration breadth] → Replacing the current frontend architecture touches almost every user-facing file; mitigate by scaffolding the new app cleanly and porting requirements module by module.
- [Dependency weight] → The new stack introduces many packages; mitigate by only wiring the minimum viable set in the initial rebuild and keeping optional providers as placeholders.
- [Spec drift] → A rebuild can accidentally lose warm copy or interaction details; mitigate by mapping every surface back to existing OpenSpec capabilities and seeded content.
- [Auth/data partiality] → Some flows may start mocked while using production-oriented architecture; mitigate by making mocked boundaries explicit in repositories and route handlers.
- [Runtime complexity] → App Router, server/client boundaries, and i18n can add implementation complexity; mitigate through clear folder conventions and shared utilities.

## Migration Plan

1. Scaffold the Next.js application and baseline tooling in the existing repository.
2. Port shared theme, locale messages, and seeded content into the new structure.
3. Rebuild the public browse experience: landing, adopt feed, item detail.
4. Rebuild gated surfaces: auth modal/pages, share flow shell, messages, my space.
5. Add route handlers, Prisma schema, and seeded/mock repository layer.
6. Verify linting, typechecking, and core interaction flows.
7. Replace obsolete static entrypoint files after parity is reached.

Rollback strategy: if needed, the current static app remains recoverable through git history until the rebuild is accepted.

## Open Questions

- Should locale routing use path prefixes for both locales (for example `/zh-CN` and `/en`) or keep Chinese effectively at root via middleware rewriting?
- Do you want the first implementation pass to include Prisma migrations and a running local database, or only the schema plus mock-backed repositories?
- Should messages/chat be implemented as seeded faux realtime in the rebuild, or only as a UI shell until a provider is chosen?

## 1. Project foundation

- [x] 1.1 Replace the static entrypoint structure with a Next.js App Router TypeScript application scaffold in the repo root
- [x] 1.2 Add and configure core dependencies for Next.js, Tailwind CSS, next-intl, Framer Motion, TanStack Query, Prisma, Auth.js-ready auth, and shared utilities
- [x] 1.3 Create the base app structure for `app/[locale]`, shared layouts, providers, and route-safe navigation shells
- [x] 1.4 Port the warm visual theme, typography, and global tokens into the new styling system

## 2. Localization and content

- [x] 2.1 Create structured zh-CN and en message files for shared UI copy
- [x] 2.2 Implement locale resolution, persistence, and header language toggle with zh-CN as default
- [x] 2.3 Port and normalize the seeded bilingual item content, categories, statuses, conditions, and profile copy into typed data modules

## 3. Data and backend architecture

- [x] 3.1 Create the Prisma schema for core entities: users, items, item stories, adoption requests, chat threads, messages, meetup requests, wishlists, and badges
- [x] 3.2 Add seed or repository utilities that can serve mock-first data using the typed domain models
- [x] 3.3 Implement Next.js Route Handlers for public item reads and protected wishlist, adopt, and message mutations
- [x] 3.4 Add auth-aware server utilities and protected action boundaries for guest versus signed-in flows

## 4. Public product surfaces

- [x] 4.1 Rebuild the landing page with hero, animated impact counter, most-viewed carousel, and category pills
- [x] 4.2 Rebuild the adopt/browse page with search, category filters, region controls, distance chips, and responsive item grid
- [x] 4.3 Rebuild the item detail page with first-person story, metadata, owner note, condition badge, timeline support, and privacy guidance
- [x] 4.4 Add reusable loading, empty, and error states with warm bilingual copy

## 5. Gated flows and account surfaces

- [x] 5.1 Rebuild the authentication experience with login, registration, welcome state, and social placeholders
- [x] 5.2 Rebuild the share flow as a multi-step item posting experience with preserved draft state
- [x] 5.3 Rebuild the messages inbox and chat experience with meetup request cards and status messaging
- [x] 5.4 Rebuild My Space with profile summary, badges, wishlist, listings, adoption requests, settings, and logout

## 6. Interaction polish and verification

- [x] 6.1 Reintroduce heart save animations, card transitions, counter motion, and responsive navigation behavior
- [x] 6.2 Verify anonymous browsing and auth-gated flows match the existing product requirements
- [x] 6.3 Update README and local setup instructions for the new Next.js workflow
- [x] 6.4 Run the project lint and typecheck commands and fix any issues before finishing

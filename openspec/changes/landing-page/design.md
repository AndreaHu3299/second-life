## Context

This is a greenfield project — no frontend framework, no existing code. The landing page is the first surface of the 「宝贝回家 / Second-Life Treasures」 app. It must work as a competition-ready entry that judges can understand within 30 seconds and interact with within 2 minutes. All data is mocked. No backend exists.

## Goals / Non-Goals

**Goals:**
- Landing page communicates the "items as living treasures" metaphor immediately
- Judges can complete the flow: land → browse items → attempt to adopt → see login gate
- Clean, warm, professional aesthetic that differentiates from standard secondhand marketplaces
- i18n toggle works from the landing page (zh-CN default, English switchable)
- Mobile-first responsive (375px → 768px → 1024px)

**Non-Goals:**
- No real authentication backend — login is UI-only, mocked, session stored in localStorage
- No real item data — all 20-30 items are pre-seeded mock data in a static file
- No real chat or messaging — this is built in later changes
- No payment processing — intentionally excluded
- No map — addresses are hidden for privacy

## Decisions

### Decision: Single-page architecture (SPA) with client-side routing
We'll use a single HTML entry point with client-side JavaScript. No SSR, no build step beyond basic bundling if needed. This keeps it fast to develop, fast to deploy, and competition-friendly (single URL, instant load). The landing page is the default route (`/`).

**Alternatives considered:**
- Next.js / Remix — overkill for a mock competition entry
- Pure HTML multi-page — harder to manage shared state (auth, language)
- SPA with vanilla JS or a lightweight framework (Alpine.js, Vue CDN) — chosen for simplicity

**Decision:** Use Vue 3 via CDN or a lightweight framework that supports reactive state, component structure, and i18n without a build step. This gives reactive auth state and language switching with zero build complexity.

### Decision: Mock data as static JSON arrays
All items, translations, impact counter values, and mock conversation seeds are stored in static JSON/JS files. This is loaded on page load. No fetch calls to external APIs.

### Decision: LocalStorage for session + language + counter persistence
- Auth session: `{ isLoggedIn: true, nickname: "小暖", city: "Beijing" }`
- Language: `zh-CN` or `en`
- Counter: stored with date key so it "grows" on each new day

### Decision: Login modal overlay, not redirect page
When a guest clicks a gated action, a modal appears over the current page. This preserves context and is faster than a full-page redirect. After "login" (mock — any credentials work), the modal closes and the action completes.

### Decision: Impact counter uses seeded base + daily random delta
- Base value stored in localStorage keyed by date
- Each day: generate new base (30-80 range) to feel alive
- Display: animate from 0 to value on page load
- When same-day revisit: value stays consistent

### Decision: Category pills double as navigation to filtered adopt page
Tapping a category pill on the landing page navigates to the adopt/browse page with that category pre-selected. This connects the landing page to the broader app flow.

### Decision: First-person taglines visible on carousel cards
The carousel shows each item's name, photo, distance, and a short first-person quote. This immediately communicates the core differentiator — items speak. This is intentional, not held back for the detail page.

## Risks / Trade-offs

[CDN framework fragility] → Pin specific CDN versions, include a fallback notice. Competition judges need this to work reliably.

[Mock login is trivially bypassed] → Acceptable. This is a competition entry, not production. The gate is UX, not security.

[i18n doubles all copy maintenance] → We use structured translation objects keyed by locale. One source of truth.

[Performance with mock data] → 20-30 items with images is small enough for no performance concerns.

[Design feels too polished for the metaphor?] → The warm aesthetic IS the product. Lean into it.

## Why

The competition entry needs a first-impression page that communicates the core concept — items as treasures seeking a second life — within 5 seconds. The landing page is the emotional and functional entry point for all users. Without it, the product has no face.

## What Changes

- Build the landing page (首页/Home) as the default route
- Implement warm, soft visual identity across the page
- Add language toggle (zh-CN/en) in the header
- Display an animated impact counter ("X treasures found homes today")
- Show a horizontal carousel of most-viewed mock items with first-person taglines
- Add horizontally scrollable category pills
- Implement navigation: 5-tab bottom bar (mobile) / top nav (desktop)
- Gate gated actions (post, chat, adopt) behind login modal for anonymous users
- Include responsive breakpoints (mobile 375px, tablet 768px, desktop 1024px)

## Capabilities

### New Capabilities
- `landing-page`: The homepage entry point — hero section, impact counter, item carousel, category pills, responsive layout, auth gating for downstream actions

### Modified Capabilities
- `anonymous-browsing`: Homepage is the entry point for anonymous browsing — the "browse without login" requirement now has a concrete surface (the landing page renders fully for guests, with CTAs that trigger login modal)
- `ui-visual`: Landing page is the primary surface where the warm/soft aesthetic, color palette, typography, iconography, and micro-interactions are first realized (counter animation, card hover states, heart saves)
- `gamification`: The impact counter and animated counting are rendered on the landing page
- `authentication`: The landing page introduces the login modal trigger when guests attempt gated actions (adopt, post, messages)

## Impact

- New page: `/` (home route)
- New header component with language toggle
- New item carousel component
- New login modal component
- New mobile bottom tab navigation + desktop top nav
- Mock item data service consumed by carousel
- Session/auth gate logic for protected actions
- Dependencies: none — greenfield

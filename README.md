# 宝贝回新家 / Second-Life Treasures

> 每个宝贝，都值得第二次生命 / Every treasure deserves a second life

A warm and gentle second-hand exchange platform where every item is a 宝贝 (treasure/baby) seeking a new home. Items
speak in first-person, listings feel like adoption profiles, and transactions are "adoptions" — not sales.

Built with **Next.js App Router**, **TypeScript**, and **Tailwind CSS v4** with full **bilingual support** (zh-CN / en).

---

## Quick Start

### Prerequisites

- **Node.js** >= 20
- **pnpm** >= 9 (recommended) — or npm/yarn

### Local Development

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). The default locale is `zh-CN`, accessible at `/zh-CN` or `/en`.

### Available Scripts

| Command          | Description                          |
|------------------|--------------------------------------|
| `pnpm dev`       | Start development server (Turbopack) |
| `pnpm build`     | Production build                     |
| `pnpm start`     | Start production server              |
| `pnpm lint`      | Run ESLint (Next.js config)          |
| `pnpm typecheck` | Run TypeScript compiler — no emit    |

---

## Project Structure

```
├── app/
│   ├── [locale]/               # Locale segment routing
│   │   ├── layout.tsx          # Root layout with i18n provider
│   │   ├── page.tsx            # Landing page (home)
│   │   ├── adopt/page.tsx      # Browse/search page
│   │   ├── item/[id]/page.tsx  # Item detail page
│   │   ├── share/page.tsx      # Share / post item (WIP)
│   │   ├── messages/page.tsx   # Messages inbox (WIP)
│   │   └── my-space/page.tsx   # User profile (WIP)
│   └── globals.css             # Global styles + Tailwind + keyframes
├── components/
│   ├── Header.tsx              # Sticky header with lang toggle
│   ├── BottomNav.tsx           # Mobile bottom navigation
│   ├── ItemCard.tsx            # Reusable item card with save
│   └── Providers.tsx           # TanStack Query client provider
├── i18n/
│   ├── routing.ts              # Locale config (zh-CN, en)
│   ├── navigation.ts           # next-intl Link/usePathname
│   └── request.ts              # getRequestConfig for SSR
├── lib/
│   ├── types.ts                # Domain types and utilities
│   ├── utils.ts                # cn() class merge helper
│   └── seed-data.ts            # 20 pre-seeded bilingual items
├── messages/
│   ├── zh-CN.json              # Chinese message dictionary
│   └── en.json                 # English message dictionary
├── middleware.ts               # next-intl locale middleware
├── next.config.ts              # Next.js config with next-intl plugin
├── tailwind.config.ts          # Tailwind v4 — @theme in CSS
├── tsconfig.json               # TypeScript config (strict)
├── postcss.config.mjs          # PostCSS with @tailwindcss/postcss
├── package.json
└── src_old/                    # Legacy static Vue prototype (reference)
```

---

## Features

### Implemented

- **Bilingual** (zh-CN / en) with header toggle and locale segment routing
- **Anonymous browsing** — no login required to explore
- **20 mock items** with first-person stories and warm copy
- **Animated impact counter** ("X treasures found homes today")
- **Most-viewed carousel** with horizontal scroll snap
- **Category pills** that filter the browse feed
- **Item detail page** with first-person story, owner note, condition badge, privacy guidance
- **Adopt/browse page** with search, category filters, and responsive 2-column grid
- **Heart save animation** with Framer Motion and CSS keyframes
- **Card stagger animations** with fadeInUp on grid items
- **Responsive** — mobile-first with 480px max-width centered layout

### Upcoming

- **Prisma schema** + PostgreSQL data layer
- **Next.js Route Handlers** for items, wishlist, adopt, messages
- **Auth.js integration** with guest-safe pages and protected actions
- **Share flow** — multi-step item posting with draft state
- **Messages / chat** — inbox with meetup request cards
- **My Space** — profile, badges, wishlist, listings, settings

---

## Tech Stack

| Layer           | Technology                                       |
|-----------------|--------------------------------------------------|
| Framework       | Next.js 16 (App Router, Turbopack)               |
| Language        | TypeScript (strict mode)                         |
| Styling         | Tailwind CSS v4 (`@theme` in CSS)                |
| Animations      | Framer Motion + custom CSS keyframes             |
| i18n            | next-intl v4 (locale routing, SSR)               |
| State           | TanStack Query (server state), Zustand-ready     |
| Data            | Seeded mock data → Prisma + PostgreSQL (planned) |
| Auth            | Auth.js / next-auth (planned)                    |
| Icons           | Lucide React                                     |
| Package Manager | pnpm                                             |

---

## Theme Tokens

The warm visual system is defined in `app/globals.css` via Tailwind v4 `@theme`:

| Token               | Value                             | Usage                            |
|---------------------|-----------------------------------|----------------------------------|
| `--color-primary`   | `#E8734A`                         | CTA buttons, active nav, accents |
| `--color-secondary` | `#5BA88C`                         | Counter, success states          |
| `--color-accent`    | `#F2B866`                         | Highlights, notes                |
| `--color-bg`        | `#FEFCFA`                         | Page background                  |
| `--color-text`      | `#2D2520`                         | Primary text                     |
| `--radius-md`       | `16px`                            | Cards, modals                    |
| Fonts               | PingFang SC, Noto Sans SC, system | Bilingual-friendly               |

---

## Deployment

### Vercel (Recommended)

```bash
vercel --prod
```

Vercel auto-detects Next.js and handles the build

### Other Next.js-Compatible Hosts

| Platform    | Notes                                           |
|-------------|-------------------------------------------------|
| **Netlify** | Build command: `pnpm build`, Output: `.next`    |
| **Railway** | Connect repo, set `pnpm build` as build command |
| **Docker**  | Use `next start` with Node 20 base image        |

> The app requires a **Node.js runtime** — it is no longer a static site.

---

## Competition Submission

- **Flow time**: Under 2 minutes to complete: land → browse → view item → attempt adopt → see login/chat
- **i18n**: Toggle in the top-right header (zh-CN default)
- **Mobile-first**: Best experienced on a phone or phone-sized browser window
- **Warm copy**: Every piece of UI text carries the emotional product voice

---

## Legacy

The original static Vue prototype lives in `src_old/` for reference. It will be removed once this rebuild reaches full
feature parity and is accepted.

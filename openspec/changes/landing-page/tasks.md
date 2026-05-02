## 1. Project Setup

- [x] 1.1 Initialize project with HTML entry point (index.html), CSS file, and JS entry (main.js)
- [x] 1.2 Add Vue 3 via CDN (or chosen framework) in index.html
- [x] 1.3 Add i18n translation module with structured zh-CN/en translation objects

## 2. Core Layout & Navigation

- [x] 2.1 Create app shell with header, main content area, and mobile bottom tab bar
- [x] 2.2 Build responsive navigation — bottom tabs on mobile (375px), top nav on desktop (1024px)
- [x] 2.3 Implement 5 tabs: 首页/Home, 领养/Adopt, 发布/Share, 消息/Messages, 我的/My Space
- [x] 2.4 Add language toggle button in the header (zh-CN default, switches to en)
- [x] 2.5 Implement client-side routing so tab clicks switch views without page reload

## 3. Landing Page Content Sections

- [x] 3.1 Build hero section with warm background, Chinese tagline, description, and "去领养" CTA button
- [x] 3.2 Implement impact counter with animated counting (0 → target on load, localStorage persistence by date, daily random base 30-80)
- [x] 3.3 Create mock data module with 20-30 pre-seeded items (photo URL, name zh/en, story zh/en, owner note, category, condition, district, distance, timestamp, status, views)
- [x] 3.4 Build horizontal carousel component showing top 5 items by view count
- [x] 3.5 Each carousel card shows: photo, item name, distance badge, first-person tagline, status badge
- [x] 3.6 Carousel card tap navigates to item detail view
- [x] 3.7 Build category pills (数码/Digital, 家居/Home, 书籍/Books, 服饰/Fashion, 玩具/Toys, 其他/Others) with horizontal scroll
- [x] 3.8 Category pill tap navigates to adopt page with pre-selected category filter

## 4. Login Modal & Auth Gating

- [x] 4.1 Create login modal component with phone+code and email+password inputs (mock — no real validation)
- [x] 4.2 Add "Forgot password" link and social login placeholders (WeChat/Google)
- [x] 4.3 Implement registration form with nickname (required), phone/email, password, optional city/district, optional bio
- [x] 4.4 After registration, show welcome screen explaining platform
- [x] 4.5 Store auth session in localStorage on successful login/register
- [x] 4.6 Implement auth gate: when guest taps gated action (post, chat, messages, adopt), show login modal
- [x] 4.7 After mock login, close modal and allow the gated action
- [x] 4.8 "My Space" tab shows guest prompt when not logged in, full profile when logged in

## 5. Visual Design & Micro-interactions

- [x] 5.1 Apply color palette: terracotta #E8976B, sage green #8FAE8B, gold #D4A574, cream #FDF8F3, charcoal #4A4040
- [x] 5.2 Apply rounded corners, soft shadows, and generous whitespace globally
- [x] 5.3 Set typography: rounded friendly sans-serif, larger than default, warm letter-spacing
- [x] 5.4 Add heart save animation on item card favorite
- [x] 5.5 Add smooth card hover/press transitions on carousel
- [x] 5.6 Implement rotating sprout icon as loading indicator for page sections
- [x] 5.7 Apply mobile-first responsive breakpoints (375px single col, 768px 2-col, 1024px 3-4 col)

## 6. Item Detail Page

- [x] 6.1 Build item detail page layout with full-width hero image
- [x] 6.2 Display first-person intro text, metadata (status, category, district, distance, relative time, views)
- [x] 6.3 Show owner's story quote card ("前主人的话 / From previous owner")
- [x] 6.4 Display condition badge (如新/Like New, 轻微使用痕迹/Gentle Use, 岁月痕迹/Has Character)
- [x] 6.5 Implement "I Want to Adopt" button with auth gate (modal if guest, chat if logged in)
- [x] 6.6 Add save/favorite heart and share buttons
- [x] 6.7 Add privacy note: address shared via chat only, meet in public

## 7. Polish & Competition Readiness

- [x] 7.1 Ensure full flow completable in under 2 minutes: land → browse → view item → attempt adopt → see login/chat
- [x] 7.2 Verify i18n toggle works across all text on landing page (hero, counter, carousel, pills, nav)
- [x] 7.3 Add friendly empty states for when no items match or sections are empty
- [x] 7.4 Visually verify on mobile viewport (375px) and desktop viewport (1024px+)
- [x] 7.5 Ensure all copy is warm, non-technical, and in the active language

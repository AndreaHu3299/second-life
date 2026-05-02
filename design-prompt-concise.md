# 「宝贝回新家」 / Second-Life Treasures

Build a mobile-first, warm-aesthetic web app for second-hand item exchange. Every item is a 宝贝 (treasure/baby) seeking a new home — not selling, "adopting."

## Core Concept
**Tagline**:「每个宝贝，都值得第二次生命」/ "Every treasure deserves a second life"
Items speak in first-person. Listings feel like pet-adoption profiles. Replace e-commerce terms with adoption metaphors: "Available" → "等待领养 / Awaiting Adoption", "Sold" → "已找到新家 / Found a New Home".

## i18n
- Chinese (zh-CN) primary + English secondary
- Language toggle always visible in header
- Chinese default, all copy bilingual

## Auth
- No login required for browsing
- Login needed for: posting, chatting, adopt requests
- Mock login: phone+code or email+password, nickname-based (no real names), optional city/district
- Clean minimal login modal

## Navigation (mobile bottom tabs / desktop top nav)
1. **首页 / Home** — Hero with tagline + short desc + CTA「去领养 / Adopt". Impact counter: "今天X个宝贝找到新家 / X treasures found homes today". Horizontal carousel of most-viewed items. Quick category pills scroll (数码/Digital, 家居/Home, 书籍/Books, 服饰/Fashion, 玩具/Toys, 其他/Others).
2. **领养 / Adopt** — Browse items. Filters: search by story, category pills, region (city→district), vicinity toggle (browser geolocation → if denied, manual district picker), distance chips (1km, 5km, 10km, 同城/same city). Card grid: photo, item name, status badge, distance badge "距你Xm / Xm away", first-person tagline, heart save, owner nickname.
3. **发布 / Share a Baby** — Step flow: (1) Upload 3-6 photos. (2) Name baby, category, condition, "心意/token of appreciation" (not "price"), region. (3) First-person story prompt "如果宝贝会说话，它会怎么介绍自己？/ If your treasure could speak, how would it introduce itself?", plus "why letting go" text. (4) Meetup preference: in-person type, available times. Exact address NEVER public.
4. **消息 / Messages** — Conversations list with item thumbnail, last message preview, unread badge. Status on conversations: 领养确认中/Adoption in progress, 约见面/Meetup scheduled, 已完成/Complete.
5. **我的 / My Space** — Avatar, nickname, stats (posted, adopted out, adopted in). My listings (Active/Found Home/Pending). Wishlist. Meetup requests. Edit profile. Settings (language, notifications, logout). Empty state prompts login.

## Item Detail Page
- Full-width image + first-person intro
- Metadata: status, category, location (district only), distance "距你约1.2km", relative timestamp, views
- Owner's story card "前主人的话 / From previous owner" — why letting go
- Optional timeline: purchased → story milestones → seeking new home
- Condition badge: 如新/Like New, 轻微使用痕迹/Gentle Use, 岁月痕迹/Has Character
- Primary button 「我想领养 / I Want to Adopt": NOT logged in → login modal with "领养宝贝需要先登录哦/Please login to adopt"; Logged in → opens chat
- Secondary: 「收藏 / Save", Tertiary: 「分享宝贝 / Share"
- Privacy note: "具体地址将在双方确认后通过聊天分享 / Exact address shared via chat after confirmation"

## Chat Interface
- Messaging UI with item thumbnail + owner nickname at top
- Text input + emoji
- **Meetup request card** — special message type: date picker, time picker, location input (general — café, landmark, not address), status flow 待确认→已确认→已完成
- System messages: "领养请求已发送 🌿 / Adoption request sent"

## Mock Data
Pre-populate 20-30 items across categories. Examples (first-person format):
- **小暖/A-Nuan** — 暖黄色台灯: "嗨！我叫小暖，是一盏暖黄色的台灯。主人陪我度过了考研的三百个夜晚，现在她要离开这座城市，我应该继续照亮某个人的书桌。"
- **阿书/A-Shu** — 全套《百年孤独》: "我是一整套加了书签的《百年孤独》，主人读完了所有7代人的故事，希望有人继续。"
- **铁铁/Tie-Tie** — 复古胶片相机: "我叫铁铁，1987年相机，偶尔会卡一下但拍出来有温暖色调。"
- **兜兜/Dou-Dou** — 帆布托特包, **小绿/Little Green** — 3年多肉植物, etc.
Varied conditions, distances, statuses, districts.

## Visual Design
- **Warm/soft aesthetic**, cozy home feel. Rounded corners everywhere, soft shadows, no harsh edges, generous whitespace
- **Colors**: Primary terracotta/coral (#E8976B), Secondary sage green (#8FAE8B), Accent soft gold (#D4A574), Background warm cream (#FDF8F3), Text warm charcoal (#4A4040)
- **Typography**: Rounded friendly sans-serif, larger than default for readability
- **Icons**: Rounded line style, heart motifs tasteful, sprout/seedling metaphors
- **Micro-interactions**: Heart animation on save, gentle bloom on "Found Home", smooth card hover, loading = rotating sprout icon

## Gamification
- Homepage impact counter with counting animation
- User badges: 引路人/Guide (5+), 爱心大使/Ambassador (10+), 新邻居/New Neighbor
- Achievement toasts: first chat, first post, first adoption

## Responsive
- Mobile-first: 375px. Single column, bottom tabs. Tablet: 2-col grid. Desktop: 3-4 col, top nav, sidebar filters.

## Technical Notes
- All mocked, no real backend. Session in localStorage. Photos from Unsplash. Loading + error states with friendly copy. Competition-ready: understand in 30s, full flow in under 2 min.

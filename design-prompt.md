# V0 / Framer Prompt — 「宝贝回新家」 / "Second-Life Treasures"

## Website to Build

Build a mobile-first, warm-and-soft aesthetic web app for second-hand item exchange that frames every item as a 宝贝 (宝贝 = treasure/baby) seeking a new home. The metaphor runs deep: items speak in first-person, listings feel like pet-adoption profiles, and transactions are "adoptions" — not sales.

---

## Core Concept

**Tagline**: 给宝贝第二次生命 / Giving treasures a second life

Every item is a living "宝贝" waiting to be adopted. When you browse, you're not shopping — you're meeting someone's beloved object that wants a new home.

---

## Internationalization (i18n)

- **Languages**: 中文 (Primary/Simplified Chinese) + English (Secondary)
- Language toggle visible in the header at all times
- Chinese is the default; all copy should be written in Chinese first, English as translation
- All UI text, item descriptions, navigation, placeholders, error messages must support both
- Use `zh-CN` and `en` locale codes

---

## Architecture & Pages

### 1. Navigation Structure

Bottom tab bar (mobile) / Top nav (desktop) with:

| Tab (zh) | Tab (en) | Icon Style |
|---|---|---|
| 首页 | Home | House with heart |
| 领养 | Adopt | Paw print / Open hands |
| 发布 | Share a Baby | Plus with sparkle |
| 消息 | Messages | Chat bubble with heart |
| 我的 | My Space | Person silhouette |

### 2. Home Page (首页)

**Hero section:**
- Warm illustration or gradient background
- Tagline: 「每个宝贝，都值得第二次生命」
- Short description (2-3 lines): 这里的每一件物品，都曾被人珍爱。现在它们带着故事，等待新的家。不是丢弃，是延续。
- CTA button: 「去领养」 / "Adopt"

**Impact counter (gamification):**
- Animated counters showing: 「今天已有 X 个宝贝找到新家」 / "X treasures found homes today"
- Weekly/Monthly milestone: 「本月共帮助 X 个宝贝回新家」

**Most Viewed Carousel:**
- Horizontal scroll cards showing top-5 most-viewed items
- Each card shows item image, item name, distance badge, and a mini "first-person" tagline
- Tap → goes to item detail page

**Quick category pills:**
- Horizontally scrollable: 数码 / Digital, 家居 / Home, 书籍 / Books, 服饰 / Fashion, 玩具 / Toys, 其他 / Others

---

### 3. Adopt Page (领养)

**Filter bar at top:**
- Search input with placeholder: 「搜索宝贝的故事…」 / "Search by story or name…"
- Category dropdown / pills
- Region selector: city, district (hierarchical)
- Vicinity toggle: "Show nearest first" — triggers browser geolocation permission
  - If geolocation granted: sort by distance, show "距你 Xm" / "Xm away" badge
  - If denied or not available: fall back to manual district picker
- Filter chip for distance ranges: "1km以内" / "Within 1km", "5km以内" / "Within 5km", "10km以内" / "Within 10km", "同城" / "Same city"

**Results:**
- Card grid (2 columns mobile, 3-4 columns desktop)
- Each card shows:
  - Photo
  - Item name (given by owner)
  - Status badge with metaphorical states (see Status System below)
  - Distance badge
  - First-person mini-description: "我在找一个能陪我熬夜的书桌主人 💡"
  - Heart icon for saving/favoriting
  - Owner's nickname (not real name)

---

### 4. Item Detail Page

**Header:**
- Full-width image
- Item first-person intro: "嗨！我叫阿暖，是一盏暖黄色的台灯。我的前主人要搬家了，他说我还能照亮很多个夜晚。" / "Hi! I'm A-Nuan, a warm yellow desk lamp. My previous owner is moving and says I still have many nights left to illuminate."

**Item metadata:**
- Status badge
- Category
- Location: District/City level only (not exact address)
- Distance from user: "距你约 1.2km" / "About 1.2km from you"
- Posted: relative timestamp ("2天前" / "2 days ago")
- Views count

**Owner's story (why letting go):**
- A small section with a quote-style card: "前主人的话 / From previous owner" — e.g., "小暖陪我度过了考研的三百个夜晚，不是她不好，是我要离开这座城市了。希望有人继续珍惜她。"

**Item history (optional, adds charm):**
- Mini timeline: "2022年6月被购入" → "陪伴主人度过考研日日夜夜" → "2025年12月寻找新家"

**Condition:**
- Badge: 如新 / Like New, 轻微使用痕迹 / Gentle Signs of Use, 岁月痕迹 / Has Character

**Action buttons:**
- Primary: 「我想领养」 / "I Want to Adopt" (large, warm-colored button)
  - If NOT logged in → redirect to login modal with message: 「领养宝贝需要先登录哦」 / "Please log in to adopt a treasure"
  - If logged in → opens chat with the owner
- Secondary: 「收藏」 / "Save to Wishlist" (heart icon)
- Tertiary: 「分享宝贝」 / "Share This Baby"

---

### 5. Chat Interface

- Opens after pressing "I Want to Adopt"
- Real-time style messaging UI (mocked)
- Top of chat shows item info thumbnail + owner nickname
- Message input with text + emoji
- **Meetup request card** — special message type that can be sent by either party:
  - Contains: Date picker, Time picker, Location input (general, e.g., café name or landmark — not full address)
  - Status: 待确认 / Pending → 已确认 / Confirmed → 已完成 / Completed
  - Visual: distinct card style with checklist/checkmark flow
- System messages with warm tone: "领养请求已发送，等待对方回应 🌿" / "Adoption request sent, waiting for response"

---

### 6. Post / "Share a Baby" Page (发布)

Metaphor: You're not listing an item — you're writing an adoption profile for a beloved companion.

**Step-by-step flow:**

**Step 1: Photos**
- Upload area: 「为宝贝拍几张照片」 / "Take a few photos of your treasure"
- 3-6 photos supported, drag-to-reorder
- First photo = cover photo

**Step 2: Basic info**
- Name your baby: 「给宝贝起个名字」 / "Name your treasure" (e.g., "小暖", "阿书", "铁铁")
- Category selector
- Condition selector
- Expected price / 「希望回报」 / "Hoping for" (free, negotiable, specific amount) — labeled as "心意" (token of appreciation) not "价格" (price)
- Region: auto-filled from profile or manual city/district

**Step 3: Story**
- First-person story prompt: 「如果宝贝会说话，它会怎么介绍自己？」 / "If your treasure could speak, how would it introduce itself?"
- Textarea with hint: "嗨，我是一只… 我的主人… 我想找一个…"
- Why letting go: 「为什么要送宝贝去找新家？」 / "Why are you sending your treasure to a new home?"

**Step 4: Meetup preference**
- Preferred meetup type: 线下见面 / In-person meetup, 地铁站 / Subway station, 小区门口 / Community gate, 咖啡厅 / Coffee shop
- Available times: 「方便见面的时间」 / "When I'm available to meet"
- Note: Exact address is NEVER shown publicly

---

### 7. Messages Tab (消息)

- List of conversations
- Each conversation shows: item thumbnail, last message preview, unread badge
- Status badges on conversations: 「领养确认中」 / "Adoption in progress", 「约见面」 / "Meetup scheduled", 「已完成」 / "Complete"
- Empty state: warm illustration + "还没有消息，去领养一个宝贝吧" / "No messages yet, go adopt a treasure"

---

### 8. My Space (我的)

**If logged in:**
- Avatar + nickname
- Stats row: 发布的宝贝 / Posted, 成功送出的宝贝 / Successfully Adopted Out, 领养的宝贝 / Adopted
- My listings: toggle between 发布中 / Active, 已找到新家 / Found Home, 待领走 / Pending Pickup
- My adoption wishlist
- My meetup requests (pending/confirmed)
- Edit profile: nickname, avatar, default city/district, bio
- Settings: language toggle, notifications toggle, logout

**If logged out (guest view):**
- Prompt to log in to unlock:
  - 「登录后可发布宝贝、领养心仪好物、与主人聊天」
- "Login" / "Register" buttons

---

## Authentication Flow

### Login Modal / Page
- Phone number + verification code (simplified, mocked)
- OR email + password (mocked)
- Social login buttons: WeChat / Google (visual placeholders, mocked)
- Forgot password link
- Clean, minimal form

### Register
- Nickname (required, no real name required — emphasis on pseudonymity)
- Phone or email
- Password
- Default city/district (optional but encouraged for better matching)
- Bio: 「关于我」 / "About me" — short text, optional
- After registration: brief welcome with explanation of how the platform works

**Key UX**: No login required for browsing. Only required for posting, chatting, and adopt requests.

---

## Status System

Replace e-commerce terminology with adoption metaphors:

| Traditional | This Platform |
|---|---|
| Available | 等待领养 / Awaiting Adoption |
| Pending | 领养确认中 / Finding the Right Home |
| Sold | 已找到新家 / Found a New Home |
| Removed | 被主人撤回 / Called Back |
| Draft | 宝贝档案编辑中 / Profile Draft |

---

## Mock Data

Pre-populate with 20-30 diverse items across categories:

**Sample items (first-person format):**

1. **小暖 (A-Nuan)** — 暖黄色台灯 / Warm yellow lamp
   - Story: "嗨！我叫小暖，是一盏暖黄色的台灯。我的主人陪她度过了考研的三百个夜晚。现在她要离开这座城市，她说我应该继续照亮某个人的书桌。"
   - Category: 家居 / Home
   - Condition: 如新 / Like New
   - Owner's note: "小暖陪我度过了考研的三百个夜晚，不是她不好，是我要离开这座城市了。"
   - Distance: 1.2km · District · "2天前" / "2 days ago"
   - Status: 等待领养

2. **阿书 (A-Shu)** — 全套《百年孤独》/ Complete "One Hundred Years of Solitude"
   - Story: "我是一整套加了书签的《百年孤独》。主人读完了我所有7代人的故事，她说希望有人继续这些故事。"
   - Category: 书籍 / Books
   - Status: 已找到新家 (for variety)

3. **铁铁 (Tie-Tie)** — 复古胶片相机 / Vintage film camera
   - Story: "我叫铁铁，是一台1987年的胶片相机。虽然我偶尔会卡一下，但拍出来的照片有一种很温暖的色调。"
   - Category: 数码 / Digital
   - Owner's note: "铁铁是我的毕业礼物，现在我想把它传给另一个热爱摄影的人。"

4. **兜兜 (Dou-Dou)** — 帆布托特包 / Canvas tote bag
   - Story: "我是个结实的帆布包，陪主人去过菜市场、去过图书馆。如果你也喜欢简单的生活，我们很合适。"

5. **小绿 (Little Green)** — 多肉植物盆栽 / Succulent plant pot
   - Story: "我是一颗养了3年的多肉植物！因为主人经常出差，所以我需要一个不会忘记给我浇水的人。"

6-30. Generate additional items spanning all categories with varied names, stories, conditions, distances, and statuses.

---

## Visual Design Requirements

**Design Style:**
- Warm, soft aesthetic — like stepping into a cozy home
- Rounded corners everywhere (cards, buttons, inputs)
- Soft shadows, no harsh edges
- Generous whitespace

**Color Palette:**
- Primary: warm terracotta/coral (#E8976B or similar) — the "warmth" color
- Secondary: sage green (#8FAE8B or similar) — "growth, new life"
- Accent: soft gold (#D4A574 or similar) — "treasure"
- Background: warm cream/off-white (#FDF8F3 or similar)
- Text: warm charcoal, not pure black (#4A4040 or similar)
- Success: muted teal
- Warning: warm amber

**Typography:**
- Rounded, friendly sans-serif for Chinese (similar to 苹方, or system default with warm feel)
- Similar weight pairing for English
- Larger than default font sizes for readability
- Warm letter-spacing

**Iconography:**
- Rounded line-style icons
- Heart motifs used tastefully (not overwhelming)
- Home/house, hands, paw, sprout/seedling related visual metaphors

**Micro-interactions:**
- Heart animation on save/favorite
- Confetti or gentle bloom animation when status changes to "Found a New Home"
- Smooth card hover/press states
- Loading: small rotating sprout icon

---

## Responsive Design

- **Mobile-first** as the primary viewport (375px base)
- Breakpoints: 375px (mobile), 768px (tablet), 1024px (desktop)
- Mobile: bottom tab navigation, single-column cards, full-width buttons
- Tablet: 2-column card grid
- Desktop: 3-4 column grid, top navigation, sidebar filters on Adopt page

---

## Privacy & Safety Messaging (visible but subtle)

- On item detail: 「具体地址将在双方确认后通过聊天分享」 / "Exact address will be shared via chat after both parties confirm"
- General tip: 「建议在人多的公共场所见面」 / "We recommend meeting in public places"
- Small safety badge on the chat screen

---

## Gamification Elements

1. **Homepage counter**: "X个宝贝今天找到了新家" — animated counting animation
2. **User badges** (displayed on profile):
   - 「引路人」/ "Guide" — successfully helped 5+ items find homes
   - 「爱心大使」/ "Ambassador of Love" — 10+ successful adoptions
   - 「新邻居」/ "New Neighbor" — just joined
3. **Achievement toast**: When user first chats, first post, first adoption — "成就解锁：第一次打招呼！" / "Achievement unlocked: First hello!"

---

## Empty States

Every empty state should have:
- Warm illustration or gentle icon
- Encouraging text
- CTA to take action

Examples:
- Empty Adopt page: "这里还没有宝贝，去成为第一个发布的邻居吧 🌱"
- Empty Messages: "还没有消息，去领养一个宝贝吧"
- Empty My Listings: "你还没有分享过宝贝" + CTA

---

## Technical Notes for v0/Framer

- Use mock data, no real backend needed
- Authentication flow is mocked (phone/email login works visually, stores session in localStorage)
- Chat messages are pre-seeded or use simple mock send
- Meetup request cards in chat are UI components with date/time/location selection (non-functional or localStorage-persisted)
- Geolocation: use browser API; if denied, show fallback to manual district selection
- All images use placeholder illustrations or high-quality Unsplash photos
- Loading states for each page/section
- Error states with friendly messaging

---

## Submission-Ready Elements

The site should be competition-ready:
- Judges should understand the concept within 30 seconds
- Complete a full flow (browse → view item → attempt to adopt → see chat/login) in under 2 minutes
- Clear differentiation from standard second-hand platforms through the "living item" metaphor
- i18n toggle easily discoverable for demonstrating both language support

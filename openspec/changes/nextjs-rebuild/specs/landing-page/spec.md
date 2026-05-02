## MODIFIED Requirements

### Requirement: The landing page shall be the default route of the application

#### Scenario: User visits the root URL
- **WHEN** a user navigates to the application root URL (`/`)
- **THEN** the Next.js application resolves and renders the landing page as the default public experience
- **AND** it displays the header with language toggle, navigation, and all landing page sections

### Requirement: The landing page shall display a hero section with tagline and call-to-action

#### Scenario: Hero section rendering
- **WHEN** the landing page renders
- **THEN** the hero section displays the Chinese tagline "每个宝贝，都值得第二次生命" by default
- **AND** a 2-3 line description in the active language
- **AND** a primary CTA button labeled "去领养 / Adopt"
- **AND** clicking the CTA navigates to the adopt/browse page within the Next.js application

### Requirement: The landing page shall display a carousel of most-viewed items

#### Scenario: Carousel rendering
- **WHEN** the landing page renders
- **THEN** a horizontal scrollable carousel shows the top 5 most-viewed items from the shared data layer
- **AND** each carousel card displays: item photo, item name, distance badge, first-person tagline, and status badge
- **AND** tapping a card navigates to the item detail page

#### Scenario: First-person tagline visibility
- **WHEN** a carousel card renders
- **THEN** a short first-person quote from the item is visible on the card
- **AND** example: "Hi! I'm A-Nuan, I used to keep someone's desk warm at night..."

#### Scenario: Language toggle updates carousel content
- **WHEN** a user switches the language toggle
- **THEN** item names, taglines, status badges, and button labels update to the new language

### Requirement: The landing page shall include responsive navigation with authentication gating

#### Scenario: Mobile bottom tab navigation
- **WHEN** the viewport width is at the mobile breakpoint (375px base)
- **THEN** a 5-tab bottom navigation bar is displayed with tabs: 首页/Home, 领养/Adopt, 发布/Share, 消息/Messages, 我的/My Space
- **AND** tab icons follow rounded line style

#### Scenario: Desktop top navigation
- **WHEN** the viewport width is at the desktop breakpoint (1024px+)
- **THEN** the tab navigation moves to a top bar in the header
- **AND** the bottom navigation bar is hidden

#### Scenario: Guest taps gated action
- **WHEN** an anonymous user (not logged in) taps the "发布/Share", "消息/Messages", or "我想领养/I Want to Adopt" action
- **THEN** a login modal, sheet, or routed auth entry appears with the message "领养宝贝需要先登录哦 / Please log in to adopt a treasure"
- **AND** the auth experience provides login and register options

#### Scenario: Logged-in user accesses all tabs
- **WHEN** a logged-in user navigates to any tab
- **THEN** the full tab content renders without authentication barriers

### Requirement: The landing page shall use mock data for all displayed items

#### Scenario: Mock item data loading
- **WHEN** the landing page and carousel render in a seeded or demo environment
- **THEN** items are sourced from a shared mock or seeded data layer of 20-30 pre-seeded items
- **AND** each mock item includes: photo URL, name (zh/EN), first-person story (zh/EN), owner note (zh/EN), category, condition, district, distance, timestamp, status, and view count
- **AND** the carousel selects the top 5 items by view count

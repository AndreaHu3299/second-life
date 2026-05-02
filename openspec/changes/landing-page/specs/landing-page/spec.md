## ADDED Requirements

### Requirement: The landing page shall be the default route of the application

#### Scenario: User visits the root URL
- **WHEN** a user navigates to the application root URL (`/`)
- **THEN** the landing page renders as the default view
- **AND** it displays the header with language toggle, navigation, and all landing page sections

### Requirement: The landing page shall display a hero section with tagline and call-to-action

#### Scenario: Hero section rendering
- **WHEN** the landing page renders
- **THEN** the hero section displays the Chinese tagline "每个宝贝，都值得第二次生命" by default
- **AND** a 2-3 line description in the active language
- **AND** a primary CTA button labeled "去领养 / Adopt"
- **AND** clicking the CTA navigates to the adopt/browse page

### Requirement: The landing page shall display an impact counter with animated counting

#### Scenario: Counter animation on load
- **WHEN** the landing page loads
- **AND** the impact counter section is visible
- **THEN** the counter animates from 0 to a target value
- **AND** the display reads "今天已有 X 个宝贝找到新家 / X treasures found homes today"
- **AND** the animation completes within 2 seconds

#### Scenario: Counter persistence across same-day visits
- **WHEN** a user revisits the landing page on the same calendar day
- **THEN** the counter displays the same value as the first visit that day
- **AND** the value is stored in localStorage keyed by date

#### Scenario: Counter generates new value on new day
- **WHEN** a user visits on a new calendar day
- **THEN** a new base value is generated (range: 30-80)
- **AND** the counter animates to this new value

### Requirement: The landing page shall display a carousel of most-viewed items

#### Scenario: Carousel rendering
- **WHEN** the landing page renders
- **THEN** a horizontal scrollable carousel shows the top 5 most-viewed mock items
- **AND** each carousel card displays: item photo, item name, distance badge, first-person tagline, and status badge
- **AND** tapping a card navigates to the item detail page

#### Scenario: First-person tagline visibility
- **WHEN** a carousel card renders
- **THEN** a short first-person quote from the item is visible on the card
- **AND** example: "Hi! I'm A-Nuan, I used to keep someone's desk warm at night..."

#### Scenario: Language toggle updates carousel content
- **WHEN** a user switches the language toggle
- **THEN** item names, taglines, status badges, and button labels update to the new language

### Requirement: The landing page shall display horizontally scrollable category pills

#### Scenario: Category pills rendering
- **WHEN** the landing page renders
- **THEN** category pills are displayed: 数码/Digital, 家居/Home, 书籍/Books, 服饰/Fashion, 玩具/Toys, 其他/Others
- **AND** they are horizontally scrollable if they overflow the viewport

#### Scenario: Category pill tap navigates to filtered browse
- **WHEN** a user taps a category pill
- **THEN** the user is navigated to the adopt/browse page with that category pre-selected as a filter

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
- **THEN** a login modal appears with the message "领养宝贝需要先登录哦 / Please log in to adopt a treasure"
- **AND** the modal provides login and register options

#### Scenario: Logged-in user accesses all tabs
- **WHEN** a logged-in user navigates to any tab
- **THEN** the full tab content renders without authentication barriers

### Requirement: The landing page shall apply the warm visual aesthetic from the ui-visual specification

#### Scenario: Landing page color palette
- **WHEN** the landing page renders
- **THEN** the color palette from ui-visual/spec.md is applied: terracotta primary, sage green secondary, gold accent, cream background, warm charcoal text

#### Scenario: Card hover interactions on carousel
- **WHEN** a user hovers over or presses a carousel item card
- **THEN** a smooth hover or press state transition occurs (elevation change, scale)

#### Scenario: Loading state for page sections
- **WHEN** any section of the landing page is loading content
- **THEN** a rotating sprout icon is displayed as the loading indicator

### Requirement: The landing page shall use mock data for all displayed items

#### Scenario: Mock item data loading
- **WHEN** the landing page and carousel render
- **THEN** items are sourced from a static mock data array of 20-30 pre-seeded items
- **AND** each mock item includes: photo URL, name (zh/EN), first-person story (zh/EN), owner note (zh/EN), category, condition, district, distance, timestamp, status, and view count
- **AND** the carousel selects the top 5 items by view count

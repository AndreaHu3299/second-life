# item-management Specification

## Requirement: The system shall allow authenticated users to post items for adoption

### Scenario: User posts an item through step-by-step flow
- **WHEN** a logged-in user navigates to the post/share tab
- **THEN** a multi-step form is presented: (1) photos, (2) basic info, (3) story, (4) meetup preference
- **AND** users can navigate between steps while preserving entered data

### Scenario: Step 1 — Photo upload
- **WHEN** a user is on the photo upload step
- **THEN** they can upload 3 to 6 photos
- **AND** photos can be reordered via drag-and-drop
- **AND** the first photo is designated as the cover photo

### Scenario: Step 2 — Basic info
- **WHEN** a user fills the basic info step
- **THEN** they provide: item name (the "baby name"), category, condition, 心意/token amount (not labeled as "price"), and region
- **AND** region is auto-filled from the user's profile if available

### Scenario: Step 3 — First-person story
- **WHEN** a user reaches the story step
- **THEN** they are prompted with "如果宝贝会说话，它会怎么介绍自己？ / If your treasure could speak, how would it introduce itself?"
- **AND** a hint/example is shown: "嗨，我是一只… 我的主人… 我想找一个…"
- **AND** they also provide "为什么送宝贝去找新家 / Why letting go" as a separate field

### Scenario: Step 4 — Meetup preference
- **WHEN** a user reaches the meetup preference step
- **THEN** they select meetup type: in-person, subway station, community gate, coffee shop
- **AND** they specify available times for meeting
- **AND** their exact address is never requested or stored

### Scenario: Item posted successfully
- **WHEN** a user completes all required steps and submits
- **THEN** the item appears in the adopt/browse feed
- **AND** the item appears under the user's "My Listings" with status 发布中/Active

## Requirement: The system shall display item detail pages with first-person voice

### Scenario: User views an item detail
- **WHEN** a user taps/clicks an item card
- **THEN** a detail page opens showing: full-width hero image, first-person item introduction, metadata (status, category, district, distance, relative timestamp, view count)

### Scenario: Owner's story display
- **WHEN** a user views an item detail
- **THEN** a quote-style card shows the owner's note about why they are letting the item go
- **AND** it is visually distinct from the item's own first-person narrative

### Scenario: Item history timeline
- **WHEN** an item has history data
- **THEN** a mini timeline displays key moments: purchase date → life events → seeking new home

### Scenario: Condition badge display
- **WHEN** an item detail is viewed
- **THEN** a condition badge is shown with one of three values: 如新/Like New, 轻微使用痕迹/Gentle Use, 岁月痕迹/Has Character

## Requirement: The system shall use mock data for browsing when real data is unavailable

### Scenario: Pre-populated item catalog
- **WHEN** the app loads for the first time with no user-generated data
- **THEN** 20 to 30 mock items are available across all categories
- **AND** each item has a name, first-person story, owner note, category, condition, district, distance, timestamp, and status
- **AND** items use varied statuses including waiting, adopted, and pending

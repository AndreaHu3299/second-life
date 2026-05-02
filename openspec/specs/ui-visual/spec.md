# ui-visual Specification

## Requirement: The system shall use a warm, soft visual aesthetic

### Scenario: Global design language
- **WHEN** any page or component is rendered
- **THEN** rounded corners are applied everywhere (cards, buttons, inputs)
- **AND** soft shadows are used without harsh edges
- **AND** generous whitespace separates all sections

### Scenario: Color palette
- **WHEN** the UI uses semantic colors
- **THEN** the following palette is applied:
  - Primary: terracotta/coral (#E8976B) — warmth
  - Secondary: sage green (#8FAE8B) — growth, new life
  - Accent: soft gold (#D4A574) — treasure
  - Background: warm cream (#FDF8F3)
  - Text: warm charcoal (#4A4040), never pure black
  - Success: muted teal
  - Warning: warm amber

### Scenario: Typography
- **WHEN** text is rendered
- **THEN** a rounded, friendly sans-serif is used for both Chinese and English
- **AND** font sizes are larger than default for readability
- **AND** warm letter-spacing is applied

### Scenario: Iconography
- **WHEN** icons are used
- **THEN** they follow a rounded line-style
- **AND** heart motifs are used tastefully (not overwhelming)
- **AND** sprout/seedling visual metaphors are present (loading icon, illustrations)

## Requirement: The system shall include micro-interactions

### Scenario: Heart save animation
- **WHEN** a user presses the save/favorite heart
- **THEN** a heart animation plays (fill, pulse, or sparkle)

### Scenario: Adoption completion celebration
- **WHEN** an item status changes to 已找到新家 / Found a New Home
- **THEN** a gentle bloom or sparkle animation plays

### Scenario: Loading states
- **WHEN** content is loading
- **THEN** a small rotating sprout icon is displayed as the loader

### Scenario: Card interactions
- **WHEN** a user hovers over or presses an item card
- **THEN** a smooth hover or press state transition occurs

## Requirement: The system shall be responsive with mobile-first design

### Scenario: Mobile viewport (375px)
- **WHEN** the app is viewed on a mobile device
- **THEN** bottom tab navigation is used
- **AND** item grid is single-column
- **AND** buttons are full-width

### Scenario: Tablet viewport (768px)
- **WHEN** the app is viewed on a tablet
- **THEN** item grid is 2-columns

### Scenario: Desktop viewport (1024px)
- **WHEN** the app is viewed on a desktop
- **THEN** item grid is 3-4 columns
- **AND** top navigation replaces bottom tabs
- **AND** the Adopt page uses sidebar filters

## Requirement: The system shall provide friendly empty and error states

### Scenario: Empty browse results
- **WHEN** filters produce no results
- **THEN** a warm illustration and encouraging text is displayed
- **AND** a CTA suggests broadening filters or becoming the first poster

### Scenario: Empty sections
- **WHEN** My Listings, Messages, or Wishlist are empty
- **THEN** each shows a unique warm illustration, encouraging text, and relevant CTA
- **AND** examples: "还没有消息，去领养一个宝贝吧 / No messages yet, go adopt a treasure"

### Scenario: Error states
- **WHEN** an error occurs (failed load, failed post)
- **THEN** the message is friendly, non-technical, and in the active language
- **AND** a retry option is provided

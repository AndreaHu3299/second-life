# anonymous-browsing Specification

## Requirement: The system shall allow users to browse items without authentication

### Scenario: Anonymous user views homepage
- **WHEN** a user visits the site without logging in
- **THEN** the homepage renders completely with hero section, impact counter, item carousel, and category pills
- **AND** no authentication gates or modals appear

### Scenario: Anonymous user views adopt/browse page
- **WHEN** an anonymous user navigates to the adopt/browse tab
- **AND** searches, filters, or scrolls through items
- **THEN** all items and filters are fully accessible
- **AND** no login prompt interrupts the browsing experience

## Requirement: The system shall provide search functionality for discovering items

### Scenario: User searches by keyword
- **WHEN** a user types in the search input
- **THEN** results filter in real-time or on submit by matching item names, first-person stories, and owner notes
- **AND** empty results show a friendly empty state

## Requirement: The system shall provide category filtering

### Scenario: User filters by category
- **WHEN** a user selects a category pill (数码/Digital, 家居/Home, 书籍/Books, 服饰/Fashion, 玩具/Toys, 其他/Others)
- **THEN** the item grid updates to show only items in that category
- **AND** multiple categories can be selected simultaneously if applicable

## Requirement: The system shall provide region-based filtering

### Scenario: User filters by city and district
- **WHEN** a user opens the region selector
- **THEN** a hierarchical city-to-district picker is shown
- **AND** selecting a region filters items to only those posted in the selected district

## Requirement: The system shall provide distance-based filtering with geolocation

### Scenario: User enables vicinity sorting
- **WHEN** a user activates the proximity/vicinity toggle
- **THEN** the browser requests geolocation permission
- **AND** if granted, items are sorted by distance from the user
- **AND** each item card shows a distance badge (e.g., "距你 1.2km / 1.2km away")

### Scenario: Geolocation permission denied
- **WHEN** a user activates vicinity toggle
- **AND** denies browser geolocation permission
- **THEN** the system falls back to manual district selection
- **AND** items cannot be sorted by distance

### Scenario: User filters by distance range
- **WHEN** a user selects a distance chip (1km, 5km, 10km, 同城/same city)
- **THEN** items outside the selected range are hidden
- **AND** the distance filter only activates when geolocation is available

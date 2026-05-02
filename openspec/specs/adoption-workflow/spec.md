# adoption-workflow Specification

## Requirement: The system shall use metaphorical status states instead of e-commerce terminology

### Scenario: Status machine for items
- **WHEN** an item exists in the system
- **THEN** its status uses adoption metaphors:
  - 等待领养 / Awaiting Adoption (available)
  - 领养确认中 / Finding the Right Home (adoption in progress)
  - 已找到新家 / Found a New Home (adopted/completed)
  - 被主人撤回 / Called Back (removed by owner)
  - 宝贝档案编辑中 / Profile Draft (unpublished)

### Scenario: Status transitions
- **WHEN** an item receives an adopt request and both parties chat
- **THEN** the status moves from 等待领养 to 领养确认中
- **AND** when the meetup completes successfully, status moves to 已找到新家
- **AND** if the owner removes the listing, status moves to 被主人撤回

## Requirement: The system shall allow users to save items to a wishlist

### Scenario: User saves an item
- **WHEN** a user presses the heart icon on an item card or detail page
- **THEN** the item is added to their wishlist
- **AND** a heart animation plays
- **AND** the icon toggles to "saved" state

### Scenario: User views wishlist
- **WHEN** a user navigates to their wishlist from My Space
- **THEN** a list of all saved items is shown
- **AND** they can remove items from the wishlist

## Requirement: The system shall display user-managed item listings

### Scenario: My listings view
- **WHEN** a user views their listings in My Space
- **THEN** a toggle allows filtering between: 发布中/Active, 已找到新家/Found Home, 待领走/Pending Pickup
- **AND** each listing shows its current status, views, and active adopt requests count

### Scenario: My adoption requests view
- **WHEN** a user views their adopted items in My Space
- **THEN** items they are adopting show the current meetup request status
- **AND** they can navigate to the associated chat

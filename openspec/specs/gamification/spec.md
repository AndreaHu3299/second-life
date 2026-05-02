# gamification Specification

## Requirement: The system shall display impact counters on the homepage

### Scenario: Impact counter rendering
- **WHEN** the homepage loads
- **THEN** an animated counter displays "今天已有 X 个宝贝找到新家 / X treasures found homes today"
- **AND** the counter animates from 0 to the final value on page load

### Scenario: Weekly/monthly milestone
- **WHEN** the homepage is visible
- **THEN** a secondary counter shows "本月共帮助 X 个宝贝回新家 / This month X treasures found homes"

## Requirement: The system shall award and display user badges

### Scenario: Badge assignment
- **WHEN** a user's activity crosses thresholds
- **THEN** badges are assigned:
  - 新邻居 / New Neighbor — immediately upon registration
  - 引路人 / Guide — successfully helped 5+ items find homes
  - 爱心大使 / Ambassador of Love — 10+ successful adoptions

### Scenario: Badge display
- **WHEN** a user views their profile
- **AND** they have earned badges
- **THEN** badges are displayed in a row with icon and label

## Requirement: The system shall show achievement toasts for first-time actions

### Scenario: First achievement
- **WHEN** a user performs a first-time action (first chat, first post, first adoption)
- **THEN** a toast notification appears with the achievement message
- **AND** example: "成就解锁：第一次打招呼！ / Achievement unlocked: First hello!"
- **AND** the toast auto-dismisses after a brief period

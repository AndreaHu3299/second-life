## MODIFIED Requirements

### Requirement: The system shall provide a chat interface between adopters and item owners

#### Scenario: Chat initiated after "I want to adopt"
- **WHEN** a logged-in user presses "我想领养 / I Want to Adopt" on an item
- **THEN** a chat interface or conversation route opens with the item owner
- **AND** the chat header displays the item thumbnail and owner nickname

#### Scenario: Sending text messages
- **WHEN** a user types a message and sends it
- **THEN** the message appears in the chat thread
- **AND** emoji support is available in the input

### Requirement: The system shall support meetup requests within chat

#### Scenario: User sends a meetup request
- **WHEN** either participant creates a meetup request in the chat
- **THEN** a special meetup request card is generated
- **AND** the card includes: date picker, time picker, and location input for a general place name (café, landmark, not address)

#### Scenario: Meetup request status flow
- **WHEN** a meetup request is sent
- **THEN** the request card shows status 待确认/Pending
- **AND** when the other party confirms, status changes to 已确认/Confirmed
- **AND** when the meetup completes, status changes to 已完成/Completed
- **AND** each status transition is visually distinct on the card

#### Scenario: System messages in chat
- **WHEN** events occur (request sent, confirmed, completed)
- **THEN** a system message appears in the chat thread with warm tone
- **AND** example: "领养请求已发送，等待对方回应 / Adoption request sent, waiting for response"

### Requirement: The system shall display a message inbox with conversation statuses

#### Scenario: Messages tab overview
- **WHEN** a user navigates to the Messages tab
- **AND** they have active conversations
- **THEN** each conversation shows: item thumbnail, last message preview, unread badge
- **AND** a conversation status badge is shown: 领养确认中/Adoption in progress, 约见面/Meetup scheduled, or 已完成/Complete

#### Scenario: Empty messages state
- **WHEN** a user has no conversations
- **THEN** a warm illustration and encouraging text is shown
- **AND** a CTA directs them to browse items

# authentication Specification

## Requirement: The system shall allow users to browse without authentication

### Scenario: Guest access to browse and search
- **WHEN** a user has not logged in
- **THEN** they can view the homepage, adopt/browse page, item details, and use all filters
- **AND** they cannot access the post, chat, or "I want to adopt" features

### Scenario: Guest attempts gated action
- **WHEN** a guest user presses "我想领养 / I Want to Adopt" or "发布 / Share a Baby" or the Messages tab
- **THEN** a login modal appears with the message "领养宝贝需要先登录哦 / Please log in to adopt a treasure"
- **AND** the user can proceed to login or register

## Requirement: The system shall support login via phone and email

### Scenario: Login with phone and verification code
- **WHEN** a user submits a phone number
- **THEN** a verification code input is shown (mock flow, no real SMS)
- **AND** submitting the code logs the user in

### Scenario: Login with email and password
- **WHEN** a user submits a valid email and password
- **THEN** the user is logged in
- **AND** the session persists in localStorage

### Scenario: Social login placeholders
- **WHEN** the login modal is displayed
- **THEN** visual placeholder buttons for WeChat and Google login are shown
- **AND** these are mocked for demonstration purposes

## Requirement: The system shall support user registration

### Scenario: User registers with nickname
- **WHEN** a user chooses to register
- **THEN** they provide: nickname (required, pseudonym only — no real names), phone or email, and password
- **AND** they can optionally provide: default city/district, and a short bio

### Scenario: Registration welcome
- **WHEN** a user completes registration
- **THEN** a brief welcome screen explains how the platform works
- **AND** the "新邻居 / New Neighbor" badge is assigned to their profile

## Requirement: The system shall manage user sessions

### Scenario: Session persistence
- **WHEN** a user logs in
- **THEN** their session is stored in localStorage
- **AND** they remain logged in across page refreshes

### Scenario: Logout
- **WHEN** a user selects logout from Settings
- **THEN** the session is cleared
- **AND** they return to the guest browsing state
- **AND** the "My Space" tab shows the login prompt

## Requirement: The system shall use nickname-based identities

### Scenario: Profile display
- **WHEN** any user profile or owner nickname is displayed
- **THEN** only the user's nickname is shown
- **AND** no real name, email, or phone number is visible to other users

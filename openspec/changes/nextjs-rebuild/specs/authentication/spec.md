## MODIFIED Requirements

### Requirement: The system shall allow users to browse without authentication

#### Scenario: Guest access to browse and search
- **WHEN** a user has not logged in
- **THEN** they can view the homepage, adopt/browse page, item details, and use all filters in the Next.js app
- **AND** they cannot access the post, chat, or "I want to adopt" features

#### Scenario: Guest attempts gated action
- **WHEN** a guest user presses "我想领养 / I Want to Adopt" or "发布 / Share a Baby" or the Messages tab
- **THEN** a login modal, auth sheet, or routed sign-in experience appears with the message "领养宝贝需要先登录哦 / Please log in to adopt a treasure"
- **AND** the user can proceed to login or register

### Requirement: The system shall support login via phone and email

#### Scenario: Login with phone and verification code
- **WHEN** a user submits a phone number
- **THEN** a verification code input or OTP step is shown in the Auth.js-oriented auth flow
- **AND** completing the mock or real verification step logs the user in

#### Scenario: Login with email and password
- **WHEN** a user submits a valid email and password or email-link-style equivalent
- **THEN** the user is logged in
- **AND** the session persists through the application session layer

#### Scenario: Social login placeholders
- **WHEN** the login experience is displayed before social providers are fully enabled
- **THEN** visual placeholder buttons for WeChat and Google login are shown
- **AND** these are mocked or disabled for demonstration purposes

### Requirement: The system shall support user registration

#### Scenario: User registers with nickname
- **WHEN** a user chooses to register
- **THEN** they provide: nickname (required, pseudonym only — no real names), phone or email, and password or equivalent verification step
- **AND** they can optionally provide: default city/district, and a short bio

#### Scenario: Registration welcome
- **WHEN** a user completes registration
- **THEN** a brief welcome screen, dialog, or redirect explains how the platform works
- **AND** the "新邻居 / New Neighbor" badge is assigned to their profile

### Requirement: The system shall manage user sessions

#### Scenario: Session persistence
- **WHEN** a user logs in
- **THEN** their session is stored through the application auth/session mechanism
- **AND** they remain logged in across page refreshes

#### Scenario: Logout
- **WHEN** a user selects logout from Settings
- **THEN** the session is cleared
- **AND** they return to the guest browsing state
- **AND** the "My Space" tab shows the login prompt

## ADDED Requirements

### Requirement: The application shall expose internal APIs through Next.js Route Handlers
The system SHALL use Route Handlers for internal API endpoints that support interactive features.

#### Scenario: Interactive feature endpoint
- **WHEN** a client-side feature requires asynchronous data mutation or retrieval
- **THEN** the request is handled by a Next.js Route Handler
- **AND** the endpoint lives within the application codebase

### Requirement: The application shall provide mock-first API behavior that can evolve to real persistence
The system SHALL allow Route Handlers to serve seeded or repository-backed data during early implementation.

#### Scenario: Mock-backed route response
- **WHEN** a route handler is called before full backend integration is complete
- **THEN** it can return typed mock or seeded data matching the production response shape
- **AND** client features behave consistently across mocked and real implementations

### Requirement: The application shall enforce authentication-aware API boundaries
The system SHALL distinguish between public read endpoints and authenticated mutation endpoints.

#### Scenario: Guest calls protected endpoint
- **WHEN** an unauthenticated user invokes a protected post, adopt, wishlist, or messaging mutation endpoint
- **THEN** the request is rejected as unauthorized
- **AND** the client can redirect the user into the login flow

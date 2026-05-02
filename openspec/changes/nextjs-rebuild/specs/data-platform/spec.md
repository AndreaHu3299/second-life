## ADDED Requirements

### Requirement: The system shall define typed relational models for core product entities
The system SHALL define typed data models for users, items, item stories, adoption requests, chat threads, messages, meetup requests, wishlists, and badges.

#### Scenario: Schema definition exists
- **WHEN** developers inspect the persistence layer
- **THEN** a typed schema defines the core entities and their relationships
- **AND** the schema is suitable for PostgreSQL-backed persistence

### Requirement: The system shall support seeded product data for development
The system SHALL provide seedable bilingual sample data for local development and demo flows.

#### Scenario: Seeded data available
- **WHEN** the app is run in a development or demo environment
- **THEN** representative items, users, conversations, and wishlist data can be loaded without manual entry
- **AND** seeded content reflects the warm product voice in both zh-CN and en

### Requirement: The system shall isolate data access behind repository-style interfaces
The system SHALL access persistent and mock-backed records through shared server-side data functions.

#### Scenario: Data source substitution
- **WHEN** the application reads browse items, item detail, profile data, or conversations
- **THEN** feature code depends on shared data access functions rather than inline storage logic
- **AND** implementations can switch between seeded mock data and database-backed data without changing page behavior

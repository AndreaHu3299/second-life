# localization Specification

## Requirement: The system shall support Chinese (zh-CN) and English (en) languages

### Scenario: Default language is Chinese
- **WHEN** the app loads for the first time
- **AND** no language preference is stored
- **THEN** the interface displays in Chinese (zh-CN)

### Scenario: User switches language
- **WHEN** a user toggles the language switch in the header
- **THEN** all UI text, navigation labels, placeholders, error messages, and copy switch to the selected language
- **AND** the preference is persisted

## Requirement: All user-facing text shall be bilingual

### Scenario: Navigation labels
- **WHEN** the navigation is rendered
- **THEN** all tab labels, button text, and link text are translated to the active language
- **AND** examples: 首页/Home, 领养/Adopt, 发布/Share, 消息/Messages, 我的/My Space

### Scenario: Item content
- **WHEN** item first-person stories, owner notes, condition labels, and status badges are displayed
- **THEN** they are stored and rendered in both Chinese and English
- **AND** mock data includes both language versions

### Scenario: System messages and toasts
- **WHEN** achievement toasts, empty states, error messages, and system messages appear
- **THEN** all text is in the active language

## Requirement: The language toggle shall be always accessible

### Scenario: Toggle visibility
- **WHEN** the app is on any page
- **THEN** the language toggle is visible in the header
- **AND** it is clearly labeled with the current language and target language

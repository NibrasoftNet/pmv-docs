# List Suppliers

## ADDED Requirements

### Requirement: View Supplier List

The system MUST allow users to view a list of suppliers.

#### Scenario: User views supplier list

- Given the user is on the suppliers page
- When the page loads
- Then a list of suppliers should be displayed
- And the list should be paginated
- And each supplier should show name, match code, and image (if available)

### Requirement: Pagination Navigation

The system MUST allow users to navigate through pages of suppliers.

#### Scenario: User navigates pagination

- Given the user is on the suppliers page
- When the user clicks "Next"
- Then the next page of suppliers should be loaded

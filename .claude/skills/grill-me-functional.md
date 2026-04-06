# Grill-Me: Functional Requirements

## When to Invoke

Always — every feature has functional requirements to nail down.

## Questions to Resolve

### Data Model
- What new entities/tables are needed?
- What fields does each entity have? Types, constraints, defaults?
- What relationships exist? (one-to-many, many-to-many, self-referential)
- Are there soft deletes? Timestamps (createdAt, updatedAt)?
- What indexes are needed for query performance?

### API Design
- What new GraphQL queries are needed? What arguments do they take?
- What new mutations are needed? What input types?
- What does each resolver return? Full object? Subset? Paginated list?
- Are there subscriptions needed for real-time updates?

### Business Logic
- What validation rules apply? (field-level, cross-field, business rules)
- What happens on create? On update? On delete?
- Are there computed fields or derived values?
- What's the authorization model? Who can do what?
- Are there workflows or state machines? (e.g., draft → published → archived)

### Edge Cases
- What happens with invalid input? (empty strings, negative numbers, too-long text)
- What happens on duplicate data? (unique constraints, conflict resolution)
- What happens when referenced entities are deleted? (cascade, restrict, nullify)
- What if the user is not authenticated? Not authorized?
- What if the backend is unreachable? (timeout, network error)

### Integration Contracts
- Does this feature depend on data from another feature?
- Does it modify shared tables or APIs that other features use?
- Are there database migrations that need to be ordered relative to other tickets?

## Output

Summarize all functional decisions. These become the core acceptance criteria and drive the implementation order (migration → backend → frontend).

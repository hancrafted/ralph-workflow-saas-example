# Grill-Me: Non-Functional Requirements

## When to Invoke

Always — every feature has non-functional concerns to address.

## Questions to Resolve

### Security
- Is authentication required for this feature?
- What authorization rules apply? (role-based, ownership-based, admin-only)
- Is there user input that needs sanitization? (XSS, SQL injection vectors)
- Are there sensitive fields that should not be exposed in the API? (passwords, tokens)
- Are there rate-limiting concerns?

### Performance
- How much data could this query return? Is pagination needed?
- Are there expensive computations that need caching?
- Are there N+1 query risks in the resolver? (use DataLoader?)
- Should results be cached client-side? Server-side?
- Are there bulk operations that need batching?

### Error Handling
- What errors can the backend throw? Map each to a user-facing message.
- Are there retryable errors? (network timeout → retry, auth expired → re-login)
- What's the error boundary strategy? (component-level, page-level, global)
- Should errors be logged/tracked? (error monitoring, analytics)

### Observability
- What actions should be logged? (audit trail, debugging)
- Are there metrics to track? (feature usage, error rates)
- What information helps debug issues in production?

### Auth Patterns
- Does this feature need auth guards on routes (frontend)?
- Does this feature need auth guards on resolvers (backend)?
- Are there different permission levels? (viewer, editor, admin)
- Is there multi-tenancy scoping? (users see only their own data)

## Output

Summarize all non-functional decisions. These inform security setup, error handling patterns, and performance considerations in the acceptance criteria.

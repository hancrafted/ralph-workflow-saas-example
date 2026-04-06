# E2E-First Testing Strategy

## Core Principle

**Write Playwright E2E tests BEFORE implementation code.** Tests define "done" — they are derived directly from the spec's acceptance criteria.

## Workflow

1. Read the spec's acceptance criteria
2. Write Playwright E2E test cases that capture each criterion as a user-observable behavior
3. Tests will initially fail — this is expected and correct
4. Implement the feature (migration → backend → frontend)
5. Run E2E tests to verify the feature works end-to-end
6. Add Vitest unit tests for edge cases and complex logic

## Mapping Acceptance Criteria to Tests

Each acceptance criterion becomes one or more E2E test cases:

```
Acceptance Criterion: "User can create a new project with a name"
  → test: "should allow creating a project with a valid name"
  → test: "should show validation error for empty project name"

Acceptance Criterion: "Project list shows all user's projects"
  → test: "should display all projects on the list page"
  → test: "should show empty state when no projects exist"
```

## Test Structure

- E2E tests live in the `e2e/` directory
- File naming: `*.e2e-spec.ts`
- Group tests by feature/page
- Each test should be independent — no shared state between tests

## When to Skip

- **Bootstrap phase only:** E2E-first may be skipped when there's no test runner yet (e.g., initializing the project)
- **Standard phase:** Never skip. E2E tests are always written first.

## Running

```bash
pnpm run test:e2e
```

Requires dev servers (backend + frontend) to be running.

## What E2E Tests Cover

- User-visible behavior and flows
- Form submission and validation
- Navigation and routing
- Data display after CRUD operations
- Error states (network errors, validation errors)

## What E2E Tests Do NOT Cover

- Internal implementation details
- Unit-level edge cases (use Vitest for those)
- Performance benchmarks

# Playwright E2E Conventions

## File Structure

- All E2E tests live in the `e2e/` directory at the repo root
- File naming: `*.e2e-spec.ts`
- Group by feature or page (e.g., `projects.e2e-spec.ts`, `auth.e2e-spec.ts`)

## Running Tests

```bash
pnpm run test:e2e
```

**Prerequisites:** Dev servers must be running (backend + frontend) before running E2E tests. These are run separately from the unit test suite.

## Validation Pipeline

E2E tests are NOT part of `pnpm run validate` (which runs lint + format:check + unit tests only). E2E tests are run separately because they require live servers.

## Test Writing

```typescript
import { test, expect } from '@playwright/test';

test.describe('Project Management', () => {
  test('should create a new project', async ({ page }) => {
    await page.goto('/projects');
    await page.click('button:has-text("New Project")');
    await page.fill('input[name="name"]', 'My Project');
    await page.click('button:has-text("Create")');
    await expect(page.locator('text=My Project')).toBeVisible();
  });
});
```

## Best Practices

- Each test should be independent — no shared state between tests
- Use meaningful selectors (data-testid, accessible roles, text content)
- Wait for elements explicitly rather than using arbitrary timeouts
- Test user-visible behavior, not implementation details
- Handle loading states — wait for spinners to disappear before asserting

## Deriving Tests from Acceptance Criteria

Every acceptance criterion in a ticket maps to one or more E2E tests:
- Positive path (happy flow)
- Negative path (validation errors, unauthorized access)
- Edge cases (empty states, boundary values)

## Configuration

- Playwright config lives at the repo root
- Tests run against `localhost` dev servers
- Screenshots and traces captured on failure for debugging

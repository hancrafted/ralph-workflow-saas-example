# Vitest Unit Test Patterns

## Role

Unit tests supplement E2E tests. They cover:
- Edge cases and boundary conditions
- Error handling paths
- Complex business logic
- Utility functions
- Service methods in isolation

## File Naming & Location

- Unit tests: `*.spec.ts`
- **Co-located with source** — test file sits next to the file it tests:
  ```
  src/
    users/
      users.service.ts
      users.service.spec.ts
      users.resolver.ts
      users.resolver.spec.ts
  ```

## Running

```bash
pnpm run test          # runs all Vitest unit tests across workspaces
pnpm run validate      # runs lint + format:check + test in sequence
```

## Test Structure

```typescript
import { describe, it, expect, vi } from 'vitest';

describe('UsersService', () => {
  it('should throw when user not found', async () => {
    // Arrange
    const service = new UsersService(mockRepo);
    
    // Act & Assert
    await expect(service.findOne('nonexistent'))
      .rejects.toThrow(NotFoundException);
  });
});
```

## Conventions

- Use `describe` / `it` blocks with clear, behavior-focused names
- Follow Arrange-Act-Assert pattern
- Mock external dependencies (database, HTTP, etc.)
- Use `vi.fn()` and `vi.spyOn()` for mocking
- Test one behavior per `it` block
- Do not test implementation details — test inputs and outputs

## When to Write Unit Tests

- After E2E tests and implementation are complete
- For complex business logic that E2E tests exercise but don't isolate
- For error handling paths that are hard to trigger via E2E
- For utility functions and pure transformations

## What NOT to Unit Test

- Simple CRUD operations already covered by E2E
- Framework boilerplate (module imports, decorator presence)
- Generated code (codegen output)

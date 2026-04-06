# Angular Quality Standards

## Component Architecture

- **Standalone components only** — no NgModules for components
- Every component must use `standalone: true` in the `@Component` decorator
- Import dependencies directly in the component's `imports` array

## Change Detection

- **OnPush change detection** on every component:
  ```typescript
  @Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    // ...
  })
  ```

## Signals over Observables

- Prefer Angular signals (`signal()`, `computed()`, `effect()`) over RxJS observables where practical
- Use signals for component state, computed values, and template bindings
- Reserve observables for complex async streams (e.g., WebSocket, debounced search)

## GraphQL Queries & Mutations

- **Co-locate** queries/mutations with the component that uses them
- Place the GraphQL document in the same file or a sibling `.graphql` file
- **Never hand-write GraphQL types** — always use codegen output
- Import generated types from the codegen output directory

## Apollo Client

- Use Apollo Client for all GraphQL operations
- Use generated typed document nodes for type safety
- Handle loading, error, and empty states in every query component

## File Organization

- Components, services, and related files co-located by feature
- Feature modules organized under `apps/frontend/src/app/`
- Shared utilities in a shared directory

## UI Libraries

- **PrimeNG** for UI components (buttons, tables, dialogs, forms)
- **Tailwind CSS v4** for utility styling and layout
- Do not mix PrimeNG and custom implementations for the same widget

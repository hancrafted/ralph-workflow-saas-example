# Agent Orchestration — SaaS Project

## Project Overview

This is a SaaS application built entirely via agent orchestration (Ralph loop pattern). The repo contains both the orchestration infrastructure and the application code.

**Orchestration commands:**
- `/ralph [#issue] [--auto-merge] [--auto]` — Execute one ticket (AI picks if no issue specified)
- `/new-ticket` — Requirements engineering (grill-me interview → structured GitHub Issue)
- `/verify` — Standalone pre-merge verification

**`/ralph` flags:**
- `--auto-merge` — Auto-merge the PR after creation (spec approval still required)
- `--auto` — Fully autonomous: skip spec approval + auto-create PR + auto-merge

---

## Phase Detection

This project uses a two-phase system. **Auto-detect the current phase before starting work:**

### Bootstrap Phase — ✅ COMPLETE (2026-03-27)

All 8 foundation tickets (#1–#8) are merged. The stack is fully initialized.
Bootstrap phase rules no longer apply — all new tickets follow Standard Phase.

### Standard Phase (ACTIVE)

The stack is live. All tickets follow the full workflow.

**Tech Stack:**
- Frontend: Angular 21, PrimeNG 21, Tailwind CSS v4, Apollo Client (GraphQL), Luxon (dates), lodash-es
- Backend: NestJS 11, Apollo Server 5 (code-first), PostGraphile 5 (library mode, auto-generated CRUD)
- Database: PostgreSQL 16 (Docker Compose), TypeORM 0.3 (migrations only, `synchronize: false`)
- Testing: Vitest (unit), Playwright (E2E)
- Tooling: ESLint 9 (flat config), Prettier 3, GraphQL Codegen

**GraphQL Architecture:**
- `/graphql` — NestJS Apollo code-first resolvers (custom business logic) ← **frontend targets this**
- `/postgraphile` — PostGraphile auto-generated CRUD (allProjects, createProject, etc.)
- Schema stitching was deferred — Grafast executor is incompatible with `@graphql-tools/stitch`

**Schema-First Development Flow:**
1. Write a PostgreSQL migration (TypeORM migration or raw SQL)
2. Run migration against local DB
3. PostGraphile auto-detects new tables/columns → exposes GraphQL
4. Run `graphql-codegen` to generate TypeScript types from the combined schema
5. Use generated types in Angular (Apollo) and NestJS (resolvers)
6. **Never hand-write GraphQL types** — always generate from schema

---

## Testing Conventions

**E2E first, unit tests after:**
1. When implementing a feature, write Playwright E2E test cases derived from the spec's acceptance criteria BEFORE implementation code. These tests define "done" and will initially fail.
2. Implement the feature (migration → backend → frontend).
3. Run E2E tests to verify the feature works end-to-end.
4. Add Vitest unit tests for edge cases, error handling, and complex business logic.

**File naming:**
- Unit tests: `*.spec.ts` (co-located with source)
- E2E tests: `*.e2e-spec.ts` (in `e2e/` directory)

**Validation pipeline (run in order):**
1. `pnpm run lint` (ESLint)
2. `pnpm run format:check` (Prettier)
3. `pnpm run test` (Vitest)
4. `pnpm run test:e2e` (Playwright)

---

## Monorepo Structure (pnpm Workspaces)

**Layout:**
```
/                        ← repo root (@hc/root)
  apps/
    backend/             ← NestJS 11 app (@hc/backend)
    frontend/            ← Angular 21 app (@hc/frontend)
    infra/               ← Docker Compose + PostgreSQL (@hc/infra)
  pnpm-workspace.yaml
  package.json
  tsconfig.base.json
```

**Package manager:** pnpm (>=9). Always use `pnpm` — never `npm` or `yarn`.

**Common commands:**
- `pnpm install` — install all workspace dependencies
- `pnpm --filter @hc/backend <cmd>` — run a command in the backend package
- `pnpm --filter @hc/frontend <cmd>` — run a command in the frontend package
- `pnpm -r <cmd>` — run a command recursively across all workspace packages

**Adding dependencies:**
- Root dev tooling: `pnpm add -D <pkg> -w` (workspace root flag)
- Per-app: `pnpm --filter @hc/backend add <pkg>`

---

## Git Workflow

- **Always work in a git worktree** (one per ticket)
- **Branch naming:** `feat/<issue-number>-<short-description>`, `fix/<issue-number>-<short-description>`, `refactor/<issue-number>-<short-description>`
- **Commit messages:** Conventional commits (`feat:`, `fix:`, `refactor:`, `test:`, `docs:`, `chore:`)
- **PRs:** Squash merge to main. PR description is the knowledge artifact (use the PR template).
- **Never commit directly to main**

---

## Cross-Session Memory

- `progress.txt` in repo root tracks session state
- **At session start:** Always read `progress.txt` and recent `git log`
- **At session end:** Always update `progress.txt` with what was done, what's in progress, decisions made
- Specs extracted from issues live in `specs/<issue-number>.md` (gitignored, local working files)

---

## Agent Workflow Rules

- The user manually invokes orchestration commands — never auto-loop
- **Default behavior:** Spec approval requires user confirmation. PR is auto-created after verification passes. Merge is manual.
- **`--auto-merge`:** Same as default + auto-merge after PR creation.
- **`--auto`:** Skip spec approval (spec still saved) + auto-PR + auto-merge. Only stops on failure.
- **All modes:** When stuck after 3 attempts or verification fails — **stop**, post a diagnostic comment on the GitHub Issue, present recovery options to the user. No PR or merge on failure.
- **PR body must always contain `Closes #N`** to auto-close the issue on merge. After API merge, fallback-close the issue if still open.
- Use subagents for read-only exploration (codebase search, file reading). Implementation is single-threaded.
- Issue dependencies use GitHub task list relations (`- [ ] #N`) — check these before starting a ticket

---

## Code Quality (Standard Phase)

**Angular:**
- Standalone components (no NgModules for components)
- Signals preferred over observables where practical
- OnPush change detection
- PrimeNG for UI components, Tailwind for utility styling

**NestJS:**
- Decorators for dependency injection
- Modules for feature boundaries
- DTOs validated with class-validator
- GraphQL resolvers co-located with their module

**General:**
- No hand-written GraphQL types — use codegen output
- Queries/mutations co-located with the component or resolver that uses them
- Strict TypeScript (`strict: true`)

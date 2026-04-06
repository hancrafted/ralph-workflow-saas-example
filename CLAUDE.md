# Agent Orchestration — SaaS Project

## Phase Detection

Bootstrap phase is **COMPLETE** (2026-03-27). All tickets follow Standard Phase.

---

## Monorepo Structure (pnpm Workspaces)

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
- `pnpm --filter @hc/backend <cmd>` — run in backend
- `pnpm --filter @hc/frontend <cmd>` — run in frontend
- `pnpm add -D <pkg> -w` — add root dev tooling
- `pnpm --filter @hc/backend add <pkg>` — add per-app dependency

---

## Git Workflow

- **Branch naming:** `feat/<issue>-<desc>`, `fix/<issue>-<desc>`, `refactor/<issue>-<desc>`
- **Commit messages:** Conventional commits (`feat:`, `fix:`, `refactor:`, `test:`, `docs:`, `chore:`)
- **PRs:** Squash merge to main. PR body must contain `Closes #N`. Delete branch after merge.
- **Never commit directly to main**

---

## Cross-Session Memory

- `progress.txt` tracks session state and architecture (read at start, update at end)
- GitHub issue body = spec. PR body = implementation record. No separate spec files.

---

## Safety Net

If you encounter unfamiliar conventions (testing, code quality, schema workflow, framework patterns),
consult the relevant gateway agent or skill — domain knowledge lives there, not here.

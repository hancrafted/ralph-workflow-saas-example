# agent-orchistration-setup

A SaaS application built entirely through AI agent orchestration. No application code is written manually — all development is driven by the Ralph loop pattern using Claude Code.

## Quick Start

```bash
# One-command setup (requires Docker running)
make start

# Or step by step:
make init    # install deps, start DB, run migrations
make seed    # insert sample data
make dev     # start backend + frontend
```

Then create your first ticket and run the loop:

```
/new-ticket   # interview-driven ticket creation
/ralph        # implement the next ticket
```

## Commands

| Command | Description |
|---------|-------------|
| `/new-ticket` | Turn a rough idea into a structured GitHub Issue (grill-me interview) |
| `/ralph` | Implement the highest-priority unblocked ticket |
| `/ralph #42` | Implement a specific ticket |
| `/ralph --auto-merge` | Implement and auto-merge the PR |
| `/ralph --auto` | Fully autonomous: skip spec approval, auto-PR, auto-merge |
| `/verify` | Run pre-merge verification on the current branch |

## How It Works

1. **Write tickets** with `/new-ticket` — the AI interviews you relentlessly to produce clear acceptance criteria, identifies dependencies against open issues, and creates a structured GitHub Issue.

2. **Implement tickets** with `/ralph` — the coordinator picks the next ticket, extracts a spec you approve, creates a git worktree, implements the feature (E2E tests first, then code), runs the full validation pipeline, and creates a PR.

3. **Review and merge** — the verifier checks every acceptance criterion before a PR is created. You squash merge to main. The PR description is your permanent knowledge base.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Angular 21, PrimeNG, Tailwind CSS, Apollo Client |
| Backend | NestJS, GraphQL (code-first), TypeORM |
| Database | PostgreSQL, TypeORM |
| Testing | Vitest (unit), Playwright (E2E) |
| Tooling | ESLint, Prettier |

## Project Phase

✅ **Bootstrap complete** (as of 2026-03-27). All 8 foundation tickets merged.

The project is now in **Standard Phase** — all new tickets follow the full Ralph workflow with E2E-first testing, schema-first development, and complete validation pipeline (lint → format → unit tests → E2E tests).

### Architecture Notes

- NestJS code-first resolvers serve the GraphQL API at `/graphql`
- TypeORM handles database access and migrations

## Documentation

- [Workflow Guide](docs/workflow.md) — full workflow documentation with Mermaid diagrams
- [CLAUDE.md](CLAUDE.md) — agent conventions and project rules

## Repository Structure

```
apps/
  backend/        # NestJS 11 + TypeORM + Apollo Server (GraphQL code-first) (@hc/backend)
  frontend/       # Angular 21 + PrimeNG + Tailwind + Apollo Client (@hc/frontend)
  infra/          # Docker Compose (PostgreSQL 16) (@hc/infra)
.claude/
  agents/         # coordinator, implementer, verifier, requirements-engineer
  commands/       # /ralph, /new-ticket, /verify
  settings.json   # pre-approved agent permissions
.github/
  ISSUE_TEMPLATE/ # structured YAML forms: feature, bug, tech-debt
  PULL_REQUEST_TEMPLATE.md
docs/
  workflow.md     # detailed workflow documentation with diagrams
specs/            # agent-extracted ticket specs (gitignored, local only)
CLAUDE.md         # agent instructions and project conventions
progress.txt      # cross-session agent memory (gitignored)
```

## Development

```bash
# Start everything (DB + backend + frontend)
make dev

# Or use pnpm directly
pnpm dev          # runs backend and frontend concurrently
```

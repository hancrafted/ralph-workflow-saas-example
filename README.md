# agent-orchistration-setup

A SaaS application built entirely through AI agent orchestration. No application code is written manually — all development is driven by the Ralph loop pattern using Claude Code.

## Quick Start

```bash
# Check prerequisites (Node 20+, gh CLI, psql)
bash init.sh
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
| `/verify` | Run pre-merge verification on the current branch |

## How It Works

1. **Write tickets** with `/new-ticket` — the AI interviews you relentlessly to produce clear acceptance criteria, identifies dependencies against open issues, and creates a structured GitHub Issue.

2. **Implement tickets** with `/ralph` — the coordinator picks the next ticket, extracts a spec you approve, creates a git worktree, implements the feature (E2E tests first, then code), runs the full validation pipeline, and creates a PR.

3. **Review and merge** — the verifier checks every acceptance criterion before a PR is created. You squash merge to main. The PR description is your permanent knowledge base.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Angular 21, PrimeNG, Tailwind CSS, Apollo Client |
| Backend | NestJS, GraphQL, PostGraphile (schema stitching) |
| Database | PostgreSQL, TypeORM |
| Testing | Vitest (unit), Playwright (E2E) |
| Tooling | ESLint, Prettier |

## Project Phase

This project uses a **two-phase** system detected automatically by the agents:

- **Bootstrap phase** (no `package.json` yet): First tickets initialise Angular 21, NestJS, and tooling — without test/lint backpressure since there is nothing to run yet.
- **Standard phase** (stack exists): Full workflow — E2E tests first, schema-first development, complete validation pipeline.

## Documentation

- [Workflow Guide](docs/workflow.md) — full workflow documentation with Mermaid diagrams
- [CLAUDE.md](CLAUDE.md) — agent conventions and project rules

## Repository Structure

```
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

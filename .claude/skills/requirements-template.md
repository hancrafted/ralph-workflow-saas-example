# Requirements Template

## Purpose

Produce a structured GitHub Issue from the completed grill-me interview. This template defines the exact format for all feature tickets.

## Issue Structure

```markdown
### User Story
As a [role], I want [goal], so that [benefit].

### Description
<Detailed description of the feature. Context, motivation, and any relevant background.>

### Acceptance Criteria
- [ ] Criterion 1 — specific, testable, maps to an E2E test case
- [ ] Criterion 2 — describes user-observable behavior
- [ ] Criterion 3 — includes edge cases and error states

### Affected Layers
- [ ] Database (migration needed)
- [ ] Backend (NestJS resolver/service/DTOs)
- [ ] Frontend (Angular component/service/template)

### Dependencies
- [ ] #<issue-number> — <why this must be done first>

### Priority
<Critical | High | Medium | Low>

### Mockup / Design Notes
<PrimeNG component choices, layout description, responsive behavior, empty/error/loading states>

### Out of Scope
<What is explicitly NOT part of this ticket>
```

## Acceptance Criteria Rules

- Every criterion must be **specific and testable** — reject vague criteria
- Each criterion maps directly to one or more Playwright E2E test cases
- Include both happy path and error/edge case criteria
- Use `- [ ]` checkbox syntax so they can be tracked

## Dependency Syntax

Use GitHub task list relations for dependencies:
```markdown
- [ ] #3 — requires auth service to be complete
- [ ] #7 — needs user table migration
```

GitHub renders these as tracked relationships. Agents check them programmatically — a ticket with unresolved dependencies won't be auto-selected for implementation.

## Creating the Issue

```bash
gh issue create --title "<title>" --body "<body>" --label "<priority>,<type>"
```

Labels: `feature`, `bug`, `tech-debt` for type; `critical`, `high`, `medium`, `low` for priority.

## Rules

- Never create an issue without explicit user approval of the draft
- Always include all sections, even if some are "N/A"
- Dependencies must use task list syntax, not plain text references
- Acceptance criteria must be testable — "it should work well" is not acceptable

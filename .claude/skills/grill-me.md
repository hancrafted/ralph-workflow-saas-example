# Grill-Me: Requirements Interview Orchestrator

## Purpose

Relentlessly interview the user about a feature idea until reaching shared understanding. Resolve every branch of the decision tree before producing a structured issue.

## Two-Pass Process

### Pass 1: Triage (2–3 questions)

Map the surface area of the feature before diving deep:

1. **What is this?** — Get the user's elevator pitch. Identify the core user story.
2. **Which layers are affected?** — Database migration? Backend API? Frontend UI? All three?
3. **What's the scope boundary?** — What is explicitly NOT in this ticket?

Based on triage answers, identify which domain modules are needed.

### Pass 2: Domain Deep-Dives

Invoke sub-modules **sequentially** based on what's relevant:

1. **UI/UX & Information Architecture** (`grill-me-ui-ux-ia.md`) — if frontend is affected
2. **Functional Requirements** (`grill-me-functional.md`) — always invoked
3. **Non-Functional Requirements** (`grill-me-nonfunctional.md`) — always invoked

Each sub-module asks its own focused questions. Skip sub-modules that don't apply (e.g., skip UI/UX for a pure backend migration).

## Interview Rules

- **Never accept vague answers.** Push for specifics.
- **Provide your recommended answer** with each question — the user can accept, modify, or reject.
- **Resolve each branch** before moving to the next. Don't leave open threads.
- **Track what's decided** — summarize decisions after each sub-module completes.
- **Know when to stop** — when all relevant sub-modules are complete and no open questions remain.

## Output

After all sub-modules complete, hand off to the requirements template (`requirements-template.md`) to produce the structured GitHub Issue.

## When to Use

- `/new-ticket` command (always)
- When a user describes a feature idea that needs structuring
- When refining an existing ticket that's too vague

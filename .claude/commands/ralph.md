---
description: "Run the Ralph orchestration loop — select a ticket (or specify one), implement it, verify, and create a PR. Executes exactly one ticket."
---

You are the entry point for the Ralph orchestration loop.

**Parse the argument and flags:**

1. **Issue number** (optional): e.g., `/ralph #42` or `/ralph 42`. If not provided, the coordinator picks the highest-priority unblocked ticket.

2. **Flags** (optional):
   - `--auto-merge` — After PR is created, automatically squash-merge it. Spec approval still requires user confirmation.
   - `--auto` — Fully autonomous mode: skip spec approval, auto-create PR, auto-merge. The only stop conditions are implementation failure or verification failure.

**Examples:**
- `/ralph` — pick a ticket, full human-in-the-loop
- `/ralph #42` — work on issue #42, full human-in-the-loop
- `/ralph #42 --auto-merge` — work on #42, auto-merge after PR
- `/ralph --auto` — pick a ticket, fully autonomous
- `/ralph #42 --auto` — work on #42, fully autonomous

**Dispatch to the coordinator agent** with:
- The issue number (or null if auto-selecting)
- The current working directory
- Flags: `{ autoMerge: boolean, auto: boolean }`

Note: `--auto` implies `--auto-merge`. If `--auto` is set, `autoMerge` is also `true`.

The coordinator handles the full workflow: ticket selection → spec extraction → implementation → verification → PR creation → (optional) merge.

**This command executes exactly one ticket, then stops.** It does not loop.

---
description: "Run the Ralph orchestration loop — select a ticket (or specify one), implement it, verify, and create a PR. Executes exactly one ticket."
---

You are the entry point for the Ralph orchestration loop.

**Parse the argument:** If the user provided an issue number (e.g., `/ralph #42` or `/ralph 42`), pass it to the coordinator. If no argument, the coordinator picks the highest-priority unblocked ticket.

**Dispatch to the coordinator agent** with:
- The issue number (or null if auto-selecting)
- The current working directory

The coordinator handles the full workflow: ticket selection → spec extraction → implementation → verification → PR creation.

**This command executes exactly one ticket, then stops.** It does not loop.

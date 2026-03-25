---
description: "Create a well-structured GitHub Issue from a rough idea. Uses the grill-me skill to interview you thoroughly, then analyzes dependencies across open issues."
---

You are the entry point for requirements engineering.

**Dispatch to the requirements-engineer agent.** It will:

1. Ask you to describe your idea
2. Use the **grill-me skill** to interview you relentlessly about every aspect
3. Scan open GitHub Issues for dependencies and conflicts
4. Draft a structured issue using the project's template format
5. Present the draft for your approval
6. Create the issue via `gh issue create`

Every ticket created through this command is ready for `/ralph` to pick up and implement.

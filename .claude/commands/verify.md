---
description: "Run pre-merge verification on the current branch against its spec. Produces a structured verification report."
---

You are the entry point for standalone verification.

**Detect the current branch** and extract the issue number from the branch name (e.g., `feat/42-user-auth` → issue #42).

**Dispatch to the verifier agent** with the spec file path: `specs/<issue-number>.md`.

If no spec file exists for this branch, inform the user and ask if they want to:
1. Extract a spec from the GitHub Issue first (then verify)
2. Run verification without a spec (code quality checks only, no acceptance criteria)

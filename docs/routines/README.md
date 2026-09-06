# Scheduled routines

One file per routine. **The file is the routine.** The prompt at
https://claude.ai/code/routines is a short pointer:

```
You are the <name> routine for ademcwealth/furniturepos-marketing. The repo is checked out.
Read AGENTS.md, then docs/routines/<file>.md, and execute that file exactly. If the file
and this prompt disagree, the file wins. Do nothing the file does not say.
```

| Routine | File | Cadence | Trigger id |
| --- | --- | --- | --- |
| Blog writer | [`blog-writer.md`](./blog-writer.md) | `20 11 * * *` (daily, 11:20 UTC) | _create, then record here_ |

## Rules shared by every routine

- **Pre-check before spending anything.** Query GitHub first. A fire with nothing to do
  costs one API call and writes nothing.
- **Never push to `main`.** Every change is a PR the owner merges.
- **No docs-only PRs, no handoff notes.** The PR body is the trace.
- A routine that changes how a routine behaves is out of scope. That is a PR against this
  folder, opened by a human-driven session.

## Creating or editing a routine

The routine must have the repo as a source or it never checks out and fails silently:

```json
"session_context": {"sources": [{"git_repository": {"url": "https://github.com/ademcwealth/furniturepos-marketing"}}]}
```

After creating or editing, run it once by hand and read the run log to confirm it reached
the checkout and opened a PR. `enabled: true` and a cron schedule prove nothing.

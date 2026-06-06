# Contributing

## Prerequisites

See the [Getting started](README.md#getting-started) section of the README before anything else.

## Branching

| Branch | Purpose |
| --- | --- |
| `main` | Stable, releasable code only |
| `dev` | Integration branch — all feature work merges here first |
| `feat/<name>` | Individual feature or fix branches cut from `dev` |

Branch naming: `feat/short-description`, `fix/short-description`, `chore/short-description`.

## Workflow

1. Cut a branch from `dev`: `git checkout -b feat/your-feature dev`
2. Check `dev/plans/active-plan.md` — work only within the scope of the active plan
3. Open a PR targeting `dev`, not `main`
4. `main` is only updated via a PR from `dev` when a release is ready

## Commit style

Use [Conventional Commits](https://www.conventionalcommits.org/):

```text
fix: handle sidecar startup race condition
chore: update dependencies
docs: update README setup steps
```

## Planning

New functionality requires a plan before implementation begins.

1. Copy `dev/plans/_templates/` into the appropriate type folder (`d-plns/`, `p-plns/`, `r-plns/`)
2. Rename following the convention: `d-nnn-short-name/`
3. Fill in `nnn.md` and `nnn-context/nnn-context.md`
4. Add the plan to `dev/plans/master-plan.md`
5. When it is the next plan to execute, add it to `dev/plans/active-plan.md`

See `dev/plans/README.md` for the full planning system documentation.

## Environment variables

Copy `.env.example` to `.env` in the relevant directory and fill in the values. Never commit `.env` files.

# Onboarding: Working on the DIANOIA Frontend (for first-time frontend devs)

This guide assumes you’ve never worked on a frontend codebase before. Follow it top-to-bottom once, then use the “Daily workflow” section every day.

---

## What you’re building (mental model)

- This is a **Next.js** app (React framework) using the **App Router** (`app/` folder).
- The frontend is responsible for:
  - taking user input (text / structured doc)
  - calling the DIANOIA backend API (`/analyze`, `/analyze/structured`)
  - rendering results (diagnostics, graph, repairs, explanations)

You do **not** need to understand React deeply on day 1. You need:
- how to run it
- how to edit components without breaking everything
- how to commit + open PRs safely

---

## 0) Install the basics (one-time)

### Install Node.js (required)
You need **Node 20.x**.

Pick one:
- **Volta** (recommended: easiest for beginners)
- **nvm** (fine)
- direct Node installer (works, but version drift is common)

If you use Volta:
1) Install Volta
2) Run:
   ```bash
   volta install node@20
   ```

Verify:
```bash
node -v
```
You should see `v20.x.x`.

### Install pnpm (required)
pnpm is the package manager (like pip for Python).
```bash
npm install -g pnpm
```

Verify:
```bash
pnpm -v
```

### Install Git (required)
Verify:
```bash
git --version
```

### Get a GitHub account + repo access
You must be able to clone the repo and open PRs.

---

## 1) Clone the repo (one-time)

```bash
git clone <REPO_URL_HERE>
cd dianoia-frontend
```

If you don’t have the URL, ask the repo owner to send it.

---

## 2) Install dependencies (one-time per machine)

This downloads all JS/TS libraries required to run the app:
```bash
pnpm install
```

You should now have:
- `node_modules/` folder
- `pnpm-lock.yaml` unchanged (don’t edit it manually)

---

## 3) Create your local environment file (one-time)

The frontend needs to know where the backend API lives.

1) Copy `.env.example` → `.env.local`:
```bash
cp .env.example .env.local
```


Notes:
- `.env.local` is **your machine only** (never commit it)
- In `.git.ignore` **on the seocnd line, type .env.local so the file never commits. PLEASE**
- If your backend runs somewhere else, use that URL instead.

---

## 4) Run the app locally (daily)

Start the dev server:
```bash
pnpm dev
```

Open:
- http://localhost:3000

If it runs, you should see the landing page / marketing page / app shell.

Stop the server:
- press `Ctrl + C` in the terminal

---

## 5) IGNORE (Optional but recommended) Run the backend too

If you want real results (not mocks), run the DIANOIA backend on port `8000`.

You should be able to hit:
- `http://localhost:8000/health` (or backend equivalent)

If you can’t run backend locally yet:
- you can still work on UI using mocks (`lib/mock/*`) if the project supports it.

---

## 6) Your first edit (safe beginner task)

Goal: change text on a page and see it update.

1) With `pnpm dev` running, open:
- `app/page.tsx` (or `app/(marketing)/page.tsx`)

2) Find a heading string and change it.

3) Save the file.

4) Reload the browser. You should see your change instantly.

If you see errors:
- read the terminal output first
- then check the browser console

---

## 7) Understanding the folder structure (minimum you need)

### `app/` (routing)
- Each folder under `app/` can become a URL route.
- Example:
  - `app/(app)/analyze/page.tsx` → `/analyze`
  - `app/(app)/graph/page.tsx` → `/graph`

### `components/` (building blocks)
- `components/ui/` = reusable primitives (Button, Card, Tabs…)
- `components/analyze/` = analyze feature UI
- `components/graph/` = graph feature UI
- `components/repairs/` = repairs feature UI

Beginner rule:
- If you’re working on a feature page, you’ll mostly edit `components/<feature>/`.

### `lib/` (shared code)
- `lib/mock/` = fake data used to build UI without backend
- `lib/schemas/` = types for diagnostics/graph/repairs (sometimes “schemas”)
- `lib/utils.ts` = helper functions

### `store/` (state)
- Holds shared state used across components/pages.
- Don’t rewrite stores casually—ask before large changes.

---

## 8) Daily workflow (the exact sequence)

### Start your day
```bash
git checkout main
git pull
pnpm install
pnpm dev
```

### Create a new branch for your work
Branch names should be descriptive:
```bash
git checkout -b feat/<short-description>
```

Examples:
- `feat/analyze-input-panel`
- `fix/graph-toolbar-layout`
- `chore/update-deps`

### Make changes
- edit files
- refresh browser
- keep scope small

### Before committing (always do this)
```bash
pnpm lint
pnpm typecheck
pnpm build
```

If you don’t have all scripts yet, run what exists:
- `pnpm lint`
- `pnpm typecheck`

### Commit your changes
```bash
git status
git add .
git commit -m "feat: <what you did>"
```

Good commit messages:
- `feat: add empty state to repairs page`
- `fix: prevent crash when no nodes exist`
- `chore: align button variants with design tokens`

### Push your branch
```bash
git push -u origin feat/<short-description>
```

### Open a PR (Pull Request)
In GitHub:
- open PR → target `main`
- add screenshots for UI changes
- describe what changed and how to test it

---

## 9) How to work without breaking everything (rules for beginners)

### Rule A: Don’t edit `components/ui/*` unless told
Those are shared primitives. Changing them can break the whole app.

If you need a new UI primitive:
- ask the owner or open a PR with careful review and screenshots.

### Rule B: Keep PRs small
Aim for **200–400 lines net** change.
Small PRs merge faster and get better feedback.

### Rule C: Prefer simple changes over clever abstractions
Frontend complexity grows fast. If you’re not sure:
- implement the simplest version that works
- then refactor with guidance

### Rule D: Avoid “global” state changes unless necessary
If you touch `store/*`, keep it minimal.
Ask before reorganizing store architecture.

### Rule E: TypeScript errors are not “warnings”
Fix them. Don’t suppress unless you know why.

---

## 10) Common beginner errors (and what to do)

### “Module not found” / dependency errors
Run:
```bash
pnpm install
```

### “Port 3000 already in use”
Either:
- stop the other process using 3000
- or run Next on another port:
```bash
pnpm dev -- -p 3001
```

### CORS errors when calling backend
This usually means:
- backend is not allowing requests from `http://localhost:3000`
- or `NEXT_PUBLIC_DIANOIA_API_BASE` is wrong

Fix by:
- verifying `.env.local`
- ensuring backend has CORS configured

### “Hydration” warnings / mismatch
Often caused by:
- using `window` or `document` during server-rendering
- time-based randomness in initial render

If you see this:
- ask someone; it’s common but needs correct fixes.

---

## 11) How to ask for help effectively (fastest way to unblock)

When you’re stuck, share:
1) What you were trying to do
2) The exact error message (copy/paste)
3) The file path you edited
4) A screenshot of the browser + terminal (if applicable)

This avoids 10 rounds of guessing.

---

## 12) Starter tasks (good first PRs)

- Adjust copy/text on marketing or dashboard page
- Add an empty state UI to a page
- Add loading state UI while API call is pending
- Add a small component inside `components/analyze/` or `components/repairs/`
- Wire a button click to open a dialog (local state only)

Avoid as a first task:
- refactoring stores
- changing routing layouts
- touching React Flow performance or graph layout logic
- modifying shared `components/ui/*` primitives

---

## 13) “Where do I put my code?” (quick decision table)

- New UI on Analyze page → `components/analyze/*`
- New UI on Graph page → `components/graph/*`
- New UI on Repairs page → `components/repairs/*`
- Truly reusable generic component → `components/common/*`
- Truly reusable primitive → `components/ui/*` (only with review)
- API call / fetch logic → `lib/api/*` (recommended to exist)
- Fake data for UI building → `lib/mock/*`
- Shared types/schemas → `lib/schemas/*`
- Cross-page state → `store/*`

---

## 14) Done criteria (what “ready to merge” means)

Your PR is merge-ready when:
- The app runs locally (`pnpm dev`)
- Lint and typecheck pass (`pnpm lint`, `pnpm typecheck`)
- You included screenshots for UI changes
- The PR description explains how to verify the behavior

---


# DIANOIA Frontend (`dianoia-frontend`)

Next.js (App Router) frontend for DIANOIA: **analyze text → render argument graph → surface diagnostics → preview/apply repairs → explain results**.

This README is designed for a **3–5 person** team: parallel work, low merge friction, consistent quality.

---

## Table of Contents

- [Quickstart](#quickstart)
- [Local Configuration](#local-configuration)
- [Project Structure](#project-structure)
- [Core Conventions](#core-conventions)
- [API Integration](#api-integration)
- [State Management](#state-management)
- [Development Workflow](#development-workflow)
- [Testing](#testing)
- [Deployments](#deployments)
- [Ownership Model (3-5 people)](#ownership-model-3-5-people)
- [RFCs (for large changes)](#rfcs-for-large-changes)
- [Troubleshooting](#troubleshooting)

---

## Quickstart

### Prereqs
- Node.js **20.x**
- **pnpm** (recommended) — use one package manager team-wide

### Install & run
```bash
pnpm install
pnpm dev
```

Open: http://localhost:3000

### Common scripts (expected)
```bash
pnpm dev         # start dev server
pnpm build       # production build
pnpm start       # run production build locally
pnpm lint        # eslint
pnpm typecheck   # tsc --noEmit
pnpm test        # unit/component tests (if configured)
pnpm format      # prettier (if configured)
```

**Team rule:** if a script is referenced here, it must exist in `package.json`.

---

## Local Configuration

### Environment variables
Create `.env.local` from `.env.example`.

Typical variables:
- `NEXT_PUBLIC_DIANOIA_API_BASE` — backend base URL (e.g. `http://localhost:8000`)
- (optional) `NEXT_PUBLIC_APP_ENV` — `local|staging|prod`

Rules:
- Never commit secrets.
- Only commit `.env.example`.

---

## Project Structure

Current repo layout (high level):

- `app/` — Next.js routes + layouts (App Router)
  - `(marketing)/` — marketing pages/layout
  - `(app)/` — product pages/layout
  - `api/health/route.ts` — frontend health endpoint

- `components/`
  - `ui/` — shadcn-style primitives only (Button, Card, Dialog, Tabs, Toast…)
  - `layout/` — app shell/navigation/footer
  - `analyze/` — analyze UI panels + results tabs
  - `graph/` — graph canvas, node/edge rendering, toolbar, sidebar, minimap
  - `repairs/` — repair list/cards/diff/preview
  - `common/` — empty/loading/error states, keyboard shortcuts

- `lib/`
  - `utils.ts`, `constants.ts`
  - `mock/` — mock data (graph/diagnostics/repairs) for UI work without backend
  - `schemas/` — types/schemas for graph, diagnostics, repairs

- `store/` — app-wide state
  - `app-store.ts`, `graph-store.ts`, `ui-store.ts`

- `hooks/` — shared hooks (`use-hotkeys`, `use-media-query`, `use-toast`)
- `styles/` — tokens (`tokens.css`) + global styling support

> Recommendation as the app grows: introduce `lib/api/`, `lib/domain/`, and `lib/graph/` layers so non-trivial logic doesn’t leak into components.

---

## Core Conventions

These rules keep a 3–5 person team fast and prevent “component soup”.

### 1) Keep domain logic out of React components
Components should mostly render UI + do trivial derivations.

Non-trivial logic belongs in:
- `lib/api/` (recommended to add): fetch wrapper, error normalization, DTO mapping
- `lib/domain/` (recommended to add): pure domain logic (no React)
- `lib/graph/` (recommended to add): graph adaptation/layout/selectors
- `store/`: UI orchestration (selection, filters, panels, cross-page state)

### 2) Avoid API shape leakage
Do not spread raw backend response shapes across the UI.

Preferred pattern:
- DTO types (API response)
- mapping function → UI-friendly model
- UI consumes UI model only

This prevents breakage when backend fields evolve.

### 3) Small PRs
Target ~200–400 net lines per PR.
If you need >800 lines or cross-cutting changes (routing + stores + API + graph), write an RFC first.

### 4) UI primitives stay primitive
`components/ui/*` should contain “dumb” primitives (shadcn-style).  
Feature logic belongs in `components/analyze|graph|repairs`.

### 5) Naming + file hygiene
- One component per file.
- Prefer `kebab-case.tsx` for files, `PascalCase` for components.
- Avoid circular imports between features.

---

## API Integration

### Base URL
All backend calls should use:
- `NEXT_PUBLIC_DIANOIA_API_BASE`

### Recommended: one API client module
Create (or maintain) a single client layer so every feature does not reinvent fetch logic:

Suggested files:
- `lib/api/client.ts` — base fetch, timeouts, error normalization, JSON parsing
- `lib/api/dianoia.ts` — `analyzeText()`, `analyzeStructured()`
- `lib/api/types.ts` — DTOs (or generated types)

### Error handling contract (frontend-side)
Standardize on one error shape the UI can display:
- `status` (HTTP status if present)
- `code` (semantic code if present)
- `message` (human-readable)
- `details` (optional raw payload)

**Rule:** components don’t parse raw error payloads; the API layer does.

### Mocking for UI work
Use `lib/mock/*` to unblock UI development without backend availability.
If you introduce a “mock mode”, gate it behind an explicit env flag (optional):
- `NEXT_PUBLIC_USE_MOCKS=true`

---

## State Management

You already have:
- `store/app-store.ts`
- `store/graph-store.ts`
- `store/ui-store.ts`

### Suggested responsibility split
- `ui-store`: global UI state (theme, sidebars, modals, toasts, hotkeys)
- `graph-store`: graph-specific state (selected node/edge, overlays, layout settings)
- `app-store`: cross-feature “session” state (current analysis result, request status, last doc id)

### Single source of truth
Avoid duplicating derived state in multiple stores. Prefer:
- store holds canonical state
- selectors/derived helpers compute views of that state

### Concurrency rule (important for /analyze)
When you add real API calls:
- store should track `requestId` (or similar)
- ignore stale responses that return out-of-order

---

## Development Workflow

### Branching
Trunk-based development:
- short-lived feature branches
- merge to `main` via PRs only

Suggested branch naming:
- `feat/graph-overlays`
- `fix/analyze-loading-state`
- `chore/update-deps`

### PR expectations
Every PR should include:
- What changed + why
- Screenshots/video for UI changes
- Notes on any user-facing behavior change
- Test plan (how reviewer can verify)

### Review rules (3–5 person sweet spot)
- Require at least **1 approval** (2 for core graph/layout/API changes)
- No direct pushes to `main`
- CI must pass before merge

### Merge strategy
Squash merge recommended:
- keeps history clean
- one PR = one logical change

---

## Testing

Choose the minimum stack that supports parallel work:

### Suggested layers
1) Unit tests: pure functions (mappers, selectors, graph utilities)
2) Component tests: major UI states (loading/error/empty + key components)
3) E2E tests: critical user flows

### Typical tools (optional but recommended)
- Unit/Component: Vitest + React Testing Library
- E2E: Playwright

### What to test first (highest ROI)
- API mapping (DTO → UI model)
- Graph overlay logic (coherence failures, repairs, selection sync)
- Repair application preview vs committed state

---

## Deployments

### Recommended deployment model
- Preview deployment for every PR (reviewers click a URL)
- Staging tracks `main`
- Production tracks tagged releases (or `main` if moving very fast)

Provider-agnostic expectation:
- `pnpm build` must succeed in CI
- environment variables are configured per environment
- runtime errors are visible (Sentry or equivalent) at least on staging

---

## Ownership Model (3-5 people)

Assign “ownership” so people can work in parallel without collisions.

### Suggested owners
- **Analyze**: `app/(app)/analyze/*`, `components/analyze/*`, related store slices
- **Graph**: `app/(app)/graph/*`, `components/graph/*`, `graph-store`
- **Repairs**: `app/(app)/repairs/*`, `components/repairs/*`
- **Platform/UX** (rotating or 1 person): `components/ui/*`, `components/layout/*`, build tooling, CI

### Practical rules
- PRs touching `components/ui/*` require stricter review (these affect everything).
- Feature owners review PRs that modify their area.
- Avoid cross-feature refactors without an RFC.

### Optional: CODEOWNERS
Add `.github/CODEOWNERS` to auto-request reviewers for critical paths.

---

## RFCs (for large changes)

Write a short RFC in `docs/rfcs/` if a change is:
- >800 lines net
- cross-cutting (routing + store + API + graph rendering)
- architectural (state model change, graph engine contract change)

RFC template (minimal):
- Goal
- Non-goals
- Proposed design
- Migration plan
- Risks/alternatives

---

## Troubleshooting

### “Backend calls fail / CORS errors”
- Confirm `NEXT_PUBLIC_DIANOIA_API_BASE` is set correctly
- Confirm backend is running and accessible from the browser
- Ensure backend has CORS enabled for the frontend origin

### “Typecheck fails on CI but not locally”
- Confirm Node version matches team standard (Node 20.x)
- Ensure you’re using the same package manager + lockfile
- Run:
```bash
pnpm install --frozen-lockfile
pnpm typecheck
```

### “Formatting keeps changing in PRs”
- Ensure everyone uses the same formatter config
- Prefer pre-commit hooks (lint-staged) + CI enforcement
- Run:
```bash
pnpm format
pnpm lint
```

### “Graph UI feels slow”
- Avoid recomputing layouts on every render; memoize
- Keep React Flow nodes/edges stable (keys + referential stability)
- Move heavy derivations into selectors/util modules (not components)

---

## Contributing

1) Create a small issue (or comment on an existing one)
2) Open a draft PR early if the change is non-trivial
3) Keep PRs focused and reviewable
4) Don’t merge if CI is red

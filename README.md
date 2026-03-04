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





# For Front-End Engineers: Integration Guide

This guide covers everything you need to build the DIANOIA frontend from scratch.
No prior context required. Read top to bottom.

---

### A — What You Are Building

A single-page application that:

1. Accepts raw text or structured argument data as input
2. Sends it to the DIANOIA API for analysis
3. Displays an interactive argument graph, a source text panel, and issue panels
4. Lets users apply repairs and compare before/after

Every analysis call is **stateless** — you send the full document, get the full result back.
There is no server-side session. If the user applies a repair, you re-send the modified document.

---

### B — Recommended Stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | React 18 + TypeScript | Strict typing catches API shape errors early |
| Graph visualization | Cytoscape.js or React Flow | Cytoscape has better force-directed layouts; React Flow has better React integration |
| Layout algorithm | Dagre (hierarchical) or CoSE (force-directed) | Dagre shows support chains clearly (premises at bottom, conclusions at top); CoSE handles messier real-world graphs |
| State management | Zustand or React Context + useReducer | App state is one analysis result + UI selections; no need for Redux |
| HTTP client | Fetch API or Axios | No special requirements |
| Source highlighting | Custom span overlay (see section H) | Mark.js works but you need fine control for align_method variants |
| Styling | Tailwind or CSS Modules | No preference |

Do not use general-purpose knowledge graph libraries (Sigma, Vis.js). Argument graphs are small
(typically 4–30 nodes) and need precise control over edge label rendering and fallacy badge display.

---

### C — Full App Layout

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  DIANOIA                               [Quality: 5 ADUs · 4 edges · 80% ✓]  │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌───── Input + Source Panel ──────────┐  ┌──── Argument Graph ───────────┐ │
│  │ [Text area: paste argument here]    │  │                               │ │
│  │                                     │  │  (a0) MAJOR CLAIM ●          │ │
│  │ [Analyze ▶]  [Load Example ▼]      │  │       ↑ support (green)       │ │
│  │                                     │  │  (a1) claim                  │ │
│  │ ── Source Text ──────────────────── │  │       ↑ support               │ │
│  │ [text with highlighted ADU spans]   │  │  (a2) ⚠ premise              │ │
│  │ "quoted span" [exact]               │  │                               │ │
│  │ "approx span" [~82%]                │  │  [Dagre|CoSE]  [zoom ±]      │ │
│  │ [unanchored claim — no highlight]   │  └───────────────────────────────┘ │
│  └─────────────────────────────────────┘                                    │
│                                                                              │
│  ┌──── Issues Panel ────────────────────────────────────────────────────┐   │
│  │ [Coherence (1)] [Fallacies (1)] [Defeaters (2)] [Unsupported] [Fix]  │   │
│  │ ─────────────────────────────────────────────────────────────────── │   │
│  │ ⚠ SUPPORT_CONTRADICTED  e0  a1→a0  severity 0.75  [Fix ▶]          │   │
│  │ ? possible_ad_hominem   a3  claim  conf 0.75       [Show ▶]         │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│  ┌──── Semantics ──────────────────┐  ┌──── Strength ─────────────────────┐ │
│  │ Grounded: {a0, a2}  ✓          │  │ a0 ████░░ +0.42 (→ +0.61 repaired)│ │
│  │ [Viewpoint A] [Viewpoint B]     │  │ a1 ██████ +0.67                   │ │
│  │ 2 consistent viewpoints         │  │ a2 ████████ +0.88                 │ │
│  └─────────────────────────────────┘  └───────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────────────────┘
```

**Five primary panels:**

| Panel | Data source | Always shown? |
|---|---|---|
| Input + Source | user input + `result.original_graph` nodes (spans) | Yes |
| Argument Graph | `result.original_graph` or `result.repaired_graph` | Yes |
| Issues | `coherence_failures`, `fallacies`, `defeaters`, `unsupported_claims`, `witnesses` | Yes (tabs) |
| Semantics | `grounded_ext`, `preferred_exts` | Yes |
| Strength | `bipolar_degrees_original`, `bipolar_degrees_repaired` | Yes |

---

### D — TypeScript Type Definitions

Add these to `types.ts`. They match the API response exactly.

```typescript
// ── Primitives ─────────────────────────────────────────────────────────────

type VerifiabilityType =
  | "empirical_factual"
  | "historical"
  | "normative_value"
  | "forecast_causal"
  | "interpretive"
  | "definitional"
  | "other";

type ADUType = "major_claim" | "claim" | "premise";
type Modality = "certain" | "probable" | "possible" | "contested";
type Provenance = "extracted" | "generated_paraphrase" | "generated_premise";
type AlignMethod = "exact" | "casefold" | "difflib" | "none";
type EdgeLabel = "support" | "attack" | "undercut";
type EffectType = "rebut" | "undercut" | "credibility_downweight" | "rhetorical_penalty";
type TargetType = "claim" | "inference" | "dialogue";

// ── NLI scores ─────────────────────────────────────────────────────────────

interface NLIScores {
  entailment: number;    // 0–1
  neutral: number;       // 0–1
  contradiction: number; // 0–1
  // the three scores sum to ~1.0
}

// ── Core objects ───────────────────────────────────────────────────────────

interface CanonADU {
  id: string;                      // e.g. "a0"
  span: [number, number];          // [start, end] char offsets into source_text
  text: string;                    // normalized proposition text
  type: ADUType;
  modality: Modality;
  speaker_commitment: number;      // 0.0–1.0 (0 = distancing, 1 = full assertion)
  attribution: string | null;      // speaker name for debates; null for essays
  provenance: Provenance;
  anchor_id: string;               // 24-char hex: stable to span position
  span_fingerprint: string;        // 16-char hex: stable to text content
  verifiability_type: VerifiabilityType | null;
  attrs: {
    evidence_quote?: string;       // exact text the LLM copied from source
    align_method?: AlignMethod;    // how the quote was matched back to source
    align_score?: number;          // 0–1 fuzzy match score (for difflib)
    confidence?: number;           // extraction confidence (0–1)
    [key: string]: unknown;
  };
}

interface CanonEdge {
  id: string;                      // e.g. "e0"
  src: string;                     // CanonADU id
  tgt: string;                     // CanonADU id
  label: EdgeLabel;
  attrs: {
    // "inference" means this undercut targets a warrant, not the claim's truth
    target_kind?: "claim" | "inference";
    nli_scores?: NLIScores;
    // weight = (1 - contradiction) for support; contradiction for attack; absent for undercut
    weight?: number;
    extractor?: string;
    confidence?: number;
    [key: string]: unknown;
  };
}

interface CanonDoc {
  doc_id: string;
  text: string;
  adus: CanonADU[];
  edges: CanonEdge[];
}

// ── Analysis outputs ───────────────────────────────────────────────────────

interface CoherenceFailure {
  edge_id: string;
  src_id: string;
  tgt_id: string;
  edge_label: EdgeLabel;
  failure_code: "SUPPORT_CONTRADICTED" | "ATTACK_ENTAILED";
  severity: number;      // the winning NLI score (0–1)
  nli_scores: NLIScores;
}

interface FallacyResult {
  adu_id: string;
  fallacy_type: "circular_reasoning" | "missing_support";
  tier: 1 | 2;
  score: number;         // 1.0 for tier 1 (deterministic)
  detail: string;
  implicated_nodes: string[];
}

interface Defeater {
  label: string;                  // always "possible_" prefixed, e.g. "possible_ad_hominem"
  target_type: TargetType;
  target_id: string;              // CanonADU.id or InferenceNode.id
  effect: EffectType;
  evidence_span: string;          // text grounding the detection (always present)
  reasoning: string;
  severity: number;               // 0–1
  confidence: number;             // 0–1
  context_edge_id: string | null; // for UX edge highlighting only
}

interface Witness {
  failure: CoherenceFailure;
  repair_hint: "flip_label" | "delete_edge";
}

interface RepairAction {
  action_type: "flip_label" | "delete_edge";
  edge_id: string;
  old_label?: EdgeLabel;
  new_label?: EdgeLabel;
}

interface RepairResult {
  applied: RepairAction[];
  skipped: RepairAction[];
}

interface InferenceNode {
  id: string;            // e.g. "i0"
  scheme: string;        // currently always "unknown" — Engine 4 will populate
  premises: string[];    // CanonADU ids
  conclusion: string;    // CanonADU id
  warrant: string;       // currently always "" — Engine 4 will populate
  scheme_params: Record<string, unknown>;
}

interface ExtractionMeta {
  extractor: "llm" | "nli";
  llm_model?: string;
  n_adus: number;
  n_edges_extracted: number;
  n_edges_invalid_label: number;
  align_methods: Partial<Record<AlignMethod, number>>;
  align_score_min: number;
  align_score_mean: number;
}

// NetworkX node_link_data format (what the API actually sends for graphs):
interface SerializedGraph {
  directed: boolean;
  multigraph: boolean;
  graph: Record<string, unknown>;
  nodes: Array<{ id: string; [key: string]: unknown }>;
  links: Array<{ source: string; target: string; [key: string]: unknown }>;
}

// ── Top-level result ───────────────────────────────────────────────────────

interface AnalysisResult {
  doc_id: string;
  source_text: string;
  original_graph: SerializedGraph;
  repaired_graph: SerializedGraph;
  sanity_warnings: string[];
  coherence_failures: CoherenceFailure[];
  witnesses: Witness[];
  fallacies: FallacyResult[];
  defeaters: Defeater[];
  unsupported_claims: string[];
  repair_result: RepairResult;
  grounded_ext: string[];           // node ids in grounded extension
  preferred_exts: string[][] | null; // list of sets; null if >30 nodes
  bipolar_degrees_original: Record<string, number>;
  bipolar_degrees_repaired: Record<string, number>;
  extraction_meta: ExtractionMeta | null;
  inference_nodes: InferenceNode[];
  inference_graph: SerializedGraph | null;
}
```

---

### E — Graph Serialization

The API serializes NetworkX `DiGraph` objects using `node_link_data`. This is what you
actually receive when you parse `result.original_graph`:

```json
{
  "directed": true,
  "multigraph": false,
  "graph": {},
  "nodes": [
    {
      "id": "a0",
      "text": "Vaccines protect against disease.",
      "type": "major_claim",
      "modality": "certain",
      "speaker_commitment": 1.0,
      "verifiability_type": "empirical_factual",
      "provenance": "extracted",
      "attrs": { "evidence_quote": "Vaccines protect against disease." }
    }
  ],
  "links": [
    {
      "source": "a1",
      "target": "a0",
      "label": "support",
      "weight": 0.92,
      "nli_scores": { "entailment": 0.77, "neutral": 0.15, "contradiction": 0.08 },
      "attrs": { "target_kind": "claim" }
    }
  ]
}
```

**Important:** Graph nodes do not include `span`, `anchor_id`, or `span_fingerprint` — these
live on the `CanonADU` objects. When you need spans for source highlighting or repair
re-analysis, use the original `CanonDoc` (store it from the API call alongside the result).

---

### F — API Layer

#### Base setup

```typescript
const API_BASE = "http://localhost:8000";

async function apiFetch<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API ${res.status}: ${text}`);
  }
  return res.json() as Promise<T>;
}
```

#### Analyze raw text

```typescript
// Use this when the user pastes text directly.
// The API runs extraction (LLM or NLI) then full analysis.
async function analyzeText(text: string, docId?: string): Promise<AnalysisResult> {
  return apiFetch<AnalysisResult>("/analyze_text", {
    text,
    doc_id: docId ?? crypto.randomUUID(),
  });
}
```

#### Analyze a structured doc (for repair re-analysis)

```typescript
// Use this when you have an existing CanonDoc and want to re-analyze
// (e.g. after applying a repair to the edges list).
async function analyzeDoc(doc: CanonDoc): Promise<AnalysisResult> {
  return apiFetch<AnalysisResult>("/analyze", doc);
}
```

#### Apply a repair

Repairs are **not** server-side operations. The workflow is:
1. Take the original `CanonDoc` (stored when the last analysis ran)
2. Mutate a copy of the edges per the `Witness.repair_hint`
3. Re-send the modified doc to `POST /analyze`

```typescript
function applyRepairToDoc(doc: CanonDoc, witness: Witness): CanonDoc {
  const edges = doc.edges
    .map((e): CanonEdge | null => {
      if (e.id !== witness.failure.edge_id) return e;
      if (witness.repair_hint === "flip_label") {
        const flipped: EdgeLabel = e.label === "support" ? "attack" : "support";
        return { ...e, label: flipped };
      }
      return null; // delete_edge
    })
    .filter((e): e is CanonEdge => e !== null);
  return { ...doc, edges };
}

// Usage in a component:
async function onRepairClick(witness: Witness) {
  setIsRepairing(true);
  try {
    const repairedDoc = applyRepairToDoc(originalDoc, witness);
    const repairedResult = await analyzeDoc(repairedDoc);
    setRepairedResult(repairedResult);
    setShowRepaired(true);
  } catch (err) {
    setRepairError(String(err));
  } finally {
    setIsRepairing(false);
  }
}
```

#### Error handling

| HTTP status | Meaning | User message |
|---|---|---|
| 422 | Bad input shape | "Invalid input format." |
| 500 | Model crash / OOM | "Analysis failed. Try shorter text." |
| Connection refused | Backend not running | "Cannot connect to DIANOIA server." |
| Timeout (>15s) | Very long document | "Analysis is taking too long. Try splitting the text." |

Show a loading spinner during analysis. LLM extraction + NLI runs take 2–10 seconds.

---

### G — Graph Panel

The graph panel is the primary visualization. It must support:
directed edges with labels, node coloring by type/state, edge coloring by label,
click-to-select (for sidebar sync), pan + zoom, and force-directed or hierarchical layout.

#### Build Cytoscape elements from API data

```typescript
import cytoscape from "cytoscape";
import dagre from "cytoscape-dagre";
cytoscape.use(dagre);

interface NodeData {
  id: string;
  label: string;        // truncated text for display
  type: ADUType;
  modality: Modality;
  bipolar: number;
  verifiability_type: VerifiabilityType | null;
  inGrounded: boolean;
  isUnsupported: boolean;
  hasFallacy: boolean;
  hasDefeater: boolean;
}

interface EdgeData {
  id: string;
  source: string;
  target: string;
  label: EdgeLabel;
  weight: number;
  failed: boolean;
  failureCode: string | null;
  targetKind: "claim" | "inference";
}

function buildCytoscapeElements(
  graph: SerializedGraph,
  result: AnalysisResult
): cytoscape.ElementDefinition[] {
  const elements: cytoscape.ElementDefinition[] = [];

  for (const node of graph.nodes) {
    const data: NodeData = {
      id: node.id as string,
      label: truncate(node.text as string, 55),
      type: node.type as ADUType,
      modality: node.modality as Modality,
      bipolar: result.bipolar_degrees_original[node.id as string] ?? 0,
      verifiability_type: node.verifiability_type as VerifiabilityType | null,
      inGrounded: result.grounded_ext.includes(node.id as string),
      isUnsupported: result.unsupported_claims.includes(node.id as string),
      hasFallacy: result.fallacies.some(f => f.implicated_nodes.includes(node.id as string)),
      hasDefeater: result.defeaters.some(d => d.target_id === node.id),
    };
    elements.push({ data });
  }

  for (const link of graph.links) {
    const edgeId = (link.id ?? `${link.source}-${link.target}`) as string;
    const failure = result.coherence_failures.find(f => f.edge_id === edgeId);
    const data: EdgeData = {
      id: edgeId,
      source: link.source as string,
      target: link.target as string,
      label: link.label as EdgeLabel,
      weight: (link.weight as number) ?? 1.0,
      failed: !!failure,
      failureCode: failure?.failure_code ?? null,
      targetKind: ((link.attrs as Record<string,unknown>)?.target_kind as "claim" | "inference") ?? "claim",
    };
    elements.push({ data });
  }

  return elements;
}

function truncate(s: string, n: number): string {
  return s.length <= n ? s : s.slice(0, n - 1) + "…";
}
```

#### Node visual spec

| Condition | Visual |
|---|---|
| `type === "major_claim"` | Large circle, thick border (3px), bold label |
| `type === "claim"` | Medium circle, standard border (2px) |
| `type === "premise"` | Small circle, thin border (1px), muted label |
| `modality === "certain"` | Solid border |
| `modality === "probable"` | 85% opacity fill |
| `modality === "possible"` | Dashed border |
| `modality === "contested"` | Amber/orange border color |
| `bipolar > 0.3` | Green tint fill (`hsl(120, 40%, 92%)`) |
| `bipolar < -0.3` | Red tint fill (`hsl(0, 40%, 92%)`) |
| `inGrounded === true` | Checkmark badge top-right |
| `isUnsupported === true` | "?" badge top-right |
| `hasFallacy === true` | Pulsing red dashed border |
| `hasDefeater === true` | Orange triangle badge |

#### Edge visual spec

| Condition | Visual |
|---|---|
| `label === "support"` | Green solid arrow |
| `label === "attack"` | Red solid arrow |
| `label === "undercut"` | Orange dashed arrow |
| `weight` | Thickness: `max(1, weight * 5)` px |
| `failed === true` | Yellow/orange glow on the edge |
| `targetKind === "inference"` (undercut) | Arrow points at the midpoint of the target edge, not the node itself |

**Undercut edge rendering — current vs canonical:**

Undercut edges challenge the *inferential warrant*, not the claim's truth. Two representations
exist depending on whether I-nodes are enabled:

- **Current (flat graph, `profile.inference_object_enabled=False`):** Edge appears as
  `src → tgt_claim` with `attrs.target_kind = "inference"`. Target is the claim node but the tag
  signals this is a warrant challenge.
- **Canonical (I-node graph, `profile.inference_object_enabled=True`):** In
  `result.inference_graph`, support edges are split `src → I-node → tgt`. Undercutters are
  rewired to `undercut_src → I-node`.

**Renderer rule:** If `targetKind === "inference"`, draw the undercut arrow pointing at the
midpoint of the support edge being challenged (use `context_edge_id` on the `Defeater` to
identify it), not at the claim node. Do not render it as if it attacks the target's truth.

#### Layout

```typescript
const dagreLayout = {
  name: "dagre",
  rankDir: "BT",          // bottom-to-top: premises bottom, major claims top
  ranker: "tight-tree",
  nodeSep: 60,
  rankSep: 80,
  padding: 20,
};

const coseLayout = {
  name: "cose",
  animate: false,
  padding: 30,
  nodeRepulsion: 8000,
};
```

Use `BT` Dagre by default. Fall back to CoSE for informal text where structure is messier.

#### Hover tooltip

On edge hover, show a mini NLI bar with **all three** bars (entailment / neutral / contradiction).
Label them correctly:

- For support edges: "Compatibility" (not "Entailment") for the weight bar.
  The weight is `1 - contradiction`, not the entailment score. A weight of 0.9 with
  `entailment=0.2, neutral=0.72, contradiction=0.08` is a valid, high-quality support edge.
- For attack edges: "Contradiction strength" for the weight bar.
- For undercut edges: no weight bar; NLI is not run on warrant challenges.

---

### H — Source Text Panel

The source text panel overlays highlighted spans onto the raw input text.
It must sync bidirectionally with the graph (click node → scroll to span; click span → select node).

#### Span rendering algorithm

```typescript
function buildSpanOverlay(
  sourceText: string,
  adus: CanonADU[],
  selectedNodeId: string | null,
  onSpanClick: (id: string) => void
): React.ReactNode[] {
  // Sort by start offset; skip unanchored ADUs (align_method === "none" or span is [0,0])
  const sorted = adus
    .filter(a => a.attrs.align_method !== "none" && !(a.span[0] === 0 && a.span[1] === 0))
    .sort((a, b) => a.span[0] - b.span[0]);

  const segments: React.ReactNode[] = [];
  let cursor = 0;

  for (const adu of sorted) {
    const [start, end] = adu.span;
    if (start > cursor) {
      segments.push(
        <span key={`gap-${cursor}`}>{sourceText.slice(cursor, start)}</span>
      );
    }
    const isSelected = adu.id === selectedNodeId;
    const alignSuffix = adu.attrs.align_method === "difflib"
      ? ` (≈${Math.round((adu.attrs.align_score ?? 0) * 100)}%)`
      : "";
    segments.push(
      <mark
        key={adu.id}
        data-adu-id={adu.id}
        className={[
          "adu-span",
          `adu-type-${adu.type}`,
          `adu-align-${adu.attrs.align_method ?? "exact"}`,
          isSelected ? "adu-selected" : "",
        ].join(" ")}
        title={`${adu.type}${alignSuffix}`}
        onClick={() => onSpanClick(adu.id)}
      >
        {sourceText.slice(start, end)}
      </mark>
    );
    cursor = end;
  }
  if (cursor < sourceText.length) {
    segments.push(<span key="tail">{sourceText.slice(cursor)}</span>);
  }
  return segments;
}
```

#### CSS for alignment states

```css
.adu-span        { cursor: pointer; border-radius: 2px; transition: background 0.15s; }
.adu-selected    { outline: 2px solid #6366f1; }

/* Alignment quality — visually distinct */
.adu-align-exact    { background: rgba(59,130,246,0.18); border-bottom: 2px solid #3b82f6; }
.adu-align-casefold { background: rgba(59,130,246,0.12); border-bottom: 2px dashed #3b82f6; }
.adu-align-difflib  { background: rgba(234,179,8,0.15);  border-bottom: 2px dotted #eab308; }
/* "none" — handled separately, not rendered inline */

/* Node type variations */
.adu-type-major_claim { border-bottom-width: 3px; font-weight: 500; }
.adu-type-premise     { opacity: 0.8; }
```

#### Unanchored ADUs (`align_method === "none"`)

Do not attempt to highlight unanchored ADUs in the source text. Show them in a separate list
below the source panel:

```
Unanchored claims (could not locate in source text):
  [a3] "The conclusion does not follow"  [unanchored]
```

#### Bidirectional sync

```typescript
// Graph → Source: clicking a node scrolls to and highlights its span
function onGraphNodeClick(nodeId: string) {
  setSelectedNode(nodeId);
  const el = document.querySelector(`[data-adu-id="${nodeId}"]`);
  el?.scrollIntoView({ behavior: "smooth", block: "center" });
}

// Source → Graph: clicking a span selects the node
function onSpanClick(aduId: string) {
  setSelectedNode(aduId);
  // Your graph library: cytoscape.getElementById(aduId).select()
}
```

---

### I — Issues Panel

The issues panel shows all findings across all analysis engines. Use tabs to organize.

#### Tab structure

| Tab | Data | Count badge |
|---|---|---|
| Coherence | `result.coherence_failures` | number of failures |
| Fallacies | `result.fallacies` | number of results |
| Defeaters | `result.defeaters` | number of defeaters |
| Unsupported | `result.unsupported_claims` | count |
| Repairs | `result.witnesses` | count |

Hide a tab entirely if its count is 0 (e.g. no coherence failures → no Coherence tab).

#### Coherence failure card

```
┌──────────────────────────────────────────────────────────────┐
│ ⚠ SUPPORT_CONTRADICTED                       severity: 0.75  │
│ Edge e0: a1 → a0  (support)                                  │
│                                                              │
│  Premise:    "Vaccines cause autism in children."            │
│  Conclusion: "Vaccines protect against disease."             │
│                                                              │
│  [Entail ░░░] [Neutral ░░░░░] [Contradict ████████████]     │
│                  0.08            0.17             0.75       │
│                                                              │
│  [Fix: flip to attack ▶]     [Delete edge ▶]                │
└──────────────────────────────────────────────────────────────┘
```

Render the NLI bar as three colored segments: entailment = blue, neutral = gray,
contradiction = red. Show all three bars proportionally (they sum to ~1.0).

The "Fix" button calls `applyRepairToDoc()` and re-analyzes. Show loading state during
re-analysis. After repair, show before/after bipolar degrees.

#### Structural fallacy card

```
┌──────────────────────────────────────────────┐
│ ⊘ Circular Reasoning         Tier 1  · 100%  │
│ Nodes: a0, a4                                │
│ Cycle: a0 → a4 → a0 (all support edges)      │
│ [Highlight cycle in graph ▶]                 │
└──────────────────────────────────────────────┘
```

For `missing_support`: show the node text. Only `claim` and `major_claim` nodes can have
`missing_support`. Do not show it for `premise` nodes — this is expected and not a fallacy.

Tier 1 = deterministic (score 1.0, no confidence qualifier). Tier 2 = show confidence badge.

#### Defeater card

```
┌───────────────────────────────────────────────────────────────┐
│ ? Possible Ad Hominem          confidence: 75%  severity: 0.8 │
│ Targets: a3 (claim) — challenges truth of this claim          │
│                                                               │
│ Evidence: "You're an idiot for thinking that"                 │
│ Reason: Attacks the person rather than the argument           │
│                                                               │
│ ⚠ Machine-detected signal — review with domain knowledge      │
│   before treating as confirmed.                               │
└───────────────────────────────────────────────────────────────┘
```

Use `target_type` to control the description:

- `target_type === "claim"` + `effect === "rebut"`: "Challenges the truth of this claim."
  Show badge on the claim node in the graph.
- `target_type === "inference"` + `effect === "undercut"`: "Challenges the inferential warrant —
  not the conclusion itself." Show badge near the edge or I-node in the graph.

Never strip the `possible_` prefix in the UI. Show "Possible ad hominem" not "Ad hominem."
Never auto-promote based on user dismissal or any client-side action.

---

### J — Argumentation Semantics Panel

#### Grounded extension

```
Grounded Set: a0, a2, a5
These 3 claims are uncontroversially acceptable under the most skeptical interpretation.
```

Highlight these nodes with a checkmark badge in the graph.

If the grounded set is empty: "No claims survive under the most skeptical interpretation.
The argument may have pervasive conflicts."

#### Preferred extensions (viewpoints)

When `preferred_exts` has more than one extension:

```
┌── Viewpoints ──────────────────────────────────────┐
│ [Viewpoint A ✓]  [Viewpoint B]   2 consistent views │
│ Selecting a viewpoint highlights which claims that  │
│ coherent position accepts.                          │
└────────────────────────────────────────────────────┘
```

When a viewpoint is active:
- Highlight nodes in that extension (full opacity)
- Fade out nodes not in the extension (40% opacity)
- Tooltip on faded nodes: "Not accepted in this viewpoint"

When `preferred_exts === null`: "Graph too large for preferred extension computation (>30 nodes)."
When there is only one extension: "One consistent viewpoint — no genuine dialectical conflict."

---

### K — Bipolar Degrees Panel

Show nodes ranked by strength, with before/after if a repair was applied.

```
┌── Argument Strength ──────────────────────────────────────────────┐
│ Node                       Original          After Repair          │
│ a0 "Vaccines protect…"     ████░░  +0.42  →  ██████  +0.61       │
│ a1 "Clinical trials…"      ██████  +0.67     ██████  +0.67       │
│ a2 "Study shows…"          ████████ +0.88     ████████ +0.88      │
└───────────────────────────────────────────────────────────────────┘
```

Use a horizontal bar chart with a center axis. Positive → green bars extending right.
Negative → red bars extending left. Zero → just a center dot.

Show "After Repair" column only when `repairedResult` is available.

---

### L — Extraction Quality Panel

Show as a compact strip at the top of the result, or behind a disclosure button.

```
Extraction: 5 ADUs · 4 edges · Span integrity 80% (4/5 exact)
[⚠ 1 edge had invalid label and was dropped]
```

**Span integrity rate** = (exact + casefold count) / total ADUs.
When < 70%: show banner "Low span integrity — many claims could not be exactly located in
source text. Graph structure may be less reliable."

**`n_edges_invalid_label > 0`**: yellow warning. This means the LLM output a relation type
DIANOIA does not recognize (neither support/attack/undercut). The edge was dropped rather
than coerced. Worth surfacing as a quality signal.

**`extractor === "nli"`**: show note "NLI extractor — limited to sentence-level claims,
support/attack only. For sub-sentence ADUs and undercut edges, enable LLM extraction."

---

### M — Full State Shape

```typescript
interface AppState {
  // Input
  inputText: string;

  // Analysis
  isAnalyzing: boolean;
  analysisError: string | null;
  result: AnalysisResult | null;
  originalDoc: CanonDoc | null;       // stored to enable repair re-analysis

  // Graph display
  selectedNode: string | null;
  selectedEdge: string | null;
  showRepaired: boolean;              // toggle original vs repaired graph
  activeViewpoint: number | null;     // index into preferred_exts

  // Issues panel
  activeIssueTab: "coherence" | "fallacies" | "defeaters" | "unsupported" | "repairs";
  expandedIssue: string | null;       // edge_id of expanded CoherenceFailure
  expandedDefeater: string | null;    // "label:target_id" key of expanded Defeater

  // Repair state
  repairedResult: AnalysisResult | null;
  isRepairing: boolean;
  repairError: string | null;

  // Source text
  sourceHighlights: Array<[number, number]>;  // extra highlights beyond ADU spans
}
```

#### State transition map

```
User submits text
  → isAnalyzing = true, analysisError = null
  → API returns
  → result = AnalysisResult, originalDoc = (reconstruct CanonDoc), isAnalyzing = false

User clicks graph node (nodeId)
  → selectedNode = nodeId, selectedEdge = null
  → source panel scrolls to span

User clicks graph edge (edgeId)
  → selectedEdge = edgeId, selectedNode = null
  → if edge has coherence failure: activeIssueTab = "coherence", expandedIssue = edgeId

User clicks "Fix" on coherence failure (witness)
  → isRepairing = true
  → applyRepairToDoc(originalDoc, witness) → POST /analyze
  → repairedResult = new AnalysisResult, isRepairing = false, showRepaired = true

User clicks viewpoint button (index i)
  → activeViewpoint = i  (or null to deselect / show all)

User toggles "Show Repaired"
  → showRepaired = !showRepaired
  → graph re-renders from repaired_graph or original_graph

User clicks span in source text
  → selectedNode = aduId
  → graph highlights and centers that node
```

---

### N — Data Flow Summary

```
User pastes text
       ↓
POST /analyze_text
       ↓
LLMExtractionLayer → CanonDoc (ADUs + edges + spans)
       ↓
ArgumentEngine.analyze() → AnalysisResult
       ↓
┌─────────────────────────────────────────────────────────────┐
│ original_graph         → argument graph panel               │
│ coherence_failures     → highlight edges, coherence tab     │
│ fallacies              → highlight nodes, fallacies tab     │
│ defeaters              → badges on nodes/edges, defeaters   │
│ unsupported_claims     → "?" badges on nodes                │
│ grounded_ext           → checkmark badges                   │
│ preferred_exts         → viewpoint toggle                   │
│ bipolar_degrees        → strength panel bars                │
│ witnesses              → "Fix" buttons in coherence tab     │
│ repaired_graph         → before/after comparison            │
│ extraction_meta        → quality strip                      │
└─────────────────────────────────────────────────────────────┘
```

---

### O — Critical UX Rules

These rules prevent the frontend from misrepresenting what DIANOIA actually knows.

---

**Rule 1 — Span alignment failures must be visually distinct**

Every ADU has `attrs.align_method` and `attrs.align_score`. Source highlighting must reflect this:

| `align_method` | Source text behavior | Badge |
|---|---|---|
| `exact` | Highlight verbatim, solid underline | None |
| `casefold` | Highlight, dashed underline | "case-normalized" tooltip |
| `difflib` | Highlight, dotted underline, lighter background | "≈ approx. (82%)" badge |
| `none` | Do NOT highlight in source text | "unanchored" in claims list |

Never silently render a `difflib` span as if it were verbatim. A user who clicks an approximate
span and sees the highlighted text doesn't match exactly will distrust the whole system.

When span integrity rate < 70%: show document-level banner "Low span integrity — many claims
could not be exactly located. Results may be less reliable."

---

**Rule 2 — Disconnected graphs are argument threads, not errors**

When the graph has more than one weakly connected component, do not show an error state.

Instead:
- Layout each component separately (force-directed clustering handles this automatically)
- Show component count: "2 argument threads detected"
- Let users navigate between threads
- Flag isolated nodes individually using `sanity_warnings` (look for `ISOLATED_NODE` entries):
  "This claim has no connections to the rest of the argument."

Never show "broken graph" or "structural error" for disconnected components. A disconnected
node is commonly a dropped extraction edge or a standalone sub-argument — not malformed input.

---

**Rule 3 — NLI neutrality is not "no support"**

Do not label a neutral-dominant support edge as "weak" or flag it as a problem.

Argumentative support regularly produces neutral NLI because:
- The inference spans a normative gap (factual premise → normative conclusion) that NLI is
  not trained to bridge
- The support is definitional or analogy-based — NLI does not evaluate argument schemes
- The conclusion synthesizes multiple premises and the NLI model only sees one at a time

`weight = 1 - contradiction` = semantic compatibility. A weight of 0.9 with
`entailment=0.2, neutral=0.72, contradiction=0.08` is a **valid, well-supported edge**.

Display rule: show edge thickness from `weight`. Use green for all support edges regardless
of entailment score. Reserve warning treatment for `failed === true` (coherence failure detected
by the engine). Do not show a "low confidence" label on neutral-dominant support edges.

---

**Rule 4 — Defeaters are hypotheses, not verdicts**

Every `Defeater` has a `possible_` prefix in its label. These are machine-detected signals.

- Show "Possible ad hominem" not "Ad hominem confirmed"
- Show `confidence` as "Detection confidence: 75%" not as a binary fact
- Include on every defeater card: "Review with domain knowledge before treating as confirmed"
- Never remove the `possible_` prefix client-side under any circumstance

---

**Rule 5 — Repaired graph is not the "correct" graph**

Label the repaired view explicitly: "Repaired view (automated)" alongside the original.
Do not replace the original graph silently.

Show the repair action applied: "Support edge e0 flipped to attack" or "Edge e2 deleted."
Show before/after bipolar degrees so users can judge whether the repair is meaningful.

---

### P — What Is Coming That Will Affect the Front End

| Feature | When | Front-end impact |
|---|---|---|
| Engine 4: argument scheme + Walton CQs | Medium-term | `InferenceNode.scheme` and `.warrant` will be populated (authority, causal, analogy, etc.); new Defeater objects for failed critical questions; I-node graph visualization becomes meaningful |
| Engine 5B LLM tier | Medium-term | More `defeaters` with richer `reasoning` and typed targets; enable via `profile.fallacy_engine_enabled=True` + `engine._llm_client` |
| Engine 6: epistemic verification | Long-term | New fields on nodes: `verification_status` (SUPPORTED / REFUTED / NEI), `evidence_citations` (source list); `empirical_factual` and `historical` nodes will have fact-check badges |
| Engine 7: rhetorical strength | Long-term | New per-node score object: `rhetorical_scores` with dimensions (clarity, specificity, relevance, completeness, civility); separate from logical strength |
| 3-track output: epistemic / inferential / rhetorical | Long-term | Three distinct score sections per node; do NOT conflate into a single scalar |
| Compilation profile selection | Medium-term | API will accept a `profile` object in the request body; UI to toggle LLM extraction, I-nodes, fallacy engine, etc. |

#### Design for extensibility

- Each panel should check whether its data is non-empty before showing — do not hard-code visibility
- When `inference_nodes` is non-empty and `inference_graph` is non-null, add an I-node layer toggle to the graph view
- When `preferred_exts` has more than one extension, show the viewpoints panel
- When Engine 6 ships, `empirical_factual` and `historical` nodes will gain a `verification_status` field — add a badge renderer now that gracefully handles both the present (no field) and future (SUPPORTED / REFUTED / NEI) states
- The three strength tracks (epistemic / inferential / rhetorical) will arrive as separate score objects per node — do not merge them into a single bar or score in your current UI, as that would require a redesign later


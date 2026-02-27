# Contributing

## Setup

```bash
git clone https://github.com/alexyan1/DIANOIAFrontend.git
cd DIANOIAFrontend
npm install
cp .env.example .env.local
npm run dev
```

## Workflow

1. Pull latest main before starting: `git pull origin main`
2. Create a branch: `git checkout -b your-name/feature-name`
3. Make your changes
4. Push and open a PR — never push directly to `main`
5. Get at least one review before merging

## Branch naming

```
zayan/analyze-page
alex/graph-sidebar
zayan/fix-nav-bug
```

## Code style

Prettier and ESLint are configured. Before committing:

```bash
npm run lint
npm run format
```

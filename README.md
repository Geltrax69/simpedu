# Simpedu — School Management & ID Card Services

Rebuilt as a maintainable Eleventy source project per `SIMPEDU_REDESIGN_PROMPT.md`. Warm ivory, deep ink, single cobalt accent. Editorial product showcase.

## Run

```bash
npm install
npm run build    # emits to dist/
npm start        # serves dist/ with live reload
```

Deploy: Vercel uses `npm run build` and serves `dist/` (see `vercel.json`).

## Structure

```
src/
  index.njk            # Homepage (6 sections)
  services.njk         # Two offerings
  id-cards.njk         # Gallery with audited labels
  about.njk            # Verified company info
  contact.njk          # Form first, Web3Forms
  _includes/
    layouts/base.njk   # Shared layout
    partials/header.njk, footer.njk
  assets/
    css/tokens.css     # Design tokens
    css/site.css       # Site styles
    js/site.js         # Theme, tabs, menu, form
    img/               # Optimized WebP + SVG logo
scripts/verify/        # Screenshot + link-check harness
dist/                  # Build output (gitignored)
```

## Verification

```bash
node scripts/verify/shots.mjs http://localhost:3000  # screenshots
node scripts/verify/links.mjs http://localhost:3000  # link check
```

See `WORKFLOW.md` for the build plan and `SIMPEDU_REDESIGN_PROMPT.md` for the brief.

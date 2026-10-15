# Simpedu Rebuild — Designed Workflow (figure-it-out Phase B)

## Atomic units, sequenced riskiest-first

### Unit 1: Scaffold (foundational, do first)
Eleventy project in `src/`: layouts, includes, assets, design tokens CSS.
Base layout with header/footer. Real `npm run build` emitting to `dist/`.
Delete `_next/` and the old compiled HTML (subtract before you add).
Verify: builds clean, serves locally, 404 works.

### Unit 2: Verification harness (before features)
Playwright screenshots (desktop 1440 + mobile 390, all routes).
Link checker (no dead links, no `#` hrefs). Lighthouse CI baseline.
Run against the OLD site first for a before/after baseline.

### Unit 3: Assets (parallelizable, start early)
Generate via media tool: A (device scene, 3:2), C (ID-card campaign, 3:2).
Skip B unless mobile product is verified. Skip D unless needed.
Optimize logo2.png (545KB) to <15KB. Crop a real dashboard capture from
existing assets for product screens. Never generate dashboard text.
Output AVIF/WebP with explicit dimensions.

### Unit 4: Homepage (riskiest, one-way door — do carefully)
Six sections per the brief: hero (promise + product composition),
selected work (software story + ID-card story), workflow selector
(attendance/fees/communications, keyboard accessible), ID-card physical
showcase (front/back toggle), proof/delivery (process, no invented
metrics), closing CTA. No screenshot behind the headline. No auto-cycling
hero. Reduced motion honored.

### Unit 5: Services page
Two offerings separated through product imagery and concrete
capabilities. Small understandable groups, not feature-list overload.
Relevant CTA per offering.

### Unit 6: ID cards page
Gallery with audited labels (correct identity, orientation, aspect
ratio). Front/back toggle by tap/keyboard, not hover-only. Accessible
enlarged viewing. Sample templates labeled as samples, not client work.

### Unit 7: About page
Verified company information only. No "industry leader", "global
reach", or institution counts without evidence.

### Unit 8: Contact page
Form and concise intro in the first viewport. Keep Web3Forms
integration and field mapping. Pending/success/validation/failure
states. Preserve input on failure. Actionable phone/email.

### Unit 9: Theme + motion
Single-state theme toggle (fixes the light_bg-in-dark-mode bug).
Choreographed entrance per the motion table. `prefers-reduced-motion`
removes positional reveals. No animation gate on reading.

### Unit 10: Final verification
Full predicate check on the real product. Lighthouse (target ≥90
mobile). Screenshots desktop/mobile. Decision trail committed. Handoff.

## Fan-out plan
- Unit 3 (assets) runs parallel to Units 4-8 once tokens exist.
- Units 5-8 (content pages) can fan out to subagents after the scaffold
  lands, one page per worker, separate files, no shared-state conflicts.
- Unit 4 (homepage) stays in the main thread. It is the one-way door.

## What is NOT happening
- No hand-editing of `_next` chunks. They get deleted.
- No invented clients, testimonials, metrics, or awards.
- No native-app claim without evidence. No generated dashboard text.
- No custom cursor, loading intro, or perpetual ambient motion.

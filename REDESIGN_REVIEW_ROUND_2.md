# Simpedu redesign: second implementation review

Reviewed commit `d4a8203` after pulling `origin/main`, 15 October 2026. Compared against `REDESIGN_REVIEW.md` and the original redesign brief. This report supersedes the earlier report for current status; that report remains a record of the previous implementation.

**Verdict: substantial fixes landed correctly, but the visual brief remains incomplete and some defects remain.** The functional foundation is now much stronger. The main remaining work is controlled product presentation, dark-mode accessibility, stable interactions, and completing the campaign across every page.

## Status of the previous findings

| Previous issue | Current status | Evidence |
| --- | --- | --- |
| Blank product imagery | Partially resolved | Homepage, Services, and About now show the actual dashboard. Homepage uses actual card artwork. Services/About still show blank campaign cards. The requested monitor/phone composition has been replaced, not completed. |
| Text-only workflow tabs | Resolved at a basic level | Attendance, Fees, and Communications have clearly labeled illustrative previews. They still need coherent sizing, presentation polish, and business review of product claims. |
| Header CTA contrast and dark accents | Partially resolved | Header CTA is white on cobalt in both themes, about 5.85:1. Kicker contrast is improved. Selected tabs/card buttons still use the old dark-mode blue, and new fee statuses introduce further failures. |
| 320 px document overflow | Resolved | All five routes fit 320, 390, 768, 1024, and 1440 px. Tabs scroll inside their container. |
| Immutable unversioned caching | Partially resolved | CSS/JS now have a one-hour cache policy. Images still use stable filenames with a year of immutable caching. Previously cached CSS/JS also require a URL change to escape the old policy reliably. |
| Homepage front/back no-op | Resolved | Clicking View back changes the actual image source and alt text. |
| Missing verification, social links, authentic logo | Mostly resolved | Exact verification URL returns 200; LinkedIn/Instagram restored; approved-looking original raster logo restored at 2,970 bytes. Favicon still uses the replacement SVG, and sharing metadata still points to blank devices. |
| Visual/motion completion | Still pending | No new product-focused motion sequence. One portrait card now overwhelms two homepage sections. Mobile section spacing remains large. |
| Weak verification | Improved | Two new outcome tests assert image changes; a 320 px check was added. All seven interactive tests pass with installed Chrome. The committed launch configuration still assumes downloaded Playwright Chromium. |
| Tracked dependencies/output | Resolved | Root `.gitignore` added; zero tracked files under `node_modules/` or `dist/`. |

## Remaining findings, in priority order

### 1. [P1] Fix dark-mode status and selected-control contrast

**Locations:** `src/assets/css/site.css:600`, `src/assets/css/site.css:171`, `src/assets/css/site.css:197`.

The new Fees preview uses dark green `#065F46` for Paid and dark brown `#92400E` for Pending on the dark preview surface `#171D26`. Browser-computed colors give approximately **2.20:1** and **2.39:1** contrast, respectively. These are small text labels and need at least 4.5:1. The selected tab and selected front/back control still use `#2457E7` on `#10141B`, approximately **3.16:1**.

The new `--accent-text` token fixed kickers, but was not carried through selected text states. This is a partial fix, not complete dark-mode coverage.

**Required fix:** use theme-aware status text tokens and `--accent-text` for text that needs the lighter dark-mode accent. Keep appropriate fill tokens for white-on-blue buttons. Verify every selected, hover, focus, and status state in both themes.

### 2. [P2] Constrain portrait card artwork; it now dominates the homepage

**Locations:** `src/index.njk:41`, `src/index.njk:126`, `src/assets/css/site.css:139`, `src/assets/css/site.css:203`.

The former 3:2 campaign image was replaced with a **295 × 502 px** portrait card while keeping `width: 100%; height: auto`. At a 1440 px viewport, the work-story image measures **600 × 1,021 px** and the separate showcase card is about **646 × 1,099 px**. The full homepage is approximately **5,441 px** high, compared with roughly 3,890 px in the previous review. At 768 px it grows to roughly 7,097 px.

This stretches a small raster, creates a huge empty region below the neighboring landscape dashboard, and repeats the same enlarged student portrait twice. It directly weakens the intended balance and richness.

**Required fix:** put the physical card inside a deliberately proportioned stage. Keep the card itself near a controlled maximum width, roughly 260–340 px on desktop depending on the composition, with `object-fit: contain` and reserved stage dimensions. Align adjacent story stages rather than their raw image aspect ratios. Use different front/back/detail compositions in the two locations. Prefer higher-resolution approved artwork where available; do not stretch the current raster to fill a column.

### 3. [P2] Complete the card campaign and sharing artwork everywhere

**Locations:** `src/services.njk:73`, `src/about.njk:28`, `src/_includes/layouts/base.njk:12`, `src/_includes/layouts/base.njk:16`.

Services and About still render `/assets/img/idcard-campaign.webp`, containing blank cards. The global Open Graph and Twitter images still reference `/assets/img/device-scene.webp`, containing blank monitor/phone screens. A shared link can therefore advertise an unfinished campaign even though the homepage hero was changed.

**Required fix:** composite approved card artwork onto the campaign scene or replace it with a polished real card photograph. Finish a 1200 × 630 sharing image showing actual work, use an absolute public URL, supply accurate dimensions/alt text, and complete canonical/`og:url` metadata. Restore consistent approved branding in the favicon too.

### 4. [P2] Keep the workflow stage stable when switching tabs

**Locations:** `src/index.njk:59`, `src/assets/css/site.css:552`.

At 1440 px, the panel heights measured approximately **323 px** for Attendance, **225 px** for Fees, and **146 px** for Communications. Switching from the first to the last pulls the rest of the page upward by about **177 px**. The change is abrupt; no stable stage or panel transition was implemented.

**Required fix:** reserve a common responsive stage height using overlapping grid panels or sensible breakpoint-specific minimum sizes. Keep hidden content inaccessible. Add the short, reduced-motion-aware transition specified in the brief. Verify all three panels on mobile and with enlarged text. Do not replace this with a long animated height transition.

The attendance preview also displays ten marks, including eight P and two A, alongside “28 present, 2 absent.” Either show the complete class or explicitly label the grid as a subset so the example reads coherently.

### 5. [P2] Finish cache invalidation, including previously cached assets

**Location:** `vercel.json:9`.

Images still receive a year of immutable caching under stable names such as `/assets/img/dashboard.webp` and `/assets/img/idcard-campaign.webp`. Editing a composite in place can leave returning visitors with the old image. Changing CSS/JS headers now also cannot force browsers that already cached the previous one-year response to request the new headers immediately.

**Required fix:** introduce content-hashed filenames or build-version URLs across images, CSS, and JS. Update markup references and verify the deployment headers. Alternatively, revalidate stable asset URLs and change the old CSS/JS URLs once to escape existing caches. The new one-hour policy is an improvement, but should not be marked full resolution of the previous issue.

### 6. [P2] Complete the original visual and motion objective

**Locations:** `src/index.njk:18`, `src/assets/css/site.css:123`, entrance-animation section in `src/assets/css/site.css`.

The implementation uses a straightforward browser screenshot rather than the requested finished iPhone/Studio Display composition. That removes the blank device from the visible hero but leaves the requested device art direction outstanding. The same dashboard is repeated in several places, still showing an empty fee chart and sparse demo data. The original development badge is visible in the screenshot's bottom-left corner.

Motion remains the original hero entrance. There is no new product-focused sequence, card movement, preview transition, or coordinated work reveal. Mobile spacing was shortened only in the hero; other sections still use the same large 96 px padding.

**Required fix:** create one finished product scene using current real/sanitized screens and a verified mobile view if one exists. Capture a clean production preview without the development badge and with meaningful demo states. Use complementary detail crops across the page. Add one focused motion sequence and refine mobile rhythm. Keep native scrolling, reduced-motion support, and current performance. A simple browser frame can be retained if the owner chooses that direction, but the requested device composition must be acknowledged as an open design decision.

## Verification performed

- Pulled `origin/main` to `d4a8203` with a fast-forward.
- Initial build could not find Eleventy after dependency removal; `npm ci --no-audit --no-fund` followed by `npm run build` succeeded. This is expected clean-install setup, not a persistent build defect.
- All five public routes returned 200 at 320, 390, 768, 1024, and 1440 px. All 25 measured document widths fit their viewports.
- Fresh desktop/mobile screenshots of homepage, Services, and About were visually inspected. Lazy images were explicitly loaded before screenshots.
- Homepage/gallery front/back changed actual image URLs. Enlarged gallery opened with the correct side, closed with Escape, and restored focus.
- Mobile menu opened and closed with Escape. Workflow keyboard selection worked. Reduced-motion hero remained visible with no animation.
- Form failure and success were tested using intercepted local responses. Failure retained entered data; success reset fields. No real lead was submitted.
- Exact Google verification URL returned 200 with the expected verification text.
- Seven repository interactive checks passed and link checker reported `ALL LINKS OK`, using temporary copies with `chromium.launch({channel: 'chrome'})` so the installed browser could run. Committed test files were not modified by this review. Document Playwright browser installation or make the channel configurable for reproducible runs.
- Bundled source detector returned `[]`; manual checks still found the contrast, composition, and interaction issues above.
- No uncaught JavaScript errors occurred during the reviewed browser actions.

### Local Lighthouse measurement

Lighthouse **12.8.2**, mobile simulation, local built site served with Python, 4× CPU slowdown, default simulated mobile network. One lab run:

| Metric | Result |
| --- | --- |
| Performance | **100/100** |
| Automated accessibility | **100/100** |
| First Contentful Paint | **1.1 s** |
| Largest Contentful Paint | **1.7 s** |
| Total Blocking Time | **0 ms** |
| Cumulative Layout Shift | **0** |
| Total transfer | **144 KiB** |

These are local lab measurements, not deployed real-user results. The automated accessibility score does not cover the dark Fees panel or every interaction state. A zero load CLS does not mean tab changes preserve layout: the panel-size changes above were measured separately after interaction. Production cache headers and field INP were not verified.

## Next-model instruction

> Continue from `d4a8203`. Read `REDESIGN_REVIEW_ROUND_2.md` and the original design prompt. Preserve the working fixes. Correct dark-mode text/status contrast; constrain and art-direct the portrait card stages; replace blank campaign imagery on Services, About, and social previews; stabilize workflow panel dimensions; and finish content-based asset versioning. Complete the product scene, clean screenshot captures, and purposeful showcase motion requested by the original brief. Keep approved branding, real artwork, reduced-motion behavior, and strong performance. Test actual rendered results in both themes at 320/390/768/1024/1440 px, test all tab states, run the build and behavioral checks, and report actual measurements. Do not equate a green test suite or Lighthouse score with completion of the visual brief.

No website implementation was edited, committed, or pushed during this review. Only this report was added.

# Review of the Simpedu rebuild

Reviewed commit `f01eb9f` on 15 October 2026 after pulling `origin/main` with a fast-forward. Seven new commits followed the original redesign prompt.

**Verdict: needs changes.** The rebuild substantially improves maintainability, clarity, and performance. It does not yet fulfill the central requirement: a rich, distinctive presentation of Simpedu's actual work. The current homepage presents blank devices and blank cards as finished product imagery.

This was a source review plus local Chrome inspection, not a review of the deployed production site. No website implementation was changed during this review.

## What was done correctly

- The compiled Next.js export was replaced with editable Eleventy templates, shared header/footer, CSS tokens, and a real build. `npm run build` succeeds and produces all five public routes plus a 404 document.
- The busy background slideshow, rainbow headings, pulsing glows, unsupported adoption metrics, and empty footer destinations were removed.
- The primary message is clearer, the page has a coherent ivory/ink/cobalt palette, and the two services are distinguished.
- Assets are far smaller: the device scene is 101,320 bytes; the new SVG logo is 647 bytes. The local Lighthouse homepage load transferred about 342 KiB total.
- Workflow tabs support mouse and arrow-key interaction. The gallery changes the actual front/back image, opens an enlarged dialog, closes with Escape, and restores focus to the Enlarge button.
- The contact form preserves entered values after a mocked API failure, re-enables submission, and shows a useful error. Mocked success displays confirmation and resets fields. No real enquiry was sent.
- Theme state persists through one shared root attribute. Reduced-motion testing showed visible hero content with no entrance animation or transform, and smooth scrolling disabled.

## What is pending or incorrect

### 1. [P1] Finish the product artwork; the hero is still a preparation asset

**Locations:** `src/index.njk:19`, `src/index.njk:31`, `src/index.njk:36`, `src/index.njk:85`; reused on Services and About.

The device image contains a blank charcoal monitor screen and a blank phone screen. The generated card campaign contains two blank white cards. There are no overlay elements or composited product screens in the markup. Alt text nevertheless describes software and a mobile view.

The generation prompts intentionally requested blank apertures **for subsequent compositing**. That subsequent production step was omitted. The device scene is repeated across the hero, selected work, Services, and About, so none of those locations shows the software.

**Fix:** recover the original dashboard captures from Git history or obtain approved current product captures. Composite them into the correct screen planes, preserving perspective and legibility. Use a verified responsive view in the phone, or remove the phone. Composite approved front/back card artwork onto the campaign cards. Update alt text to describe the final actual image. Show a complementary detail view rather than repeating one scene everywhere.

### 2. [P1] “Software in action” has no visual software demonstration

**Location:** `src/index.njk:44–69`.

The three workflow tabs only switch a heading and paragraph. A browser check found zero images, SVGs, or canvases in the selected Fees panel. No application preview is rendered there. This misses the large changing screen/detail view required by the brief.

**Fix:** connect each tab to an appropriate real screen or a clearly labeled illustrative preview with coherent demo data. Give the section a stable visual stage so switching workflows does not move surrounding content. Verify any claims about SMS, app notifications, automatic parent alerts, and delivery/read tracking before publishing them; the rebuild supplies no supporting product evidence for these more specific claims.

### 3. [P1] Header demo CTA has unreadable text; dark-mode accents need adjustment

**Locations:** `src/assets/css/site.css:30`, `src/assets/css/site.css:49`, `src/assets/css/tokens.css:31`.

`.site-header nav a` overrides the white foreground of `.btn-primary` because its selector is more specific. The demo button renders `#555D69` on `#2457E7` in light mode, approximately **1.14:1** contrast. Dark mode renders `#A7B0BC` on the same blue, approximately **2.67:1**. Both fail normal text contrast. Dark-mode cobalt kicker text on `#10141B` is approximately **3.16:1**, also insufficient for the 13 px labels.

**Fix:** make navigation button foregrounds explicit, including hover/focus states. Split accent text, button fill, and focus tokens where their contrast needs differ. Use a lighter text accent in dark mode while keeping a sufficiently dark fill behind white button labels. Check desktop, open mobile navigation, and both themes.

### 4. [P1] Homepage overflows at the required 320 px width

**Locations:** `src/assets/css/site.css:142–158`, `src/index.njk:49`.

At 320 px, `document.documentElement.scrollWidth` is **387 px**. The Communications tab extends to approximately x=387.4. The tab row cannot fit its labels and padding within the viewport. Other tested routes fit at this width.

**Fix:** use a deliberately responsive tab layout: wrapping controls, a compact variant, or an accessible contained horizontal scroller that does not widen the document. Preserve visible selected state and keyboard focus. Do not conceal the problem with page-wide overflow clipping.

### 5. [P1] A year of immutable caching is applied to unversioned CSS and JS

**Location:** `vercel.json:9–13`.

All `/assets/*` responses receive `max-age=31536000, immutable`, but templates reference stable URLs such as `/assets/css/site.css` and `/assets/js/site.js`. On a normal browser revisit, updated HTML can therefore be paired with an old stylesheet or script. This can make subsequent fixes appear broken or never arrive for returning visitors.

**Fix:** fingerprint asset filenames or append build-content hashes and update every reference, or use revalidation/shorter caching for stable URLs. Confirm response headers on the real deployment. Local Python-server cache warnings are not evidence of Vercel response headers.

### 6. [P2] Homepage front/back control changes only the button state

**Locations:** `src/index.njk:78–85`, `src/assets/js/site.js:46–59`.

The homepage image is marked `data-card-img`. The handler looks for `data-flip-img` with `data-front-src` and `data-back-src`. Clicking View back sets `aria-pressed="true"`, but the image remains `/assets/img/idcard-campaign.webp`. The visitor is told a change happened when none did.

**Fix:** give the homepage a properly scoped flip group with actual front/back sources and descriptions, or implement the intended layered card composition. Assert that the rendered artwork changes, not merely the ARIA state.

### 7. [P2] Required identity and discovery material was removed

**Locations:** `.eleventy.js:3`, `src/assets/logo.svg:1`, `src/_includes/partials/footer.njk:7`.

- The Google verification file was deleted. The build still declares `src/googlee79f866864b1fffe.html` as a passthrough source, but that source does not exist. The resulting local URL returns **404**. Restore the exact verification file from Git history and confirm it is emitted.
- The valid LinkedIn and Instagram links from the prior footer are absent. Restore those known destinations.
- The authentic logo was redrawn and recolored rather than merely optimized. The brief asked to retain the authentic logo. Restore an optimized approved mark unless the owner explicitly approves the replacement.

The shared layout also lacks canonical URLs and `og:url`; its social image URLs are relative and lack route-specific art direction/dimensions. Complete the metadata after the real campaign artwork is ready.

### 8. [P2] The visual and motion pass is still incomplete

**Locations:** `src/assets/css/site.css:116–118`, `src/assets/css/site.css:225–242`, `src/assets/css/tokens.css:15`.

Only the hero has a staged entrance. Below it, the experience is repeated image blocks, text-only tabs, and static sections. The same 96 px section padding is carried onto small screens. There is no signature product sequence, close-up software detail, card reveal, or transition within the workflow stage. The dark section describes the process instead of making the work itself the visual peak.

Geist is declared in tokens but no font file or `@font-face` is supplied; rendering falls back to system fonts unless Geist happens to be locally installed. No `srcset`/`sizes` or dedicated mobile image crop is present. Lighthouse identified oversized image delivery even though the page is already fast overall.

**Fix:** complete the imagery first. Then use deliberate display typography, tighter mobile rhythm, differentiated work compositions, and one bounded product-focused motion sequence. Add responsive image variants and load the actual chosen licensed fonts. Preserve the good performance and reduced-motion behavior. More ambient animation will not solve missing product evidence.

### 9. [P2] The existing verification overstates coverage

**Location:** `scripts/verify/interactive.mjs:66–74` and the verification notes in `decisions.tsv`.

The card test checks only `aria-pressed` on the gallery. It does not check image changes, the homepage control, or artwork completeness. It therefore cannot catch the confirmed homepage defect. There is no committed Lighthouse result to support the workflow's stated performance-verification target.

Both repository verification scripts fail to launch in this checkout because their expected Playwright Chromium executable is not installed. This is a setup portability issue, not evidence that the website itself fails. The review independently exercised the site through the bundled Playwright runtime and installed Chrome.

**Fix:** document browser installation or provide a supported Chrome channel option. Add outcome checks for the homepage image, gallery image, tab preview, mocked form outcomes, 320 px overflow, and contrast in desktop/open-menu states. Keep screenshots of the completed product, not just button-state assertions.

### 10. [P2] Repository hygiene is unfinished

**Locations:** repository root, `README.md` project structure.

Git tracks **1,830 files under `node_modules/`** and **24 files under `dist/`**. No root `.gitignore` was found. README says `dist/` is gitignored, which is inaccurate. Tracked dependency trees increase diff noise and can carry platform-specific installation artifacts.

**Fix:** add ignore rules, stop tracking dependencies, install from the lockfile in clean environments, and decide whether generated output is intentionally versioned. With Vercel building the source, keeping `dist/` untracked is normally the simpler choice. Correct the documentation to match the chosen policy. Preserve user-owned local files.

## Verification results

| Check | Result |
| --- | --- |
| `npm run build` | Pass: 6 HTML files emitted, 18 passthrough files copied. |
| Five routes at 320, 390, 768, 1024, and 1440 px | All 25 navigations returned 200. Homepage overflow at 320 px; other measured widths fit. |
| Browser JavaScript errors | None during the reviewed interactions. |
| Current local internal link crawl | No failing internal anchor destinations found; required Google verification endpoint separately returned 404. |
| Gallery front/back | Actual image source changes. |
| Gallery enlarged preview | Correct selected side; opens; Escape closes; opener focus restored. Mobile dialog fit the tested 390 × 844 viewport. |
| Homepage View back | Fail: pressed state changes, artwork does not. |
| Workflow click/arrow interaction | Pass for selection and text; visual preview missing. |
| Form success and failure | Pass with intercepted local responses; failure preserves values. No live lead submitted. |
| Image decode | All visible source-backed gallery images decoded when explicitly loaded. The uninitialized image inside the closed dialog is not a broken public gallery asset. |
| Reduced motion | Hero content visible without transform/entrance; smooth scrolling disabled. |
| Bundled Impeccable detector against `src` | Returned `[]`; this scan does not establish visual quality or behavioral correctness. |
| Repository Playwright scripts | Could not launch: browser executable missing. Equivalent relevant behavior checked independently in Chrome. |

### Measured performance

Lighthouse **12.8.2**, local production build served by Python, mobile emulation **412 × 823**, simulated throttling, **4× CPU slowdown**. One development measurement, not a deployed field result:

| Metric | Observed |
| --- | --- |
| Performance | **99/100** |
| Automated accessibility | **100/100** |
| First Contentful Paint | **0.9 s** |
| Largest Contentful Paint | **2.0 s** |
| Total Blocking Time | **0 ms** |
| Cumulative Layout Shift | **0** |
| Total transfer | **342 KiB** |

The automated accessibility result does not cover all states: the desktop header demo action is hidden by the mobile layout used for this audit, dark mode was checked separately, and the 320 px layout differs from Lighthouse's viewport. These manual findings remain actionable despite the score. INP and real-user performance were not measured. Python does not apply Vercel compression/cache behavior, so those server diagnostics need deployment verification.

Technical audit assessment: accessibility **2/4**, performance **4/4**, responsive behavior **2/4**, theming **2/4**, implementation integrity **1/4** = **11/20**, significant work needed. This is a review judgment of the inspected scope, separate from Lighthouse scores.

## Next implementation pass

Give the implementing model this instruction:

> Finish the existing Eleventy rebuild at `f01eb9f`; retain the working source architecture. Read `SIMPEDU_REDESIGN_PROMPT.md` and `REDESIGN_REVIEW.md`. Start by restoring authentic software captures and compositing them into the blank device apertures, then composite approved card artwork. Build real visual previews for the three workflow tabs. Fix header/dark-mode contrast, 320 px overflow, the homepage front/back wiring, and unversioned immutable caching. Restore the Google verification file, approved logo, and existing social links. Verify any newly specific product claims. Complete one purposeful product-focused motion sequence and responsive visual polish. Add meaningful outcome checks and fix repository hygiene. Run the build, desktop/mobile interaction checks, and Lighthouse again. Deliver screenshots of the real work, actual test results, and an honest list of remaining asset or business-evidence dependencies. Do not claim completion while any primary showcase still displays blank production placeholders.

Priority order: complete product evidence and P1 defects; repair missing behavior/material; improve visual composition and motion; finish with typography/spacing/interaction polish.

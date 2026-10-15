# Dashboard replacement prompt and latest checks

Reviewed `ff3d492` on 15 October 2026 after pulling the latest `origin/main`.

## Latest status

Confirmed in the local built site:

- The showcase card is constrained to 300 px.
- All three desktop workflow panels now preserve the same stage height, approximately 323 px.
- Dark-mode selected controls and Paid/Pending statuses use lighter colors.
- Services/About now show existing card photographs rather than blank campaign cards.
- Canonical metadata, absolute social image URLs, and the authentic-logo favicon were added.
- Clean builds produce hashed asset URLs; the homepage front/back control still works with those URLs.
- All five routes returned 200 and fit 320, 390, and 1440 px viewports. Referenced local assets returned 200. No uncaught JavaScript errors occurred in the checked interactions.

The dashboard is unchanged: `src/assets/img/dashboard.webp` still shows 13 students, two teachers, zero fee collections, a sparse enrollment graph, old date/subscription information, and a development badge. Replace it with coherent fictional demo data. Confidential production student or fee records are unnecessary.

The requested finished device composition and broader product-showcase motion remain pending. This was a focused local check, not a new Lighthouse run or deployed-site review.

## Fix this build bug first

`scripts/hash-assets.mjs:30` uses `return` when it encounters an already-hashed filename. This exits traversal instead of skipping one file. The second consecutive build fails at `Object.entries(manifest)` with:

```text
TypeError: Cannot convert undefined or null to object
```

Reproduced: clean build passed; second build failed; rebuilding from a clean generated output passed again. Required correction:

```js
if (/^[a-f0-9]{8}$/.test(name.split('.').pop())) {
  continue;
}
```

Also clean generated `dist` before production builds, or implement deterministic manifest-driven processing that handles existing output. Return the manifest on every successful traversal. Test two consecutive builds and check every emitted asset reference, including front/back data attributes and absolute social image URLs. Replacing the dashboard must change its hash and every consuming page's URL.

## Best way to make the dashboard image

Seed the actual school-management application with a fictional demo school, then capture it in a browser. This preserves genuine product layout, text, and chart geometry. The current website repository contains a raster screenshot, not that application's source.

If the application is unavailable, use the image-edit prompt below as an explicitly illustrative preview, or reconstruct the existing interface with deterministic HTML/chart layers and take a screenshot. Do not call an AI-generated image an actual production screenshot.

### Coherent demo dataset

- Institution: **Simpedu Demo School**.
- Academic year: **2025–26**; snapshot date: **31 March 2026**.
- Students: **1,248**, all active; teachers: **72**, all active.
- Attendance: **1,188 present**, **60 absent**, **95.2%** rounded.
- Academic-year fees billed: **₹30,00,000**.
- Fees collected for that same period: **₹25,20,000**; pending: **₹4,80,000**; collection rate: **84%**.

Fee chart in ₹ lakh, April through March:

| Month | Collected | Pending |
| --- | ---: | ---: |
| Apr | 1.6 | 0.6 |
| May | 1.8 | 0.5 |
| Jun | 1.9 | 0.5 |
| Jul | 2.0 | 0.4 |
| Aug | 2.1 | 0.4 |
| Sep | 2.2 | 0.4 |
| Oct | 2.0 | 0.4 |
| Nov | 2.1 | 0.4 |
| Dec | 2.3 | 0.3 |
| Jan | 2.4 | 0.3 |
| Feb | 2.2 | 0.3 |
| Mar | 2.6 | 0.3 |

Collected sums to ₹25.2 lakh; pending sums to ₹4.8 lakh. Use the same figures in tiles, sidebar, chart, and caption.

Enrollment student totals for Apr–Mar: **1208, 1214, 1221, 1229, 1233, 1237, 1240, 1244, 1246, 1248, 1248, 1248**. If the existing chart supports a teacher series, use **68, 68, 69, 69, 70, 70, 71, 71, 71, 72, 72, 72**. Preserve existing chart behavior; do not invent product features or misleading axes for the image.

## Image-edit prompt

Attach `src/assets/img/dashboard.webp` as the edit target to the image model.

> Edit the attached Simpedu dashboard screenshot into a polished marketing illustration with complete, clearly fictional demo data. Preserve the existing application's logo, sidebar navigation, top bar, typography, light theme, header treatment, four summary tiles, and chart-panel arrangement. Keep it recognizably the same product. Do not redesign the application or add modules.
>
> Replace the school name with “Simpedu Demo School”, show a clear “Demo data” label, and use academic year “2025–26” and snapshot date “31 March 2026”. Remove expired subscription text and the development badge at bottom left. Keep text sharp, correctly spelled, and aligned.
>
> Use these consistent totals everywhere: Total Students 1,248; Total Teachers 72; Attendance 95.2%, representing 1,188 present and 60 absent; Fee Collection 84%, with ₹25,20,000 collected from ₹30,00,000 billed and ₹4,80,000 pending. Match sidebar quick statistics to these values.
>
> Populate Fee Collection with a nonempty grouped bar chart for Apr–Mar, labeled “₹ lakh”, with distinct collected/pending colors and a readable legend. Collected values: 1.6, 1.8, 1.9, 2.0, 2.1, 2.2, 2.0, 2.1, 2.3, 2.4, 2.2, 2.6. Pending: 0.6, 0.5, 0.5, 0.4, 0.4, 0.4, 0.4, 0.4, 0.3, 0.3, 0.3, 0.3. Populate Enrollment Trends with gradual Apr–Mar student totals: 1208, 1214, 1221, 1229, 1233, 1237, 1240, 1244, 1246, 1248, 1248, 1248. Keep axes proportional and legible, without isolated spikes or meaningless decorative curves.
>
> If recent activity is visible, use only nonpersonal demo events such as “Attendance updated — Class 8-B” and “March fee reconciliation completed”. Maintain the existing framing and 16:9 aspect ratio. Output a clean, flat interface image at 2560 × 1440 or another exact 16:9 high resolution. No device mockup, outer browser frame, perspective, camera effects, watermark, invented customer branding, personal student records, or extra decorative interface elements. The website supplies its own browser frame.

Inspect every label, currency symbol, total, and chart before use. If the image model misrenders them, use deterministic text/chart layers or capture the seeded app. Keep the caption **“Illustrative product preview · Fictional demo data”** for generated artwork. An actual seeded application capture can retain **“Demo data shown.”**

## Coding-model integration prompt

> Fix the repeat-build failure in `scripts/hash-assets.mjs` first: skip hashed files with `continue`, always return the manifest, and clean or deterministically rebuild output. Test two consecutive builds.
>
> Replace the sparse dashboard image using the fictional dataset and image-edit prompt in `DASHBOARD_ASSET_PROMPT.md`. Prefer a capture of the actual seeded application. Keep an untouched copy of the previous source asset. Preserve the supported UI and label synthetic imagery as illustrative. Never present real student personal data or claim generated artwork is a production screenshot.
>
> Export a sharp WebP, aiming for roughly 100–200 KB if readable, with correct dimensions. Add responsive variants and a closer mobile detail crop when the full desktop screenshot is too small. Update Home, Services, and About, including captions and alt text. Regenerate the 1200 × 630 social preview from the updated artwork. Build to refresh content hashes. Verify every image URL, homepage/gallery front-back controls, mobile/desktop presentation, and reduced-motion behavior. Report actual results and any unavailable application-source dependency.

Only this prompt/review document was added. No replacement image was generated or installed, and no website implementation was edited, committed, or pushed.

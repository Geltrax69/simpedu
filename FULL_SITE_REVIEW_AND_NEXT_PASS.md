# Simpedu: full-site quality review and next design pass

Reviewed `3a20a4a` on 15 October 2026 after pulling `origin/main`. Scope: Home, Services, ID Cards, About, Contact, shared navigation/footer, source/build pipeline, and key interactive states.

**Verdict: a clean, fast, functioning company website with further work needed to achieve the original ambitious visual brief.** The latest fixes are meaningful and largely correct. The next pass should focus on legible product storytelling, visual authorship, and one memorable interaction while retaining the lightweight implementation.

## Percentage assessment

These are approximate design-review judgments relative to the original brief, not externally validated ratings, conversion forecasts, or award predictions.

| Dimension | Assessment | Why |
| --- | ---: | --- |
| UI craft and hierarchy | 75% | Coherent palette and type hierarchy; repeated layouts, uneven media composition, unfinished small controls. |
| Product storytelling and proof | 65% | Offer is clear; repeated illustrative screenshot and sample cards provide limited evidence of actual work. |
| Purposeful motion | 40% | Hero entrance and tab transition exist; the signature product sequence is still missing. |
| Usability and conversion | 85% | Core actions work; printing intent, small targets, and navigation details need improvement. |
| Engineering readiness | 95% | Repeated builds, lightweight assets, and tested interactions are strong. This is a judgment of inspected code, not a production certification. |
| Overall | Approximately 75% | Weighted 30% UI, 20% storytelling, 10% motion, 20% usability, 20% engineering; rounded from 75.5%. |
| Memorable “wow factor” | Approximately 60% | Professional and calm; the work does not yet have a distinctive, immersive presentation. Separate qualitative impression, not an additional weighted category. |

## Measured results

Local homepage Lighthouse **12.8.2**, default simulated mobile network and 4× CPU slowdown, built files served by Python:

| Check | Result |
| --- | --- |
| Performance | 100/100 |
| Automated accessibility | 100/100 |
| Best practices | 100/100 |
| SEO | 100/100 |
| Largest Contentful Paint | 1.7 s |
| First Contentful Paint | 1.1 s |
| Total Blocking Time | 0 ms |
| Load Cumulative Layout Shift | 0 |
| Total homepage transfer | Approximately 145 KiB |

This is one lab run of the homepage. It does not measure visual quality, actual conversion, all accessibility states, field INP, production response headers, or every other route's layout stability.

Both consecutive `npm run build` executions succeeded. The previous repeat-build bug is fixed. All five routes returned 200 and fit the document width at **320, 390, 768, 1024, and 1440 px**. Desktop/mobile screenshots of all five routes were inspected after loading lazy images. Generated HTML asset references were checked against files in `dist`.

Homepage card front/back changed the image, tabs held a common approximately 323 px desktop stage, theme choice persisted, the mobile menu closed with Escape, and the gallery dialog opened/closed and restored focus. The dialog and Close control fit the tested 320 × 700 viewport. Mocked form failure preserved entries; mocked success confirmed and reset them. No real enquiry was sent. Reduced-motion testing disabled hero and tab animation. No uncaught browser JavaScript errors occurred during these checks.

## Confirmed issues to fix

### 1. [P2] About image reserves the wrong aspect ratio and shifts content

**Location:** `src/about.njk:28`.

The lanyard photograph is **1400 × 1167**, but markup declares **1200 × 800**. With the image response held back, the browser reserves **600 × 400 px**. After decoding, it becomes **600 × 500.14 px**. The row and subsequent content move by approximately 100 px. A zero homepage Lighthouse CLS does not cover this About-page defect.

**Fix:** use the actual dimensions or an intentional fixed-ratio stage with `object-fit` and a deliberate crop. Reserve the final geometry before loading. Audit all other image dimensions when changing assets.

### 2. [P2] Printing CTAs do not preserve the intended enquiry

**Locations:** `src/index.njk:151`, `src/services.njk:69`, `src/id-cards.njk:14`, `src/contact.njk:37`.

“Discuss ID-card printing” on Home and “Discuss printing” on Services open the gallery, not an enquiry form. The gallery's “Discuss your cards” action opens Contact, whose subject defaults to **Book a demo**. Confirmed through the browser journey.

**Fix:** label gallery links “Explore card designs.” Send actual printing-enquiry actions to a dedicated intent URL, for example `/contact/?service=id-cards`, and map that explicit value to the existing ID-card enquiry option. Allow the visitor to change it. Add a demo intent for software actions. Carry a selected design identifier into the enquiry only when the visitor explicitly chooses a design.

### 3. [P2] The new dashboard is coherent but too small to appreciate

**Locations:** `src/index.njk:20`, `src/index.njk:35`, `src/services.njk:42`, `src/about.njk:23`.

The replacement is **2560 × 850**, approximately 3:1. It displays at about **644 × 214 px** in the desktop hero and only roughly 115–122 px tall on mobile. The tiny labels and generous internal whitespace make the software hard to inspect. Repeating the same full dashboard in four locations adds little new information.

**Fix:** create a larger, more vertical product stage. Show one readable workflow crop in the hero, a complete overview in an accessible enlarged view, and complementary detail crops elsewhere. Use a dedicated mobile close-up. Never stretch the screenshot or compress its aspect ratio. Keep synthetic preview labeling on all pages where the reconstructed interface is used; Services/About should not imply that it is a production capture.

### 4. [P2] Small controls and incomplete navigation affordances

**Locations:** `src/_includes/partials/header.njk:14`, `src/_includes/layouts/base.njk`, shared footer.

The Theme button is a native-looking **57.5 × 21 px** control amid custom-designed actions. It has little visual relation to the rest of the site. Navigation has no current-page indication. There is no skip-to-content link. Footer link targets and several secondary controls would benefit from more generous interaction padding.

**Fix:** design a restrained accessible theme control with visible state, a suitable label, and a roughly 40–44 px interaction area; preserve keyboard focus. Add `aria-current="page"` on matching route links and a focus-visible skip link to the existing `#main`. Refine footer spacing and touch areas. Do not describe these findings as a failure of the entire site's automated accessibility score.

### 5. [P2] Contact pending state has no timeout recovery

**Location:** `src/assets/js/site.js:139–158`.

The form handles resolved failures and thrown fetch errors, but has no request timeout. A request that stays unresolved keeps the submit button disabled indefinitely. This is a source-level failure path; the live provider was not intentionally held or contacted for this review.

**Fix:** use an abort timeout, clear it on settlement, preserve entered values, re-enable submission, and explain how to retry or email directly. Test delayed, failed, and successful responses with interception. Keep validation field-associated and clear. Do not send a real lead as a verification step.

## Page-by-page design direction

| Page | Main weakness | Most useful improvement |
| --- | --- | --- |
| Home | Small illustrative software view, repeated two-column stories, weak visual peak. | One art-directed software/card composition followed by a focused demonstration and verified work evidence. |
| Services | Long capability descriptions arrive before the artifact on mobile. | Introduce a readable product detail earlier; group capabilities into three compact outcomes and keep relevant actions close to them. |
| ID Cards | Gallery functions well, but the five items feel like a template catalogue. | Give each sample a specific name, balance portrait/landscape stages, improve material details, and add “Enquire about this design” to the enlarged view. |
| About | Repeats Home's offer without much company-specific evidence. | Show a real founder/team/workshop story, delivery process, and verified work photographs if supplied. Otherwise keep it shorter and factual. |
| Contact | Functional form with a large opening gap and generic default intent. | Compact spacing, intent-aware heading/subject, clear progress/error recovery, and useful reassurance based on actual support arrangements. |

## Highest-impact additions for a modern, memorable result

### A. One signature product scene

Compose a readable school workflow screen and two physical card faces using a shared grid, consistent perspective, and grounded lighting. Give the scene visual depth with controlled layering, not a collection of unrelated floating tiles. Complete the monitor/phone idea from the original brief only if the verified mobile product exists. The screen contents must remain crisp and honest.

A practical alternative is an editorial browser/detail composition using the real brand and an ID-card stack. Whichever direction is chosen, make that scene the visual identity carried across the site. Do not keep blank device scenes as production placeholders.

### B. A product-specific motion sequence

Use one sequence to connect the software and identity services: a readable school record/detail becomes the focus, then its corresponding **fictional sample** card enters the foreground. Explain this as a conceptual relationship unless direct product integration is verified. Keep the experience usable without the animation.

| Moment | Suggested behavior |
| --- | --- |
| Hero artifact arrival | 650–850 ms, 12–20 px travel, slight perspective settling, one focal object. |
| Workflow change | 180–260 ms crossfade/detail translation within the already stable stage. |
| Card front/back | 320–420 ms controlled flip or layered reveal after an explicit button press. |
| Links/buttons | 120–180 ms color/underline response and restrained press feedback. |
| Mobile menu | 160–220 ms panel transition with immediate accessible controls. |

Use existing CSS or Web Animations API where sufficient. Gate hover effects to fine pointers. Reduce positional/perspective effects under reduced motion. Avoid continuous bobbing, mouse-following scenes, custom cursors, global scroll interception, and replaying large reveals on every section. Keep the main interaction interruptible and let users act immediately.

### C. A guided product walkthrough

Add an explicit “See how it works” action that opens a lightweight, keyboard-accessible guided preview. Use the existing supported workflows, with a small number of steps, captions, Close, and Escape/focus restoration. Label illustrative content. Alternatively, offer a short captioned product video loaded only on request, with a static poster. This is more useful than adding decorative motion to every paragraph.

### D. Show verified work and physical craft

Build one software story and one printing story around actual artifacts: the problem, what Simpedu delivered, two or three useful details, and a verified result if available. Use real school names/logos/testimonials only with appropriate permission. Sample templates are useful but do not establish client delivery. A close-up of print finish, lanyard/holder construction, or approved packaging can add tactile richness if it reflects the real service.

### E. Refine typography and rhythm

Keep the established identity and light/ink surfaces. Add more distinctive display typography only if the family is licensed, fast, and materially improves the result. Use balanced headings, intentional line breaks, and shorter measures. Align the visual stages of adjacent stories; a small landscape dashboard and a tall portrait card should not dictate unrelated section heights.

Use roughly 48–64 px mobile section spacing where appropriate instead of applying the same 96 px padding to nearly every section. Preserve breathing room around important product moments. Improve captions, navigation state, button alignment, and subtle structural rules before adding more color.

## Optimization priorities

The homepage is already fast. Preserve that result while investing in better media, rather than rewriting the stack or adding a large animation engine.

1. Add responsive image variants and a dedicated readable mobile crop. Lighthouse flags the oversized 2560 px hero source even though its compressed size is only 57.6 KB. Fix legibility first; do not blur text to shave bytes.
2. Correct image dimensions across routes and keep stable layout during media load, font load, and state changes.
3. Keep hashes and cache policies coherent. Repeat builds now pass, but generated output should be cleaned or stale assets pruned so older hashes do not accumulate indefinitely. Keep backups and unused blank scenes out of the deployed asset set when no longer needed.
4. Make visual media optional or lazy below the fold; prioritize only the actual LCP artifact. Load the guided demo/video on demand.
5. Keep added motion mostly transform/opacity, with bounded paint regions. Measure frame time on a representative slower mobile device; do not assume compositing guarantees smoothness.
6. Verify deployment compression/cache headers and collect field Core Web Vitals when traffic allows. Local Lighthouse cannot establish real-user INP.

Do not add a service worker, client-side framework rewrite, gallery filters for only five samples, or heavyweight 3D merely to signal modernity. Those additions have no demonstrated benefit in this review.

## Next-model implementation brief

> Continue from `3a20a4a`. Preserve the working Eleventy source, repeatable builds, honest demo labels, verified business information, and current performance. Read `FULL_SITE_REVIEW_AND_NEXT_PASS.md` and the original design prompt. Fix the About image geometry, printing-enquiry intent, small shared controls/navigation details, and form timeout recovery. Then complete a distinctive product-focused hero using readable workflow crops and physical card artwork, dedicated mobile art direction, one signature motion sequence, and an accessible guided demo. Replace repeated screenshots with complementary details and improve each route's rhythm and narrative. Use client evidence only when supplied and verified. Keep the existing palette and authentic brand cohesive. Do not add a new framework or animation engine for simple effects.
>
> Test Home, Services, ID Cards, About, Contact, and 404; both themes; 320/390/768/1024/1440 px; keyboard and touch paths; reduced motion; all tab/flip/dialog states; and mocked form pending/failure/success. Confirm two builds pass, no asset references fail, printing CTAs preselect the right subject, and About's image does not shift content. Capture desktop/mobile screenshots and measure performance again. Aim to retain mobile Lighthouse performance at least 95 without sacrificing visual readability. Report actual outcomes and any missing real assets.

No website implementation was edited or pushed during this review. This file is the review and implementation handoff.

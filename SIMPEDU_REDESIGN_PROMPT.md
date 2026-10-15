# Simpedu: website review and implementation prompt

Reviewed 15 October 2026 against the local checkout at `/Users/lalitsingh/WORKS/simpedu_website`.

## What the current website gets wrong

The biggest gap is presentation of the work. Simpedu has tangible material—school software screens and physical ID-card designs—but the homepage uses it as background decoration. Visitors see broad claims before they can appreciate what the company has built.

| Priority | Observed issue | Required change |
| --- | --- | --- |
| High | The homepage puts a large, cropped dashboard screenshot behind its headline, paragraph, buttons, and service panel. These layers compete. | Give the message a clean surface and give the software its own large, legible showcase. |
| High | “Smart Solutions,” “Excellence in Every Solution,” and “Ready to Transform” could describe almost any technology supplier. | Explain the school workflows Simpedu handles, then show the implementation. Lead with specific product value. |
| High | The most prominent foreground graphic is an “Our Services” panel with blue, orange, and green strips. “Fast & Reliable” is presented like a third service. | Replace this panel with a beautifully composed product scene. Clearly distinguish the two actual offerings. |
| High | There are no substantial work stories on the homepage. The ID-card gallery requires a separate visit. | Bring selected software and ID-card work into the homepage, with a clear distinction between client work and sample designs. |
| High | The homepage requests approximately 4.0 MB of images on a fresh local browser load, before counting scripts and fonts. All eight hero backgrounds are requested, including a duplicate. | Use one intentional hero composition. Load additional imagery only when needed. |
| High | `assets/logo2.png` is 545,188 bytes, although the header displays it at about 40 px. | Create an appropriately sized logo asset or use an authentic vector source. |
| Medium | Saturated gradients, multicolor headings, icon tiles, thick borders, glows, oversized shadows, and large hover scaling appear together. | Establish a restrained hierarchy of material, typography, color, and depth. Let product imagery carry richness. |
| Medium | The light-mode closing “View Services” CTA has white text on a very pale fill. | Define explicit foreground/background colors for every button variant and verify contrast. |
| Medium | The hero cycles every five seconds, uses one-second crossfades, and includes pulsing glows. The CSS contains no `prefers-reduced-motion` rule. | Replace ambient movement with a choreographed entrance and one product demonstration; implement reduced motion. |
| Medium | Clicking the theme switch changes surrounding colors, but the homepage still uses `light_bg*` images. The hero reads theme context while the switch changes the root class directly. | Use a single theme state and make media selection consistent with it. |
| Medium | Mobile stacks the same desktop service panel under a tightly cropped dashboard background. | Design a dedicated mobile composition with readable product detail and a shorter opening sequence. |
| Medium | The gallery instructs visitors to hover to flip cards. The mobile menu button lacks `aria-expanded` and `aria-controls`. | Provide explicit tap/keyboard controls, clear state, focus handling, and accessible navigation. |
| Medium | Gallery labels call teacher/manager examples “Student ID Card”; portrait/landscape dimensions appear reversed. | Audit every sample’s identity, orientation, aspect ratio, and description. |
| Medium | The site asserts “10K+” institutions, “70%” workload reduction, “99.9% Uptime,” “24/7 Support,” and broad compliance without supporting evidence in this checkout. Contact lists weekday support hours. | Verify and reconcile claims. Present only substantiated business evidence. |
| Medium | Footer Blog, Careers, Privacy, and Terms links point to `#`. All pages reuse the same broad title. | Remove empty destinations, implement approved pages where supplied, and write route-specific metadata. |
| Medium | The contact page places a tall introduction and four large information cards before the form. | Bring the form and a concise contact explanation into the first useful viewport. |

### Review boundaries

All five public page documents and their relevant compiled scripts/styles were inspected. Local Chrome screenshots covered desktop/mobile homepage, desktop ID cards/contact, mobile About/Services, and desktop dark mode. The four initial page loads produced no uncaught JavaScript errors; the homepage fit the tested 1440 px and 390 px viewport widths.

An ID-card image appeared broken in the first full-page capture; a subsequent fresh-page check found all images loaded. Treat this as an intermittent observation to investigate, not a confirmed missing file. Form submission was inspected in code, not sent. No Lighthouse score, field performance result, or full accessibility certification is claimed.

**Version mismatch:** no iPhone or Studio Display composition was found in this checkout. Current hero assets are dashboard captures and ID-card photos. The prompt below covers the requested device presentation, but the implementing model must inspect any newer source/version before making assumptions.

**Repository constraint:** this is a compiled Next.js export, not a normal editable Next.js project. `package.json` has a no-op build and a Python static server. There is no `app/` or `src/` source tree. The review did not modify the website.

---

## Copy everything below into the implementation model

You are the creative director, product designer, motion designer, and frontend engineer rebuilding Simpedu’s company website. Deliver a complete, working, visually distinctive site that confidently showcases the work Simpedu has created.

The owner wants an ambitious, award-caliber presentation: compelling art direction, beautiful product imagery, expressive typography, purposeful motion, and fast mobile performance. Make the craft visible through composition and product detail. Do not imply the company has won awards.

### 1. Understand the company and inspect the actual project

Simpedu provides school management software and professional ID-card printing. The available website describes student records, attendance, fees, grades, school communications, and administrative workflows. Preserve only features supported by the actual product/source. Likely visitors include school owners, principals, administrators, and institutional purchasing teams. This audience is inferred from the current site, not confirmed market research.

The primary conversion is requesting a demo. ID-card visitors also need an obvious route to discuss printing requirements. The homepage should let visitors understand the offer, appreciate the work, and choose their next step quickly.

Inspect the repository, local instructions, available assets, existing routes, form integration, and any newer implementation before changing files. Start the site and capture the existing desktop/mobile experience. Reuse factual content and working integrations.

The reviewed repository was a compiled Next.js static export. Prefer the original editable source if it is available. Otherwise reconstruct a maintainable source project with reusable components, an actual build command, and deployment configuration appropriate to that stack. Do not hand-edit minified `_next` chunks as the implementation strategy. Keep the existing public routes working: `/`, `/about/`, `/services/`, `/id-cards/`, `/contact/`. Preserve the Google verification file and valid social links. Update Vercel output/cache rules if filenames or build output change.

Use the relevant available skills for interface design, typography, motion, interaction polish, image art direction, accessibility, and optimization. Read their instructions. Avoid applying unrelated document, spreadsheet, plugin, or native-app workflows simply because they are installed.

### 2. Commit to this visual direction

Create a contemporary editorial product showcase with a recognizable Simpedu identity: warm ivory, deep ink, and a single confident cobalt accent. Use the company’s existing blue as a starting point. Retain the authentic logo; simplify its presentation without inventing a replacement brand.

The visual signature is the relationship between **school software and physical identity**: a crisp desktop dashboard, a complementary mobile view if the product supports it, and a beautifully photographed ID card. Connect these objects through alignment, a shared grid, consistent lighting, and carefully staged movement. They should explain what Simpedu makes.

Use large product imagery, asymmetrical layouts, quiet editorial captions, generous but purposeful whitespace, and fine structural rules. Introduce one deep-ink showcase section to create a memorable change of atmosphere. Avoid making every section another rounded card grid.

Suggested starting tokens: ivory `#F6F5F0`, ink `#14181F`, cobalt `#2457E7`, muted text `#555D69`. Validate actual color pairings for contrast. Use surface-specific inverse tokens. Aim for a 1280–1440 px content limit, 48–80 px desktop gutters, and 20–24 px mobile gutters. Use a consistent spacing scale and a small set of radii. Let occasional full-bleed work imagery break the container deliberately.

Keep Geist for body/interface copy if suitable. Give display typography more identity through composition, weight, scale, and deliberate line breaks; add at most one properly licensed display family only if it materially improves the result. Use roughly 72–112 px desktop display text and 40–56 px mobile, adjusted with `clamp()` and tested for wrapping. Keep body text around 16–18 px, unitless line heights, and readable measures. Balance short headings and use natural paragraph wrapping. Never make important copy an image.

Exclude rainbow-gradient headings, emoji section badges, generic glowing blobs, ubiquitous glass panels, default three-column benefit grids, decorative counters, fake award laurels, a custom cursor, and a loading intro. The expression should come from the company’s work.

### 3. Build this homepage narrative

**Opening: a clear promise and a strong artifact.** Use a compact header with Products, Our Work, About, and a prominent “Book a demo” action. These may use existing routes or meaningful section anchors. Provide direct access to ID-card work. Keep the header legible over every surface.

Suggested copy direction, subject to factual review:

> A clearer school day.
>
> School management software and custom ID cards, built around the way your institution works.

Primary CTA: “Book a demo.” Secondary: “Explore our work.” The latter scrolls to an actual showcase. Place the message on a clean background, alongside a large, art-directed product composition. The screen must remain readable and immediately recognizable as school software. Do not set the screenshot behind the headline. Make the opening useful before motion or JavaScript runs.

**Selected work: make the bragging tangible.** Show two substantial visual stories: school management and identity printing. Use one dominant image and one complementary detail in each story. Include concise captions for what was built, the problem addressed, and the company’s contribution. Use verified project names and results only. Without client evidence, label the section “Product & design showcase” and use sample designs transparently. Do not invent case studies, clients, testimonials, or adoption numbers.

**Software in action: show a workflow.** Build a clean, accessible selector for three supported workflows, such as attendance, fees, and communications. Each selection updates a large screen/detail view with a short explanation. Default to a useful visible panel. The interaction must work by click, touch, and keyboard. Show complete, coherent sample states rather than empty graphs. Use real screens with sanitized demo data. If you build an illustrative preview, label it as such and do not imply it is a captured shipping product screen.

**Identity as a physical product.** Use a tightly art-directed display of a card front, card back, material edge, and lanyard detail. Show two or three strong examples before linking to the full gallery. Present verified customization and printing capabilities. Provide visible “View back” / “View front” controls instead of requiring hover.

**Proof and delivery.** Use verified customer evidence if supplied. Otherwise explain the supported implementation process clearly: requirements, setup/customization, onboarding, and ongoing support, with factual review of each step. Keep this concise. Do not turn the absence of evidence into invented metrics.

**Closing action.** End with a strong typographic invitation, one primary demo CTA, and a quieter route to ID-card enquiries. Replace the large multicolor gradient block. Carry the same restraint into the footer. Remove dead links and unsupported assurances.

### 4. Fix the iPhone and Studio Display presentation

If newer assets already contain these devices, inspect them first. Problems to eliminate: distorted device geometry, wrong screen ratios, unreadable AI-generated text, floating hardware, inconsistent perspective, fake reflections, generic empty dashboards, mismatched lighting, and crowded overlap.

Use a sharp real dashboard screenshot inside a correctly proportioned desktop screen. A Studio Display-style screen is 16:9. Preserve proportions and show enough of the UI to establish credibility. Use a closer crop elsewhere to reveal detail rather than forcing the full desktop UI into a tiny thumbnail.

Only put the product in an iPhone if the mobile experience exists. A responsive web view is acceptable when supported; do not imply a native app or parent app without evidence. Match the aperture, corner radius, perspective, and safe areas of the chosen device model.

Preferred production technique: obtain authentic mockups or generate device shells, then composite real UI using deterministic image layers or HTML/CSS masks. Keep the UI separate from the environment so it remains crisp, editable, and theme-consistent. Screen position and perspective must match exactly. An almost frontal camera simplifies this. Never ask an image model to invent the final dashboard text.

Use one consistent scene: satin aluminum, controlled softbox highlights, gentle cobalt reflected light, grounded contact shadows, believable scale, and uncluttered negative space. The devices support the product; avoid letting hardware dominate it. On mobile, use a dedicated tighter crop or one device/detail, not a scaled-down desktop scene.

### 5. Choreograph motion

Design one memorable sequence: the desktop screen settles into place, the ID card reveals its front/back relationship, and one supported workflow comes into focus. Keep each prominent movement sequential so the visitor knows where to look.

| Element | Motion specification |
| --- | --- |
| Hero copy | Short semantic groups, 12–20 px upward travel, opacity reveal, roughly 450–650 ms, 40–50 ms stagger; readable immediately if enhancement fails. |
| Hero product | Gentle 16–24 px translation or small perspective correction over roughly 700–900 ms; no perpetual bobbing. |
| Showcase entry | One-time image/detail reveal over roughly 500–700 ms. No animation gate on reading or interaction. |
| Workflow selection | Roughly 180–260 ms transition, stable container dimensions, no flash or content jump. |
| Buttons/links | 120–180 ms targeted transitions; subtle press scale around 0.97, clear static focus/active feedback. |
| ID-card flip | Explicit toggle, roughly 350–450 ms, controlled perspective, backface handling, correct focus/reading state. |
| Optional desktop scroll scene | One short, bounded sticky sequence only if it explains the product; ordinary document flow on mobile. |

Use a coherent ease-out curve such as `cubic-bezier(0.22, 1, 0.36, 1)` for editorial reveals. Keep routine controls faster than showcase movement. Use CSS/WAAPI for simple predetermined sequences; add a motion library only where it earns its cost. Prefer transforms and opacity. Measure clip-path, blur, shadows, and large composited layers on the actual target browser instead of assuming they are cheap.

Preserve native scrolling. Do not require users to finish an animation before clicking. Avoid continuous parallax and page-wide mouse tracking. Gate hover effects to fine pointers. Pause nonessential activity offscreen and when the tab is hidden.

Honor `prefers-reduced-motion`: remove positional reveals, perspective changes, parallax, and pinned sequences; keep content and controls available with immediate changes or brief fades. Preserve complete content if observers or animation initialization fail.

### 6. Give every page the same level of craft

- **Services:** separate the two offerings through substantial product imagery and concrete capabilities. Replace feature-list overload with small, understandable groups. Give each offering a relevant CTA.
- **ID cards:** use correct aspect ratios, accurate sample names, clear front/back state, tap/keyboard controls, and accessible enlarged viewing. Audit asset loading and reserve image space. Do not present sample templates as completed client commissions.
- **About:** show verified company information and the work behind it. Replace unsupported “industry leader,” “global reach,” and institution counts with accurate material. Use real team/workshop photographs if supplied; do not generate fictional employees and present them as staff.
- **Contact:** put a concise intro and usable form near the top. Preserve the existing Web3Forms integration and field mapping unless intentionally replacing it. Keep the existing business email, telephone, and address unless the owner supplies updates. Make phone/email actionable. Provide pending, success, validation, and failure states; preserve input after failure. Do not make a real test enquiry without authorization.
- **Shared system:** accessible mobile navigation, consistent buttons, proper heading order, visible focus, sensible touch targets, and a useful footer. Preserve the theme toggle if retained, with shared state, suitable media, and no initial theme flash.

### 7. Image-generation prompts

Generate only assets that improve the site. Use the image tool available in your environment and save final assets in the project. Keep website copy, logos, product screens, card text, barcodes, and QR codes as authentic separate layers. Use sanitized demo identities. Mark illustrative work appropriately.

**A — Main product scene, desktop base**

> Premium editorial product photograph for Simpedu, a school software and identity company. A single satin-silver Apple Studio Display-style monitor on a warm ivory seamless surface, almost frontal with a very slight three-quarter angle, physically accurate 16:9 screen, elegant thin black bezel and believable aluminum stand. A restrained dark titanium iPhone stands vertically beside the monitor at a complementary shallow angle, with accurate geometry and an unobstructed screen aperture. Both screens are uniform neutral charcoal placeholders for later compositing. Large softbox key light from upper left, subtle cobalt reflected light, soft grounded contact shadows, restrained reflections, tactile materials, generous negative space, precise premium commercial photography. Wide 3:2 composition, entire devices comfortably inside frame, no cropped stand. No text, no invented UI, no watermark, no extra devices, no floating objects, no dramatic neon, no lens flare. The devices must share one camera perspective and lighting setup.

Use only the monitor if the mobile product is unverified. Composite authentic screens afterward; this prompt creates a scene base, not a finished product screenshot.

**B — Mobile-specific device scene**

> Portrait 4:5 premium studio product photograph matching the same Simpedu campaign: warm ivory surface, dark titanium iPhone with physically accurate proportions, almost frontal screen facing camera, slight natural perspective, screen aperture clearly visible and filled with uniform neutral charcoal for later compositing. One simple unprinted white ID card rests beside it with a subtle cobalt edge reflection. Softbox light from upper left, grounded soft shadows, precise materials, generous breathing room, calm editorial composition, restrained contrast. No text, no invented UI, no branding, no extra phones, no hands, no watermark, no floating objects.

Use only if the mobile experience is supported. Otherwise create a close desktop-screen crop for mobile.

**C — Physical ID-card campaign**

> High-end product photograph of two blank institution ID cards and one neatly arranged navy woven lanyard on a warm ivory studio surface. One card shows its front plane, the other its back plane, with clean standard ID-1 proportions, subtly rounded corners and believable thin PVC edges. One card rests on a low rectangular plinth; the other lies naturally on the surface. Controlled softbox lighting from upper left, gentle contact shadows, fine satin surface texture, subtle cobalt reflected light, restrained commercial photography, no dramatic plastic shine. Landscape 3:2 framing with generous margins. Blank card faces for accurate artwork compositing. No names, portraits, letters, QR codes, barcodes, invented school logos, extra straps, metal distortions, or watermark.

Composite actual approved front/back artwork afterward. Keep materials consistent with what Simpedu actually prints.

**D — Material detail, optional**

> Macro product photograph matching the Simpedu identity campaign, closely observed edge of an unprinted white PVC ID card beside a sharply rendered metal lanyard clip and navy woven strap. Warm neutral backdrop, soft directional light, tactile weave and restrained metal reflections, shallow but controlled depth of field, elegant negative space. Physically plausible card thickness and clip mechanism. No text, logos, holograms, security claims, watermark, extra objects, or glossy CGI appearance. Landscape 3:2 composition.

These are supporting assets. The real software and approved card designs remain the principal evidence of the company’s work.

### 8. Performance, accessibility, and reliability

Replace the eight-background carousel. Use responsive AVIF/WebP assets, explicit dimensions/aspect ratios, appropriate `srcset`/`sizes`, and distinct mobile crops where needed. Prioritize the actual LCP image; lazy-load below-the-fold images. Remove duplicate asset requests. Keep the header logo lightweight, ideally below 15 KB where quality permits. Treat a roughly 200–350 KB hero and an initial image budget below about 700 KB as engineering targets to validate against fidelity, not excuses to visibly degrade the product.

Use static/server-rendered content where appropriate, isolate interactive code, and avoid shipping a heavy 3D engine for a single device composition. Subset/self-host only licensed font weights actually used. Avoid layout shifts during fonts, media, tab changes, and sticky behavior. Match cache strategy to asset versioning so changed images do not stay stale for a year.

Target LCP ≤2.5 seconds, INP ≤200 ms, and CLS ≤0.1 at the 75th percentile of real visits. Use Lighthouse and local traces as development evidence; do not claim they establish field INP. Aim for mobile Lighthouse performance ≥90, report actual measurements and conditions, and explain any remaining bottleneck. See [Google’s Core Web Vitals guidance](https://web.dev/articles/vitals).

Verify text contrast, focus visibility, form labels/errors, screen-reader state, 44 px touch targets where practical, keyboard-operated tabs/gallery/navigation, and Escape/focus restoration in overlays. Test at 320, 390, 768, 1024, and 1440 px, with enlarged text and reduced motion. See [MDN’s reduced-motion reference](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion).

Write unique titles/descriptions for existing routes, correct social preview images and dimensions, meaningful alt text, and structured data limited to verified business facts. Keep important content in semantic HTML.

### 9. Execution and acceptance

Proceed through inspection, a concise visual rationale, implementation, asset integration, and verification. Resolve routine design choices yourself within this brief. Record assumptions about missing business evidence. Keep unavailable claims out of production copy and list missing proof separately in the handoff.

Deliver the complete site, not only a plan or hero prototype. Use reusable source components, shared design tokens, and a central content/asset structure. Preserve existing public behavior unless this brief explicitly improves it.

Perform one combined desktop/mobile review, fix the issues found, then make one confirmation pass. Check all existing routes, navigation, button destinations, image decoding, theme behavior, form states without sending real leads, keyboard controls, reduced motion, and browser errors. Run the actual build. Provide screenshots and measured performance results with conditions.

The work is complete when:

1. The opening clearly explains Simpedu and immediately showcases something it built.
2. Software screens are crisp and purposeful; device composition is physically credible.
3. Identity-printing work is visible on the homepage and useful on its dedicated page.
4. Layout, typography, color, and imagery feel intentionally authored for Simpedu.
5. Motion creates a memorable product story and remains comfortable and usable on mobile.
6. Every route and primary action works; no dead links, invented proof, broken imagery, or unreadable CTA remains.
7. Performance and accessibility checks have actual evidence, and the source is maintainable.

Finish with a concise handoff explaining what changed, how it was checked, where any missing real assets or verified business facts are still needed, and how to run/build the project.

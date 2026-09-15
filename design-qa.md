# HealthGuard Landing Page Design QA

## Comparison target

- Source visual truth: `C:\Users\Kinjal Pramanik\Downloads\Codex Image Sep 4, 2026, 05_00_24 PM.png`
- Source hero asset supplied later by the user: `C:\Users\Kinjal Pramanik\Downloads\ChatGPT Image Sep 4, 2026, 03_42_13 PM.png`
- Browser-rendered implementation: `C:\Users\Kinjal Pramanik\Documents\Codex\2026-08-30\mk\outputs\healthguard\artifacts\qa\landing-desktop.png`
- Narrow implementation: `C:\Users\Kinjal Pramanik\Documents\Codex\2026-08-30\mk\outputs\healthguard\artifacts\qa\landing-mobile.png`
- Full comparison evidence: `C:\Users\Kinjal Pramanik\Documents\Codex\2026-08-30\mk\outputs\healthguard\artifacts\qa\landing-comparison-sheet.png`
- Focused comparison evidence: `C:\Users\Kinjal Pramanik\Documents\Codex\2026-08-30\mk\outputs\healthguard\artifacts\qa\landing-focused-comparison.png`
- State: anonymous public landing page, top-to-footer.

## Viewport and normalization

- Source pixels: 724 × 2172. The source is a generated visual target with unknown CSS viewport and density.
- Desktop implementation: 1440 × 3843 pixels from a 1440 × 1000 CSS viewport at device scale factor 1.
- Mobile implementation: 390 × 4515 pixels from a 390 × 844 CSS viewport at device scale factor 1.
- Full-view normalization: both source and implementation were resized to 724 pixels wide and placed in one 1514 × 2240 comparison image. The implementation was not cropped vertically.
- Focused normalization: source and width-normalized implementation crops were fitted to matching 724 × 430 panels for header/hero, My Health, and workflow/footer comparison.

## Required fidelity surfaces

- Fonts and typography: hierarchy, line wrapping, weight, and condensed display character follow the target. The implementation is intentionally slightly stronger in weight for accessibility at small sizes, without changing the target's editorial structure.
- Spacing and layout rhythm: header, two-column hero, centered platform introduction, four-card viewport, records split, narrative row, and navy footer preserve the target order and proportions. Mobile collapses to a clear single-column narrative with horizontal rails.
- Colors and tokens: pale clinical teal-white canvas, restrained teal controls, quiet cyan cards, dark navy footer, and coral highlights contained in the supplied hero art match the source palette.
- Image quality and asset fidelity: the user-supplied transparent healthcare ecosystem illustration is used directly. The records section uses a generated, privacy-safe lifestyle photograph with abstract, non-identifying dashboard content. Both assets are sharp, correctly cropped, and reserve layout space.
- Copy and content: requested labels are present. Fabricated patient testimonials were not copied; the same visual region is implemented as clearly labeled capability stories.
- Icons and affordances: Lucide icons are consistent, accessible names are present on icon-only carousel controls, links are semantic, and disabled arrow states are truthful.
- Responsive behavior: 1440 and 390 CSS widths have no document-level horizontal overflow in Playwright. Long content remains reachable and all primary calls to action retain 44px-class targets.

## Browser and interaction evidence

- In-app browser page identity: `Family health, organised — HealthGuard` at `http://127.0.0.1:5500/`.
- DOM snapshot contained the full semantic page and no framework error overlay.
- In-app browser console: no warnings or errors.
- Interaction proof: `Explore the platform` navigated to `/login` and rendered `Welcome back to HealthGuard`.
- Carousel proof: activating `Show next platform feature` enabled the previous control and advanced the rail.
- Automated route proof: Sign Up opened `/register`; Login and all four named product calls to action opened `/login`.

## Findings

No actionable P0, P1, or P2 findings remain.

Acceptable differences:

- The source's unverified personal testimonials were replaced with truthful product-capability stories.
- The records photograph is an original privacy-safe asset rather than a pixel-identical copy of the concept image.
- The generated source has no reliable CSS viewport metadata, so full-page normalization is width-based rather than a claimed one-to-one CSS comparison.

## Comparison history

### Iteration 1

- [P2] Full-page mobile evidence skipped the offscreen workflow section because `content-visibility: auto` deferred painting during capture.
- [P2] Hidden mobile `<br>` elements joined adjacent words in section headings.
- Fixes: removed deferred content visibility from long landing sections and preserved deliberate heading line breaks at narrow widths.
- Post-fix evidence: `landing-mobile.png` contains the full workflow section, correctly separated heading words, and the complete footer.

### Iteration 2

- Full and focused combined comparisons found no remaining P0/P1/P2 mismatch.
- Header/hero, platform cards, records split, workflow section, and footer preserve the source's visual hierarchy and product story.

## Follow-up polish

- [P3] If a future licensed font is introduced, the public display face could be tuned even closer to the concept's exact letterforms. The current system-font stack avoids a blocking font request and remains layout-stable.

## Final result

final result: passed

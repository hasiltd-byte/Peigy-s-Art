# Validation — 31 October 2026

The redesigned site was checked as a Next.js static production export, served locally with gzip and cache headers. These results describe local testing, not a deployed PageSpeed measurement.

## Build and browser checks

- `npm.cmd run build` passes, including TypeScript and static generation of the home page, legal pages, robots.txt and sitemap.xml.
- `scripts/qa-site.cjs` passes on Chrome at widths 320, 390, 700, 800, 1024 and 1440 pixels, with no horizontal overflow.
- Gallery filtering, image enlargement, previous/next controls, Escape and focus restoration pass.
- Request basket selection, quantities, removal, empty state and WhatsApp message contents pass. No messages were sent.
- Contact form, FAQ, mobile navigation, image loading and internal anchors pass, with no page JavaScript errors.
- The 3D frame's slider, automatic rotation, pause at the displayed angle, pointer dragging and global animation pause pass.
- Reduced-motion rendering and desktop/mobile screenshots were checked. Local screenshots are in `.qa/`.

## Lighthouse mobile

| Category / metric | Final measurement |
| --- | --- |
| Performance | 88 |
| Accessibility, automated checks | 100 |
| Best practices | 100 |
| First Contentful Paint | 1.2 seconds |
| Largest Contentful Paint | 3.5 seconds |
| Speed Index | 1.8 seconds |
| Total Blocking Time | 210 milliseconds |
| Cumulative Layout Shift | 0.002 |

The initial measurement was 66 for performance and 96 for accessibility. Follow-up changes added responsive local image variants, high priority for the hero photograph, lower priority for later imagery, Hebrew-only font subsets, text compression, cache headers and stronger text contrast. The final report has no run warnings. The machine was also running local browser checks; measurements vary with hardware and hosting.

## Content limits

Facebook exposed the public logo and studio description, which were incorporated. Albums and posts were unavailable without login. The remaining photographs are clearly marked stock inspiration images, with sources in `PHOTO_SOURCES.md`. The shop prepares requests for availability and price; it does not process payments or claim verified inventory. The rotating object is a CSS frame containing a photograph, not a scan of an original artwork.

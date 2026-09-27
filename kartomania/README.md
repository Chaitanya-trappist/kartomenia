# Kartomania

A responsive React website for Kartomania's outdoor karting circuit at Entertainland Mall, Gurugram. Built with Vite, React Router, and a shared charcoal/orange design system.

## Run locally

Use Node.js 22.12 or newer. In WSL, use a Linux Node installation, not Windows npm on a UNC path.

```sh
npm ci
npm run dev
```

## Validate and build

```sh
npm run test
npm run lint
npm run build
npx playwright install chromium
npm run test:e2e
```

Browser tests run against the production build on `127.0.0.1:4173`, with desktop and mobile Chromium projects. They check routes, price changes, keyboard interactions, media playback and failure handling, enquiry validation, responsive overflow, and automated WCAG accessibility rules. The browser suite does not submit enquiries or make real bookings.

The lint command also scans existing experimental components and the [scratch scripts](./scratch); their pre-existing unused-variable warnings are separate from the active site.

## Structure

- [App](./src/App.jsx): canonical routes, legacy redirects, lazy-loaded secondary pages, and error recovery.
- [Layout](./src/components/Layout.jsx): persistent navigation/footer, route titles, scroll and focus handling, and mobile booking.
- [Components](./src/components): reusable page sections, native dialogs, pricing, gallery, and visitor information.
- [Site configuration](./src/data/siteConfig.js): contact information, links, hours, navigation, and session duration.
- [Kart data](./src/data/kartsData.js), [pass data](./src/data/packagesData.js), [gallery data](./src/data/galleryData.js), and [FAQs](./src/data/faqData.js): shared content rather than repeated page-local copies.
- [Styles](./src/index.css): design tokens, layouts, responsive rules, focus states, and reduced-motion support. Tailwind is restricted to the existing icon utilities so unused experimental components do not inflate the production stylesheet.
- [Tests](./tests): pricing/content/enquiry unit tests and browser regressions.

## Typography and interaction guidelines

- Keep Barlow Condensed for racing headings and Inter for reading text and controls. Shared type tokens use 16px body copy, 14px supporting text/controls, and 12px captions at the default browser font size; mobile layouts do not shrink them below these sizes.
- Prices use tabular numerals for stable comparisons. Qualifying lap information stays visually separate from speeds and prices, without changing its wording.
- Primary controls, social links, and footer navigation provide at least 44px-tall targets. Day selectors announce their state and identify the sections they update.
- Keep the primary mobile hero booking action visible above the fixed booking bar. Hide that bar while the enquiry form has focus so it does not compete with form controls. Respect reduced-motion settings and preserve keyboard focus indicators.
- Visual changes must not change the confirmed catalogue, qualification times, pricing, or offers.

## Content and booking

- The owner-confirmed catalogue contains three racing levels and a separate **Junior** kart: **L1 — 65 km/h; L2 — 85 km/h; L3 — 100 km/h**. L2 requires a **47-second lap in L1**, and L3 requires a **43-second lap in L2**. These are displayed as qualifying lap times; the website does not perform eligibility checks or impose an unconfirmed strict/inclusive timing cutoff.
- Names, speeds, and qualification references are centralized in [kart data](./src/data/kartsData.js), with shared [qualification formatting](./src/utils/karts.js) for cards and FAQs. The homepage maximum speed is derived from the same racing levels. Junior replaces the previous L4 label; existing `/karts#l4` links still focus the Junior card.
- Existing photos and prices are unchanged. Junior speed, age, height, and qualification details have not been supplied and are not invented. Do not restore old engine, seating, electric, or other unconfirmed claims from legacy code.
- Standard single sessions are **7 minutes**, as confirmed by the site owner. The existing 5-session pass separately advertises 10-minute track sessions; its published inclusion has been retained.
- Age and height requirements must be confirmed with the team; the FAQ does not infer them from unverified kart categories.
- Existing single-session, repeat, weekday/weekend, and 5/10/15/20-pass prices are preserved. Approximate per-race pass prices include bonus sessions and are rounded down, matching the existing presentation.
- All booking links open the existing RaceFacer kiosk in a new tab. They do not claim a kart or time has already been reserved.
- Contact forms validate locally and prepare a WhatsApp draft. Visitors review the draft and explicitly open WhatsApp; nothing is sent until they send it there. There is no enquiry backend, database, or automatic success message.
- Track specifications and safety/gear descriptions are venue-provided content. The venue should verify operational claims before publishing.

## Media and performance

The hero is a locally hosted photograph. Videos are mounted only after the visitor chooses to watch; closing the native dialog removes the player. Maps similarly load only on request. Secondary pages are code-split, and offscreen images load lazily.

The existing [Entertainland source video](./public/videos/entertainland-gokarting.mp4) is a Git LFS pointer to a 245.9 MB original. Its contents were restored and verified against the recorded SHA-256, then encoded as [entertainland-racing-720p.mp4](./public/videos/entertainland-racing-720p.mp4), a self-contained 720p/30fps H.264/AAC version with fast-start metadata. The active gallery uses this approximately 21 MB asset, not the LFS pointer. The source duration and audio are retained.

```sh
ffmpeg -i entertainland-original.mp4 -map 0:v:0 -map 0:a:0 \
  -vf 'scale=1280:-2,fps=30' -c:v libx264 -preset medium -crf 26 \
  -c:a aac -b:a 96k -movflags +faststart entertainland-racing-720p.mp4
```

## Deployment

Deploy the generated `dist` directory to a static host. Configure a fallback to `index.html` for client-side routes such as `/packages` and `/contact`, while serving existing assets normally. Vite preview is for local verification, not a production server.

## Design references

The redesign uses venue-discovery and race-selection patterns observed on [K1 Speed](https://www.k1speed.com/) and [TeamSport](https://www.team-sport.co.uk/): clear race choices, visible booking, eligibility before purchase, and easy-to-find directions. The design and implementation are original; existing Kartomania branding, photography, and information are retained.

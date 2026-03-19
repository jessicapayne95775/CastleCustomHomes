# Castle's Custom Homes — Website

Static HTML/CSS/JS website for Castle's Custom Homes, Twin Falls, Idaho.
No build tools, no frameworks, no dependencies — open `index.html` and it works.

---

## Quick Start

```bash
# Open directly in browser (works for most things)
open index.html

# OR serve locally to avoid any font/CORS issues:
cd CastleCustomHomes
python3 -m http.server 8080
# Then visit http://localhost:8080
```

---

## Folder Structure

```
CastleCustomHomes/
│
├── index.html                  ← Home page
│
├── pages/                      ← One HTML file per page
│   ├── residential.html        — Custom Residential Homes
│   ├── your-lot.html           — Build on Your Lot
│   ├── remodel.html            — Remodels & Renovation
│   ├── gallery.html            — Photo gallery with category filters
│   ├── for-sale.html           — Available Homes (sidebar city filter)
│   ├── lots.html               — Available Lots (3-tier sidebar filter)
│   ├── about.html              — Meet the Team (7 team members)
│   ├── our-story.html          — Company story + photo placeholders
│   ├── community.html          — Community involvement page
│   ├── partners.html           — Trade partners, lenders, title co.
│   ├── financing.html          — Mortgage calculator + financing options
│   └── contact.html            — Contact form + office info
│
├── css/                        ← Stylesheets, split by concern
│   ├── variables.css           ← START HERE — all colors, fonts, spacing
│   ├── global.css              — Buttons, section headers, shared components
│   ├── nav.css                 — Fixed nav bar + full-screen overlay menu
│   ├── footer.css              — Site footer
│   ├── home.css                — Home page only (hero, services, about split, etc.)
│   ├── pages.css               — Interior page components (team cards, filters, etc.)
│   └── testimonials.css        — Testimonial carousel (loaded on index.html only)
│
├── js/                         ← JavaScript, one file per feature
│   ├── nav.js                  — Hamburger, overlay, sub-menus, scroll transparency
│   ├── reveal.js               — Scroll-triggered fade-up animations
│   ├── testimonials.js         — Paginated review carousel (home page)
│   ├── gallery.js              — Gallery page category filter
│   ├── calculator.js           — Mortgage payment estimator
│   └── contact.js              — Contact form handler (currently shows success msg)
│
└── assets/
    ├── _nav.html               — Nav HTML snippet for reference when adding pages
    ├── _footer.html            — Footer HTML snippet for reference
    └── images/                 ← Drop real project photos here
```

---

## How to Make Common Changes

### Change a brand color
Edit `css/variables.css` — all colors are CSS custom properties at the top.
Changing `--crimson` here updates every button, border, eyebrow label, and accent site-wide.

### Change a font
1. Update the Google Fonts `<link>` URL in **every** page's `<head>`
2. Update `--font-serif` or `--font-sans` in `css/variables.css`

### Edit a page's content
Open the relevant file in `pages/` and edit the HTML directly.
Each file is self-contained with its nav, content, footer, and scripts.

### Edit the home page
Edit `index.html` in the root folder.

### Add a new page
1. Copy the closest existing page as a starting point
2. Update the `<title>` tag and `<meta name="description">`
3. Update `data-nav-style` on `<body>`:
   - `data-nav-style="hero"` — transparent nav (home page only)
   - `data-nav-style="solid"` — always dark nav (all other pages)
4. Add a link to it in the nav overlay of `index.html` and every `pages/*.html` file
   - `index.html` uses the `pages/` prefix: `href="pages/yourpage.html"`
   - `pages/*.html` files use no prefix: `href="yourpage.html"`
5. Add a link in the footer columns too

### Update nav links
The nav HTML is duplicated in `index.html` and every file in `pages/`.
When you add a new page or rename an existing one, you need to update **all** nav instances.
The `assets/_nav.html` file is a reference copy — it is NOT loaded automatically.

---

## Key Design Decisions

### Typography
- **Cormorant Garamond** (serif) — headings, large numbers, italic accents, signatures
- **Jost** (sans-serif) — all body copy, labels, buttons, navigation

### Color usage
- Dark sections (`--dark: #1C1A17`) — nav overlay, sidebar filters, hero backgrounds, CTA bands
- Cream sections (`--cream: #F5F1EA`) — alternates with white for visual rhythm
- Crimson (`--crimson: #A8213A`) — primary buttons, borders, eyebrow lines
- Crimson-light (`--crimson-light: #C4324E`) — hover states, eyebrow text, step numbers
- Gold-light (`--gold-light: #D4B47A`) — headings and numbers on dark backgrounds only

### Fluid sizing with clamp()
Font sizes, padding, and gaps all use `clamp(min, preferred, max)` so they
scale smoothly between screen sizes without needing many breakpoints.
Example: `font-size: clamp(28px, 3.8vw, 58px)` — 28px on phones, scales with viewport, caps at 58px on large screens.

### Nav transparency system
The `data-nav-style` attribute on `<body>` controls whether the nav bar starts
transparent or solid. `nav.js` reads this attribute on load:
- `"hero"` → transparent, darkens after 60px scroll (home page only)
- `"solid"` → always dark (all other pages)

---

## The Testimonials Carousel (index.html)

All review cards live in `#t-card-pool` (a hidden div) in `index.html`.
`testimonials.js` reads them and dynamically builds paginated pages based on screen size:
- Desktop (>768px) → 3 cards per page
- Tablet (481–768px) → 2 cards per page
- Phone (≤480px) → 1 card per page

**To add a new review:**
1. Open `index.html`
2. Find the `<div id="t-card-pool">` section
3. Copy an existing `.testimonial-card` block and paste it inside the pool
4. Update the text, author, location, and rating (`<span class="t-rating">`)
5. The carousel automatically recalculates pages — no other changes needed

---

## The For Sale & Lots Filters

Both pages use a **dark sticky sidebar** (desktop) that becomes a **slide-in drawer** (mobile ≤860px).

### For Sale (`pages/for-sale.html`)
- City-only filter
- Each `.lot-card` has `data-city="twin-falls"` (etc.)
- Filter logic is inline `<script>` at the bottom of the file

### Lots (`pages/lots.html`)
- 3-tier cascading filter: City → Acreage → Subdivision
- Subdivision options are defined in the `SUBDIVISIONS` JS object at the top of the inline `<script>`
- Each `.lot-card` has `data-city`, `data-acreage`, and `data-subdivision` attributes

**To add a new listing (either page):**
Copy an existing card and update the `data-*` attributes and content.
The filter automatically includes new cards — no JS changes needed.

**To add a new subdivision:**
Edit the `SUBDIVISIONS` object in `lots.html`'s inline `<script>`:
```javascript
const SUBDIVISIONS = {
  'twin-falls': [
    { value: 'riverbend',    label: 'Riverbend'    },
    { value: 'your-new-sub', label: 'Your New Sub' }, // ← add here
  ],
  // ...
};
```

**To add a new city to the filters:**
1. Add a button in the sidebar and drawer HTML (both in the same file)
2. Add `data-city="your-city"` to the relevant cards

---

## The Partners Page (`pages/partners.html`)

All partner cards currently have placeholder names and a light italic note:
*"Replace with your actual framing partner"*

To update a partner:
1. Find the `.partner-card` block for that category
2. Replace the `<p class="partner-card-name">` and `<p class="partner-card-desc">` content
3. Delete the `<p class="partner-card-note">` line once it's real

---

## Replacing Placeholder Photos

All images currently use Unsplash URLs (free, no attribution required for web use).
To swap in real Castle's photos:
1. Add your photos to `assets/images/` (e.g. `assets/images/front-exterior.jpg`)
2. Find the `src` or `background-image` URL in the relevant HTML file
3. Replace the Unsplash URL with `../assets/images/your-photo.jpg`
   (use `../../assets/images/` if linking from within `pages/`)

The two **group photo placeholders** on `our-story.html` are intentionally blank
with placeholder boxes. Replace each `<div class="story-photo-placeholder">` with:
```html
<img src="../assets/images/team-photo.jpg" alt="Castle's team">
```

---

## Wiring Up the Contact Form

The form in `pages/contact.html` currently shows a success message on submit
but does NOT send any data anywhere. See `js/contact.js` for wiring instructions.

Simplest option — Formspree (free tier available):
1. Create an account at formspree.io
2. Get your form endpoint URL
3. Add `action="https://formspree.io/f/YOUR_ID" method="POST"` to the `<form>` tag
4. The `handleFormSubmit()` JS function can then be removed

---

## Contact Info (update here if it changes)

| Person | Role | Email | Phone |
|---|---|---|---|
| Kyle Castle | President, General Contractor | kyle@castlescustomhomes.com | (208) 309-1547 |
| Tammy Castle | Co-Founder, Operations | tammy@castlescustomhomes.com | (208) 309-1549 |

**Address:** 1334 Falls Ave East, Twin Falls, ID 83301
**Instagram:** @castlescustomhomes
**Facebook:** Castles-Custom-Homes-271304149964379
**Twitter:** @castlescustom
**Sister company:** [castlescornercorp.com](http://www.castlescornercorp.com)

When contact info changes, search the entire project for the old value and replace it.
It appears in nav overlays, footers, and content sections across many files.

---

## Page Index

| File | Title | Nav Location |
|---|---|---|
| `index.html` | Home | / |
| `pages/residential.html` | Custom Residential | Build With Us → Residential |
| `pages/your-lot.html` | Build on Your Lot | Build With Us → Build on Your Lot |
| `pages/remodel.html` | Remodel & Renovate | Build With Us → Remodels |
| `pages/gallery.html` | Gallery | Gallery |
| `pages/for-sale.html` | Homes For Sale | For Sale → Available Homes |
| `pages/lots.html` | Available Lots | For Sale → Lots |
| `pages/about.html` | Meet the Team | About → Meet the Team |
| `pages/our-story.html` | Our Story | About → Our Story |
| `pages/community.html` | Community | About → Community |
| `pages/partners.html` | Our Partners | About → Our Partners |
| `pages/financing.html` | Financing | Financing |
| `pages/contact.html` | Contact | Contact |

Note: `pages/commercial.html` exists but is not linked in the nav.
Commercial availability is noted on the Build on Your Lot page instead.

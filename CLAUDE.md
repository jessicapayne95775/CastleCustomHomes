# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Static marketing site for Castle's Custom Homes (Twin Falls, Idaho). Plain HTML/CSS/JS — no framework, no build step, no package manager, no tests.

## Running locally

Open `index.html` directly, or serve the repo root to avoid font/asset warnings:

```bash
python3 -m http.server 8080
# http://localhost:8080
```

## Architecture

### Page layout
- `index.html` lives at the repo root and uses **relative paths** like `pages/residential.html` and `css/global.css`.
- All other pages live in `pages/` and reference assets with **`../` paths** (`../css/global.css`, `../assets/images/...`). When copying markup between the home page and an interior page, rewrite every path accordingly.
- `assets/_nav.html` and `assets/_footer.html` are **reference snippets only** — they are not fetched at runtime. The real nav and footer markup is duplicated inline in every page. Any nav/footer change must be applied to `index.html` **and** every file in `pages/`.

### CSS layering
Stylesheets are loaded in a fixed order; later files depend on tokens from earlier ones:

1. `variables.css` — design tokens (brand colors, fonts, fluid `--gutter`, `--section-v`, `--max-w`) + a global reset. Edit brand colors here, not inline.
2. `global.css` — shared components (buttons, cards, sections, `.reveal` animation base).
3. `nav.css` — top nav + full-screen overlay menu.
4. `footer.css` — footer.
5. Exactly one of `home.css` (on `index.html`) or `pages.css` (on every file in `pages/`).

### Nav style hook
The `<body data-nav-style="...">` attribute drives nav appearance and is read by `js/nav.js`:
- `data-nav-style="hero"` — used on `index.html` only. Nav starts transparent over the hero and adds `.scrolled` past 60px scroll.
- `data-nav-style="solid"` — used on every interior page. Nav is solid from the start.

### JavaScript
Each script is feature-scoped and included only on pages that use it. Inline `onclick` handlers call functions these scripts attach to `window`:
- `nav.js` — loaded on every page. Wires the hamburger, overlay open/close, Escape-to-close, and the sub-menu accordion. Exposes `window.closeNav` and `window.toggleSub` for inline handlers.
- `reveal.js` — IntersectionObserver that adds `.visible` to `.reveal` elements when they enter the viewport. Falls back to showing everything if IO is unavailable. Use `reveal-delay-1`/`-2`/`-3` classes for staggered entrances.
- `gallery.js` — exposes `window.filterGallery(btn, category)` for the Gallery page's category filter buttons.
- `calculator.js` — exposes `window.calcMortgage()` and runs once on load. Reads `#calc-price`, `#calc-down`, `#calc-rate`, `#calc-term`; writes the monthly payment into `#calc-output`.
- `contact.js` — exposes `window.handleFormSubmit()`. Currently only reveals `#form-success`; the TODO is to replace it with a real handler (Formspree, Netlify Forms, or a backend endpoint).

### Images
`assets/images/` holds real photos and Unsplash placeholders. Many images are referenced via inline `style="background-image:url(...)"` on `.service-card-bg`, `.cta-image`, etc. — grep for the filename when swapping an image, not just `<img>` tags.

## Adding a new page

1. Copy an existing file from `pages/` (they all share the same head/nav/footer scaffolding).
2. Update `<title>` and the hero/body content.
3. Keep `data-nav-style="solid"` unless the page has a full-height hero.
4. Add the new link to the overlay menu **and** footer columns in `index.html` and every file in `pages/` — both with the correct relative prefix (none from root, `../` is not needed inside `pages/` because sibling pages link by bare filename).

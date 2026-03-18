# Castle's Custom Homes — Website

Static HTML/CSS/JS website for Castle's Custom Homes, Twin Falls, Idaho.

---

## Folder Structure

```
CastleCustomHomes/
│
├── index.html              ← Home page (open this in a browser to run locally)
│
├── pages/                  ← One file per page
│   ├── residential.html
│   ├── your-lot.html
│   ├── commercial.html
│   ├── remodel.html
│   ├── gallery.html
│   ├── for-sale.html
│   ├── about.html
│   ├── financing.html
│   └── contact.html
│
├── css/                    ← Stylesheets, split by concern
│   ├── variables.css       ← Colors, fonts, CSS custom properties (edit brand colors here)
│   ├── global.css          ← Shared components: buttons, cards, sections, reveal animations
│   ├── nav.css             ← Navigation bar + full-screen overlay menu
│   ├── footer.css          ← Footer styles
│   ├── home.css            ← Styles specific to index.html only
│   └── pages.css           ← Styles specific to interior pages only
│
├── js/                     ← JavaScript, split by feature
│   ├── nav.js              ← Hamburger toggle, overlay open/close, sub-menu accordion
│   ├── reveal.js           ← Scroll-triggered fade-up animations (IntersectionObserver)
│   ├── gallery.js          ← Gallery page category filter
│   ├── calculator.js       ← Mortgage payment calculator (financing.html)
│   └── contact.js          ← Contact form submission handler
│
└── assets/
    ├── _nav.html           ← Nav HTML snippet (reference copy — not loaded directly)
    ├── _footer.html        ← Footer HTML snippet (reference copy — not loaded directly)
    └── images/             ← Drop real project photos here to replace Unsplash placeholders
```

---

## Running Locally

Just open `index.html` in any browser. No build step, no server required.

For the best experience (avoids font/asset warnings), serve with a simple local server:

```bash
# Python 3
cd CastleCustomHomes
python3 -m http.server 8080
# Then open http://localhost:8080
```

---

## How to Edit

### Change a color
→ Edit `css/variables.css` — all brand colors are defined as CSS custom properties at the top.

### Edit page content
→ Open the relevant file in `pages/` (e.g. `pages/about.html`) and edit the HTML directly.

### Edit the home page
→ Edit `index.html` in the root folder.

### Edit nav links
→ The nav HTML is duplicated in `index.html` and every file in `pages/`.
  - `index.html` uses paths like `pages/residential.html`
  - `pages/*.html` files use relative paths like `residential.html`
  Update both if you add a new page.

### Add a new page
1. Copy an existing page from `pages/` as a starting point.
2. Update the `<title>` tag and page hero content.
3. Add a link to it in the nav overlay in `index.html` and all `pages/*.html` files.
4. Add a link in the footer columns.

### Replace placeholder images
→ Drop your real photos into `assets/images/` then update `src` attributes in the HTML.
  Current images are from Unsplash (placeholders only).

### Wire up the contact form
→ Edit `js/contact.js`. The `handleFormSubmit()` function currently shows a success message.
  Replace with a real form handler (Formspree, Netlify Forms, or a custom backend endpoint).

---

## Pages

| File | Title | Nav Path |
|---|---|---|
| `index.html` | Home | `/` |
| `pages/residential.html` | Custom Residential | Build With Us → Residential |
| `pages/your-lot.html` | Build on Your Lot | Build With Us → Build on Your Lot |
| `pages/commercial.html` | Commercial | Build With Us → Commercial |
| `pages/remodel.html` | Remodels | Build With Us → Remodels |
| `pages/gallery.html` | Gallery | Gallery |
| `pages/for-sale.html` | For Sale | For Sale |
| `pages/about.html` | About | About |
| `pages/financing.html` | Financing | Financing |
| `pages/contact.html` | Contact | Contact |

---

## Contact Info (update if it changes)

| Person | Role | Email | Phone |
|---|---|---|---|
| Kyle Castle | Design & Construction | kyle@castlescustomhomes.com | (208) 309-1547 |
| Tammy Castle | Client Relations & Financing | tammy@castlescustomhomes.com | (208) 309-1549 |

**Address:** 1334 Falls Ave East, Twin Falls, ID 83301  
**Instagram:** @castlescustomhomes  
**Facebook:** Castles-Custom-Homes-271304149964379  
**Twitter:** @castlescustom  
**Sister company:** [castlescornercorp.com](http://www.castlescornercorp.com)

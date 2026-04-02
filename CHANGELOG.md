# Sri Kanaka Durga Devi Temple - Change Log
## Session: April 2026
## Developer: Satya Tech Solutions

---

# 🔧 BUG FIXES

## 1. Donate Page - showBank not working
**Problem:** `donatePage.showBank: false` in site-config.js had no effect — bank details still showed.
**Root Cause:** The bank carousel builder in script.js had no `showBank` config check. Only QR had the check.
**Fix:** Added `showBank` check to bank carousel section in script.js, mirroring the QR pattern.

## 2. Donate Page - showQR broken brace structure
**Problem:** The `if (showQR)` block was missing its closing `}`, causing bank labels and bank carousel to be nested inside the QR conditional. When `showQR: false`, bank section also disappeared.
**Fix:** Fixed brace structure so QR and Bank sections are fully independent.

## 3. Donate Page - Hide entire column when disabled
**Problem:** When `showBank: false` or `showQR: false`, only the carousel was skipped but the empty column (title, nav buttons, dots) still showed.
**Fix:** Added DOM traversal to hide the entire `donate-col` container. When only one column is visible, layout switches to single centered column. Uses `parentElement` traversal (not `.closest()`) for IE11 compatibility.

---

# ✨ NEW FEATURES

## 4. Carousel Video Support
**What:** Home page carousel now supports video slides alongside image slides.
**Config:** In `carousel-config.js`, use `video` instead of `image`:
```js
{ video: "assets/videos/intro.mp4", title: "Temple Tour", text: "Experience the divine" }
```
**Behavior:** Videos autoplay muted, loop, cover full slide. Previous video pauses when slide changes, new video restarts from beginning.
**Files:** `carousel-config.js`, `script.js`

## 5. Page-wise Styles & Animations
**What:** Configurable grid layout, hover effects, and image shapes per page — controlled from admin panel.
**Config:** `site-config.js → pageStyles`:
```js
pageStyles: {
  gallery:  { gridStyle: "default", hoverEffect: "default", imageShape: "default" },
  shop:     { gridStyle: "default", hoverEffect: "default", imageShape: "default" },
  // ... per page
}
```

### 8 Grid Styles:
| Style | Description |
|-------|-------------|
| default | Original (no change) |
| masonry | Pinterest-style staggered columns |
| card | White card with shadow, caption below |
| minimal | No borders, no rounded corners |
| fullwidth | Single column, large images |
| compact | Small gaps, smaller images |
| polaroid | Photo-frame with slight rotation |
| metro | Mixed sizes, first item spans 2x2 |

### 12 Hover Effects:
| Effect | Description |
|--------|-------------|
| default | Original (no change) |
| zoom | Scale up image |
| slide-up | Caption slides up from bottom |
| fade | Opacity fade in |
| glow | Red box-shadow glow |
| tilt | 3D perspective rotation |
| blur | Image blurs on hover |
| grayscale | B&W to color on hover |
| shine | Light sweep across card |
| overlay | Color overlay on hover |
| lift | Card lifts up with shadow |
| none | No hover effect |

### 6 Image Shapes:
| Shape | Description |
|-------|-------------|
| default | Original (no change) |
| square | Sharp corners |
| rounded | Extra rounded (16px) |
| pill | Very rounded (30px) |
| circle | Circular crop |
| hexagon | Hexagonal clip |

**Files:** `site-config.js`, `styles.css`, `script.js`, `admin-modules/gallerypage.js`

## 6. Icon Picker with Emoji + Font Awesome
**What:** Shared icon picker popup for all admin modules. Every icon field now has a "🎨 Pick" button.

### Features:
- **Search bar** — type any keyword (marriage, flower, food, phone, heart, etc.) to find matching emojis. 100+ keywords mapped.
- **Industry icons** — 32 icons specific to current industry (temple, church, mosque, school, restaurant, clinic, gym, portfolio, business — 12 industries)
- **Common icons** — 48 universal icons
- **Custom paste** — paste any emoji from any source
- **Font Awesome tab** — 150+ professional icons in 9 categories (Religion, Wedding, People, Food, Medical, Education, Business, Nature, General)
- **Tab switcher** — switch between Emoji and Font Awesome tabs

### Font Awesome Integration:
- FA icons stored as `fa:fa-heart` format in config
- script.js auto-detects `fa:` prefix and renders `<i class="fa-solid fa-heart"></i>`
- FA CDN loaded only when FA icons are actually used (zero overhead for emoji-only sites)
- `iconLibrary` feature toggle in admin: Emoji Only | Font Awesome Only | Both

### Admin modules updated with icon picker:
- homepage.js — highlight card icons
- aboutpage.js — mission card icons
- servicespage.js — service card icons
- contactpage.js — contact card icons (now editable)
- donatepage.js — purpose card icons and names (now editable)

**Files:** `admin-modules/iconpicker.js` (new), `admin.html`, `script.js`, `styles.css`, `site-config.js`, `admin-modules/features.js`, `admin-modules/homepage.js`, `admin-modules/aboutpage.js`, `admin-modules/servicespage.js`, `admin-modules/contactpage.js`, `admin-modules/donatepage.js`

## 7. Config-Driven Cards (removed hardcoded HTML)
**What:** Highlight cards, service cards, mission cards, and stats were hardcoded in HTML. Now they render from `site-config.js` via JavaScript builders.

### Sections made config-driven:
| Section | Config Source | Builder ID |
|---------|-------------|------------|
| Home highlight cards | `homePage.highlightCards` | `highlightsGrid` |
| Service cards | `servicesPage.services` | `servicesGrid` |
| Mission cards | `aboutPage.missionCards` | `missionGrid` |
| Stats | `aboutPage.stats` | `statsRow` |

### Pages updated (16 files):
- `index.html` + `te/index.html` + `hi/index.html` + `sa/index.html`
- `services.html` + `te/services.html` + `hi/services.html` + `sa/services.html`
- `about.html` + `te/about.html` + `hi/about.html` + `sa/about.html`

**Benefit:** Any change in site-config.js or admin panel reflects across all 4 languages instantly.

**Files:** `script.js`, all above HTML files

## 8. Temple Hundi Highlight Card
**What:** Replaced "Sacred Grandhas" highlight card on home page with "Temple Hundi" pointing to donate page.
**Config:**
```js
{ icon: "🪙", title: "Temple Hundi", text: "Support daily poojas, Annadanam & temple seva", link: "donate.html", linkText: "Donate Now →", enabled: true }
```
**Files:** `site-config.js`

## 9. Odd Card Count Layout Fix
**What:** When services/highlights have odd number of cards (5, 7), the last row's orphan cards now center properly instead of leaving gaps.

### Layout behavior:
| Count | Desktop | Last Row |
|-------|---------|----------|
| 5 | 3 top + 2 centered below | ✅ Centered |
| 7 | 4 top + 3 centered below | ✅ Centered |

**Responsive:** Tablet (≤992px) = 2 columns with last orphan centered. Mobile (≤480px) = single column.
**Files:** `styles.css`

## 10. QR Code Account Name + Verification Warning
**What:** Donate page QR section now shows the account name that appears on UPI app, with a verification warning and WhatsApp confirm button.

### Config:
```js
// donate-config.js
{ title: {...}, qrImage: "...", upiId: "...", accountName: "Sri Kanaka Durga Devi Temple Trust" }
```

### Display (per QR slide):
- ✅ Account name in green highlighted box
- ⚠️ Orange warning: "Please verify the name shown on your UPI app matches the above before sending money"
- 💬 Green WhatsApp button: "Confirm on WhatsApp before paying" (pre-fills message with account name + UPI ID)

### Language support:
- **accountName** — always plain English (must match UPI app spelling exactly)
- **Labels & warnings** — fully translated in 4 languages (en/te/hi/sa)

**Files:** `donate-config.js`, `script.js`, `styles.css`, `admin-modules/donate.js`

---

# 📁 DEPLOYMENT

## Client Deploy Folder
`c:\Users\skonjeti5\Downloads\sri-kanaka-durga-devi-deploy`

### Files included:
```
sri-kanaka-durga-devi-deploy/
├── index.html, about.html, services.html, gallery.html
├── donate.html, contact.html, shop.html, 404.html
├── styles.css, script.js
├── site-config.js, translations.js
├── carousel-config.js, gallery-config.js, donate-config.js
├── extras-config.js, ads-config.js
├── manifest.json, sw.js, sitemap.xml, robots.txt
├── assets/audio/mantra.mp3
├── assets/branding/satya.jpg
├── assets/images/carousel/, gallery/
├── te/ (7 pages: index, about, services, gallery, donate, contact, shop)
├── hi/ (7 pages)
└── sa/ (7 pages)
```

### NOT included (dev-only):
- admin.html, admin-modules/ (developer use only)
- image-compressor.html, sitemap-generator.html, robots-generator.html, dev-tools.html
- Hidden page configs: grandhas-config.js, puranam-config.js, events-config.js, panchangam-config.js, pages-config.js

---

# 📋 ALL FILES MODIFIED

| File | Changes |
|------|---------|
| `site-config.js` | Temple Hundi card, iconLibrary feature, pageStyles config |
| `script.js` | Donate showBank/showQR fix, carousel video, highlight/service/mission/stats builders, QR account name + warning, icon renderer, page styles applicator |
| `styles.css` | QR verification styles, FA icon sizing, page style classes (grid/hover/shape), odd card centering, responsive fixes |
| `donate-config.js` | accountName field added to QR items |
| `carousel-config.js` | Video slide support documented |
| `index.html` | Highlight cards → config-driven |
| `about.html` | Mission cards + stats → config-driven |
| `services.html` | Service cards → config-driven |
| `te/index.html` | Config-driven highlight cards |
| `te/about.html` | Config-driven mission + stats |
| `te/services.html` | Config-driven service cards |
| `te/donate.html` | Telugu donate page (reverted from accidental edit) |
| `hi/index.html` | Config-driven highlight cards |
| `hi/about.html` | Config-driven mission + stats |
| `hi/services.html` | Config-driven service cards |
| `sa/index.html` | Config-driven highlight cards |
| `sa/about.html` | Config-driven mission + stats |
| `sa/services.html` | Config-driven service cards |
| `admin.html` | FA CDN link, iconpicker.js loaded |
| `admin-modules/iconpicker.js` | NEW — shared icon picker with emoji search + FA icons |
| `admin-modules/gallerypage.js` | Page-wise style controls with industry icons |
| `admin-modules/features.js` | iconLibrary dropdown |
| `admin-modules/homepage.js` | Icon picker integration |
| `admin-modules/aboutpage.js` | Icon picker integration |
| `admin-modules/servicespage.js` | Icon picker integration |
| `admin-modules/contactpage.js` | Icon picker + editable icons/titles |
| `admin-modules/donatepage.js` | Icon picker + editable purpose cards |
| `admin-modules/donate.js` | accountName field for QR codes |

---

*Document generated: April 2026*
*Template: Temple Divine v1.0 by Satya Tech Solutions*

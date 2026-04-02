# Temple Divine - Website Template
## By Satya Tech Solutions

---

# 📋 TABLE OF CONTENTS

1. [Quick Start](#quick-start)
2. [For Customers (Non-Technical)](#for-customers)
3. [For Developers](#for-developers)
4. [File Structure](#file-structure)
5. [Config Files Guide](#config-files)
6. [Pages Guide](#pages-guide)
7. [Features Guide](#features-guide)
8. [Multi-Language Setup](#multi-language)
9. [Admin Panel Guide](#admin-panel)
10. [Creating a New Site for a Customer](#new-site)
11. [Deployment Guide](#deployment)
12. [Troubleshooting](#troubleshooting)
13. [Industry Customization](#industry)
14. [Pricing Tiers for Customers](#pricing-tiers)

---

# 🚀 QUICK START <a name="quick-start"></a>

### 1. Copy the template folder
### 2. Open `site-config.js` — change site name, phone, logo
### 3. Open `index.html` in browser — site is ready
### 4. Open `admin.html` — visual admin panel

---

# 👤 FOR CUSTOMERS (Non-Technical) <a name="for-customers"></a>

## How to Update Your Website:

### Change Site Name / Phone / Logo:
1. Open `admin.html` in browser
2. Click "Site Settings" in sidebar
3. Edit the fields
4. Click "Generate" → "Copy"
5. Open `site-config.js` in any text editor (Notepad)
6. Select all → Paste → Save

### Add Carousel Images:
1. Place images in `assets/images/carousel/`
2. Name them: `slide1.jpg`, `slide2.jpg`, etc.
3. Open `carousel-config.js` in text editor
4. Add: `{ image: "assets/images/carousel/slide3.jpg", title: "Title", text: "Subtitle" }`

### Add Gallery Photos:
1. Create category folder: `assets/images/gallery/festivals/`
2. Drop photos in it
3. Open `gallery-config.js`
4. Add folder name and filenames

### Add Shop Products:
1. Open `shop-config.js`
2. Add: `{ name: "Product", img: "image URL", url: "product URL", cat: "category" }`

### Add Donation QR/Bank:
1. Place QR image in `assets/images/`
2. Open `donate-config.js`
3. Add QR or bank details

### Change Features (on/off):
1. Open `admin.html` → Features
2. Toggle any feature
3. Generate → Copy → Paste into `site-config.js`

### Image Sizes:
| Where | Size | Format | Location |
|-------|------|--------|----------|
| Logo | 200 x 200 px | PNG (transparent) | `assets/images/logo.png` |
| Carousel | 1920 x 700 px | JPG | `assets/images/carousel/` |
| Gallery | 800 x 600 px | JPG | `assets/images/gallery/{category}/` |
| About | 800 x 600 px | JPG | `assets/images/about.jpg` |
| Owner photo | 400 x 500 px | JPG | `assets/images/owner.jpg` |
| QR Code | 500 x 500 px | PNG | `assets/images/` |
| Watermark | 200 x 200 px | JPG/PNG | `assets/branding/` |
| Partner logos | 150 x 60 px | PNG | `assets/images/` |
| Before/After | 400 x 250 px | JPG | `assets/images/` |

> **Note:** Avoid WebP format — it does not work in older browsers (IE11, older Safari).

---

# 👨‍💻 FOR DEVELOPERS <a name="for-developers"></a>

## Tech Stack:
- Pure HTML5, CSS3, Vanilla JavaScript
- No frameworks, no build tools, no dependencies
- Works on any web server or locally from file://
- PWA ready (manifest.json + service worker)

## Architecture:
- Config-driven: All content in JS config files
- Modular: Each feature is self-contained IIFE
- No global variable pollution (except SITE_CONFIG and config arrays)
- Admin panel uses separate JS modules in `admin-modules/`

## Key Design Decisions:
- No `fetch()` for local file:// compatibility
- No ES6+ syntax for max browser support
- All `var` (no let/const) for IE11 compatibility
- Inline styles avoided — all in styles.css
- No CSS preprocessor — plain CSS with CSS variables

## Adding a New Feature:
1. Add config option to `site-config.js` → `features`
2. Add CSS to `styles.css`
3. Add JS as IIFE at end of `script.js`
4. Add toggle to `admin-modules/features.js`
5. Test on all pages

## Adding a New Page:
1. Create `newpage.html` (copy structure from about.html)
2. Add to `site-config.js` → `pages`
3. Add to `translations.js` → `nav`
4. Add to `script.js` → `hrefToKey` and `pageFileMap`
5. Add nav link to all HTML files
6. Create language versions in te/, hi/, sa/
7. Add to admin panel sidebar + module

---

# 📁 FILE STRUCTURE <a name="file-structure"></a>

```
simple-site/
├── index.html              # Home page
├── about.html              # About page
├── services.html           # Services page
├── books.html              # Grandhas page
├── shop.html               # Shop page
├── gallery.html            # Gallery page
├── puranam.html            # Temple Legends page
├── events.html             # Events page
├── panchangam.html         # Panchangam page
├── blog.html               # News/Blog page
├── team.html               # Team page
├── pricing.html            # Pricing page
├── booking.html            # Booking page
├── donate.html             # Donation page
├── contact.html            # Contact page
├── 404.html                # Error page
├── admin.html              # Admin panel
│
├── styles.css              # All styles
├── script.js               # All functionality
│
├── site-config.js          # Master config (site name, features, pages)
├── carousel-config.js      # Home carousel slides
├── gallery-config.js       # Gallery folders + images
├── shop-config.js          # Shop products (4 styles)
├── grandhas-config.js      # Sacred books
├── donate-config.js        # QR codes + bank accounts
├── puranam-config.js       # Temple legends content
├── events-config.js        # Events + festivals
├── panchangam-config.js    # Daily panchangam
├── pages-config.js         # Blog, Team, Pricing, Booking
├── extras-config.js        # Testimonials, FAQ, Partners, Timeline
├── ads-config.js           # Advertisement system
├── translations.js         # Language nav translations
│
├── manifest.json           # PWA manifest
├── sw.js                   # Service worker (offline)
├── sitemap.xml             # SEO sitemap
├── robots.txt              # Search engine rules
│
├── image-compressor.html   # Image compression tool
├── sitemap-generator.html  # Sitemap generator tool
├── robots-generator.html   # robots.txt generator tool
├── dev-tools.html          # Performance/Accessibility/Link checker
│
├── admin-modules/          # Admin panel JS modules
│   ├── site.js
│   ├── header.js
│   ├── footer.js
│   ├── features.js
│   ├── theme.js
│   ├── carousel.js
│   ├── shop.js
│   ├── gallery.js
│   ├── gallerypage.js
│   ├── grandhas.js
│   ├── donate.js
│   ├── donatepage.js
│   ├── puranam.js
│   ├── ads.js
│   ├── homepage.js
│   ├── aboutpage.js
│   ├── servicespage.js
│   ├── contactpage.js
│   └── shoppage.js
│
├── assets/
│   ├── audio/
│   │   └── mantra.mp3      # Background mantra audio
│   ├── branding/
│   │   └── satya.jpg        # Developer watermark photo
│   ├── grandhas/            # PDF files for sacred books
│   ├── images/
│   │   ├── carousel/        # Carousel slide images
│   │   ├── gallery/         # Gallery category folders
│   │   │   ├── temple/
│   │   │   ├── festivals/
│   │   │   ├── poojas/
│   │   │   └── annadanam/
│   │   └── ads/             # Ad banner images
│   └── videos/              # Video files
│
├── te/                      # Telugu pages (9 files)
├── hi/                      # Hindi pages (9 files)
└── sa/                      # Sanskrit pages (9 files)
```

---

# ⚙️ CONFIG FILES GUIDE <a name="config-files"></a>

## site-config.js (Master Config)
Controls: Site name, logo, contact, pages visibility, features, header, footer, industry, all page settings.

## carousel-config.js
```js
var CAROUSEL_SLIDES = [
  { image: "path.jpg", title: "Title", text: "Subtitle" }
];
```

## gallery-config.js
```js
var GALLERY_FOLDERS = [
  { folder: "temple", images: ["photo1.jpg", "photo2.jpg"] }
];
```

## shop-config.js
```js
// Style 1: Individual products
var SHOP_ITEMS = [
  { name: "Product", img: "image URL", url: "product URL", cat: "category" }
];
// Style 2: Category search links
var SHOP_CATEGORIES = [...];
// Style 3: Curated collections
var SHOP_COLLECTIONS = [...];
// Style 4: Compare across stores
var SHOP_COMPARE = [...];
```

## donate-config.js
```js
var DONATE_QR = [
  { title: { en: "Temple UPI", te: "..." }, qrImage: "path.png", upiId: "id@upi" }
];
var DONATE_BANKS = [
  { title: { en: "Temple Account", te: "..." }, bankName: "SBI", accountName: "...", accountNumber: "...", branch: "...", ifsc: "...", accountType: "Current" }
];
```

---

# 📄 PAGES GUIDE <a name="pages-guide"></a>

| Page | File | Config | Purpose |
|------|------|--------|---------|
| Home | index.html | carousel-config.js | Landing page with carousel |
| About | about.html | site-config.js → aboutPage | History, mission, stats |
| Services | services.html | site-config.js → servicesPage | Service cards, timings |
| Gallery | gallery.html | gallery-config.js | Photo gallery with filters |
| Shop | shop.html | shop-config.js | Product referrals (4 styles) |
| Grandhas | books.html | grandhas-config.js | Sacred books PDF download |
| Donate | donate.html | donate-config.js | QR codes + bank details |
| Contact | contact.html | site-config.js → contactPage | Owner profile, map, cards |
| Puranam | puranam.html | puranam-config.js | Temple legends (9 themes) |
| Events | events.html | events-config.js | Auto-recurring events |
| Panchangam | panchangam.html | panchangam-config.js | Daily panchangam widget |
| Blog | blog.html | pages-config.js | News articles |
| Team | team.html | pages-config.js | Staff/trust members |
| Pricing | pricing.html | pages-config.js | Pooja packages |
| Booking | booking.html | pages-config.js | WhatsApp booking form |

---

# ✨ FEATURES GUIDE <a name="features-guide"></a>

All features in `site-config.js` → `features`:

### Core: floatingWhatsapp, backToTop, copyProtection, scrollProgress, breadcrumb, backButton, lastUpdated
### Loader: pageLoader, loaderStyle (12 styles), loaderText
### Visual: scrollAnimations (5 styles), parallaxBanners, animatedCounters, blurLazyLoad, darkModeToggle, colorPreset (5 presets), fontSizeControls, rtlSupport
### Engagement: testimonials, testimonialsCarousel, videoTestimonials, faqSection, shareButtons, printPage, stickyCTA, bookmarkEnabled, searchEnabled, qrGenerator, pdfExport, readingTime, tableOfContents
### Notifications: popupNotification, announcementText
### Privacy: cookieConsent
### Business: partnersSection, timelineSection, beforeAfterGallery, liveStreamEnabled
### Analytics: googleAnalytics, seoMetaTags
### Communication: newsletterEnabled, visitorCounter, liveChatEnabled
### Images: imageOptimization, imageQuality, imageMaxWidth
### Watermark: watermarkTargets (carousel, gallery, grandha, shop, about, owner, qr)
### Security: adminPassword, maintenanceMode

### Cards: cardStyle (6 styles: default, elevated, accent, gradient, outlined, minimal)
### Auto-layout: Cards auto-adjust grid based on count (1-9 cards)

---

# 🌐 MULTI-LANGUAGE SETUP <a name="multi-language"></a>

### Structure:
- English: root folder (index.html, about.html, etc.)
- Telugu: te/ folder
- Hindi: hi/ folder
- Sanskrit: sa/ folder

### Adding a new language (e.g. Tamil):
1. Create `ta/` folder
2. Copy all HTML files from root to `ta/`
3. Fix paths: replace `styles.css` with `../styles.css`, etc.
4. Translate all content in each HTML file
5. Add to `translations.js` → `languages` array
6. Add to `translations.js` → `nav` section

### Language pages have:
- All paths prefixed with `../` (CSS, JS, assets)
- Content fully translated in HTML (not JS-swapped)
- Language dropdown auto-detects current language from URL path

---

# 🖥️ ADMIN PANEL GUIDE <a name="admin-panel"></a>

Open `admin.html` in browser.

### Sidebar sections:
| Section | What you edit |
|---------|--------------|
| Dashboard | Overview of all pages and configs |
| Site Settings | Name, contact, industry, pages visibility |
| Header | Top bar, logo style, audio, language |
| Footer | Address, phone, social, credit toggles |
| Features | 50+ feature toggles |
| Theme | Colors, fonts, buttons, cards, layout |
| Home | Carousel toggle, highlight cards |
| About | History, mission cards, stats |
| Services | Service cards, timings, CTA |
| Gallery | Folders, images, filters, pagination |
| Shop | Products, page settings |
| Grandhas | Books, PDFs |
| Donate | QR codes, bank accounts, purpose cards |
| Puranam | Content blocks, themes |
| Contact | Owner profile, contact cards, map |
| Carousel | Slide management |
| Ads | Ad types, placements, scheduling |

### Workflow:
1. Edit values in admin panel
2. Click "Generate" button
3. Click "Copy" button
4. Open the respective config file in text editor
5. Select all → Paste → Save
6. Refresh the website page

---

# 🆕 CREATING A NEW SITE FOR A CUSTOMER <a name="new-site"></a>

### Step 1: Copy Template
```
Copy entire simple-site folder → rename to customer-name-site
```

### Step 2: Edit site-config.js
Change these values:
- siteName → Customer's name
- siteTagline → Their tagline
- siteTitle → Browser tab title
- logoImage → Their logo URL/path
- contactName → Their contact person
- phone → Their phone
- whatsapp → Their WhatsApp number
- industry → Select preset (temple/church/school/etc.)

### Step 3: Set Page Visibility
In site-config.js → pages:
- Set unused pages to "hide"
- Set upcoming pages to "coming-soon"
- Set ready pages to "show"

### Step 4: Set Features
In site-config.js → features:
- Enable features based on customer's plan
- Set adminPassword
- Configure loader style

### Step 5: Add Content
- Replace carousel images
- Add gallery photos
- Update services/about text
- Add donation details
- Replace audio file

### Step 6: Branding
- Place developer watermark in assets/branding/
- Update stamp path in site-config.js

### Step 7: Deploy
- Upload to hosting (GitHub Pages / Netlify / any web host)
- Point customer's domain

### Time estimate: 2-4 hours per customer site

---

# 🚀 DEPLOYMENT GUIDE <a name="deployment"></a>

### GitHub Pages (Free):
1. Create GitHub repository
2. Push all files
3. Go to Settings → Pages → Source: main branch
4. Site live at: username.github.io/repo-name

### Netlify (Free):
1. Go to netlify.com
2. Drag & drop the site folder
3. Site live instantly with random URL
4. Add custom domain in settings

### Any Web Host:
1. Upload all files via FTP/cPanel
2. Point domain to the folder
3. Done

### After Deployment:
1. Update sitemap.xml with actual URLs
2. Submit sitemap to Google Search Console
3. Test all pages on mobile
4. Run dev-tools.html checks

---

# 🔧 TROUBLESHOOTING <a name="troubleshooting"></a>

### Page is blank:
- Check browser console (F12) for JS errors
- Verify site-config.js has no syntax errors (missing quotes, commas)
- Check braces are balanced in all JS files

### Audio not playing:
- Ensure mantra.mp3 exists in assets/audio/
- Clear localStorage: F12 → Console → `localStorage.clear()`

### Language pages not styled:
- Check paths start with `../` (../styles.css, ../script.js)

### Admin panel sections empty:
- Check site-config.js loads without errors
- Open F12 console, look for red errors

### Images not showing:
- Check file paths are correct
- Check file names match exactly (case-sensitive)

### Features not working:
- Verify feature is set to `true` in site-config.js
- Check script.js braces are balanced

---

# 🏢 INDUSTRY CUSTOMIZATION <a name="industry"></a>

Set `industry` in site-config.js. Page labels auto-adjust:

| Industry | Services → | Grandhas → | Shop → | Puranam → | Donate → |
|----------|-----------|-----------|--------|----------|---------|
| temple | Services | Grandhas | Shop | Temple Legends | Donate |
| church | Worship | Bible Studies | Shop | Our History | Donate |
| mosque | Namaz Timings | Quran Studies | Shop | History | Zakat |
| ngo | Programs | Resources | Shop | Our Story | Donate |
| school | Courses | Study Material | Books | About Us | Fees |
| restaurant | Catering | Recipes | Menu | Our Story | Gift Cards |
| realestate | Services | Guides | Listings | About Us | Contact |
| clinic | Treatments | Health Tips | Products | About Doctor | Payments |
| gym | Classes | Fitness Tips | Supplements | Our Story | Membership |
| portfolio | Skills | Blog | Products | About Me | Hire Me |
| business | Services | Resources | Products | About Us | Payments |
| custom | You define all labels |

---

# 💰 PRICING TIERS FOR CUSTOMERS <a name="pricing-tiers"></a>

### Free Tier:
```js
features: {
  floatingWhatsapp: true,
  backToTop: true,
  pageLoader: false,
  copyProtection: false,
  scrollAnimations: false,
  shareButtons: false,
  // everything else: false
}
pages: { home: "show", about: "show", services: "show", contact: "show" }
// Other pages: "hide"
```

### Basic Tier (₹5,000):
```js
features: {
  floatingWhatsapp: true,
  backToTop: true,
  pageLoader: true,
  loaderStyle: "spinner",
  scrollAnimations: true,
  shareButtons: true,
  cookieConsent: true,
  seoMetaTags: true,
  breadcrumb: true
}
pages: { home: "show", about: "show", services: "show", gallery: "show", contact: "show", donate: "show" }
```

### Premium Tier (₹15,000):
```js
features: {
  // ALL features: true
  pageLoader: true,
  loaderStyle: "logo",
  scrollAnimations: true,
  parallaxBanners: true,
  animatedCounters: true,
  testimonials: true,
  faqSection: true,
  darkModeToggle: true,
  copyProtection: true,
  googleAnalytics: true,
  // ... everything enabled
}
pages: { /* all pages: "show" */ }
// + Multi-language
// + Custom branding
// + Watermark
```

### Enterprise Tier (₹30,000+):
- Everything in Premium
- All 4 languages
- Custom industry preset
- Ads system configured
- Live stream setup
- Newsletter integration
- Live chat setup
- Ongoing support

---

# 📞 SUPPORT

Developer: Satya
Company: Satya Tech Solutions
Template: Temple Divine v1.0

---

*This documentation is part of the Temple Divine template by Satya Tech Solutions.*

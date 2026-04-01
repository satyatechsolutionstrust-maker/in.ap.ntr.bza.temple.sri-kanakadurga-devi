// ============================================
// WATERMARK - your photo stamped on all images
// ============================================
if (typeof SITE_CONFIG !== 'undefined' && SITE_CONFIG.stamp) {
  // Fix path for language subfolders
  var stampPath = SITE_CONFIG.stamp;
  var pathParts = window.location.pathname.split('/');
  for (var lp = 0; lp < pathParts.length; lp++) {
    if (pathParts[lp] === 'te' || pathParts[lp] === 'hi' || pathParts[lp] === 'sa') {
      if (stampPath.indexOf('../') !== 0) stampPath = '../' + stampPath;
      break;
    }
  }
  var wmImg = new Image();
  wmImg.src = stampPath;
  wmImg.onload = function() {
    var allImgs = document.querySelectorAll('.carousel-slide img, .gallery-item img, .grandha-cover, .shop-card-img, .about-image img, .owner-photo, .qr-image');
    for (var w = 0; w < allImgs.length; w++) {
      (function(img) {
        if (img.parentElement.className.indexOf('wm-wrap') === -1) {
          var wrapper = document.createElement('div');
          wrapper.className = 'wm-wrap';
          wrapper.style.position = 'relative';
          wrapper.style.display = 'inline-block';
          wrapper.style.width = '100%';
          wrapper.style.overflow = 'hidden';
          img.parentElement.insertBefore(wrapper, img);
          wrapper.appendChild(img);

          var stamp = document.createElement('img');
          stamp.src = stampPath;
          stamp.className = 'wm-stamp';
          stamp.style.position = 'absolute';
          stamp.style.opacity = SITE_CONFIG.watermarkOpacity || 0.25;
          stamp.style.width = (SITE_CONFIG.watermarkSize || 15) + '%';
          stamp.style.borderRadius = '50%';
          stamp.style.pointerEvents = 'none';
          stamp.style.zIndex = '3';
          stamp.draggable = false;

          var pos = SITE_CONFIG.watermarkPosition || 'bottom-right';
          if (pos === 'center') { stamp.style.top = '50%'; stamp.style.left = '50%'; stamp.style.transform = 'translate(-50%, -50%)'; }
          else if (pos === 'bottom-right') { stamp.style.bottom = '10px'; stamp.style.right = '10px'; }
          else if (pos === 'bottom-left') { stamp.style.bottom = '10px'; stamp.style.left = '10px'; }
          else if (pos === 'top-right') { stamp.style.top = '10px'; stamp.style.right = '10px'; }
          else if (pos === 'top-left') { stamp.style.top = '10px'; stamp.style.left = '10px'; }

          wrapper.appendChild(stamp);
        }
      })(allImgs[w]);
    }
  };
}

// ============================================
// DEVELOPER CREDIT STAMP - from site-config.js
// ============================================
if (typeof SITE_CONFIG !== 'undefined') {
  var footerBottom = document.querySelector('.footer-bottom');
  if (footerBottom) {
    var credit = document.createElement('div');
    credit.className = 'dev-credit';

    var inner = '';
    if (SITE_CONFIG.stamp) {
      inner += '<img src="' + stampPath + '" alt="' + SITE_CONFIG.developerName + '" class="dev-photo">';
    }
    inner += '<span>Designed & Developed by <strong>' + SITE_CONFIG.developerName + '</strong>';
    if (SITE_CONFIG.companyUrl) {
      inner += ' | <a href="' + SITE_CONFIG.companyUrl + '" target="_blank">' + SITE_CONFIG.companyName + '</a>';
    } else {
      inner += ' | ' + SITE_CONFIG.companyName;
    }
    inner += '</span>';

    credit.innerHTML = inner;
    footerBottom.appendChild(credit);
  }
}

// ============================================
// LANGUAGE - auto-detect from URL path, swap text
// ============================================
var currentLang = 'en';
var pathParts = window.location.pathname.split('/');
for (var lp = 0; lp < pathParts.length; lp++) {
  if (pathParts[lp] === 'te' || pathParts[lp] === 'hi' || pathParts[lp] === 'sa') {
    currentLang = pathParts[lp];
    break;
  }
}

// Fix relative paths for language subfolders - handled in HTML files directly

// Build language dropdown
if (typeof TRANSLATIONS !== 'undefined') {
  var header = document.querySelector('.header-inner');
  if (header) {
    var switcher = document.createElement('div');
    switcher.className = 'lang-switcher';

    var langs = TRANSLATIONS.languages;
    var currentLangName = 'English';
    for (var cl = 0; cl < langs.length; cl++) {
      if (langs[cl].code === currentLang) { currentLangName = langs[cl].nativeName; break; }
    }

    // Current language button
    var current = document.createElement('div');
    current.className = 'lang-current';
    current.innerHTML = '🌐 ' + currentLangName + ' ▾';
    switcher.appendChild(current);

    // Dropdown
    var dropdown = document.createElement('div');
    dropdown.className = 'lang-dropdown';

    for (var ls = 0; ls < langs.length; ls++) {
      var langBtn = document.createElement('a');
      langBtn.className = 'lang-btn' + (langs[ls].code === currentLang ? ' active' : '');
      langBtn.textContent = langs[ls].nativeName + ' (' + langs[ls].name + ')';
      var pageName = window.location.pathname.split('/').pop() || 'index.html';
      if (langs[ls].code === 'en') {
        langBtn.href = (currentLang !== 'en' ? '../' : '') + pageName;
      } else {
        langBtn.href = (currentLang !== 'en' ? '../' : '') + langs[ls].code + '/' + pageName;
      }
      dropdown.appendChild(langBtn);
    }
    switcher.appendChild(dropdown);

    // Toggle dropdown on click
    current.onclick = function(e) {
      e.stopPropagation();
      dropdown.className = dropdown.className.indexOf('open') > -1 ? 'lang-dropdown' : 'lang-dropdown open';
    };
    // Close on outside click
    document.onclick = function() { dropdown.className = 'lang-dropdown'; };

    header.insertBefore(switcher, document.getElementById('mobileMenuBtn'));
  }

  // Swap tagline under logo
  var taglineMap = { en: 'Om Dum Durgayei Namah', te: 'ॐ దుం దుర్గాయై నమః', hi: 'ॐ दुं दुर्गायै नमः', sa: 'ॐ दुं दुर्गायै नमः' };
  var tagline = document.querySelector('.tagline');
  if (tagline && taglineMap[currentLang]) tagline.textContent = taglineMap[currentLang];

  // Swap footer mantra
  var footerMantra = document.querySelector('.footer-mantra');
  if (footerMantra && taglineMap[currentLang]) footerMantra.textContent = taglineMap[currentLang];

  // Swap nav text - match by href, not position
  var navT = TRANSLATIONS.nav[currentLang];
  if (navT) {
    var hrefToKey = { 'index.html':'home', 'about.html':'about', 'services.html':'services', 'books.html':'grandhas', 'shop.html':'shop', 'gallery.html':'gallery', 'puranam.html':'puranam', 'events.html':'events', 'panchangam.html':'panchangam', 'blog.html':'blog', 'team.html':'team', 'pricing.html':'pricing', 'booking.html':'booking', 'donate.html':'donate', 'contact.html':'contact' };
    var allNavLinks2 = document.querySelectorAll('.nav a, .footer-grid a[href$=".html"]');
    for (var ni = 0; ni < allNavLinks2.length; ni++) {
      var h = allNavLinks2[ni].getAttribute('href');
      if (h) {
        var file = h.split('/').pop();
        var key = hrefToKey[file];
        if (key && navT[key]) allNavLinks2[ni].textContent = navT[key];
      }
    }
  }

  // Swap top bar
  var topBarSpan = document.querySelector('.top-bar-inner > span:first-child');
  if (topBarSpan && TRANSLATIONS.topBar[currentLang]) {
    topBarSpan.textContent = TRANSLATIONS.topBar[currentLang];
  }

  // Swap section titles by matching English text
  if (TRANSLATIONS.sectionTitles && currentLang !== 'en') {
    var allTitles = document.querySelectorAll('.section-title, .cta-box h2');
    for (var ti = 0; ti < allTitles.length; ti++) {
      var txt = allTitles[ti].textContent.trim();
      if (TRANSLATIONS.sectionTitles[txt] && TRANSLATIONS.sectionTitles[txt][currentLang]) {
        allTitles[ti].textContent = TRANSLATIONS.sectionTitles[txt][currentLang];
      }
    }
  }

  // Swap banner title based on current page
  var bannerH2 = document.querySelector('.page-banner-overlay h2');
  if (bannerH2 && TRANSLATIONS.pageText['.page-banner-overlay h2'] && currentLang !== 'en') {
    var pageName2 = (window.location.pathname.split('/').pop() || 'index.html').replace('.html','');
    if (pageName2 === 'index') pageName2 = 'home';
    var bannerMap = TRANSLATIONS.pageText['.page-banner-overlay h2'][currentLang];
    if (bannerMap && bannerMap[pageName2]) {
      bannerH2.textContent = bannerMap[pageName2];
    }
  }

  // Swap subtitles / paragraphs
  if (TRANSLATIONS.subtitles && currentLang !== 'en') {
    var allP = document.querySelectorAll('.section-subtitle, .cta-box p, .donate-grid p');
    for (var pi = 0; pi < allP.length; pi++) {
      var pTxt = allP[pi].textContent.trim();
      if (TRANSLATIONS.subtitles[pTxt] && TRANSLATIONS.subtitles[pTxt][currentLang]) {
        allP[pi].textContent = TRANSLATIONS.subtitles[pTxt][currentLang];
      }
    }
  }

  // Swap buttons
  if (TRANSLATIONS.buttons && currentLang !== 'en') {
    var allBtns = document.querySelectorAll('.cta-btn, #enableAudio, #skipAudio, .audio-prompt-inner p:nth-child(3)');
    for (var bi = 0; bi < allBtns.length; bi++) {
      var bTxt = allBtns[bi].textContent.trim();
      if (TRANSLATIONS.buttons[bTxt] && TRANSLATIONS.buttons[bTxt][currentLang]) {
        allBtns[bi].textContent = TRANSLATIONS.buttons[bTxt][currentLang];
      }
    }
  }

  // Swap highlight cards on home page
  if (TRANSLATIONS.pageText && currentLang !== 'en') {
    for (var selector in TRANSLATIONS.pageText) {
      if (selector === '.page-banner-overlay h2') continue; // handled above
      var val = TRANSLATIONS.pageText[selector];
      if (val && val[currentLang]) {
        var el = document.querySelector(selector);
        if (el) el.textContent = val[currentLang];
      }
    }
  }

  // Swap footer
  var footerT = TRANSLATIONS.footer[currentLang];
  if (footerT) {
    var qlH4 = document.querySelectorAll('.footer h4');
    if (qlH4[0]) qlH4[0].textContent = footerT.quickLinks;
    if (qlH4[1]) qlH4[1].textContent = footerT.followUs;
    var fbP = document.querySelector('.footer-bottom p');
    if (fbP) fbP.textContent = footerT.copyright;
  }
}

// ============================================
// PAGE VISIBILITY + COMING SOON
// ============================================
if (typeof SITE_CONFIG !== 'undefined' && SITE_CONFIG.pages) {
  var pageName = (window.location.pathname.split('/').pop() || 'index.html').replace('.html', '');
  if (pageName === 'index') pageName = 'home';
  if (pageName === 'books') pageName = 'grandhas';

  var pageStatus = SITE_CONFIG.pages[pageName];

  // Hide nav links for hidden pages
  var allNavLinks = document.querySelectorAll('.nav a, .footer a[href$=".html"]');
  var pageFileMap = { home: 'index.html', about: 'about.html', services: 'services.html', grandhas: 'books.html', shop: 'shop.html', gallery: 'gallery.html', puranam: 'puranam.html', events: 'events.html', panchangam: 'panchangam.html', blog: 'blog.html', team: 'team.html', pricing: 'pricing.html', booking: 'booking.html', donate: 'donate.html', contact: 'contact.html' };
  for (var pk in SITE_CONFIG.pages) {
    if (SITE_CONFIG.pages[pk] === 'hide') {
      var hideFile = pageFileMap[pk];
      if (hideFile) {
        for (var nl = 0; nl < allNavLinks.length; nl++) {
          if (allNavLinks[nl].getAttribute('href') && allNavLinks[nl].getAttribute('href').indexOf(hideFile) > -1) {
            allNavLinks[nl].style.display = 'none';
          }
        }
      }
    }
  }

  // Show coming-soon overlay
  if (pageStatus === 'coming-soon') {
    var csMsg = 'Coming Soon!';
    if (SITE_CONFIG.comingSoonMessages && SITE_CONFIG.comingSoonMessages[pageName]) {
      var msgs = SITE_CONFIG.comingSoonMessages[pageName];
      csMsg = msgs[currentLang] || msgs['en'] || csMsg;
    }
    var overlay = document.createElement('div');
    overlay.className = 'coming-soon-overlay';
    var backText = { en: '← Back to Home', te: '← హోమ్కి తిరిగి వెళ్ళండి', hi: '← होम पर वापस जाएं', sa: '← गृहं प्रतिगच्छन्तु' };
    var bkTxt = backText[currentLang] || backText['en'];
    overlay.innerHTML = '<div class="cs-icon">🙏</div>' +
      '<h2>' + csMsg + '</h2>' +
      '<p class="cs-mantra">ॐ दुं दुर्गायै नमः</p>' +
      '<a href="index.html" class="cs-btn">' + bkTxt + '</a>';
    document.body.appendChild(overlay);
  }
}

// ============================================
// FLOATING WHATSAPP + BACK TO TOP + LOADER
// ============================================
if (typeof SITE_CONFIG !== 'undefined') {
  var F = SITE_CONFIG.features || {};

  // Page loader (premium feature)
  if (F.pageLoader !== false) {
    var loader = document.createElement('div');
    loader.className = 'page-loader';
    var loaderContent = '';
    var style = F.loaderStyle || 'spinner';
    if (style === 'logo' && SITE_CONFIG.logoImage) {
      loaderContent = '<img src="' + SITE_CONFIG.logoImage + '" style="width:80px;height:80px;border-radius:50%;object-fit:cover;margin-bottom:15px;border:3px solid #f9a825">';
    } else if (style === 'mantra') {
      loaderContent = '<div style="font-family:Tiro Devanagari Hindi,serif;font-size:1.3rem;color:#b71c1c;margin-bottom:15px">' + (SITE_CONFIG.siteTagline || '') + '</div>';
    } else if (style === 'pulse') {
      loaderContent = '<div class="loader-pulse"></div>';
    } else if (style === 'dots') {
      loaderContent = '<div class="loader-dots"><span></span><span></span><span></span></div>';
    } else if (style === 'temple') {
      loaderContent = '<div class="loader-temple">\ud83d\uded5</div>';
    } else if (style === 'namaste') {
      loaderContent = '<div class="loader-namaste">\ud83d\ude4f</div>';
    } else if (style === 'om') {
      loaderContent = '<div class="loader-om">\u0950</div>';
    } else if (style === 'diya') {
      loaderContent = '<div class="loader-diya">\ud83e\ude94</div>';
    } else if (style === 'bars') {
      loaderContent = '<div class="loader-bars"><span></span><span></span><span></span><span></span><span></span></div>';
    } else if (style === 'ripple') {
      loaderContent = '<div class="loader-ripple"><span></span><span></span></div>';
    } else {
      loaderContent = '<div class="loader-spinner"></div>';
    }
    loaderContent += '<div class="loader-text">' + (F.loaderText || SITE_CONFIG.siteName || '') + '</div>';
    loader.innerHTML = loaderContent;
    document.body.appendChild(loader);
    window.addEventListener('load', function() { setTimeout(function() { loader.className = 'page-loader hide'; setTimeout(function() { loader.remove(); }, 500); }, 600); });
  }

  // Floating WhatsApp
  if (F.floatingWhatsapp !== false && SITE_CONFIG.whatsapp) {
    var wa = document.createElement('a');
    wa.className = 'float-wa';
    wa.href = 'https://wa.me/' + SITE_CONFIG.whatsapp;
    wa.target = '_blank';
    wa.title = 'Chat on WhatsApp';
    wa.innerHTML = '<svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>';
    document.body.appendChild(wa);
  }

  // Back to top
  if (F.backToTop !== false) {
    var btt = document.createElement('button');
  btt.className = 'back-top';
  btt.innerHTML = '&#9650;';
  btt.onclick = function() { window.scrollTo({ top: 0, behavior: 'smooth' }); };
  document.body.appendChild(btt);
  window.addEventListener('scroll', function() {
    btt.className = window.scrollY > 300 ? 'back-top visible' : 'back-top';
  });
}

}

// ============================================
// COPY PROTECTION
// ============================================
var cpEnabled = true;
if (typeof SITE_CONFIG !== 'undefined' && SITE_CONFIG.features && SITE_CONFIG.features.copyProtection === false) cpEnabled = false;
if (cpEnabled) {
document.oncontextmenu = function() { return false; };
document.oncopy = function() { return false; };
document.oncut = function() { return false; };
document.onpaste = function() { return false; };
document.ondragstart = function() { return false; };
document.onkeydown = function(e) {
  if (e.ctrlKey && (e.key === 'c' || e.key === 'C' || e.key === 'u' || e.key === 'U' || e.key === 's' || e.key === 'S' || e.key === 'a' || e.key === 'A')) return false;
  if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j')) return false;
  if (e.key === 'F12') return false;
};
}

// ============================================
// AUDIO
// ============================================
var audio = document.getElementById('mantraAudio');
var btn = document.getElementById('audioToggle');
var icon = document.getElementById('audioIcon');
var prompt = document.getElementById('audioPrompt');
var playing = false;

if (audio) audio.volume = 0.15;

function startPlaying() {
  if (!audio) return;
  audio.play();
  playing = true;
  icon.innerHTML = '&#x1F50A;';
  btn.className = 'audio-toggle';
  localStorage.setItem('mantraPlaying', '1');
}

function stopPlaying() {
  if (!audio) return;
  audio.pause();
  playing = false;
  icon.innerHTML = '&#x1F507;';
  btn.className = 'audio-toggle muted';
  localStorage.setItem('mantraPlaying', '0');
}

if (prompt) {
  if (localStorage.getItem('mantraAnswered')) {
    prompt.style.display = 'none';
    if (localStorage.getItem('mantraPlaying') === '1') startPlaying();
  }
} else {
  if (localStorage.getItem('mantraPlaying') === '1') startPlaying();
}

var enableBtn = document.getElementById('enableAudio');
if (enableBtn) {
  enableBtn.onclick = function() {
    prompt.style.display = 'none';
    localStorage.setItem('mantraAnswered', '1');
    startPlaying();
  };
}

var skipBtn = document.getElementById('skipAudio');
if (skipBtn) {
  skipBtn.onclick = function() {
    prompt.style.display = 'none';
    localStorage.setItem('mantraAnswered', '1');
    stopPlaying();
  };
}

if (btn) {
  btn.onclick = function() {
    if (playing) stopPlaying();
    else startPlaying();
  };
}

// ============================================
// CAROUSEL
// ============================================
var carouselEl = document.getElementById('carousel');
var indicatorsContainer = document.getElementById('indicators');

if (carouselEl && indicatorsContainer && typeof CAROUSEL_SLIDES !== 'undefined' && CAROUSEL_SLIDES.length) {
  for (var s = 0; s < CAROUSEL_SLIDES.length; s++) {
    var slideData = CAROUSEL_SLIDES[s];
    var slide = document.createElement('div');
    slide.className = s === 0 ? 'carousel-slide active' : 'carousel-slide';
    var img = document.createElement('img');
    img.src = slideData.image;
    img.alt = slideData.title;
    img.loading = s === 0 ? 'eager' : 'lazy';
    slide.appendChild(img);
    var overlay = document.createElement('div');
    overlay.className = 'carousel-overlay';
    overlay.innerHTML = '<h2>' + slideData.title + '</h2><p>' + slideData.text + '</p>';
    slide.appendChild(overlay);
    carouselEl.appendChild(slide);
  }

  var slides = carouselEl.querySelectorAll('.carousel-slide');
  var currentSlide = 0;
  var autoplayTimer;

  for (var i = 0; i < slides.length; i++) {
    var dot = document.createElement('span');
    dot.className = i === 0 ? 'dot active' : 'dot';
    (function(idx) { dot.onclick = function() { goToSlide(idx); }; })(i);
    indicatorsContainer.appendChild(dot);
  }

  function goToSlide(index) {
    slides[currentSlide].className = 'carousel-slide';
    indicatorsContainer.children[currentSlide].className = 'dot';
    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].className = 'carousel-slide active';
    indicatorsContainer.children[currentSlide].className = 'dot active';
    clearInterval(autoplayTimer);
    autoplayTimer = setInterval(function() { goToSlide(currentSlide + 1); }, 5000);
  }

  autoplayTimer = setInterval(function() { goToSlide(currentSlide + 1); }, 5000);
  var prevBtn = document.getElementById('prevBtn');
  var nextBtn = document.getElementById('nextBtn');
  if (prevBtn) prevBtn.onclick = function() { goToSlide(currentSlide - 1); };
  if (nextBtn) nextBtn.onclick = function() { goToSlide(currentSlide + 1); };
}

// ============================================
// MOBILE MENU
// ============================================
var menuBtn = document.getElementById('mobileMenuBtn');
var nav = document.getElementById('mainNav');
if (menuBtn && nav) {
  menuBtn.onclick = function() {
    nav.className = nav.className.indexOf('open') > -1 ? 'nav' : 'nav open';
  };
  var links = nav.querySelectorAll('a');
  for (var j = 0; j < links.length; j++) {
    links[j].onclick = function() { nav.className = 'nav'; };
  }
}

// ============================================
// GALLERY - folder-based from gallery-config.js
// ============================================
var ITEMS_PER_PAGE = 6;
var galleryGrid = document.getElementById('galleryGrid');
var filtersDiv = document.getElementById('galleryFilters');
var pagDiv = document.getElementById('pagination');
var allItems = [];
var curFilter = 'all';
var curPage = 1;

if (galleryGrid && typeof GALLERY_FOLDERS !== 'undefined' && GALLERY_FOLDERS.length) {
  if (filtersDiv) {
    var allBtn = document.createElement('button');
    allBtn.className = 'filter-btn active';
    allBtn.setAttribute('data-filter', 'all');
    allBtn.textContent = 'All';
    filtersDiv.appendChild(allBtn);
  }

  for (var f = 0; f < GALLERY_FOLDERS.length; f++) {
    var folderData = GALLERY_FOLDERS[f];
    var folderName = folderData.folder;
    var basePath = 'assets/images/gallery/' + folderName + '/';

    if (filtersDiv) {
      var catBtn = document.createElement('button');
      catBtn.className = 'filter-btn';
      catBtn.setAttribute('data-filter', folderName);
      catBtn.textContent = folderName.charAt(0).toUpperCase() + folderName.slice(1);
      filtersDiv.appendChild(catBtn);
    }

    for (var gi = 0; gi < folderData.images.length; gi++) {
      var fileName = folderData.images[gi];
      var caption = fileName.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ');
      caption = caption.replace(/\b\w/g, function(c) { return c.toUpperCase(); });

      var item = document.createElement('div');
      item.className = 'gallery-item';
      item.setAttribute('data-category', folderName);
      var gImg = document.createElement('img');
      gImg.src = basePath + fileName;
      gImg.alt = caption;
      gImg.loading = 'lazy';
      item.appendChild(gImg);
      var capDiv = document.createElement('div');
      capDiv.className = 'gallery-caption';
      capDiv.textContent = caption;
      item.appendChild(capDiv);
      galleryGrid.appendChild(item);
    }
  }

  allItems = galleryGrid.querySelectorAll('.gallery-item');
  var filters = filtersDiv ? filtersDiv.querySelectorAll('.filter-btn') : [];

  for (var ff = 0; ff < filters.length; ff++) {
    (function(filterBtn) {
      filterBtn.onclick = function() {
        for (var x = 0; x < filters.length; x++) filters[x].className = 'filter-btn';
        filterBtn.className = 'filter-btn active';
        curFilter = filterBtn.getAttribute('data-filter');
        curPage = 1;
        showGallery();
      };
    })(filters[ff]);
  }
  showGallery();
}

function getFiltered() {
  var arr = [];
  for (var i = 0; i < allItems.length; i++) {
    if (curFilter === 'all' || allItems[i].getAttribute('data-category') === curFilter) arr.push(allItems[i]);
  }
  return arr;
}

function showGallery() {
  var filtered = getFiltered();
  var total = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  if (curPage > total) curPage = total || 1;
  var start = (curPage - 1) * ITEMS_PER_PAGE;
  var end = start + ITEMS_PER_PAGE;
  for (var i = 0; i < allItems.length; i++) allItems[i].style.display = 'none';
  for (var j = start; j < end && j < filtered.length; j++) filtered[j].style.display = '';
  buildPagination(total);
}

function buildPagination(total) {
  if (!pagDiv) return;
  pagDiv.innerHTML = '';
  if (total <= 1) return;
  var prev = document.createElement('button');
  prev.className = 'page-btn nav-btn'; prev.textContent = '< Prev';
  prev.disabled = curPage === 1;
  prev.onclick = function() { curPage--; showGallery(); };
  pagDiv.appendChild(prev);
  for (var i = 1; i <= total; i++) {
    (function(p) {
      var b = document.createElement('button');
      b.className = p === curPage ? 'page-btn active' : 'page-btn';
      b.textContent = p;
      b.onclick = function() { curPage = p; showGallery(); };
      pagDiv.appendChild(b);
    })(i);
  }
  var next = document.createElement('button');
  next.className = 'page-btn nav-btn'; next.textContent = 'Next >';
  next.disabled = curPage === total;
  next.onclick = function() { curPage++; showGallery(); };
  pagDiv.appendChild(next);
}

// ============================================
// SHOP - auto-detect vendor from URL, images from vendor CDN
// ============================================
function detectStore(url) {
  var u = url.toLowerCase();
  var known = [
    ['amazon', 'Amazon', '#ff9900'],
    ['flipkart', 'Flipkart', '#2874f0'],
    ['meesho', 'Meesho', '#570741'],
    ['myntra', 'Myntra', '#ff3e6c'],
    ['jiomart', 'JioMart', '#0078ad'],
    ['snapdeal', 'Snapdeal', '#e40046'],
    ['ajio', 'AJIO', '#3b3b3b'],
    ['nykaa', 'Nykaa', '#fc2779'],
    ['tatacliq', 'Tata CLiQ', '#2d2d2d'],
    ['bigbasket', 'BigBasket', '#84c225'],
    ['croma', 'Croma', '#0f7c40'],
    ['firstcry', 'FirstCry', '#f47920'],
    ['pepperfry', 'Pepperfry', '#d84315'],
    ['shopsy', 'Shopsy', '#6c3baa'],
    ['indiamart', 'IndiaMart', '#2b5797'],
    ['ebay', 'eBay', '#e53238'],
    ['aliexpress', 'AliExpress', '#e62e04']
  ];
  for (var i = 0; i < known.length; i++) {
    if (u.indexOf(known[i][0]) > -1) return { name: known[i][1], color: known[i][2] };
  }
  try {
    var domain = u.split('//')[1].split('/')[0].replace('www.', '').split('.')[0];
    return { name: domain.charAt(0).toUpperCase() + domain.slice(1), color: '#555' };
  } catch(e) { return { name: 'Buy Online', color: '#555' }; }
}

var shopGrid = document.getElementById('shopGrid');
var shopFiltersDiv = document.getElementById('shopFilters');
var shopPagDiv = document.getElementById('shopPagination');
var shopItems = [];
var shopFilter = 'all';
var shopPage = 1;
var SHOP_PER_PAGE = 8;

// Detect shop style from config
var shopStyle = 'products';
if (typeof SITE_CONFIG !== 'undefined' && SITE_CONFIG.shopPage) shopStyle = SITE_CONFIG.shopPage.style || 'products';

if (shopGrid) {

  // === STYLE 2: Categories ===
  if (shopStyle === 'categories' && typeof SHOP_CATEGORIES !== 'undefined' && SHOP_CATEGORIES.length) {
    shopGrid.className = 'shop-cat-grid';
    for (var ci = 0; ci < SHOP_CATEGORIES.length; ci++) {
      var cat = SHOP_CATEGORIES[ci];
      var card = document.createElement('div');
      card.className = 'shop-cat-card';
      var linksHtml = '';
      for (var li = 0; li < cat.links.length; li++) {
        var st = detectStore(cat.links[li].url);
        linksHtml += '<a class="shop-cat-link" href="' + cat.links[li].url + '" target="_blank" rel="nofollow" style="background:' + st.color + '">Buy on ' + st.name + '</a>';
      }
      card.innerHTML = '<div class="shop-cat-icon">' + cat.icon + '</div><h3>' + cat.name + '</h3><p>' + cat.description + '</p><div class="shop-cat-links">' + linksHtml + '</div>';
      shopGrid.appendChild(card);
    }
  }

  // === STYLE 3: Collections ===
  else if (shopStyle === 'collections' && typeof SHOP_COLLECTIONS !== 'undefined' && SHOP_COLLECTIONS.length) {
    shopGrid.className = 'shop-coll-grid';
    for (var co = 0; co < SHOP_COLLECTIONS.length; co++) {
      var coll = SHOP_COLLECTIONS[co];
      var itemsHtml = '';
      for (var it = 0; it < coll.items.length; it++) itemsHtml += '<span>' + coll.items[it] + '</span>';
      var card = document.createElement('a');
      card.className = 'shop-coll-card';
      card.href = coll.link;
      card.target = '_blank';
      card.rel = 'nofollow';
      card.innerHTML = '<img class="shop-coll-img" src="' + coll.image + '" alt="' + coll.name + '">' +
        '<div class="shop-coll-body"><h3>' + coll.name + '</h3><p>' + coll.description + '</p>' +
        '<div class="shop-coll-items">' + itemsHtml + '</div>' +
        '<div class="shop-coll-btn">Shop This Collection →</div></div>';
      shopGrid.appendChild(card);
    }
  }

  // === STYLE 4: Compare ===
  else if (shopStyle === 'compare' && typeof SHOP_COMPARE !== 'undefined' && SHOP_COMPARE.length) {
    shopGrid.className = 'shop-comp-grid';
    for (var cm = 0; cm < SHOP_COMPARE.length; cm++) {
      var comp = SHOP_COMPARE[cm];
      var storesHtml = '';
      for (var si = 0; si < comp.stores.length; si++) {
        var st = detectStore(comp.stores[si].url);
        storesHtml += '<a class="shop-comp-store" href="' + comp.stores[si].url + '" target="_blank" rel="nofollow" style="background:' + st.color + '">Buy on ' + st.name + '</a>';
      }
      var card = document.createElement('div');
      card.className = 'shop-comp-card';
      card.innerHTML = '<img class="shop-comp-img" src="' + comp.image + '" alt="' + comp.name + '">' +
        '<div class="shop-comp-body"><h3>' + comp.name + '</h3><div class="shop-comp-stores">' + storesHtml + '</div></div>';
      shopGrid.appendChild(card);
    }
  }

  // === STYLE 1: Products (default) ===
  else if (typeof SHOP_ITEMS !== 'undefined' && SHOP_ITEMS.length) {

  var shopCats = [];
  for (var si = 0; si < SHOP_ITEMS.length; si++) {
    if (shopCats.indexOf(SHOP_ITEMS[si].cat) === -1) shopCats.push(SHOP_ITEMS[si].cat);
  }

  if (shopFiltersDiv) {
    var allShopBtn = document.createElement('button');
    allShopBtn.className = 'filter-btn active';
    allShopBtn.setAttribute('data-filter', 'all');
    allShopBtn.textContent = 'All';
    shopFiltersDiv.appendChild(allShopBtn);
    for (var sc = 0; sc < shopCats.length; sc++) {
      var scBtn = document.createElement('button');
      scBtn.className = 'filter-btn';
      scBtn.setAttribute('data-filter', shopCats[sc]);
      scBtn.textContent = shopCats[sc].replace(/-/g, ' ').replace(/\b\w/g, function(ch) { return ch.toUpperCase(); });
      shopFiltersDiv.appendChild(scBtn);
    }
  }

  for (var p = 0; p < SHOP_ITEMS.length; p++) {
    var prod = SHOP_ITEMS[p];
    var store = detectStore(prod.url);

    var card = document.createElement('a');
    card.className = 'shop-card';
    card.href = prod.url;
    card.target = '_blank';
    card.rel = 'noopener noreferrer nofollow';
    card.setAttribute('data-category', prod.cat);

    var pImg = document.createElement('img');
    pImg.className = 'shop-card-img';
    pImg.src = prod.img;
    pImg.alt = prod.name;
    pImg.loading = 'lazy';
    card.appendChild(pImg);

    var body = document.createElement('div');
    body.className = 'shop-card-body';

    var nameEl = document.createElement('div');
    nameEl.className = 'shop-card-name';
    nameEl.textContent = prod.name;
    body.appendChild(nameEl);

    var buyBtn = document.createElement('div');
    buyBtn.className = 'shop-buy-btn';
    buyBtn.style.background = store.color;
    buyBtn.style.color = '#fff';
    buyBtn.textContent = 'Buy on ' + store.name;
    body.appendChild(buyBtn);

    card.appendChild(body);
    shopGrid.appendChild(card);
  }

  shopItems = shopGrid.querySelectorAll('.shop-card');
  var shopFilterBtns = shopFiltersDiv ? shopFiltersDiv.querySelectorAll('.filter-btn') : [];

  function getShopFiltered() {
    var arr = [];
    for (var i = 0; i < shopItems.length; i++) {
      if (shopFilter === 'all' || shopItems[i].getAttribute('data-category') === shopFilter) arr.push(shopItems[i]);
    }
    return arr;
  }

  function showShop() {
    var filtered = getShopFiltered();
    var total = Math.ceil(filtered.length / SHOP_PER_PAGE);
    if (shopPage > total) shopPage = total || 1;
    var start = (shopPage - 1) * SHOP_PER_PAGE;
    var end = start + SHOP_PER_PAGE;
    for (var i = 0; i < shopItems.length; i++) shopItems[i].style.display = 'none';
    for (var j = start; j < end && j < filtered.length; j++) filtered[j].style.display = '';
    buildShopPag(total);
  }

  function buildShopPag(total) {
    if (!shopPagDiv) return;
    shopPagDiv.innerHTML = '';
    if (total <= 1) return;
    var prev = document.createElement('button');
    prev.className = 'page-btn nav-btn'; prev.textContent = '< Prev';
    prev.disabled = shopPage === 1;
    prev.onclick = function() { shopPage--; showShop(); };
    shopPagDiv.appendChild(prev);
    for (var i = 1; i <= total; i++) {
      (function(pg) {
        var b = document.createElement('button');
        b.className = pg === shopPage ? 'page-btn active' : 'page-btn';
        b.textContent = pg;
        b.onclick = function() { shopPage = pg; showShop(); };
        shopPagDiv.appendChild(b);
      })(i);
    }
    var next = document.createElement('button');
    next.className = 'page-btn nav-btn'; next.textContent = 'Next >';
    next.disabled = shopPage === total;
    next.onclick = function() { shopPage++; showShop(); };
    shopPagDiv.appendChild(next);
  }

  for (var sf = 0; sf < shopFilterBtns.length; sf++) {
    (function(sbtn) {
      sbtn.onclick = function() {
        for (var x = 0; x < shopFilterBtns.length; x++) shopFilterBtns[x].className = 'filter-btn';
        sbtn.className = 'filter-btn active';
        shopFilter = sbtn.getAttribute('data-filter');
        shopPage = 1;
        showShop();
      };
    })(shopFilterBtns[sf]);
  }

  showShop();
  }
}

// ============================================
// GRANDHAS (Sacred Books) - auto-built from grandhas-config.js
// ============================================
var grandhaGrid = document.getElementById('grandhaGrid');
var grandhaFiltersDiv = document.getElementById('grandhaFilters');
var grandhaPagDiv = document.getElementById('grandhaPagination');
var grandhaItems = [];
var grandhaFilter = 'all';
var grandhaPage = 1;
var GRANDHA_PER_PAGE = 8;

if (grandhaGrid && typeof GRANDHAS !== 'undefined' && GRANDHAS.length) {

  var grandhaCats = [];
  for (var gi = 0; gi < GRANDHAS.length; gi++) {
    if (grandhaCats.indexOf(GRANDHAS[gi].cat) === -1) grandhaCats.push(GRANDHAS[gi].cat);
  }

  if (grandhaFiltersDiv) {
    var allGBtn = document.createElement('button');
    allGBtn.className = 'filter-btn active';
    allGBtn.setAttribute('data-filter', 'all');
    allGBtn.textContent = 'All';
    grandhaFiltersDiv.appendChild(allGBtn);
    for (var gc = 0; gc < grandhaCats.length; gc++) {
      var gcBtn = document.createElement('button');
      gcBtn.className = 'filter-btn';
      gcBtn.setAttribute('data-filter', grandhaCats[gc]);
      gcBtn.textContent = grandhaCats[gc].replace(/-/g, ' ').replace(/\b\w/g, function(ch) { return ch.toUpperCase(); });
      grandhaFiltersDiv.appendChild(gcBtn);
    }
  }

  for (var gb = 0; gb < GRANDHAS.length; gb++) {
    var book = GRANDHAS[gb];

    var card = document.createElement('div');
    card.className = 'grandha-card';
    card.setAttribute('data-category', book.cat);

    var coverImg = document.createElement('img');
    coverImg.className = 'grandha-cover';
    coverImg.src = book.cover;
    coverImg.alt = book.name;
    coverImg.loading = 'lazy';
    card.appendChild(coverImg);

    var body = document.createElement('div');
    body.className = 'grandha-body';

    var catTag = document.createElement('span');
    catTag.className = 'grandha-cat';
    catTag.textContent = book.cat.replace(/-/g, ' ');
    body.appendChild(catTag);

    var nameEl = document.createElement('div');
    nameEl.className = 'grandha-name';
    nameEl.textContent = book.name;
    body.appendChild(nameEl);

    var actions = document.createElement('div');
    actions.className = 'grandha-actions';

    var readBtn = document.createElement('a');
    readBtn.className = 'grandha-btn read';
    readBtn.href = book.pdf;
    readBtn.target = '_blank';
    readBtn.textContent = '📖 Read';
    actions.appendChild(readBtn);

    var dlBtn = document.createElement('a');
    dlBtn.className = 'grandha-btn download';
    dlBtn.href = book.pdf;
    dlBtn.setAttribute('download', '');
    dlBtn.textContent = '⬇ Download';
    actions.appendChild(dlBtn);

    body.appendChild(actions);

    var freeTag = document.createElement('div');
    freeTag.className = 'grandha-free';
    freeTag.textContent = '🙏 Free — Temple Seva';
    body.appendChild(freeTag);

    card.appendChild(body);
    grandhaGrid.appendChild(card);
  }

  grandhaItems = grandhaGrid.querySelectorAll('.grandha-card');
  var grandhaFilterBtns = grandhaFiltersDiv ? grandhaFiltersDiv.querySelectorAll('.filter-btn') : [];

  function getGrandhaFiltered() {
    var arr = [];
    for (var i = 0; i < grandhaItems.length; i++) {
      if (grandhaFilter === 'all' || grandhaItems[i].getAttribute('data-category') === grandhaFilter) arr.push(grandhaItems[i]);
    }
    return arr;
  }

  function showGrandhas() {
    var filtered = getGrandhaFiltered();
    var total = Math.ceil(filtered.length / GRANDHA_PER_PAGE);
    if (grandhaPage > total) grandhaPage = total || 1;
    var start = (grandhaPage - 1) * GRANDHA_PER_PAGE;
    var end = start + GRANDHA_PER_PAGE;
    for (var i = 0; i < grandhaItems.length; i++) grandhaItems[i].style.display = 'none';
    for (var j = start; j < end && j < filtered.length; j++) filtered[j].style.display = '';
    buildGrandhaPag(total);
  }

  function buildGrandhaPag(total) {
    if (!grandhaPagDiv) return;
    grandhaPagDiv.innerHTML = '';
    if (total <= 1) return;
    var prev = document.createElement('button');
    prev.className = 'page-btn nav-btn'; prev.textContent = '< Prev';
    prev.disabled = grandhaPage === 1;
    prev.onclick = function() { grandhaPage--; showGrandhas(); };
    grandhaPagDiv.appendChild(prev);
    for (var i = 1; i <= total; i++) {
      (function(pg) {
        var b = document.createElement('button');
        b.className = pg === grandhaPage ? 'page-btn active' : 'page-btn';
        b.textContent = pg;
        b.onclick = function() { grandhaPage = pg; showGrandhas(); };
        grandhaPagDiv.appendChild(b);
      })(i);
    }
    var next = document.createElement('button');
    next.className = 'page-btn nav-btn'; next.textContent = 'Next >';
    next.disabled = grandhaPage === total;
    next.onclick = function() { grandhaPage++; showGrandhas(); };
    grandhaPagDiv.appendChild(next);
  }

  for (var gf = 0; gf < grandhaFilterBtns.length; gf++) {
    (function(gbtn) {
      gbtn.onclick = function() {
        for (var x = 0; x < grandhaFilterBtns.length; x++) grandhaFilterBtns[x].className = 'filter-btn';
        gbtn.className = 'filter-btn active';
        grandhaFilter = gbtn.getAttribute('data-filter');
        grandhaPage = 1;
        showGrandhas();
      };
    })(grandhaFilterBtns[gf]);
  }

  showGrandhas();
}

// ============================================
// DONATE - Two separate carousels: QR + Bank
// ============================================
function buildDonateCarousel(items, containerId, dotsId, prevId, nextId, buildSlide) {
  var container = document.getElementById(containerId);
  var dotsEl = document.getElementById(dotsId);
  if (!container || !items || !items.length) return;

  var idx = 0;
  for (var i = 0; i < items.length; i++) {
    var slide = document.createElement('div');
    slide.className = i === 0 ? 'donate-slide active' : 'donate-slide';
    slide.innerHTML = buildSlide(items[i]);
    container.appendChild(slide);

    if (dotsEl) {
      var dot = document.createElement('span');
      dot.className = i === 0 ? 'donate-dot active' : 'donate-dot';
      (function(di) { dot.onclick = function() { show(di); }; })(i);
      dotsEl.appendChild(dot);
    }
  }

  var slides = container.querySelectorAll('.donate-slide');
  var dots = dotsEl ? dotsEl.querySelectorAll('.donate-dot') : [];

  function show(n) {
    slides[idx].className = 'donate-slide';
    if (dots[idx]) dots[idx].className = 'donate-dot';
    idx = (n + slides.length) % slides.length;
    slides[idx].className = 'donate-slide active';
    if (dots[idx]) dots[idx].className = 'donate-dot active';
  }

  var prev = document.getElementById(prevId);
  var next = document.getElementById(nextId);
  if (prev) prev.onclick = function() { show(idx - 1); };
  if (next) next.onclick = function() { show(idx + 1); };

  if (items.length <= 1) {
    if (prev) prev.style.display = 'none';
    if (next) next.style.display = 'none';
    if (dotsEl) dotsEl.style.display = 'none';
  }
}

// QR label translations
var upiLabel = { en: 'UPI ID:', te: 'UPI ID:', hi: 'UPI ID:', sa: 'UPI सङ्केतः:' };
var uL = upiLabel[currentLang] || upiLabel['en'];

// Donate page visibility
var donateShowQR = true;
var donateShowBank = true;
if (typeof SITE_CONFIG !== 'undefined' && SITE_CONFIG.donatePage) {
  donateShowQR = SITE_CONFIG.donatePage.showQR !== false;
  donateShowBank = SITE_CONFIG.donatePage.showBank !== false;
}

// Hide QR column if disabled
var qrColEl = document.getElementById('qrCarousel');
if (qrColEl && !donateShowQR) {
  var qrSection = qrColEl.parentElement;
  while (qrSection && qrSection.className.indexOf('donate-col') === -1) qrSection = qrSection.parentElement;
  if (qrSection) qrSection.style.display = 'none';
}

// Hide Bank column if disabled
var bankColEl = document.getElementById('bankCarousel');
if (bankColEl && !donateShowBank) {
  var bankSection = bankColEl.parentElement;
  while (bankSection && bankSection.className.indexOf('donate-col') === -1) bankSection = bankSection.parentElement;
  if (bankSection) bankSection.style.display = 'none';
}

// If only one column visible, make it full width
var twoCol = document.querySelector('.donate-two-col');
if (twoCol && (!donateShowQR || !donateShowBank)) {
  twoCol.style.gridTemplateColumns = '1fr';
  twoCol.style.maxWidth = '500px';
  twoCol.style.margin = '0 auto';
}

// QR Carousel
if (typeof DONATE_QR !== 'undefined' && donateShowQR) {
  buildDonateCarousel(DONATE_QR, 'qrCarousel', 'qrDots', 'qrPrev', 'qrNext', function(item) {
    var t = (typeof item.title === 'object') ? (item.title[currentLang] || item.title['en']) : item.title;
    return '<div class="donate-slide-title">' + t + '</div>' +
      '<div class="qr-box"><img src="' + item.qrImage + '" alt="QR Code" class="qr-image"></div>' +
      '<div class="upi-id-box"><span>' + uL + '</span><strong>' + item.upiId + '</strong></div>';
  });
}

// Bank label translations
var bankLabels = {
  en: { accountName: 'Account Name', accountNumber: 'Account Number', bankName: 'Bank Name', branch: 'Branch', ifsc: 'IFSC Code', accountType: 'Account Type' },
  te: { accountName: 'ఖాతా పేరు', accountNumber: 'ఖాతా నంబర్', bankName: 'బ్యాంక్ పేరు', branch: 'శాఖ', ifsc: 'IFSC కోడ్', accountType: 'ఖాతా రకం' },
  hi: { accountName: 'खाता नाम', accountNumber: 'खाता संख्या', bankName: 'बैंक का नाम', branch: 'शाखा', ifsc: 'IFSC कोड', accountType: 'खाता प्रकार' },
  sa: { accountName: 'खातनाम', accountNumber: 'खातसङ्ख्या', bankName: 'कोषागारनाम', branch: 'शाखा', ifsc: 'IFSC सङ्केतः', accountType: 'खातप्रकारः' }
};
var bL = bankLabels[currentLang] || bankLabels['en'];

// Bank Carousel
if (typeof DONATE_BANKS !== 'undefined' && donateShowBank) {
  buildDonateCarousel(DONATE_BANKS, 'bankCarousel', 'bankDots', 'bankPrev', 'bankNext', function(item) {
    var t = (typeof item.title === 'object') ? (item.title[currentLang] || item.title['en']) : item.title;
    return '<div class="donate-slide-title">' + t + '</div>' +
      '<div class="bank-details">' +
        '<div class="bank-row"><span class="bank-label">' + bL.accountName + '</span><span class="bank-value">' + item.accountName + '</span></div>' +
        '<div class="bank-row"><span class="bank-label">' + bL.accountNumber + '</span><span class="bank-value">' + item.accountNumber + '</span></div>' +
        '<div class="bank-row"><span class="bank-label">' + bL.bankName + '</span><span class="bank-value">' + item.bankName + '</span></div>' +
        '<div class="bank-row"><span class="bank-label">' + bL.branch + '</span><span class="bank-value">' + item.branch + '</span></div>' +
        '<div class="bank-row"><span class="bank-label">' + bL.ifsc + '</span><span class="bank-value">' + item.ifsc + '</span></div>' +
        '<div class="bank-row"><span class="bank-label">' + bL.accountType + '</span><span class="bank-value">' + item.accountType + '</span></div>' +
      '</div>';
  });
}

// ============================================
// STALA PURANAM - content blocks from puranam-config.js
// ============================================
var puranamEl = document.getElementById('puranamContent');
if (puranamEl && typeof STALA_PURANAM !== 'undefined' && STALA_PURANAM.length) {
  var singleTheme = (typeof PURANAM_PAGE_THEME !== 'undefined' && PURANAM_PAGE_THEME !== 'mixed') ? PURANAM_PAGE_THEME : null;
  var carouselCount = 0;
  for (var pi = 0; pi < STALA_PURANAM.length; pi++) {
    var block = STALA_PURANAM[pi];
    var theme = singleTheme || block.theme || 'paragraph';
    var div = document.createElement('div');
    div.className = 'pb';
    var html = '';
    var titleHtml = block.title ? '<h2 class="pb-title">' + block.title + '</h2>' : '';
    var textHtml = '<div class="pb-text">' + block.text + '</div>';

    if (theme === 'paragraph') {
      html = titleHtml + textHtml;
    }
    else if (theme === 'top-media') {
      if (block.video) html = '<video class="pb-top-media" controls><source src="' + block.video + '" type="video/mp4"></video>';
      else if (block.image) html = '<img class="pb-top-media" src="' + block.image + '" alt="">';
      html += titleHtml + textHtml;
    }
    else if (theme === 'image-paragraph') {
      var rev = block.position === 'right' ? ' reverse' : '';
      html = titleHtml + '<div class="pb-row' + rev + '"><img class="pb-img" src="' + block.image + '" alt="">' + textHtml + '</div>';
    }
    else if (theme === 'video-paragraph') {
      var rev2 = block.position === 'right' ? ' reverse' : '';
      html = titleHtml + '<div class="pb-row' + rev2 + '"><video class="pb-video" controls><source src="' + block.video + '" type="video/mp4"></video>' + textHtml + '</div>';
    }
    else if (theme === 'audio-paragraph') {
      html = titleHtml + '<audio class="pb-audio" controls><source src="' + block.audio + '" type="audio/mpeg"></audio>' + textHtml;
    }
    else if (theme === 'carousel-paragraph' || theme === 'carousel-then-paragraph') {
      var cid = 'pbcar' + carouselCount++;
      html = titleHtml + buildPBCarousel(cid, block.images.map(function(s){return {type:'image',src:s};})) + textHtml;
    }
    else if (theme === 'video-carousel-paragraph') {
      var cid2 = 'pbcar' + carouselCount++;
      html = titleHtml + buildPBCarousel(cid2, block.videos.map(function(s){return {type:'video',src:s};})) + textHtml;
    }
    else if (theme === 'mixed-carousel-paragraph') {
      var cid3 = 'pbcar' + carouselCount++;
      html = titleHtml + buildPBCarousel(cid3, block.media) + textHtml;
    }

    div.innerHTML = html;
    puranamEl.appendChild(div);

    // Insert inline ads between blocks
    if (typeof ADS_CONFIG !== 'undefined' && ADS_CONFIG.enabled) {
      var inlineAds = getAdsFor('inline', 'puranam');
      if (inlineAds.length && pi === Math.floor(STALA_PURANAM.length / 2) - 1) {
        var adDiv = document.createElement('div');
        adDiv.className = 'ad-inline';
        adDiv.innerHTML = renderAd(inlineAds[0]);
        puranamEl.appendChild(adDiv);
      }
    }
  }

  // Init all puranam carousels
  initPBCarousels();
}

function buildPBCarousel(id, items) {
  var h = '<div class="pb-carousel" id="' + id + '"><div class="pb-carousel-inner">';
  for (var i = 0; i < items.length; i++) {
    h += '<div class="pb-carousel-slide">';
    if (items[i].type === 'video') h += '<video controls><source src="' + items[i].src + '" type="video/mp4"></video>';
    else h += '<img src="' + items[i].src + '" alt="">';
    h += '</div>';
  }
  h += '</div><button class="pb-carousel-nav prev" onclick="slidePB(\'' + id + '\',-1)">&#10094;</button><button class="pb-carousel-nav next" onclick="slidePB(\'' + id + '\',1)">&#10095;</button>';
  h += '<div class="pb-carousel-dots">';
  for (var d = 0; d < items.length; d++) h += '<span' + (d===0?' class="active"':'') + ' onclick="goToPB(\'' + id + '\',' + d + ')"></span>';
  h += '</div></div>';
  return h;
}

var pbIndexes = {};
function initPBCarousels() {
  var cars = document.querySelectorAll('.pb-carousel');
  for (var c = 0; c < cars.length; c++) pbIndexes[cars[c].id] = 0;
}
function slidePB(id, dir) { var total = document.querySelectorAll('#'+id+' .pb-carousel-slide').length; goToPB(id, (pbIndexes[id]||0)+dir); }
function goToPB(id, idx) {
  var slides = document.querySelectorAll('#'+id+' .pb-carousel-slide');
  var dots = document.querySelectorAll('#'+id+' .pb-carousel-dots span');
  if (!slides.length) return;
  idx = (idx + slides.length) % slides.length;
  pbIndexes[id] = idx;
  document.querySelector('#'+id+' .pb-carousel-inner').style.transform = 'translateX(-' + (idx*100) + '%)';
  for (var d = 0; d < dots.length; d++) dots[d].className = d===idx ? 'active' : '';
}

// ============================================
// ADVERTISEMENTS - site-wide from ads-config.js
// ============================================
function getAdsFor(placement, page) {
  if (typeof ADS_CONFIG === 'undefined' || !ADS_CONFIG.enabled) return [];
  var now = new Date().toISOString().split('T')[0];
  var results = [];
  for (var a = 0; a < ADS_CONFIG.ads.length; a++) {
    var ad = ADS_CONFIG.ads[a];
    if (!ADS_CONFIG.types[ad.type]) continue;
    if (ad.placement !== placement) continue;
    if (ad.pages !== 'all') {
      var found = false;
      for (var p = 0; p < ad.pages.length; p++) { if (ad.pages[p] === page) { found = true; break; } }
      if (!found) continue;
    }
    if (ad.startDate && now < ad.startDate) continue;
    if (ad.endDate && now > ad.endDate) continue;
    results.push(ad);
  }
  return results;
}

function renderAd(ad) {
  var h = '';
  if (ad.type === 'video') {
    h = '<video class="ad-video" controls poster="' + (ad.poster||'') + '"><source src="' + ad.video + '" type="video/mp4"></video>';
    if (ad.link) h = '<a href="' + ad.link + '" target="_blank" rel="nofollow">' + h + '</a>';
  } else {
    h = '<img src="' + ad.image + '" alt="' + (ad.alt||'') + '">';
    if (ad.type === 'clickable' && ad.link) h = '<a href="' + ad.link + '" target="_blank" rel="nofollow">' + h + '</a>';
  }
  if (ad.type === 'campaign') h += '<div class="ad-label">Campaign</div>';
  return h;
}

// Place ads on current page - create containers dynamically if needed
if (typeof ADS_CONFIG !== 'undefined' && ADS_CONFIG.enabled) {
  var curPageName = (window.location.pathname.split('/').pop() || 'index.html').replace('.html', '');
  if (curPageName === 'index') curPageName = 'home';
  if (curPageName === 'books') curPageName = 'grandhas';

  // Banner top - inject before first section
  var topAds = getAdsFor('banner-top', curPageName);
  if (topAds.length) {
    var topEl = document.getElementById('adBannerTop');
    if (!topEl) {
      topEl = document.createElement('div');
      topEl.id = 'adBannerTop';
      var firstSection = document.querySelector('.section') || document.querySelector('.carousel-section');
      if (firstSection) firstSection.parentNode.insertBefore(topEl, firstSection);
    }
    if (topEl) { topEl.className = 'ad-banner'; topEl.innerHTML = renderAd(topAds[0]); }
  }

  // Banner bottom - inject before footer
  var botAds = getAdsFor('banner-bottom', curPageName);
  if (botAds.length) {
    var botEl = document.getElementById('adBannerBottom');
    if (!botEl) {
      botEl = document.createElement('div');
      botEl.id = 'adBannerBottom';
      var footer = document.querySelector('.footer');
      if (footer) footer.parentNode.insertBefore(botEl, footer);
    }
    if (botEl) { botEl.className = 'ad-banner'; botEl.innerHTML = renderAd(botAds[0]); }
  }

  // Sidebar left
  var leftAds = getAdsFor('sidebar-left', curPageName);
  var leftEl = document.getElementById('adSidebarLeft');
  if (leftEl && leftAds.length) {
    for (var la = 0; la < leftAds.length; la++) {
      var ld = document.createElement('div'); ld.className = 'ad-sidebar'; ld.innerHTML = renderAd(leftAds[la]); leftEl.appendChild(ld);
    }
  }

  // Sidebar right
  var rightAds = getAdsFor('sidebar-right', curPageName);
  var rightEl = document.getElementById('adSidebarRight');
  if (rightEl && rightAds.length) {
    for (var ra = 0; ra < rightAds.length; ra++) {
      var rd = document.createElement('div'); rd.className = 'ad-sidebar'; rd.innerHTML = renderAd(rightAds[ra]); rightEl.appendChild(rd);
    }
  }

  // Inline ads - inject between sections
  var inlineAds = getAdsFor('inline', curPageName);
  if (inlineAds.length) {
    var sections = document.querySelectorAll('.section');
    if (sections.length > 1) {
      var midIdx = Math.floor(sections.length / 2);
      var adDiv = document.createElement('div');
      adDiv.className = 'ad-inline';
      adDiv.innerHTML = renderAd(inlineAds[0]);
      sections[midIdx].parentNode.insertBefore(adDiv, sections[midIdx]);
    }
  }
}

// ============================================
// EVENTS - auto-built from events-config.js
// ============================================
var eventsGrid = document.getElementById('eventsGrid');
if (eventsGrid && typeof EVENTS_CONFIG !== 'undefined' && EVENTS_CONFIG.events.length) {
  var today = new Date(); today.setHours(0,0,0,0);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var evFilter = 'all';

  function getEventDate(ev) {
    var d = new Date(ev.date);
    if (ev.recurring === 'yearly') { d.setFullYear(today.getFullYear()); if (d < today) d.setFullYear(today.getFullYear() + 1); }
    return d;
  }

  function renderEvents() {
    var upcoming = [], past = [];
    for (var i = 0; i < EVENTS_CONFIG.events.length; i++) {
      var ev = EVENTS_CONFIG.events[i];
      var d = getEventDate(ev);
      if (d >= today) upcoming.push({ev:ev, date:d});
      else if (ev.recurring !== 'once' || EVENTS_CONFIG.showPastEvents) past.push({ev:ev, date:d});
    }
    upcoming.sort(function(a,b){return a.date-b.date;});
    past.sort(function(a,b){return b.date-a.date;});

    // Filters
    var types = ['all'];
    for (var i = 0; i < EVENTS_CONFIG.events.length; i++) {
      if (types.indexOf(EVENTS_CONFIG.events[i].type) === -1) types.push(EVENTS_CONFIG.events[i].type);
    }
    var fEl = document.getElementById('eventFilters');
    if (fEl) {
      fEl.innerHTML = '';
      for (var t = 0; t < types.length; t++) {
        var b = document.createElement('button');
        b.className = 'filter-btn' + (evFilter === types[t] ? ' active' : '');
        b.textContent = types[t] === 'all' ? 'All' : types[t].charAt(0).toUpperCase() + types[t].slice(1);
        (function(type) { b.onclick = function() { evFilter = type; renderEvents(); }; })(types[t]);
        fEl.appendChild(b);
      }
    }

    // Countdown
    var cdEl = document.getElementById('eventCountdown');
    if (cdEl && EVENTS_CONFIG.showCountdown && upcoming.length) {
      var next = upcoming[0];
      var diff = next.date - today;
      var days = Math.ceil(diff / 86400000);
      cdEl.innerHTML = '<div class="event-countdown"><h3>🙏 Next: ' + next.ev.name + '</h3><div class="countdown-boxes"><div class="countdown-box"><span class="num">' + days + '</span><span class="lbl">Days</span></div><div class="countdown-box"><span class="num">' + next.date.getDate() + '</span><span class="lbl">' + months[next.date.getMonth()] + '</span></div></div></div>';
    }

    // Upcoming
    eventsGrid.innerHTML = '';
    var shown = 0;
    for (var i = 0; i < upcoming.length; i++) {
      if (evFilter !== 'all' && upcoming[i].ev.type !== evFilter) continue;
      eventsGrid.innerHTML += buildEventCard(upcoming[i].ev, upcoming[i].date);
      shown++;
    }
    if (!shown) eventsGrid.innerHTML = '<p style="text-align:center;color:#888">No upcoming events in this category.</p>';

    // Past
    var pastEl = document.getElementById('pastEventsGrid');
    var pastSec = document.getElementById('pastEventsSection');
    if (pastEl && EVENTS_CONFIG.showPastEvents && past.length) {
      pastSec.style.display = '';
      pastEl.innerHTML = '';
      for (var i = 0; i < Math.min(past.length, 5); i++) {
        if (evFilter !== 'all' && past[i].ev.type !== evFilter) continue;
        pastEl.innerHTML += buildEventCard(past[i].ev, past[i].date);
      }
    }
  }

  function buildEventCard(ev, d) {
    return '<div class="event-card">' +
      '<div class="event-date-box"><span class="day">' + d.getDate() + '</span><span class="month">' + months[d.getMonth()] + ' ' + d.getFullYear() + '</span></div>' +
      '<div class="event-body"><span class="event-type-badge event-type-' + ev.type + '">' + ev.type + '</span><h3>' + ev.name + '</h3><p>' + ev.description + '</p></div>' +
      '</div>';
  }

  renderEvents();
}

// ============================================
// PANCHANGAM - embed widget
// ============================================
var panchangamEl = document.getElementById('panchangamContent');
if (panchangamEl && typeof PANCHANGAM_CONFIG !== 'undefined') {
  var P = PANCHANGAM_CONFIG;
  var h = '';

  if (P.showQuote && P.dailyQuote) {
    h += '<div class="panch-quote"><p>' + P.dailyQuote + '</p></div>';
  }

  if (P.showEmbed && P.embedUrl) {
    h += '<div class="panch-embed"><iframe src="' + P.embedUrl + '" width="100%" height="500" style="border:none;border-radius:12px" loading="lazy"></iframe></div>';
  }

  if (P.showTodayInfo) {
    h += '<div class="panchangam-today"><h3>\ud83d\udcc5 Today\'s Panchangam</h3><div class="panch-grid">';
    var fields = P.fields || [];
    for (var i = 0; i < fields.length; i++) {
      if (fields[i].enabled !== false) {
        h += '<div class="panch-item"><div class="panch-label">' + fields[i].label + '</div><div class="panch-value">' + fields[i].value + '</div></div>';
      }
    }
    h += '</div></div>';
  }

  if (P.showRecommendation && P.recommendation) {
    h += '<div class="cta-box" style="margin-top:20px"><h2>\ud83e\ude94 ' + P.recommendation.title + '</h2><p>' + P.recommendation.text + '</p></div>';
  }

  panchangamEl.innerHTML = h;
}

// ============================================
// LIGHTBOX
// ============================================
var lb = document.getElementById('lightbox');
var lbImg = document.getElementById('lightboxImg');
var lbClose = document.getElementById('lightboxClose');
var lbPrev = document.getElementById('lightboxPrev');
var lbNext = document.getElementById('lightboxNext');
var lbCounter = document.getElementById('lightboxCounter');
var lbItems = [];
var lbIdx = 0;

function showLB() {
  var img = lbItems[lbIdx].querySelector('img');
  lbImg.src = img.src;
  if (lbCounter) lbCounter.textContent = (lbIdx + 1) + ' / ' + lbItems.length;
}

if (lb && allItems.length) {
  var grid = document.getElementById('galleryGrid');
  if (grid) {
    grid.onclick = function(e) {
      var item = e.target;
      while (item && !item.classList.contains('gallery-item')) item = item.parentElement;
      if (!item || item.style.display === 'none') return;
      lbItems = [];
      var filtered = getFiltered();
      var start = (curPage - 1) * ITEMS_PER_PAGE;
      var end = start + ITEMS_PER_PAGE;
      for (var i = start; i < end && i < filtered.length; i++) lbItems.push(filtered[i]);
      lbIdx = lbItems.indexOf(item);
      if (lbIdx < 0) lbIdx = 0;
      showLB();
      lb.style.display = 'flex';
    };
  }

  if (lbClose) lbClose.onclick = function() { lb.style.display = 'none'; };
  if (lbPrev) lbPrev.onclick = function() { lbIdx = (lbIdx - 1 + lbItems.length) % lbItems.length; showLB(); };
  if (lbNext) lbNext.onclick = function() { lbIdx = (lbIdx + 1) % lbItems.length; showLB(); };
  lb.onclick = function(e) { if (e.target === lb) lb.style.display = 'none'; };
}


// ============================================
// PREMIUM FEATURES
// ============================================
(function(){
  if (typeof SITE_CONFIG === 'undefined') return;
  var F = SITE_CONFIG.features || {};

  // Scroll Animations
  if (F.scrollAnimations) {
    var animStyle = F.animationStyle || 'fade-up';
    var animEls = document.querySelectorAll('.service-card, .mission-card, .highlight-card, .stat-box, .donate-purpose-card, .shop-card, .grandha-card, .event-card, .testimonial-card, .faq-item, .pb');
    for (var ai = 0; ai < animEls.length; ai++) { animEls[ai].classList.add('anim'); animEls[ai].classList.add(animStyle); }
    var animObs = new IntersectionObserver(function(entries) {
      for (var e = 0; e < entries.length; e++) { if (entries[e].isIntersecting) entries[e].target.classList.add('visible'); }
    }, { threshold: 0.1 });
    for (var ao = 0; ao < animEls.length; ao++) animObs.observe(animEls[ao]);
  }

  // Parallax Banners
  if (F.parallaxBanners) {
    var banners = document.querySelectorAll('.page-banner');
    for (var bi = 0; bi < banners.length; bi++) banners[bi].classList.add('parallax');
  }

  // Animated Counters
  if (F.animatedCounters) {
    var counters = document.querySelectorAll('.stat-num');
    var counterObs = new IntersectionObserver(function(entries) {
      for (var e = 0; e < entries.length; e++) {
        if (entries[e].isIntersecting && !entries[e].target.dataset.counted) {
          entries[e].target.dataset.counted = '1';
          var el = entries[e].target;
          var target = parseInt(el.textContent);
          if (isNaN(target)) continue;
          var suffix = el.textContent.replace(/[0-9]/g, '');
          var count = 0;
          var step = Math.ceil(target / 40);
          (function(el, target, suffix, step) {
            var count = 0;
            var timer = setInterval(function() { count += step; if (count >= target) { count = target; clearInterval(timer); } el.textContent = count + suffix; }, 30);
          })(el, target, suffix, step);
        }
      }
    }, { threshold: 0.5 });
    for (var ci = 0; ci < counters.length; ci++) counterObs.observe(counters[ci]);
  }

  // Popup Notification
  if (F.popupNotification && F.popupMessage && !sessionStorage.getItem('popupClosed')) {
    var popup = document.createElement('div');
    popup.className = 'popup-notif';
    var popHtml = '<button class="popup-close" onclick="this.parentElement.classList.remove(\'show\');sessionStorage.setItem(\'popupClosed\',\'1\')">\u00d7</button>';
    popHtml += '<p>\ud83d\ude4f ' + F.popupMessage + '</p>';
    if (F.popupLink) popHtml += '<a href="' + F.popupLink + '">' + (F.popupLinkText || 'Learn More') + '</a>';
    popup.innerHTML = popHtml;
    document.body.appendChild(popup);
    setTimeout(function() { popup.classList.add('show'); }, F.popupDelay || 3000);
    setTimeout(function() { popup.classList.remove('show'); }, (F.popupDelay || 3000) + 10000);
  }

  // Cookie Consent
  if (F.cookieConsent && !localStorage.getItem('cookieAccepted')) {
    var cookie = document.createElement('div');
    cookie.className = 'cookie-bar';
    cookie.innerHTML = '<span>This website uses cookies to enhance your experience.</span><div><button class="cookie-accept" onclick="localStorage.setItem(\'cookieAccepted\',\'1\');this.parentElement.parentElement.classList.remove(\'show\')">Accept</button> <button class="cookie-decline" onclick="this.parentElement.parentElement.classList.remove(\'show\')">Decline</button></div>';
    document.body.appendChild(cookie);
    setTimeout(function() { cookie.classList.add('show'); }, 1500);
  }

  // Share Buttons
  if (F.shareButtons) {
    var shareBar = document.createElement('div');
    shareBar.className = 'share-bar';
    var pageUrl = encodeURIComponent(window.location.href);
    var pageTitle = encodeURIComponent(document.title);
    var sh = '<a class="share-btn share-wa" href="https://wa.me/?text=' + pageTitle + '%20' + pageUrl + '" target="_blank">WhatsApp</a>';
    sh += '<a class="share-btn share-fb" href="https://www.facebook.com/sharer/sharer.php?u=' + pageUrl + '" target="_blank">Facebook</a>';
    sh += '<a class="share-btn share-tw" href="https://twitter.com/intent/tweet?url=' + pageUrl + '&text=' + pageTitle + '" target="_blank">Twitter</a>';
    if (F.printPage) sh += '<button class="share-btn share-print" onclick="window.print()">\ud83d\udda8 Print</button>';
    shareBar.innerHTML = sh;
    var ftr = document.querySelector('.footer');
    if (ftr) ftr.parentNode.insertBefore(shareBar, ftr);
  }

  // Google Analytics
  if (F.googleAnalytics && F.gaTrackingId) {
    var gaScript = document.createElement('script');
    gaScript.async = true;
    gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=' + F.gaTrackingId;
    document.head.appendChild(gaScript);
    var gaInit = document.createElement('script');
    gaInit.textContent = 'window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag("js",new Date());gtag("config","' + F.gaTrackingId + '");';
    document.head.appendChild(gaInit);
  }

  // Testimonials
  if (F.testimonials && typeof TESTIMONIALS !== 'undefined' && TESTIMONIALS.length) {
    var tSec = document.createElement('section');
    tSec.className = 'section testimonials-section';
    var tH = '<div class="container"><h2 class="section-title">\ud83d\ude4f Devotee Testimonials</h2><div class="testimonial-grid">';
    for (var ti = 0; ti < Math.min(TESTIMONIALS.length, 3); ti++) {
      var t = TESTIMONIALS[ti];
      var stars = '';
      for (var si = 0; si < (t.stars || 5); si++) stars += '\u2605';
      tH += '<div class="testimonial-card"><div class="testimonial-stars">' + stars + '</div><p class="testimonial-text">' + t.text + '</p><div class="testimonial-author"><div class="testimonial-avatar">' + t.name.charAt(0) + '</div><div><div class="testimonial-name">' + t.name + '</div><div class="testimonial-loc">' + t.location + '</div></div></div></div>';
    }
    tH += '</div></div>';
    tSec.innerHTML = tH;
    var ft1 = document.querySelector('.footer');
    if (ft1) ft1.parentNode.insertBefore(tSec, ft1);
  }

  // FAQ
  if (F.faqSection && typeof FAQ_ITEMS !== 'undefined' && FAQ_ITEMS.length) {
    var fSec = document.createElement('section');
    fSec.className = 'section alt-bg faq-section';
    var fH = '<div class="container"><h2 class="section-title">\u2753 Frequently Asked Questions</h2>';
    for (var fi = 0; fi < FAQ_ITEMS.length; fi++) {
      var q = FAQ_ITEMS[fi].question;
      var a = FAQ_ITEMS[fi].answer;
      var qText = typeof q === 'object' ? (q[currentLang] || q.en || '') : q;
      var aText = typeof a === 'object' ? (a[currentLang] || a.en || '') : a;
      fH += '<div class="faq-item" onclick="this.classList.toggle(\'open\')"><div class="faq-q">' + qText + '<span class="faq-icon">+</span></div><div class="faq-a"><p>' + aText + '</p></div></div>';
    }
    fH += '</div>';
    fSec.innerHTML = fH;
    var ft2 = document.querySelector('.footer');
    if (ft2) ft2.parentNode.insertBefore(fSec, ft2);
  }

  // SEO Meta Tags
  if (F.seoMetaTags) {
    var addMeta = function(n, c) { var m = document.createElement('meta'); m.name = n; m.content = c; document.head.appendChild(m); };
    addMeta('description', (SITE_CONFIG.siteName || '') + ' - Temple in Vijayawada. Daily poojas, festivals, Annadanam.');
    addMeta('keywords', 'temple, durga, pooja, vijayawada, navaratri, annadanam, hindu');
    addMeta('author', SITE_CONFIG.contactName || '');
    var addOG = function(p, c) { var m = document.createElement('meta'); m.setAttribute('property', p); m.content = c; document.head.appendChild(m); };
    addOG('og:title', document.title);
    addOG('og:description', (SITE_CONFIG.siteName || '') + ' - Temple in Vijayawada');
    addOG('og:type', 'website');
    if (SITE_CONFIG.logoImage) addOG('og:image', SITE_CONFIG.logoImage);
  }
})();


// ============================================
// IMAGE OPTIMIZATION - CDN auto-compress
// ============================================
(function(){
  if (typeof SITE_CONFIG === 'undefined') return;
  var F = SITE_CONFIG.features || {};
  if (!F.imageOptimization || F.imageOptimization === 'local') return;

  var q = F.imageQuality || 80;
  var w = F.imageMaxWidth || 1200;
  var provider = F.cdnProvider || 'statically';

  function optimizeUrl(src) {
    if (!src || src.indexOf('data:') === 0) return src;
    if (src.indexOf('cdn.statically.io') > -1) return src; // already optimized

    if (provider === 'statically') {
      // Statically works with hosted URLs only
      if (src.indexOf('http') === 0) {
        return 'https://cdn.statically.io/img/' + src.replace(/^https?:\/\//, '') + '?w=' + w + '&q=' + q;
      }
      return src; // local files can't use statically
    }

    if (provider === 'cloudinary' && F.cdnBaseUrl) {
      return F.cdnBaseUrl + '/image/fetch/w_' + w + ',q_' + q + ',f_auto/' + src;
    }

    if (provider === 'custom' && F.cdnBaseUrl) {
      return F.cdnBaseUrl + '?url=' + encodeURIComponent(src) + '&w=' + w + '&q=' + q;
    }

    return src;
  }

  // Optimize all images on page
  var allImgs = document.querySelectorAll('img:not(.logo-img):not(.dev-photo):not(.wm-stamp)');
  for (var i = 0; i < allImgs.length; i++) {
    var img = allImgs[i];
    var src = img.getAttribute('src');
    if (src) {
      var newSrc = optimizeUrl(src);
      if (newSrc !== src) {
        img.setAttribute('data-original', src);
        img.src = newSrc;
      }
    }
  }

  // Make function available globally for dynamically added images
  window.optimizeImageUrl = optimizeUrl;
})();


// ============================================
// PICTURE TAG HELPER - WebP with fallback
// ============================================
// Usage: createPicture(src, alt, className)
// If src is .webp, adds JPEG fallback
// If src is .jpg/.png, adds WebP source
// Works with both local and remote images
function createPicture(src, alt, className) {
  if (!src) return '';
  var ext = src.split('.').pop().split('?')[0].toLowerCase();
  var basePath = src.replace(/\.[^.]+$/, '');

  // If already using picture tag or SVG/ICO, return simple img
  if (ext === 'svg' || ext === 'ico' || ext === 'gif') {
    return '<img src="' + src + '" alt="' + (alt||'') + '"' + (className ? ' class="' + className + '"' : '') + ' loading="lazy">';
  }

  // For remote URLs (http), just use img with loading lazy
  if (src.indexOf('http') === 0) {
    return '<img src="' + src + '" alt="' + (alt||'') + '"' + (className ? ' class="' + className + '"' : '') + ' loading="lazy">';
  }

  // For local files, create picture with WebP source + original fallback
  var webpSrc = basePath + '.webp';
  var fallbackSrc = src;

  if (ext === 'webp') {
    // WebP is primary, add jpg fallback
    fallbackSrc = basePath + '.jpg';
    return '<picture>' +
      '<source srcset="' + src + '" type="image/webp">' +
      '<img src="' + fallbackSrc + '" alt="' + (alt||'') + '"' + (className ? ' class="' + className + '"' : '') + ' loading="lazy">' +
      '</picture>';
  }

  // JPG/PNG is primary, add WebP source
  return '<picture>' +
    '<source srcset="' + webpSrc + '" type="image/webp">' +
    '<img src="' + src + '" alt="' + (alt||'') + '"' + (className ? ' class="' + className + '"' : '') + ' loading="lazy">' +
    '</picture>';
}

// Also add favicon support
(function(){
  if (typeof SITE_CONFIG !== 'undefined' && SITE_CONFIG.logoImage) {
    var link = document.querySelector('link[rel="icon"]');
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      link.type = 'image/png';
      link.href = SITE_CONFIG.logoImage;
      document.head.appendChild(link);
    }
  }
})();


// ============================================
// AUTO-CONVERT IMG TO PICTURE TAGS
// ============================================
// Runs after all builders finish, converts existing <img> to <picture> with WebP
(function(){
  if (typeof SITE_CONFIG === 'undefined') return;
  var F = SITE_CONFIG.features || {};
  // Only run if image optimization is not "local"
  // For local files, user should provide both .webp and .jpg versions
  
  // Wait for all dynamic content to load
  setTimeout(function(){
    var imgs = document.querySelectorAll('img:not(.logo-img):not(.dev-photo):not(.wm-stamp):not(.qr-image)');
    for (var i = 0; i < imgs.length; i++) {
      var img = imgs[i];
      var src = img.getAttribute('src');
      if (!src || src.indexOf('data:') === 0) continue;
      if (img.parentElement && img.parentElement.tagName === 'PICTURE') continue; // already wrapped
      
      var ext = src.split('.').pop().split('?')[0].toLowerCase();
      // Skip SVG, GIF, ICO, remote URLs
      if (ext === 'svg' || ext === 'ico' || ext === 'gif') continue;
      if (src.indexOf('http') === 0) continue;
      
      // Create picture wrapper
      var picture = document.createElement('picture');
      var source = document.createElement('source');
      var basePath = src.replace(/\.[^.]+$/, '');
      source.srcset = basePath + '.webp';
      source.type = 'image/webp';
      
      // Copy img attributes
      var newImg = img.cloneNode(true);
      newImg.setAttribute('loading', 'lazy');
      
      picture.appendChild(source);
      picture.appendChild(newImg);
      
      // Copy img's inline styles to picture
      if (img.style.cssText) picture.style.cssText = img.style.cssText;
      
      // Replace img with picture
      if (img.parentElement) {
        img.parentElement.replaceChild(picture, img);
      }
    }
  }, 1500); // Wait 1.5s for all dynamic content to render
})();


// ============================================
// BLOG / NEWS
// ============================================
(function(){
  var grid = document.getElementById('blogGrid');
  if (!grid || typeof BLOG_POSTS === 'undefined') return;
  var posts = BLOG_POSTS.slice().sort(function(a,b){return new Date(b.date)-new Date(a.date);});
  var cats = ['all'];
  for (var i = 0; i < posts.length; i++) if (cats.indexOf(posts[i].category) === -1) cats.push(posts[i].category);
  var filter = 'all';

  function render(){
    var fEl = document.getElementById('blogFilters');
    if (fEl) {
      fEl.innerHTML = '';
      fEl.className = 'events-filter';
      for (var c = 0; c < cats.length; c++) {
        var b = document.createElement('button');
        b.className = 'filter-btn' + (filter === cats[c] ? ' active' : '');
        b.textContent = cats[c] === 'all' ? 'All' : cats[c].charAt(0).toUpperCase() + cats[c].slice(1);
        (function(cat){b.onclick=function(){filter=cat;render();};})(cats[c]);
        fEl.appendChild(b);
      }
    }
    grid.innerHTML = '';
    grid.className = 'blog-grid';
    for (var i = 0; i < posts.length; i++) {
      var p = posts[i];
      if (filter !== 'all' && p.category !== filter) continue;
      var d = new Date(p.date);
      var dateStr = d.toLocaleDateString('en-US', {year:'numeric',month:'short',day:'numeric'});
      grid.innerHTML += '<div class="blog-card">' +
        (p.image ? '<img class="blog-img" src="'+p.image+'" alt="">' : '') +
        '<div class="blog-body"><div class="blog-meta"><span class="blog-cat blog-cat-'+p.category+'">'+p.category+'</span>'+dateStr+' | '+p.author+'</div>' +
        '<h3>'+p.title+'</h3><p>'+p.excerpt+'</p></div></div>';
    }
  }
  render();
})();

// ============================================
// TEAM
// ============================================
(function(){
  var grid = document.getElementById('teamGrid');
  if (!grid || typeof TEAM_MEMBERS === 'undefined') return;
  grid.className = 'team-grid';
  for (var i = 0; i < TEAM_MEMBERS.length; i++) {
    var m = TEAM_MEMBERS[i];
    var photo = m.photo || '';
    var avatar = photo ? '<img class="team-photo" src="'+photo+'" alt="'+m.name+'">' : '<div class="team-photo" style="display:flex;align-items:center;justify-content:center;font-size:2rem;color:var(--primary-dark)">'+m.name.charAt(0)+'</div>';
    grid.innerHTML += '<div class="team-card">'+avatar+'<div class="team-name">'+m.name+'</div><div class="team-role">'+m.role+'</div><p class="team-bio">'+m.bio+'</p></div>';
  }
})();

// ============================================
// PRICING
// ============================================
(function(){
  var grid = document.getElementById('pricingGrid');
  if (!grid || typeof PRICING_PLANS === 'undefined') return;
  grid.className = 'pricing-grid';
  for (var i = 0; i < PRICING_PLANS.length; i++) {
    var p = PRICING_PLANS[i];
    var features = '';
    for (var f = 0; f < p.features.length; f++) features += '<li>'+p.features[f]+'</li>';
    grid.innerHTML += '<div class="pricing-card'+(p.highlighted?' highlighted':'')+'">' +
      (p.highlighted ? '<span class="pricing-badge">Most Popular</span>' : '') +
      '<div class="pricing-name">'+p.name+'</div>' +
      '<div class="pricing-price">'+p.price+'</div>' +
      '<div class="pricing-period">'+p.period+'</div>' +
      '<ul class="pricing-features">'+features+'</ul>' +
      '<a class="pricing-cta" href="'+p.link+'" target="_blank">'+p.cta+' \ud83d\ude4f</a></div>';
  }
})();

// ============================================
// BOOKING FORM (sends to WhatsApp)
// ============================================
(function(){
  var formEl = document.getElementById('bookingForm');
  if (!formEl || typeof BOOKING_CONFIG === 'undefined' || !BOOKING_CONFIG.enabled) return;
  var B = BOOKING_CONFIG;

  var serviceOpts = '';
  for (var i = 0; i < B.services.length; i++) {
    serviceOpts += '<option value="'+B.services[i].name+' ('+B.services[i].price+')">'+B.services[i].name+' - '+B.services[i].price+'</option>';
  }

  formEl.innerHTML = '<div class="booking-form">' +
    '<label>Your Name *</label><input id="bk_name" required placeholder="Enter your full name">' +
    '<label>Phone Number *</label><input id="bk_phone" type="tel" required placeholder="Your phone number">' +
    '<label>Select Pooja/Service *</label><select id="bk_service"><option value="">-- Select --</option>'+serviceOpts+'</select>' +
    '<label>Preferred Date</label><input id="bk_date" type="date">' +
    '<label>Preferred Time</label><select id="bk_time"><option value="">-- Select --</option><option>Morning (6-9 AM)</option><option>Mid-Morning (9-12 PM)</option><option>Afternoon (12-4 PM)</option><option>Evening (4-7 PM)</option><option>Night (7-9 PM)</option></select>' +
    '<label>Number of People</label><input id="bk_people" type="number" min="1" value="1">' +
    '<label>Special Requests / Gothram</label><textarea id="bk_notes" rows="3" placeholder="Any special requests, gothram, nakshatram..."></textarea>' +
    '<button class="booking-submit" onclick="submitBooking()">\ud83d\udcf1 Book via WhatsApp</button>' +
    '</div>';

  window.submitBooking = function(){
    var name = document.getElementById('bk_name').value;
    var phone = document.getElementById('bk_phone').value;
    var service = document.getElementById('bk_service').value;
    if (!name || !phone || !service) { alert('Please fill Name, Phone, and Service.'); return; }
    var date = document.getElementById('bk_date').value || 'Not specified';
    var time = document.getElementById('bk_time').value || 'Not specified';
    var people = document.getElementById('bk_people').value || '1';
    var notes = document.getElementById('bk_notes').value || 'None';

    var msg = '*New Pooja Booking*\n\n';
    msg += '*Name:* ' + name + '\n';
    msg += '*Phone:* ' + phone + '\n';
    msg += '*Service:* ' + service + '\n';
    msg += '*Date:* ' + date + '\n';
    msg += '*Time:* ' + time + '\n';
    msg += '*People:* ' + people + '\n';
    msg += '*Notes:* ' + notes;

    window.open('https://wa.me/' + B.whatsappNumber + '?text=' + encodeURIComponent(msg), '_blank');
  };
})();


// ============================================
// ADMIN PASSWORD PROTECTION
// ============================================
(function(){
  if (window.location.pathname.indexOf('admin') === -1) return;
  if (typeof SITE_CONFIG === 'undefined') return;
  var F = SITE_CONFIG.features || {};
  if (!F.adminPassword) return;
  if (sessionStorage.getItem('adminAuth') === F.adminPassword) return;
  var pwd = prompt('Enter admin password:');
  if (pwd === F.adminPassword) {
    sessionStorage.setItem('adminAuth', pwd);
  } else {
    document.body.innerHTML = '<div style="text-align:center;padding:100px;font-family:sans-serif"><h1 style="color:#c62828">Access Denied</h1><p>Invalid password.</p><a href="index.html">Back to Site</a></div>';
  }
})();

// ============================================
// MAINTENANCE MODE
// ============================================
(function(){
  if (typeof SITE_CONFIG === 'undefined') return;
  var F = SITE_CONFIG.features || {};
  if (!F.maintenanceMode) return;
  if (window.location.pathname.indexOf('admin') > -1) return; // allow admin access
  document.body.innerHTML = '<div style="min-height:100vh;display:flex;align-items:center;justify-content:center;flex-direction:column;text-align:center;padding:40px;font-family:Poppins,sans-serif;background:#fff8f0">' +
    '<div style="font-size:4rem;margin-bottom:20px">🛠️</div>' +
    '<h1 style="color:#7f0000;margin-bottom:10px">Under Maintenance</h1>' +
    '<p style="color:#666;max-width:400px;margin-bottom:20px">' + (F.maintenanceMessage || 'We are updating our website.') + '</p>' +
    '<p style="color:#888;font-size:0.85rem">Contact: ' + (SITE_CONFIG.phone || '') + '</p></div>';
})();

// ============================================
// DARK MODE TOGGLE
// ============================================
(function(){
  if (typeof SITE_CONFIG === 'undefined') return;
  var F = SITE_CONFIG.features || {};
  if (!F.darkModeToggle) return;

  var isDark = localStorage.getItem('darkMode') === '1';

  var darkCSS = 'body.dark-mode{background:#1a1a2e;color:#ddd} .dark-mode .header{background:#16213e} .dark-mode .card,.dark-mode .service-card,.dark-mode .highlight-card,.dark-mode .mission-card,.dark-mode .stat-box,.dark-mode .donate-purpose-card,.dark-mode .shop-card,.dark-mode .grandha-card,.dark-mode .event-card,.dark-mode .testimonial-card,.dark-mode .faq-item,.dark-mode .booking-form,.dark-mode .pricing-card,.dark-mode .team-card,.dark-mode .blog-card,.dark-mode .donate-col,.dark-mode .panchangam-today{background:#16213e;border-color:#2a2a4a;color:#ddd} .dark-mode .section-title,.dark-mode h3,.dark-mode h4,.dark-mode .pricing-name,.dark-mode .team-name{color:#f9a825} .dark-mode p,.dark-mode .about-text p,.dark-mode .pb-text{color:#bbb} .dark-mode .footer{background:#0f0f23} .dark-mode .alt-bg{background:#12122a} .dark-mode input,.dark-mode select,.dark-mode textarea{background:#1a1a2e;color:#ddd;border-color:#2a2a4a}';
  var style = document.createElement('style');
  style.textContent = darkCSS;
  document.head.appendChild(style);

  if (isDark) document.body.classList.add('dark-mode');

  var btn = document.createElement('button');
  btn.style.cssText = 'position:fixed;bottom:90px;left:25px;z-index:998;width:42px;height:42px;border-radius:50%;border:none;cursor:pointer;font-size:1.2rem;box-shadow:0 3px 10px rgba(0,0,0,0.2);transition:0.3s;background:'+(isDark?'#f9a825':'#1a1a2e')+';color:'+(isDark?'#333':'#fff');
  btn.textContent = isDark ? '☀️' : '🌙';
  btn.onclick = function(){
    isDark = !isDark;
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', isDark ? '1' : '0');
    btn.textContent = isDark ? '☀️' : '🌙';
    btn.style.background = isDark ? '#f9a825' : '#1a1a2e';
    btn.style.color = isDark ? '#333' : '#fff';
  };
  document.body.appendChild(btn);
})();

// ============================================
// FONT SIZE CONTROLS (A- A A+)
// ============================================
(function(){
  if (typeof SITE_CONFIG === 'undefined') return;
  var F = SITE_CONFIG.features || {};
  if (!F.fontSizeControls) return;

  var size = parseInt(localStorage.getItem('fontSize') || '15');
  document.body.style.fontSize = size + 'px';

  var bar = document.createElement('div');
  bar.style.cssText = 'position:fixed;top:50%;right:0;transform:translateY(-50%);z-index:998;display:flex;flex-direction:column;gap:2px;';
  var mkBtn = function(label, delta){
    var b = document.createElement('button');
    b.style.cssText = 'width:32px;height:32px;border:none;background:#1a1a2e;color:#fff;cursor:pointer;font-size:0.75rem;font-weight:700;border-radius:4px 0 0 4px;';
    b.textContent = label;
    b.onclick = function(){ size = Math.max(12, Math.min(22, size + delta)); document.body.style.fontSize = size + 'px'; localStorage.setItem('fontSize', size); };
    return b;
  };
  bar.appendChild(mkBtn('A+', 1));
  bar.appendChild(mkBtn('A', 0));
  bar.appendChild(mkBtn('A-', -1));
  bar.children[1].onclick = function(){ size = 15; document.body.style.fontSize = '15px'; localStorage.setItem('fontSize', '15'); };
  document.body.appendChild(bar);
})();

// ============================================
// LIVE CHAT WIDGET
// ============================================
(function(){
  if (typeof SITE_CONFIG === 'undefined') return;
  var F = SITE_CONFIG.features || {};
  if (!F.liveChatEnabled || !F.liveChatId) return;

  if (F.liveChatProvider === 'tawk') {
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://embed.tawk.to/' + F.liveChatId + '/default';
    s.charset = 'UTF-8';
    s.setAttribute('crossorigin', '*');
    document.body.appendChild(s);
  }
  if (F.liveChatProvider === 'crisp') {
    window.$crisp = []; window.CRISP_WEBSITE_ID = F.liveChatId;
    var s = document.createElement('script');
    s.src = 'https://client.crisp.chat/l.js';
    s.async = true;
    document.body.appendChild(s);
  }
})();

// ============================================
// NEWSLETTER SIGNUP (Google Sheets)
// ============================================
(function(){
  if (typeof SITE_CONFIG === 'undefined') return;
  var F = SITE_CONFIG.features || {};
  if (!F.newsletterEnabled) return;

  var bar = document.createElement('div');
  bar.style.cssText = 'background:linear-gradient(135deg,#7f0000,#b71c1c);padding:20px;text-align:center;';
  bar.innerHTML = '<div style="max-width:500px;margin:0 auto;display:flex;gap:8px;align-items:center;flex-wrap:wrap;justify-content:center">' +
    '<span style="color:#fdd835;font-size:0.9rem;font-weight:600">📧 Subscribe for Updates</span>' +
    '<input id="nlEmail" type="email" placeholder="Your email" style="padding:8px 12px;border:none;border-radius:5px;flex:1;min-width:200px;font-size:0.85rem">' +
    '<button onclick="submitNewsletter()" style="padding:8px 18px;background:#f9a825;color:#333;border:none;border-radius:5px;font-weight:700;cursor:pointer;font-size:0.85rem">Subscribe</button></div>';
  var footer = document.querySelector('.footer');
  if (footer) footer.parentNode.insertBefore(bar, footer);

  window.submitNewsletter = function(){
    var email = document.getElementById('nlEmail').value;
    if (!email || email.indexOf('@') === -1) { alert('Please enter a valid email.'); return; }
    if (F.newsletterGoogleSheetUrl) {
      fetch(F.newsletterGoogleSheetUrl, { method: 'POST', body: JSON.stringify({email: email}), headers: {'Content-Type':'application/json'} })
        .then(function(){ alert('Thank you for subscribing!'); document.getElementById('nlEmail').value = ''; })
        .catch(function(){ alert('Subscribed! (offline mode)'); });
    } else {
      alert('Thank you for subscribing!');
      document.getElementById('nlEmail').value = '';
    }
  };
})();

// ============================================
// VISITOR COUNTER
// ============================================
(function(){
  if (typeof SITE_CONFIG === 'undefined') return;
  var F = SITE_CONFIG.features || {};
  if (!F.visitorCounter) return;
  var count = parseInt(localStorage.getItem('visitorCount') || '0') + 1;
  localStorage.setItem('visitorCount', count);
  var el = document.createElement('div');
  el.style.cssText = 'text-align:center;padding:8px;font-size:0.75rem;color:#888;';
  el.textContent = '👁️ Visitors: ' + count;
  var fb = document.querySelector('.footer-bottom');
  if (fb) fb.appendChild(el);
})();

// ============================================
// LIVE STREAM EMBED
// ============================================
(function(){
  if (typeof SITE_CONFIG === 'undefined') return;
  var F = SITE_CONFIG.features || {};
  if (!F.liveStreamEnabled || !F.liveStreamUrl) return;

  // Add to home page only
  var pageName = (window.location.pathname.split('/').pop() || 'index.html').replace('.html','');
  if (pageName !== 'index' && pageName !== '') return;

  var sec = document.createElement('section');
  sec.className = 'section alt-bg';
  sec.innerHTML = '<div class="container"><h2 class="section-title">📺 ' + (F.liveStreamTitle || 'Live Stream') + '</h2>' +
    '<div style="border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.1)">' +
    '<iframe width="100%" height="450" src="' + F.liveStreamUrl + '" frameborder="0" allowfullscreen loading="lazy"></iframe></div></div>';
  var footer = document.querySelector('.footer');
  if (footer) footer.parentNode.insertBefore(sec, footer);
})();

// ============================================
// RTL SUPPORT
// ============================================
(function(){
  if (typeof SITE_CONFIG === 'undefined') return;
  var F = SITE_CONFIG.features || {};
  if (!F.rtlSupport) return;
  document.documentElement.setAttribute('dir', 'rtl');
  var s = document.createElement('style');
  s.textContent = '[dir=rtl] .nav{flex-direction:row-reverse} [dir=rtl] .about-grid,[dir=rtl] .contact-grid,[dir=rtl] .donate-two-col{direction:rtl} [dir=rtl] .footer-grid{direction:rtl}';
  document.head.appendChild(s);
})();


// ============================================
// PWA - Service Worker Registration
// ============================================
if ('serviceWorker' in navigator) {
  var swPath = window.location.pathname.indexOf('/te/') > -1 || window.location.pathname.indexOf('/hi/') > -1 || window.location.pathname.indexOf('/sa/') > -1 ? '../sw.js' : 'sw.js';
  navigator.serviceWorker.register(swPath).catch(function(){});
}

// Add manifest link
(function(){
  var link = document.querySelector('link[rel="manifest"]');
  if (!link) {
    link = document.createElement('link');
    link.rel = 'manifest';
    var mPath = window.location.pathname.indexOf('/te/') > -1 || window.location.pathname.indexOf('/hi/') > -1 || window.location.pathname.indexOf('/sa/') > -1 ? '../manifest.json' : 'manifest.json';
    link.href = mPath;
    document.head.appendChild(link);
  }
  // Theme color meta
  var tc = document.querySelector('meta[name="theme-color"]');
  if (!tc) {
    tc = document.createElement('meta');
    tc.name = 'theme-color';
    tc.content = '#b71c1c';
    document.head.appendChild(tc);
  }
})();


// ============================================
// COLOR PRESET
// ============================================
(function(){
  if (typeof SITE_CONFIG === 'undefined') return;
  var F = SITE_CONFIG.features || {};
  if (F.colorPreset && F.colorPreset !== 'temple') {
    document.body.classList.add('preset-' + F.colorPreset);
  }
})();


// ============================================
// LOGO STYLE CONFIGURATOR
// ============================================
(function(){
  if (typeof SITE_CONFIG === 'undefined' || !SITE_CONFIG.header) return;
  var H = SITE_CONFIG.header;
  var logoImg = document.querySelector('.logo-img');
  var logoH1 = document.querySelector('.logo h1');
  var logoTag = document.querySelector('.logo .tagline');

  if (!logoImg) return;

  // Logo style: "image-only", "text-only", "image-text", "full-image"
  var style = H.logoStyle || 'image-text';

  if (style === 'image-only') {
    if (logoH1) logoH1.style.display = 'none';
    if (logoTag) logoTag.style.display = 'none';
  }
  if (style === 'text-only') {
    logoImg.style.display = 'none';
  }
  if (style === 'full-image') {
    logoImg.style.borderRadius = '8px';
    logoImg.style.width = (H.logoWidth || 150) + 'px';
    logoImg.style.height = 'auto';
    logoImg.style.border = 'none';
    if (logoH1) logoH1.style.display = 'none';
    if (logoTag) logoTag.style.display = 'none';
  }

  // Logo shape: "circle", "square", "rounded", "none"
  var shape = H.logoShape || 'circle';
  if (shape === 'circle') logoImg.style.borderRadius = '50%';
  else if (shape === 'square') logoImg.style.borderRadius = '0';
  else if (shape === 'rounded') logoImg.style.borderRadius = '12px';
  else if (shape === 'none') { logoImg.style.borderRadius = '0'; logoImg.style.border = 'none'; logoImg.style.boxShadow = 'none'; }

  // Logo size
  if (H.logoWidth && style !== 'full-image') {
    logoImg.style.width = H.logoWidth + 'px';
    logoImg.style.height = H.logoHeight + 'px';
  }

  // Hide elements based on config
  if (H.showSiteName === false && logoH1) logoH1.style.display = 'none';
  if (H.showTagline === false && logoTag) logoTag.style.display = 'none';
  if (H.showLogo === false) logoImg.style.display = 'none';

  // Sticky header
  if (H.stickyHeader === false) {
    var header = document.querySelector('.header');
    if (header) { header.style.position = 'relative'; header.style.top = 'auto'; }
  }

  // Top bar
  if (H.showTopBar === false) {
    var topBar = document.querySelector('.top-bar');
    if (topBar) topBar.style.display = 'none';
  }

  // Audio toggle
  if (H.showAudioToggle === false) {
    var audioBtn = document.getElementById('audioToggle');
    if (audioBtn) audioBtn.style.display = 'none';
  }

  // Audio prompt
  if (H.showAudioPrompt === false) {
    var prompt = document.getElementById('audioPrompt');
    if (prompt) prompt.style.display = 'none';
  }

  // Mantra ticker
  if (H.showMantraTicker === false) {
    var ticker = document.querySelector('.mantra-ticker');
    if (ticker) ticker.style.display = 'none';
  }
})();


// ============================================
// SCROLL PROGRESS BAR
// ============================================
(function(){
  if(typeof SITE_CONFIG==='undefined')return;
  var F=SITE_CONFIG.features||{};
  if(F.scrollProgress===false)return;
  if(document.querySelector('.scroll-progress'))return;
  var bar=document.createElement('div');bar.className='scroll-progress';document.body.appendChild(bar);
  window.addEventListener('scroll',function(){var h=document.documentElement.scrollHeight-window.innerHeight;if(h>0)bar.style.width=(window.scrollY/h*100)+'%';});
})();

// ============================================
// BREADCRUMB
// ============================================
(function(){
  if(typeof SITE_CONFIG==='undefined')return;
  var F=SITE_CONFIG.features||{};
  if(F.breadcrumb===false)return;
  var pageName=(window.location.pathname.split('/').pop()||'index.html').replace('.html','');
  if(pageName==='index'||pageName==='')return;
  var names={about:'About',services:'Services',books:'Grandhas',shop:'Shop',gallery:'Gallery',puranam:'Temple Legends',events:'Events',panchangam:'Panchangam',donate:'Donate',contact:'Contact',blog:'News',team:'Team',pricing:'Pricing',booking:'Booking'};
  var label=names[pageName]||pageName;
  var bc=document.createElement('div');bc.className='breadcrumb';
  bc.innerHTML='<a href="index.html">Home</a><span>›</span>'+label;
  var banner=document.querySelector('.page-banner');
  if(banner&&banner.nextSibling)banner.parentNode.insertBefore(bc,banner.nextSibling);
})();

// ============================================
// TABLE OF CONTENTS (for puranam/blog)
// ============================================
(function(){
  if(typeof SITE_CONFIG==='undefined')return;
  var F=SITE_CONFIG.features||{};
  if(F.tableOfContents===false)return;
  var content=document.getElementById('puranamContent')||document.getElementById('blogGrid');
  if(!content)return;
  var headings=content.querySelectorAll('.pb-title, .blog-card h3');
  if(headings.length<3)return;
  var toc=document.createElement('div');toc.className='toc';
  var h='<h4>📑 Table of Contents</h4><ul>';
  for(var i=0;i<headings.length;i++){
    var id='toc-'+i;headings[i].id=id;
    h+='<li><a href="#'+id+'">'+(i+1)+'. '+headings[i].textContent+'</a></li>';
  }
  h+='</ul>';toc.innerHTML=h;
  content.parentNode.insertBefore(toc,content);
})();

// ============================================
// IMAGE BLUR LAZY LOAD
// ============================================
(function(){
  var imgs=document.querySelectorAll('img[loading="lazy"]');
  for(var i=0;i<imgs.length;i++){
    imgs[i].classList.add('img-blur');
    imgs[i].addEventListener('load',function(){this.classList.add('loaded');});
    if(imgs[i].complete)imgs[i].classList.add('loaded');
  }
})();

// ============================================
// STICKY CTA BAR
// ============================================
(function(){
  if(typeof SITE_CONFIG==='undefined')return;
  var F=SITE_CONFIG.features||{};
  if(F.stickyCTA===false)return;
  var wa=SITE_CONFIG.whatsapp||'';
  var phone=SITE_CONFIG.phone||'';
  var bar=document.createElement('div');bar.className='sticky-cta';
  var h='';
  if(wa)h+='<a class="cta-wa" href="https://wa.me/'+wa+'" target="_blank">💬 WhatsApp</a>';
  h+='<a class="cta-donate" href="donate.html">🙏 Donate</a>';
  if(phone)h+='<a class="cta-call" href="tel:+91'+phone+'">📞 Call</a>';
  bar.innerHTML=h;
  document.body.appendChild(bar);
  window.addEventListener('scroll',function(){bar.className=window.scrollY>500?'sticky-cta visible':'sticky-cta';});
})();

// ============================================
// ANNOUNCEMENT BAR
// ============================================
(function(){
  if(typeof SITE_CONFIG==='undefined')return;
  var F=SITE_CONFIG.features||{};
  if(!F.announcementText||sessionStorage.getItem('announceClosed'))return;
  var bar=document.createElement('div');bar.className='announce-bar';
  bar.innerHTML=F.announcementText+(F.announcementLink?' <a href="'+F.announcementLink+'">Learn More</a>':'')+
    '<button class="announce-close" onclick="this.parentElement.remove();sessionStorage.setItem(\'announceClosed\',\'1\')">×</button>';
  document.body.insertBefore(bar,document.body.firstChild);
})();

// ============================================
// SEARCH (Ctrl+K)
// ============================================
(function(){
  var pages=[
    {title:'Home',url:'index.html',desc:'Welcome to the temple'},
    {title:'About',url:'about.html',desc:'Temple history, mission, values'},
    {title:'Services',url:'services.html',desc:'Daily pooja, archana, festivals, annadanam'},
    {title:'Gallery',url:'gallery.html',desc:'Temple and festival photos'},
    {title:'Donate',url:'donate.html',desc:'QR code, bank transfer, UPI'},
    {title:'Contact',url:'contact.html',desc:'Address, phone, WhatsApp, map'},
    {title:'Events',url:'events.html',desc:'Upcoming festivals and events'},
    {title:'Panchangam',url:'panchangam.html',desc:'Daily panchangam and timings'},
    {title:'Temple Legends',url:'puranam.html',desc:'Stala puranam, temple history'},
    {title:'News',url:'blog.html',desc:'Latest news and updates'},
    {title:'Team',url:'team.html',desc:'Temple trust members'},
    {title:'Pricing',url:'pricing.html',desc:'Pooja packages and pricing'},
    {title:'Book Pooja',url:'booking.html',desc:'Book a pooja via WhatsApp'},
    {title:'Shop',url:'shop.html',desc:'Recommended pooja items'},
    {title:'Grandhas',url:'books.html',desc:'Sacred books and scriptures'}
  ];

  var overlay=document.createElement('div');overlay.className='search-overlay';
  overlay.innerHTML='<div class="search-box"><input id="searchInput" placeholder="🔍 Search pages... (Esc to close)" autocomplete="off"><div class="search-results" id="searchResults"></div><div class="search-hint">Press Ctrl+K to search anytime</div></div>';
  document.body.appendChild(overlay);
  overlay.onclick=function(e){if(e.target===overlay)overlay.className='search-overlay';};

  document.addEventListener('keydown',function(e){
    if((e.ctrlKey||e.metaKey)&&e.key==='k'){e.preventDefault();overlay.className='search-overlay open';document.getElementById('searchInput').focus();document.getElementById('searchInput').value='';document.getElementById('searchResults').innerHTML='';}
    if(e.key==='Escape')overlay.className='search-overlay';
  });

  document.getElementById('searchInput').addEventListener('input',function(){
    var q=this.value.toLowerCase();
    var res=document.getElementById('searchResults');
    if(q.length<2){res.innerHTML='';return;}
    var h='';var found=0;
    for(var i=0;i<pages.length;i++){
      if(pages[i].title.toLowerCase().indexOf(q)>-1||pages[i].desc.toLowerCase().indexOf(q)>-1){
        h+='<div class="search-result-item" onclick="window.location.href=\''+pages[i].url+'\'"><h4>'+pages[i].title+'</h4><p>'+pages[i].desc+'</p></div>';
        found++;
      }
    }
    res.innerHTML=found?h:'<p style="text-align:center;color:#999;padding:15px">No results found</p>';
  });
})();

// ============================================
// BOOKMARK / SAVE PAGE
// ============================================
(function(){
  if(typeof SITE_CONFIG==='undefined')return;
  var F=SITE_CONFIG.features||{};
  if(F.bookmarkEnabled===false)return;
  var btn=document.createElement('button');btn.className='bookmark-btn';
  var saved=JSON.parse(localStorage.getItem('bookmarks')||'[]');
  var currentPage=window.location.pathname.split('/').pop()||'index.html';
  var isSaved=saved.indexOf(currentPage)>-1;
  btn.textContent=isSaved?'★ Saved':'☆ Save';
  btn.onclick=function(){
    saved=JSON.parse(localStorage.getItem('bookmarks')||'[]');
    var idx=saved.indexOf(currentPage);
    if(idx>-1){saved.splice(idx,1);btn.textContent='☆ Save';}
    else{saved.push(currentPage);btn.textContent='★ Saved';}
    localStorage.setItem('bookmarks',JSON.stringify(saved));
  };
  document.body.appendChild(btn);
})();

// ============================================
// QR CODE GENERATOR (for current page URL)
// ============================================
// Uses simple QR via API - works when hosted online
(function(){
  var shareBar=document.querySelector('.share-bar');
  if(!shareBar)return;
  var qrBtn=document.createElement('button');
  qrBtn.className='share-btn';
  qrBtn.style.cssText='background:#333;cursor:pointer;border:none;font-family:inherit;color:#fff';
  qrBtn.textContent='📱 QR';
  qrBtn.onclick=function(){
    var url=encodeURIComponent(window.location.href);
    var qrUrl='https://api.qrserver.com/v1/create-qr-code/?size=200x200&data='+url;
    var div=document.createElement('div');
    div.style.cssText='position:fixed;inset:0;z-index:99999;background:rgba(0,0,0,0.8);display:flex;align-items:center;justify-content:center';
    div.innerHTML='<div style="background:#fff;padding:25px;border-radius:12px;text-align:center"><h3 style="margin-bottom:10px;color:#7f0000">Scan to visit this page</h3><img src="'+qrUrl+'" style="border-radius:8px"><br><button onclick="this.parentElement.parentElement.remove()" style="margin-top:12px;padding:8px 20px;border:none;border-radius:6px;background:#b71c1c;color:#fff;cursor:pointer">Close</button></div>';
    document.body.appendChild(div);
  };
  shareBar.appendChild(qrBtn);
})();

// ============================================
// PDF EXPORT
// ============================================
(function(){
  var shareBar=document.querySelector('.share-bar');
  if(!shareBar)return;
  var pdfBtn=document.createElement('button');
  pdfBtn.className='share-btn';
  pdfBtn.style.cssText='background:#c62828;cursor:pointer;border:none;font-family:inherit;color:#fff';
  pdfBtn.textContent='📄 PDF';
  pdfBtn.onclick=function(){window.print();};
  shareBar.appendChild(pdfBtn);
})();

// ============================================
// READING TIME (for blog/puranam)
// ============================================
(function(){
  if(typeof SITE_CONFIG==='undefined')return;
  var F=SITE_CONFIG.features||{};
  if(F.readingTime===false)return;
  var content=document.getElementById('puranamContent')||document.getElementById('blogGrid');
  if(!content)return;
  var text=content.textContent||'';
  var words=text.trim().split(/\s+/).length;
  var mins=Math.ceil(words/200);
  var el=document.createElement('div');el.className='reading-time';
  el.textContent='📖 '+mins+' min read • '+words+' words';
  content.parentNode.insertBefore(el,content);
})();

// ============================================
// LAST UPDATED TIMESTAMP
// ============================================
(function(){
  if(typeof SITE_CONFIG==='undefined')return;
  var F=SITE_CONFIG.features||{};
  if(F.lastUpdated===false)return;
  var footer=document.querySelector('.footer-bottom');
  if(!footer)return;
  var el=document.createElement('div');el.className='last-updated';
  el.textContent='Last updated: '+new Date(document.lastModified).toLocaleDateString('en-US',{year:'numeric',month:'short',day:'numeric'});
  footer.appendChild(el);
})();

// ============================================
// BACK TO PREVIOUS PAGE
// ============================================
(function(){
  if(typeof SITE_CONFIG==='undefined')return;
  var F=SITE_CONFIG.features||{};
  if(F.backButton===false)return;
  var pageName=(window.location.pathname.split('/').pop()||'index.html').replace('.html','');
  if(pageName==='index'||pageName==='')return;
  var btn=document.createElement('a');
  btn.href='javascript:history.back()';
  btn.style.cssText='position:fixed;top:50%;left:0;z-index:998;background:var(--primary-dark,#7f0000);color:#fff;padding:8px 10px;border-radius:0 6px 6px 0;font-size:0.8rem;text-decoration:none;opacity:0.6;transition:0.3s;';
  btn.textContent='← Back';
  btn.onmouseenter=function(){this.style.opacity='1';};
  btn.onmouseleave=function(){this.style.opacity='0.6';};
  document.body.appendChild(btn);
})();


// ============================================
// PARTNERS / SPONSORS SECTION
// ============================================
(function(){
  if(typeof SITE_CONFIG==='undefined')return;
  var F=SITE_CONFIG.features||{};
  if(!F.partnersSection||typeof PARTNERS==='undefined'||!PARTNERS.length)return;
  var sec=document.createElement('section');sec.className='section partners-section';
  var h='<div class="container"><h2 class="section-title">🤝 Our Partners</h2><div class="partners-grid">';
  for(var i=0;i<PARTNERS.length;i++){
    var p=PARTNERS[i];
    h+='<a href="'+(p.url||'#')+'" target="_blank" rel="nofollow"><img src="'+p.logo+'" alt="'+p.name+'" title="'+p.name+'"></a>';
  }
  h+='</div></div>';sec.innerHTML=h;
  var ftr=document.querySelector('.footer');
  if(ftr)ftr.parentNode.insertBefore(sec,ftr);
})();

// ============================================
// TIMELINE / HISTORY SECTION
// ============================================
(function(){
  if(typeof SITE_CONFIG==='undefined')return;
  var F=SITE_CONFIG.features||{};
  if(!F.timelineSection||typeof TIMELINE==='undefined'||!TIMELINE.length)return;
  var sec=document.createElement('section');sec.className='section alt-bg';
  var h='<div class="container"><h2 class="section-title">📜 Our Journey</h2><div class="timeline">';
  for(var i=0;i<TIMELINE.length;i++){
    h+='<div class="timeline-item"><div class="timeline-dot"></div><div class="timeline-year">'+TIMELINE[i].year+'</div><div class="timeline-text">'+TIMELINE[i].text+'</div></div>';
  }
  h+='</div></div>';sec.innerHTML=h;
  var ftr=document.querySelector('.footer');
  if(ftr)ftr.parentNode.insertBefore(sec,ftr);
})();

// ============================================
// BEFORE / AFTER GALLERY
// ============================================
(function(){
  if(typeof SITE_CONFIG==='undefined')return;
  var F=SITE_CONFIG.features||{};
  if(!F.beforeAfterGallery||typeof BEFORE_AFTER==='undefined'||!BEFORE_AFTER.length)return;
  var sec=document.createElement('section');sec.className='section';
  var h='<div class="container"><h2 class="section-title">🔄 Before & After</h2><div class="ba-grid">';
  for(var i=0;i<BEFORE_AFTER.length;i++){
    var ba=BEFORE_AFTER[i];
    h+='<div class="ba-card"><div class="ba-label before">Before — '+(ba.label||'')+'</div><img src="'+ba.before+'" alt="Before"></div>';
    h+='<div class="ba-card"><div class="ba-label after">After — '+(ba.label||'')+'</div><img src="'+ba.after+'" alt="After"></div>';
  }
  h+='</div></div>';sec.innerHTML=h;
  var ftr=document.querySelector('.footer');
  if(ftr)ftr.parentNode.insertBefore(sec,ftr);
})();

// ============================================
// VIDEO TESTIMONIALS
// ============================================
(function(){
  if(typeof SITE_CONFIG==='undefined')return;
  var F=SITE_CONFIG.features||{};
  if(!F.videoTestimonials||typeof VIDEO_TESTIMONIALS==='undefined'||!VIDEO_TESTIMONIALS.length)return;
  var sec=document.createElement('section');sec.className='section alt-bg';
  var h='<div class="container"><h2 class="section-title">🎬 Video Testimonials</h2><div class="testimonial-grid">';
  for(var i=0;i<VIDEO_TESTIMONIALS.length;i++){
    var v=VIDEO_TESTIMONIALS[i];
    h+='<div class="testimonial-card">';
    if(v.video)h+='<video controls poster="'+(v.poster||'')+'" style="width:100%;border-radius:8px;margin-bottom:10px"><source src="'+v.video+'" type="video/mp4"></video>';
    else if(v.poster)h+='<img src="'+v.poster+'" style="width:100%;border-radius:8px;margin-bottom:10px" alt="">';
    h+='<p class="testimonial-text">'+v.text+'</p>';
    h+='<div class="testimonial-author"><div class="testimonial-avatar">'+v.name.charAt(0)+'</div><div><div class="testimonial-name">'+v.name+'</div></div></div>';
    h+='</div>';
  }
  h+='</div></div>';sec.innerHTML=h;
  var ftr=document.querySelector('.footer');
  if(ftr)ftr.parentNode.insertBefore(sec,ftr);
})();


// ============================================
// SKIP TO CONTENT (Accessibility)
// ============================================
(function(){
  var skip = document.createElement('a');
  skip.className = 'skip-link';
  skip.href = '#main-content';
  skip.textContent = 'Skip to content';
  document.body.insertBefore(skip, document.body.firstChild);
  // Add id to first section
  var main = document.querySelector('.section') || document.querySelector('.carousel-section');
  if (main && !main.id) main.id = 'main-content';
})();

// ============================================
// STRUCTURED DATA (JSON-LD for Google Rich Results)
// ============================================
(function(){
  if (typeof SITE_CONFIG === 'undefined') return;
  var S = SITE_CONFIG;

  // Organization schema
  var org = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": S.siteName || "",
    "url": window.location.origin,
    "logo": S.logoImage || "",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+" + (S.whatsapp || S.phone || ""),
      "contactType": "customer service"
    }
  };

  // LocalBusiness schema (for temples/businesses with address)
  var biz = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": S.siteName || "",
    "image": S.logoImage || "",
    "telephone": "+" + (S.whatsapp || S.phone || ""),
    "address": {
      "@type": "PostalAddress",
      "streetAddress": (S.footer && S.footer.address) ? S.footer.address : "",
      "addressLocality": "Vijayawada",
      "addressRegion": "Andhra Pradesh",
      "postalCode": "520012",
      "addressCountry": "IN"
    }
  };

  var script1 = document.createElement('script');
  script1.type = 'application/ld+json';
  script1.textContent = JSON.stringify(org);
  document.head.appendChild(script1);

  var script2 = document.createElement('script');
  script2.type = 'application/ld+json';
  script2.textContent = JSON.stringify(biz);
  document.head.appendChild(script2);

  // BreadcrumbList schema
  var pageName = (window.location.pathname.split('/').pop() || 'index.html').replace('.html', '');
  if (pageName !== 'index' && pageName !== '') {
    var names = {about:'About',services:'Services',books:'Grandhas',shop:'Shop',gallery:'Gallery',puranam:'Temple Legends',events:'Events',panchangam:'Panchangam',donate:'Donate',contact:'Contact',blog:'News',team:'Team',pricing:'Pricing',booking:'Booking'};
    var bc = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {"@type":"ListItem","position":1,"name":"Home","item":window.location.origin+"/index.html"},
        {"@type":"ListItem","position":2,"name":names[pageName]||pageName,"item":window.location.href}
      ]
    };
    var script3 = document.createElement('script');
    script3.type = 'application/ld+json';
    script3.textContent = JSON.stringify(bc);
    document.head.appendChild(script3);
  }
})();

// ============================================
// OPEN GRAPH IMAGE + TWITTER CARDS
// ============================================
(function(){
  if (typeof SITE_CONFIG === 'undefined') return;
  var S = SITE_CONFIG;

  // OG Image (use logo or first carousel image)
  var ogImage = S.logoImage || '';
  if (typeof CAROUSEL_SLIDES !== 'undefined' && CAROUSEL_SLIDES.length) {
    ogImage = CAROUSEL_SLIDES[0].image || ogImage;
  }

  var addMeta = function(prop, content) {
    if (!content) return;
    var existing = document.querySelector('meta[property="'+prop+'"]') || document.querySelector('meta[name="'+prop+'"]');
    if (existing) { existing.content = content; return; }
    var m = document.createElement('meta');
    if (prop.indexOf('og:') === 0) m.setAttribute('property', prop);
    else m.name = prop;
    m.content = content;
    document.head.appendChild(m);
  };

  // Open Graph
  addMeta('og:title', document.title);
  addMeta('og:description', (S.siteName || '') + ' - ' + (S.siteTagline || ''));
  addMeta('og:image', ogImage);
  addMeta('og:url', window.location.href);
  addMeta('og:type', 'website');
  addMeta('og:site_name', S.siteName || '');

  // Twitter Cards
  addMeta('twitter:card', 'summary_large_image');
  addMeta('twitter:title', document.title);
  addMeta('twitter:description', (S.siteName || '') + ' - ' + (S.siteTagline || ''));
  addMeta('twitter:image', ogImage);
})();

// ============================================
// KEYBOARD NAVIGATION ENHANCEMENTS
// ============================================
(function(){
  // Tab index on interactive elements
  var cards = document.querySelectorAll('.highlight-card, .service-card, .mission-card, .event-card, .shop-card, .grandha-card, .testimonial-card, .pricing-card, .team-card, .blog-card');
  for (var i = 0; i < cards.length; i++) {
    cards[i].setAttribute('tabindex', '0');
    cards[i].setAttribute('role', 'article');
  }

  // Enter key activates links inside focused cards
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && document.activeElement) {
      var link = document.activeElement.querySelector('a');
      if (link) link.click();
    }
  });
})();


// ============================================
// AUTO CARD COUNT + CARD STYLE
// ============================================
(function(){
  // Auto-detect card count and set data-count attribute
  var grids = ['.highlights-grid', '.services-grid', '.mission-grid', '.donate-purpose-grid', '.team-grid', '.pricing-grid'];
  for (var i = 0; i < grids.length; i++) {
    var grid = document.querySelector(grids[i]);
    if (grid) {
      var count = grid.children.length;
      grid.setAttribute('data-count', count);
    }
  }

  // Apply card style from config
  if (typeof SITE_CONFIG !== 'undefined' && SITE_CONFIG.features) {
    var cardStyle = SITE_CONFIG.features.cardStyle || 'default';
    if (cardStyle !== 'default') {
      document.body.classList.add('card-style-' + cardStyle);
    }
  }
})();


// ============================================
// PAGE TRANSITIONS - No Flash
// ============================================
(function(){
  // Hide body immediately
  document.body.classList.add('loading');

  // Get transition style from config
  var transition = 'fade';
  if (typeof SITE_CONFIG !== 'undefined' && SITE_CONFIG.features) {
    transition = SITE_CONFIG.features.pageTransition || 'fade';
  }

  // Show body with transition after everything loads
  function showPage() {
    document.body.classList.remove('loading');
    document.body.classList.add('loaded');
    document.body.classList.add('transition-' + transition);
  }

  // Wait for DOM + images
  if (document.readyState === 'complete') {
    showPage();
  } else {
    window.addEventListener('load', showPage);
  }

  // Smooth navigation between pages
  var navLinks = document.querySelectorAll('.nav a, .footer a[href$=".html"], .highlight-link');
  for (var i = 0; i < navLinks.length; i++) {
    navLinks[i].addEventListener('click', function(e) {
      var href = this.getAttribute('href');
      if (!href || href.indexOf('#') === 0 || href.indexOf('http') === 0 || href.indexOf('javascript') === 0) return;

      e.preventDefault();
      document.body.style.transition = 'opacity 0.3s ease';
      document.body.style.opacity = '0';

      setTimeout(function() {
        window.location.href = href;
      }, 300);
    });
  }
})();

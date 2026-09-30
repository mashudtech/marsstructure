/**
 * MARS STRUCTURE LIMITED — Main Interactive Script
 * Handles Extended Preloader, Sticky Header Scroll Effects,
 * Parallax Hero Scroll, Counter Animations, and Project Filtering
 */

document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initStickyHeader();
  initRioViewportScroll();
  initCounterObserver();
  initProjectsSlider();
  initTestimonialsSlider();
  initPropertyMap();
  initNavigation();
  initBackToTop();
  initAOS();
});

/**
 * 1. Architectural Preloader Controller (Extended Duration: ~2.5s)
 * Gives management and clients ample time to appreciate the golden emblem,
 * brand motto, and smooth loading progression.
 */
function initPreloader() {
  const preloader = document.getElementById('mars-preloader');
  const progressBar = document.getElementById('preloader-progress-bar');
  const counterText = document.getElementById('preloader-counter');

  if (!preloader) return;

  const totalDuration = 2400; // 2.4 seconds to fully show content
  const startTime = performance.now();

  function updateProgress(currentTime) {
    const elapsed = currentTime - startTime;
    const rawProgress = Math.min((elapsed / totalDuration) * 100, 100);
    const progress = Math.round(rawProgress);

    if (progressBar) progressBar.style.width = `${progress}%`;
    if (counterText) counterText.textContent = `${progress}%`;

    if (progress < 100) {
      requestAnimationFrame(updateProgress);
    } else {
      setTimeout(() => {
        dismissPreloader();
      }, 250);
    }
  }

  requestAnimationFrame(updateProgress);

  // Failsafe hard timeout
  setTimeout(() => {
    dismissPreloader();
  }, 3200);

  function dismissPreloader() {
    if (!preloader.classList.contains('loaded')) {
      preloader.classList.add('loaded');
      setTimeout(() => {
        if (window.marsPropertyMap) {
          window.marsPropertyMap.invalidateSize();
        }
        if (typeof AOS !== 'undefined') {
          AOS.refresh();
        }
      }, 350);
    }
  }
}

/**
 * 2. Sticky Header Scroll Effect
 * Transforms header into frosted glass with gold border upon scrolling down
 */
function initStickyHeader() {
  const header = document.querySelector('.mars-main-header');
  if (!header) return;

  function updateHeaderState() {
    const scrollY = window.scrollY;
    if (scrollY > 20) {
      document.body.classList.add('topbar-hidden');
      header.classList.add('header-scrolled');
    } else if (scrollY < 5) {
      document.body.classList.remove('topbar-hidden');
      header.classList.remove('header-scrolled');
    }
  }

  window.addEventListener('scroll', updateHeaderState, { passive: true });
  updateHeaderState();
}

/**
 * 3. RIO Property Signature Viewport Scroll Functionality
 * Pinned Sticky Viewport with Horizontal Text Parting Scrub:
 * - "BUILDING DREAMS," transforms outward to the left
 * - "CREATING FUTURES." transforms outward to the right
 * - Subtext, CTA buttons, badges & mouse indicator smoothly fade out
 * - Full unobstructed luxury architecture is revealed
 * - The subsequent section slides up over the pinned hero like a curtain
 */
function initRioViewportScroll() {
  const track = document.getElementById('heroTrack');
  const splitLeft = document.getElementById('heroSplitLeft');
  const splitRight = document.getElementById('heroSplitRight');
  const centerMeta = document.getElementById('heroCenterMeta');
  const topBadge = document.querySelector('.hero-top-badge-wrap');
  const scrollIndicator = document.getElementById('heroScrollIndicator');
  const backdropImg = document.querySelector('.hero-backdrop-img');
  const overlay = document.querySelector('.hero-gradient-overlay');

  if (!track || !splitLeft || !splitRight) return;

  let isTicking = false;

  function onScrollScrub() {
    const windowH = window.innerHeight;
    const totalDistance = Math.max(1, track.offsetHeight - windowH);

    // Smooth scrub driven directly from page scroll: zero dead zone, zero jumping!
    const scrolled = Math.max(0, window.scrollY);
    const progress = Math.max(0, Math.min(1, scrolled / totalDistance));

    // Phase 1 (0 to 0.72): Split headline moves outward horizontally and fades out
    const splitProgress = Math.min(1, progress / 0.70);
    // Smooth quadratic ease-in-out curve
    const ease = splitProgress < 0.5
      ? 2 * splitProgress * splitProgress
      : 1 - Math.pow(-2 * splitProgress + 2, 2) / 2;

    // Left headline moves left by up to 55vw (or % depending on viewport)
    const moveX = ease * 50; 
    splitLeft.style.transform = `translate3d(-${moveX}vw, 0, 0)`;
    splitLeft.style.opacity = `${Math.max(0, 1 - splitProgress * 1.35)}`;

    // Right headline moves right by up to 50vw
    splitRight.style.transform = `translate3d(${moveX}vw, 0, 0)`;
    splitRight.style.opacity = `${Math.max(0, 1 - splitProgress * 1.35)}`;

    // Center subtext, CTA buttons, and badge fade out faster and shift downward
    const metaFade = Math.max(0, 1 - splitProgress * 1.8);
    const metaShiftY = ease * 35; // 35px downward translation
    if (centerMeta) {
      centerMeta.style.opacity = `${metaFade}`;
      centerMeta.style.transform = `translate3d(0, ${metaShiftY}px, 0)`;
      centerMeta.style.pointerEvents = metaFade <= 0.05 ? 'none' : 'auto';
    }

    if (topBadge) {
      topBadge.style.opacity = `${metaFade}`;
      topBadge.style.transform = `translate3d(0, -${ease * 25}px, 0)`;
    }

    // Scroll indicator mouse pill fades out cleanly
    if (scrollIndicator) {
      scrollIndicator.style.opacity = `${metaFade}`;
      scrollIndicator.style.pointerEvents = metaFade <= 0.05 ? 'none' : 'auto';
    }

    // Backdrop Image: cinematic subtle zoom (1.0 -> 1.08)
    if (backdropImg) {
      const scale = 1 + progress * 0.08;
      backdropImg.style.transform = `scale(${scale})`;
    }

    // Overlay becomes even more luminous and transparent as user explores the building!
    if (overlay) {
      const alpha = Math.max(0.08, 0.40 - progress * 0.25);
      overlay.style.opacity = `${1 - progress * 0.4}`;
    }

    isTicking = false;
  }

  window.addEventListener('scroll', () => {
    if (!isTicking) {
      requestAnimationFrame(onScrollScrub);
      isTicking = true;
    }
  }, { passive: true });

  // Run immediately on load
  onScrollScrub();

  // Scroll indicator click scroll to about section
  if (scrollIndicator) {
    scrollIndicator.addEventListener('click', (e) => {
      e.preventDefault();
      const aboutSection = document.getElementById('about');
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
}

/**
 * 4. Animated Counters on Scroll Entry
 * Uses IntersectionObserver so stats count up smoothly when scrolled into view
 */
function initCounterObserver() {
  const counterSection = document.querySelector('.mars-counter-section');
  const counterItems = document.querySelectorAll('.counter-number');

  if (!counterSection || counterItems.length === 0) return;

  let hasAnimated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        animateCounters();
      }
    });
  }, { threshold: 0.25 });

  observer.observe(counterSection);

  function animateCounters() {
    counterItems.forEach(item => {
      const target = parseInt(item.getAttribute('data-target'), 10);
      const suffix = item.getAttribute('data-suffix') || '';
      const duration = 1600;
      const startTime = performance.now();

      function countStep(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out quadratic
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentVal = Math.round(target * easeOut);

        item.textContent = currentVal.toLocaleString() + suffix;

        if (progress < 1) {
          requestAnimationFrame(countStep);
        } else {
          item.textContent = target.toLocaleString() + suffix;
        }
      }

      requestAnimationFrame(countStep);
    });
  }
}

/**
 * 5. Signature Projects Slider & Filter System (Ongoing, Upcoming, Completed)
 * Interactive multi-item slider with Prev/Next arrow navigation, dynamic pagination dots,
 * and responsive column layouts (3 on desktop, 2 on tablet, 1 on mobile).
 */
function initProjectsSlider() {
  const filterBtns = document.querySelectorAll('.project-filter-btn');
  const track = document.getElementById('projectsSliderTrack');
  const prevBtn = document.getElementById('projectsPrevBtn');
  const nextBtn = document.getElementById('projectsNextBtn');
  const dotsContainer = document.getElementById('projectsSliderDots');
  const wrapper = document.getElementById('projectsSliderWrapper');

  if (!track) return;

  const allCards = Array.from(track.querySelectorAll('.project-slide-item'));
  let currentFilter = 'all';
  let currentIndex = 0;
  let activeCards = [];

  function getVisibleCount() {
    const w = window.innerWidth;
    if (w <= 650) return 1;
    if (w <= 991) return 2;
    return 3;
  }

  function getMaxIndex() {
    const visible = getVisibleCount();
    return Math.max(0, activeCards.length - visible);
  }

  function updateSliderPosition() {
    const visible = getVisibleCount();
    const maxIdx = getMaxIndex();
    if (currentIndex > maxIdx) currentIndex = maxIdx;
    if (currentIndex < 0) currentIndex = 0;

    if (activeCards.length === 0) {
      track.style.transform = 'translateX(0)';
      return;
    }

    const firstCard = activeCards[0];
    const gap = 24;
    const cardWidth = firstCard.offsetWidth;
    const moveX = currentIndex * (cardWidth + gap);

    track.style.transform = `translateX(-${moveX}px)`;

    // Update Arrow disabled state
    if (prevBtn) prevBtn.disabled = (currentIndex === 0);
    if (nextBtn) nextBtn.disabled = (currentIndex >= maxIdx);

    // Update Dots
    updateDots();
  }

  function renderDots() {
    if (!dotsContainer) return;
    dotsContainer.innerHTML = '';
    const maxIdx = getMaxIndex();
    const dotCount = maxIdx + 1;

    if (dotCount <= 1) {
      dotsContainer.style.display = 'none';
      return;
    }
    dotsContainer.style.display = 'flex';

    for (let i = 0; i < dotCount; i++) {
      const dot = document.createElement('span');
      dot.className = `p-dot ${i === currentIndex ? 'active' : ''}`;
      dot.setAttribute('data-index', i);
      dot.setAttribute('aria-label', `Go to projects slide ${i + 1}`);
      dot.addEventListener('click', () => {
        currentIndex = i;
        updateSliderPosition();
      });
      dotsContainer.appendChild(dot);
    }
  }

  function updateDots() {
    if (!dotsContainer) return;
    const dots = dotsContainer.querySelectorAll('.p-dot');
    dots.forEach((dot, idx) => {
      if (idx === currentIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  function setFilter(filterVal) {
    currentFilter = filterVal;
    currentIndex = 0;

    if (filterVal === 'all') {
      activeCards = [...allCards];
      allCards.forEach(card => {
        card.style.display = 'block';
      });
    } else {
      activeCards = allCards.filter(card => card.classList.contains(filterVal));
      allCards.forEach(card => {
        if (card.classList.contains(filterVal)) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    }

    // Update Filter Tab Buttons
    filterBtns.forEach(btn => {
      if (btn.getAttribute('data-filter') === filterVal) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    renderDots();
    requestAnimationFrame(updateSliderPosition);
  }

  // Arrow Click Listeners
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateSliderPosition();
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const maxIdx = getMaxIndex();
      if (currentIndex < maxIdx) {
        currentIndex++;
        updateSliderPosition();
      }
    });
  }

  // Filter Buttons
  filterBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      const filterVal = this.getAttribute('data-filter');
      setFilter(filterVal);
    });
  });

  // Navigation Dropdown links
  const dropdownLinks = document.querySelectorAll('.dropdown-filter-link');
  dropdownLinks.forEach(link => {
    link.addEventListener('click', function () {
      const targetFilter = this.getAttribute('data-target-filter');
      if (targetFilter) {
        setFilter(targetFilter);
      }
    });
  });

  // Touch Swipe for Mobile & Tablet
  let touchStartX = 0;
  let touchEndX = 0;
  if (wrapper) {
    wrapper.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    wrapper.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });
  }

  function handleSwipe() {
    const swipeThreshold = 40;
    if (touchEndX < touchStartX - swipeThreshold) {
      const maxIdx = getMaxIndex();
      if (currentIndex < maxIdx) {
        currentIndex++;
        updateSliderPosition();
      }
    } else if (touchEndX > touchStartX + swipeThreshold) {
      if (currentIndex > 0) {
        currentIndex--;
        updateSliderPosition();
      }
    }
  }

  // Handle Resize
  window.addEventListener('resize', () => {
    renderDots();
    updateSliderPosition();
  }, { passive: true });

  // Initial Filter
  const activeBtn = document.querySelector('.project-filter-btn.active');
  const initialFilter = activeBtn ? activeBtn.getAttribute('data-filter') : 'all';
  setFilter(initialFilter);
}

/**
 * 6. Client Testimonials Single-Item Slider Controller
 * Displays one testimonial card at a time with smooth transition,
 * Left/Right arrows, dynamic pagination dots, autoplay with pause-on-hover, and touch swipe.
 */
function initTestimonialsSlider() {
  const track = document.getElementById('testimonialSliderTrack');
  const prevBtn = document.getElementById('testimonialPrevBtn');
  const nextBtn = document.getElementById('testimonialNextBtn');
  const dotsContainer = document.getElementById('testimonialDots');
  const viewport = document.getElementById('testimonialViewport');

  if (!track) return;

  const slides = Array.from(track.querySelectorAll('.testimonial-slide-item'));
  const totalSlides = slides.length;
  if (totalSlides === 0) return;

  let currentSlide = 0;
  let autoplayTimer = null;

  function goToSlide(index) {
    if (index >= totalSlides) {
      currentSlide = 0;
    } else if (index < 0) {
      currentSlide = totalSlides - 1;
    } else {
      currentSlide = index;
    }

    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    updateDots();
  }

  function renderDots() {
    if (!dotsContainer) return;
    dotsContainer.innerHTML = '';

    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement('span');
      dot.className = `t-dot ${i === currentSlide ? 'active' : ''}`;
      dot.setAttribute('data-slide', i);
      dot.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
      dot.addEventListener('click', () => {
        goToSlide(i);
        restartAutoplay();
      });
      dotsContainer.appendChild(dot);
    }
  }

  function updateDots() {
    if (!dotsContainer) return;
    const dots = dotsContainer.querySelectorAll('.t-dot');
    dots.forEach((dot, idx) => {
      if (idx === currentSlide) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      goToSlide(currentSlide - 1);
      restartAutoplay();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      goToSlide(currentSlide + 1);
      restartAutoplay();
    });
  }

  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(() => {
      goToSlide(currentSlide + 1);
    }, 6000);
  }

  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  function restartAutoplay() {
    stopAutoplay();
    startAutoplay();
  }

  // Pause on hover
  if (viewport) {
    viewport.addEventListener('mouseenter', stopAutoplay);
    viewport.addEventListener('mouseleave', startAutoplay);

    // Touch Swipe
    let touchStartX = 0;
    let touchEndX = 0;

    viewport.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      stopAutoplay();
    }, { passive: true });

    viewport.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const swipeThreshold = 40;
      if (touchEndX < touchStartX - swipeThreshold) {
        goToSlide(currentSlide + 1);
      } else if (touchEndX > touchStartX + swipeThreshold) {
        goToSlide(currentSlide - 1);
      }
      startAutoplay();
    }, { passive: true });
  }

  renderDots();
  goToSlide(0);
  startAutoplay();
}

/**
 * 6. Navigation Interactivity & Mobile Drawer
 */
function initNavigation() {
  const mobileDrawer = document.getElementById('marsMobileDrawer');
  if (mobileDrawer) {
    const mobileLinks = mobileDrawer.querySelectorAll('.mobile-nav-link');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        const bsOffcanvas = bootstrap.Offcanvas.getInstance(mobileDrawer);
        if (bsOffcanvas) bsOffcanvas.hide();
      });
    });
  }
}

/**
 * 7. Floating Back to Top Button Controller
 * Appears when scrolling past 400px and smoothly scrolls back to the top
 */
function initBackToTop() {
  const backToTopBtn = document.getElementById('marsBackToTop');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }, { passive: true });

  backToTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/**
 * 8. Full-Width Interactive Map Controller (Leaflet with Custom Markers & Popups)
 * Visualizes all MARS Structure landmark properties across Jolshiri Smart City.
 */
function initPropertyMap() {
  const mapElement = document.getElementById('fullWidthPropertyMap');
  if (!mapElement || typeof L === 'undefined') return;

  // Center of Jolshiri Smart City, Narayanganj
  const jolshiriCenter = [23.7955, 90.4960];

  const map = L.map('fullWidthPropertyMap', {
    center: jolshiriCenter,
    zoom: 15,
    scrollWheelZoom: false, // Prevent accidental page scroll capture
    zoomControl: true,
    attributionControl: false // Hides the Leaflet credit label at bottom-right
  });

  // 1. Street View Layer (Esri World Street Map - Free, sharp architectural roads & sectors)
  const streetLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 19,
    attribution: ''
  });

  // 2. High-Resolution Satellite Imagery Layer (Esri World Imagery - Real aerial photography)
  const satelliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 19,
    attribution: ''
  });

  // Default: start with Street View
  let activeTileLayer = streetLayer;
  streetLayer.addTo(map);

  window.marsPropertyMap = map;

  // Map View Mode Switcher Toggle (Street View vs Satellite View)
  const viewBtns = document.querySelectorAll('.map-view-btn');
  viewBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      const targetLayer = this.getAttribute('data-map-layer');
      if (!targetLayer) return;

      viewBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      if (targetLayer === 'satellite') {
        if (map.hasLayer(streetLayer)) map.removeLayer(streetLayer);
        if (!map.hasLayer(satelliteLayer)) satelliteLayer.addTo(map);
        activeTileLayer = satelliteLayer;
      } else {
        if (map.hasLayer(satelliteLayer)) map.removeLayer(satelliteLayer);
        if (!map.hasLayer(streetLayer)) streetLayer.addTo(map);
        activeTileLayer = streetLayer;
      }
    });
  });

  // Auto-recalculate dimensions when scrolled into viewport or resized
  if ('IntersectionObserver' in window) {
    const mapObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            map.invalidateSize();
          }, 100);
        }
      });
    }, { threshold: 0.1 });
    mapObserver.observe(mapElement);
  }

  window.addEventListener('resize', () => {
    map.invalidateSize();
  }, { passive: true });

  // Property data with coordinates, photos, status types, and plot info
  const properties = [
    // ONGOING PROJECTS
    {
      id: 'bayt-al-noor',
      name: 'Bayt-Al Noor',
      type: 'ongoing',
      lat: 23.7915,
      lng: 90.4910,
      sector: 'Sector 08, Jolshiri',
      address: 'Plot 004, Road 501',
      status: 'Ongoing',
      iconClass: 'fa-building',
      markerClass: '',
      image: 'assets/images/projects/bayt-al-noor.jpg',
      desc: '5 Katha Single-Unit Luxury Residence • 2,850 Sft.'
    },
    {
      id: 'nur-anu-oasis',
      name: 'Nur-Anu Oasis',
      type: 'ongoing',
      lat: 23.7972,
      lng: 90.4975,
      sector: 'Sector 12, Jolshiri',
      address: 'Plot 007, Road 409A',
      status: 'Ongoing',
      iconClass: 'fa-building',
      markerClass: '',
      image: 'assets/images/projects/nur-anu-oasis.jpg',
      desc: 'Exclusive Luxury Residences • 40ft Wide Boulevard'
    },
    {
      id: 'monowara',
      name: 'Monowara',
      type: 'ongoing',
      lat: 23.7940,
      lng: 90.4925,
      sector: 'Sector 09, Jolshiri',
      address: 'Plot 001, Road 303',
      status: 'Ongoing',
      iconClass: 'fa-building',
      markerClass: '',
      image: 'assets/images/projects/monowara.jpg',
      desc: 'Facing Serene Green Park • Contemporary Luxury'
    },
    {
      id: 'zenith-tower',
      name: 'MARS Zenith Tower',
      type: 'ongoing',
      lat: 23.7985,
      lng: 90.4935,
      sector: 'Sector 10, Jolshiri',
      address: 'Plot 019, Road 401',
      status: 'Ongoing',
      iconClass: 'fa-building',
      markerClass: '',
      image: 'assets/images/projects/about-img7.png',
      desc: 'Exclusive Corner-Plot Luxury Suites • Double Height Lobby'
    },

    // UPCOMING PROJECTS
    {
      id: 'shanti-nibash',
      name: 'Shanti Nibash',
      type: 'upcoming',
      lat: 23.7995,
      lng: 90.5010,
      sector: 'Sector 13A, Jolshiri',
      address: 'Plot 004, Road 502',
      status: 'Upcoming',
      iconClass: 'fa-compass-drafting',
      markerClass: 'marker-upcoming',
      image: 'assets/images/projects/shanti-nibash.jpg',
      desc: 'Tranquil Sanctuary Living • High Daylight & Breeze'
    },
    {
      id: 'bayat-al-barakah',
      name: 'Bayat-Al Barakah',
      type: 'upcoming',
      lat: 23.7960,
      lng: 90.4990,
      sector: 'Sector 12, Jolshiri',
      address: 'Plot 026, Road 404',
      status: 'Upcoming',
      iconClass: 'fa-compass-drafting',
      markerClass: 'marker-upcoming',
      image: 'assets/images/projects/bayat-al-barakah.jpg',
      desc: 'Flagship Architectural Development • Capital Growth'
    },
    {
      id: 'royal-heights',
      name: 'Jolshiri Royal Heights',
      type: 'upcoming',
      lat: 23.7930,
      lng: 90.4965,
      sector: 'Sector 11, Jolshiri',
      address: 'Plot 015, Road 402',
      status: 'Upcoming',
      iconClass: 'fa-compass-drafting',
      markerClass: 'marker-upcoming',
      image: 'assets/images/projects/about-img7.png',
      desc: 'Architectural Masterpiece • Panoramic Boulevard Views'
    },
    {
      id: 'lakeview-crown',
      name: 'MARS Lakeview Crown',
      type: 'upcoming',
      lat: 23.7870,
      lng: 90.4910,
      sector: 'Sector 04, Jolshiri',
      address: 'Plot 011, Road 202',
      status: 'Upcoming',
      iconClass: 'fa-compass-drafting',
      markerClass: 'marker-upcoming',
      image: 'assets/images/projects/about-img8.png',
      desc: 'Lakeside Luxury Single Units • Biophilic Ventilation'
    },

    // COMPLETED PROJECTS
    {
      id: 'mars-valley',
      name: 'MARS Valley',
      type: 'completed',
      lat: 23.7890,
      lng: 90.4890,
      sector: 'Sector 03, Jolshiri',
      address: 'Plot 008, Road 201',
      status: 'Completed',
      iconClass: 'fa-circle-check',
      markerClass: 'marker-completed',
      image: 'assets/images/projects/about-img7.png',
      desc: 'Handed Over Landmark • BUET Certified Longevity'
    },
    {
      id: 'mars-heritage',
      name: 'MARS Heritage',
      type: 'completed',
      lat: 23.7910,
      lng: 90.4940,
      sector: 'Sector 07, Jolshiri',
      address: 'Plot 012, Road 302',
      status: 'Completed',
      iconClass: 'fa-circle-check',
      markerClass: 'marker-completed',
      image: 'assets/images/projects/about-img8.png',
      desc: 'Timeless Residential Tower • Handed Over & Occupied'
    },
    {
      id: 'mars-residency',
      name: 'MARS Residency',
      type: 'completed',
      lat: 23.7955,
      lng: 90.4950,
      sector: 'Sector 11, Jolshiri',
      address: 'Plot 005, Road 409',
      status: 'Completed',
      iconClass: 'fa-circle-check',
      markerClass: 'marker-completed',
      image: 'assets/images/projects/hero-bg.jpg',
      desc: 'Flagship Delivered Property • Earthquake-Safe Engineering'
    },

    // CORPORATE HEAD OFFICE
    {
      id: 'head-office',
      name: 'Corporate Head Office',
      type: 'office',
      lat: 23.7950,
      lng: 90.4960,
      sector: 'Sector 11, Jolshiri',
      address: 'Plot 005, Road 409',
      status: 'Head Office',
      iconClass: 'fa-landmark',
      markerClass: 'marker-office',
      image: 'assets/images/mars-logo.jpg',
      desc: 'MARS Structure Limited Headquarters • Client Reception'
    }
  ];

  const markerMap = {};
  const allBounds = [];

  properties.forEach(prop => {
    // Custom DivIcon marker with FontAwesome icon & pulse wave
    const customIcon = L.divIcon({
      className: 'mars-custom-marker-wrap',
      html: `
        <div class="mars-custom-marker" title="${prop.name}">
          <div class="marker-pin-body ${prop.markerClass}">
            <i class="fa-solid ${prop.iconClass}"></i>
          </div>
          <div class="marker-pin-pulse"></div>
        </div>
      `,
      iconSize: [44, 44],
      iconAnchor: [22, 40],
      popupAnchor: [0, -36]
    });

    const popupHtml = `
      <div class="map-popup-card">
        <div class="map-popup-img-frame">
          <img src="${prop.image}" alt="${prop.name}">
          <span class="map-popup-status">${prop.status}</span>
        </div>
        <div class="map-popup-body">
          <h4 class="map-popup-title">${prop.name}</h4>
          <div class="map-popup-address">
            <i class="fa-solid fa-location-dot text-gold"></i>
            <span>${prop.address}, ${prop.sector}</span>
          </div>
          <p class="small text-muted mb-3" style="font-size: 0.76rem; line-height: 1.4;">${prop.desc}</p>
          <a href="#contact" class="map-popup-link">
            <span>Inquire About Project</span>
            <i class="fa-solid fa-arrow-right ms-2"></i>
          </a>
        </div>
      </div>
    `;

    const marker = L.marker([prop.lat, prop.lng], { icon: customIcon }).addTo(map);
    marker.bindPopup(popupHtml, { maxWidth: 280, className: 'mars-custom-leaflet-popup' });

    markerMap[prop.id] = marker;
    allBounds.push([prop.lat, prop.lng]);
  });

  // Fit bounds nicely so all properties are visible initially once container is ready
  function fitAllProperties() {
    if (allBounds.length > 0 && mapElement.clientWidth > 0) {
      map.fitBounds(allBounds, { padding: [50, 50], maxZoom: 15 });
    }
  }

  // Attempt initial fit after small delay or on invalidate
  setTimeout(fitAllProperties, 500);

  // Scalable Map Filter Function by Status Type (All, Completed, Ongoing, Upcoming)
  function applyMapFilter(filterType) {
    const activeBounds = [];

    properties.forEach(prop => {
      const marker = markerMap[prop.id];
      if (!marker) return;

      const shouldShow = (filterType === 'all') || 
                         (prop.type === filterType) || 
                         (prop.type === 'office');

      if (shouldShow) {
        if (!map.hasLayer(marker)) {
          map.addLayer(marker);
        }
        activeBounds.push([prop.lat, prop.lng]);
      } else {
        if (map.hasLayer(marker)) {
          map.removeLayer(marker);
        }
      }
    });

    if (activeBounds.length > 0) {
      map.fitBounds(activeBounds, { padding: [60, 60], maxZoom: 15 });
    }
  }

  // Interactive Property Type Filter Tabs
  const filterPills = document.querySelectorAll('.map-selector-pill');
  filterPills.forEach(pill => {
    pill.addEventListener('click', function () {
      filterPills.forEach(p => p.classList.remove('active'));
      this.classList.add('active');

      const filterVal = this.getAttribute('data-map-filter');
      if (filterVal) {
        applyMapFilter(filterVal);
      }
    });
  });
}

/**
 * 10. AOS (Animate On Scroll) Controller
 * Subtle, luxury architectural reveals with smooth easing
 */
function initAOS() {
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 50,
      delay: 50
    });
  }
}


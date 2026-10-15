/**
 * TEKNIX - THE TECHNOLOGY DESTINATION
 * Multi-Page Application Logic & Scroll Animations
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileNav();
  initHeroSlider();
  initScrollAnimations();
  initServiceFilter();
  initRepairEstimator();
  initBookingModal();
  initQuickBookingForms();
  initGalleryFilters();
  initGalleryLightbox();
  highlightActiveNavLink();
});

// 1. STICKY HEADER
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

// 2. HIGHLIGHT CURRENT ACTIVE NAV LINK
function highlightActiveNavLink() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// 3. SCROLL ENTRANCE ANIMATIONS (IntersectionObserver)
function initScrollAnimations() {
  const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-up');
  if (!reveals.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.12
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  reveals.forEach(el => observer.observe(el));
}

// 4. MOBILE NAVIGATION TOGGLE
function initMobileNav() {
  const toggleBtn = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  
  if (!toggleBtn || !navLinks) return;

  toggleBtn.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const isExpanded = navLinks.classList.contains('open');
    toggleBtn.setAttribute('aria-expanded', isExpanded);
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });
}

// 5. SERVICES FILTERING
function initServiceFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const serviceCards = document.querySelectorAll('.service-card');

  if (!filterBtns.length || !serviceCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterCategory = btn.getAttribute('data-filter');

      serviceCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (filterCategory === 'all' || cardCategory === filterCategory) {
          card.style.display = 'flex';
          setTimeout(() => { card.style.opacity = '1'; }, 10);
        } else {
          card.style.display = 'none';
          card.style.opacity = '0';
        }
      });
    });
  });
}

// 6. REPAIR COST & TIME ESTIMATOR
const ESTIMATOR_DATA = {
  laptop: {
    name: 'Laptop',
    issues: [
      { id: 'screen', name: 'Broken Screen / Display Flickering', price: '₹2,400 - ₹4,800', time: '24 Hours', warranty: '3 Months' },
      { id: 'battery', name: 'Battery Replacement / Backup Issue', price: '₹1,500 - ₹2,900', time: 'Same Day', warranty: '6 Months' },
      { id: 'board', name: 'No Power / Chip-Level Motherboard Repair', price: '₹1,800 - ₹3,600', time: '24-48 Hours', warranty: '3 Months' },
      { id: 'ssd', name: 'High-Speed SSD Upgrade + OS Install', price: '₹1,950 - ₹3,500', time: '3-4 Hours', warranty: '3 Years (OEM)' },
      { id: 'cooling', name: 'Overheating / Fan Cleaning / Thermal Paste', price: '₹500 - ₹850', time: '2 Hours', warranty: '1 Month' },
    ]
  },
  desktop: {
    name: 'Desktop PC / All-in-One',
    issues: [
      { id: 'boot', name: 'PC Not Booting / Blue Screen (BSOD)', price: '₹600 - ₹1,400', time: 'Same Day', warranty: '1 Month' },
      { id: 'smps', name: 'Power Supply (SMPS) Replacement', price: '₹1,200 - ₹2,400', time: '2 Hours', warranty: '1-2 Years' },
      { id: 'upgrade', name: 'RAM / GPU / Storage Performance Boost', price: '₹1,500 - ₹6,000', time: 'Same Day', warranty: '3 Years (OEM)' },
      { id: 'cleaning', name: 'Cabinet Deep Cleaning & Cable Routing', price: '₹450 - ₹800', time: '2 Hours', warranty: '1 Month' },
    ]
  },
  printer: {
    name: 'Printers (InkTank / Laser)',
    issues: [
      { id: 'jam', name: 'Paper Jam / Roller Replacement', price: '₹650 - ₹1,200', time: 'Same Day', warranty: '1 Month' },
      { id: 'head', name: 'Printhead Clogging / Line Streaks', price: '₹800 - ₹1,900', time: '24 Hours', warranty: '1 Month' },
      { id: 'refill', name: 'Toner Cartridge Refill / Drum Replacement', price: '₹350 - ₹950', time: '1-2 Hours', warranty: 'Quality Guaranteed' },
      { id: 'board', name: 'Logic Board / Power Card Repair', price: '₹1,400 - ₹2,600', time: '24-48 Hours', warranty: '3 Months' },
    ]
  },
  pos: {
    name: 'POS & Billing System',
    issues: [
      { id: 'thermal', name: 'Thermal Receipt Printer Not Cutting/Printing', price: '₹750 - ₹1,800', time: 'Same Day', warranty: '3 Months' },
      { id: 'scanner', name: 'Barcode Scanner Not Reading / USB Issue', price: '₹600 - ₹1,400', time: 'Same Day', warranty: '3 Months' },
      { id: 'software', name: 'Billing Software Database Reset / Setup', price: '₹1,000 - ₹2,500', time: '2-4 Hours', warranty: 'Remote Support' },
      { id: 'touch', name: 'Touch POS Terminal Calibration / Motherboard', price: '₹2,000 - ₹4,500', time: '24 Hours', warranty: '3 Months' },
    ]
  }
};

function initRepairEstimator() {
  const deviceBtns = document.querySelectorAll('.device-btn');
  const issueSelect = document.getElementById('estIssueSelect');
  const priceDisplay = document.getElementById('estPriceDisplay');
  const timeDisplay = document.getElementById('estTimeDisplay');
  const warrantyDisplay = document.getElementById('estWarrantyDisplay');
  const deviceNameDisplay = document.getElementById('estDeviceNameDisplay');
  const whatsappQuoteBtn = document.getElementById('estWhatsappBtn');

  if (!deviceBtns.length || !issueSelect) return;

  // Set Printer as the #1 default priority
  let currentDevice = 'printer';

  function populateIssues(deviceKey) {
    const data = ESTIMATOR_DATA[deviceKey];
    if (!data) return;

    issueSelect.innerHTML = '';
    data.issues.forEach(issue => {
      const option = document.createElement('option');
      option.value = issue.id;
      option.textContent = issue.name;
      issueSelect.appendChild(option);
    });

    updateEstimate();
  }

  function updateEstimate() {
    const data = ESTIMATOR_DATA[currentDevice];
    if (!data) return;

    const selectedIssueId = issueSelect.value;
    const issueData = data.issues.find(i => i.id === selectedIssueId) || data.issues[0];

    if (issueData) {
      if (priceDisplay) priceDisplay.textContent = issueData.price;
      if (timeDisplay) timeDisplay.textContent = issueData.time;
      if (warrantyDisplay) warrantyDisplay.textContent = issueData.warranty;
      if (deviceNameDisplay) deviceNameDisplay.textContent = data.name;

      const brandVal = document.getElementById('estBrandSelect')?.value || 'Standard';
      const waMessage = encodeURIComponent(
        `Hello Teknix Kollam, I checked your online estimator for:\n` +
        `• Device: ${data.name} (${brandVal})\n` +
        `• Problem: ${issueData.name}\n` +
        `• Est. Cost: ${issueData.price}\n` +
        `Please confirm slot availability for repair/refill at High School Jn, Kollam.`
      );
      if (whatsappQuoteBtn) {
        whatsappQuoteBtn.href = `https://wa.me/918943294838?text=${waMessage}`;
      }
    }
  }

  deviceBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      deviceBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentDevice = btn.getAttribute('data-device');
      populateIssues(currentDevice);
    });
  });

  issueSelect.addEventListener('change', updateEstimate);
  document.getElementById('estBrandSelect')?.addEventListener('change', updateEstimate);

  // Default to printer
  populateIssues('printer');
}

// 7. BOOKING MODAL
function initBookingModal() {
  const modal = document.getElementById('bookingModal');
  const openBtns = document.querySelectorAll('.open-booking-modal');
  const closeBtns = modal.querySelectorAll('.modal-close, #closeModal, #closeModalBtn');
  const bookingForm = document.getElementById('modalBookingForm');

  if (!modal) return;

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const serviceName = btn.getAttribute('data-service-prefill') || '';
      const serviceField = document.getElementById('modalServiceInput') || document.getElementById('mbService');
      if (serviceField && serviceName) {
        serviceField.value = serviceName;
      }
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }
  });

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('modalNameInput')?.value || document.getElementById('mbName')?.value || 'Customer';
      const phone = document.getElementById('modalPhoneInput')?.value || document.getElementById('mbPhone')?.value || '';
      const service = document.getElementById('modalServiceInput')?.value || document.getElementById('mbService')?.value || 'General Service';
      const notes = document.getElementById('modalNotesInput')?.value || document.getElementById('mbDetails')?.value || 'Service request';

      const refNo = 'TKX-' + Math.floor(100000 + Math.random() * 900000);

      showToast(`Booking ${refNo} confirmed for ${name}! Connecting to WhatsApp...`);

      const text = encodeURIComponent(
        `Hi Teknix Kollam, I booked a service:\nRef: ${refNo}\nName: ${name}\nPhone: ${phone}\nService: ${service}\nNotes: ${notes}`
      );
      
      modal.classList.remove('open');
      document.body.style.overflow = '';
      bookingForm.reset();

      setTimeout(() => {
        window.open(`https://wa.me/918943294838?text=${text}`, '_blank');
      }, 1000);
    });
  }
}

// 8. QUICK BOOKING FORMS
function initQuickBookingForms() {
  const quickForm = document.getElementById('quickHeroForm');
  if (quickForm) {
    quickForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const devType = document.getElementById('heroDeviceType').value;
      const phone = document.getElementById('heroPhone').value;
      const issue = document.getElementById('heroIssue').value;

      const refNo = 'TKX-HERO-' + Math.floor(1000 + Math.random() * 9000);
      showToast(`Request Received (#${refNo})! Connecting to technician...`);

      const text = encodeURIComponent(
        `Hello Teknix Kollam, quick service booking:\nDevice: ${devType}\nPhone: ${phone}\nIssue: ${issue}`
      );

      setTimeout(() => {
        window.open(`https://wa.me/918943294838?text=${text}`, '_blank');
      }, 800);
    });
  }
}

// 9. TOAST NOTIFICATION UTILITY
function showToast(message) {
  let toast = document.getElementById('toastNotice');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toastNotice';
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path>
    </svg>
    <span>${message}</span>
  `;

  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 4500);
}

// 10. HERO ANIMATED IMAGE SLIDER
function initHeroSlider() {
  const sliderWrap = document.querySelector('.hero-slider-wrap');
  if (!sliderWrap) return;

  const slides = sliderWrap.querySelectorAll('.hero-slide');
  const dots = sliderWrap.querySelectorAll('.slider-dot');
  const prevBtn = sliderWrap.querySelector('.slider-arrow.prev');
  const nextBtn = sliderWrap.querySelector('.slider-arrow.next');

  if (!slides.length) return;

  let currentIndex = 0;
  let slideInterval = null;
  const autoPlayDelay = 5500;

  function showSlide(index) {
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;

    slides.forEach((s, i) => {
      s.classList.toggle('active', i === index);
    });

    dots.forEach((d, i) => {
      d.classList.toggle('active', i === index);
    });

    currentIndex = index;
  }

  function nextSlide() {
    showSlide(currentIndex + 1);
  }

  function prevSlide() {
    showSlide(currentIndex - 1);
  }

  function startAutoplay() {
    stopAutoplay();
    slideInterval = setInterval(nextSlide, autoPlayDelay);
  }

  function stopAutoplay() {
    if (slideInterval) {
      clearInterval(slideInterval);
      slideInterval = null;
    }
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      startAutoplay();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      startAutoplay();
    });
  }

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const idx = parseInt(dot.getAttribute('data-slide-to'), 10);
      showSlide(idx);
      startAutoplay();
    });
  });

  sliderWrap.addEventListener('mouseenter', stopAutoplay);
  sliderWrap.addEventListener('mouseleave', startAutoplay);

  // Mobile Touch Swipe Support
  let touchStartX = 0;
  let touchEndX = 0;

  sliderWrap.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    stopAutoplay();
  }, { passive: true });

  sliderWrap.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 45) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    startAutoplay();
  }, { passive: true });

  // Initialize
  showSlide(0);
  startAutoplay();
}

// 11. GALLERY FILTERING
function initGalleryFilters() {
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  const cards = document.querySelectorAll('#galleryGrid .gallery-card');

  if (!filterBtns.length || !cards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      cards.forEach(card => {
        const cat = card.getAttribute('data-cat');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

// 12. FULL-SCREEN INTERACTIVE LIGHTBOX
function initGalleryLightbox() {
  const lightbox = document.getElementById('galleryLightbox');
  if (!lightbox) return;

  const cards = Array.from(document.querySelectorAll('#galleryGrid .gallery-card'));
  if (!cards.length) return;

  const imgEl = document.getElementById('lightboxImg');
  const titleEl = document.getElementById('lightboxTitle');
  const descEl = document.getElementById('lightboxDesc');
  const counterEl = document.getElementById('lightboxCounter');
  const catBadgeEl = document.getElementById('lightboxCatBadge');
  const closeBtn = document.getElementById('lightboxClose');
  const backdrop = document.getElementById('lightboxBackdrop');
  const prevBtn = document.getElementById('lightboxPrev');
  const nextBtn = document.getElementById('lightboxNext');

  let activeList = [];
  let currentIndex = 0;

  function updateActiveList() {
    activeList = cards.filter(card => window.getComputedStyle(card).display !== 'none');
    if (!activeList.length) activeList = cards;
  }

  function showPhoto(idx) {
    if (!activeList.length) updateActiveList();
    if (idx < 0) idx = activeList.length - 1;
    if (idx >= activeList.length) idx = 0;

    currentIndex = idx;
    const targetCard = activeList[currentIndex];

    const src = targetCard.getAttribute('data-lightbox-src');
    const title = targetCard.getAttribute('data-lightbox-title') || '';
    const desc = targetCard.getAttribute('data-lightbox-desc') || '';
    const cat = targetCard.getAttribute('data-lightbox-cat') || '';

    imgEl.style.opacity = '0';
    imgEl.style.transform = 'scale(0.96)';

    setTimeout(() => {
      imgEl.src = src;
      imgEl.alt = title;
      titleEl.textContent = title;
      descEl.textContent = desc;
      catBadgeEl.textContent = cat;
      counterEl.textContent = `Photo ${currentIndex + 1} of ${activeList.length}`;

      imgEl.onload = () => {
        imgEl.style.opacity = '1';
        imgEl.style.transform = 'scale(1)';
      };
    }, 150);
  }

  function openLightbox(clickedCard) {
    updateActiveList();
    const idx = activeList.indexOf(clickedCard);
    currentIndex = idx !== -1 ? idx : 0;

    showPhoto(currentIndex);
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  cards.forEach(card => {
    card.addEventListener('click', () => {
      openLightbox(card);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (backdrop) backdrop.addEventListener('click', closeLightbox);
  if (prevBtn) prevBtn.addEventListener('click', () => showPhoto(currentIndex - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => showPhoto(currentIndex + 1));

  // Keyboard navigation (ESC, Left, Right)
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showPhoto(currentIndex - 1);
    if (e.key === 'ArrowRight') showPhoto(currentIndex + 1);
  });

  // Mobile swipe support for lightbox
  let lbStartX = 0;
  let lbEndX = 0;
  lightbox.addEventListener('touchstart', (e) => {
    lbStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  lightbox.addEventListener('touchend', (e) => {
    lbEndX = e.changedTouches[0].screenX;
    const diff = lbStartX - lbEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        showPhoto(currentIndex + 1);
      } else {
        showPhoto(currentIndex - 1);
      }
    }
  }, { passive: true });
}

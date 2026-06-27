/* ============================================
   TEHILLA AMPLIFY SOLUTIONS (TAS)
   Main JavaScript
   Built To Amplify. Designed To Scale.
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    // ---- Page Loader ----
    initPageLoader();

    // ---- Navigation ----
    initNavigation();

    // ---- Mobile Menu ----
    initMobileMenu();

    // ---- Scroll Reveal ----
    initScrollReveal();

    // ---- Counter Animation ----
    initCounterAnimation();

    // ---- Active Nav Link ----
    setActiveNavLink();

    // ---- Smooth Scroll for Anchor Links ----
    initSmoothScroll();

    // ---- Form Handling ----
    initFormHandling();
});

/* ============================================
   PAGE LOADER
   ============================================ */
function initPageLoader() {
    const loader = document.getElementById('page-loader');
    if (loader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                loader.classList.add('loaded');
                // Remove from DOM after animation
                setTimeout(() => loader.remove(), 500);
            }, 300);
        });
    }
}

/* ============================================
   NAVIGATION - Scroll Effect
   ============================================ */
function initNavigation() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    let lastScroll = 0;
    const scrollThreshold = 50;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add/remove scrolled class for background
        if (currentScroll > scrollThreshold) {
            navbar.classList.add('nav-scrolled');
        } else {
            navbar.classList.remove('nav-scrolled');
        }

        // Optional: hide on scroll down, show on scroll up
        if (currentScroll > lastScroll && currentScroll > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }

        lastScroll = currentScroll;
    }, { passive: true });
}

/* ============================================
   MOBILE MENU
   ============================================ */
function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    if (!menuBtn || !mobileMenu) return;

    let isOpen = false;

    menuBtn.addEventListener('click', () => {
        isOpen = !isOpen;
        mobileMenu.classList.toggle('hidden', !isOpen);

        // Animate hamburger to X
        const icon = menuBtn.querySelector('svg');
        if (isOpen) {
            icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>';
            document.body.style.overflow = 'hidden';
        } else {
            icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>';
            document.body.style.overflow = '';
        }
    });

    // Close menu on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            isOpen = false;
            mobileMenu.classList.add('hidden');
            const icon = menuBtn.querySelector('svg');
            icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>';
            document.body.style.overflow = '';
        });
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isOpen) {
            menuBtn.click();
        }
    });
}

/* ============================================
   SCROLL REVEAL - Intersection Observer
   ============================================ */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    if (revealElements.length === 0) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
        revealElements.forEach(el => el.classList.add('revealed'));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
}

/* ============================================
   COUNTER ANIMATION
   ============================================ */
function initCounterAnimation() {
    const counters = document.querySelectorAll('[data-counter]');
    if (counters.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-counter'), 10);
    const suffix = element.getAttribute('data-suffix') || '';
    const prefix = element.getAttribute('data-prefix') || '';
    const duration = 2000;
    const start = 0;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(start + (target - start) * eased);

        element.textContent = prefix + current.toLocaleString() + suffix;

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

/* ============================================
   ACTIVE NAV LINK
   ============================================ */
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

/* ============================================
   SMOOTH SCROLL - Anchor Links
   ============================================ */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ============================================
   FORM HANDLING (Placeholder)
   ============================================ */
function initFormHandling() {
    const forms = document.querySelectorAll('form[data-form]');

    forms.forEach(form => {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData.entries());

            // Show success state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = `
                <svg class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Sending...</span>
            `;
            submitBtn.disabled = true;

            // Simulate form submission
            setTimeout(() => {
                submitBtn.innerHTML = `
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                    </svg>
                    <span>Message Sent!</span>
                `;
                submitBtn.classList.remove('from-cyan-500', 'to-orange-500');
                submitBtn.classList.add('from-emerald-600', 'to-emerald-500');

                // Reset form
                form.reset();

                // Reset button after delay
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.classList.remove('from-emerald-600', 'to-emerald-500');
                    submitBtn.classList.add('from-cyan-500', 'to-orange-500');
                }, 3000);
            }, 1500);

            /* ============================================
               FORM SUBMISSION INTEGRATION GOES HERE
               
               Replace the setTimeout simulation above with 
               your preferred form service:
               
               Option 1: Formspree
               fetch('https://formspree.io/f/YOUR_FORM_ID', {
                   method: 'POST',
                   headers: { 'Content-Type': 'application/json' },
                   body: JSON.stringify(data)
               });
               
               Option 2: Netlify Forms
               Add netlify attribute to <form> tag
               
               Option 3: EmailJS
               emailjs.sendForm('service_id', 'template_id', this);
               
               Option 4: Google Forms
               Submit to Google Forms endpoint
               
               Option 5: Custom API
               fetch('/api/contact', {
                   method: 'POST',
                   headers: { 'Content-Type': 'application/json' },
                   body: JSON.stringify(data)
               });
               ============================================ */
        });
    });
}

/* ============================================
   UTILITY: Throttle Function
   ============================================ */
function throttle(func, limit) {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/* ============================================
   UTILITY: Debounce Function
   ============================================ */
function debounce(func, wait) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

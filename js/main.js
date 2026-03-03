/**
 * @file main.js
 * @description Core JavaScript for Home Solutions NC LLC website.
 *              Handles navigation, animations, form submission, and UI interactions.
 * @author herasi.dev
 * @version 2.0.0
 * @license MIT
 */

/* ============================================== */
/* 1. BUSINESS DATA - CENTRALIZED                 */
/* ============================================== */

/**
 * Centralized business information used across the site.
 * Single source of truth for contact details, service areas, and branding.
 * @constant {Object}
 */
const BUSINESS = {
    name: 'Home Solutions NC LLC',
    slogan: 'A Cleaner Home Starts Here',
    phone: '(919) 917-4604',
    phoneLink: '9199174604',
    email: 'info@homesolutionsnc.com',
    address: 'Wake County, NC',
    city: 'Raleigh, NC',
    hours: 'Mon - Sat: 8:00 AM - 6:00 PM',
    serviceAreas: 'Raleigh, Clayton, Garner, Knightdale, Rolesville, Wake Forest, Wendell, and Zebulon',
    whatsapp: '19199174604',
    whatsappMessage: "Hi! I'm interested in your cleaning services.",
    domain: 'https://www.homesolutionsnc.com',
};


/* ============================================== */
/* 2. DOM READY - Initialize everything           */
/* ============================================== */

/**
 * Main initialization. Runs all modules after DOM is fully loaded.
 * GSAP animations are conditionally initialized only if the library is available.
 */
document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initMobileMenu();
    initSmoothScroll();
    initActiveNavHighlight();
    initFAQAccordion();
    initContactForm();
    initWhatsAppButton();
    initHashNavigation();

    if (typeof gsap !== 'undefined') {
        initGSAPAnimations();
    }
});


/* ============================================== */
/* 3. NAVBAR - Scroll effect and state management */
/* ============================================== */

/**
 * Initializes the navbar scroll behavior.
 * - On the home page (with #hero): toggles between transparent and solid background
 *   based on scroll position using requestAnimationFrame for performance.
 * - On sub-pages (no #hero): immediately applies solid background.
 */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    const hero = document.getElementById('hero');
    const scrollThreshold = 80;

    if (!hero) {
        navbar.classList.add('scrolled');
        return;
    }

    function updateNavbar() {
        if (window.scrollY > scrollThreshold) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    updateNavbar();

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateNavbar();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}


/* ============================================== */
/* 4. MOBILE MENU - Toggle hamburger menu         */
/* ============================================== */

/**
 * Initializes the mobile hamburger menu with full interaction support.
 * Features:
 * - Toggle open/close with animated icon swap (hamburger/X)
 * - Auto-close on nav link click, CTA click, Escape key, or outside click
 * - Updates aria-label for accessibility
 * - Prevents body scroll when menu is open via .menu-open class
 */
function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const hamburgerIcon = document.getElementById('hamburger-icon');
    const closeIcon = document.getElementById('close-icon');

    if (!menuBtn || !mobileMenu) return;

    let isOpen = false;

    menuBtn.addEventListener('click', () => {
        isOpen = !isOpen;
        toggleMenu(isOpen);
    });

    const mobileLinks = mobileMenu.querySelectorAll('.mobile-nav-link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            isOpen = false;
            toggleMenu(false);
        });
    });

    const mobileCTAs = mobileMenu.querySelectorAll('a[href="contact.html"], a[href^="tel:"]');
    mobileCTAs.forEach(cta => {
        cta.addEventListener('click', () => {
            isOpen = false;
            toggleMenu(false);
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isOpen) {
            isOpen = false;
            toggleMenu(false);
        }
    });

    document.addEventListener('click', (e) => {
        if (isOpen && !mobileMenu.contains(e.target) && !menuBtn.contains(e.target)) {
            isOpen = false;
            toggleMenu(false);
        }
    });

    /**
     * Toggles the mobile menu open/closed state.
     * @param {boolean} open - Whether to open (true) or close (false) the menu
     */
    function toggleMenu(open) {
        if (open) {
            mobileMenu.classList.remove('hidden');
            mobileMenu.offsetHeight; // Force reflow for CSS transition
            mobileMenu.classList.add('open');
            hamburgerIcon.classList.add('hidden');
            closeIcon.classList.remove('hidden');
            document.body.classList.add('menu-open');
            menuBtn.setAttribute('aria-label', 'Close mobile menu');
        } else {
            mobileMenu.classList.remove('open');
            hamburgerIcon.classList.remove('hidden');
            closeIcon.classList.add('hidden');
            document.body.classList.remove('menu-open');
            menuBtn.setAttribute('aria-label', 'Open mobile menu');
            setTimeout(() => {
                if (!isOpen) {
                    mobileMenu.classList.add('hidden');
                }
            }, 300);
        }
    }
}


/* ============================================== */
/* 5. SMOOTH SCROLL - Anchor link scrolling       */
/* ============================================== */

/**
 * Enables smooth scrolling for all anchor links (href="#section").
 * Accounts for fixed navbar height to prevent content from hiding behind it.
 */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (!target) return;

            e.preventDefault();

            const navbarHeight = document.getElementById('navbar').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.scrollY - navbarHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });
}


/* ============================================== */
/* 6. HASH NAVIGATION - Handle cross-page hashes  */
/* ============================================== */

/**
 * Handles cross-page hash navigation (e.g., services.html linking to index.html#faqs).
 * Waits 300ms for DOM to settle before scrolling to the target section,
 * accounting for the fixed navbar height.
 */
function initHashNavigation() {
    if (window.location.hash) {
        const target = document.querySelector(window.location.hash);
        if (target) {
            setTimeout(() => {
                const navbar = document.getElementById('navbar');
                const navbarHeight = navbar ? navbar.offsetHeight : 0;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - navbarHeight;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }, 300);
        }
    }
}


/* ============================================== */
/* 7. ACTIVE NAV HIGHLIGHT - Page-based + scroll  */
/* ============================================== */

/**
 * Highlights the current page's nav link with the .active class.
 * Two modes:
 * - Page-based: matches the current URL path to nav link href
 * - Scroll-based (index.html only): updates active state for hash-linked
 *   sections (#faqs, etc.) as the user scrolls through them
 */
function initActiveNavHighlight() {
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    if (navLinks.length === 0) return;

    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop() || 'index.html';

    /**
     * Adds .active class to nav links matching the current page.
     * @param {NodeList} links - Collection of nav link elements to check
     */
    function highlightPageLink(links) {
        links.forEach(link => {
            const href = link.getAttribute('href');
            const linkPage = href.split('#')[0];

            if (linkPage === currentPage ||
                (currentPage === '' && linkPage === 'index.html') ||
                (currentPage === 'index.html' && linkPage === 'index.html')) {
                if (!href.startsWith('#')) {
                    link.classList.add('active');
                }
            } else if (linkPage === currentPage) {
                link.classList.add('active');
            }
        });
    }

    highlightPageLink(navLinks);
    highlightPageLink(mobileNavLinks);

    const sections = document.querySelectorAll('section[id]');
    if (sections.length === 0) return;

    /** Updates active nav link based on current scroll position. */
    function highlightScrollNav() {
        const scrollPosition = window.scrollY + 150;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    } else if (link.getAttribute('href').startsWith('#')) {
                        link.classList.remove('active');
                    }
                });
                mobileNavLinks.forEach(link => {
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    } else if (link.getAttribute('href').startsWith('#')) {
                        link.classList.remove('active');
                    }
                });
            }
        });
    }

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                highlightScrollNav();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    highlightScrollNav();
}


/* ============================================== */
/* 8. FAQ ACCORDION                               */
/* ============================================== */

/**
 * Initializes the FAQ accordion behavior.
 * Only one FAQ can be open at a time -- clicking a new item
 * automatically closes any previously opened item.
 */
function initFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length === 0) return;

    faqItems.forEach(item => {
        const toggle = item.querySelector('.faq-toggle');
        if (!toggle) return;

        toggle.addEventListener('click', () => {
            faqItems.forEach(other => {
                if (other !== item && other.classList.contains('open')) {
                    other.classList.remove('open');
                }
            });
            item.classList.toggle('open');
        });
    });
}


/* ============================================== */
/* 9. CONTACT FORM - Submission handler           */
/* ============================================== */

/**
 * Initializes the contact form with validation and WhatsApp submission.
 * Flow:
 * 1. Validates required fields (name, email, service) with visual feedback
 * 2. Builds a formatted message from form data
 * 3. Opens WhatsApp Web/App with the pre-filled message
 * 4. Shows a success confirmation on the submit button for 3 seconds
 *
 * Also clears validation errors on user input/change events.
 */
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = form.querySelector('#contact-name').value.trim();
        const email = form.querySelector('#contact-email').value.trim();
        const service = form.querySelector('#contact-service').value;
        const phone = form.querySelector('#contact-phone').value.trim();
        const message = form.querySelector('#contact-message').value.trim();

        const required = [
            { el: form.querySelector('#contact-name'), value: name, label: 'Full Name' },
            { el: form.querySelector('#contact-email'), value: email, label: 'Email' },
            { el: form.querySelector('#contact-service'), value: service, label: 'Service' },
        ];

        let isValid = true;

        required.forEach(field => {
            if (!field.value) {
                isValid = false;
                field.el.classList.add('border-red-500', 'ring-2', 'ring-red-200');
                if (typeof gsap !== 'undefined') {
                    gsap.fromTo(field.el, { x: -6 }, { x: 0, duration: 0.4, ease: 'elastic.out(1, 0.3)' });
                }
            } else {
                field.el.classList.remove('border-red-500', 'ring-2', 'ring-red-200');
            }
        });

        if (!isValid) return;

        let msg = `New Estimate Request\n`;
        msg += `---\n`;
        msg += `Name: ${name}\n`;
        msg += `Email: ${email}\n`;
        msg += `Service: ${service}\n`;
        if (phone) msg += `Phone: ${phone}\n`;
        if (message) {
            msg += `---\n`;
            msg += `Details:\n${message}\n`;
        }
        msg += `---\n`;
        msg += `Sent from homesolutionsnc.com`;

        const waUrl = `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(msg)}`;
        window.open(waUrl, '_blank');

        const btn = form.querySelector('button[type="submit"]');
        if (btn) {
            const originalText = btn.innerHTML;
            btn.innerHTML = 'Sent! Check WhatsApp';
            btn.classList.add('bg-green-600');
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.classList.remove('bg-green-600');
            }, 3000);
        }
    });

    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            input.classList.remove('border-red-500', 'ring-2', 'ring-red-200');
        });
        input.addEventListener('change', () => {
            input.classList.remove('border-red-500', 'ring-2', 'ring-red-200');
        });
    });
}


/* ============================================== */
/* 10. GSAP ANIMATIONS - All scroll animations    */
/* ============================================== */

/**
 * Master GSAP initialization. Registers ScrollTrigger and conditionally
 * initializes animations based on which elements exist on the current page.
 * This allows a single JS file to serve all pages without errors.
 */
function initGSAPAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    if (document.getElementById('hero')) {
        initHeroAnimation();
    }

    initServicesAnimation();
    initAboutAnimation();
    initServiceAreaAnimation();
    initFAQsAnimation();
    initTestimonialsAnimation();
    initSubPageAnimations();
}


/**
 * Hero section entrance animation (index.html only).
 * Sequentially fades in: title -> subtitle -> badge -> buttons
 * using a GSAP timeline with staggered overlaps.
 */
function initHeroAnimation() {
    const heroTimeline = gsap.timeline({
        defaults: { ease: 'power3.out', duration: 1 }
    });

    gsap.set(['#hero-title', '#hero-subtitle', '#hero-badge', '#hero-buttons'], {
        y: 50,
    });

    heroTimeline
        .to('#hero-title', { opacity: 1, y: 0, duration: 1 })
        .to('#hero-subtitle', { opacity: 1, y: 0 }, '-=0.6')
        .to('#hero-badge', { opacity: 1, y: 0 }, '-=0.5')
        .to('#hero-buttons', { opacity: 1, y: 0 }, '-=0.5');
}


/**
 * Service cards scroll animation.
 * Cards stagger upward into view when the #services section enters the viewport.
 */
function initServicesAnimation() {
    const serviceCards = document.querySelectorAll('.service-card');
    if (serviceCards.length === 0) return;

    gsap.set(serviceCards, { y: 60 });

    gsap.to(serviceCards, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '#services',
            start: 'top 75%',
            toggleActions: 'play none none none'
        }
    });
}


/**
 * About section scroll animation.
 * Text slides in from the left, image slides in from the right.
 * Each element animates independently when #about enters the viewport.
 */
function initAboutAnimation() {
    const aboutText = document.getElementById('about-text');
    const aboutImage = document.getElementById('about-image');

    if (aboutText) {
        gsap.set(aboutText, { x: -60 });
        gsap.to(aboutText, {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '#about',
                start: 'top 75%',
                toggleActions: 'play none none none'
            }
        });
    }

    if (aboutImage) {
        gsap.set(aboutImage, { x: 60 });
        gsap.to(aboutImage, {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '#about',
                start: 'top 75%',
                toggleActions: 'play none none none'
            }
        });
    }
}


/**
 * Service area cities scroll animation.
 * City tags stagger upward into view when #service-area enters the viewport.
 */
function initServiceAreaAnimation() {
    const areaCities = document.querySelectorAll('.area-city');
    if (areaCities.length === 0) return;

    gsap.set(areaCities, { y: 30 });

    gsap.to(areaCities, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '#service-area',
            start: 'top 80%',
            toggleActions: 'play none none none'
        }
    });
}


/**
 * FAQ items scroll animation.
 * FAQ accordion items stagger upward into view when #faqs enters the viewport.
 */
function initFAQsAnimation() {
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length === 0) return;

    gsap.set(faqItems, { y: 30 });

    gsap.to(faqItems, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '#faqs',
            start: 'top 80%',
            toggleActions: 'play none none none'
        }
    });
}


/**
 * Testimonial cards scroll animation.
 * Cards stagger upward into view when #testimonials enters the viewport.
 */
function initTestimonialsAnimation() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    if (testimonialCards.length === 0) return;

    gsap.set(testimonialCards, { y: 50 });

    gsap.to(testimonialCards, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '#testimonials',
            start: 'top 80%',
            toggleActions: 'play none none none'
        }
    });
}


/**
 * Generic fade-in animation for sub-page content.
 * Any element with the .animate-on-scroll class will fade in and
 * slide up when it enters the viewport. Used on services.html,
 * about.html, and contact.html.
 */
function initSubPageAnimations() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    if (elements.length === 0) return;

    elements.forEach(el => {
        gsap.set(el, { y: 40, opacity: 0 });

        gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                toggleActions: 'play none none none'
            }
        });
    });
}


/* ============================================== */
/* 11. WHATSAPP BUTTON - Floating button setup    */
/* ============================================== */

/**
 * Initializes the floating WhatsApp button behavior.
 * - Appears with a scale-in animation after a 2-second delay
 * - Automatically hides when scrolled near the footer to prevent overlap
 * - Gracefully degrades without GSAP (simple display without animation)
 */
function initWhatsAppButton() {
    const whatsappBtn = document.getElementById('whatsapp-btn');
    const footer = document.querySelector('footer');
    if (!whatsappBtn) return;

    let btnVisible = false;
    let btnReady = false;

    if (typeof gsap === 'undefined') {
        whatsappBtn.style.opacity = '1';
        whatsappBtn.style.transform = 'scale(1)';
        btnReady = true;
        btnVisible = true;
        return;
    }

    gsap.set(whatsappBtn, { scale: 0, opacity: 0 });
    gsap.to(whatsappBtn, {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        delay: 2,
        ease: 'back.out(1.7)',
        onComplete: () => {
            btnReady = true;
            btnVisible = true;
            checkFooterOverlap();
        }
    });

    /**
     * Checks if the WhatsApp button overlaps with the footer
     * and hides/shows it accordingly with a smooth animation.
     */
    function checkFooterOverlap() {
        if (!footer || !btnReady) return;

        const footerTop = footer.getBoundingClientRect().top;
        const threshold = window.innerHeight - 100;

        if (footerTop <= threshold && btnVisible) {
            btnVisible = false;
            gsap.to(whatsappBtn, {
                opacity: 0,
                scale: 0.8,
                duration: 0.3,
                onComplete: () => { whatsappBtn.style.pointerEvents = 'none'; }
            });
        } else if (footerTop > threshold && !btnVisible) {
            btnVisible = true;
            whatsappBtn.style.pointerEvents = 'auto';
            gsap.to(whatsappBtn, { opacity: 1, scale: 1, duration: 0.3 });
        }
    }

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                checkFooterOverlap();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}


/* ============================================== */
/* 12. PERFORMANCE - Resize and visibility        */
/* ============================================== */

/**
 * Debounced window resize handler.
 * Refreshes ScrollTrigger calculations after resize settles (250ms debounce)
 * to ensure scroll-triggered animations stay aligned with new layout.
 */
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        if (typeof ScrollTrigger !== 'undefined') {
            ScrollTrigger.refresh();
        }
    }, 250);
}, { passive: true });

/**
 * Page visibility handler for the hero video.
 * Pauses the background video when the browser tab is hidden
 * and resumes playback when the tab becomes visible again.
 * Saves battery and CPU on mobile devices.
 */
document.addEventListener('visibilitychange', () => {
    const heroVideo = document.querySelector('#hero video');
    if (!heroVideo) return;

    if (document.hidden) {
        heroVideo.pause();
    } else {
        heroVideo.play().catch(() => {});
    }
});

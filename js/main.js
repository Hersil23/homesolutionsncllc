/* ============================================== */
/* HOME SOLUTIONS NC LLC - Main JavaScript        */
/* main.js                                         */
/* ============================================== */

/* ============================================== */
/* 1. BUSINESS DATA - CENTRALIZED                 */
/* ============================================== */

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

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initMobileMenu();
    initSmoothScroll();
    initActiveNavHighlight();
    initFAQAccordion();
    initContactForm();
    initWhatsAppButton();
    initHashNavigation();

    // Only init GSAP if available
    if (typeof gsap !== 'undefined') {
        initGSAPAnimations();
    }
});


/* ============================================== */
/* 3. NAVBAR - Scroll effect and state management */
/* ============================================== */

function initNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    const hero = document.getElementById('hero');
    const scrollThreshold = 80;

    // Sub-pages (no hero): always show solid navbar
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

    function toggleMenu(open) {
        if (open) {
            mobileMenu.classList.remove('hidden');
            mobileMenu.offsetHeight;
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

function initActiveNavHighlight() {
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    if (navLinks.length === 0) return;

    // Determine current page
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop() || 'index.html';

    // Highlight page-based nav links
    function highlightPageLink(links) {
        links.forEach(link => {
            const href = link.getAttribute('href');
            const linkPage = href.split('#')[0];

            if (linkPage === currentPage ||
                (currentPage === '' && linkPage === 'index.html') ||
                (currentPage === 'index.html' && linkPage === 'index.html')) {
                // Only mark Home as active on index, not hash links
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

    // On index page, also do scroll-based highlighting for #faqs
    const sections = document.querySelectorAll('section[id]');
    if (sections.length === 0) return;

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

function initFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length === 0) return;

    faqItems.forEach(item => {
        const toggle = item.querySelector('.faq-toggle');
        if (!toggle) return;

        toggle.addEventListener('click', () => {
            // Close all other items
            faqItems.forEach(other => {
                if (other !== item && other.classList.contains('open')) {
                    other.classList.remove('open');
                }
            });
            // Toggle current item
            item.classList.toggle('open');
        });
    });
}


/* ============================================== */
/* 9. CONTACT FORM - Submission handler           */
/* ============================================== */

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

        // Validate required fields
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

        // Build WhatsApp message
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

        // Show success feedback
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

    // Remove red border on input
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

function initGSAPAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    // Hero animation (index page only)
    if (document.getElementById('hero')) {
        initHeroAnimation();
    }

    // Services cards
    initServicesAnimation();

    // About section
    initAboutAnimation();

    // Service area
    initServiceAreaAnimation();

    // FAQs
    initFAQsAnimation();

    // Testimonials
    initTestimonialsAnimation();

    // Sub-page content fade-in
    initSubPageAnimations();
}


/* Hero Section - Timeline animation on load */
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


/* Services - Cards stagger from below */
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


/* About - Text from left, image from right */
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


/* Service Area - Cities stagger in */
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


/* FAQs - Items stagger in */
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


/* Testimonials - Cards stagger in */
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


/* Sub-page content - Generic fade-in for .animate-on-scroll */
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

let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        if (typeof ScrollTrigger !== 'undefined') {
            ScrollTrigger.refresh();
        }
    }, 250);
}, { passive: true });

document.addEventListener('visibilitychange', () => {
    const heroVideo = document.querySelector('#hero video');
    if (!heroVideo) return;

    if (document.hidden) {
        heroVideo.pause();
    } else {
        heroVideo.play().catch(() => {});
    }
});

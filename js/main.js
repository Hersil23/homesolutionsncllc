/* ============================================== */
/* HOME SOLUTIONS NC LLC - Main JavaScript        */
/* main.js                                         */
/* ============================================== */

/* ============================================== */
/* 1. BUSINESS DATA - CENTRALIZED PLACEHOLDERS    */
/* POR CONFIRMAR CON EL CLIENTE:                  */
/* Update these values once client provides info  */
/* ============================================== */

const BUSINESS = {
    name: 'Home Solutions NC LLC',
    slogan: 'Your Home, Our Priority',
    phone: '(000) 000-0000',           // POR CONFIRMAR CON EL CLIENTE
    phoneLink: '+10000000000',          // POR CONFIRMAR CON EL CLIENTE
    email: 'info@homesolutionsncllc.com', // POR CONFIRMAR CON EL CLIENTE
    address: 'North Carolina',          // POR CONFIRMAR CON EL CLIENTE
    city: 'Raleigh, NC',               // POR CONFIRMAR CON EL CLIENTE
    hours: 'Mon - Sat: 8:00 AM - 6:00 PM', // POR CONFIRMAR CON EL CLIENTE
    yearFounded: '2020',               // POR CONFIRMAR CON EL CLIENTE
    homesCleaned: 500,                  // POR CONFIRMAR CON EL CLIENTE
    yearsExperience: 5,                 // POR CONFIRMAR CON EL CLIENTE
    serviceAreas: 'Raleigh, Cary, Apex, Durham, Chapel Hill and surrounding areas', // POR CONFIRMAR CON EL CLIENTE
    socialMedia: {
        instagram: '#',                 // POR CONFIRMAR CON EL CLIENTE
        facebook: '#',                  // POR CONFIRMAR CON EL CLIENTE
        tiktok: '#',                    // POR CONFIRMAR CON EL CLIENTE
    },
    googleMapsReviews: '#',             // POR CONFIRMAR CON EL CLIENTE
    whatsapp: '10000000000',            // POR CONFIRMAR CON EL CLIENTE (number without + or spaces)
    whatsappMessage: "Hi! I'm interested in your cleaning services.", // Default WhatsApp message
    domain: 'https://www.homesolutionsncllc.com',       // POR CONFIRMAR CON EL CLIENTE
};


/* ============================================== */
/* 2. DOM READY - Initialize everything           */
/* ============================================== */

document.addEventListener('DOMContentLoaded', () => {
    populateBusinessData();
    initNavbar();
    initMobileMenu();
    initSmoothScroll();
    initActiveNavHighlight();
    initGSAPAnimations();
    initBeforeAfterSliders();
    initWhatsAppButton();
});


/* ============================================== */
/* 3. POPULATE BUSINESS DATA                      */
/* Fills all placeholder elements with data       */
/* from the BUSINESS object                       */
/* ============================================== */

function populateBusinessData() {
    // Update all phone number displays
    const phoneElements = document.querySelectorAll('.phone-number');
    phoneElements.forEach(el => {
        el.textContent = BUSINESS.phone;
    });

    // Update all phone links
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(el => {
        el.setAttribute('href', `tel:${BUSINESS.phoneLink}`);
    });

    // Update all email displays
    const emailElements = document.querySelectorAll('.contact-email');
    emailElements.forEach(el => {
        el.textContent = BUSINESS.email;
    });

    // Update all email links
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(el => {
        el.setAttribute('href', `mailto:${BUSINESS.email}`);
    });

    // Update operating hours
    const hoursElements = document.querySelectorAll('.operating-hours');
    hoursElements.forEach(el => {
        el.textContent = BUSINESS.hours;
    });

    // Update service areas
    const areaElements = document.querySelectorAll('.service-areas');
    areaElements.forEach(el => {
        el.textContent = BUSINESS.serviceAreas;
    });

    // Update counter targets from business data
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const label = counter.closest('div').parentElement.querySelector('p');
        if (label) {
            if (label.textContent.includes('Homes Cleaned')) {
                counter.setAttribute('data-target', BUSINESS.homesCleaned);
            } else if (label.textContent.includes('Years of Experience')) {
                counter.setAttribute('data-target', BUSINESS.yearsExperience);
            }
        }
    });

    // Update all WhatsApp links (floating button + CTA buttons)
    const waMsg = encodeURIComponent(BUSINESS.whatsappMessage);
    const waUrl = `https://wa.me/${BUSINESS.whatsapp}?text=${waMsg}`;

    const whatsappBtn = document.getElementById('whatsapp-btn');
    if (whatsappBtn) {
        whatsappBtn.setAttribute('href', waUrl);
    }

    const whatsappCTAs = document.querySelectorAll('.whatsapp-cta');
    whatsappCTAs.forEach(cta => {
        cta.setAttribute('href', waUrl);
    });

    // Update social media links
    const socialLinks = document.querySelectorAll('footer a[aria-label]');
    socialLinks.forEach(link => {
        const label = link.getAttribute('aria-label').toLowerCase();
        if (label.includes('instagram')) {
            link.setAttribute('href', BUSINESS.socialMedia.instagram);
        } else if (label.includes('facebook')) {
            link.setAttribute('href', BUSINESS.socialMedia.facebook);
        } else if (label.includes('tiktok')) {
            link.setAttribute('href', BUSINESS.socialMedia.tiktok);
        }
    });

    // Update "See All Reviews" link
    const reviewLink = document.querySelector('a[href="#"][target="_blank"]');
    if (reviewLink && reviewLink.textContent.trim().startsWith('See All Reviews')) {
        reviewLink.setAttribute('href', BUSINESS.googleMapsReviews);
    }
}


/* ============================================== */
/* 4. NAVBAR - Scroll effect and state management */
/* ============================================== */

function initNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    // Threshold in pixels before navbar changes
    const scrollThreshold = 80;

    function updateNavbar() {
        if (window.scrollY > scrollThreshold) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    // Run on load in case page is already scrolled
    updateNavbar();

    // Optimized scroll listener with requestAnimationFrame
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
/* 5. MOBILE MENU - Toggle hamburger menu         */
/* ============================================== */

function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const hamburgerIcon = document.getElementById('hamburger-icon');
    const closeIcon = document.getElementById('close-icon');

    if (!menuBtn || !mobileMenu) return;

    let isOpen = false;

    // Toggle menu on button click
    menuBtn.addEventListener('click', () => {
        isOpen = !isOpen;
        toggleMenu(isOpen);
    });

    // Close menu when a nav link is clicked
    const mobileLinks = mobileMenu.querySelectorAll('.mobile-nav-link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            isOpen = false;
            toggleMenu(false);
        });
    });

    // Close menu when CTA button in mobile menu is clicked
    const mobileCTA = mobileMenu.querySelector('a[href="#contact"]');
    if (mobileCTA) {
        mobileCTA.addEventListener('click', () => {
            isOpen = false;
            toggleMenu(false);
        });
    }

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isOpen) {
            isOpen = false;
            toggleMenu(false);
        }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (isOpen && !mobileMenu.contains(e.target) && !menuBtn.contains(e.target)) {
            isOpen = false;
            toggleMenu(false);
        }
    });

    function toggleMenu(open) {
        if (open) {
            mobileMenu.classList.remove('hidden');
            // Force reflow before adding open class for transition
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
            // Wait for transition to finish before hiding
            setTimeout(() => {
                if (!isOpen) {
                    mobileMenu.classList.add('hidden');
                }
            }, 300);
        }
    }
}


/* ============================================== */
/* 6. SMOOTH SCROLL - Anchor link scrolling       */
/* ============================================== */

function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

            // Skip if it's just "#"
            if (href === '#') return;

            const target = document.querySelector(href);
            if (!target) return;

            e.preventDefault();

            // Calculate offset for fixed navbar
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
/* 7. ACTIVE NAV HIGHLIGHT - Scroll spy           */
/* ============================================== */

function initActiveNavHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    if (sections.length === 0 || navLinks.length === 0) return;

    function highlightNav() {
        const scrollPosition = window.scrollY + 150;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Update desktop nav links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });

                // Update mobile nav links
                mobileNavLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // Optimized scroll listener
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                highlightNav();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    // Initial highlight
    highlightNav();
}


/* ============================================== */
/* 8. GSAP ANIMATIONS - All scroll animations     */
/* ============================================== */

function initGSAPAnimations() {
    // Register GSAP ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // ----- HERO SECTION ANIMATION -----
    initHeroAnimation();

    // ----- TRUST BAR ANIMATION -----
    initTrustBarAnimation();

    // ----- SERVICES CARDS ANIMATION -----
    initServicesAnimation();

    // ----- HOW IT WORKS ANIMATION -----
    initHowItWorksAnimation();

    // ----- ABOUT SECTION ANIMATION -----
    initAboutAnimation();

    // ----- GALLERY ANIMATION -----
    initGalleryAnimation();

    // ----- TESTIMONIALS ANIMATION -----
    initTestimonialsAnimation();

}


/* Hero Section - Timeline animation on load */
function initHeroAnimation() {
    const heroTimeline = gsap.timeline({
        defaults: {
            ease: 'power3.out',
            duration: 1
        }
    });

    heroTimeline
        .to('#hero-logo', {
            opacity: 1,
            y: 0,
            duration: 1.2,
        })
        .to('#hero-title', {
            opacity: 1,
            y: 0,
        }, '-=0.6')
        .to('#hero-subtitle', {
            opacity: 1,
            y: 0,
        }, '-=0.6')
        .to('#hero-buttons', {
            opacity: 1,
            y: 0,
        }, '-=0.5');

    // Set initial states
    gsap.set(['#hero-logo', '#hero-title', '#hero-subtitle', '#hero-buttons'], {
        y: 50,
    });
}


/* Trust Bar - Fade in with stagger */
function initTrustBarAnimation() {
    const trustItems = document.querySelectorAll('.trust-item');
    if (trustItems.length === 0) return;

    gsap.to(trustItems, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '#trust-bar',
            start: 'top 85%',
            toggleActions: 'play none none none'
        }
    });

    // Set initial state
    gsap.set(trustItems, { y: 40 });
}


/* Services - Cards stagger from below */
function initServicesAnimation() {
    const serviceCards = document.querySelectorAll('.service-card');
    if (serviceCards.length === 0) return;

    gsap.to(serviceCards, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '#services',
            start: 'top 75%',
            toggleActions: 'play none none none'
        }
    });

    // Set initial state
    gsap.set(serviceCards, { y: 60 });
}


/* How It Works - Steps enter sequentially */
function initHowItWorksAnimation() {
    const steps = document.querySelectorAll('.step-item');
    if (steps.length === 0) return;

    gsap.to(steps, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.25,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '#how-it-works',
            start: 'top 80%',
            toggleActions: 'play none none none'
        }
    });

    // Set initial state
    gsap.set(steps, { y: 50 });
}


/* About - Text from left, image from right, counters */
function initAboutAnimation() {
    const aboutText = document.getElementById('about-text');
    const aboutImage = document.getElementById('about-image');

    if (aboutText) {
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

        // Set initial state
        gsap.set(aboutText, { x: -60 });
    }

    if (aboutImage) {
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

        // Set initial state
        gsap.set(aboutImage, { x: 60 });
    }

    // Animated counters
    initCounterAnimation();
}


/* Counter Animation - Numbers count up when section is visible */
function initCounterAnimation() {
    const counters = document.querySelectorAll('.counter');
    if (counters.length === 0) return;

    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'), 10);

        ScrollTrigger.create({
            trigger: counter,
            start: 'top 90%',
            once: true,
            onEnter: () => {
                animateCounter(counter, target);
            }
        });
    });
}

/* Animate a single counter from 0 to target */
function animateCounter(element, target) {
    const duration = 2;
    const obj = { value: 0 };

    gsap.to(obj, {
        value: target,
        duration: duration,
        ease: 'power1.out',
        onUpdate: () => {
            element.textContent = Math.round(obj.value);
        },
        onComplete: () => {
            element.textContent = target;
        }
    });
}


/* Gallery - Fade in on scroll */
function initGalleryAnimation() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    if (galleryItems.length === 0) return;

    gsap.to(galleryItems, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.3,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '#gallery',
            start: 'top 80%',
            toggleActions: 'play none none none'
        }
    });

    // Set initial state
    gsap.set(galleryItems, { y: 40 });
}


/* Testimonials - Cards stagger in */
function initTestimonialsAnimation() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    if (testimonialCards.length === 0) return;

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

    // Set initial state
    gsap.set(testimonialCards, { y: 50 });
}


/* ============================================== */
/* 9. BEFORE/AFTER SLIDERS - Drag functionality   */
/* ============================================== */

function initBeforeAfterSliders() {
    const sliders = document.querySelectorAll('.before-after-slider');

    sliders.forEach(slider => {
        const beforeWrapper = slider.querySelector('.before-image-wrapper');
        const handle = slider.querySelector('.slider-handle');

        if (!beforeWrapper || !handle) return;

        let isDragging = false;

        // Get slider bounds and calculate position
        function getSliderPosition(clientX) {
            const rect = slider.getBoundingClientRect();
            let x = clientX - rect.left;
            // Clamp between 0 and container width
            x = Math.max(0, Math.min(x, rect.width));
            return (x / rect.width) * 100;
        }

        // Update slider position
        function updateSlider(percentage) {
            beforeWrapper.style.width = percentage + '%';
            handle.style.left = percentage + '%';
        }

        // Mouse events
        slider.addEventListener('mousedown', (e) => {
            e.preventDefault();
            isDragging = true;
            slider.classList.add('active');
            const pct = getSliderPosition(e.clientX);
            updateSlider(pct);
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
            const pct = getSliderPosition(e.clientX);
            updateSlider(pct);
        });

        document.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                slider.classList.remove('active');
            }
        });

        // Touch events for mobile
        slider.addEventListener('touchstart', (e) => {
            isDragging = true;
            slider.classList.add('active');
            const touch = e.touches[0];
            const pct = getSliderPosition(touch.clientX);
            updateSlider(pct);
        }, { passive: true });

        slider.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            const touch = e.touches[0];
            const pct = getSliderPosition(touch.clientX);
            updateSlider(pct);
        }, { passive: true });

        slider.addEventListener('touchend', () => {
            isDragging = false;
            slider.classList.remove('active');
        });

        // Keyboard accessibility for slider handle
        const handleCircle = handle.querySelector('div');
        if (handleCircle) {
            handleCircle.setAttribute('tabindex', '0');
            handleCircle.setAttribute('role', 'slider');
            handleCircle.setAttribute('aria-label', 'Before and after comparison slider');
            handleCircle.setAttribute('aria-valuemin', '0');
            handleCircle.setAttribute('aria-valuemax', '100');
            handleCircle.setAttribute('aria-valuenow', '50');

            handleCircle.addEventListener('keydown', (e) => {
                const currentLeft = parseFloat(handle.style.left) || 50;
                let newPosition = currentLeft;
                const step = 2;

                if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
                    e.preventDefault();
                    newPosition = Math.max(0, currentLeft - step);
                } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
                    e.preventDefault();
                    newPosition = Math.min(100, currentLeft + step);
                }

                updateSlider(newPosition);
                handleCircle.setAttribute('aria-valuenow', Math.round(newPosition));
            });
        }
    });
}


/* ============================================== */
/* 10. WHATSAPP BUTTON - Floating button setup    */
/* ============================================== */

function initWhatsAppButton() {
    const whatsappBtn = document.getElementById('whatsapp-btn');
    if (!whatsappBtn) return;

    // Hide WhatsApp button when user is near the footer to avoid overlapping
    ScrollTrigger.create({
        trigger: 'footer',
        start: 'top bottom',
        end: 'bottom bottom',
        onEnter: () => {
            gsap.to(whatsappBtn, { opacity: 0, scale: 0.8, duration: 0.3, pointerEvents: 'none' });
        },
        onLeaveBack: () => {
            gsap.to(whatsappBtn, { opacity: 1, scale: 1, duration: 0.3, pointerEvents: 'auto' });
        }
    });

    // Entrance animation - button appears after 2 seconds
    gsap.set(whatsappBtn, { scale: 0, opacity: 0 });
    gsap.to(whatsappBtn, {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        delay: 2,
        ease: 'back.out(1.7)'
    });
}


/* ============================================== */
/* 11. PERFORMANCE - Resize and visibility        */
/* ============================================== */

// Refresh ScrollTrigger on window resize (debounced)
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh();
    }, 250);
}, { passive: true });

// Pause video when tab is not visible to save resources
document.addEventListener('visibilitychange', () => {
    const heroVideo = document.querySelector('#hero video');
    if (!heroVideo) return;

    if (document.hidden) {
        heroVideo.pause();
    } else {
        heroVideo.play().catch(() => {
            // Autoplay might be blocked - ignore silently
        });
    }
});

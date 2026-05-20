
// --- LUXURY NAV SCROLL EFFECT ---
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.luxury-nav');
    if (window.scrollY > 100) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
}, { passive: true });

// --- MOBILE HAMBURGER DRAWER ---
(function () {
    const toggle = document.getElementById('hamburgerToggle');
    const drawer = document.getElementById('mobileDrawer');
    const overlay = document.getElementById('drawerOverlay');
    const closeBtn = document.getElementById('drawerClose');
    const links = document.querySelectorAll('.drawer-link');

    if (!toggle || !drawer) return;

    function openDrawer() {
        drawer.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeDrawer() {
        drawer.classList.remove('open');
        document.body.style.overflow = '';
    }

    toggle.addEventListener('click', openDrawer);
    closeBtn.addEventListener('click', closeDrawer);
    overlay.addEventListener('click', closeDrawer);

    links.forEach(link => {
        link.addEventListener('click', () => {
            closeDrawer();
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && drawer.classList.contains('open')) {
            closeDrawer();
        }
    });
})();
gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

// --- MOBILE DETECTION ---
const isMobile = window.matchMedia('(max-width: 768px)').matches;


// --- CINEMATIC HERO SCROLL ANIMATION ---
const heroImg = document.querySelector('.hero-gg-img');
const heroSection = document.querySelector('.premium-hero');
const heroMainVisual = document.querySelector('.hero-main-visual');
const imageGlow = document.querySelector('.image-glow');
const heroIndicator = document.querySelector('.hero-scroll-indicator');
const heroBgLayer = document.querySelector('.hero-bg-layer');
const heroFlash = document.querySelector('.hero-radial-flash');
const heroOrbits = document.querySelectorAll('.hero-orbit');
const heroDust1 = document.querySelector('.hero-dust-1');
const heroDust2 = document.querySelector('.hero-dust-2');
const heroBurst = document.querySelector('.hero-burst');
const legacySection = document.querySelector('.legacy');

function createHeroBurstParticles() {
    if (!heroBurst) return;
    heroBurst.innerHTML = "";

    const particleCount = 42;

    for (let i = 0; i < particleCount; i++) {
        const p = document.createElement("span");
        p.className = "burst-particle";

        if (i % 7 === 0) p.classList.add("thin");
        if (i % 5 === 0) p.classList.add("soft");

        const angle = Math.random() * Math.PI * 2;
        const distance = 140 + Math.random() * 260;
        const driftX = Math.cos(angle) * distance;
        const driftY = Math.sin(angle) * distance;
        const driftRotate = -180 + Math.random() * 360;
        const driftScale = 0.4 + Math.random() * 1.8;
        const size = 4 + Math.random() * 12;
        const blur = Math.random() * 3;

        p.style.setProperty("--size", `${size}px`);
        p.style.setProperty("--blur", `${blur}px`);
        p.dataset.dx = driftX;
        p.dataset.dy = driftY;
        p.dataset.rot = driftRotate;
        p.dataset.scale = driftScale;

        heroBurst.appendChild(p);
    }

    gsap.set(".burst-particle", {
        x: 0,
        y: 0,
        rotation: 0,
        scale: 0.2,
        opacity: 0
    });
}

createHeroBurstParticles();

if (heroImg && heroSection && heroMainVisual) {
    gsap.set(heroMainVisual, { scale: 1, rotationX: 0, rotationY: 0, z: 0, opacity: 1 });
    gsap.set(heroImg, { scale: 1, yPercent: 0, opacity: 1 });
    gsap.set(imageGlow, { scale: 1, opacity: 0 });
    gsap.set(heroIndicator, { opacity: 1, y: 0 });
    gsap.set(heroBgLayer, { scale: 1, opacity: 0 });
    gsap.set(heroFlash, { opacity: 0, scale: 0.7 });
    gsap.set(heroOrbits, { scale: 0.8, opacity: 0 });
    gsap.set([heroDust1, heroDust2], { opacity: 0, y: 40 });

    const heroIntro = gsap.timeline();
    heroIntro
        .to(heroMainVisual, {
            scale: 1,
            rotationX: 0,
            rotationY: 0,
            z: 0,
            opacity: 1,
            duration: 1.8,
            ease: "expo.out"
        })
        .to(heroImg, {
            scale: 1,
            yPercent: 0,
            opacity: 1,
            duration: 1.8,
            ease: "expo.out",
            force3D: true
        }, 0)
        .to(imageGlow, {
            scale: 1,
            opacity: 1,
            duration: 1.8,
            ease: "expo.out"
        }, 0.1)
        .to(heroOrbits, {
            scale: 1,
            opacity: (i) => i === 0 ? 0.45 : 0.22,
            duration: 2,
            stagger: 0.08,
            ease: "power3.out"
        }, 0.25)
        .to([heroDust1, heroDust2], {
            opacity: 0.35,
            y: 0,
            duration: 1.6,
            stagger: 0.12,
            ease: "power2.out"
        }, 0.35);

    if (!isMobile) {
        const heroTl = gsap.timeline({
            scrollTrigger: {
                trigger: heroSection,
                start: "top top",
                end: "bottom top",
                scrub: 1.2
            }
        });

        // New cinematic logo scroll animation
        heroTl
            .to(heroImg, {
                scale: 2.5,
                opacity: 0,
                ease: "none",
                force3D: true
            }, 0)
            .to(heroIndicator, {
                opacity: 0,
                y: 30,
                ease: "none",
                force3D: true
            }, 0);
    }

    if (legacySection) {
        if (!isMobile) {
            gsap.fromTo(legacySection,
                { opacity: 0, y: 120 },
                {
                    opacity: 1,
                    y: 0,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: heroSection,
                        start: "70% top",
                        end: "bottom top",
                        scrub: 1
                    }
                }
            );
        } else {
            gsap.fromTo(legacySection,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: legacySection,
                        start: "top 95%",
                        toggleActions: "play none none none"
                    }
                }
            );
        }
    }
}
// --- PREMIUM ABOUT REVEAL ---
if (!isMobile) {
    gsap.fromTo(".legacy-title .line",
        { y: 80, opacity: 0 },
        {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".legacy",
                start: "top 95%"
            }
        });
} else {
    // On mobile: instantly show everything in the about section
    gsap.set(".legacy-title .line, .reveal-block, .reveal-divider", { y: 0, opacity: 1 });
}



// --- PROCESS TIMELINE (ROAD & CAR) ---
const timelinePath = document.getElementById('timelinePath');
if (timelinePath && !isMobile) {
    const pathLength = timelinePath.getTotalLength();
    gsap.set(".animated-line, .road-glow-path", { strokeDasharray: pathLength, strokeDashoffset: pathLength });

    // Road line draws in sync with the full section scroll
    const roadTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: ".process-timeline",
            start: "top top",
            end: "bottom bottom",
            scrub: 1
        }
    });
    roadTimeline.to(".animated-line, .road-glow-path", { strokeDashoffset: 0, ease: "none" }, 0);

    // Car setup — always visible, centered on path
    gsap.set("#timelineCar", {
        xPercent: -50,
        yPercent: -50,
        transformOrigin: "50% 50%",
        opacity: 1
    });

    // Car uses IDENTICAL ScrollTrigger as the gold road line so it always
    // sits exactly at the tip of the drawn line — perfectly in sync.
    gsap.to("#timelineCar", {
        motionPath: {
            path: "#timelinePath",
            align: "#timelinePath",
            alignOrigin: [0.5, 0.5],
            autoRotate: true
        },
        ease: "none",
        scrollTrigger: {
            trigger: ".process-timeline",
            start: "top top",
            end: "bottom bottom",
            scrub: 1
        }
    });
} else if (isMobile) {
    // On mobile: hide the SVG road/car entirely (flowchart CSS takes over)
    const roadWrapper = document.getElementById('roadWrapper');
    if (roadWrapper) roadWrapper.style.display = 'none';
    const car = document.getElementById('timelineCar');
    if (car) car.style.display = 'none';
}

// Reveal steps — desktop only
if (!isMobile) {
    gsap.utils.toArray('.process-step').forEach((step, i) => {
        gsap.fromTo(step,
            { opacity: 0, y: 100, filter: 'blur(15px)' },
            {
                opacity: 1, y: 0, filter: 'blur(0px)',
                duration: 1, ease: 'power3.out',
                scrollTrigger: {
                    trigger: step,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });
} else {
    // Instantly show all steps on mobile
    gsap.set('.process-step', { opacity: 1, y: 0, filter: 'none' });
}


// --- UPGRADED CINEMATIC EDITORIAL MICROSITE ---
const divisionData = {
    marketing: {
        title: "TOKS MARKETING",
        logo: "tmar.jpeg",
        description: `<strong>Growth Engine for Modern Brands</strong><br><br>Toks Marketing is the strategic growth division of the Toks ecosystem, built to scale brands through precision-driven marketing systems.<br><br>We integrate performance marketing, brand strategy, and content infrastructure to create predictable, compounding growth. Every initiative is designed with one objective—measurable business impact.<br><br>We don’t operate as a service provider. We function as a growth partner—engineering acquisition systems, strengthening market positioning, and optimizing revenue pipelines.<br><br><strong>Core Capabilities:</strong><br>Performance Marketing & Conversion Funnels<br>Social Media Growth Architecture<br>Brand Strategy & Market Positioning<br>Lead Generation & Acquisition Systems`,
        instagram: "<br>@toks_marketing",
        insta_url: "https://www.instagram.com/toks_marketing/",
        email: "<br>info@toksmarketing.com",
        contact: "<br>+91 81579 64629<br>+91 62352 05130<br>+91 85901 59775"
    },
    production: {
        title: "TOKS PRODUCTION",
        logo: "pro trans.png",
        description: `<strong>Content That Builds Authority</strong><br><br>Toks Production is the creative division of the Toks ecosystem, built to produce high-impact visual and digital content at scale.<br><br>We combine cinematic production, strategic storytelling, and AI-driven systems to create content that doesn’t just look good—but positions brands, builds authority, and drives engagement.<br><br>From flagship brand films to automated content pipelines, every asset is engineered for clarity, consistency, and influence.<br><br><strong>Core Capabilities:</strong><br>Cinematic Video Production & Post-Production<br>AI Avatar Content Systems (Faceless & Personal Branding)<br>Commercial & Brand Shoots<br>Content Automation & Scalable Distribution Systems`,
        instagram: "<br>@toksproduction",
        insta_url: "https://www.instagram.com/toksproduction/",
        email: "<br>info@toksproducation.com",
        contact: "<br>+91 97787 61189"
    },
    foundation: {
        title: "TOKS FOUNDATION",
        logo: "toks foundation.png",
        description: `<strong>Impact Beyond Business</strong><br><br>Toks Foundation is the social responsibility arm of the Toks ecosystem, focused on creating meaningful change through education, opportunities, and community-driven initiatives.<br><br>We aim to empower individuals by providing access to knowledge, resources, and support systems that help them build a better future.<br><br><strong>Focus Areas:</strong><br>Education Support<br>Skill Development<br>Community Outreach<br>Youth Empowerment`,
        email: "<br>info@toksfoundation.com",
        linkedin: "https://www.linkedin.com/company/toks-foundation/posts/?feedView=all"
    },
    finance: {
        title: "TOKS FINANCE",
        logo: "toks finance.png",
        description: `<strong>Smart Capital. Strategic Growth.</strong><br><br>Toks Finance provides structured financial solutions for individuals and businesses. We focus on responsible lending, financial planning, and capital access designed to support growth and stability.<br><br><strong>Core Services:</strong><br>Business & Personal Lending<br>Financial Advisory<br>Capital Structuring<br>Investment Guidance`,
        email: "<br>info@toksfinance.com"
    },
    sureslot: {
        title: "SURESLOT",
        logo: "sureslot.png",
        description: `<strong>Your Pathway to Global Education</strong><br><br>SureSlot simplifies the study abroad journey by connecting students with the right universities, programs, and opportunities worldwide. We provide end-to-end support to ensure a smooth transition from application to enrollment.<br><br><strong>Core Services:</strong><br>University Admissions<br>Visa Assistance<br>Career & Course Guidance<br>Application Processing`,
        email: "<br>info@sureslot.in",
        instagram: "<br>@sureslot",
        insta_url: "https://www.instagram.com/sure.slot/",
        contact: `<br>+91 85929 31642<br>
+91 70123 67149<br>
+91 98479 04076`,
        linkedin: "https://www.linkedin.com/company/sureslot-pvt-ltd/posts/?feedView=all"
    },
    export: {
        title: "TOKS EXPORT",
        logo: "toks export.png",
        description: `<strong>Connecting Markets Globally</strong><br><br>Toks Export is dedicated to sourcing and delivering high-quality products across international markets. We focus on building reliable trade partnerships and ensuring seamless export operations with global standards.<br><br><strong>Core Services:</strong><br>Product Sourcing<br>International Trade Management<br>Logistics Coordination<br>Supplier Network Development`,
        email: "<br>info@toksexport.com"
    },
    syino: {
        title: "Syino C. Mathew",
        logo: "synio.jpeg",
        description: `<strong>About Syino C. Mathew</strong><br><br>Syino C. Mathew is an internationally recognized AI marketing strategist, entrepreneur, TEDx speaker, and digital innovation leader from Kerala, India. With over seven years of experience in AI-powered branding, automation, digital marketing, and business growth, he has built a reputation for helping startups and businesses scale through cutting-edge AI systems and strategic marketing execution.<br><br>As the Founder & CEO of Toks Enterprise, Syino has led thousands of branding and marketing projects, combining artificial intelligence, automation, storytelling, and performance marketing to create scalable business ecosystems for entrepreneurs and companies worldwide.<br><br>Featured in international media platforms including Forbes, TEDx Magazine, and multiple global entrepreneurship publications, Syino is widely recognized for his innovative approach to AI-driven business transformation and digital branding.<br><br><strong>Global Recognition & Achievements</strong><br>• World Record Holder for serving 9,992+ clients between 2023–2024 through branding, AI marketing, and startup support initiatives.<br>• Achieved a National Talent Record for designing and delivering 353+ startup logos exclusively for emerging businesses using AI-assisted systems.<br>• Officially recognized by the Kerala Book of Records for creating the Largest YouTube Icon Using Plastic Bottles, promoting environmental sustainability through creative innovation.<br>• Received official appreciation from the Royal Court of Belgium for entrepreneurial excellence and international contributions to innovation.<br>• Honored with the title of AI Marketing Grandmaster by the International Artificial Intelligence Federation (IAIF), USA.<br>• Became the first South Asian member of the Global AI Sovereign Circle (GASC).<br>• Awarded recognition at the Australian Innovation Awards 2026 for contributions to AI-powered business solutions and digital transformation.<br><br><strong>Leadership & Vision</strong><br><br>Syino is known for building futuristic AI-focused initiatives designed to make advanced marketing systems accessible to startups and businesses.<br><br><strong>Project Starseed</strong><br>An AI-powered branding ecosystem focused on making professional marketing affordable, scalable, and accessible for startups, entrepreneurs, and growing businesses.<br><br><strong>Project Nova Imprium</strong><br>Recognized as Kerala’s first AI-driven commercial advertising model integrating automation, AI storytelling, content generation, and modern advertising frameworks.<br><br><strong>Conquer Content</strong><br>An AI video production and content automation initiative helping entrepreneurs, coaches, and brands scale visibility through AI-generated content systems without relying heavily on traditional production models.<br><br><strong>AI Advocacy & Education</strong><br>Beyond entrepreneurship, Syino actively advocates for AI education, ethical AI adoption, and digital transformation. Through workshops, speaking engagements, and awareness initiatives, he promotes the responsible integration of artificial intelligence into business, education, and creative industries.<br><br><strong>His work focuses on:</strong><br>• AI-powered branding<br>• Automation systems<br>• Business scaling<br>• Performance marketing<br>• AI content creation<br>• Startup ecosystem development<br>• Sustainable innovation<br><br>By combining technology, creativity, and entrepreneurship, Syino C. Mathew continues to position himself as one of the emerging AI-driven business innovators from South Asia.`,
        instagram: "<br>@syinocmathew",
        insta_url: "https://www.instagram.com/syinocmathew/",
        linkedin: "https://www.linkedin.com/in/syino-c-mathew-264a281ba/",
        email: "<br>info@toksenterprise.com"
    }
};

const cinematicOverlay = document.getElementById('cinematicOverlay');
const closeMicrositeBtn = document.getElementById('closeMicrosite');
const micrositeTriggers = document.querySelectorAll('[data-modal]');

function openMicrosite(divisionKey) {
    const data = divisionData[divisionKey];
    if (!data) return;

    // Set Data
    const contentWrap = document.querySelector('.division-detail-content');
    const logoImg = document.getElementById('detailLogo');
    logoImg.src = data.logo;
    if (divisionKey === 'syino') {
        logoImg.style.maxHeight = '280px';
        logoImg.style.borderRadius = '24px';
        logoImg.style.objectFit = 'cover';
        contentWrap.classList.add('person-layout');
    } else {
        logoImg.style.maxHeight = '';
        logoImg.style.borderRadius = '';
        logoImg.style.objectFit = '';
        contentWrap.classList.remove('person-layout');
    }
    document.getElementById('detailTitle').textContent = data.title;
    document.getElementById('detailDescription').innerHTML = data.description;

    // Update Sidebar Cards
    const ig = document.getElementById('detailInstagram');
    if (data.instagram) {
        ig.style.display = 'flex';
        ig.querySelector('.meta-value').innerHTML = data.instagram;
        ig.href = data.insta_url || `https://instagram.com/${data.instagram.replace('@', '')}`;
    } else {
        ig.style.display = 'none';
    }

    const li = document.getElementById('detailLinkedin');
    if (data.linkedin) {
        li.style.display = 'flex';
        li.href = data.linkedin;
    } else {
        li.style.display = 'none';
    }

    const email = document.getElementById('detailEmail');
    email.querySelector('.meta-value').innerHTML = data.email;
    email.href = `mailto:${data.email}`;

    // Update Contact Card
    const contactCard = document.getElementById('detailContact');
    if (data.contact) {
        contactCard.style.display = 'flex';
        contactCard.querySelector('.meta-value').innerHTML = data.contact;
    } else {
        contactCard.style.display = 'none';
    }

    // Reset Elements for Animation
    gsap.set(cinematicOverlay, { opacity: 0, visibility: 'visible', backdropFilter: 'blur(0px)' });
    gsap.set('.shutter-left', { xPercent: 0 });
    gsap.set('.shutter-right', { xPercent: 0 });
    gsap.set('#divisionShell', { y: 120, opacity: 0, scale: 0.98 });
    gsap.set('.light-sweep', { opacity: 0, xPercent: -150 });
    gsap.set('.animate-list', { y: 40, opacity: 0 });
    gsap.set('.overlay-header', { opacity: 0, y: -20 });

    document.body.style.overflow = 'hidden';
    cinematicOverlay.classList.add('active');

    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

    // Sequence Starts
    tl.to(cinematicOverlay, { opacity: 1, backdropFilter: 'blur(15px)', duration: 1.2 })
        .to('.shutter-left', { xPercent: -100, duration: 1.4, ease: "expo.inOut" }, "-=0.8")
        .to('.shutter-right', { xPercent: 100, duration: 1.4, ease: "expo.inOut" }, "<")
        .to('#divisionShell', { y: 0, opacity: 1, scale: 1, duration: 1.4 }, "-=1.2")
        .to('.overlay-header', { opacity: 1, y: 0, duration: 1 }, "-=2")
        .to('.light-sweep', { opacity: 1, xPercent: 350, duration: 2.2, ease: "power3.inOut" }, "-=2.5")
        .to('.animate-list', {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 1.2,
            ease: "power4.out"
        }, "-=1.8");
}

function closeMicrosite() {
    const tl = gsap.timeline({
        onComplete: () => {
            cinematicOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
            gsap.set(cinematicOverlay, { visibility: 'hidden' });
        }
    });

    tl.to('#divisionShell', { y: 50, opacity: 0, duration: 0.6, ease: "power3.in" })
        .to('.shutter-left, .shutter-right', { xPercent: 0, duration: 0.8, ease: "expo.inOut" }, "-=0.3")
        .to(cinematicOverlay, { opacity: 0, backdropFilter: 'blur(0px)', duration: 0.6 }, "-=0.4");
}

micrositeTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
        const divisionKey = trigger.getAttribute('data-modal');
        openMicrosite(divisionKey);
    });
});

closeMicrositeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    closeMicrosite();
});

// Close on click outside
cinematicOverlay.addEventListener('click', (e) => {
    if (e.target === cinematicOverlay || e.target.classList.contains('microsite-content')) {
        closeMicrosite();
    }
});

// Close on Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && cinematicOverlay.classList.contains('active')) {
        closeMicrosite();
    }
});

// --- RECOGNITION CARDS ANIMATION ---
gsap.fromTo(".gs-reveal-card", 
    {
        y: 80,
        opacity: 0,
        scale: 0.95
    },
    {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.2,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
            trigger: ".recognition-dossier",
            start: "top 70%",
        }
    }
);
gsap.to(".rec-card", {
    y: -10,
    duration: 2,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    stagger: {
        each: 0.2,
        from: "random"
    }
});

// --- GENERIC REVEAL SYSTEM ---
if (!isMobile) {
    gsap.utils.toArray('.gs-reveal').forEach(el => {
        gsap.fromTo(el, 
            { y: 40, opacity: 0 },
            {
                scrollTrigger: {
                    trigger: el,
                    start: "top 88%",
                    toggleActions: "play none none reverse"
                },
                y: 0,
                opacity: 1,
                duration: 1,
                ease: "power3.out"
            }
        );
    });
} else {
    gsap.set('.gs-reveal', { y: 0, opacity: 1 });
}

// --- DIVISIONS REVEAL ---
if (!isMobile) {
    gsap.utils.toArray('.division-row').forEach((row, i) => {
        gsap.fromTo(row, 
            { y: 60, opacity: 0 },
            {
                scrollTrigger: {
                    trigger: row,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                },
                y: 0,
                opacity: 1,
                duration: 1.2,
                ease: "power3.out"
            }
        );
    });
} else {
    gsap.set('.division-row', { y: 0, opacity: 1 });
}


// --- REVIEWS CAROUSEL ---
(function () {
    const track = document.getElementById('reviewsTrack');
    const dotsContainer = document.getElementById('revDots');
    const prevBtn = document.getElementById('revPrev');
    const nextBtn = document.getElementById('revNext');
    if (!track) return;

    const cards = track.querySelectorAll('.review-card');
    let perView = window.innerWidth <= 600 ? 1 : window.innerWidth <= 900 ? 2 : 3;
    let current = 0;
    const total = Math.ceil(cards.length / perView);

    for (let i = 0; i < total; i++) {
        const d = document.createElement('button');
        d.className = 'rev-dot' + (i === 0 ? ' active' : '');
        d.setAttribute('aria-label', 'Go to page ' + (i + 1));
        d.addEventListener('click', () => goTo(i));
        dotsContainer.appendChild(d);
    }

    function goTo(idx) {
        current = Math.max(0, Math.min(idx, total - 1));
        const cardWidth = cards[0].offsetWidth + 24;
        track.style.transform = 'translateX(-' + (current * perView * cardWidth) + 'px)';
        dotsContainer.querySelectorAll('.rev-dot').forEach(function (d, i) {
            d.classList.toggle('active', i === current);
        });
    }

    prevBtn && prevBtn.addEventListener('click', () => goTo(current - 1));
    nextBtn && nextBtn.addEventListener('click', () => goTo(current + 1));

    window.addEventListener('resize', function () {
        perView = window.innerWidth <= 600 ? 1 : window.innerWidth <= 900 ? 2 : 3;
        goTo(0);
    });
})();

// --- STAR PICKER ---
(function () {
    const select = document.getElementById('starSelect');
    if (!select) return;
    let selected = 0;
    const stars = select.querySelectorAll('span');

    stars.forEach(function (star, i) {
        star.addEventListener('mouseenter', function () {
            stars.forEach(function (s, j) { s.classList.toggle('hovered', j <= i); });
        });
        star.addEventListener('mouseleave', function () {
            stars.forEach(function (s) { s.classList.remove('hovered'); });
        });
        star.addEventListener('click', function () {
            selected = i + 1;
            stars.forEach(function (s, j) { s.classList.toggle('active', j < selected); });
        });
    });
})();

// --- REVIEW FORM SUBMIT ---
function submitReview(e) {
    e.preventDefault();
    var success = document.getElementById('reviewSuccess');
    if (success) {
        success.classList.add('visible');
        e.target.reset();
        document.querySelectorAll('#starSelect span').forEach(function (s) {
            s.classList.remove('active', 'hovered');
        });
        setTimeout(function () { success.classList.remove('visible'); }, 5000);
    }
}

// --- COLLABORATORS ANIMATION (Cinematic & Parallax) ---
const collabSection = document.getElementById('collaborators');
if (collabSection) {
    const collabItems = collabSection.querySelectorAll('.logo-item');

    if (!isMobile) {
        // Set initial state explicitly
        gsap.set(collabItems, { opacity: 0, y: 50 });

        // Scroll-triggered Stagger Reveal
        gsap.to(collabItems, {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: collabSection,
                start: "top 80%",
            }
        });

        // Parallax Mouse Depth (GPU-Accelerated)
        collabSection.addEventListener('mousemove', (e) => {
            const rect = collabSection.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            collabItems.forEach((item) => {
                const rotateX = -y * 0.04;
                const rotateY = x * 0.04;

                gsap.to(item, {
                    rotationX: rotateX,
                    rotationY: rotateY,
                    duration: 0.5,
                    ease: "power2.out",
                    transformPerspective: 1000,
                    overwrite: "auto"
                });
            });
        });

        collabSection.addEventListener('mouseleave', () => {
            gsap.to(collabItems, {
                rotationX: 0,
                rotationY: 0,
                duration: 0.8,
                ease: "power2.out",
                overwrite: "auto"
            });
        });
    } else {
        // On mobile: instantly visible, no parallax
        gsap.set(collabItems, { opacity: 1, y: 0 });
    }

    // Ambient Particle Effects
    const bgContainer = collabSection.querySelector('.clientele-bg');
    if (bgContainer) {
        for (let i = 0; i < 25; i++) {
            let particle = document.createElement('div');
            particle.classList.add('collaborator-particle');
            let size = Math.random() * 5 + 2;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            bgContainer.appendChild(particle);

            gsap.to(particle, {
                y: "-=150",
                x: (Math.random() > 0.5 ? "+=" : "-=") + (Math.random() * 50),
                opacity: 0,
                duration: Math.random() * 6 + 4,
                repeat: -1,
                ease: "none",
                delay: Math.random() * 5
            });
        }
    }
}

// --- AUTO-SCROLL COLLABORATORS ON MOBILE ---
if (isMobile) {
    const collabGrid = document.querySelector('.collaborators-grid');
    if (collabGrid) {
        const logos = Array.from(collabGrid.children);
        logos.forEach(logo => {
            const clone = logo.cloneNode(true);
            collabGrid.appendChild(clone);
        });
        collabGrid.classList.add('marquee-active');
    }
}

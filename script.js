gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

// Reveal main content
gsap.set("#main-content", { autoAlpha: 1 });

// --- PREMIUM ABOUT REVEAL ---
function splitAboutHeader() {
    const title = document.querySelector(".legacy-title");
    if (!title) return;
    const text = title.innerText;
    title.innerHTML = text.split("").map(char =>
        char === " " ? "<span>&nbsp;</span>" : `<span class="char-span">${char}</span>`
    ).join("");
}
splitAboutHeader();

gsap.fromTo(".char-span",
    { y: 50, opacity: 0, filter: "blur(10px)" },
    {
        y: 0, opacity: 1, filter: "blur(0px)",
        duration: 0.8, stagger: 0.02, ease: "power3.out",
        scrollTrigger: { trigger: ".legacy", start: "top 80%" }
    }
);

// --- PROCESS TIMELINE (ROAD & CAR) ---
const timelinePath = document.getElementById('timelinePath');
if (timelinePath) {
    const pathLength = timelinePath.getTotalLength();
    gsap.set(".animated-line, .road-glow-path", { strokeDasharray: pathLength, strokeDashoffset: pathLength });

    const timeline = gsap.timeline({
        scrollTrigger: {
            trigger: ".process-timeline",
            start: "top top",
            end: "bottom bottom",
            scrub: 1
        }
    });

    timeline.to(".animated-line, .road-glow-path", { strokeDashoffset: 0, ease: "none" }, 0);
    gsap.set("#timelineCar", {
        xPercent: -50,
        yPercent: -50,
        transformOrigin: "50% 50%"
    });

    timeline.to("#timelineCar", {
        motionPath: {
            path: "#timelinePath",
            align: "#timelinePath",
            alignOrigin: [0.5, 0.5],
            autoRotate: true
        },
        ease: "none"
    }, 0);
    // Removed ROAD PARALLAX to prevent gap at the bottom of the section.
}

// Reveal steps relative to the timeline path
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

// --- UPGRADED CINEMATIC EDITORIAL MICROSITE ---
const divisionData = {
    marketing: {
        title: "TOKS MARKETING",
        logo: "toks marketing.png",
        description: `<strong>Growth Engine for Modern Brands</strong><br><br>Toks Marketing is a results-driven marketing division focused on helping brands scale through strategic digital presence, performance marketing, and content systems. We specialize in building strong brand identities, generating high-quality leads, and creating scalable marketing frameworks.<br><br><strong>Core Services:</strong><br>Performance Marketing (Ads & Funnels)<br>Social Media Growth<br>Brand Strategy & Positioning<br>Lead Generation Systems`,
        instagram: "@toks_marketing",
        insta_url: "https://www.instagram.com/toks_marketing/",
        email: "info@toksmarketing.com"
    },
    production: {
        title: "TOKS PRODUCTION",
        logo: "Toks production.png",
        description: `<strong>Content That Builds Authority</strong><br><br>Toks Production is our creative powerhouse, delivering high-quality visual and digital content for businesses and personal brands. From cinematic videos to AI-powered content systems, we help clients communicate with clarity and impact.<br><br><strong>Core Services:</strong><br>Video Production & Editing<br>AI Avatar Content (Faceless/Personal Branding)<br>Commercial Shoots<br>Content Automation Systems`,
        instagram: "@toksproduction",
        insta_url: "https://www.instagram.com/toksproduction/",
        email: "info@toksproducation.com"
    },
    foundation: {
        title: "TOKS FOUNDATION",
        logo: "toks foundation.png",
        description: `<strong>Impact Beyond Business</strong><br><br>Toks Foundation is the social responsibility arm of the Toks ecosystem, focused on creating meaningful change through education, opportunities, and community-driven initiatives.<br><br>We aim to empower individuals by providing access to knowledge, resources, and support systems that help them build a better future.<br><br><strong>Focus Areas:</strong><br>Education Support<br>Skill Development<br>Community Outreach<br>Youth Empowerment`,
        email: "info@toksfoundation.com"
    },
    finance: {
        title: "TOKS FINANCE",
        logo: "toks finance.png",
        description: `<strong>Smart Capital. Strategic Growth.</strong><br><br>Toks Finance provides structured financial solutions for individuals and businesses. We focus on responsible lending, financial planning, and capital access designed to support growth and stability.<br><br><strong>Core Services:</strong><br>Business & Personal Lending<br>Financial Advisory<br>Capital Structuring<br>Investment Guidance`,
        email: "info@toksfinance.com"
    },
    sureslot: {
        title: "SURESLOT",
        logo: "sureslot.png",
        description: `<strong>Your Pathway to Global Education</strong><br><br>SureSlot simplifies the study abroad journey by connecting students with the right universities, programs, and opportunities worldwide. We provide end-to-end support to ensure a smooth transition from application to enrollment.<br><br><strong>Core Services:</strong><br>University Admissions<br>Visa Assistance<br>Career & Course Guidance<br>Application Processing`,
        email: "info@sureslot.in"
    },
    export: {
        title: "TOKS EXPORT",
        logo: "toks export .png",
        description: `<strong>Connecting Markets Globally</strong><br><br>Toks Export is dedicated to sourcing and delivering high-quality products across international markets. We focus on building reliable trade partnerships and ensuring seamless export operations with global standards.<br><br><strong>Core Services:</strong><br>Product Sourcing<br>International Trade Management<br>Logistics Coordination<br>Supplier Network Development`,
        email: "info@toksexport.com"
    }
};

const cinematicOverlay = document.getElementById('cinematicOverlay');
const closeMicrositeBtn = document.getElementById('closeMicrosite');
const micrositeTriggers = document.querySelectorAll('[data-modal]');

function openMicrosite(divisionKey) {
    const data = divisionData[divisionKey];
    if (!data) return;

    // Set Data
    document.getElementById('detailLogo').src = data.logo;
    document.getElementById('detailTitle').textContent = data.title;
    document.getElementById('detailDescription').innerHTML = data.description;

    // Update Sidebar Cards
    const ig = document.getElementById('detailInstagram');
    if (data.instagram) {
        ig.style.display = 'block';
        ig.querySelector('.meta-value').textContent = data.instagram;
        ig.href = data.insta_url || `https://instagram.com/${data.instagram.replace('@', '')}`;
    } else {
        ig.style.display = 'none';
    }

    const email = document.getElementById('detailEmail');
    email.querySelector('.meta-value').textContent = data.email;
    email.href = `mailto:${data.email}`;

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
gsap.from(".gs-reveal-card", {
    y: 80,
    opacity: 0,
    scale: 0.95,
    duration: 1.2,
    stagger: 0.12,
    ease: "power3.out",
    scrollTrigger: {
        trigger: ".recognition-dossier",
        start: "top 70%",
    }
});
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

// --- CLIENTELE MOSAIC ANIMATION ---
const clientPills = gsap.utils.toArray('.gs-client-pill');
if (clientPills.length > 0) {
    gsap.set(clientPills, { opacity: 0, y: 30, scale: 0.92 });
    ScrollTrigger.create({
        trigger: ".client-mosaic",
        start: "top 85%",
        once: true,
        onEnter: () => {
            gsap.to(clientPills, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.6,
                stagger: 0.04,
                ease: "power2.out"
            });
        }
    });
}

// --- REVIEWS CAROUSEL ---
(function() {
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
        dotsContainer.querySelectorAll('.rev-dot').forEach(function(d, i) {
            d.classList.toggle('active', i === current);
        });
    }

    prevBtn && prevBtn.addEventListener('click', () => goTo(current - 1));
    nextBtn && nextBtn.addEventListener('click', () => goTo(current + 1));

    window.addEventListener('resize', function() {
        perView = window.innerWidth <= 600 ? 1 : window.innerWidth <= 900 ? 2 : 3;
        goTo(0);
    });
})();

// --- STAR PICKER ---
(function() {
    const select = document.getElementById('starSelect');
    if (!select) return;
    let selected = 0;
    const stars = select.querySelectorAll('span');

    stars.forEach(function(star, i) {
        star.addEventListener('mouseenter', function() {
            stars.forEach(function(s, j) { s.classList.toggle('hovered', j <= i); });
        });
        star.addEventListener('mouseleave', function() {
            stars.forEach(function(s) { s.classList.remove('hovered'); });
        });
        star.addEventListener('click', function() {
            selected = i + 1;
            stars.forEach(function(s, j) { s.classList.toggle('active', j < selected); });
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
        document.querySelectorAll('#starSelect span').forEach(function(s) {
            s.classList.remove('active', 'hovered');
        });
        setTimeout(function() { success.classList.remove('visible'); }, 5000);
    }
}

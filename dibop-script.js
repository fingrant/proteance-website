// ==============================================
// DIBOP PAGE INTERACTIVE FEATURES
// ==============================================

// 1. STICKY NAVIGATION
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
});

// 2. MOBILE NAVIGATION
const mobileToggle = document.getElementById('mobileToggle');
const navLinks     = document.getElementById('navLinks');

mobileToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    const icon   = mobileToggle.querySelector('i');
    icon.className = isOpen ? 'fa fa-xmark' : 'fa fa-bars';
    mobileToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    mobileToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
});

navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        mobileToggle.querySelector('i').className = 'fa fa-bars';
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileToggle.setAttribute('aria-label', 'Open navigation menu');
    });
});

// 3. SCROLL REVEAL
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

// 4. SMOOTH ANCHOR SCROLL
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (!href || href === '#') return;
        const target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        const navHeight = nav.offsetHeight;
        const targetPos = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;
        window.scrollTo({ top: targetPos, behavior: 'smooth' });
    });
});

// 5. INTEGRATION DIAGRAM — CHAOS ↔ ORDER ANIMATION
const diagram        = document.getElementById('integrationDiagram');
const tabChaos       = document.getElementById('tabChaos');
const tabOrder       = document.getElementById('tabOrder');
const caption        = document.getElementById('diagramCaption');

const CAPTION_CHAOS = '15 point-to-point connections — every change can break something';
const CAPTION_ORDER = 'DIBOP connects each system once — data flows automatically';

let diagramState = 'chaos';
let cycleTimer   = null;

function setDiagramState(state) {
    diagramState = state;

    if (state === 'order') {
        diagram.classList.add('order-active');
        tabChaos.classList.remove('active');
        tabOrder.classList.add('active');
        caption.textContent = CAPTION_ORDER;
    } else {
        diagram.classList.remove('order-active');
        tabOrder.classList.remove('active');
        tabChaos.classList.add('active');
        caption.textContent = CAPTION_CHAOS;
    }
}

function startCycle() {
    // Chaos for 3.5s → order for 5s → repeat
    cycleTimer = setTimeout(() => {
        setDiagramState('order');
        cycleTimer = setTimeout(() => {
            setDiagramState('chaos');
            startCycle();
        }, 5000);
    }, 3500);
}

// Allow manual tab clicks (pauses auto-cycle for 10s then resumes)
function onTabClick(state) {
    clearTimeout(cycleTimer);
    setDiagramState(state);
    // Resume auto-cycle after 10s
    cycleTimer = setTimeout(() => {
        startCycle();
    }, 10000);
}

tabChaos.addEventListener('click', () => onTabClick('chaos'));
tabOrder.addEventListener('click', () => onTabClick('order'));

// Start the cycle when diagram enters viewport
const diagramObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        startCycle();
        diagramObserver.disconnect();
    }
}, { threshold: 0.3 });

diagramObserver.observe(diagram);

// ==============================================
// OMDA PAGE INTERACTIVE FEATURES
// ==============================================

// 1. STICKY NAVIGATION
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
});

// 2. MOBILE NAVIGATION
const mobileToggle = document.getElementById('mobileToggle');
const navLinks = document.getElementById('navLinks');

const setMobileNavState = (isOpen) => {
    mobileToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    mobileToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
};

mobileToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    const icon = mobileToggle.querySelector('i');
    icon.classList.toggle('fa-bars', !isOpen);
    icon.classList.toggle('fa-xmark', isOpen);
    setMobileNavState(isOpen);
});

// Close mobile nav when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        const icon = mobileToggle.querySelector('i');
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-xmark');
        setMobileNavState(false);
    });
});

setMobileNavState(false);

// 3. PERSONA TABS WITH KEYBOARD NAVIGATION
const tabs = Array.from(document.querySelectorAll('.persona-tab'));
const contents = Array.from(document.querySelectorAll('.persona-content'));

const activatePersona = (persona) => {
    tabs.forEach(t => {
        const isActive = t.dataset.persona === persona;
        t.classList.toggle('active', isActive);
        t.setAttribute('aria-selected', isActive ? 'true' : 'false');
        t.tabIndex = isActive ? 0 : -1;
    });
    contents.forEach(panel => {
        const isActive = panel.dataset.persona === persona;
        panel.classList.toggle('active', isActive);
        panel.hidden = !isActive;
    });
};

tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
        activatePersona(tab.dataset.persona);
        tab.focus();
    });
    
    tab.addEventListener('keydown', (e) => {
        let targetTab;
        const isRTL = document.documentElement.getAttribute('dir') === 'rtl';
        
        if ((e.key === 'ArrowRight' && !isRTL) || (e.key === 'ArrowLeft' && isRTL)) {
            targetTab = tabs[index + 1] || tabs[0];
        } else if ((e.key === 'ArrowLeft' && !isRTL) || (e.key === 'ArrowRight' && isRTL)) {
            targetTab = tabs[index - 1] || tabs[tabs.length - 1];
        } else if (e.key === 'Home') {
            targetTab = tabs[0];
        } else if (e.key === 'End') {
            targetTab = tabs[tabs.length - 1];
        } else if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            activatePersona(tab.dataset.persona);
            return;
        } else {
            return;
        }
        
        e.preventDefault();
        activatePersona(targetTab.dataset.persona);
        targetTab.focus();
    });
});

// 4. SCROLL REVEAL ANIMATIONS
const revealElements = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

revealElements.forEach(el => observer.observe(el));

// 5. SMOOTH ANCHOR SCROLL
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (!href || href === '#') return;
        
        const target = document.querySelector(href);
        if (!target) return;
        
        e.preventDefault();
        const navHeight = nav.offsetHeight;
        const targetPos = target.getBoundingClientRect().top + window.scrollY - navHeight;
        
        window.scrollTo({ top: targetPos, behavior: 'smooth' });
    });
});

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const sidebar = document.querySelector('.left-sidebar');
const navLinks = document.querySelectorAll('.nav-link');
const sidebarLinks = document.querySelectorAll('.sidebar-link');

// Hamburger menu toggle
if (hamburger) {
    hamburger.addEventListener('click', () => {
        sidebar.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Close sidebar when clicking outside on mobile
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 1024) {
        if (!sidebar.contains(e.target) && !hamburger.contains(e.target)) {
            sidebar.classList.remove('active');
            hamburger.classList.remove('active');
        }
    }
});

// Active link highlighting
function setActiveLink(links, target) {
    links.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === target) {
            link.classList.add('active');
        }
    });
}

// Navigation link clicks
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = link.getAttribute('href');
        setActiveLink(navLinks, target);
        setActiveLink(sidebarLinks, target);
        
        // Smooth scroll to section
        if (target.startsWith('#')) {
            const section = document.querySelector(target);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    });
});

// Sidebar link clicks
sidebarLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = link.getAttribute('href');
        setActiveLink(navLinks, target);
        setActiveLink(sidebarLinks, target);
        
        // Smooth scroll to section
        if (target.startsWith('#')) {
            const section = document.querySelector(target);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
        
        // Close sidebar on mobile after click
        if (window.innerWidth <= 1024) {
            sidebar.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observe all content sections
document.querySelectorAll('.content-section, .cta-section').forEach(section => {
    observer.observe(section);
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.top-navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// Button click handlers
document.querySelectorAll('.btn-primary, .btn-secondary, .btn-outline').forEach(btn => {
    btn.addEventListener('click', function(e) {
        // Add ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Headline rotation (optional feature)
const headlines = [
    "Your Life Has More Options Than Just Doctor & Engineer",
    "Marks Decide Exams, Not Your Destiny",
    "Not Everyone Is Meant to Be a Doctor or Engineer — And That's Okay",
    "One Life. Hundreds of Career Paths. Choose Wisely."
];

const subheadings = [
    "Explore real career options beyond society pressure",
    "Discover paths that match your skills, interests, and dreams",
    "Make informed decisions — not forced ones"
];

let headlineIndex = 0;
let subheadingIndex = 0;
const headlineElement = document.getElementById('headline');
const subheadingElement = document.querySelector('.hero-subheading');

// Optional: Rotate headlines every 5 seconds
if (headlineElement && subheadingElement) {
    setInterval(() => {
        headlineElement.style.opacity = '0';
        subheadingElement.style.opacity = '0';
        
        setTimeout(() => {
            headlineIndex = (headlineIndex + 1) % headlines.length;
            subheadingIndex = (subheadingIndex + 1) % subheadings.length;
            headlineElement.textContent = headlines[headlineIndex];
            subheadingElement.textContent = subheadings[subheadingIndex];
            headlineElement.style.opacity = '1';
            subheadingElement.style.opacity = '1';
        }, 500);
    }, 5000);
}

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector('.hero-section');
    if (heroSection && scrolled < heroSection.offsetHeight) {
        const bgLogo = document.querySelector('.bg-logo');
        if (bgLogo) {
            bgLogo.style.transform = `translateY(${scrolled * 0.5}px)`;
            bgLogo.style.opacity = 0.15 - (scrolled / heroSection.offsetHeight) * 0.1;
        }
    }
});

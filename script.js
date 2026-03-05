/**
 * Portfolio Website JavaScript
 * Simran Jaiswal - Personal Portfolio
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functions
    initNavbar();
    initMobileMenu();
    initScrollReveal();
    initCounterAnimation();
    initSmoothScroll();
    initBackToTop();
    initFormValidation();
    initTypewriter();
});

/**
 * Navbar scroll effect
 */
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        // Add scrolled class for styling
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Update active nav link
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

/**
 * Mobile menu toggle
 */
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-links a');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

/**
 * Scroll reveal animations
 */
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

    const revealOnScroll = () => {
        reveals.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    };

    // Initial check
    revealOnScroll();

    // Add scroll listener with throttle
    let isScrolling;
    window.addEventListener('scroll', () => {
        window.clearTimeout(isScrolling);
        isScrolling = setTimeout(revealOnScroll, 10);
    });
}

/**
 * Counter animation for stats
 */
function initCounterAnimation() {
    const statNumbers = document.querySelectorAll('.stat-number');
    let animated = false;

    const animateCounters = () => {
        const statsSection = document.querySelector('.stats-grid');
        const statsSectionTop = statsSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (statsSectionTop < windowHeight - 100 && !animated) {
            animated = true;

            statNumbers.forEach(stat => {
                const target = parseFloat(stat.getAttribute('data-target'));
                const isDecimal = target % 1 !== 0;
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;

                const updateCounter = () => {
                    current += step;
                    if (current < target) {
                        stat.textContent = isDecimal ? current.toFixed(1) : Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        stat.textContent = isDecimal ? target.toFixed(1) : target;
                    }
                };

                // Add delay for staggered animation
                setTimeout(updateCounter, 300);
            });
        }
    };

    window.addEventListener('scroll', animateCounters);
    animateCounters();
}

/**
 * Smooth scroll for navigation
 */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Back to top button
 */
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Form validation
 */
function initFormValidation() {
    const form = document.getElementById('contactForm');
    const submitBtn = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        // Basic validation
        if (!name || !email || !message) {
            showFormMessage('Please fill in all fields', 'error');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showFormMessage('Please enter a valid email', 'error');
            return;
        }

        // Simulate form submission
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        setTimeout(() => {
            showFormMessage('Message sent successfully! I\'ll get back to you soon.', 'success');
            form.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });

    function showFormMessage(message, type) {
        // Remove existing message
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Create message element
        const messageEl = document.createElement('div');
        messageEl.className = `form-message form-message-${type}`;
        messageEl.innerHTML = `<i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i> ${message}`;
        
        // Insert message
        form.insertBefore(messageEl, form.firstChild);

        // Auto remove after 5 seconds
        setTimeout(() => {
            messageEl.remove();
        }, 5000);
    }
}

/**
 * Typewriter effect for hero section (optional enhancement)
 */
function initTypewriter() {
    const subtitle = document.querySelector('.hero-subtitle');
    if (!subtitle) return;

    const text = subtitle.textContent;
    subtitle.textContent = '';
    let index = 0;

    const typeWriter = () => {
        if (index < text.length) {
            subtitle.textContent += text.charAt(index);
            index++;
            setTimeout(typeWriter, 50);
        }
    };

    // Start typing after a delay
    setTimeout(typeWriter, 1000);
}

/**
 * Additional hover effects for cards
 */
document.querySelectorAll('.stat-card, .skill-category, .project-card, .internship-card, .education-card, .certification-item, .contact-card').forEach(card => {
    card.addEventListener('mouseenter', function(e) {
        // Add subtle parallax effect
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        this.style.setProperty('--mouse-x', `${x}px`);
        this.style.setProperty('--mouse-y', `${y}px`);
    });
});

// Add parallax effect to skill categories
document.querySelectorAll('.skill-category').forEach(category => {
    category.addEventListener('mousemove', (e) => {
        const rect = category.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        
        category.style.transform = `perspective(1000px) rotateY(${x * 5}deg) rotateX(${y * -5}deg) translateY(-5px)`;
    });

    category.addEventListener('mouseleave', () => {
        category.style.transform = '';
    });
});

// Add ripple effect to buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            pointer-events: none;
            width: 100px;
            height: 100px;
            left: ${x - 50}px;
            top: ${y - 50}px;
            transform: scale(0);
            animation: ripple 0.6s linear;
        `;

        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple keyframes dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Add floating animation to shapes in hero
const shapes = document.querySelectorAll('.shape');
shapes.forEach((shape, index) => {
    shape.style.animationDelay = `${index * -5}s`;
});

// Add tilt effect to project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        
        card.style.transform = `perspective(1000px) rotateY(${x * 10}deg) rotateX(${y * -10}deg) translateY(-10px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// Add progress bar animation for ongoing internship
const progressFill = document.querySelector('.progress-fill');
if (progressFill) {
    let width = 0;
    const targetWidth = 60;
    
    const animateProgress = () => {
        if (width < targetWidth) {
            width += 1;
            progressFill.style.width = `${width}%`;
            requestAnimationFrame(animateProgress);
        }
    };

    // Start animation when section is visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(animateProgress, 500);
            }
        });
    }, { threshold: 0.5 });

    const internshipSection = document.getElementById('internships');
    if (internshipSection) {
        observer.observe(internshipSection);
    }
}

// Console message for developer
console.log('%c Portfolio by Simran Jaiswal ', 'background: #0ea5e9; color: white; padding: 10px 20px; border-radius: 5px; font-size: 14px;');
console.log('%c Feel free to customize this portfolio! ', 'background: #14b8a6; color: white; padding: 10px 20px; border-radius: 5px; font-size: 14px;');


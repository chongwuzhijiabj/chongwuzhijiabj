// ===== MAIN JAVASCRIPT =====

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initScrollEffects();
    initBackToTop();
    initCounterAnimation();
    initFormHandling();
    initMobileMenu();
});

// ===== NAVIGATION =====
function initNavigation() {
    const header = document.querySelector('.header');
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// ===== MOBILE MENU =====
function initMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navOverlay = document.querySelector('.nav-overlay');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            if (navOverlay) {
                navOverlay.classList.toggle('active');
            }
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
        
        if (navOverlay) {
            navOverlay.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                navOverlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        }
        
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                if (navOverlay) {
                    navOverlay.classList.remove('active');
                }
                document.body.style.overflow = '';
            });
        });
    }
}

// ===== SCROLL EFFECTS =====
function initScrollEffects() {
    const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    reveals.forEach(reveal => revealObserver.observe(reveal));
    
    // Stagger animations
    const staggerContainers = document.querySelectorAll('.stagger-container');
    staggerContainers.forEach(container => {
        const items = container.querySelectorAll('.stagger-item');
        items.forEach((item, index) => {
            item.style.animationDelay = `${0.1 + index * 0.1}s`;
            item.classList.add('active');
        });
    });
}

// ===== BACK TO TOP =====
function initBackToTop() {
    const backToTop = document.querySelector('.back-to-top');
    
    if (backToTop) {
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
}

// ===== COUNTER ANIMATION =====
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target')) || parseInt(counter.textContent);
                const suffix = counter.getAttribute('data-suffix') || '';
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;
                
                const updateCounter = () => {
                    current += step;
                    if (current < target) {
                        counter.textContent = Math.floor(current) + suffix;
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target + suffix;
                    }
                };
                
                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => counterObserver.observe(counter));
}

// ===== FORM HANDLING =====
function initFormHandling() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                submitBtn.textContent = 'Message Sent!';
                submitBtn.style.background = '#28a745';
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                    this.reset();
                }, 2000);
            }, 1500);
        });
    }
    
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const input = this.querySelector('input[type="email"]');
            const submitBtn = this.querySelector('button[type="submit"]');
            
            if (input.value && input.value.includes('@')) {
                submitBtn.textContent = 'Subscribed!';
                input.value = '';
                
                setTimeout(() => {
                    submitBtn.textContent = 'Subscribe';
                }, 2000);
            }
        });
    }
}

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== PARALLAX EFFECT =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax');
    
    parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ===== LAZY LOADING IMAGES =====
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===== NEWS FILTER FUNCTIONALITY =====
function initNewsFilters() {
    const filterBtns = document.querySelectorAll('.news-filter');
    const newsCards = document.querySelectorAll('.news-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.dataset.filter;
            
            newsCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.5s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Initialize news filters if on news page
if (document.querySelector('.news-filters')) {
    initNewsFilters();
}

// ===== ACTIVE NAV LINK ON SCROLL =====
function initActiveNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    window.addEventListener('scroll', () => {
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

// ===== PAGE LOADER =====
window.addEventListener('load', () => {
    const loader = document.querySelector('.page-loader');
    if (loader) {
        loader.classList.add('loaded');
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }
});

// ===== SCROLL PROGRESS BAR =====
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        progressBar.style.width = `${progress}%`;
    });
}

initScrollProgress();

// ===== COPYRIGHTS YEAR =====
document.querySelectorAll('.copyright-year').forEach(el => {
    el.textContent = new Date().getFullYear();
});

// ===== READ TIME CALCULATOR =====
function calculateReadTime(text) {
    const wordsPerMinute = 200;
    const words = text.trim().split(/\s+/).length;
    const readTime = Math.ceil(words / wordsPerMinute);
    return readTime;
}

// ===== SERVICES TABS =====
function initServicesTabs() {
    const tabBtns = document.querySelectorAll('.service-tab-btn');
    const tabContents = document.querySelectorAll('.service-tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.dataset.tab;
            
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            btn.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
}

if (document.querySelector('.service-tab-btn')) {
    initServicesTabs();
}

// ===== VIDEO PLAYER CONTROLS =====
document.querySelectorAll('video').forEach(video => {
    video.addEventListener('click', function() {
        if (this.paused) {
            this.play();
        } else {
            this.pause();
        }
    });
});

// ===== ACCORDION =====
document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', function() {
        const content = this.nextElementSibling;
        const isOpen = content.style.maxHeight;
        
        // Close all accordions
        document.querySelectorAll('.accordion-content').forEach(c => {
            c.style.maxHeight = null;
        });
        document.querySelectorAll('.accordion-header').forEach(h => {
            h.classList.remove('active');
        });
        
        // Open clicked if it was closed
        if (!isOpen) {
            content.style.maxHeight = content.scrollHeight + 'px';
            this.classList.add('active');
        }
    });
});

// ===== TOOLTIPS =====
document.querySelectorAll('[data-tooltip]').forEach(element => {
    element.addEventListener('mouseenter', function() {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = this.dataset.tooltip;
        document.body.appendChild(tooltip);
        
        const rect = this.getBoundingClientRect();
        tooltip.style.top = `${rect.top - tooltip.offsetHeight - 10}px`;
        tooltip.style.left = `${rect.left + rect.width / 2 - tooltip.offsetWidth / 2}px`;
        
        this._tooltip = tooltip;
    });
    
    element.addEventListener('mouseleave', function() {
        if (this._tooltip) {
            this._tooltip.remove();
            this._tooltip = null;
        }
    });
});

console.log('Pet Home Website - JavaScript Initialized');

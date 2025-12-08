// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    // پیش‌گیری از مشکل آیکون‌ها
    checkFontAwesome();
    
    // Preloader
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 500);
    });

    // Theme Switcher
    const themeSwitcher = document.getElementById('themeSwitcher');
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    themeSwitcher.addEventListener('click', () => {
        const theme = document.documentElement.getAttribute('data-theme');
        const newTheme = theme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Active nav link on scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= (sectionTop - 200)) {
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

    // Back to Top Button
    const backToTop = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Skills Tabs
    const categoryTabs = document.querySelectorAll('.category-tab');
    const skillCategories = document.querySelectorAll('.skill-category');
    
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const category = tab.getAttribute('data-category');
            
            // Update active tab
            categoryTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Show selected category
            skillCategories.forEach(cat => {
                cat.classList.remove('active');
                if (cat.id === category) {
                    cat.classList.add('active');
                }
            });
        });
    });

    // Portfolio Filter
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');
            
            // Update active filter button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter portfolio items
            portfolioItems.forEach(item => {
                const categories = item.getAttribute('data-category').split(',');
                
                if (filter === 'all' || categories.includes(filter)) {
                    item.classList.remove('hidden');
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.classList.add('hidden');
                    }, 300);
                }
            });
        });
    });

    // Form label animation
    document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
        // Set initial state
        const label = input.nextElementSibling;
        if (input.value) {
            label.style.top = '-0.5rem';
            label.style.fontSize = '0.875rem';
            label.style.color = '#6c63ff';
        }
        
        input.addEventListener('focus', () => {
            label.style.top = '-0.5rem';
            label.style.fontSize = '0.875rem';
            label.style.color = '#6c63ff';
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                label.style.top = '1rem';
                label.style.fontSize = '1rem';
                label.style.color = '';
            }
        });
    });

    // Portfolio Lightbox
    const portfolioLinks = document.querySelectorAll('.portfolio-gallery');
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    document.body.appendChild(lightbox);

    let currentImageIndex = 0;
    const portfolioImages = Array.from(portfolioLinks).map(link => link.href);

    portfolioLinks.forEach((link, index) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            currentImageIndex = index;
            openLightbox(portfolioImages[currentImageIndex]);
        });
    });

    function openLightbox(src) {
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <img src="${src}" class="lightbox-img" alt="نمونه کار">
                <button class="lightbox-close">
                    <i class="fas fa-times"></i>
                </button>
                <div class="lightbox-nav">
                    <button class="lightbox-prev">
                        <i class="fas fa-chevron-right"></i>
                    </button>
                    <button class="lightbox-next">
                        <i class="fas fa-chevron-left"></i>
                    </button>
                </div>
            </div>
        `;
        
        lightbox.classList.add('active');
        
        // Close lightbox
        lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
        
        // Navigation
        lightbox.querySelector('.lightbox-prev').addEventListener('click', () => {
            currentImageIndex = (currentImageIndex - 1 + portfolioImages.length) % portfolioImages.length;
            lightbox.querySelector('.lightbox-img').src = portfolioImages[currentImageIndex];
        });
        
        lightbox.querySelector('.lightbox-next').addEventListener('click', () => {
            currentImageIndex = (currentImageIndex + 1) % portfolioImages.length;
            lightbox.querySelector('.lightbox-img').src = portfolioImages[currentImageIndex];
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', handleKeyDown);
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.removeEventListener('keydown', handleKeyDown);
    }

    function handleKeyDown(e) {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') {
            currentImageIndex = (currentImageIndex - 1 + portfolioImages.length) % portfolioImages.length;
            lightbox.querySelector('.lightbox-img').src = portfolioImages[currentImageIndex];
        }
        if (e.key === 'ArrowLeft') {
            currentImageIndex = (currentImageIndex + 1) % portfolioImages.length;
            lightbox.querySelector('.lightbox-img').src = portfolioImages[currentImageIndex];
        }
    }

    // Animate skill bars when in viewport
    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBars = entry.target.querySelectorAll('.skill-progress');
                skillBars.forEach(bar => {
                    const width = bar.getAttribute('data-width');
                    bar.style.width = width + '%';
                });
            }
        });
    }, observerOptions);

    // Observe skills section
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        observer.observe(skillsSection);
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Initialize with animations
    initializeAnimations();
    
    // Initialize Typed.js
    initializeTypedJS();
});

// Initialize Typed.js
function initializeTypedJS() {
    if (typeof Typed !== 'undefined') {
        var typed = new Typed('#typed', {
            strings: ['طراح وب هستم', 'توسعه دهنده فرانت‌اند هستم', 'متخصص وردپرس هستم'],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 1500,
            loop: true,
            smartBackspace: true
        });
    } else {
        // Fallback if Typed.js fails to load
        const typedElement = document.getElementById('typed');
        if (typedElement) {
            const texts = ['طراح وب هستم', 'توسعه دهنده فرانت‌اند هستم', 'متخصص وردپرس هستم'];
            let currentIndex = 0;
            
            function typeText() {
                typedElement.textContent = texts[currentIndex];
                currentIndex = (currentIndex + 1) % texts.length;
            }
            
            typeText();
            setInterval(typeText, 2000);
        }
    }
}

// Check if Font Awesome loaded properly
function checkFontAwesome() {
    setTimeout(() => {
        const testIcon = document.createElement('i');
        testIcon.className = 'fas fa-check';
        testIcon.style.position = 'absolute';
        testIcon.style.left = '-9999px';
        document.body.appendChild(testIcon);
        
        const computedStyle = window.getComputedStyle(testIcon);
        const fontFamily = computedStyle.fontFamily;
        
        document.body.removeChild(testIcon);
        
        if (!fontFamily.includes('Font Awesome')) {
            console.warn('Font Awesome failed to load, using fallback');
            document.body.classList.add('no-fontawesome');
            showIconFallbacks();
        }
    }, 1000);
}

// Show text fallbacks for icons
function showIconFallbacks() {
    const iconMap = {
        'fa-home': '🏠',
        'fa-user': '👤',
        'fa-cogs': '⚙️',
        'fa-briefcase': '💼',
        'fa-envelope': '✉️',
        'fa-paper-plane': '📨',
        'fa-eye': '👁️',
        'fa-download': '⬇️',
        'fa-moon': '🌙',
        'fa-sun': '☀️',
        'fa-code': '💻',
        'fa-server': '🖥️',
        'fa-tools': '🛠️',
        'fa-map-marker-alt': '📍',
        'fa-phone': '📞',
        'fa-user-tag': '👤',
        'fa-chevron-left': '←',
        'fa-chevron-up': '↑',
        'fa-external-link-alt': '↗️',
        'fa-search': '🔍',
        'fa-times': '✖️',
        'fa-chevron-right': '→',
        'fa-github': 'GH',
        'fa-linkedin': 'IN',
        'fa-instagram': 'IG',
        'fa-telegram': 'TG'
    };
    
    document.querySelectorAll('i').forEach(icon => {
        const classes = Array.from(icon.classList);
        const iconClass = classes.find(cls => cls.startsWith('fa-'));
        
        if (iconClass && iconMap[iconClass]) {
            const fallbackSpan = document.createElement('span');
            fallbackSpan.className = 'icon-fallback';
            fallbackSpan.textContent = iconMap[iconClass];
            icon.parentNode.insertBefore(fallbackSpan, icon);
        }
    });
}

// Initialize animations
function initializeAnimations() {
    // Add fade-in animation to elements when they enter viewport
    const fadeElements = document.querySelectorAll('.hero-content, .about-content, .skills-content, .portfolio-grid, .contact-content');
    
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, {
        threshold: 0.1
    });
    
    fadeElements.forEach(el => fadeObserver.observe(el));
}
// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initPreloader();
    initNavbarShrink();
    initHeroSlider();
    initMenu();
    initGallery();
    initAnimations();
    initDarkMode();
    initCountdownTimer();
    initSmoothScroll();
    initBackToTop();
    
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
});

// Preloader
function initPreloader() {
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', function() {
        setTimeout(() => {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
        }, 500);
    });
}

// Navbar shrink on scroll
function initNavbarShrink() {
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('shrink');
        } else {
            navbar.classList.remove('shrink');
        }
    });
}

// Hero image slider
function initHeroSlider() {
    const slides = document.querySelectorAll('.hero-slide');
    let currentSlide = 0;
    
    if (slides.length === 0) return;
    
    function showNextSlide() {
        // Hide current slide
        slides[currentSlide].classList.remove('active');
        
        // Move to next slide
        currentSlide = (currentSlide + 1) % slides.length;
        
        // Show next slide
        slides[currentSlide].classList.add('active');
    }
    
    // Change slide every 5 seconds
    setInterval(showNextSlide, 5000);
}

// Menu functionality
function initMenu() {
    const menuItems = [
        {
            id: 1,
            name: "Jollof Rice",
            description: "Spicy tomato rice cooked with local spices and served with fried plantain and salat.",
            price: "₦1,500",
            category: "rice",
            image: "images/jollof.jfif"
        },
        {
            id: 2,
            name: "Fried Rice",
            description: "Aromatic rice stir-fried with vegetables, shrimp, and chicken.",
            price: "₦1,800",
            category: "rice",
            image: "images/fried rice.jfif"
        },
        {
            id: 3,
            name: "Coconut Rice",
            description: "Fragrant rice cooked in coconut milk with assorted meats.",
            price: "₦2,000",
            category: "rice",
            image: "images/cc rice.jfif"
        },
        {
            id: 4,
            name: "Pounded Yam & Egusi",
            description: "Smooth pounded yam served with rich egusi soup and assorted meat.",
            price: "₦2,200",
            category: "swallow",
            image: "images/yam and egusi.jfif"
        },
        {
            id: 5,
            name: "Fufu & Ogbono",
            description: "Soft fufu served with thick, delicious ogbono soup.",
            price: "₦1,800",
            category: "swallow",
            image: "images/fufu.jfif"
        },
        {
            id: 6,
            name: "Amala & Ewedu",
            description: "Traditional yam flour served with jute leaves soup and assorted meat.",
            price: "₦1,700",
            category: "swallow",
            image: "images/amala.jfif"
        },
        {
            id: 7,
            name: "Grilled Chicken",
            description: "Succulent chicken marinated in local spices and grilled to perfection.",
            price: "₦2,500",
            category: "protein",
            image: "images/g chicken.jfif"
        },
        {
            id: 8,
            name: "Fried Fish",
            description: "Fresh tilapia fish seasoned and fried until crispy.",
            price: "₦2,200",
            category: "protein",
            image: "images/fish.jfif"
        },
        {
            id: 9,
            name: "Beef Stew",
            description: "Tender beef cooked in a rich tomato and pepper sauce.",
            price: "₦1,200",
            category: "protein",
            image: "images/b stew.jfif"
        }
    ];

    const galleryImages = [
        {
            id: 1,
            src: "images/jollof.jfif",
            alt: "Jollof Rice with plantain"
        },
        {
            id: 2,
            src: "images/amala.jfif",
            alt: "Local soup with meat"
        },
        {
            id: 3,
            src: "images/fufu.jfif",
            alt: "Assorted Nigerian dishes"
        },
        {
            id: 4,
            src: "images/g chicken.jfif",
            alt: "Grilled chicken"
        },
        {
            id: 5,
            src: "images/cc rice.jfif",
            alt: "Fried rice with vegetables"
        },
        {
            id: 6,
            src: "images/yam and egusi.jfif",
            alt: "Traditional swallow"
        }
    ];

    const menuContainer = document.getElementById('menu-items');
    const categoryButtons = document.querySelectorAll('.menu-category-btn');
    
    // Render menu items
    function renderMenuItems(category = 'all') {
        menuContainer.innerHTML = '';
        
        const filteredItems = category === 'all' 
            ? menuItems 
            : menuItems.filter(item => item.category === category);
        
        filteredItems.forEach(item => {
            const col = document.createElement('div');
            col.className = 'col-md-6 col-lg-4 fade-up';
            col.setAttribute('data-category', item.category);
            
            col.innerHTML = `
                <div class="menu-item-card">
                    <div class="position-relative">
                        <img src="${item.image}" class="menu-item-img w-100" alt="${item.name}">
                        <div class="price-tag">${item.price}</div>
                    </div>
                    <div class="card-body p-4">
                        <h5 class="card-title">${item.name}</h5>
                        <p class="card-text text-muted">${item.description}</p>
                        <div class="d-flex justify-content-between align-items-center mt-3">
                            <span class="h5 text-primary mb-0">${item.price}</span>
                            <a href="https://wa.me/2348123456789?text=Hello%20Peniel's%20Kitchen,%20I'd%20like%20to%20order%20${encodeURIComponent(item.name)}" 
                               class="btn btn-sm btn-outline-primary" target="_blank">
                                <i class="fab fa-whatsapp me-1"></i>Order
                            </a>
                        </div>
                    </div>
                </div>
            `;
            
            menuContainer.appendChild(col);
        });
        
        // Re-initialize animations for new items
        setTimeout(() => {
            initAnimations();
        }, 100);
    }
    
    // Category filter functionality
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Filter menu items
            const category = this.getAttribute('data-category');
            renderMenuItems(category);
        });
    });
    
    // Initial render
    renderMenuItems();
    
    // Store gallery images for later use
    window.galleryImages = galleryImages;
}

// Gallery functionality
function initGallery() {
    const galleryContainer = document.getElementById('gallery-grid');
    const lightboxModal = new bootstrap.Modal(document.getElementById('lightboxModal'));
    const lightboxImage = document.getElementById('lightbox-image');
    
    // Check if gallery images exist
    if (!window.galleryImages) return;
    
    // Render gallery
    window.galleryImages.forEach((image, index) => {
        const col = document.createElement('div');
        col.className = 'col-md-6 col-lg-4 fade-up';
        col.style.animationDelay = `${index * 0.1}s`;
        
        col.innerHTML = `
            <div class="gallery-item" data-bs-toggle="modal" data-bs-target="#lightboxModal" data-image="${image.src}" data-alt="${image.alt}">
                <img src="${image.src}" class="gallery-img" alt="${image.alt}" loading="lazy">
                <div class="gallery-overlay">
                    <i class="fas fa-search-plus fa-2x text-white"></i>
                </div>
            </div>
        `;
        
        galleryContainer.appendChild(col);
    });
    
    // Add click event to gallery items
    document.addEventListener('click', function(e) {
        const galleryItem = e.target.closest('.gallery-item');
        if (galleryItem) {
            const imageSrc = galleryItem.getAttribute('data-image');
            const imageAlt = galleryItem.getAttribute('data-alt');
            
            lightboxImage.src = imageSrc;
            lightboxImage.alt = imageAlt;
        }
    });
}

// Scroll animations
function initAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe all elements with animation classes
    document.querySelectorAll('.fade-up, .slide-in-left, .slide-in-right').forEach(el => {
        observer.observe(el);
    });
}

// Dark mode toggle
function initDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const darkModeIcon = darkModeToggle.querySelector('i');
    
    // Check for saved dark mode preference
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        darkModeIcon.classList.remove('fa-moon');
        darkModeIcon.classList.add('fa-sun');
    }
    
    // Toggle dark mode
    darkModeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            darkModeIcon.classList.remove('fa-moon');
            darkModeIcon.classList.add('fa-sun');
            localStorage.setItem('darkMode', 'true');
        } else {
            darkModeIcon.classList.remove('fa-sun');
            darkModeIcon.classList.add('fa-moon');
            localStorage.setItem('darkMode', 'false');
        }
    });
}

// Countdown timer for promo banner
function initCountdownTimer() {
    const hoursElement = document.getElementById('countdown-hours');
    const minutesElement = document.getElementById('countdown-minutes');
    const secondsElement = document.getElementById('countdown-seconds');
    
    if (!hoursElement || !minutesElement || !secondsElement) return;
    
    // Set countdown time (12 hours from now)
    let countdownTime = 12 * 60 * 60; // 12 hours in seconds
    
    function updateCountdown() {
        if (countdownTime <= 0) {
            // Reset countdown when it reaches zero
            countdownTime = 12 * 60 * 60;
        }
        
        const hours = Math.floor(countdownTime / 3600);
        const minutes = Math.floor((countdownTime % 3600) / 60);
        const seconds = countdownTime % 60;
        
        hoursElement.textContent = hours.toString().padStart(2, '0');
        minutesElement.textContent = minutes.toString().padStart(2, '0');
        secondsElement.textContent = seconds.toString().padStart(2, '0');
        
        countdownTime--;
    }
    
    // Update countdown every second
    setInterval(updateCountdown, 1000);
    
    // Initial update
    updateCountdown();
}

// Smooth scroll for anchor links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's not an internal anchor
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                
                // Close mobile navbar if open
                const navbarCollapse = document.querySelector('.navbar-collapse.show');
                if (navbarCollapse) {
                    const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                    if (bsCollapse) {
                        bsCollapse.hide();
                    }
                }
                
                // Smooth scroll to target
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Back to top button
function initBackToTop() {
    const backToTopBtn = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.visibility = 'visible';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.visibility = 'hidden';
        }
    });
}

// Add current year to footer
document.addEventListener('DOMContentLoaded', function() {
    const currentYear = document.getElementById('current-year');
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }
});
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

let sections = document.querySelectorAll('section'); 
let navlinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navlinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        }
    });

    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};

ScrollReveal({
    reset: true,
    distance: '80px',
    duration: 2000,
    delay: 200
});

ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.home-img, .service-container, .portfolio-box, .contact form', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left' });
ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right' });

const typed = new Typed('.multiple-text', {
    strings: ['Teacher of English', 'Fluency Guy', 'English Solutions With Rithy', 'Content Creator', 'Content Writer', 'Motivational Speaker', 'Public Speaker', 'English-Khmer Translator', 'Fluencer'],
    typeSpeed: 60,
    backSpeed: 40,
    backDelay: 1000,
    loop: true
});

const typed1 = new Typed('.multiple-text1', {
    strings: ['Teacher of English', 'Fluency Guy', 'English Solutions With Rithy', 'Content Creator', 'Content Writer', 'Motivational Speaker', 'Public Speaker', 'English-Khmer Translator', 'Fluencer'],
    typeSpeed: 60,
    backSpeed: 40,
    backDelay: 1000,
    loop: true
});

const typed2 = new Typed('.multiple-text2', {
    strings: ['Teacher of English', 'Fluency Guy', 'English Solutions With Rithy', 'Content Creator', 'Content Writer', 'Motivational Speaker', 'Public Speaker', 'English-Khmer Translator', 'Fluencer'],
    typeSpeed: 60,
    backSpeed: 40,
    backDelay: 1000,
    loop: true
});
// Responsive Testimonial Slider with 3 Cards Displayed
document.addEventListener('DOMContentLoaded', function() {
    class Carousel {
        constructor(containerSelector) {
            this.carousel = document.querySelector(containerSelector);
            this.container = this.carousel.querySelector('.carousel-container');
            this.items = Array.from(this.container.querySelectorAll('.carousel-item'));
            this.dotsContainer = this.carousel.querySelector('.carousel-dots');
            this.currentIndex = 0;
            this.autoPlayInterval = null;
            this.itemsPerScreen = 3;
            
            this.init();
        }

        init() {
            this.createDots();
            this.setActiveItem(this.currentIndex);
            this.startAutoPlay();
            this.addEventListeners();
            this.updateResponsive();
        }

        createDots() {
            this.dots = [];
            this.dotsContainer.innerHTML = '';
            
            this.items.forEach((_, index) => {
                const dot = document.createElement('div');
                dot.classList.add('dot');
                if(index === 0) dot.classList.add('active');
                dot.addEventListener('click', () => this.goToIndex(index));
                this.dotsContainer.appendChild(dot);
                this.dots.push(dot);
            });
        }

        setActiveItem(index) {
            // Boundary checks
            if(index < 0) index = this.items.length - 1;
            if(index >= this.items.length) index = 0;
            
            this.currentIndex = index;
            
            // Calculate translateX based on item width
            const itemWidth = 100 / this.itemsPerScreen;
            const translateX = -index * itemWidth;
            
            this.container.style.transform = `translateX(${translateX}%)`;
            
            // Update active classes
            this.items.forEach(item => item.classList.remove('active'));
            this.dots.forEach(dot => dot.classList.remove('active'));
            
            // Activate current and adjacent items for better visibility
            const prevIndex = (index - 1 + this.items.length) % this.items.length;
            const nextIndex = (index + 1) % this.items.length;
            
            [prevIndex, index, nextIndex].forEach(i => {
                if(this.items[i]) this.items[i].classList.add('active');
            });
            
            this.dots[index].classList.add('active');
        }

        updateResponsive() {
            const screenWidth = window.innerWidth;
            this.itemsPerScreen = screenWidth < 480 ? 1 : screenWidth < 768 ? 2 : 3;
            
            // Update item widths
            this.items.forEach(item => {
                item.style.flex = `0 0 ${100 / this.itemsPerScreen}%`;
                item.style.maxWidth = `${100 / this.itemsPerScreen}%`;
            });
            
            // Reset position
            this.setActiveItem(this.currentIndex);
        }

        next() {
            this.setActiveItem(this.currentIndex + 1);
        }

        prev() {
            this.setActiveItem(this.currentIndex - 1);
        }

        goToIndex(index) {
            this.setActiveItem(index);
        }

        startAutoPlay() {
            this.autoPlayInterval = setInterval(() => this.next(), 5000);
        }

        addEventListeners() {
            window.addEventListener('resize', () => {
                this.updateResponsive();
            });
            
            // Pause autoplay on hover
            this.carousel.addEventListener('mouseenter', () => {
                clearInterval(this.autoPlayInterval);
            });
            
            this.carousel.addEventListener('mouseleave', () => {
                this.startAutoPlay();
            });
        }
    }

    // Initialize carousel
    const testimonialCarousel = new Carousel('.testimonials-carousel');
});

// Dropdown functionality
document.addEventListener('DOMContentLoaded', function() {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    // Desktop hover behavior
    dropdowns.forEach(dropdown => {
        // For desktop
        if (window.innerWidth > 768) {
            dropdown.addEventListener('mouseenter', () => {
                dropdown.classList.add('hover-active');
            });
            
            dropdown.addEventListener('mouseleave', () => {
                dropdown.classList.remove('hover-active');
            });
        }
        // For mobile
        else {
            const dropbtn = dropdown.querySelector('.dropbtn');
            dropbtn.addEventListener('click', (e) => {
                e.preventDefault();
                dropdown.classList.toggle('active');
                
                // Close other dropdowns
                dropdowns.forEach(otherDropdown => {
                    if (otherDropdown !== dropdown) {
                        otherDropdown.classList.remove('active');
                    }
                });
            });
        }
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown') && window.innerWidth <= 768) {
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        dropdowns.forEach(dropdown => {
            if (window.innerWidth > 768) {
                dropdown.classList.remove('active');
            }
        });
    });
});

// Add these JavaScript functions to your Scrip.js file

// Testimonial Carousel functionality
let currentTestimonialIndex = 0;
const testimonialSlideWidth = 100 / 3; // For 3 cards per view
let autoScrollInterval;

function moveTestimonials(direction) {
    const container = document.querySelector('.carousel-container');
    const cards = document.querySelectorAll('.testimonial-card');
    const dotsContainer = document.querySelector('.carousel-dots');
    const dots = document.querySelectorAll('.dot');
    
    // Determine how many cards are visible based on screen width
    let visibleCards = 3;
    if (window.innerWidth <= 991 && window.innerWidth > 768) {
        visibleCards = 2;
    } else if (window.innerWidth <= 768) {
        visibleCards = 1;
    }
    
    // Update current index
    currentTestimonialIndex += direction;
    
    // Handle boundary conditions
    const maxIndex = cards.length - visibleCards;
    if (currentTestimonialIndex > maxIndex) {
        currentTestimonialIndex = 0;
    } else if (currentTestimonialIndex < 0) {
        currentTestimonialIndex = maxIndex;
    }
    
    // Calculate the percentage to shift
    const slidePercentage = (100 / visibleCards) * currentTestimonialIndex;
    
    // Apply the transform
    container.style.transform = `translateX(-${slidePercentage}%)`;
    
    // Update active dot
    dots.forEach((dot, index) => {
        dot.classList.remove('active');
        if (index === currentTestimonialIndex) {
            dot.classList.add('active');
        }
    });
    
    // Reset the auto-scroll timer
    resetAutoScroll();
}

function goToSlide(index) {
    const difference = index - currentTestimonialIndex;
    moveTestimonials(difference);
}

function createTestimonialDots() {
    const dotsContainer = document.querySelector('.carousel-dots');
    const cards = document.querySelectorAll('.testimonial-card');
    
    // Clear existing dots
    dotsContainer.innerHTML = '';
    
    // Create a dot for each testimonial card
    cards.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
}

function startAutoScroll() {
    autoScrollInterval = setInterval(() => {
        moveTestimonials(1);
    }, 5000); // Auto scroll every 5 seconds
}

function resetAutoScroll() {
    clearInterval(autoScrollInterval);
    startAutoScroll();
}

function setupTestimonials() {
    createTestimonialDots();
    startAutoScroll();
    
    // Pause auto-scroll when hovering over carousel
    const carousel = document.querySelector('.testimonials-carousel');
    carousel.addEventListener('mouseenter', () => {
        clearInterval(autoScrollInterval);
    });
    
    carousel.addEventListener('mouseleave', () => {
        startAutoScroll();
    });
    
    // Handle touch events for mobile swipe
    let touchStartX = 0;
    let touchEndX = 0;
    
    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);
    
    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        if (touchEndX < touchStartX - 50) {
            moveTestimonials(1); // Swipe left
        } else if (touchEndX > touchStartX + 50) {
            moveTestimonials(-1); // Swipe right
        }
    }, false);
    
    // Adjust cards on window resize
    window.addEventListener('resize', () => {
        // Reset position on resize to handle responsive layout changes
        const container = document.querySelector('.carousel-container');
        currentTestimonialIndex = 0;
        container.style.transform = 'translateX(0)';
        
        // Update dots
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.remove('active');
            if (index === 0) {
                dot.classList.add('active');
            }
        });
    });
}

// Initialize testimonials when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.testimonials-carousel')) {
        setupTestimonials();
    }
});

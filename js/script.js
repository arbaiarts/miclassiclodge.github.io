// =========================================================================
// M.I Classic Lodge - Interactive Scripts (Anti-Gravity Aesthetic)
// =========================================================================

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initMobileMenu();
    initSmoothScrolling();
    initIntersectionObserver();
    initParticleSystem();
    init3DTilt();
    initRoomToggles();
});

// --- 1. Navbar Scroll Effect ---
function initNavbar() {
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// --- 2. Mobile Menu Toggle ---
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-links li a').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    }));
}

// --- 3. Smooth Scrolling for Anchor Links ---
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                // Offset for fixed navbar
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// --- 4. Intersection Observer for Scroll Reveals (Anti-Gravity Float Up) ---
function initIntersectionObserver() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Stop observing once animated to keep it visible
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const targets = document.querySelectorAll('.observer-target');
    targets.forEach(target => observer.observe(target));
}

// --- 5. Particle System Background (Canvas) ---
function initParticleSystem() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Set canvas dimensions
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    
    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        initParticles();
    });

    // Particle Config
    const particlesArray = [];
    const numberOfParticles = Math.floor(width * height / 15000); // Responsive density
    const particleColors = ['rgba(212, 175, 55, 0.4)', 'rgba(243, 229, 171, 0.2)', 'rgba(255, 255, 255, 0.1)'];

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.size = Math.random() * 2 + 0.5; // Size between 0.5 and 2.5
            this.speedX = Math.random() * 0.5 - 0.25; // Slow horizontal drift
            this.speedY = Math.random() * -1 - 0.2; // Move UPWARDS slowly
            this.color = particleColors[Math.floor(Math.random() * particleColors.length)];
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            // Loop particles from top to bottom and edges
            if (this.y < 0) this.y = height;
            if (this.x < 0) this.x = width;
            if (this.x > width) this.x = 0;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
            
            // Subtle glow for larger particles
            if (this.size > 1.5) {
                ctx.shadowBlur = 5;
                ctx.shadowColor = 'rgba(212, 175, 55, 0.8)';
            } else {
                ctx.shadowBlur = 0;
            }
        }
    }

    function initParticles() {
        particlesArray.length = 0;
        for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new Particle());
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, width, height);
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
        }
        
        // Draw thin connecting lines between near particles
        connectParticles();
        
        requestAnimationFrame(animateParticles);
    }

    function connectParticles() {
        let opacityValue = 1;
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a; b < particlesArray.length; b++) {
                let dx = particlesArray[a].x - particlesArray[b].x;
                let dy = particlesArray[a].y - particlesArray[b].y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    opacityValue = 1 - (distance / 100);
                    ctx.strokeStyle = `rgba(212, 175, 55, ${opacityValue * 0.15})`; // Very faint gold lines
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    initParticles();
    animateParticles();
}

// --- 6. 3D Tilt Effect (for Room Cards) ---
function init3DTilt() {
    const tiltCards = document.querySelectorAll('.tilt-card');
    
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', handleTilt);
        card.addEventListener('mouseleave', resetTilt);
    });

    function handleTilt(e) {
        const card = this;
        const cardRect = card.getBoundingClientRect();
        
        // Calculate mouse position relative to the center of the card
        const cardWidth = cardRect.width;
        const cardHeight = cardRect.height;
        const centerX = cardRect.left + cardWidth / 2;
        const centerY = cardRect.top + cardHeight / 2;
        
        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;
        
        // Calculate rotation degrees (inverse for natural feel)
        // Max rotation of 10 degrees
        const rotateX = ((mouseY / (cardHeight / 2)) * -10).toFixed(2);
        const rotateY = ((mouseX / (cardWidth / 2)) * 10).toFixed(2);
        
        // Apply transform
        // We use inner wrapper scale instead of scaling the whole card to avoid layout jumps
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        card.style.boxShadow = `0 20px 40px rgba(0,0,0,0.6), 0 0 20px rgba(212, 175, 55, 0.3)`;
    }

    function resetTilt() {
        const card = this;
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        card.style.boxShadow = `0 10px 30px rgba(0, 0, 0, 0.5)`;
    }
}

// --- 7. AC / Non-AC Toggle for Room Pricing ---
function initRoomToggles() {
    const toggles = document.querySelectorAll('.ac-checkbox');

    toggles.forEach(toggle => {
        toggle.addEventListener('change', function() {
            const card = this.closest('.room-info');
            if(!card) return;
            const priceVal = card.querySelector('.price-val');
            const nonAcLabel = card.querySelector('.toggle-non-ac');
            const acLabel = card.querySelector('.toggle-ac');

            if (this.checked) {
                // AC requested
                priceVal.textContent = '₹' + this.getAttribute('data-ac');
                if(acLabel) acLabel.classList.add('active');
                if(nonAcLabel) nonAcLabel.classList.remove('active');
            } else {
                // Non-AC requested
                priceVal.textContent = '₹' + this.getAttribute('data-base');
                if(nonAcLabel) nonAcLabel.classList.add('active');
                if(acLabel) acLabel.classList.remove('active');
            }
        });
    });
}

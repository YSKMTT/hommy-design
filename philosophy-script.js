document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll navigation
    const navLinks = document.querySelectorAll('.nav-links a');
    const navHeight = document.querySelector('.nav-fixed').offsetHeight;
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const targetPosition = targetSection.offsetTop - navHeight - 20;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Active navigation highlighting
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNav() {
        const scrollPos = window.scrollY + navHeight + 50;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightNav);
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements
    const animateElements = document.querySelectorAll(
        '.philosophy-card, .principle-item, .layer, .step'
    );
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Add animation class styles
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        .nav-links a.active {
            color: var(--accent-cool);
        }
        
        .nav-links a.active::after {
            width: 100%;
        }
    `;
    document.head.appendChild(style);
    
    // Hero visual parallax effect
    const heroVisual = document.querySelector('.hero-visual');
    const circles = document.querySelectorAll('.circle');
    
    window.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        circles.forEach((circle, index) => {
            const speed = (index + 1) * 0.5;
            const xOffset = (x - 0.5) * speed * 50;
            const yOffset = (y - 0.5) * speed * 50;
            
            circle.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
        });
    });
    
    // Context node animation
    const contextNodes = document.querySelectorAll('.context-node');
    let activeIndex = 0;
    
    function animateContextNodes() {
        contextNodes.forEach((node, index) => {
            node.classList.remove('active');
        });
        
        contextNodes[activeIndex].classList.add('active');
        activeIndex = (activeIndex + 1) % contextNodes.length;
    }
    
    setInterval(animateContextNodes, 2000);
    
    // Mobile menu toggle (for future enhancement)
    function createMobileMenu() {
        const navContainer = document.querySelector('.nav-container');
        const menuButton = document.createElement('button');
        menuButton.className = 'mobile-menu-toggle';
        menuButton.innerHTML = '☰';
        menuButton.style.display = 'none';
        menuButton.style.background = 'none';
        menuButton.style.border = 'none';
        menuButton.style.fontSize = '1.5rem';
        menuButton.style.cursor = 'pointer';
        
        // Only show on mobile
        if (window.innerWidth <= 768) {
            menuButton.style.display = 'block';
        }
        
        window.addEventListener('resize', () => {
            if (window.innerWidth <= 768) {
                menuButton.style.display = 'block';
            } else {
                menuButton.style.display = 'none';
            }
        });
        
        navContainer.appendChild(menuButton);
    }
    
    createMobileMenu();
});
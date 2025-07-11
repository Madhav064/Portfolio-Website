document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const yearElement = document.getElementById('current-year');
    const sections = document.querySelectorAll('section');
    const contactForm = document.querySelector('.contact-form');
    const projectCards = document.querySelectorAll('.project-card');

    // Initialize functions
    initMobileMenu();
    initSmoothScrolling();
    initScrollEffects();
    initFormValidation();
    initProjectHoverEffects();
    setCurrentYear();

    // Mobile Menu Functionality
    function initMobileMenu() {
        hamburger.addEventListener('click', toggleMobileMenu);
        
        // Close menu when clicking on links
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });
    }

    function toggleMobileMenu() {
        navLinks.classList.toggle('active');
        hamburger.innerHTML = navLinks.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : 
            '<i class="fas fa-bars"></i>';
    }

    function closeMobileMenu() {
        navLinks.classList.remove('active');
        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    }

    // Smooth Scrolling
    function initSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                scrollToSection(this.getAttribute('href'));
            });
        });
    }

    function scrollToSection(targetId) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    }

    // Scroll Effects
    function initScrollEffects() {
        // Header shadow effect
        window.addEventListener('scroll', function() {
            const header = document.querySelector('header');
            header.style.boxShadow = window.scrollY > 50 ? 
                '0 5px 15px rgba(0, 0, 0, 0.1)' : 
                '0 2px 10px rgba(0, 0, 0, 0.1)';
        });

        // Section animation on scroll
        const observerOptions = {
            threshold: 0.1
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            observer.observe(section);
        });
    }

    // Form Validation
    function initFormValidation() {
        if (contactForm) {
            contactForm.addEventListener('submit', async function(e) {
                e.preventDefault();
                if (validateForm()) {
                    // Send data to backend
                    const formData = new FormData(contactForm);
                    const data = {
                        name: formData.get('name'),
                        email: formData.get('email'),
                        message: formData.get('message')
                    };
                    try {
                        const response = await fetch('https://portfolio-website-ashen-beta-44.vercel.app', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(data)
                        });
                        if (response.ok) {
                            alert('Message sent successfully!');
                            contactForm.reset();
                        } else {
                            alert('There was an error sending your message. Please try again later.');
                        }
                    } catch (error) {
                        alert('There was an error sending your message. Please try again later.');
                    }
                }
            });
        }
    }

    function validateForm() {
        let isValid = true;
        const inputs = contactForm.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                input.style.borderColor = 'red';
                isValid = false;
            } else {
                input.style.borderColor = '#e2e8f0';
            }
        });

        return isValid;
    }

    // Project Card Effects
    function initProjectHoverEffects() {
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.querySelector('.project-img img').style.transform = 'scale(1.1)';
            });

            card.addEventListener('mouseleave', function() {
                this.querySelector('.project-img img').style.transform = 'scale(1)';
            });
        });
    }

    // Utility Functions
    function setCurrentYear() {
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
    }

    // Initialize animations on page load
    setTimeout(() => {
        document.querySelector('.hero').classList.add('fade-in');
    }, 300);
});

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Scroll Reveal Animation ---
    const revealElements = document.querySelectorAll('.reveal-up');
    
    // Opciones más permisivas para que dispare sí o sí
    const revealOptions = {
        threshold: 0,
        rootMargin: "50px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // Failsafe: Si por alguna restricción del navegador el observador no dispara, mostrar todo después de 1.5s
    setTimeout(() => {
        revealElements.forEach(el => el.classList.add('active'));
    }, 1500);

    // El fondo ahora es Chromatic Liquid Glass (100% CSS)

    // --- Mobile Menu Toggle ---
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Animate hamburger icon
            const spans = mobileBtn.querySelectorAll('span');
            if (navLinks.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.transform = 'rotate(-45deg) translate(4px, -4px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.transform = 'none';
            }
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const spans = mobileBtn.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.transform = 'none';
            });
        });
    }
    // --- Multi-Gallery Logic ---
    const galleries = document.querySelectorAll('.project-gallery-grid');
    
    galleries.forEach(gallery => {
        const thumbs = gallery.querySelectorAll('.gallery-thumbs img');
        const mainImg = gallery.querySelector('.gallery-main img');
        
        if (thumbs && mainImg) {
            thumbs.forEach(thumb => {
                thumb.addEventListener('click', () => {
                    mainImg.src = thumb.src;
                    
                    // Sync reflection if exists
                    const reflectionImg = gallery.querySelector('.phone-reflection img');
                    if (reflectionImg) reflectionImg.src = thumb.src;
                    
                    // Add a small fade effect
                    mainImg.style.opacity = '0';
                    if (reflectionImg) reflectionImg.style.opacity = '0';
                    
                    setTimeout(() => {
                        mainImg.style.opacity = '1';
                        if (reflectionImg) reflectionImg.style.opacity = '0.15'; // Keep reflection subtle
                    }, 50);
                });
            });
        }
    });
});

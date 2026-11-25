document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Navigation Toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('.nav-links');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            const isOpen = navMenu.classList.toggle('active');
            hamburger.setAttribute('aria-expanded', isOpen);
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // 2. Header Scroll Shadow
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'rgba(5, 7, 10, 0.95)';
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
        } else {
            header.style.backgroundColor = 'rgba(5, 7, 10, 0.85)';
            header.style.boxShadow = 'none';
        }
    });

    // 3. "View More / Show Less" Toggle for Projects & Certifications
    document.querySelectorAll('.toggle-more-btn').forEach(button => {
        const targetGroup = button.getAttribute('data-target');
        const extraItems = document.querySelectorAll(`.extra-item[data-group="${targetGroup}"]`);
        const defaultLabel = button.textContent.trim();

        if (extraItems.length === 0) {
            button.style.display = 'none';
            return;
        }

        button.addEventListener('click', () => {
            const isExpanded = button.getAttribute('aria-expanded') === 'true';
            extraItems.forEach(item => {
                item.classList.toggle('is-hidden', isExpanded);
            });
            button.setAttribute('aria-expanded', String(!isExpanded));
            button.textContent = isExpanded ? defaultLabel : '- Show Less';
        });
    });

    // 4. Scroll-Triggered Fade-In (Respecting prefers-reduced-motion)
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

        document.querySelectorAll('.cyber-card, .skill-category, .timeline-item, .project-card:not(.is-hidden), .cert-card:not(.is-hidden)').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(18px)';
            el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            observer.observe(el);
        });
    }
});

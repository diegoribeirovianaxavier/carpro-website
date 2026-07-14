document.addEventListener('DOMContentLoaded', () => {
  // Register GSAP plugins
  gsap.registerPlugin(ScrollTrigger);

  // Initialize Elements (cloners first so DOM is ready before animations)
  initLogoCarousel();
  initTestimonialCarousel();
  initHeroAnimations();
  initScrollReveals();
  initParallaxEffects();
  initCustomInteractions();
  initMobileMenu();
});

/**
 * Hero Section Entrance Animations (GSAP)
 */
function initHeroAnimations() {
  const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.2 } });

  // Navbar fade in
  tl.fromTo('nav', 
    { y: -30, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.8 }
  );

  // Hero badge
  tl.fromTo('.hero-badge',
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1 },
    '-=0.4'
  );

  // Main Hero Heading (split words reveal)
  tl.fromTo('.hero-title span',
    { y: 80, opacity: 0 },
    { y: 0, opacity: 1, stagger: 0.1 },
    '-=0.8'
  );

  // Hero Description & CTA Buttons
  tl.fromTo('.hero-desc',
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1 },
    '-=0.6'
  );

  tl.fromTo('.hero-ctas',
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1 },
    '-=0.6'
  );

  // Hero Main Visual/Car Image
  tl.fromTo('.hero-image-container',
    { scale: 0.95, opacity: 0 },
    { scale: 1, opacity: 1, duration: 1.5, ease: 'power3.out' },
    '-=1'
  );

  // Hero Floating Cards
  tl.fromTo('.floating-card-1',
    { x: -50, opacity: 0 },
    { x: 0, opacity: 1, duration: 1 },
    '-=0.8'
  );

  tl.fromTo('.floating-card-2',
    { x: 50, opacity: 0 },
    { x: 0, opacity: 1, duration: 1 },
    '-=0.8'
  );
}

/**
 * Scroll Triggered Reveals (GSAP & ScrollTrigger)
 */
function initScrollReveals() {
  // Generic Section Header Reveals
  const sectionHeaders = document.querySelectorAll('.section-header');
  sectionHeaders.forEach(header => {
    gsap.fromTo(header,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: header,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
  });

  // About Us Section Content Reveal
  gsap.fromTo('.about-image',
    { x: -50, opacity: 0 },
    {
      x: 0,
      opacity: 1,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.about-section',
        start: 'top 75%'
      }
    }
  );

  gsap.fromTo('.about-content-text',
    { x: 50, opacity: 0 },
    {
      x: 0,
      opacity: 1,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.about-section',
        start: 'top 75%'
      }
    }
  );

  // Stats Counters Animation
  const statsSection = document.querySelector('.stats-container');
  if (statsSection) {
    const stats = statsSection.querySelectorAll('.stat-number');
    gsap.fromTo(stats,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        scrollTrigger: {
          trigger: statsSection,
          start: 'top 80%'
        },
        onComplete: () => {
          // Animate count up if desired
          stats.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'), 10);
            if (!isNaN(target)) {
              let count = 0;
              const increment = Math.ceil(target / 40);
              const timer = setInterval(() => {
                count += increment;
                if (count >= target) {
                  stat.innerText = target + (stat.getAttribute('data-suffix') || '');
                  clearInterval(timer);
                } else {
                  stat.innerText = count + (stat.getAttribute('data-suffix') || '');
                }
              }, 25);
            }
          });
        }
      }
    );
  }

  // Services Cards Grid (Stagger reveal)
  const serviceCards = document.querySelectorAll('.service-card');
  if (serviceCards.length > 0) {
    gsap.fromTo(serviceCards,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.services-grid',
          start: 'top 80%'
        }
      }
    );
  }

  // Testimonials Container Reveal
  const testimonialContainer = document.querySelector('.testimonial-slider-container');
  if (testimonialContainer) {
    gsap.fromTo(testimonialContainer,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.testimonial-slider-container',
          start: 'top 85%'
        }
      }
    );
  }

  // Contact Info & Form Reveal
  gsap.fromTo('.contact-info-block',
    { x: -40, opacity: 0 },
    {
      x: 0,
      opacity: 1,
      duration: 1,
      scrollTrigger: {
        trigger: '.contact-section',
        start: 'top 80%'
      }
    }
  );

  gsap.fromTo('.contact-map-block',
    { x: 40, opacity: 0 },
    {
      x: 0,
      opacity: 1,
      duration: 1,
      scrollTrigger: {
        trigger: '.contact-section',
        start: 'top 80%'
      }
    }
  );
}

/**
 * Parallax Backgrounds & Floating Elements (GSAP)
 */
function initParallaxEffects() {
  // Parallax on hero image
  gsap.to('.hero-parallax-bg', {
    yPercent: 20,
    ease: 'none',
    scrollTrigger: {
      trigger: '#hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    }
  });

  // Floating animations for decorative badges
  gsap.to('.floating-card-1', {
    y: -15,
    duration: 3,
    ease: 'sine.inOut',
    yoyo: true,
    repeat: -1
  });

  gsap.to('.floating-card-2', {
    y: 15,
    duration: 3.5,
    ease: 'sine.inOut',
    yoyo: true,
    repeat: -1,
    delay: 0.5
  });
}

/**
 * Micro-interactions & Spring Effects (Motion One)
 */
function initCustomInteractions() {
  const hasMotion = typeof motion !== 'undefined';
  
  // Custom Hover/Click Actions on Buttons
  const buttons = document.querySelectorAll('.animate-btn');
  buttons.forEach(btn => {
    if (hasMotion) {
      // Use Motion One for Spring gesture response
      motion.hover(btn, (element) => {
        motion.animate(element, { scale: 1.05 }, { duration: 0.3, easing: motion.spring({ stiffness: 300, damping: 15 }) });
        return () => motion.animate(element, { scale: 1 }, { duration: 0.3, easing: motion.spring({ stiffness: 300, damping: 15 }) });
      });

      motion.press(btn, (element) => {
        motion.animate(element, { scale: 0.95 }, { duration: 0.1 });
        return () => motion.animate(element, { scale: 1.05 }, { duration: 0.1 });
      });
    } else {
      // Fallback to GSAP if Motion library is not available
      btn.addEventListener('mouseenter', () => {
        gsap.to(btn, { scale: 1.05, duration: 0.3, ease: 'elastic.out(1, 0.3)' });
      });
      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, { scale: 1, duration: 0.3, ease: 'power2.out' });
      });
      btn.addEventListener('mousedown', () => {
        gsap.to(btn, { scale: 0.95, duration: 0.1 });
      });
      btn.addEventListener('mouseup', () => {
        gsap.to(btn, { scale: 1.05, duration: 0.1 });
      });
    }
  });

  // Services Cards tilt and border highlight effect
  const serviceCards = document.querySelectorAll('.service-card');
  serviceCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left; // x position within the element.
      const y = e.clientY - rect.top;  // y position within the element.
      
      // Calculate rotation based on cursor position
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = -(y - centerY) / 12; // tilt sensitivity
      const rotateY = (x - centerX) / 12;

      gsap.to(card, {
        rotateX: rotateX,
        rotateY: rotateY,
        transformPerspective: 1000,
        duration: 0.3,
        ease: 'power2.out'
      });

      // Update radial glow border position
      const glow = card.querySelector('.card-glow');
      if (glow) {
        gsap.to(glow, {
          left: `${x}px`,
          top: `${y}px`,
          opacity: 0.15,
          duration: 0.1
        });
      }
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.5,
        ease: 'power2.out'
      });

      const glow = card.querySelector('.card-glow');
      if (glow) {
        gsap.to(glow, {
          opacity: 0,
          duration: 0.3
        });
      }
    });
  });
}

/**
 * Mobile Hamburguer Menu Toggle
 */
function initMobileMenu() {
  const menuBtn = document.getElementById('menu-toggle-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIcon = menuBtn?.querySelector('.menu-icon');
  
  if (!menuBtn || !mobileMenu) return;

  let isOpen = false;

  menuBtn.addEventListener('click', () => {
    isOpen = !isOpen;

    if (isOpen) {
      // Open animation
      mobileMenu.classList.remove('hidden');
      gsap.fromTo(mobileMenu,
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }
      );
      
      // Morph menu icon (simple line rotations using CSS/GSAP)
      gsap.to('.menu-line-1', { rotate: 45, y: 6, duration: 0.2 });
      gsap.to('.menu-line-2', { opacity: 0, duration: 0.2 });
      gsap.to('.menu-line-3', { rotate: -45, y: -6, duration: 0.2 });
    } else {
      // Close animation
      gsap.to(mobileMenu, {
        y: -30,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
          mobileMenu.classList.add('hidden');
        }
      });
      
      // Reset menu icon
      gsap.to('.menu-line-1', { rotate: 0, y: 0, duration: 0.2 });
      gsap.to('.menu-line-2', { opacity: 1, duration: 0.2 });
      gsap.to('.menu-line-3', { rotate: 0, y: 0, duration: 0.2 });
    }
  });

  // Close menu on link click
  const mobileLinks = mobileMenu.querySelectorAll('a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (isOpen) {
        menuBtn.click();
      }
    });
  });
}


/**
 * Infinite Logo Carousel duplicate logic
 */
function initLogoCarousel() {
  const track = document.querySelector('.logo-slider-track');
  if (track) {
    const originalContent = track.innerHTML;
    // Duplicate the content twice to have 3 groups in total (total 24 items in track)
    track.innerHTML = originalContent + originalContent + originalContent;
  }
}

/**
 * Infinite Testimonials Carousel duplicate logic
 */
function initTestimonialCarousel() {
  const track = document.querySelector('.testimonial-slider-track');
  if (track) {
    const originalContent = track.innerHTML;
    // Duplicate the content twice to have 3 groups in total (total 15 items in track)
    track.innerHTML = originalContent + originalContent + originalContent;
  }
}
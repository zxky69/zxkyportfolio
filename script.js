// Premium Portfolio JavaScript for al faheem
document.addEventListener('DOMContentLoaded', function () {
    // Initialize Lucide icons
    if (window.lucide) {
        lucide.createIcons();
    }

    // Theme Management
    let isDarkMode = localStorage.getItem('theme') === 'dark' ||
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);

    if (isDarkMode) {
        document.documentElement.classList.add('dark');
        updateDarkModeIcon(true);
    }

    // Dark Mode Toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function () {
            isDarkMode = !isDarkMode;
            document.documentElement.classList.toggle('dark', isDarkMode);
            localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
            updateDarkModeIcon(isDarkMode);
        });
    }

    function updateDarkModeIcon(dark) {
        if (!darkModeToggle) return;
        const icon = darkModeToggle.querySelector('.icon');
        if (icon) {
            icon.setAttribute('data-lucide', dark ? 'sun' : 'moon');
            if (window.lucide) lucide.createIcons();
        }
    }

    // Mobile Menu Toggle
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    let isMobileMenuOpen = false;

    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', function () {
            isMobileMenuOpen = !isMobileMenuOpen;
            mobileMenu.classList.toggle('active', isMobileMenuOpen);

            const icon = mobileMenuToggle.querySelector('.icon');
            if (icon) {
                icon.setAttribute('data-lucide', isMobileMenuOpen ? 'x' : 'menu');
                if (window.lucide) lucide.createIcons();
            }
        });
    }

    // Close mobile menu when clicking nav links
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', function () {
            if (mobileMenu && mobileMenuToggle) {
                isMobileMenuOpen = false;
                mobileMenu.classList.remove('active');

                const icon = mobileMenuToggle.querySelector('.icon');
                if (icon) {
                    icon.setAttribute('data-lucide', 'menu');
                    if (window.lucide) lucide.createIcons();
                }
            }
        });
    });

    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Portfolio Filter Functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            const filter = this.dataset.filter;

            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filter portfolio items
            portfolioItems.forEach(item => {
                const category = item.dataset.category;
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeIn 0.5s ease-out';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Skill Bar Animation
    const skillBars = document.querySelectorAll(".skill-progress");

    function animateSkillBars() {
        skillBars.forEach(bar => {
            const progress = bar.dataset.progress;
            bar.style.width = progress + "%";
        });
    }

    // Trigger animation when skills section comes into view
    const skillsSection = document.querySelector(".skills-section");
    if (skillsSection) {
        const skillsObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                animateSkillBars();
                skillsObserver.disconnect(); // Run only once
            }
        }, { threshold: 0.5 });

        skillsObserver.observe(skillsSection);
    }

    // Intersection Observer for Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';

                // Animate skill bars when about section comes into view
                if (entry.target.id === 'about') {
                    setTimeout(animateSkillBars, 500);
                }
            }
        });
    }, observerOptions);

    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');

    if (contactForm && submitBtn) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Show loading state
            submitBtn.innerHTML = '<div class="loading-spinner"></div> Sending...';
            submitBtn.disabled = true;

            // Simulate form submission
            setTimeout(() => {
                showToast();
                contactForm.reset();

                // Reset button
                submitBtn.innerHTML = '<i data-lucide="send" class="icon"></i> Send Message';
                submitBtn.disabled = false;
                if (window.lucide) lucide.createIcons();
            }, 1000);
        });
    }

    // Toast Notification
    function showToast() {
        const toast = document.getElementById('toast');
        if (!toast) return;
        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
        }, 5000);
    }

    // Toast Close Button
    const toastClose = document.getElementById('toastClose');
    if (toastClose) {
        toastClose.addEventListener('click', function () {
            const toast = document.getElementById('toast');
            if (toast) toast.classList.remove('show');
        });
    }

 // Back to Top Button
document.addEventListener("DOMContentLoaded", function () {
  const backToTop = document.getElementById("backToTop");

  if (backToTop) {
    // Show button on scroll
    window.addEventListener("scroll", function () {
      if (window.scrollY > 300) {
        backToTop.classList.add("show");
      } else {
        backToTop.classList.remove("show");
      }
    });

    // Smooth scroll to top
    backToTop.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }
});


    // Update Current Year in Footer
    const yearEl = document.getElementById('currentYear');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // Add CSS for loading spinner
    const style = document.createElement('style');
    style.textContent = `
        .loading-spinner {
            width: 1rem;
            height: 1rem;
            border: 2px solid transparent;
            border-top: 2px solid currentColor;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            display: inline-block;
            vertical-align: middle;
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);

    // Parallax Effect for Hero Section
    window.addEventListener('scroll', function () {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.floating-shape-1');
        const parallax2 = document.querySelector('.floating-shape-2');

        if (parallax) {
            parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
        if (parallax2) {
            parallax2.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });

    // Add hover effects to service cards
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.borderColor = 'var(--primary-gold)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.borderColor = 'transparent';
        });
    });

    // Initialize animations on page load
    setTimeout(() => {
        document.querySelectorAll('.fade-in').forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }, 100);

    console.log('Portfolio website loaded successfully! 🚀');

    // Handle external links
    document.querySelectorAll('a[href^="http"], a[href^="mailto:"], a[href^="tel:"]').forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('http')) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
        }
    });
});

// Additional utility functions
function scrollToSection(selector) {
    const element = document.querySelector(selector);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Timeline Animation Script
document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".timeline-item");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        } else {
          entry.target.classList.remove("visible");
        }
      });
    },
    {
      threshold: 0.3, // Trigger when 30% of the item is visible
    }
  );

  items.forEach((item) => {
    observer.observe(item);
  });
});





// Animate skill progress bars
// function initSkillBars() {
   
// }

// function animateSkillBars() {
//     const progressBars = document.querySelectorAll('.progress-fill');
    
//     progressBars.forEach(bar => {
//         const width = bar.getAttribute('data-width');
//         setTimeout(() => {
//             bar.style.width = width + '%';
//         }, 300);
//     });
// }

//   const menuToggle = document.getElementById("menu-toggle");
//   const mobileMenu = document.getElementById("mobileMenu");

//   menuToggle.addEventListener("click", () => {
//     mobileMenu.classList.toggle("active");
//   });


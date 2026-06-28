document.addEventListener('DOMContentLoaded', () => {
  const loadingScreen = document.getElementById('loading-screen');
  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;
  const progressBar = document.querySelector('.scroll-progress');
  const backToTop = document.querySelector('.back-to-top');
  const navLinks = document.querySelectorAll('.nav-link');
  const typedText = document.querySelector('.typed-text');
  const counters = document.querySelectorAll('.counter');

  const setTheme = (theme) => {
    body.setAttribute('data-theme', theme);
    localStorage.setItem('mj-theme', theme);
    const icon = themeToggle.querySelector('i');
    icon.className = theme === 'dark' ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
  };

  const savedTheme = localStorage.getItem('mj-theme') || 'dark';
  setTheme(savedTheme);

  themeToggle.addEventListener('click', () => {
    const nextTheme = body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
  });

  setTimeout(() => {
    loadingScreen.classList.add('hidden');
    setTimeout(() => loadingScreen.remove(), 700);
  }, 1400);

  const updateScrollProgress = () => {
    const scrollTop = window.scrollY;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const progress = height > 0 ? scrollTop / height : 0;
    progressBar.style.transform = `scaleX(${progress})`;
    backToTop.classList.toggle('show', scrollTop > 600);
  };

  window.addEventListener('scroll', updateScrollProgress, { passive: true });
  updateScrollProgress();

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          const href = link.getAttribute('href');
          link.classList.toggle('active', href === `#${entry.target.id}`);
        });
      }
    });
  }, { threshold: 0.55 });

  document.querySelectorAll('main section[id]').forEach((section) => sectionObserver.observe(section));

  navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const target = link.getAttribute('href');
      if (target && target.startsWith('#')) {
        event.preventDefault();
        const section = document.querySelector(target);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth', block: 'start' });
          window.history.replaceState(null, '', window.location.pathname + window.location.search);
        }
      }
    });
  });

  if (typedText) {
    new Typed(typedText, {
      strings: [
        'MMOM Candidate (UNIKL MIMET)',
        'Port & Terminal Operations',
        'Import Pricing Leadership',
        'Maritime & Logistics Strategy',
        'Gold Medalist — Bahria University'
      ],
      typeSpeed: 70,
      backSpeed: 45,
      backDelay: 1200,
      loop: true
    });
  }

  AOS.init({
    duration: 850,
    once: true,
    offset: 120
  });

  if (typeof particlesJS === 'function') {
    particlesJS('particles-js', {
      particles: {
        number: { value: 60, density: { enable: true, value_area: 900 } },
        color: { value: '#00c2ff' },
        shape: { type: 'circle' },
        opacity: { value: 0.35, random: true },
        size: { value: 2.5, random: true },
        line_linked: { enable: true, distance: 140, color: '#4fd1ff', opacity: 0.17, width: 1 },
        move: { enable: true, speed: 1.2, direction: 'none', random: true, straight: false, out_mode: 'out', bounce: false }
      },
      interactivity: {
        detect_on: 'canvas',
        events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' }, resize: true },
        modes: { repulse: { distance: 100, duration: 0.4 }, push: { particles_nb: 3 } }
      },
      retina_detect: true
    });
  }

  const animateCounter = (element) => {
    const target = parseFloat(element.dataset.target);
    const suffix = element.textContent.includes('CGPA') ? '' : '';
    const duration = 1400;
    const start = performance.now();

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const value = target * progress;
      element.textContent = target % 1 === 0 ? Math.floor(value).toString() : value.toFixed(2);
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  };

  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.8 });

  counters.forEach((counter) => counterObserver.observe(counter));
});

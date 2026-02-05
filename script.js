// AOS Animation
AOS.init({
  duration: 800,
  once: true,
  easing: 'ease-out'
});

// Particles.js Background
particlesJS("particles-js", {
  particles: {
    number: { value: 60, density: { enable: true, value_area: 800 } },
    color: { value: "#64ffda" },
    shape: { type: "circle" },
    opacity: { value: 0.5, random: true },
    size: { value: 3, random: true },
    line_linked: { enable: true, distance: 150, color: "#64ffda", opacity: 0.4, width: 1 },
    move: { enable: true, speed: 2, direction: "none", random: false, straight: false, out_mode: "out" }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: { enable: true, mode: "repulse" },
      onclick: { enable: true, mode: "push" }
    },
    modes: {
      repulse: { distance: 100, duration: 0.4 },
      push: { particles_nb: 4 }
    }
  },
  retina_detect: true
});

// ─── Final colorful small dot + visible tail cursor ───
const cursorDot  = document.querySelector('.cursor-dot');
const cursorTail = document.querySelector('.cursor-tail');

if (cursorDot && cursorTail) {
  let tailTimeout;

  window.addEventListener('mousemove', e => {
    cursorDot.style.left = `${e.clientX}px`;
    cursorDot.style.top  = `${e.clientY}px`;

    clearTimeout(tailTimeout);
    cursorTail.style.left = `${e.clientX}px`;
    cursorTail.style.top  = `${e.clientY}px`;
    cursorTail.style.opacity = '0.6';           // stronger visibility
    cursorTail.style.transform = 'translate(-50%, -50%) scale(1)';

    tailTimeout = setTimeout(() => {
      cursorTail.style.opacity = '0';
    }, 500);  // longer visible time = tail clearly seen
  });

  const interactive = document.querySelectorAll(
    'a, button, input, textarea, .btn, .skill-card, .project-card, .goal-card, .faq-item, .contact-item, .floating-icons a, .nav-menu a, #hamburger, .close-btn'
  );

  interactive.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorDot.classList.add('hover');
      cursorTail.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
      cursorDot.classList.remove('hover');
      cursorTail.classList.remove('hover');
    });
  });

  document.addEventListener('mouseleave', () => {
    cursorDot.style.opacity = '0';
    cursorTail.style.opacity = '0';
  });

  document.addEventListener('mouseenter', () => {
    cursorDot.style.opacity = '1';
    cursorTail.style.opacity = '0.6';
  });
}

// Header scroll effect
window.addEventListener('scroll', () => {
  document.querySelector('.header').classList.toggle('scrolled', window.scrollY > 50);
});

// Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const closeBtn = document.getElementById('closeMenu');

if (hamburger && mobileMenu && closeBtn) {
  function toggleMenu() {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('active');
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  hamburger.addEventListener('click', toggleMenu);
  closeBtn.addEventListener('click', toggleMenu);

  document.querySelectorAll('.mobile-nav-list a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  document.addEventListener('click', e => {
    if (mobileMenu.classList.contains('open') &&
        !mobileMenu.contains(e.target) &&
        !hamburger.contains(e.target)) {
      toggleMenu();
    }
  });

  // Hamburger to X animation
  const hamStyle = document.createElement('style');
  hamStyle.textContent = `
    .hamburger.active span:nth-child(1) { transform: translateY(11px) rotate(45deg); }
    .hamburger.active span:nth-child(2) { opacity: 0; }
    .hamburger.active span:nth-child(3) { transform: translateY(-11px) rotate(-45deg); }
  `;
  document.head.appendChild(hamStyle);
}

// Form submit alert (demo)
document.querySelector('.contact-form')?.addEventListener('submit', e => {
  e.preventDefault();
  alert('Message sent successfully!');
});

// FAQ accordion toggle
document.querySelectorAll('.faq-item').forEach(item => {
  const question = item.querySelector('.faq-question');
  const answer = item.querySelector('.faq-answer');
  const icon = item.querySelector('svg');

  if (question && answer && icon) {
    question.addEventListener('click', () => {
      const isOpen = answer.classList.contains('open');

      document.querySelectorAll('.faq-answer').forEach(a => {
        if (a !== answer) a.classList.remove('open');
      });
      document.querySelectorAll('.faq-question').forEach(q => {
        if (q !== question) q.classList.remove('open');
      });
      document.querySelectorAll('.faq-question svg').forEach(i => {
        if (i !== icon) i.classList.remove('open');
      });

      if (!isOpen) {
        question.classList.add('open');
        answer.classList.add('open');
        icon.classList.add('open');
      }
    });
  }
});
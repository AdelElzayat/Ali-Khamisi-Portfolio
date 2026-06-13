const body = document.body;
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme') || 'light';
body.setAttribute('data-theme', savedTheme);
if (savedTheme === 'dark') themeToggle.classList.add('dark');
themeToggle.addEventListener('click', () => {
  const current = body.getAttribute('data-theme');
  const next = current === 'light' ? 'dark' : 'light';
  body.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  themeToggle.classList.toggle('dark');
});

const typingEl = document.getElementById('typing');
const words = ['Logo Designer', 'Visual Designer', 'Creative/Art Director'];
let wordIdx = 0;
let charIdx = 0;
let isDeleting = false;
function typeLoop() {
  const current = words[wordIdx];
  if (!isDeleting) {
    typingEl.textContent = current.slice(0, charIdx + 1);
    charIdx++;
    if (charIdx === current.length) {
      isDeleting = true;
      setTimeout(typeLoop, 2000);
      return;
    }
    setTimeout(typeLoop, 80);
  } else {
    typingEl.textContent = current.slice(0, charIdx - 1);
    charIdx--;
    if (charIdx === 0) {
      isDeleting = false;
      wordIdx = (wordIdx + 1) % words.length;
      setTimeout(typeLoop, 600);
      return;
    }
    setTimeout(typeLoop, 40);
  }
}
typeLoop();

const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('nav');
menuBtn.addEventListener('click', () => {
  nav.classList.toggle('active');
  menuBtn.classList.toggle('active');
});
document.addEventListener('click', (e) => {
  if (!menuBtn.contains(e.target) && !nav.contains(e.target) && nav.classList.contains('active')) {
    nav.classList.remove('active');
    menuBtn.classList.remove('active');
  }
});
document.querySelectorAll('.nav-link').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('active');
    menuBtn.classList.remove('active');
  });
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

const header = document.getElementById('header');
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const current = window.scrollY;
  header.classList.toggle('scrolled', current > 50);
  lastScroll = current;
  updateActiveNav();
});

function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  let current = '';
  sections.forEach((section) => {
    const top = section.offsetTop - 150;
    const bottom = top + section.offsetHeight;
    if (window.scrollY >= top && window.scrollY < bottom) current = section.getAttribute('id');
  });
  navLinks.forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
}
updateActiveNav();

const revealElements = document.querySelectorAll('.section-header, .skill-group, .project-card, .service-card, .channel-card');
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fadeInUp 0.6s ease both';
        entry.target.style.opacity = '1';
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
);
revealElements.forEach((el) => {
  el.style.opacity = '0';
  observer.observe(el);
});

(function () {
  emailjs.init('');
})();
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const btn = this.querySelector('button[type="submit"]');
    const orig = btn.innerHTML;
    btn.innerHTML = '<span class="btn-text">Sending...</span><span class="btn-icon"><i class="fas fa-spinner fa-spin"></i></span>';
    btn.disabled = true;
    emailjs
      .sendForm('service_portfolio', 'template_sptxotc', this)
      .then(() => {
        alert('Message sent successfully!');
        contactForm.reset();
      })
      .catch((err) => {
        console.log('FAILED...', err);
        alert('Failed to send: ' + JSON.stringify(err));
      })
      .finally(() => {
        btn.innerHTML = orig;
        btn.disabled = false;
      });
  });
}

const modal = document.getElementById('modal');
const modalImg = document.getElementById('modalImg');
const modalClose = document.getElementById('modalClose');
function openModal(src) {
  modalImg.src = src;
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';
}
function closeModalFn() {
  modal.style.display = 'none';
  document.body.style.overflow = 'auto';
}
if (modal && modalImg && modalClose) {
  modalClose.addEventListener('click', closeModalFn);
  modal.addEventListener('click', (e) => { if (e.target === modal) closeModalFn(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && modal.style.display === 'block') closeModalFn(); });
}
const toast = document.getElementById('toast');
const toastMsg = document.getElementById('toastMsg');
let toastTimeout;
function showToast(msg) {
  toastMsg.textContent = msg || 'Copied!';
  if (toastTimeout) clearTimeout(toastTimeout);
  toast.classList.add('show');
  toastTimeout = setTimeout(() => toast.classList.remove('show'), 2000);
}
document.querySelectorAll('.channel-card[data-copy]').forEach((card) => {
  card.addEventListener('click', async () => {
    const text = card.getAttribute('data-copy');
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      card.classList.add('copied');
      showToast('Copied!');
      setTimeout(() => card.classList.remove('copied'), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  });
});

const glow = document.querySelector('.cursor-glow');
if (glow) {
  document.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
    if (!glow.classList.contains('active')) glow.classList.add('active');
  });
  document.addEventListener('mouseleave', () => glow.classList.remove('active'));
}
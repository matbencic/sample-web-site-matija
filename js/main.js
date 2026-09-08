// Lorena Fotografija — site scripts

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.querySelector('.main-nav');
if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Image placeholder handling.
// Any <img data-placeholder-label="..."> that fails to load (because the
// real photo hasn't been added to /images yet) gets swapped for a soft
// placeholder box with instructions, instead of a broken-image icon.
function showPlaceholder(img) {
  const wrapper = document.createElement('div');
  wrapper.className = 'img-placeholder';
  const label = document.createElement('span');
  label.textContent = img.getAttribute('data-placeholder-label') || 'Dodajte fotografiju';
  wrapper.appendChild(label);
  img.replaceWith(wrapper);
}

document.querySelectorAll('img[data-placeholder-label]').forEach((img) => {
  // The error may already have fired before this script ran (e.g. the
  // file simply doesn't exist yet), so check img.complete first...
  if (img.complete) {
    if (img.naturalWidth === 0) showPlaceholder(img);
  } else {
    // ...otherwise wait for it.
    img.addEventListener('error', () => showPlaceholder(img), { once: true });
  }
});

// Smooth scroll for in-page nav links
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    const targetId = link.getAttribute('href').slice(1);
    const target = document.getElementById(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

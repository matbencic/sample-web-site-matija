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

// Gallery pagination — shows 12 photos per page on desktop/web,
// 6 per page on mobile, with numbered page buttons (1, 2, 3, ...).
const galleryGrid = document.getElementById('gallery-grid');
const galleryPagination = document.getElementById('gallery-pagination');
if (galleryGrid && galleryPagination) {
  const galleryPageItems = Array.from(galleryGrid.querySelectorAll('.gallery-item'));
  const mobileQuery = window.matchMedia('(max-width: 900px)');
  let currentGalleryPage = 1;

  function galleryPageSize() {
    return mobileQuery.matches ? 6 : 12;
  }

  function renderGalleryPage(page) {
    const pageSize = galleryPageSize();
    const totalPages = Math.max(1, Math.ceil(galleryPageItems.length / pageSize));
    currentGalleryPage = Math.min(Math.max(1, page), totalPages);

    const start = (currentGalleryPage - 1) * pageSize;
    const end = start + pageSize;
    galleryPageItems.forEach((item, index) => {
      item.style.display = (index >= start && index < end) ? '' : 'none';
    });

    renderGalleryPagination(totalPages);
  }

  function renderGalleryPagination(totalPages) {
    galleryPagination.innerHTML = '';
    if (totalPages <= 1) return;
    for (let i = 1; i <= totalPages; i++) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'gallery-page-btn' + (i === currentGalleryPage ? ' active' : '');
      btn.textContent = String(i);
      btn.setAttribute('aria-label', `Stranica ${i}`);
      btn.addEventListener('click', () => {
        renderGalleryPage(i);
        document.getElementById('galerija').scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
      galleryPagination.appendChild(btn);
    }
  }

  renderGalleryPage(1);

  let galleryResizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(galleryResizeTimer);
    galleryResizeTimer = setTimeout(() => renderGalleryPage(1), 200);
  });
}

// Gallery lightbox — click any gallery photo to see it uncropped,
// full-size, with arrows to browse through the whole gallery.
const galleryImgs = Array.from(document.querySelectorAll('.gallery-item img'));
const lightbox = document.getElementById('lightbox');
if (galleryImgs.length && lightbox) {
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCounter = document.getElementById('lightbox-counter');
  const btnClose = document.getElementById('lightbox-close');
  const btnPrev = document.getElementById('lightbox-prev');
  const btnNext = document.getElementById('lightbox-next');
  let currentIndex = 0;

  function showImage(index) {
    currentIndex = (index + galleryImgs.length) % galleryImgs.length;
    const img = galleryImgs[currentIndex];
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxCounter.textContent = `${currentIndex + 1} / ${galleryImgs.length}`;
  }

  function openLightbox(index) {
    showImage(index);
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  galleryImgs.forEach((img, index) => {
    img.addEventListener('click', () => openLightbox(index));
  });

  btnClose.addEventListener('click', closeLightbox);
  btnPrev.addEventListener('click', () => showImage(currentIndex - 1));
  btnNext.addEventListener('click', () => showImage(currentIndex + 1));

  // Click the dark backdrop (but not the image itself) to close
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showImage(currentIndex - 1);
    if (e.key === 'ArrowRight') showImage(currentIndex + 1);
  });
}

// Contact form submission — sends the message to our Worker's
// /api/contact endpoint, which forwards it as an email via Resend.
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const data = {
      name: contactForm.name.value.trim(),
      email: contactForm.email.value.trim(),
      message: contactForm.message.value.trim(),
    };

    submitBtn.disabled = true;
    formStatus.textContent = 'Šaljem...';
    formStatus.className = 'form-status';

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await res.json();

      if (res.ok && result.ok) {
        formStatus.textContent = 'Hvala! Vaš upit je poslan — javit ćemo se uskoro.';
        formStatus.className = 'form-status form-status-success';
        contactForm.reset();
      } else {
        formStatus.textContent = result.error || 'Slanje nije uspjelo. Pokušajte ponovno.';
        formStatus.className = 'form-status form-status-error';
      }
    } catch (err) {
      formStatus.textContent = 'Slanje nije uspjelo. Provjerite internetsku vezu i pokušajte ponovno.';
      formStatus.className = 'form-status form-status-error';
    } finally {
      submitBtn.disabled = false;
    }
  });
}

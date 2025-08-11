// script.js

// Skrip utama
(() => {
  const slides = Array.from(document.querySelectorAll('.slide'));
  let current = 0;
  const container = document.getElementById('slidesContainer');

  document.body.classList.add('no-scroll');

  function refreshPositions() {
    slides.forEach(s => s.classList.remove('active', 'prev'));
    slides[current].classList.add('active');
    if (current > 0) {
      slides[current - 1].classList.add('prev');
    }
  }

  function goTo(index) {
    if (index < 0 || index >= slides.length) return;
    current = index;
    refreshPositions();
  }

  // Panggil goTo(0) setelah cover hilang untuk menampilkan slide pertama
  window.goTo = goTo;

  // ===== Logika Navigasi Swipe Horizontal =====
  let startX = null;
  container.addEventListener('touchstart', (ev) => {
    if (ev.touches.length !== 1) return;
    startX = ev.touches[0].clientX;
  }, { passive: true });

  container.addEventListener('touchend', (ev) => {
    if (startX === null) return;
    const endX = ev.changedTouches[0].clientX;
    const dx = startX - endX;

    if (Math.abs(dx) > 40) {
      if (dx > 0) goTo(current + 1);
      else goTo(current - 1);
    }
    startX = null;
  }, { passive: true });

  // ===== Logika Mencegah Swipe pada Area Komentar =====
  const slide9 = document.getElementById('slide9');

// Blokir event touchstart agar tidak merambat ke parent container
slide9.addEventListener('touchstart', (e) => {
  // Cek apakah sentuhan dimulai di dalam #comment-list
  if (e.target.closest('#comment-list')) {
    // Jika ya, hentikan event agar tidak sampai ke skrip utama
    e.stopPropagation();
    console.log("LOG: Touchstart di dalam #comment-list, event dihentikan.");
  }
}, { passive: false });
})();

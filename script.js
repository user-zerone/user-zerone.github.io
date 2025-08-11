// Script.js utama
(() => {
  const slides = Array.from(document.querySelectorAll('.slide'));
  let current = 0;
  const cover = document.getElementById('cover');
  const openBtn = document.getElementById('openBtn');
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

  openBtn.addEventListener('click', () => {
    openBtn.disabled = true;

    container.classList.add('show');
    cover.classList.add('fade-out');
    goTo(0);

    function onCoverTransitionEnd(e) {
      if (e.propertyName === 'opacity') {
        cover.style.display = 'none';
        document.body.classList.remove('no-scroll');
        cover.removeEventListener('transitionend', onCoverTransitionEnd);
      }
    }
    cover.addEventListener('transitionend', onCoverTransitionEnd);
  });

  // Swipe navigasi (Tidak ada perubahan, karena tidak ada konflik lagi)
  let startY = null;
  container.addEventListener('touchstart', (ev) => {
    if (ev.touches.length !== 1) return;
    startY = ev.touches[0].clientY;
  }, { passive: true });

  container.addEventListener('touchend', (ev) => {
    if (startY === null) return;
    const endY = ev.changedTouches[0].clientY;
    const dy = startY - endY;
    if (Math.abs(dy) > 40) {
      if (dy > 0) goTo(current + 1);
      else goTo(current - 1);
    }
    startY = null;
  }, { passive: true });

  // Cegah pull-to-refresh, tapi biarkan scroll horizontal
  container.addEventListener('touchmove', function(e) {
    if (e.target.closest('.comment-list')) {
      // Biarkan scroll horizontal berjalan, jangan dicegah
      return;
    }
    e.preventDefault();
  }, { passive: false });
})();

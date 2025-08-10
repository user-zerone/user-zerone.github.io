(() => {
  const slides = Array.from(document.querySelectorAll('.slide'));
  let current = 0;
  const cover = document.getElementById('cover');
  const openBtn = document.getElementById('openBtn');
  const container = document.getElementById('slidesContainer');

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

  // buka undangan: crossfade cover -> slides
  openBtn.addEventListener('click', () => {
    // proteksi klik ganda
    openBtn.disabled = true;

    // mulai fade-in slides dan fade-out cover secara bersamaan
    container.classList.add('show');   // slides mulai fade-in
    cover.classList.add('fade-out');  // cover mulai fade-out

    // tampilkan slide pertama segera agar fade-in menampilkan konten
    goTo(0);

    // saat transisi cover selesai (opacity), sembunyikan dari flow agar tidak tabable
    function onCoverTransitionEnd(e) {
      if (e.propertyName === 'opacity') {
        // sembunyikan total agar tidak mengambil event pointer
        cover.style.display = 'none';

        // bersihkan listener & re-enable tombol (jika perlu)
        cover.removeEventListener('transitionend', onCoverTransitionEnd);
        // tombol tidak perlu aktif lagi, tapi jika mau diaktifkan:
        // openBtn.disabled = false;
      }
    }
    cover.addEventListener('transitionend', onCoverTransitionEnd);
  });

  // touch navigation (tetap berfungsi)
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

  // mencegah pull-to-refresh di Chrome mobile
  container.addEventListener('touchmove', function(e) {
    e.preventDefault();
  }, { passive: false });

  // jangan sembunyikan slides lewat JS lagi — CSS atur visibilitas awal
  // container.style.display = 'none';
})();

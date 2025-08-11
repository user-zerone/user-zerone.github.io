// cover.js
(() => {
  const cover = document.getElementById('cover');
  const openBtn = document.getElementById('openBtn');
  const container = document.getElementById('slidesContainer');

  openBtn.addEventListener('click', () => {
    openBtn.disabled = true;

    container.classList.add('show');
    cover.classList.add('fade-out');

    // Panggil goTo(1) untuk langsung menampilkan slide ke-2 (indeks 1)
    // setelah cover hilang.
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
})();

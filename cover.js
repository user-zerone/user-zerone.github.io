// cover.js
(() => {
  const cover = document.getElementById('cover');
  const openBtn = document.getElementById('openBtn');
  const container = document.getElementById('slidesContainer');

  function handleOpen() {
    openBtn.disabled = true;

    container.classList.add('show');
    cover.classList.add('fade-out');

    // Panggil goTo(0) untuk menampilkan slide pertama (indeks 0)
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
  }

  // Event listener utama untuk tombol "Buka Undangan"
  openBtn.addEventListener('click', handleOpen);

  // --- LOGIKA BARU UNTUK LAYAR LANDSCAPE ---
  function isLandscape() {
    // Periksa jika lebar lebih besar dari tinggi
    // dan jika ini adalah perangkat seluler
    return window.matchMedia("(orientation: landscape)").matches && window.innerWidth > window.innerHeight;
  }

  // Event listener untuk seluruh area cover
  cover.addEventListener('click', (e) => {
    // Periksa apakah layar dalam mode landscape
    // dan user tidak menekan tombol 'Buka Undangan' itu sendiri
    if (isLandscape() && e.target !== openBtn) {
      handleOpen();
    }
  });

})();

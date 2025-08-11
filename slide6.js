/* =====================
   SLIDE 6 - GALERI PREMIUM
   ===================== */

document.addEventListener("DOMContentLoaded", function () {
  const galleryContainer = document.getElementById('premium-gallery');

  // Buat struktur galeri
  galleryContainer.innerHTML = `
    <div class="gallery-container">
      <img id="mainImage" src="img/premium1.jpg" alt="Foto Utama" class="main-photo">
      <div class="thumbnail-wrapper">
        <button class="arrow-btn" id="leftArrow">&#10094;</button>
        <div class="thumbnail-container" id="thumbnailContainer"></div>
        <button class="arrow-btn" id="rightArrow">&#10095;</button>
      </div>
    </div>
  `;

  const totalImages = 10;
  const mainImage = document.getElementById('mainImage');
  const thumbnailContainer = document.getElementById('thumbnailContainer');

  // Generate thumbnail otomatis
  for (let i = 1; i <= totalImages; i++) {
    const thumb = document.createElement('img');
    thumb.src = `img/premium${i}.jpg`;
    thumb.alt = `Premium ${i}`;
    if (i === 1) thumb.classList.add('active');

    thumb.addEventListener('click', function () {
      document.querySelectorAll('.thumbnail-container img').forEach(img => img.classList.remove('active'));
      this.classList.add('active');
      mainImage.style.opacity = '0';
      setTimeout(() => {
        mainImage.src = this.src;
        mainImage.style.opacity = '1';
      }, 200);
    });

    thumbnailContainer.appendChild(thumb);
  }

  // Fungsi geser thumbnail dengan tombol
  document.getElementById('leftArrow').addEventListener('click', () => {
    thumbnailContainer.scrollBy({ left: -150, behavior: 'smooth' });

  });

  document.getElementById('rightArrow').addEventListener('click', () => {
    thumbnailContainer.scrollBy({ left: 150, behavior: 'smooth' });

  });

  // ==== FUNGSI SWIPE UNTUK THUMBNAIL ====
  let isDown = false;
  let startX;
  let scrollLeft;

  thumbnailContainer.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - thumbnailContainer.offsetLeft;
    scrollLeft = thumbnailContainer.scrollLeft;
  });

  thumbnailContainer.addEventListener('mouseleave', () => {
    isDown = false;
  });

  thumbnailContainer.addEventListener('mouseup', () => {
    isDown = false;
  });

  thumbnailContainer.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - thumbnailContainer.offsetLeft;
    const walk = (x - startX) * 1.5; // kecepatan geser
    thumbnailContainer.scrollLeft = scrollLeft - walk;
  });

  // Versi untuk layar sentuh (HP)
  let touchStartX = 0;
  let touchScrollLeft = 0;

  thumbnailContainer.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].pageX;
    touchScrollLeft = thumbnailContainer.scrollLeft;
  });

  thumbnailContainer.addEventListener('touchmove', (e) => {
    const touchX = e.touches[0].pageX;
    const walk = (touchX - touchStartX) * 1.5;
    thumbnailContainer.scrollLeft = touchScrollLeft - walk;
  });
});

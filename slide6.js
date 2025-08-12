/* =====================
   SLIDE 6 - GALERI PREMIUM (Tampilan Grid)
   ===================== */

document.addEventListener("DOMContentLoaded", function () {
  const slide6 = document.getElementById('slide6');

  // Pastikan skrip hanya berjalan di slide 6
  if (!slide6) return;
  
  const galleryContainer = document.createElement('div');
  galleryContainer.id = 'premium-gallery-grid';
  galleryContainer.className = 'gallery-grid';
  slide6.appendChild(galleryContainer);

  const totalImages = 12;
  
  // Buat div untuk foto utama
  const mainPhotoDiv = document.createElement('div');
  mainPhotoDiv.className = 'main-photo-container';
  const mainImage = document.createElement('img');
  mainImage.id = 'mainImage';
  mainImage.src = 'img/premium1.jpg'; // Tampilkan foto pertama sebagai default
  mainPhotoDiv.appendChild(mainImage);
  galleryContainer.appendChild(mainPhotoDiv);

  // Buat div untuk thumbnail grid
  const thumbnailGrid = document.createElement('div');
  thumbnailGrid.className = 'thumbnail-grid';
  galleryContainer.appendChild(thumbnailGrid);

  // Generate thumbnail otomatis
  for (let i = 1; i <= totalImages; i++) {
    const thumb = document.createElement('img');
    thumb.src = `img/premium${i}.jpg`;
    thumb.alt = `Premium ${i}`;
    if (i === 1) thumb.classList.add('active');

    thumb.addEventListener('click', function () {
      // Hapus kelas 'active' dari semua thumbnail
      document.querySelectorAll('.thumbnail-grid img').forEach(img => img.classList.remove('active'));
      
      // Tambahkan kelas 'active' ke thumbnail yang baru diklik
      this.classList.add('active');
      
      // Efek fade-in/fade-out untuk foto utama
      mainImage.style.opacity = '0';
      setTimeout(() => {
        mainImage.src = this.src;
        mainImage.style.opacity = '1';
      }, 200);
    });

    thumbnailGrid.appendChild(thumb);
  }
});

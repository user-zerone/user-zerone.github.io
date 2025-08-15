(() => {
  const slide4 = document.querySelectorAll('.slide')[4].querySelector('.inner');

  slide4.innerHTML = `
    <h2 class="section-title">Detail Acara</h2>
    
    <div class="event-detail">
      <p><strong>Acara:</strong> Akad & Resepsi</p>
      <p><strong>Waktu:</strong> 5 April 2026 • 10.00 WIB s.d selesai</p>
      <p><strong>Tempat:</strong> Tasik, Rumah Cici</p>
    </div>

    <div class="countdown" id="countdown-timer">
      <span class="time-box"><span id="days">00</span><small>Hari</small></span>
      <span class="time-box"><span id="hours">00</span><small>Jam</small></span>
      <span class="time-box"><span id="minutes">00</span><small>Menit</small></span>
      <span class="time-box"><span id="seconds">00</span><small>Detik</small></span>
    </div>

    <div class="event-map">
      <a href="https://maps.app.goo.gl/wy5CNYcC6jJnFeY77" target="_blank">
        📍 Lihat Lokasi di Google Maps
      </a>
    </div>
    <iframe class="event-map-iframe" 
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.568461461937!2d108.25608677464095!3d-7.354664872412581!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwMjEnMTYuOCJTIDEwOMKwMTUnMjkuMyJF!5e0!3m2!1sid!2sid!4v1623838428383!5m2!1sid!2sid"
      allowfullscreen="" 
      loading="lazy">
    </iframe>

  `;

  // Countdown Timer
  const targetDate = new Date("2026-04-05T10:00:00+07:00").getTime();

  const timer = setInterval(() => {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance <= 0) {
      clearInterval(timer);
      document.getElementById("countdown-timer").innerHTML = "<p>Acara Sedang Berlangsung 🎉</p>";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = String(days).padStart(2, "0");
    document.getElementById("hours").innerText = String(hours).padStart(2, "0");
    document.getElementById("minutes").innerText = String(minutes).padStart(2, "0");
    document.getElementById("seconds").innerText = String(seconds).padStart(2, "0");
  }, 1000);
})();

(() => {
  const slide1 = document.querySelector('#slide1 .inner');

  slide1.innerHTML = `
    <div class="parallax-bg" style="background-image: url('img/prewedding-bg.jpg');"></div>

    <div class="content-wrapper">
      

      <h2 class="greeting">Assalamu’alaikum Warahmatullahi Wabarakatuh</h2>
      <p class="section-text">
        Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud mengundang Bapak/Ibu/Saudara/i
        untuk hadir dan memberikan doa restu pada acara pernikahan kami.
      </p>

      <div class="photo-frame">
        <img src="img/foto-halaman1.jpg" alt="Foto Prewedding" />
      </div>

      <p class="closing-text">
        Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i
        berkenan hadir.
      </p>
    </div>
  `;
})();

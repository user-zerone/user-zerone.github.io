(() => {
  const slide7 = document.querySelectorAll('.slide')[7].querySelector('.inner');

  slide7.innerHTML = `
  <h2 id="gift-title" class="section-title">Kirim Hadiah</h2>
<p class="gift-intro">
  Kehadiran & doa Anda sudah sangat berarti. Jika berkenan berbagi tanda kasih,
  berikut adalah detail yang bisa digunakan. Terima kasih 🙏
</p>

<div class="gift-grid">
  <article class="gift-card" aria-label="Transfer Bank">
    <div class="gift-card-header">
      <div class="gift-card-icon" aria-hidden="true">🏦</div>
      <h3>Transfer Bank</h3>
    </div>
    <div class="bank-rows">
      <div class="bank-row">
        <span class="label">Nama</span>
        <span class="value">Yudha</span>
      </div>
      <div class="bank-row">
        <span class="label">Bank</span>
        <span class="value">BJB</span>
      </div>
      <div class="bank-row">
        <span class="label">No. Rekening</span>
        <span class="value selectable" data-copy="123xxx">123xxx</span>
      </div>
      <div class="actions">
        <button class="btn copy-btn" data-copy-target="[data-copy='123xxx']">Salin No. Rek</button>
      </div>

      <hr class="bank-divider">

      <div class="bank-row">
        <span class="label">Nama</span>
        <span class="value">Cici Suparti</span>
      </div>
      <div class="bank-row">
        <span class="label">Bank</span>
        <span class="value">BNI</span>
      </div>
      <div class="bank-row">
        <span class="label">No. Rekening</span>
        <span class="value selectable" data-copy="568xxx">568xxx</span>
      </div>
      <div class="actions">
        <button class="btn copy-btn" data-copy-target="[data-copy='568xxx']">Salin No. Rek</button>
      </div>
    </div>
    <p class="hint">*Silakan sesuaikan nominal sesuai keikhlasan.</p>
  </article>
</div>

<div class="closing-note">
  Terima kasih atas cinta dan doanya. Semoga kebaikan Anda dibalas berlipat ganda. 💙
</div>

<div class="toast" role="status" aria-live="polite">Tersalin ke papan klip</div>

  `;

  // === Interaksi: Copy to clipboard ===
  const showToast = () => {
    const t = slide7.querySelector('.toast');
    t.classList.add('show');
    clearTimeout(showToast._to);
    showToast._to = setTimeout(() => t.classList.remove('show'), 1600);
  };

  slide7.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const selector = btn.getAttribute('data-copy-target');
      const el = slide7.querySelector(selector);
      if (!el) return;
      const text = el.dataset.copy || el.textContent.trim();
      try {
        await navigator.clipboard.writeText(text);
        showToast();
      } catch {
        // fallback
        const ta = document.createElement('textarea');
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        ta.remove();
        showToast();
      }
    });
  });
})();

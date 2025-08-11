import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// Konfigurasi Supabase
const supabaseUrl = 'https://swpznbhjzqiiefxckhbv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN3cHpuYmhqenFpaWVmeGNraGJ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQxODE2MDksImV4cCI6MjA2OTc1NzYwOX0.cxig_bDIC6v6_0EgjB716v2jRMcrWIgoQ3p9FF3FbyU';
const client = createClient(supabaseUrl, supabaseKey);

const slide9Inner = document.querySelector("#slide9 .inner");

// HTML untuk formulir dan judul komentar
slide9Inner.innerHTML = `
  <h2 class="rsvp-title">Konfirmasi Kehadiran</h2>
  <form id="rsvp-form" class="rsvp-form">
    <input type="text" name="nama" placeholder="Nama Anda" required />
    <select name="kehadiran" required>
      <option value="">-- Pilih Kehadiran --</option>
      <option value="hadir">✅ Akan Hadir</option>
      <option value="tidak">❌ Tidak Hadir</option>
      <option value="ragu">🤔 Ragu-ragu</option>
    </select>
    <textarea name="pesan" placeholder="Pesan atau ucapan..."></textarea>
    <button type="submit">Kirim</button>
    <p id="status" class="status-msg"></p>
  </form>

  <h3 class="comment-title">Ucapan dari Tamu</h3>
  <div id="comment-list" class="comment-list"></div>
`;

const form = document.getElementById("rsvp-form");
const status = document.getElementById("status");
const commentList = document.getElementById("comment-list");

const statusMap = {
  hadir: "✅ Akan Hadir",
  tidak: "❌ Tidak Hadir",
  ragu: "🤔 Ragu-ragu"
};

// Fungsi memuat komentar
async function loadComments() {
  const { data, error } = await client
    .from("db")
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !data) {
    commentList.innerHTML = "<p>Gagal memuat komentar.</p>";
    console.error("Gagal memuat komentar:", error);
    return;
  }
  
  // Memetakan data menjadi HTML
  const allHtml = data.map(c => `
    <div class="single-comment">
      <div class="comment-header">
        <span class="emoji">❤️</span>
        <div>
          <p><strong>${c.name}</strong> <span class="status-label">${statusMap[c.Kehadiran] || c.Kehadiran}</span></p>
          <p class="comment-text">${c.comment || ""}</p>
        </div>
      </div>
    </div>
  `).join('');

  commentList.innerHTML = allHtml;
}

// Event submit form
form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const name = form.nama.value.trim();
  const Kehadiran = form.kehadiran.value;
  const comment = form.pesan.value.trim();

  if (!name || !Kehadiran) {
    status.innerText = "❌ Harap isi semua bidang!";
    return;
  }
  
  status.innerText = "⏳ Mengirim...";
  
  const { error } = await client
    .from("db")
    .insert([{ name, Kehadiran, comment }]);

  if (!error) {
    status.innerText = "✅ Terima kasih atas konfirmasinya!";
    form.reset();
    loadComments();
  } else {
    console.error(error);
    status.innerText = "❌ Gagal mengirim. Silakan coba lagi.";
  }
});

// ====== LOGIKA UNTUK MENCEGAH SWIPE HORIZONTAL DI DALAM KOMENTAR ======
let startX = 0;
let startY = 0;

commentList.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
  startY = e.touches[0].clientY;
}, { passive: true });

commentList.addEventListener('touchmove', (e) => {
  const dx = Math.abs(e.touches[0].clientX - startX);
  const dy = Math.abs(e.touches[0].clientY - startY);

  // Jika pergerakan horizontal (dx) lebih besar dari pergerakan vertikal (dy)
  // maka kita cegah perambatan event
  if (dx > dy) {
    e.stopPropagation();
  }
}, { passive: false });

// Muat komentar saat pertama kali
loadComments();

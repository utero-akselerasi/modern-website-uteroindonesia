// Decision-tree data for the floating chatbot.
// Each node represents one "state" in the conversation.
// `options` can either link to another node (`nextNode`) or open an external URL (`href`).

export interface ChatOption {
  label: string;
  nextNode?: string;
  href?: string;
}

export interface ChatNode {
  botMessages: string[];
  options: ChatOption[];
}

export const CHATBOT_AVATAR = "/images/photos/3-pak-dadik.webp";
export const CHATBOT_NAME = "Utero Indonesia";
export const CHATBOT_SUBTITLE = "Brand Consultant & Creative Agency";

export const chatFlow: Record<string, ChatNode> = {
  // ─── Root ───────────────────────────────────────────────
  start: {
    botMessages: [
      "Halo! 👋 Selamat datang di Utero Indonesia.",
      "Kami siap membantu kebutuhan branding & kreatif Anda. Silakan pilih topik di bawah ini.",
    ],
    options: [
      { label: "Layanan apa saja?", nextNode: "layanan" },
      { label: "Divisi Utero", nextNode: "divisi" },
      { label: "Tentang Utero", nextNode: "tentang" },
      { label: "Hubungi langsung", nextNode: "kontak" },
    ],
  },

  // ─── Layanan ────────────────────────────────────────────
  layanan: {
    botMessages: [
      "Kami menawarkan layanan utama untuk membangun brand yang kuat dan terlindungi:",
      "1️⃣ **Diskusi Strategis** — Konsultasi mendalam untuk memetakan masa depan brand Anda.\n2️⃣ **Identitas & Arahan Visual** — Membangun bahasa visual yang khas.\n3️⃣ **Mentoring Hukum & HAKI** — Melindungi aset kekayaan intelektual Anda.\n4️⃣ **Workshop Brand** — Melatih tim Anda mengeksekusi visi brand.",
      "Mau tahu lebih detail tentang layanan mana?",
    ],
    options: [
      { label: "Diskusi Strategis", nextNode: "layanan_diskusi" },
      { label: "Identitas Visual", nextNode: "layanan_visual" },
      { label: "Hukum & HAKI", nextNode: "layanan_haki" },
      { label: "Workshop Brand", nextNode: "layanan_workshop" },
      { label: "Kembali", nextNode: "start" },
    ],
  },
  layanan_diskusi: {
    botMessages: [
      "💬 **Diskusi Strategis**",
      "Konsultasi mendalam untuk memetakan masa depan brand Anda dan mengungkap potensi tersembunyi. Kami menjadi 'teman berpikir' untuk menemukan DNA bisnis Anda.",
      "Konsultasi pertama GRATIS! Mau jadwalkan sesi?",
    ],
    options: [
      { label: "Jadwalkan Konsultasi", href: "https://wa.me/6281999900900?text=Halo%20Utero%2C%20saya%20ingin%20menjadwalkan%20sesi%20Diskusi%20Strategis." },
      { label: "Layanan lainnya", nextNode: "layanan" },
      { label: "Kembali", nextNode: "start" },
    ],
  },
  layanan_visual: {
    botMessages: [
      "🎨 **Identitas & Arahan Visual**",
      "Membangun bahasa visual yang khas dan mengkomunikasikan nilai inti brand Anda secara instan — mulai dari logo, brand guidelines, hingga seluruh aset visual.",
    ],
    options: [
      { label: "Konsultasi Sekarang", href: "https://wa.me/6281999900900?text=Halo%20Utero%2C%20saya%20ingin%20konsultasi%20soal%20Identitas%20Visual." },
      { label: "Layanan lainnya", nextNode: "layanan" },
      { label: "Kembali", nextNode: "start" },
    ],
  },
  layanan_haki: {
    botMessages: [
      "⚖️ **Mentoring Hukum & HAKI**",
      "Melindungi aset kekayaan intelektual Anda untuk menjamin keamanan bisnis jangka panjang. Kami memastikan brand Anda bukan hanya kuat secara visual tapi juga aman secara legal.",
    ],
    options: [
      { label: "Konsultasi Sekarang", href: "https://wa.me/6281999900900?text=Halo%20Utero%2C%20saya%20ingin%20konsultasi%20Hukum%20%26%20HAKI." },
      { label: "Layanan lainnya", nextNode: "layanan" },
      { label: "Kembali", nextNode: "start" },
    ],
  },
  layanan_workshop: {
    botMessages: [
      "🎯 **Workshop Brand**",
      "Melatih tim Anda untuk mewujudkan brand dan mengeksekusi visi secara efektif. Program yang dirancang sesuai kebutuhan perusahaan Anda.",
    ],
    options: [
      { label: "Konsultasi Sekarang", href: "https://wa.me/6281999900900?text=Halo%20Utero%2C%20saya%20ingin%20tahu%20tentang%20Workshop%20Brand." },
      { label: "Layanan lainnya", nextNode: "layanan" },
      { label: "Kembali", nextNode: "start" },
    ],
  },

  // ─── Divisi ─────────────────────────────────────────────
  divisi: {
    botMessages: [
      "Utero Indonesia memiliki **7 divisi inti** yang saling mendukung:",
      "🔴 Utero Consulting\n🔴 Utero Advertising\n🔴 Utero Digital\n🔴 Utero Technology\n🔴 Utero Event Organizer\n🔴 Utero Signage\n🔴 Utero Merchandise",
      "Setiap divisi memiliki tim spesialis yang siap mengerjakan kebutuhan brand Anda secara menyeluruh.",
    ],
    options: [
      { label: "Konsultasi", nextNode: "kontak" },
      { label: "Kembali", nextNode: "start" },
    ],
  },

  // ─── Tentang ────────────────────────────────────────────
  tentang: {
    botMessages: [
      "🏢 **Tentang Utero Indonesia**",
      "Utero Indonesia berdiri sejak tahun **1998**, bermula dari masa krisis moneter yang justru menempa semangat untuk bertahan.",
      "Dengan pengalaman lebih dari **25 tahun**, kami dikenal sebagai \"Pabrik Ide dan Konsep\" — bukan hanya memberi logo atau gambar bagus, tapi menjadi teman berpikir untuk menemukan nyawa dan DNA bisnis Anda.",
    ],
    options: [
      { label: "Lihat Portofolio", href: "https://drive.google.com/file/d/1ZNCF85avgIIQn9nC-HX6FjcE_gkL7N8j/view" },
      { label: "Lokasi Kantor", nextNode: "lokasi" },
      { label: "Jam Operasional", nextNode: "jam" },
      { label: "Hubungi Kami", nextNode: "kontak" },
      { label: "Kembali", nextNode: "start" },
    ],
  },

  // ─── Lokasi ─────────────────────────────────────────────
  lokasi: {
    botMessages: [
      "📍 **Lokasi Kantor Kami:**",
      "Rumah Merah OXYZ\nJl. Bantaran 1 No. 25, Tulusrejo\nKota Malang, Jawa Timur 65141",
      "Pintu kami selalu terbuka untuk teman-teman yang ingin berdiskusi! ☕",
    ],
    options: [
      { label: "Lihat di Google Maps", href: "https://maps.app.goo.gl/YVbR1xfxBiUVWCdM9" },
      { label: "Hubungi Kami", nextNode: "kontak" },
      { label: "Kembali", nextNode: "start" },
    ],
  },

  // ─── Jam Operasional ───────────────────────────────────
  jam: {
    botMessages: [
      "🕐 **Jam Operasional:**",
      "Senin – Jumat: 08.00 – 17.00 WIB\nSabtu – Minggu: Tutup",
      "Untuk konsultasi di luar jam kerja, silakan hubungi kami via WhatsApp dan kami akan membalas secepat mungkin.",
    ],
    options: [
      { label: "Hubungi via WhatsApp", href: "https://wa.me/6281999900900?text=Halo%20Utero%2C%20saya%20ingin%20menjadwalkan%20konsultasi." },
      { label: "Kembali", nextNode: "start" },
    ],
  },

  // ─── Kontak ─────────────────────────────────────────────
  kontak: {
    botMessages: [
      "📞 Silakan pilih cara menghubungi kami yang paling nyaman untuk Anda:",
    ],
    options: [
      { label: "WhatsApp", href: "https://wa.me/6281999900900?text=Halo%20Utero%2C%20aku%20mendapatkan%20informasi%20dari%20Websitenya%20%2Auteroindonesia.com%2A.%0AIngin%20bertanya%20nih%20%3F%20" },
      { label: "Email", href: "mailto:info@uteroindonesia.com" },
      { label: "Instagram", href: "https://instagram.com/uteromalang" },
      { label: "YouTube", href: "https://youtube.com/@uteromalang" },
      { label: "Kembali", nextNode: "start" },
    ],
  },
};

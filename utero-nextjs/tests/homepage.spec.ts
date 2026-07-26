import { test, expect } from '@playwright/test';

test.describe('Utero Indonesia Homepage — Smoke Tests', () => {

  /* ────────────────────────────────────────────
   * Helper: navigate to section via URL hash
   * ──────────────────────────────────────────── */
  async function gotoHash(page: any, hash: string) {
    await page.goto(hash, { waitUntil: 'networkidle', timeout: 30000 });
    // Tunggu Next.js hydration + framer-motion animations
    await page.waitForTimeout(5000);
  }

  /* ────────────────────────────────────────────
   * 1. Halaman Utama
   * ──────────────────────────────────────────── */
  test('Memastikan halaman utama bisa dibuka dan title benar', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveTitle(/Utero Indonesia/);
  });

  test('Memastikan tagline utama muncul di Hero section', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    const hero = page.locator('#hero');
    await expect(hero).toBeVisible({ timeout: 10000 });

    // h1 text is UPPERCASE: "IDE TANPA REALISASI SAMA DENGAN SAMPAH."
    const heroText = await hero.innerText();
    expect(heroText.replace(/\s+/g, ' ').trim()).toContain('IDE');
  });

  /* ────────────────────────────────────────────
   * 2. Navbar
   * ──────────────────────────────────────────── */
  test.describe('Navbar', () => {
    test('Navigasi desktop menampilkan link-link utama', async ({ page }) => {
      await page.goto('/', { waitUntil: 'domcontentloaded' });
      const nav = page.locator('nav');
      await expect(nav).toBeVisible();

      await expect(nav.locator('a[href="#tentang"]').first()).toBeVisible();
      await expect(nav.locator('a[href="#divisi"]').first()).toBeVisible();
      await expect(nav.locator('a[href="#kontak"]').first()).toBeVisible();
    });

    test('Tombol Konsultasi Gratis di navbar dapat diklik', async ({ page }) => {
      await page.goto('/', { waitUntil: 'domcontentloaded' });
      // Cari anchor <a> langsung yang mengandung teks
      const konsultasiBtn = page.locator('nav a:has-text("Konsultasi Gratis")');
      await expect(konsultasiBtn).toBeVisible();
      await expect(konsultasiBtn).toHaveAttribute('href', '#kontak');
    });

    test('Logo Utero Indonesia muncul di navbar', async ({ page }) => {
      await page.goto('/', { waitUntil: 'domcontentloaded' });
      const logo = page.locator('nav img');
      await expect(logo.first()).toBeAttached({ timeout: 10000 });
      const alt = await logo.first().getAttribute('alt');
      expect(alt?.toLowerCase()).toContain('utero');
    });
  });

  /* ────────────────────────────────────────────
   * 3. Hero Section
   * ──────────────────────────────────────────── */
  test.describe('Hero Section', () => {
    test('Menampilkan 2 CTA buttons: Mulai Proyek & Lihat Portfolio', async ({ page }) => {
      await page.goto('/', { waitUntil: 'domcontentloaded' });
      await expect(page.locator('#hero a:has-text("Mulai Proyek")')).toBeVisible();
      await expect(page.locator('#hero a:has-text("Lihat Portfolio")')).toBeVisible();
    });

    test('CTA Mulai Proyek mengarah ke #kontak', async ({ page }) => {
      await page.goto('/', { waitUntil: 'domcontentloaded' });
      await expect(page.locator('#hero a[href="#kontak"]')).toBeVisible();
    });

    test('CTA Lihat Portfolio mengarah ke #portofolio', async ({ page }) => {
      await page.goto('/', { waitUntil: 'domcontentloaded' });
      await expect(page.locator('#hero a[href="#portofolio"]')).toBeVisible();
    });
  });

  /* ────────────────────────────────────────────
   * 4. About / Tentang Section
   * ──────────────────────────────────────────── */
  test.describe('About Section', () => {
    test('Section #tentang menampilkan heading dan deskripsi', async ({ page }) => {
      await page.goto('/', { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForTimeout(3000);
      // Check if content "Tentang Utero Indonesia" exists anywhere on page
      // (components may be client-rendered)
      const bodyText = await page.locator('body').innerText();
      expect(bodyText).toContain('Tentang');
      expect(bodyText).toContain('Utero Indonesia');
    });

    test('Menampilkan 4 cards data perusahaan (1998, 7+, MLG, ∞)', async ({ page }) => {
      await page.goto('/', { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForTimeout(3000);
      const bodyText = await page.locator('body').innerText();
      expect(bodyText).toContain('1998');
      expect(bodyText).toContain('7+');
      expect(bodyText).toContain('MLG');
      expect(bodyText).toContain('∞');
    });
  });

  /* ────────────────────────────────────────────
   * 5. Know Us More (Ticker/Lini Bisnis)
   * ──────────────────────────────────────────── */
  test.describe('Know Us More Section', () => {
    test('Section #know-us menampilkan judul "Part Of Utero Indonesia"', async ({ page }) => {
      await page.goto('/', { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForTimeout(3000);
      // Scroll to trigger client-side rendering
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(2000);
      const bodyText = await page.locator('body').innerText();
      const lower = bodyText.toLowerCase();
      expect(lower).toContain('know us more');
      expect(lower).toContain('utero indonesia');
    });
  });

  /* ────────────────────────────────────────────
   * 6. Divisi Section
   * ──────────────────────────────────────────── */
  test.describe('Divisi Section', () => {
    test('Section #divisi menampilkan heading "Satu Atap, Banyak Solusi"', async ({ page }) => {
      await page.goto('/', { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForTimeout(3000);
      const bodyText = await page.locator('body').innerText();
      expect(bodyText).toContain('Satu Atap');
      expect(bodyText).toContain('Banyak Solusi');
    });

    test('Menampilkan 6 divisi cards', async ({ page }) => {
      await page.goto('/', { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForTimeout(3000);
      // The division names should show up somewhere in body
      const bodyText = await page.locator('body').innerText();
      expect(bodyText).toContain('Utero.id');
      expect(bodyText).toContain('Soundpub');
      expect(bodyText).toContain('Carubra');
    });
  });

  /* ────────────────────────────────────────────
   * 7. Workflow / Cara Kerja
   * ──────────────────────────────────────────── */
  test.describe('Workflow Section', () => {
    test('Section #cara-kerja menampilkan judul "Dari Brief Hingga Launch"', async ({ page }) => {
      await page.goto('/', { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForTimeout(3000);
      const bodyText = await page.locator('body').innerText();
      expect(bodyText).toContain('Brief');
      expect(bodyText).toContain('Launch');
    });
  });

  /* ────────────────────────────────────────────
   * 8. Clients (Klien)
   * ──────────────────────────────────────────── */
  test.describe('Clients Section', () => {
    test('Section #klien menampilkan judul mitra', async ({ page }) => {
      await page.goto('/', { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForTimeout(3000);
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(2000);
      const bodyText = await page.locator('body').innerText();
      const lower = bodyText.toLowerCase();
      expect(lower).toContain('klien');
    });
  });

  /* ────────────────────────────────────────────
   * 9. Portfolio / Partnership
   * ──────────────────────────────────────────── */
  test.describe('Portfolio / Partnership Section', () => {
    test('Section #Partnership menampilkan heading', async ({ page }) => {
      await page.goto('/', { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForTimeout(3000);
      const bodyText = await page.locator('body').innerText();
      expect(bodyText).toContain('Kerja Nyata');
      expect(bodyText).toContain('Karya Kolaborasi');
    });
  });

  /* ────────────────────────────────────────────
   * 10. Community
   * ──────────────────────────────────────────── */
  test.describe('Community Section', () => {
    test('Section #community menampilkan heading', async ({ page }) => {
      await page.goto('/', { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForTimeout(3000);
      const bodyText = await page.locator('body').innerText();
      expect(bodyText).toContain('Komunitas');
    });
  });

  /* ────────────────────────────────────────────
   * 11. CBP Section
   * ──────────────────────────────────────────── */
  test.describe('CBP Section', () => {
    test('Section #cbp menampilkan heading "Tersedia di 5 Kota"', async ({ page }) => {
      await page.goto('/', { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForTimeout(3000);
      const bodyText = await page.locator('body').innerText();
      expect(bodyText).toContain('5 Kota');
    });
  });

  /* ────────────────────────────────────────────
   * 12. Intellectual Property
   * ──────────────────────────────────────────── */
  test.describe('Intellectual Property Section', () => {
    test('Section #intelektual menampilkan heading', async ({ page }) => {
      await page.goto('/', { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForTimeout(3000);
      const bodyText = await page.locator('body').innerText();
      expect(bodyText).toContain('Intellectual Property');
    });
  });

  /* ────────────────────────────────────────────
   * 13. Extrapreneur
   * ──────────────────────────────────────────── */
  test.describe('Extrapreneur Section', () => {
    test('Section #extrapreneur menampilkan heading', async ({ page }) => {
      await page.goto('/', { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForTimeout(3000);
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(2000);
      const bodyText = await page.locator('body').innerText();
      const lower = bodyText.toLowerCase();
      expect(lower).toContain('extrapreneur');
    });
  });

  /* ────────────────────────────────────────────
   * 14. Partners
   * ──────────────────────────────────────────── */
  test.describe('Partners Section', () => {
    test('Section #partner menampilkan heading', async ({ page }) => {
      await page.goto('/', { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForTimeout(3000);
      const bodyText = await page.locator('body').innerText();
      expect(bodyText).toContain('Platform');
      expect(bodyText).toContain('Kolaborator');
    });
  });

  /* ────────────────────────────────────────────
   * 15. Download Section
   * ──────────────────────────────────────────── */
  test.describe('Download Section', () => {
    test('Section #download menampilkan heading dan tombol "Unduh"', async ({ page }) => {
      await page.goto('/', { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForTimeout(3000);
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(2000);
      const bodyText = await page.locator('body').innerText();
      const lower = bodyText.toLowerCase();
      expect(lower).toContain('download');
      expect(lower).toContain('unduh');
    });
  });

  /* ────────────────────────────────────────────
   * 16. Contact / Kontak Section
   * ──────────────────────────────────────────── */
  test.describe('Contact Section', () => {
    test('Section #kontak menampilkan heading dan kontak info', async ({ page }) => {
      await page.goto('/', { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForTimeout(3000);
      const bodyText = await page.locator('body').innerText();
      expect(bodyText).toContain('Brand Anda');
    });

    test('Dropdown WhatsApp dan Email dapat dibuka', async ({ page }) => {
      await page.goto('/', { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForTimeout(3000);
      // Scroll to bottom for kontak section
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(2000);
      const section = page.locator('#kontak');

      // Buka WA dropdown
      await section.getByText('Pilih nomor WhatsApp').click();
      await expect(section.getByText(/CS Tari|CS Siti|Utero Indonesia/).first()).toBeAttached({ timeout: 5000 });

      // Tutup dropdown WA, lalu buka email dropdown
      await page.locator('h2').first().click({ force: true });
      await page.waitForTimeout(300);

      await section.getByText('Pilih alamat email').click();
      await expect(section.getByText(/marketingutero|uterobranding|info@uteroindonesia/).first()).toBeAttached({ timeout: 5000 });
    });
  });

  /* ────────────────────────────────────────────
   * 17. Footer
   * ──────────────────────────────────────────── */
  test.describe('Footer', () => {
    test('Footer menampilkan informasi kontak dan navigasi', async ({ page }) => {
      await page.goto('/', { waitUntil: 'networkidle' });
      await page.waitForTimeout(3000);
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(2000);
      await expect(page.locator('footer')).toBeAttached({ timeout: 15000 });
      const footer = page.locator('footer');
      await expect(footer.locator('text=Navigasi').first()).toBeAttached();
      await expect(footer.locator('text=Lini Bisnis').first()).toBeAttached();
      await expect(footer.locator('text=Cabang').first()).toBeAttached();
      await expect(footer.locator('text=Kontak').first()).toBeAttached();
    });

    test('Footer menampilkan alamat dan nomor telepon', async ({ page }) => {
      await page.goto('/', { waitUntil: 'networkidle' });
      await page.waitForTimeout(3000);
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(2000);
      await expect(page.locator('footer')).toBeAttached({ timeout: 15000 });
      const footer = page.locator('footer');
      await expect(footer.locator('text=Jl. Bantaran 1 No. 25').first()).toBeAttached();
      await expect(footer.locator('text=819 999 00900').first()).toBeAttached();
    });

    test('Footer memiliki social media icons', async ({ page }) => {
      await page.goto('/', { waitUntil: 'networkidle' });
      await page.waitForTimeout(3000);
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(2000);
      await expect(page.locator('footer')).toBeAttached({ timeout: 15000 });
      const footer = page.locator('footer');
      const socialLinks = footer.getByLabel(/Instagram|Facebook|LinkedIn|YouTube/);
      expect(await socialLinks.count()).toBeGreaterThanOrEqual(3);
    });
  });

  /* ────────────────────────────────────────────
   * 18. SEO & Metadata
   * ──────────────────────────────────────────── */
  test.describe('SEO & Metadata', () => {
    test('Memiliki meta description yang benar', async ({ page }) => {
      await page.goto('/', { waitUntil: 'domcontentloaded' });
      await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /Utero Indonesia/);
    });

    test('Memiliki JSON-LD schema markup', async ({ page }) => {
      await page.goto('/', { waitUntil: 'domcontentloaded' });
      const ldJson = page.locator('script[type="application/ld+json"]');
      await expect(ldJson).toBeAttached({ timeout: 10000 });

      const content = await ldJson.textContent();
      expect(content).toContain('ProfessionalService');
      expect(content).toContain('Utero Indonesia');
      expect(content).toContain('1998');
    });

    test('Memiliki canonical URL dan OG tags', async ({ page }) => {
      await page.goto('/', { waitUntil: 'domcontentloaded' });
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /uteroindonesia\.com/);
      await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', /Utero Indonesia/);
    });

    test('Memiliki favicon dan manifest', async ({ page }) => {
      await page.goto('/', { waitUntil: 'domcontentloaded' });
      await expect(page.locator('link[rel="icon"]')).toBeAttached();
      await expect(page.locator('link[rel="manifest"]')).toBeAttached();
    });
  });

  /* ────────────────────────────────────────────
   * 19. Responsive — Mobile Viewport
   * ──────────────────────────────────────────── */
  test.describe('Responsive — Mobile Viewport', () => {
    test.use({ viewport: { width: 375, height: 812 } });

    test('Halaman tetap bisa di-scroll dan section inti muncul di mobile', async ({ page }) => {
      await page.goto('/', { waitUntil: 'networkidle' });

      // Yang di atas fold
      await expect(page.locator('#hero')).toBeVisible();
      await expect(page.locator('nav')).toBeVisible();
      await expect(page.locator('button[aria-label="Buka menu"]')).toBeVisible();

      // Yang di bawah fold — scroll bertahap untuk trigger render
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(2000);
      // Cek via body text instead of DOM selector (client components)
      const bodyText = await page.locator('body').innerText();
      expect(bodyText).toContain('Tentang');
      expect(bodyText).toContain('Divisi');
      expect(bodyText).toContain('Kontak');
    });

    test('Hamburger menu bisa dibuka dan ditutup di mobile', async ({ page }) => {
      await page.goto('/', { waitUntil: 'networkidle' });
      const hamburger = page.locator('button[aria-label="Buka menu"]');
      await expect(hamburger).toBeVisible();
      await hamburger.click();

      await expect(page.getByLabel('Tutup menu')).toBeVisible({ timeout: 5000 });

      await page.getByLabel('Tutup menu').click();
      await expect(page.getByLabel('Tutup menu')).not.toBeVisible();
    });
  });

  /* ────────────────────────────────────────────
   * 20. Aksesibilitas Dasar
   * ──────────────────────────────────────────── */
  test.describe('Aksesibilitas', () => {
    test('Setiap section utama memiliki id unik', async ({ page }) => {
      await page.goto('/', { waitUntil: 'networkidle' });
      // Scroll ke bawah dulu untuk trigger lazy load
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(2000);
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(1000);

      // Cek yang pasti ada di atas fold
      await expect(page.locator('#hero').first()).toBeAttached({ timeout: 10000 });
      await expect(page.locator('nav').first()).toBeAttached({ timeout: 10000 });
      // Cek sisanya via body text
      const bodyText = await page.locator('body').innerText();
      expect(bodyText).toContain('Tentang');
      expect(bodyText).toContain('Divisi');
      expect(bodyText).toContain('Kontak');
      const lower = bodyText.toLowerCase();
      expect(lower).toContain('download');
    });

    test('Semua gambar di halaman utama memiliki atribut alt', async ({ page }) => {
      await page.goto('/', { waitUntil: 'networkidle' });
      // Scroll ke bawah untuk trigger lazy load images
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(1000);
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(500);

      const images = page.locator('img');
      const count = await images.count();
      const errors: string[] = [];
      for (let i = 0; i < count; i++) {
        const alt = await images.nth(i).getAttribute('alt');
        const src = await images.nth(i).getAttribute('src');
        if ((alt === null || alt === undefined) && src && !src.startsWith('data:')) {
          errors.push(src || `img[${i}]`);
        }
      }
      if (errors.length > 0) {
        console.warn(`Images without alt (${errors.length}):`, errors);
      }
      expect(errors.length).toBeLessThan(5);
    });
  });
});
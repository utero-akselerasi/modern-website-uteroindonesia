import { test, expect } from '@playwright/test';

test('Memastikan halaman utama bisa dibuka dan memuat section Download', async ({ page }) => {
  // 1. Membuka local server kamu
  await page.goto('http://localhost:3000');

  // 2. Mencari elemen section download (sesuai kode komponenmu sebelumnya)
  const downloadSection = page.locator('#download');
  
  // 3. Memastikan elemen tersebut terlihat di layar
  await expect(downloadSection).toBeVisible();
});
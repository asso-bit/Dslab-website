const { test, expect } = require('@playwright/test');

test.describe('Products Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('site-web/products.html');
  });

  test('should display the main heading', async ({ page }) => {
    await expect(page.locator('h1')).toHaveText('Nos Produits');
  });

  test('should display the brands navigation', async ({ page }) => {
    await expect(page.locator('.brands-navigation')).toBeVisible();
    await expect(page.locator('.brands-list > a')).toHaveCount(3);
  });

  test('should display Sensa Core products', async ({ page }) => {
    await expect(page.locator('#sensa-core')).toBeVisible();
    await expect(page.locator('#sensa-core .product-card')).toHaveCount(3);
  });

  test('should display Dymind products', async ({ page }) => {
    await expect(page.locator('#dymind')).toBeVisible();
    await expect(page.locator('#dymind .product-card')).toHaveCount(3);
  });

  test('should display Maccura products', async ({ page }) => {
    await expect(page.locator('#Maccura')).toBeVisible();
    await expect(page.locator('#Maccura .product-card')).toHaveCount(1);
  });

  test('should have a CTA section', async ({ page }) => {
    await expect(page.locator('.cta-section')).toBeVisible();
    await expect(page.locator('.cta-section h2')).toHaveText('Vous ne trouvez pas ce que vous cherchez?');
  });

  test('should have a footer', async ({ page }) => {
    await expect(page.locator('footer')).toBeVisible();
    await expect(page.locator('footer p').first()).toContainText('Adresse :');
  });
});

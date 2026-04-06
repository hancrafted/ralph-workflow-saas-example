import { test, expect } from '@playwright/test';

test.describe('App', () => {
  test('should display Essensplaner branding', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('text=Essensplaner')).toBeVisible();
  });

  test('should redirect / to /meal-plan', async ({ page }) => {
    await page.goto('/');
    await page.waitForURL('**/meal-plan');
    await expect(page.locator('h2')).toContainText('Essensplan');
  });

  test('should show 6 sidebar nav items on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('/meal-plan');
    const sidebar = page.locator('aside');
    const menuItems = sidebar.locator('.p-menu-item-link');
    await expect(menuItems).toHaveCount(6);
  });

  test.describe('route navigation', () => {
    const routes = [
      { path: '/meal-plan', heading: 'Essensplan' },
      { path: '/recipes', heading: 'Rezepte' },
      { path: '/shops', heading: 'Geschäfte' },
      { path: '/offers', heading: 'Angebote' },
      { path: '/shopping-list', heading: 'Einkaufsliste' },
      { path: '/ingredients', heading: 'Zutaten' },
    ];

    for (const { path, heading } of routes) {
      test(`should navigate to ${path}`, async ({ page }) => {
        await page.goto(path);
        await expect(page.locator('h2')).toContainText(heading);
      });
    }
  });

  test('should show hamburger menu on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/meal-plan');
    const hamburger = page.locator('button[aria-label="Toggle menu"]');
    await expect(hamburger).toBeVisible();
    const sidebar = page.locator('aside');
    await expect(sidebar).toBeHidden();
  });
});

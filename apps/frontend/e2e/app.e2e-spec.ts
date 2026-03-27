import { test, expect } from '@playwright/test';

test.describe('App', () => {
  test('should display the app shell with HC SaaS branding', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('text=HC SaaS')).toBeVisible();
  });

  test('should navigate to projects page', async ({ page }) => {
    await page.goto('/projects');
    await expect(page.locator('text=Projects')).toBeVisible();
  });
});

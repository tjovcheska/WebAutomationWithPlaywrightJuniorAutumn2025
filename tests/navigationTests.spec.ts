import { test, expect } from '@playwright/test';

test('should appear in Playwright test runner', () => {
});

test.describe('Navigation tests', async () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('');
        await expect(page).toHaveURL('https://www.saucedemo.com/');
    });

    test('should navigate to saucelabs demo web page', async ({ page }) => {
        await expect(page.locator('.login_logo')).toBeVisible();
        await expect(page.locator('#root')).toBeVisible();
        await expect(page.locator('.login_logo')).toHaveText('Swag Labs');
        await expect(page.locator('#root')).toContainText('Swag');
    });
});

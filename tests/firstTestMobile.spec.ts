import { test, expect } from '@playwright/test';

test('should login with invalid credentials', async ({ page }) => {
    const errorMessage = page.locator('[data-test="error"]');

    await page.goto('');
    await expect(page).toHaveURL('https://www.saucedemo.com/');

    await page.locator('[data-test="username"]').fill('someUsername');
    await page.locator('[data-test="password"]').fill('123');
    await page.locator('[data-test="login-button"]').click();
    await page.waitForTimeout(10000);

    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toHaveText('Epic sadface: Username and password do not match any user in this service');

    await expect(page).toHaveURL('https://www.saucedemo.com');
});

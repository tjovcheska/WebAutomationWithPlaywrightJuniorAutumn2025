import { test, expect, devices } from '@playwright/test';
import users from '../fixtures/users.json';

test.describe('Login functionallity - valid credentials', async() => {
    test.beforeEach(async ({ page }) => {
        await page.goto('');
        await expect(page).toHaveURL('https://www.saucedemo.com/');
    });

    test.afterEach(async ({ page }) => {
        await page.locator('#react-burger-menu-btn').click();
        await page.getByTestId('logout-sidebar-link').click();

        await expect(page).toHaveURL('https://www.saucedemo.com');
    });

    test('should login with valid credentials as standard_user', async ({ page }) => {
        await page.getByTestId('username').fill(users.standard_user.username);
        await page.getByTestId('password').fill(users.standard_user.password);
        await page.getByTestId('login-button').click();

        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    });

    test('Should login with valid credentials as error_user', async ({ page }) => {
        await page.getByTestId('username').fill(users.error_user.username);
        await page.getByTestId('password').fill(users.error_user.password);
        await page.getByTestId('login-button').click();

        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    });
});

test.describe('Login functionallity - invalid credentials', async () => {
    test('should login with invalid credentials', async ({ page }) => {
        const errorMessage = page.getByTestId('error');

        await page.goto('');
        await expect(page).toHaveURL('https://www.saucedemo.com/');

        await page.getByTestId('username').fill(users.invalid_user.username);
        await page.getByTestId('password').fill(users.invalid_user.password);
        await page.getByTestId('login-button').click();

        await expect(errorMessage).toBeVisible();
        await expect(errorMessage).toHaveText('Epic sadface: Username and password do not match any user in this service');

        await expect(page).toHaveURL('https://www.saucedemo.com');
    });
});

test.describe('[MOBILE] Login functionallity - invalid credentials', async () => {
    test('should login with invalid credentials on mobile', async ({ page, browser }) => {
        // Emulate iPhone12 viewport
        const context = await browser.newContext({
            // viewport: { width: 375, height: 666 },
            // isMobile: true
            ...devices['iPhone 15']
        });

        const mobilePage = await context.newPage()

        const errorMessage = mobilePage.getByTestId('error');

        await mobilePage.goto('https://www.saucedemo.com/');
        await expect(mobilePage).toHaveURL('https://www.saucedemo.com/', { timeout: 15000 });

        await mobilePage.getByTestId('username').fill(users.invalid_user.username);
        await mobilePage.getByTestId('password').fill(users.invalid_user.password);
        await mobilePage.getByTestId('login-button').click();

        await expect(errorMessage).toBeVisible();
        await expect(errorMessage).toHaveText('Epic sadface: Username and password do not match any user in this service');

        await expect(mobilePage).toHaveURL('https://www.saucedemo.com');

        await context.close();
    });
});

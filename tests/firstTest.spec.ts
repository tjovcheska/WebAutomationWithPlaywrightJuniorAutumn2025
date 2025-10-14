import { test, expect } from '@playwright/test';

test('should appear in Playwright test runner', () => {
});

test('should navigate to saucelabs demo web page', async ({ page }) => {
    await page.goto('');
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(page.locator('.login_logo')).toBeVisible();
    await expect(page.locator('#root')).toBeVisible();
    await expect(page.locator('.login_logo')).toHaveText('Swag Labs');
    await expect(page.locator('#root')).toContainText('Swag');
});

test.only('should login with valid credentials as standard_user', async ({ page }) => {
    await page.goto('');
    await expect(page).toHaveURL('https://www.saucedemo.com/');

    await page.getByTestId('username').fill('standard_user');
    // await page.locator('[data-test="username"]').fill('standard_user');
    await page.getByTestId('password').fill('secret_sauce');
    // await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.getByTestId('login-button').click();
    // await page.locator('[data-test="login-button"]').click();

    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
});

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

test('should login with invalid credentials on mobile', async ({ page, browser }) => {
    // Emulate iPhone12 viewport
    const context = await browser.newContext({
        viewport: { width: 375, height: 666 },
        isMobile: true
    });

    const mobilePage = await context.newPage()

    const errorMessage = mobilePage.locator('[data-test="error"]');

    await mobilePage.goto('https://www.saucedemo.com/');
    await expect(mobilePage).toHaveURL('https://www.saucedemo.com/', { timeout: 15000 });

    await mobilePage.locator('[data-test="username"]').fill('someUsername');
    await mobilePage.locator('[data-test="password"]').fill('123');
    await mobilePage.locator('[data-test="login-button"]').click();

    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toHaveText('Epic sadface: Username and password do not match any user in this service');

    await expect(mobilePage).toHaveURL('https://www.saucedemo.com');

    await context.close();
});

// Arrow and callback functions in TS
// function doSomething () {
//     console.log('Something')
// }

// const doSomething1 = () => {
//     console.log('Something')
// }

// function addition (a: number, b: number) {
//     const result = a + b;
//     return result;
// }

// const addition1 = (a: number, b: number) => {
//     const result = a + b;
//     return result;
// }

// const testFunction = (name: string, callback: Function) => {
//     console.log(name);
//     callback();
// }

// testFunction('should appear in Playwright test runner', () => {
//     addition(2, 3)
// });

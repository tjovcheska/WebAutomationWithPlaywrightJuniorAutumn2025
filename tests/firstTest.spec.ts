import { test, expect } from '@playwright/test';

test('should appear in Playwright test runner', () => {
});

test('should navigate to saucelabs demo web page', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(page.locator('.login_logo')).toBeVisible();
    await expect(page.locator('#root')).toBeVisible();
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

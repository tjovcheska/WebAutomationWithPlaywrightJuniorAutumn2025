import { test, expect } from "@playwright/test";

const users = [
    { username: "standard_user", password: "secret_sauce", expectedResult: "success" },
    { username: "locked_out_user", password: "secret_sauce", expectedResult: "error" },
    { username: "problem_user", password: "secret_sauce", expectedResult: "success" }
];

test.describe('Login tests', async () => {
    users.forEach((user) => {
        test.beforeEach(async ({ page }) => {
            await page.goto('');
            await expect(page).toHaveURL('https://www.saucedemo.com/');
        });

        test(`should login with valid credentials as ${user.username}`, async ({ page }) => {
            await page.getByTestId('username').fill(user.username);
            await page.getByTestId('password').fill(user.password);
            await page.getByTestId('login-button').click();

            if (user.expectedResult === 'success') {
                await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
            } else {
                await expect(page).toHaveURL('https://www.saucedemo.com');
            }
        });
    });
});

import { test, expect } from "@playwright/test";
import { LoginPage } from "../pageObjects/LoginPage";
import { Navigation } from "../pageObjects/Navigation";

import { initializePageObjects } from "../helpers/pageObjectInitializer";

const users = [
    { username: "standard_user", password: "secret_sauce", expectedResult: "success" },
    { username: "locked_out_user", password: "secret_sauce", expectedResult: "error" },
    { username: "problem_user", password: "secret_sauce", expectedResult: "success" }
];

let loginPage: LoginPage;
let navigation: Navigation;

test.describe('Login tests', async () => {
    users.forEach((user) => {
        test.beforeEach(async ({ page }) => {
            ({ loginPage,
                navigation
            } = initializePageObjects(page));

            await navigation.navigateToBaseUrl('');
            await navigation.verifyUrl('https://www.saucedemo.com/');
        });

        test(`should login with valid credentials as ${user.username}`, async ({ page }) => {
            await loginPage.fillUsername(user.username);
            await loginPage.fillPassword(user.password);
            await loginPage.clickLoginButton();

            if (user.expectedResult === 'success') {
                await navigation.verifyUrl('https://www.saucedemo.com/inventory.html');
            } else {
                await navigation.verifyUrl('https://www.saucedemo.com');
            }
        });
    });
});

import { test, expect, devices } from '@playwright/test';
import users from '../fixtures/users.json';
import { LoginPage } from "../pageObjects/LoginPage";
import { Navigation } from '../pageObjects/Navigation';
import { initializePageObjects } from '../helpers/pageObjectInitializer';
import { SlidebarComponent } from '../pageObjects/components/SlidebarComponent';
import { HeaderComponent } from '../pageObjects/components/HeaderComponent';

let loginPage: LoginPage;
let navigation: Navigation;
let slidebarComponent: SlidebarComponent;
let headerComponent: HeaderComponent;

test.describe('Login functionallity - valid credentials', async() => {
    test.beforeEach(async ({ page }) => {
        ({ loginPage,
            navigation,
            slidebarComponent,
            headerComponent
        } = initializePageObjects(page));

        await navigation.navigateToBaseUrl('');
        await navigation.verifyUrl('https://www.saucedemo.com/');
    });

    test.afterEach(async ({ page }) => {
        await headerComponent.clickHeaderMenuButton();
        await slidebarComponent.clickLogoutButton();

        await navigation.verifyUrl('https://www.saucedemo.com')
    });

    test('should login with valid credentials as standard_user', async ({ page }) => {
        await loginPage.fillUsername(users.standard_user.username);
        await loginPage.fillPassword(users.standard_user.password);
        await loginPage.clickLoginButton();

        await navigation.verifyUrl('https://www.saucedemo.com/inventory.html');
    });

    test('Should login with valid credentials as error_user', async ({ page }) => {
        await loginPage.fillUsername(users.error_user.username);
        await loginPage.fillPassword(users.error_user.password);
        await loginPage.clickLoginButton();

        await navigation.verifyUrl('https://www.saucedemo.com/inventory.html');
    });
});

test.describe('Login functionallity - invalid credentials', async () => {
    test.beforeEach(async ({ page }) => {
        ({ loginPage,
            navigation
        } = initializePageObjects(page));
    });

    test('should login with invalid credentials', async ({ page }) => {
        await navigation.navigateToBaseUrl('');
        await navigation.verifyUrl('https://www.saucedemo.com/');

        await loginPage.assertErrorMessageVisibility(false);

        await loginPage.fillUsername(users.invalid_user.username);
        await loginPage.fillPassword(users.invalid_user.password);
        await loginPage.clickLoginButton();

        await loginPage.assertErrorMessageVisibility();
        await loginPage.assertErrorMessageText('Epic sadface: Username and password do not match any user in this service');

        await navigation.verifyUrl('https://www.saucedemo.com');
    });
});

test.describe('[MOBILE] Login functionallity - invalid credentials', async () => {
    test('should login with invalid credentials on mobile', async ({ browser }) => {
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

import test, { expect } from "@playwright/test";
import users from "../fixtures/users.json";
import { LoginPage } from "../pageObjects/LoginPage";
import { Navigation } from "../pageObjects/Navigation";
import { SlidebarComponent } from "../pageObjects/components/SlidebarComponent";
import { HeaderComponent } from "../pageObjects/components/HeaderComponent";
import { initializePageObjects } from "../helpers/pageObjectInitializer";
import { InventoryPage } from "../pageObjects/InventoryPage";


let loginPage: LoginPage;
let navigation: Navigation;
let inventoryPage: InventoryPage;

test.describe('Inventory page tests', async () => {
    test.beforeEach(async ({ page }) => {
        ({ loginPage,
            navigation,
            inventoryPage
        } = initializePageObjects(page));

        await navigation.navigateToBaseUrl('');
        await navigation.verifyUrl('https://www.saucedemo.com/');

        await loginPage.fillUsername(users.standard_user.username);
        await loginPage.fillPassword(users.standard_user.password);
        await loginPage.clickLoginButton();

        await navigation.verifyUrl('https://www.saucedemo.com/inventory.html');
    });

    test('should add an item to the cart and should validate the item count', async ({ page }) => {
        await inventoryPage.verifyInventoryPageTitle('Products');

        await expect(page.getByTestId('shopping-cart-badge')).not.toBeAttached();
        // await page.getByText('Add to cart').nth(0).click();
        await page.getByTestId('add-to-cart-sauce-labs-backpack').click();
        await expect(page.getByTestId('shopping-cart-badge')).toBeAttached();
        await expect(page.getByTestId('shopping-cart-badge')).toHaveText('1');
    });
});
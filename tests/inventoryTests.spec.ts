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

    test('should decrease the number of items in the cart after clicking add to cart button on an already added item', async ({ page }) => {
        await inventoryPage.clickAddToCartButton('backpack');
        await inventoryPage.clickAddToCartButton('bike-light');
        await inventoryPage.validateShoppingCartBadgeCount(2);
        await inventoryPage.clickRemoveButton('backpack');
        await inventoryPage.validateShoppingCartBadgeCount(1);
    });

    test('should add an item to the cart and should validate the item count', async ({ page }) => {
        await inventoryPage.verifyInventoryPageTitle('Products');

        await inventoryPage.verifyShoppingCarBadgeAttached(false);
        await inventoryPage.clickAddToCartButton('backpack');
        await inventoryPage.verifyShoppingCarBadgeAttached();
        await inventoryPage.validateShoppingCartBadgeCount(1);
    });

    test('should sort inventory items Z-A', async () => {
        await inventoryPage.assertSortedTitles('Sauce Labs Backpack', 'Test.allTheThings() T-Shirt (Red)');
        await inventoryPage.sortItemsBy('za');
        await inventoryPage.assertSortedTitles('Test.allTheThings() T-Shirt (Red)', 'Sauce Labs Backpack');
    });

    test('should sort inventory items Low-High', async ({ page }) => {
        await inventoryPage.assertSortedPrices();
        await inventoryPage.sortItemsBy('lohi');
        await inventoryPage.assertSortedPrices();

    });
});
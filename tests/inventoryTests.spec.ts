import test, { expect } from "@playwright/test";
import users from "../fixtures/users.json";

test.describe('Inventory page tests', async () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('');

        await expect(page).toHaveURL('https://www.saucedemo.com/');

        await page.getByTestId('username').fill(users.standard_user.username);
        await page.getByTestId('password').fill(users.standard_user.password);
        await page.getByTestId('login-button').click();

        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    });

    test('should add an item to the cart and should validate the item count', async ({ page }) => {
        await expect(page.getByTestId('title')).toHaveText('Products');

        await expect(page.getByTestId('shopping-cart-badge')).not.toBeAttached();
        // await page.getByText('Add to cart').nth(0).click();
        await page.getByTestId('add-to-cart-sauce-labs-backpack').click();
        await expect(page.getByTestId('shopping-cart-badge')).toBeAttached();
        await expect(page.getByTestId('shopping-cart-badge')).toHaveText('1');
    });
});
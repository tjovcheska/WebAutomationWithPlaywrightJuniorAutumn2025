import { expect, Locator, Page } from "@playwright/test";

export class InventoryPage {
    constructor(
        private readonly page: Page,
        private readonly inventoryPageTitle: Locator = page.getByTestId('title'),
        private readonly shoppingCartBadge: Locator = page.getByTestId('shopping-cart-badge'),
        private readonly addToCartButton: Locator = page.getByTestId('add-to-cart-sauce-labs-backpack')
    ) {}

    async verifyInventoryPageTitle(title: string) {
        await expect(this.inventoryPageTitle).toHaveText(title);
    }
}
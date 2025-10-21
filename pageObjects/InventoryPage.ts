import { expect, Locator, Page } from "@playwright/test";

export class InventoryPage {
    constructor(
        private readonly page: Page,
        private readonly inventoryPageTitle: Locator = page.getByTestId('title'),
        private readonly shoppingCartBadge: Locator = page.getByTestId('shopping-cart-badge'),
        private readonly addToCartButton: Locator = page.getByTestId('add-to-cart-sauce-labs-backpack'),
        private readonly sortingDropdown: Locator = page.getByTestId('product-sort-container'),
        private readonly inventoryItemName: Locator = page.getByTestId('inventory-item-name'),
        private readonly inventoryItemPrice: Locator = page.getByTestId('inventory-item-price'),
    ) {}

    async verifyInventoryPageTitle(title: string) {
        await expect(this.inventoryPageTitle).toHaveText(title);
    }

    async verifyShoppingCarBadgeAttached(isAttached = true) {
        if (isAttached) {
            await expect(this.shoppingCartBadge).toBeAttached();
        } else {
            await expect(this.shoppingCartBadge).not.toBeAttached();
        }
    }

    async clickAddToCartButton(itemLocator: string) {
        await this.page.getByTestId(`add-to-cart-sauce-labs-${itemLocator}`).click();
    }

    async validateShoppingCartBadgeCount(count: number) {
        await expect(this.shoppingCartBadge).toHaveText(count.toString());  
    }

    async clickRemoveButton(itemLocator: string) {
        await this.page.getByTestId(`remove-sauce-labs-${itemLocator}`).click();
    }

    async sortItemsBy(option: string) {
        await expect(this.sortingDropdown).toBeVisible();
        await this.sortingDropdown.selectOption(option)
    }

    async assertSortedTitles(firstItemTitle: string, lastItemTitle: string) {
        const firstItemText = await this.inventoryItemName.first().textContent();
        const lastItemText = await this.inventoryItemName.last().textContent();

        expect(firstItemText).toBe(firstItemTitle);
        expect(lastItemText).toBe(lastItemTitle);
    }

    async assertSortedPrices() {
        const pricesText = await this.inventoryItemPrice.allTextContents();
        const prices = pricesText.map((text) => parseFloat(text.replace('$', '')));
        const sortedPrices = prices.sort((a, b) => a - b) // Sort the prices from low to high

        expect(prices).toEqual(sortedPrices)
    }
}
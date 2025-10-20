import { Locator, Page } from "@playwright/test";

export class HeaderComponent {
    constructor(
        private readonly page: Page,
        private readonly headerMenuButton: Locator = page.locator('#react-burger-menu-btn')
    ) {}

    async clickHeaderMenuButton() {
        await this.headerMenuButton.click();
    }
}
import { expect, Page } from "@playwright/test";

export class Navigation {
    constructor(
        private readonly page: Page
    ) {

    }

    async navigateToBaseUrl(baseUrl: string) {
        await this.page.goto(baseUrl);
    }

    async verifyUrl(url: string) {
        await expect(this.page).toHaveURL(url);
    }
}
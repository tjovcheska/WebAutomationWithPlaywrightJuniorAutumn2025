import { Locator, Page } from "@playwright/test";

export class SlidebarComponent {
    constructor(
        private readonly page: Page,
        private readonly logoutSlidebarButton: Locator = page.getByTestId('logout-sidebar-link')
    ) {}

    async clickLogoutButton() {
        await this.logoutSlidebarButton.click();
    }
}
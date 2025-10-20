import { expect, Locator, Page } from '@playwright/test';

export class LoginPage {
    constructor(
        page: Page,
        private readonly userInput: Locator = page.getByTestId('username'),
        private readonly passwordInput: Locator = page.getByTestId('password'),
        private readonly loginButton: Locator = page.getByTestId('login-button'),
        private readonly errorMessage: Locator = page.getByTestId('error'),
    ) {
    }

    async fillUsername(username: string) {
        await this.userInput.fill(username);
    }

    async fillPassword(password: string) {
        await this.passwordInput.fill(password);
    }

    async clickLoginButton() {
        await this.loginButton.click();
    }

    async assertErrorMessageVisibility(isVisible = true) {
        if (isVisible) {
            await expect(this.errorMessage).toBeVisible();
        } else {
            await expect(this.errorMessage).not.toBeVisible();
        }
    }

    async assertErrorMessageText(text: string) {
        await expect(this.errorMessage).toHaveText(text)
    }
}
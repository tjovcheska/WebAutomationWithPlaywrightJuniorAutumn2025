import { Page } from "@playwright/test";
import { LoginPage } from "../pageObjects/LoginPage";
import { Navigation } from "../pageObjects/Navigation";
import { SlidebarComponent } from "../pageObjects/components/SlidebarComponent";
import { HeaderComponent } from "../pageObjects/components/HeaderComponent";
import { InventoryPage } from "../pageObjects/InventoryPage";

export function initializePageObjects(page: Page) {
    const loginPage = new LoginPage(page);
    const navigation = new Navigation(page);
    const slidebarComponent = new SlidebarComponent(page);
    const headerComponent = new HeaderComponent(page);
    const inventoryPage = new InventoryPage(page);

    return {
        loginPage,
        navigation,
        slidebarComponent,
        headerComponent,
        inventoryPage
    }
}

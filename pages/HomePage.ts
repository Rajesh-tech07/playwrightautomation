import { expect, Locator, Page } from '@playwright/test';
import { LoginCredentials } from '../types/auth';

export class HomePage {
    readonly footerText: Locator;
    readonly emailfield: Locator;
    readonly subscribeButton: Locator;
    readonly successAlert: Locator;
    readonly cardlink: Locator;
    readonly productmenu: Locator


    constructor(page: Page) {

        this.footerText = page.getByText('Subscription');
        this.emailfield = page.locator('#susbscribe_email');
        this.subscribeButton = page.locator('#subscribe');
        this.successAlert = page.locator('.alert-success.alert')
        this.cardlink = page.getByRole('link', { name: ' Cart' });
        this.productmenu = page.getByRole('link', { name: 'Products' });

    }

    async footerview() {
        await this.footerText.scrollIntoViewIfNeeded();
        await expect(this.footerText).toBeVisible();

    }
    async subscription(email: string) {
        await this.emailfield.fill(email);
        await this.subscribeButton.click();
    }

    async expectsubscription() {
        await expect(this.successAlert).toContainText('You have been successfully subscribed!');
    }

    async viewcart() {
        await this.cardlink.click();
    }

    async viewProdcut() {
        await this.productmenu.click();
    }
}

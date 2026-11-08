import { expect, type Locator, type Page } from '@playwright/test';

export class cartPage {
    readonly cardlink: Locator;
    readonly cartRows: Locator;
    readonly proceedTocheckoutbutton: Locator;
    readonly registerlink: Locator;

    constructor(readonly page: Page) {
        this.cardlink = page.locator('#cartModal').getByRole('link', { name: 'View Cart', exact: true });
        this.cartRows = page.locator('#cart_info_table tbody tr');
        this.proceedTocheckoutbutton = page.getByText('Proceed To Checkout');
        this.registerlink = page.getByRole('link', { name: 'Register / Login' });
    }

    async Viewcart() {
        await this.cardlink.click();
    }

    async expectCartVisible(productCount: number) {
        await expect(this.page).toHaveURL(/\/view_cart/);
        await expect(this.cartRows).toHaveCount(productCount);
    }

    async expectProduct(name: string, price: string, quantity: string, total: string) {
        const row = this.cartRows.filter({ hasText: name });

        await expect(row).toBeVisible();
        await expect(row.locator('.cart_description h4')).toContainText(name);
        await expect(row.locator('.cart_price p')).toHaveText(price);
        await expect(row.locator('.cart_quantity button')).toHaveText(quantity);
        await expect(row.locator('.cart_total_price')).toHaveText(total);
    }

    async proccedToCheckout() {
        await this.proceedTocheckoutbutton.click();
    }

    async registeraccount() {
        await this.registerlink.click();
    }

}

import { expect, type Locator, type Page } from '@playwright/test';
import type { SignUpCredentials } from '../types/auth';

export class CheckoutPage {
  readonly deliveryAddress: Locator;
  readonly billingAddress: Locator;
  readonly commentField: Locator;
  readonly placeOrderLink: Locator;
  readonly namefield: Locator;
  readonly cardnumber: Locator;
  readonly cvv: Locator;
  readonly expiryyear: Locator;
  readonly expiryMonth: Locator;
  readonly paybutton: Locator;

  constructor(readonly page: Page) {
    this.deliveryAddress = page.locator('#address_delivery');
    this.billingAddress = page.locator('#address_invoice');
    this.commentField = page.locator('textarea[name="message"]');
    this.placeOrderLink = page.getByRole('link', { name: 'Place Order' });
    this.namefield = page.locator('input[name="name_on_card"]');
    this.cardnumber = page.locator('input[name="card_number"]');
    this.cvv = page.locator('input[name="cvc"]');
    this.expiryyear = page.locator('input[name="expiry_year"]');
    this.expiryMonth = page.locator('input[name="expiry_month"]');
    this.paybutton = page.locator('#submit');
  }

  async expectAddressDetails(user: SignUpCredentials) {
    await expect(this.page).toHaveURL(/\/checkout/);
    await expect(this.page.getByRole('heading', { name: 'Address Details' })).toBeVisible();
    await expect(this.deliveryAddress).toBeVisible();
    await expect(this.billingAddress).toBeVisible();

    for (const value of [
      user.first_Name,
      user.last_Name,
      user.address_one,
      user.address_two,
      user.city,
      user.state,
      user.zipcode,
      user.mobile_Number,
      'Australia',
    ]) {
      if (value) await expect(this.deliveryAddress).toContainText(value);
    }
  }

  async expectReviewYourOrder() {
    await expect(this.page.getByRole('heading', { name: 'Review Your Order' })).toBeVisible();
  }

  async expectProduct(name: string, price: string, quantity: string, total: string) {
    const row = this.page.getByRole('row').filter({
      has: this.page.getByRole('heading', { name, exact: true }),
    });

    await expect(row).toBeVisible();
    await expect(row.getByRole('cell').nth(2)).toHaveText(price);
    await expect(row.getByRole('cell').nth(3)).toHaveText(quantity);
    await expect(row.getByRole('cell').nth(4)).toHaveText(total);
  }

  async placeOrder(comment: string) {
    await this.commentField.fill(comment);
    await this.placeOrderLink.click();
    await expect(this.page).toHaveURL(/\/payment/);
  }

  async enterCardDetails(name: string, card_number: number, cvv: number, expiry_month: number, expiry_year: number
  ) {

    await this.namefield.fill(name);
    await this.cardnumber.fill(card_number.toString());
    await this.cvv.fill(cvv.toString());
    await this.expiryMonth.fill(expiry_month.toString());
    await this.expiryyear.fill(expiry_year.toString());
    await this.paybutton.click();

  }


}

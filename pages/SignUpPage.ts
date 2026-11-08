import { expect, type Locator, type Page } from '@playwright/test';
import type { SignUpCredentials } from '../types/auth';

export class SignUpPage {
  readonly signupLoginLink: Locator;
  readonly nameField: Locator;
  readonly emailField: Locator;
  readonly signupButton: Locator;
  readonly titleRadio: Locator;
  readonly passwordField: Locator;
  readonly dayDropdown: Locator;
  readonly monthDropdown: Locator;
  readonly yearDropdown: Locator;
  readonly newsletterCheckbox: Locator;
  readonly specialOffersCheckbox: Locator;
  readonly firstNameField: Locator;
  readonly lastNameField: Locator;
  readonly companyField: Locator;
  readonly addressOneField: Locator;
  readonly addressTwoField: Locator;
  readonly countryDropdown: Locator;
  readonly stateField: Locator;
  readonly cityField: Locator;
  readonly zipCodeField: Locator;
  readonly mobileNumberField: Locator;
  readonly createAccountButton: Locator;
  readonly accountCreatedMessage: Locator;
  readonly continueLink: Locator;
  readonly deleteAccountLink: Locator;
  readonly accountDeletedMessage: Locator;
  readonly existingEmailError: Locator;

  constructor(readonly page: Page) {
    this.signupLoginLink = page.getByRole('link', { name: 'Signup / Login' });
    this.nameField = page.getByPlaceholder('Name', { exact: true });
    this.emailField = page.locator('[data-qa="signup-email"]');
    this.signupButton = page.getByRole('button', { name: 'Signup', exact: true });
    this.titleRadio = page.getByLabel('Mr.', { exact: true });
    this.passwordField = page.locator('#password');
    this.dayDropdown = page.locator('#days');
    this.monthDropdown = page.locator('#months');
    this.yearDropdown = page.locator('#years');
    this.newsletterCheckbox = page.getByRole('checkbox', { name: 'Sign up for our newsletter!' });
    this.specialOffersCheckbox = page.getByRole('checkbox', { name: 'Receive special offers from our partners!' });
    this.firstNameField = page.locator('#first_name');
    this.lastNameField = page.locator('#last_name');
    this.companyField = page.locator('#company');
    this.addressOneField = page.locator('#address1');
    this.addressTwoField = page.locator('#address2');
    this.countryDropdown = page.locator('#country');
    this.stateField = page.locator('#state');
    this.cityField = page.locator('#city');
    this.zipCodeField = page.locator('#zipcode');
    this.mobileNumberField = page.locator('#mobile_number');
    this.createAccountButton = page.getByRole('button', { name: 'Create Account', exact: true });
    this.accountCreatedMessage = page.getByRole('heading', { name: 'Account Created!' });
    this.continueLink = page.getByRole('link', { name: 'Continue', exact: true });
    this.deleteAccountLink = page.getByRole('link', { name: 'Delete Account' });
    this.accountDeletedMessage = page.getByRole('heading', { name: 'Account Deleted!' });
    this.existingEmailError = page.locator('.signup-form p');
  }

  async startSignup(user: SignUpCredentials) {
    await this.signupLoginLink.click();
    await this.nameField.fill(user.name);
    await this.emailField.fill(user.email_Address);
    await this.signupButton.click();
  }

  async fillPersonalDetails(user: SignUpCredentials) {
    await this.titleRadio.check();
    await this.passwordField.fill(user.passwored);
    await this.dayDropdown.selectOption('7');
    await this.monthDropdown.selectOption({ label: 'October' });
    await this.yearDropdown.selectOption('1995');
    await this.newsletterCheckbox.check();
    await this.specialOffersCheckbox.check();
  }

  async fillAddressDetails(user: SignUpCredentials) {
    await this.firstNameField.fill(user.first_Name);
    await this.lastNameField.fill(user.last_Name);
    await this.companyField.fill(user.company);
    await this.addressOneField.fill(user.address_one);
    await this.addressTwoField.fill(user.address_two);
    await this.countryDropdown.selectOption({ label: 'Australia' });
    await this.stateField.fill(user.state);
    await this.cityField.fill(user.city);
    await this.zipCodeField.fill(user.zipcode);
    await this.mobileNumberField.fill(user.mobile_Number);
  }

  async createAccount() {
    await this.createAccountButton.click();
  }

  async continueAfterSignup() {
    await this.continueLink.click();
  }

  async deleteAccount() {
    await this.deleteAccountLink.click();
  }

  async expectAccountCreated() {
    await expect(this.accountCreatedMessage).toBeVisible();
  }

  async expectAccountDeleted() {
    await expect(this.accountDeletedMessage).toBeVisible();
  }

}

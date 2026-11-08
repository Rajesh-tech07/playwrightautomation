import { expect, type Locator, type Page } from '@playwright/test';
import type { LoginCredentials } from '../types/auth';

export class LoginPage {
  readonly signupLoginLink: Locator;
  readonly emailField: Locator;
  readonly passwordField: Locator;
  readonly loginButton: Locator;
  readonly logoutLink: Locator;
  readonly loginError: Locator;
  readonly loggedInUser: Locator;

  constructor(readonly page: Page) {
    this.signupLoginLink = page.getByRole('link', { name: 'Signup / Login' });
    this.emailField = page.locator('[data-qa="login-email"]');
    this.passwordField = page.locator('[data-qa="login-password"]');
    this.loginButton = page.getByRole('button', { name: 'Login', exact: true });
    this.logoutLink = page.getByRole('link', { name: 'Logout' });
    this.loginError = page.locator('.login-form p');
    this.loggedInUser = page.getByText('Logged in as');
  }

  async login(user: LoginCredentials) {
    await this.signupLoginLink.click();
    await this.emailField.fill(user.email_address);
    await this.passwordField.fill(user.password);
    await this.loginButton.click();
  }

  async logout() {
    await this.logoutLink.click();
  }

  async expectLoggedIn() {
    await expect(this.loggedInUser).toBeVisible();
    await expect(this.logoutLink).toBeVisible();
  }

  async expectLoggedOut() {
    await expect(this.emailField).toBeVisible();
    await expect(this.passwordField).toBeVisible();
    await expect(this.loginButton).toBeVisible();
    await expect(this.logoutLink).toBeHidden();
  }
}

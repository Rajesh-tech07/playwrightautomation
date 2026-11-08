import { expect, type Locator, type Page } from '@playwright/test';
import type { ContactFormDetails } from '../types/auth';

export class ContactUsPage {
  readonly contactUsLink: Locator;
  readonly nameField: Locator;
  readonly emailField: Locator;
  readonly subjectField: Locator;
  readonly messageField: Locator;
  readonly submitButton: Locator;
  readonly fileInput: Locator;
  readonly contactHeading: Locator;
  readonly successMessage: Locator;
  readonly homeLink: Locator;

  constructor(readonly page: Page) {
    this.contactUsLink = page.getByRole('link', { name: 'Contact us' });
    this.nameField = page.locator('[data-qa="name"]');
    this.emailField = page.locator('[data-qa="email"]');
    this.subjectField = page.locator('[data-qa="subject"]');
    this.messageField = page.locator('[data-qa="message"]');
    this.submitButton = page.locator('[data-qa="submit-button"]');
    this.fileInput = page.locator('[name="upload_file"]');
    this.contactHeading = page.getByRole('heading', { name: 'Get In Touch' });
    this.successMessage = page.locator('.status.alert.alert-success');
    this.homeLink = page.getByRole('banner').getByRole('link', { name: 'Home' });
  }

  async open() {
    await this.contactUsLink.click();
  }

  async fillForm(user: ContactFormDetails) {
    await this.nameField.fill(user.name);
    await this.emailField.fill(user.email);
    await this.subjectField.fill(user.subject);
    await this.messageField.fill(user.message);
  }

  async uploadFile(filePath: string) {
    await this.fileInput.setInputFiles(filePath);
  }

  async submitForm() {
    this.page.once('dialog', dialog => dialog.accept());
    await this.submitButton.click();
  }

  async goHome() {
    await this.homeLink.click();
  }

  async expectFormVisible() {
    await expect(this.contactHeading).toBeVisible();
    await expect(this.nameField).toBeVisible();
    await expect(this.emailField).toBeVisible();
    await expect(this.submitButton).toBeVisible();
  }

  async expectSubmissionSuccess(expectedMessage: string) {
    await expect(this.successMessage).toBeVisible();
    await expect(this.successMessage).toHaveText(expectedMessage);
  }
}

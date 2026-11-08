import { resolve } from 'node:path';
import { test, expect } from '../fixtures/baseTest';
import { readContactData } from '../support/testData';

test('Test Case 6: Contact Us Form', async ({ page, contactUsPage }) => {
  const user = readContactData();
  const attachmentPath = resolve(__dirname, '../test-data/contact-attachment.txt');
  const expectedMessage = 'Success! Your details have been submitted successfully.';

  await expect(page).toHaveTitle('Automation Exercise');
  await contactUsPage.open();
  await contactUsPage.expectFormVisible();
  await contactUsPage.fillForm(user);
  await contactUsPage.uploadFile(attachmentPath);
  await contactUsPage.submitForm();
  await contactUsPage.expectSubmissionSuccess(expectedMessage);

  await contactUsPage.goHome();
  await expect(page).toHaveTitle('Automation Exercise');
});

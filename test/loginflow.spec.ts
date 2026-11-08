import { test, expect } from '../fixtures/baseTest';
import { readLoginData } from '../support/testData';

const loginUsers = readLoginData();

test.describe('Login flow', () => {
  test.describe.configure({ mode: 'serial' });

  test('Test Case 2: Login User with correct email and password', async ({ sharedLoginPage }) => {
    const validUser = loginUsers.find(row => row.status === 'valid');
    if (!validUser) throw new Error('No valid login user found in Excel');

    await sharedLoginPage.login(validUser);
    await sharedLoginPage.expectLoggedIn();
  });

  test('Test Case 4: Logout User', async ({ sharedLoginPage }) => {
    await sharedLoginPage.expectLoggedIn();
    await sharedLoginPage.logout();
    await sharedLoginPage.expectLoggedOut();
  });
});

test('Test Case 3: Login User with incorrect email and password', async ({ loginPage }) => {
  const invalidUser = loginUsers.find(row => row.status === 'invalid');
  if (!invalidUser) throw new Error('No invalid login user found in Excel');

  await loginPage.login(invalidUser);
  await expect(loginPage.loginError).toHaveText('Your email or password is incorrect!');
});

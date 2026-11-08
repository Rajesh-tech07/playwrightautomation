import { ECDH, randomUUID } from 'node:crypto';
import { test, expect } from '../fixtures/baseTest';
import { readLoginData, readSignUpData } from '../support/testData';
import { LoginPage } from '../pages/LoginPage';

test('Test Case 1: Register User', async ({ signUpPage }) => {
  const user = readSignUpData();
  // A new email lets this test run repeatedly without changing the workbook.
  user.email_Address = user.email_Address.replace('@', `+${randomUUID()}@`);
  await signUpPage.startSignup(user);
  await signUpPage.fillPersonalDetails(user);
  await signUpPage.fillAddressDetails(user);
  await signUpPage.createAccount();
  await signUpPage.expectAccountCreated();

  // Delete only the account created by this test.
  await signUpPage.continueAfterSignup();
  await signUpPage.deleteAccount();
  await signUpPage.expectAccountDeleted();
});

test('Test Case 5: Register User with existing email', async ({ signUpPage }) => {
  const existingUser = readLoginData().find(row => row.status === 'valid');
  if (!existingUser) throw new Error('No existing user found in the Login sheet');

  const user = readSignUpData();
  user.email_Address = existingUser.email_address;
  await signUpPage.startSignup(user);
  await expect(signUpPage.existingEmailError).toHaveText('Email Address already exist!');
});

test.only('Test Case 14: Place Order: Register while Checkout', async ({ page, homePage, signUpPage, cartPage, checkoutPage, productsPage, loginPage }) => {

  test.setTimeout(120_000);

  const user = readSignUpData();
  user.email_Address = user.email_Address.replace('@', `+${randomUUID()}@`);

  await expect(page).toHaveTitle('Automation Exercise');
  await productsPage.addProductToCart(0);
  await productsPage.viewcart();
  await expect(page).toHaveTitle('Automation Exercise - Checkout');
  await cartPage.proccedToCheckout();
  await cartPage.registeraccount();
  await signUpPage.startSignup(user);
  await signUpPage.fillPersonalDetails(user);
  await signUpPage.fillAddressDetails(user);
  await signUpPage.createAccount();
  await signUpPage.continueAfterSignup();


  await loginPage.expectLoggedIn();
  await homePage.viewcart();
  await cartPage.proccedToCheckout();

  await checkoutPage.expectAddressDetails(user);
  await checkoutPage.expectReviewYourOrder();
  await checkoutPage.expectProduct('Blue Top', 'Rs. 500', '1', 'Rs. 500');
  await checkoutPage.placeOrder('test');
  await checkoutPage.enterCardDetails('test', 4111111111111111, 125, 10, 2029);
});

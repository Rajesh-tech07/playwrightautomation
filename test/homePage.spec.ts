import { env } from '../config/env';
import { test, expect } from '../fixtures/baseTest';
import { HomePage } from '../pages/HomePage';
import { readLoginData } from '../support/testData';

test('Test Case 10: Verify Subscription in home page', async ({ page, homePage }) => {

    await expect(page).toHaveTitle('Automation Exercise');
    await homePage.footerview();
    await homePage.subscription(env.username);
    await homePage.expectsubscription();


});

test('Test Case 11: Verify Subscription in Cart page', async ({ page, homePage }) => {

    await homePage.viewcart();
    await homePage.footerview();
    await homePage.subscription(env.username);
    await homePage.expectsubscription();

});
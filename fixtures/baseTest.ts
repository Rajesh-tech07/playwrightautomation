import { test as base } from '@playwright/test';
import { ContactUsPage } from '../pages/ContactUsPage';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { SignUpPage } from '../pages/SignUpPage';
import { HomePage } from '../pages/HomePage';
import { cartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

type PageFixtures = {
  contactUsPage: ContactUsPage;
  loginPage: LoginPage;
  productsPage: ProductsPage;
  signUpPage: SignUpPage;
  homePage: HomePage;
  cartPage: cartPage;
  checkoutPage: CheckoutPage;
};

type WorkerFixtures = {
  sharedLoginPage: LoginPage;
};

export const test = base.extend<PageFixtures, WorkerFixtures>({
  page: async ({ page }, use) => {
    await page.goto('/');
    await use(page);
  },

  contactUsPage: async ({ page }, use) => {
    await use(new ContactUsPage(page));
  },

  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  productsPage: async ({ page }, use) => {
    await use(new ProductsPage(page));
  },

  signUpPage: async ({ page }, use) => {
    await use(new SignUpPage(page));
  },

  homePage: async ({ page }, use) => {
    await use(new HomePage(page))
  },

  cartPage: async ({ page }, use) => {
    await use(new cartPage(page))
  },

  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },

  // The serial login/logout tests share this session. Other tests use fresh pages.
  sharedLoginPage: [async ({ browser }, use, workerInfo) => {
    const context = await browser.newContext({ baseURL: workerInfo.project.use.baseURL });

    try {
      const page = await context.newPage();
      await page.goto('/');
      await use(new LoginPage(page));
    } finally {
      await context.close();
    }
  }, { scope: 'worker' }],


});

export { expect } from '@playwright/test';



import { asyncWrapProviders } from 'node:async_hooks';
import { test, expect } from '../fixtures/baseTest';

test('Test Case 12: Add Products in Cart', async ({ page, homePage, productsPage, cartPage }) => {
    await expect(page).toHaveTitle('Automation Exercise');
    await homePage.viewProdcut();
    await productsPage.expectAllProductsPage();

    await productsPage.addProductToCart(0);
    await productsPage.successPopup();

    await productsPage.addProductToCart(1);
    await cartPage.Viewcart();

    await cartPage.expectCartVisible(2);
    await cartPage.expectProduct('Blue Top', 'Rs. 500', '1', 'Rs. 500');
    await cartPage.expectProduct('Men Tshirt', 'Rs. 400', '1', 'Rs. 400');
});

test.only('Test Case 13: Verify Product quantity in Cart', async ({ page, homePage, productsPage, cartPage }) => {
    await expect(page).toHaveTitle('Automation Exercise');

    await homePage.viewProdcut();
    await productsPage.openFirstProduct();
    await expect(page).toHaveTitle('Automation Exercise - Product Details');

    await productsPage.addProductQty('4');
    await productsPage.addTocart();
    await productsPage.viewcart();

    await cartPage.expectProduct('Blue Top', 'Rs. 500', '4', 'Rs. 2000');

})

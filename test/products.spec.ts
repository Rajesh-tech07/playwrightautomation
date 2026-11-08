import { test, expect } from '../fixtures/baseTest';

test('Test Case 8: Verify All Products and product detail page', async ({ page, productsPage }) => {
  await expect(page).toHaveTitle('Automation Exercise');
  await productsPage.openProducts();
  await productsPage.expectAllProductsPage();
  await productsPage.expectProductsVisible();

  await productsPage.openFirstProduct();
  await productsPage.expectProductDetailsVisible();

  // These expected values belong to this product scenario.
  await expect(productsPage.productName).toHaveText('Blue Top');
  await expect(productsPage.productCategory).toHaveText('Category: Women > Tops');
  await expect(productsPage.productPrice).toHaveText('Rs. 500');
  await expect(productsPage.productAvailability).toHaveText('Availability: In Stock');
  await expect(productsPage.productCondition).toHaveText('Condition: New');
  await expect(productsPage.productBrand).toHaveText('Brand: Polo');
});

test('Test Case 9: Search Product', async ({ page, productsPage }) => {
  const searchTerm = 'white';
  const expectedProductNames = [
    'Summer White Top',
    'Sleeves Printed Top - White',
    'Printed Off Shoulder Top - White',
  ];

  await expect(page).toHaveTitle('Automation Exercise');
  await productsPage.openProducts();
  await productsPage.expectAllProductsPage();
  await productsPage.searchProduct(searchTerm);
  await productsPage.expectSearchResults(expectedProductNames);
});


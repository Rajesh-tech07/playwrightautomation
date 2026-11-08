import { expect, type Locator, type Page } from '@playwright/test';
import { addAbortSignal } from 'node:stream';

export class ProductsPage {
  readonly productsLink: Locator;
  readonly allProductsHeading: Locator;
  readonly productList: Locator;
  readonly productNames: Locator;
  readonly productName: Locator;
  readonly productCategory: Locator;
  readonly productPrice: Locator;
  readonly productAvailability: Locator;
  readonly productCondition: Locator;
  readonly productBrand: Locator;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly searchedProductsHeading: Locator;
  readonly continueShopping: Locator;
  readonly productQuantity: Locator;
  readonly addToCartButton: Locator;
  readonly viewCart: Locator;

  constructor(readonly page: Page) {
    this.productsLink = page.getByRole('link', { name: 'Products' });
    this.allProductsHeading = page.getByRole('heading', { name: 'All Products', exact: true });
    this.productList = page.locator('.features_items .product-image-wrapper');
    this.productNames = this.productList.locator('.productinfo p');
    this.searchInput = page.locator('#search_product');
    this.searchButton = page.locator('#submit_search');
    this.searchedProductsHeading = page.getByRole('heading', { name: 'Searched Products', exact: true });

    const details = page.locator('.product-information');
    this.productName = details.locator('h2');
    this.productCategory = details.locator('p').filter({ hasText: 'Category:' });
    this.productPrice = details.getByText(/^Rs\.\s*\d+$/);
    this.productAvailability = details.locator('p').filter({ hasText: 'Availability:' });
    this.productCondition = details.locator('p').filter({ hasText: 'Condition:' });
    this.productBrand = details.locator('p').filter({ hasText: 'Brand:' });

    this.continueShopping = page.locator('#cartModal').getByRole('button', { name: 'Continue Shopping' });

    this.productQuantity = page.locator('#quantity');
    this.addToCartButton = page.getByText('Add to cart')
    this.viewCart = page.getByRole('link', { name: 'View Cart' });
  }

  async openProducts() {
    await this.productsLink.click();
  }

  async openFirstProduct() {
    await this.productList.first().getByRole('link', { name: 'View Product' }).click();
  }

  async searchProduct(searchTerm: string) {
    await this.searchInput.fill(searchTerm);
    await this.searchButton.click();
  }

  async expectAllProductsPage() {
    await expect(this.page).toHaveURL(/\/products/);
    await expect(this.allProductsHeading).toBeVisible();
  }

  async expectProductsVisible() {
    await expect(this.productList.first()).toBeVisible();

    const total = await this.productList.count();
    for (let i = 0; i < total; i++) {
      await expect(this.productList.nth(i)).toBeVisible();
    }
  }

  async expectProductDetailsVisible() {
    await expect(this.page).toHaveURL(/\/product_details\/\d+/);
    await expect(this.productName).toBeVisible();
    await expect(this.productCategory).toBeVisible();
    await expect(this.productPrice).toBeVisible();
    await expect(this.productAvailability).toBeVisible();
    await expect(this.productCondition).toBeVisible();
    await expect(this.productBrand).toBeVisible();
  }

  async expectSearchResults(expectedProductNames: string[]) {
    await expect(this.searchedProductsHeading).toBeVisible();
    await expect(this.productList).toHaveCount(expectedProductNames.length);
    // The site can insert advertising links into the product-name paragraphs.
    await expect(this.productNames).toContainText(expectedProductNames);
    await this.expectProductsVisible();
  }

  async successPopup() {
    await this.continueShopping.click();
    await expect(this.page.locator('#cartModal')).toBeHidden();
  }

  async addProductToCart(index: number) {
    const product = this.productList.nth(index);

    await product.hover();
    await product.locator('.product-overlay .add-to-cart').click();
    await expect(this.page.locator('#cartModal')).toBeVisible();
  }

  async addProductQty(qty: string) {
    await this.productQuantity.fill(qty);
  }

  async addTocart() {
    await this.addToCartButton.click();

  }

  async viewcart() {
    await this.viewCart.click();
  }
}




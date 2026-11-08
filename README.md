# Playwright UI automation

Tests describe scenarios and expected values. Page classes provide actions and
reusable assertions. Fixtures create page objects and manage browser sessions.

## Where the code belongs

| Location | Responsibility |
| --- | --- |
| `test/` | Scenario flow, test data, and scenario-specific expected values |
| `pages/` | Locators, actions, and reusable checks named `expect...` |
| `fixtures/baseTest.ts` | Create page objects, open the home page, and manage session cleanup |
| `support/testData.ts` | Read named Excel sheets and check for missing sheets or empty data |
| `types/auth.ts` | Describe the Excel row fields |
| `test-data/` | Portable files used by the tests, such as the contact-form attachment |
| `config/env.ts` | Load SIT or UAT settings and check `BASE_URL` |
| `playwright.config.ts` | Browser, reporting, retries, and shared options |

## Run locally in PowerShell

```powershell
npm.cmd ci
npx.cmd playwright install chromium
if (!(Test-Path .env.sit)) { Copy-Item .env.example .env.sit }
$env:TEST_ENV = 'sit'
npm.cmd run test:headed
```

Create `.env.uat` with its own `BASE_URL` to use UAT, then set
`$env:TEST_ENV = 'uat'`. SIT is the default when `TEST_ENV` is not set.
Existing environment files contain local settings and are ignored by Git.

Other commands:

```powershell
npm.cmd run typecheck
npm.cmd test
npm.cmd run test:debug
npm.cmd run test:list
npm.cmd run report
```

The project includes its own TypeScript compiler. If VS Code reports missing
Node types such as `node:path` or `__dirname`, open `D:\playwrightframework` as
the project folder, then run **TypeScript: Select TypeScript Version** from the
command palette and choose **Use Workspace Version**. The project configuration
already includes `"types": ["node"]`.

## Test data

`UserData.xlsx` stays in the project root. The reader selects `Register`,
`Login`, and `contactus` by name. It accepts the existing trailing space in the Register tab name.
The first row contains headers. Headers must match `types/auth.ts` exactly.
The existing signup header spellings are preserved to match the workbook.

`readSignUpData()` returns the first signup row, `readLoginData()` returns all
login rows, and `readContactData()` returns the first contact row. Each reader
checks only that its sheet and data exist, then returns the data.

The Login sheet needs `email_address`, `password`, and `status` columns, with
one `valid` row and one `invalid` row, using those exact lowercase status values.
The valid credentials must belong to an existing account in the selected
environment. Each login test uses the first
row matching its status.

The signup test reads the first Register row, adds a unique suffix to its email,
checks account creation, and deletes that newly created account. It does not
change the workbook or the account used by the valid login test.
The existing-email signup test uses the valid login account's email and reads
its own signup data so it does not depend on the registration test.

The signup actions are split into `startSignup()`, `fillPersonalDetails()`,
`fillAddressDetails()`, and `createAccount()` so the test reads in form order.
The current practice flow uses Mr., 7 October 1995, and Australia as fixed values.

The contact sheet uses `name`, `email`, `subject`, and `message` headers. The
contact test uploads `test-data/contact-attachment.txt`, submits the practice
form, checks the success message, and returns home.

## Adding a test

Import `test` and `expect` from `../fixtures/baseTest`. Request the page object
you need in the test arguments: `loginPage`, `signUpPage`, `contactUsPage`, or
`productsPage`. The fixture creates it on a fresh page and opens the home page.

Use reusable page checks for repeated UI expectations. Keep values specific to
the scenario, such as prices, error messages, and expected search results, in
the test. For example:

```ts
import { test, expect } from '../fixtures/baseTest';
test('Check the first product', async ({ productsPage }) => {
  await productsPage.openProducts();
  await productsPage.expectAllProductsPage();
  await productsPage.expectProductsVisible();
  await productsPage.openFirstProduct();
  await productsPage.expectProductDetailsVisible();

  await expect(productsPage.productName).toHaveText('Blue Top');
  await expect(productsPage.productPrice).toHaveText('Rs. 500');
});
```

The `Login flow` group in `test/loginflow.spec.ts` requests `sharedLoginPage`.
This worker-scoped fixture creates one browser context and closes it during
fixture teardown. Serial execution runs login first and then logout on the same
session. If login fails, logout is skipped; retries recreate the session and run
the group again. Invalid login stays outside the group and uses the regular
`loginPage` fixture with its own fresh session.

The search test supplies the expected product names to
`productsPage.expectSearchResults(expectedProductNames)`. That page method checks
the heading, the exact result count, each expected product name, and visibility
of every returned card. Product names use a text-contains check because the
practice site can insert advertising links into the same name paragraphs.

To watch only the dependent login and logout tests:

```powershell
npx.cmd playwright test test/loginflow.spec.ts --headed -g "Login flow"
```

Local actions use `slowMo: 500` so they are easy to watch when headed. CI runs
without that delay and gets `BASE_URL` from the repository variable, falling
back to the Automation Exercise practice site.
# playwrightautomation

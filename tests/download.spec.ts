import { test, expect } from '@playwright/test';

const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36';

const validEmail = 'ayuwwee16@gmail.com';
const validPassword = 'qwerty123';

// Login function reusable
async function login(page) {
  await page.goto('https://24slides.com/templates/featured');
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill(validEmail);
  await page.getByRole('textbox', { name: 'Password' }).fill(validPassword);
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForURL('**/templates/featured');
}

test.describe('Automation testing download template 24Slides', () => {
  test('TC_Download_01 - Download without Login', async ({browser}) => {
    const context = await browser.newContext({ userAgent });
    const page = await context.newPage();

    await login(page)
    await page.getByRole('link', {name: 'FREE Mexican Food Powerpoint Template PowerPoint Template'}).click()
    await expect(page.getByRole('link', { name: 'Signup Free to download' })).toBeVisible();
    await page.getByRole('link', { name: 'Signup Free to download' }).click();

    // captcha validation in here

    await expect(page.locator('jsTabInviteForm')).toBeVisible();
  })

  test('TC_Download_02 - Download PowerPoint template after successful login', async ({ browser }) => {
    const context = await browser.newContext({ userAgent });
    const page = await context.newPage();

    await login(page);
    await page.getByRole('link', { name: 'FREE Mexican Food Powerpoint Template PowerPoint Template' }).click();
    await page.getByRole('button', { name: 'Download' }).click();

    await expect(page.getByText('Your download will begin shortly')).toBeVisible();
  });

  test('TC_Download_03 - Download Google Slides template after successful login', async ({ browser }) => {
    const context = await browser.newContext({ userAgent });
    const page = await context.newPage();

    await login(page);
    await page.getByRole('link', { name: 'Google Slides' }).click();
    await page.getByRole('link', { name: 'FREE Google Slides Calendar Icons PowerPoint Template' }).click();
    await page.getByRole('button', { name: 'Download' }).click();

    await expect(page.getByText('Your download will begin shortly')).toBeVisible();
  });

  test('TC_Download_04 - Download from header "Featured" section', async ({ browser }) => {
    const context = await browser.newContext({ userAgent });
    const page = await context.newPage();

    await login(page);
    await page.getByRole('link', { name: 'Featured' }).click();
    await page.getByRole('link', { name: 'FREE AI Business Powerpoint Slide PowerPoint Template' }).click();
    await page.getByRole('button', { name: 'Download' }).click();

    await expect(page.getByText('Your download will begin shortly')).toBeVisible();
  });

  test('TC_Download_05 - Download from sidebar "Featured" section', async ({ browser }) => {
    const context = await browser.newContext({ userAgent });
    const page = await context.newPage();

    await login(page);
    await page.getByRole('link', { name: 'Featured', exact: true }).click(); // sidebar
    await page.getByRole('link', { name: 'FREE Mexican Food Powerpoint Template PowerPoint Template' }).click();
    await page.getByRole('button', { name: 'Download' }).click();

    await expect(page.getByText('Your download will begin shortly')).toBeVisible();
  });

  test('TC_Download_06 - Download template using valid keyword search', async ({ browser }) => {
    const context = await browser.newContext({ userAgent });
    const page = await context.newPage();

    await login(page);
    await page.getByPlaceholder('Search for free templates').fill('business');
    await page.keyboard.press('Enter');

    const result = page.getByRole('link', { name: /business/i }).first();
    await result.click();
    await page.getByRole('button', { name: 'Download' }).click();

    await expect(page.getByText('Your download will begin shortly')).toBeVisible();
  });

  test('TC_Download_07 - Search template using invalid keyword', async ({ browser }) => {
    const context = await browser.newContext({ userAgent });
    const page = await context.newPage();

    await login(page);
    await page.getByPlaceholder('Search for free templates').fill('bussinesss'); // typo keyword
    await page.keyboard.press('Enter');

    await expect(page.getByText(/no templates found/i)).toBeVisible();
  });
})
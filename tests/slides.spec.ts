import { test, expect } from '@playwright/test';

const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36';

test('TC_Login_01 - Login with valid email & password', async ({ browser }) => {
  const context = await browser.newContext({ userAgent });
  const page = await context.newPage();

  await page.goto('https://24slides.com/templates/featured');
  await page.getByRole('link', {name:'Login'}).click()

  await page.getByRole('textbox', {name:'Email'}).fill('ayuwwee16@gmail.com')
  await page.getByRole('textbox', {name:'Password'}).fill('qwerty123')
  await page.getByRole('button', {name:'Login'}).click()

  await expect(page.locator('text=Our Free Powerpoint Templates')).toBeVisible();
});

test('TC_Login_02 - Login with invalid email', async ({ browser }) => {
  const context = await browser.newContext({ userAgent });
  const page = await context.newPage();

  await page.goto('https://24slides.com/templates/featured');
  await page.getByRole('link', { name: 'Login' }).click();

  await page.getByRole('textbox', { name: 'Email' }).fill('ayuwwee@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('qwerty123');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.locator('text=These credentials do not match our records.')).toBeVisible();
});

test('TC_Login_03 - Login with email without @', async ({ browser }) => {
  const context = await browser.newContext({ userAgent });
  const page = await context.newPage();

  await page.goto('https://24slides.com/templates/featured');
  await page.getByRole('link', { name: 'Login' }).click();

  const emailInput = page.getByRole('textbox', { name: 'Email' });
  await emailInput.fill('invalidemail');
  await page.getByRole('textbox', { name: 'Password' }).fill('qwerty123');
  await page.getByRole('button', { name: 'Login' }).click();

  const validation = await emailInput.evaluate(el => (el as HTMLInputElement).validationMessage);
  expect(validation).toBe("Please include an '@' in the email address. 'invalidemail' is missing an '@'.");
});

test('TC_Login_04 - Login with wrong password', async ({ browser }) => {
  const context = await browser.newContext({ userAgent });
  const page = await context.newPage();

  await page.goto('https://24slides.com/templates/featured');
  await page.getByRole('link', { name: 'Login' }).click();

  await page.getByRole('textbox', { name: 'Email' }).fill('ayuwwee16@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('wrongpassword');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.locator('text=These credentials do not match our records.')).toBeVisible();
});

test('TC_Login_05 - Login with empty fields', async ({ browser }) => {
  const context = await browser.newContext({ userAgent });
  const page = await context.newPage();

  await page.goto('https://24slides.com/templates/featured');
  await page.getByRole('link', { name: 'Login' }).click();

  const emailInput = page.getByRole('textbox', { name: 'Email' });
  const passwordInput = page.getByRole('textbox', { name: 'Password' });
  await page.getByRole('button', { name: 'Login' }).click();

  const emailValidation = await emailInput.evaluate(el => (el as HTMLInputElement).validationMessage);
  const passwordValidation = await passwordInput.evaluate(el => (el as HTMLInputElement).validationMessage);

  expect(emailValidation).toBe('Please fill out this field.');
  expect(passwordValidation).toBe('Please fill out this field.');
});

test('TC_Login_06 - Login with empty email field', async ({ browser }) => {
  const context = await browser.newContext({ userAgent });
  const page = await context.newPage();

  await page.goto('https://24slides.com/templates/featured');
  await page.getByRole('link', { name: 'Login' }).click();

  const emailInput = page.getByRole('textbox', { name: 'Email' });
  await page.getByRole('textbox', { name: 'Password' }).fill('qwerty123');
  await page.getByRole('button', { name: 'Login' }).click();

  const emailValidation = await emailInput.evaluate(el => (el as HTMLInputElement).validationMessage);
  expect(emailValidation).toBe('Please fill out this field.');
});

test('TC_Login_07 - Login with empty password field', async ({ browser }) => {
  const context = await browser.newContext({ userAgent });
  const page = await context.newPage();

  await page.goto('https://24slides.com/templates/featured');
  await page.getByRole('link', { name: 'Login' }).click();

  const passwordInput = page.getByRole('textbox', { name: 'Password' });
  await page.getByRole('textbox', { name: 'Email' }).fill('ayuwwee16@gmail.com');
  await page.getByRole('button', { name: 'Login' }).click();

  const passwordValidation = await passwordInput.evaluate(el => (el as HTMLInputElement).validationMessage);
  expect(passwordValidation).toBe('Please fill out this field.');
});
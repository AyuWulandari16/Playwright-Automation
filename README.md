# 📘 Playwright Automation for 24Slides - Login & Download Feature

**This project uses Playwright to automate testing of the login and download features on the 24Slides website.** The tests are written in **TypeScript** and run automatically on the **Chromium** browser with a simulated **Chrome user-agent** to ensure Chrome is used and reduce the chance of CAPTCHA.

---

## 🚀 Key Features

- 🔐 **Automated Login Tests**: Covers login tests with valid, invalid, empty emails, and authentication via Google and LinkedIn.
- 📥 **Automated Download Template**: Tests to ensure the download feature works properly.
- 🛠️ **User-Agent Spoofing**: Ensures tests run on the desired browser by spoofing the Chrome user-agent.
- 🐞 **Debugging Support**: Use `await page.pause()` for interactive debugging during tests.

---

## 🛠️ Technologies Used

- **Playwright** – A modern browser automation framework supporting Chromium, Firefox, and WebKit.
- **TypeScript** – The programming language used to write the test scripts.
- **Chromium** – The main browser used for testing.
- **Node.js** – JavaScript runtime environment needed to run Playwright.
- **VS Code** – Recommended code editor for development and debugging.

---

## 📌 Catatan Tambahan

**Beberapa interaksi seperti CAPTCHA tidak bisa diotomatisasi karena bersifat proteksi terhadap bot.**

---

## 🚀 How to Run Tests

### 1. Install Dependencies

Make sure **Node.js** is installed, then run:

```bash
npm install

```

### 2. Run Test

- **Run all tests with default settings:**

```bash
npx playwright test
```

- **Run tests with Playwright's interactive UI:**

```bash
npx playwright test --ui
```

- **Run tests with the browser in headed mode (visible browser):**

```bash
npx playwright test --headed
```

- **Run a specific test file on the Chromium project in headed mode:**

```bash
npx playwright test ./tests/slides.spec.ts --project=chromium --headed
```

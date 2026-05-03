
---

## 🚀 Key Features

### ✔ UI Automation
- Login (standard + locked user)
- Inventory validation
- Cart operations
- Checkout flow

### ✔ API Automation
- Authentication (token generation)
- Booking CRUD operations
- DELETE validation
- Response validation

### ✔ Framework Design
- Page Object Model (POM)
- API Client abstraction
- Data-driven testing
- Tag-based execution (`@ui`, `@api`, `@auth`, `@booking`, `@checkout`)

---

## 🏷️ Test Tags

Used for CI filtering:

| Tag | Purpose |
|-----|--------|
| @ui | UI test suite |
| @api | API test suite |
| @login | Login flows |
| @inventory | Inventory tests |
| @checkout | Checkout flow |
| @auth | Authentication API |
| @booking | Booking API |
| @crud | Full API lifecycle |

---

## ▶️ Running Tests Locally

1. Install dependencies
```bash
npm install

2. Install Playwright browsers
```bash
npx playwright install --with-deps

3. Run ALL tests
```bash
npx playwright test

          OR

4.Run UI tests only
```bash
npx playwright test --grep @ui

5.Run API tests only
```bash
npx playwright test --grep @api

6.Run a specific tag test (using tags table above)
```bash
npx playwright test --grep {@tag}  
e.g. npx playwright test --grep @login

Finally to view report:
npx playwright show-report

After CI execution, reports are generated via GitHub Actions and stored as artifacts:
monocart-report/index.html
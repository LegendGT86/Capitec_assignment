
# Playwright UI + API Automation Framework  

---

## Architecture & Design

The framework follows a **layered automation architecture**:

### UI Layer (Page Object Model)
- Implements Page Object Model (POM)
- Encapsulates UI selectors and actions
- Pages include:
  - LoginPage
  - InventoryPage
  - CartPage
  - CheckoutPage


---

### API Layer (Client Abstraction)
- API interactions encapsulated in service clients:
  - AuthClient
  - BookingClient
- Handles request construction, logging, and response processing

**Benefit:** Centralised API logic enables reuse and simplifies test readability.

---

### Test Data Layer
- Centralised test data stored in `/test-data`
- Includes:
  - Users
  - Products
  - Booking payloads

---

## Testing Strategy

### ✔ UI Test Coverage
- Authentication (valid + locked user)
- Product inventory validation
- Cart operations
- End-to-end checkout flow

### API Test Coverage
- Authentication token generation
- Full booking CRUD lifecycle:
  - Create
  - Read
  - Update
  - Delete
- DELETE verification (404 validation)

---

## 🏷️ Tag-Based Execution Strategy

Tests are categorised using tags for selective execution:

- `@ui` → UI test suite
- `@api` → API test suite
- `@login` → Login tests
- `@inventory` → Inventory tests
- `@checkout` → Checkout flow
- `@auth` → Authentication API
- `@booking` → Booking API
- `@crud` → Full API lifecycle tests

**Benefit:** Enables modular CI execution and faster feedback cycles.


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
npx playwright test --grep @login
npx playwright test --grep @booking

Finally to view report:
npx playwright show-report

After CI execution, reports are generated via GitHub Actions and stored as artifacts:
monocart-report/index.html
---

## ⚙️ CI/CD Integration

The framework uses **GitHub Actions** with separated pipelines:

### ✔ UI Pipeline
- Runs all `@ui` tests
- Executes in isolated job
- Produces Monocart HTML report

### ✔ API Pipeline
- Runs all `@api` tests
- Executes CRUD lifecycle validation
- Produces separate API report

### ✔ Reporting
- Monocart reporter generates detailed HTML reports
- Reports uploaded as CI artifacts

---

## 📊 Key Engineering Principles Demonstrated

- Page Object Model (POM)
- API Client Abstraction Pattern
- Data-driven testing approach
- Separation of concerns (UI / API / Data)
- Tag-based test orchestration
- CI/CD pipeline separation
- Structured logging and reporting

---

## 🧠 Design Decisions

- UI and API layers are fully separated for scalability
- Test data is externalised to improve maintainability
- Tags are used instead of hardcoded test filtering
- CI pipeline is split to isolate failure domains
- Framework prioritises readability and long-term extensibility

---

## ⚠️ Known Limitations

- API tests share lifecycle state (bookingId dependency)
- No environment matrix (single QA environment used)
- Limited parallelisation for API lifecycle tests
- Minimal retry strategy configured in CI

---

## 🚀 Future Improvements

- Introduce Playwright fixtures for API authentication
- Implement dynamic test data generation (faker-based)
- Add full test isolation for API lifecycle tests
- Expand CI with traces, videos, and screenshots
- Add multi-environment support (QA/Staging/Prod)
- Containerised execution via Docker

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
![Cypress Tests](https://github.com/veronikakurhajcova/cypress-rwa-tests/actions/workflows/cypress.yml/badge.svg)
# Cypress Real World App - E2E Testing Project

This repository contains a robust end-to-end (E2E) testing solution for the "Cypress Real World App". The project demonstrates modern automated testing practices with a focus on maintainability, security, and clean code architecture.

## 🛠 Tech Stack & Practices
* **Cypress**: E2E testing framework.
* **Page Object Model (POM)**: Decoupling page logic from test scripts for better maintainability.
* **Data-Driven Testing**: Utilizing fixture files for managing test data.
* **CI/CD Readiness**: Configured for automated testing via GitHub Actions.

## 🔒 Security & Data Privacy
To ensure security, sensitive data (credentials, bank information) is NOT included in this repository.
- Real `.json` files are excluded via `.gitignore`.
- For local execution, please use the provided `.example` files as templates.

## 🚀 How to Get Started
1. **Clone the repo:** `git clone https://github.com/veronikakurhajcova/cypress-rwa-tests.git`
2. **Install dependencies:** `npm install`
3. **Setup Data:** - Copy the `*.json.example` files in `cypress/fixtures/` and rename them to `*.json`.
   - Populate these files with your own test data.
4. **Run Tests:** Use `npx cypress open` for interactive mode or `npx cypress run` for headless execution.

## 🐛 Known Issues
The application contains several identified bugs which are documented in the [ISSUES.md](ISSUES.md) file. Affected test cases are marked with `it.skip` to ensure a clean test suite execution.

class LoginPage {
    getUsernameField() {
        return cy.get('#username');
    }

    getPasswordField() {
        return cy.get('#password');
    }

    getSubmitButton() {
        return cy.get('[data-test="signin-submit"]')
    }

    getErrorLoginMsg() {
        return cy.get('[data-test="signin-error"]')
    }

    getUsernameHelperText() {
        return cy.get('#username-helper-text')
    }

    getPasswordHelperText() {
        return cy.get('#password-helper-text')
    }

    getRememberMeCheckbox() {
        return cy.get('[name=remember]')
    }

// Methods
    login(username, password) {
        this.getUsernameField().type(username);
        this.getPasswordField().type(password);
        this.getSubmitButton().click();
    }
}

export default LoginPage;
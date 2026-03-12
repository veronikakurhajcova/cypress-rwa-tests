class CreateBankAccountPage {

    getBankNameInput()  {
        return cy.get('#bankaccount-bankName-input')
    }

    getNewBankAccountButton() {
            return cy.get('[data-test="bankaccount-new"]');
    }

    getRoutingNumberInput() {
        return cy.get('#bankaccount-routingNumber-input')
    }

    getAccountNumberInput() {
        return cy.get('#bankaccount-accountNumber-input')
    }

    getSaveButton() {
        return cy.get('[data-test="bankaccount-submit"]')
    }

    // Methods

    clickCreateBankAccount() {
        this.getNewBankAccountButton().click();
    }

    fillCreateBankAccountForm(bankName, routingNumber, accountNumber) {
        this.getBankNameInput().type(bankName);
        this.getRoutingNumberInput().type(routingNumber);
        this.getAccountNumberInput().type(accountNumber);
    }

    saveCreatedBankAccount() {
        this.getSaveButton().click();
    }
}

export default CreateBankAccountPage;
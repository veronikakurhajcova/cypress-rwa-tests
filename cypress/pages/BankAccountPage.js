class BankAccountPage {

    getNewBankAccountButton() {
        return cy.get('[data-test="bankaccount-new"]');
    }

    getDeleteButton() {
        return cy.get('[data-test="bankaccount-delete"]');
    }

// Methods
    clickNewBankAccount() {
        this.getNewBankAccountButton().click({ force: true });
    }

    verifyNewBankIsExist(bankName) {
        cy.contains('p', bankName).should('be.visible');
    }

  clickDeleteBankAccount() {
     cy.get('li')
        .not(':contains("Deleted")')
        .find('[data-test="bankaccount-delete"]')
        .first()
        .click({ force: true });
  }

    verifyBankAccountIsDeleted(bankName) {
        cy.contains('p', `${bankName} (Deleted)`).should('be.visible',{ timeout: 10000 });
    }

}

export default BankAccountPage;
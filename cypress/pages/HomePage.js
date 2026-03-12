class HomePage {

    getSideNavBankAccounts() {
        return cy.get('[data-test="sidenav-bankaccounts"]')
    }

    getNewTransactionBtn() {
        return cy.get('[data-test="nav-top-new-transaction"]')
    }

    // Methods
    clickSideNavBankAccounts() {
        this.getSideNavBankAccounts().click();
    }

    clickNewTransaction() {
        this.getNewTransactionBtn().click();
    }


}

export default HomePage;
class NewTransactionPage {

    getUserListSearchInput() {
        return cy.get('[data-test="user-list-search-input"]')
    }

    getUserListItem() {
        return cy.get('[data-test="users-list"]')
    }

    getAmountInput() {
        return cy.get('#amount')
    }

    getNewTransactionDescriptionInput() {
        return cy.get('#transaction-create-description-input')
    }

    getPayButton() {
        return cy.get('[data-test="transaction-create-submit-payment"]')
    }

    getRequestButton() {
    return cy.get('[data-test="transaction-create-submit-request"]')
    }

    searchUser(username) {
        this.getUserListSearchInput().type(username);
        this.getUserListItem().contains(username).click();
    }

// Methods
   verifySelectedUser(username) {
       cy.contains('h2', username).should('be.visible');
   }

   fillTransactionDetail(amount, description) {
       this.getAmountInput().clear().type(amount);
       this.getNewTransactionDescriptionInput().focus().type(description)
   }

   clickPayment() {
       this.getPayButton().click();
   }

   clickRequest() {
       this.getRequestButton().click();
   }

     verifyUserAmountWithDescription(username, amount, description) {
         cy.contains('h2', username).should('be.visible');
         cy.contains('h2', amount).should('be.visible');
         cy.contains('h2', description).should('be.visible');
     }


}

export default NewTransactionPage;
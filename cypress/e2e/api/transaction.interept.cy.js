describe('Bank Account API - intercept', () => {

    beforeEach(function() {
      cy.fixture('users').then((users) => {
        cy.loginBySession(users.validUser.username, users.validUser.password)
        cy.visit('/bankaccounts');
      })
  });


  it('should display empty state instead of error message on 500 - KNOWN BUG', function() {
    cy.intercept('POST', '/graphql', (req) => {
      if (req.body.operationName === 'ListBankAccount') {
        req.reply({ statusCode: 500 });
      }
    }).as('listBankAccount');

    cy.visit('/bankaccounts');
    cy.wait('@listBankAccount');
    cy.contains('No Bank Accounts').should('be.visible');
  });

  it('should return empty bank account list', function() {
    cy.intercept('POST', '/graphql', (req) => {
      if (req.body.operationName === 'ListBankAccount') {
        req.reply({ body: { data: { listBankAccount: [] } } });
      }
    }).as('emptyBankAccounts');

    cy.visit('/bankaccounts');
    cy.wait('@emptyBankAccounts');
    cy.contains('No Bank Accounts').should('be.visible');
  });

});
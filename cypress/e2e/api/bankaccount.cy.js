describe('Bank Account API', () => {

  beforeEach(function() {
        cy.fixture('users').then((users) => {
          cy.loginBySession(users.validUser.username, users.validUser.password)
        })
    });

  it('should get list of bank accounts', function() {
    cy.request({
      method: 'POST',
      url: `${Cypress.env('apiUrl')}/graphql`,
      body: {
        operationName: 'ListBankAccount',
        query: `query ListBankAccount {
          listBankAccount {
            id
            bankName
            accountNumber
            routingNumber
          }
        }`
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data.listBankAccount).to.be.an('array');
    });
  });

  it('should create a new bank account', function() {
    cy.request({
      method: 'POST',
      url: `${Cypress.env('apiUrl')}/graphql`,
      body: {
        operationName: 'CreateBankAccount',
        query: `mutation CreateBankAccount($bankName: String!, $routingNumber: String!, $accountNumber: String!) {
          createBankAccount(bankName: $bankName, routingNumber: $routingNumber, accountNumber: $accountNumber) {
            id
            bankName
            routingNumber
            accountNumber
          }
        }`,
        variables: {
          bankName: 'API Test Bank',
          routingNumber: '123456789',
          accountNumber: '987654321'
        }
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data.createBankAccount).to.have.property('id');
      expect(response.body.data.createBankAccount.bankName).to.eq('API Test Bank');
    });
  });

});
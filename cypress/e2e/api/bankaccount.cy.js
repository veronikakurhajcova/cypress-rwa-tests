describe('Bank Account API', () => {

  beforeEach(() => {
    cy.fixture('users').as('users');
  });

  beforeEach(function() {
    cy.loginBySession(this.users.validUser.username, this.users.validUser.password);
  });

  it('should get list of bank accounts', function() {
    cy.request({
      method: 'POST',
      url: 'http://localhost:3001/graphql',
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
      url: 'http://localhost:3001/graphql',
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
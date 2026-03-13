import LoginPage from '../../pages/LoginPage';
import HomePage from '../../pages/HomePage';
import NewTransactionPage from '../../pages/NewTransactionPage';

describe('New transaction', () => {

const loginPage = new LoginPage();
const homePage = new HomePage();
const newTransactionPage = new NewTransactionPage();

beforeEach(() => {
   cy.fixture('users').as('users');
   cy.fixture('accountUsers').as('accountUsers');
})

beforeEach(function() {
     cy.loginBySession(this.users.validUser.username, this.users.validUser.password);
     cy.visit('/');
     homePage.clickNewTransaction();
            newTransactionPage.searchUser(this.accountUsers.validUser.username);
            newTransactionPage.verifySelectedUser(this.accountUsers.validUser.username);
})

it('should create a new payment', function() {
        newTransactionPage.fillTransactionDetail(this.accountUsers.validUser.amount,
                                                 this.accountUsers.validUser.description);
        newTransactionPage.clickPayment();
        newTransactionPage.verifyUserAmountWithDescription(this.accountUsers.validUser.username,
                                                           this.accountUsers.validUser.amount,
                                                           this.accountUsers.validUser.description)
})

it('should request payment', function() {
        newTransactionPage.fillTransactionDetail(this.accountUsers.validUser.amount,
                                                 this.accountUsers.validUser.description);
        newTransactionPage.clickRequest();
        newTransactionPage.verifyUserAmountWithDescription(this.accountUsers.validUser.username,
                                                           this.accountUsers.validUser.amount,
                                                           this.accountUsers.validUser.description)
})

it.skip('should not allow negative amount - KNOWN BUG', function() {
        newTransactionPage.fillTransactionDetail(this.accountUsers.validUser.invalidAmount,
                                                 this.accountUsers.validUser.description);
        newTransactionPage.getPayButton().should('be.disabled');
        newTransactionPage.getRequestButton().should('be.disabled');
})

it('should not allow empty amount and description', () => {
    newTransactionPage.getPayButton().should('be.disabled');
    newTransactionPage.getRequestButton().should('be.disabled');
});

it('should not allow text in amount field', function() {
    newTransactionPage.fillTransactionDetail('abc', this.accountUsers.validUser.description);
    newTransactionPage.getPayButton().should('be.disabled');
    newTransactionPage.getRequestButton().should('be.disabled');
});

it.skip('should not allow SQL injection in amount field', function() {
    newTransactionPage.fillTransactionDetail("' OR '1'='1", this.accountUsers.validUser.description);
    newTransactionPage.getPayButton().should('be.disabled');
    newTransactionPage.getRequestButton().should('be.disabled');
});

it.skip('should not allow amount that exceeds maximum limit', function() {
    newTransactionPage.fillTransactionDetail('999999999999', this.accountUsers.validUser.description);
    newTransactionPage.getPayButton().should('be.disabled');
    newTransactionPage.getRequestButton().should('be.disabled');
});

it('should have numeric inputmode on amount field', () => {
    newTransactionPage.getAmountInput().should('have.attr', 'inputmode', 'numeric');
});

})


import LoginPage from '../../pages/LoginPage';
import HomePage from '../../pages/HomePage';
import NewTransactionPage from '../../pages/NewTransactionPage';

describe('New transaction', () => {

const loginPage = new LoginPage();
const homePage = new HomePage();
const newTransactionPage = new NewTransactionPage();
let users;
let accountUsers;

before(() => {
   cy.fixture('users').then((data) => {
   users = data;
    });
   cy.fixture('accountUsers').then((data) => {
   accountUsers = data;
})
})

beforeEach(() => {
    cy.visit('/signin');
    loginPage.login(users.validUser.username,users.validUser.password);
    cy.url().should('not.include','/signin');
     homePage.clickNewTransaction();
            newTransactionPage.searchUser(accountUsers.validUser.username);
            newTransactionPage.verifySelectedUser(accountUsers.validUser.username);
})

it('should create a new payment', () => {
        newTransactionPage.fillTransactionDetail(accountUsers.validUser.amount, accountUsers.validUser.description);
        newTransactionPage.clickPayment();
        newTransactionPage.verifyUserAmountWithDescription(accountUsers.validUser.username,
                                                           accountUsers.validUser.amount,
                                                           accountUsers.validUser.description)
})

it('should request payment', () => {
        newTransactionPage.fillTransactionDetail(accountUsers.validUser.amount, accountUsers.validUser.description);
        newTransactionPage.clickRequest();
        newTransactionPage.verifyUserAmountWithDescription(accountUsers.validUser.username,
                                                                   accountUsers.validUser.amount,
                                                                   accountUsers.validUser.description)
})

it.skip('should not allow negative amount - KNOWN BUG', () => {
        newTransactionPage.fillTransactionDetail(accountUsers.validUser.invalidAmount, accountUsers.validUser.description);
        newTransactionPage.getPayButton().should('be.disabled');
        newTransactionPage.getRequestButton().should('be.disabled');
})

it('should not allow empty amount and description', () => {
    newTransactionPage.getPayButton().should('be.disabled');
    newTransactionPage.getRequestButton().should('be.disabled');
});

it('should not allow text in amount field', () => {
    newTransactionPage.fillTransactionDetail('abc', accountUsers.validUser.description);
    newTransactionPage.getPayButton().should('be.disabled');
    newTransactionPage.getRequestButton().should('be.disabled');
});

it.skip('should not allow SQL injection in amount field', () => {
    newTransactionPage.fillTransactionDetail("' OR '1'='1", accountUsers.validUser.description);
    newTransactionPage.getPayButton().should('be.disabled');
    newTransactionPage.getRequestButton().should('be.disabled');
});

it.skip('should not allow amount that exceeds maximum limit', () => {
    newTransactionPage.fillTransactionDetail('999999999999', accountUsers.validUser.description);
    newTransactionPage.getPayButton().should('be.disabled');
    newTransactionPage.getRequestButton().should('be.disabled');
});

it('should have numeric inputmode on amount field', () => {
    newTransactionPage.getAmountInput().should('have.attr', 'inputmode', 'numeric');
});

})


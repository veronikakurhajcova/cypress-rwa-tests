import LoginPage from '../../pages/LoginPage';
import HomePage from '../../pages/HomePage';
import BankAccountPage from '../../pages/BankAccountPage';
import CreateBankAccountPage from '../../pages/CreateBankAccountPage';

describe('Create new bank account', () => {

    const loginPage = new LoginPage();
    const homePage = new HomePage();
    const bankAccountPage = new BankAccountPage();
    const createBankAccountPage = new CreateBankAccountPage();
    let users;
    let bankAccount;

    before(() => {
        cy.fixture('users').then((data) => {
            users = data;
        });
        cy.fixture('bankAccount').then((data) => {
            bankAccount = data;
        });
    });

    beforeEach(() => {
        cy.visit('/signin');
        loginPage.login(users.validUser.username, users.validUser.password);
        cy.url().should('not.include', '/signin');
        homePage.clickSideNavBankAccounts();
    });

    it('should create a new bank account', () => {
        bankAccountPage.clickNewBankAccount();
        createBankAccountPage.fillCreateBankAccountForm(
            bankAccount.validBankAccount.bankName,
            bankAccount.validBankAccount.routingNumber,
            bankAccount.validBankAccount.accountNumber
        );
        createBankAccountPage.saveCreatedBankAccount();
        bankAccountPage.verifyNewBankIsExist(bankAccount.validBankAccount.bankName);
    });

    it('should create and delete a bank account', () => {
        bankAccountPage.clickNewBankAccount();
        createBankAccountPage.fillCreateBankAccountForm(
            bankAccount.validBankAccount.bankName,
            bankAccount.validBankAccount.routingNumber,
            bankAccount.validBankAccount.accountNumber
        );
        createBankAccountPage.saveCreatedBankAccount();
        bankAccountPage.verifyNewBankIsExist(bankAccount.validBankAccount.bankName);
        bankAccountPage.clickDeleteBankAccount();
        bankAccountPage.verifyBankAccountIsDeleted(bankAccount.validBankAccount.bankName);
    });

});
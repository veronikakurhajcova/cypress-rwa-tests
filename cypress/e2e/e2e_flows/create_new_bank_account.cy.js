import HomePage from '../../pages/HomePage';
import BankAccountPage from '../../pages/BankAccountPage';
import CreateBankAccountPage from '../../pages/CreateBankAccountPage';

describe('Create new bank account', () => {

    const homePage = new HomePage();
    const bankAccountPage = new BankAccountPage();
    const createBankAccountPage = new CreateBankAccountPage();

    beforeEach(() => {
    cy.fixture('users').as('users');
    cy.fixture('bankAccount').as('bankAccount')
    });

    beforeEach(function() {
        cy.loginBySession(this.users.validUser.username, this.users.validUser.password);
        cy.visit('/');
        homePage.clickSideNavBankAccounts();
    });

    it('should create a new bank account', function() {
        bankAccountPage.clickNewBankAccount();
        createBankAccountPage.fillCreateBankAccountForm(
            this.bankAccount.validBankAccount.bankName,
            this.bankAccount.validBankAccount.routingNumber,
            this.bankAccount.validBankAccount.accountNumber
        );
        createBankAccountPage.saveCreatedBankAccount();
        bankAccountPage.verifyNewBankIsExist(this.bankAccount.validBankAccount.bankName);
    });

    it.skip('should create and delete a bank account', function() {
        bankAccountPage.clickNewBankAccount();
        createBankAccountPage.fillCreateBankAccountForm(
            this.bankAccount.validBankAccount.bankName,
            this.bankAccount.validBankAccount.routingNumber,
            this.bankAccount.validBankAccount.accountNumber
        );
        createBankAccountPage.saveCreatedBankAccount();
        bankAccountPage.verifyNewBankIsExist(this.bankAccount.validBankAccount.bankName);
        bankAccountPage.clickDeleteBankAccount();
        bankAccountPage.verifyBankAccountIsDeleted(this.bankAccount.validBankAccount.bankName);
    });

});
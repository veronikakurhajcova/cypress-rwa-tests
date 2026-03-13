import LoginPage from '../../pages/LoginPage';

describe('Login', () => {

     const loginPage = new LoginPage();

beforeEach(()=> {
     cy.fixture('users').as('users');
     cy.visit('/signin');
})

it('should login with valid credentials', function() {
    loginPage.login(this.users.validUser.username,this.users.validUser.password);
    cy.url().should('not.include', '/signin');
    })

 it('login with invalid password', function() {
    loginPage.login(this.users.invalidPasswordUser.username, this.users.invalidPasswordUser.password);
    loginPage.getErrorLoginMsg().should('be.visible');
    cy.contains('Username or password is invalid').should('be.visible');
 })

 it('login with invalid username', function() {
    loginPage.login(this.users.invalidUsernameUser.username, this.users.invalidUsernameUser.password);
    loginPage.getErrorLoginMsg().should('be.visible');
    cy.contains('Username or password is invalid').should('be.visible');
 })

 it('should have disabled submit button when login with empty fields', () => {
    loginPage.getSubmitButton().click();
    loginPage.getSubmitButton().should('be.disabled');
    loginPage.getUsernameHelperText().should('have.css', 'color', 'rgb(211, 47, 47)');
 })

 it.skip('login with too short password', function() {
    loginPage.getUsernameField().type(this.users.invalidTooShortPasswordUser.username);
    loginPage.getPasswordField().type(this.users.invalidTooShortPasswordUser.password).blur();
    loginPage.getSubmitButton().should('be.disabled');
    loginPage.getPasswordHelperText().should('be.visible');
    loginPage.getPasswordHelperText().should('have.text', this.users.invalidTooShortPasswordUser.helperText);
 })

 it('should have password field masked', () =>{
     loginPage.getPasswordField().should('have.attr', 'type', 'password');
 })

it('should remember user when remember me is checked', () => {
    loginPage.getRememberMeCheckbox().check();
    loginPage.getRememberMeCheckbox().should('be.checked');
})

it('should login with Enter key', function() {
    loginPage.getUsernameField().type(this.users.validUser.username);
    loginPage.getPasswordField().type(this.users.validUser.password).type('{enter}');
    cy.url().should('not.include', '/signin');
})
})
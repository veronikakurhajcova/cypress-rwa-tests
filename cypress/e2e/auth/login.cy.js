import LoginPage from '../../pages/LoginPage';

describe('Login', () => {

     const loginPage = new LoginPage();
     let users;

before(() => {
    cy.fixture('users').then((data)=> {
    users = data;
    })
})

beforeEach(()=> {
     cy.visit('/signin');
})

it('should login with valid credentials', () => {
    loginPage.login(users.validUser.username,users.validUser.password);
    cy.url().should('include','/');
    })

 it('login with invalid password', () => {
    loginPage.login(users.invalidPasswordUser.username, users.invalidPasswordUser.password);
    loginPage.getErrorLoginMsg().should('be.visible');
    cy.contains('Username or password is invalid').should('be.visible');
 })

 it('login with invalid username', () => {
    loginPage.login(users.invalidUsernameUser.username, users.invalidUsernameUser.password);
    loginPage.getErrorLoginMsg().should('be.visible');
    cy.contains('Username or password is invalid').should('be.visible');
 })

 it('should have disabled submit button when login with empty fields', () => {
    loginPage.getSubmitButton().click();
    loginPage.getSubmitButton().should('be.disabled');
    loginPage.getUsernameHelperText().should('have.css', 'color', 'rgb(211, 47, 47)');
 })

 it('login with too short password', () => {
    loginPage.getUsernameField().type(users.invalidTooShortPasswordUser.username);
    loginPage.getPasswordField().type(users.invalidTooShortPasswordUser.password).blur();
    loginPage.getSubmitButton().should('be.disabled');
    loginPage.getPasswordHelperText().should('be.visible');
    loginPage.getPasswordHelperText().should('have.text', users.invalidTooShortPasswordUser.helperText);
 })

 it('should have password field masked', () =>{
     loginPage.getPasswordField().should('have.attr', 'type', 'password');
 })

it('should remember user when remember me is checked', () => {
    loginPage.getRememberMeCheckbox().check();
    loginPage.getRememberMeCheckbox().should('be.checked');
})

it('should login with Enter key', () => {
    loginPage.getUsernameField().type(users.validUser.username);
    loginPage.getPasswordField().type(users.validUser.password).type('{enter}');
    cy.url().should('include', '/');
})
})
import { login } from '../fixtures/selectors.json'
describe('login page', function () {
    it('login to site...', () => {
        cy.visit(Cypress.env("url"));

        cy.get(login.username).type(Cypress.env("username"));
        cy.get(login.password).type(Cypress.env("password"));


        cy.get(login.button).click()

        cy.get(login.salesmenu).click();

        cy.get(login.orders).click();

        cy.get(login.logout).click();

    })
});
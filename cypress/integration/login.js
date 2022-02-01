import { login } from '../fixtures/selectors.json'
import { Utility } from "../support/utility"

//Call getBaseUrl() to get environment specific url value
const url = new Utility().getBaseUrl();

describe('login page', function () {
    it('login to site...', () => {
        cy.visit(url);

        cy.get(login.username).type(Cypress.env("username"));
        cy.get(login.password).type(Cypress.env("password"));


        cy.get(login.button).click()
        cy.wait(5000);
        const customThresholds = {
            performance: 10,
            accessibility: 50,
            seo: 70,
            // 'first-contentful-paint': 4000,
            // 'largest-contentful-paint': 4000,
            // 'cumulative-layout-shift': 0.1,
            // 'total-blocking-time': 500,
        };

        const desktopConfig = {
            formFactor: 'desktop',
            screenEmulation: { disabled: true },
        };

        //  cy.lighthouse(customThresholds, desktopConfig);
        cy.wait(5000);
        cy.get(login.salesmenu).click();

        cy.get(login.orders).click();

        cy.get(login.logout).click();

    })
});
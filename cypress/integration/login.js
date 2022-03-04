import { login } from '../fixtures/selectors.json'
import { Utility } from "../support/utility"
import TestFilters from '../support/filterTests.js'

//Call getBaseUrl() to get environment specific url value


TestFilters(['smoke', 'regression'], () => {
    const url = new Utility().getBaseUrl();

    describe('login page', function () {
        it('login to site...', () => {
            //cy.visit(url);
            cy.visit("https://demo.opencart.com/admin/");
            cy.injectAxe()
            cy.get(login.username).type(Cypress.env("username"));
            cy.get(login.password).type(Cypress.env("password"));

            cy.get(login.button).each((element, index) => {
                cy.checkA11y(
                    '#content > div > div > div > div > div.panel-body > form > div.text-right > button',
                    {
                        runOnly: {
                            type: 'tag',
                            values: ['wcag2a'],
                        },
                    }
                );
            });
            cy.get(login.button).click()
            cy.wait(5000);

            //cy.checkA11y(null, null, terminalLog)
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

    it('login to site...request', () => {
        cy.request('https://jsonplaceholder.cypress.io/comments').as('comments')

        // other test code here

        cy.get('@comments').should((response) => {
            if (response.status === 200) {
                expect(response).to.have.property('duration')
            } else {
                // whatever you want to check here
            }
        })
    })


});
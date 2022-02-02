import { createHorde, species, strategies } from 'gremlins.js';
import Chance from 'chance';
//import { createHorde, species, strategies } from '../../src/index';
import TestFilters from '../support/filterTests.js'


const seed = 'formFiller';
TestFilters(['regression'], () => {

    describe('Run gremlins.js inside a cypress test', () => {
        let horde;
        beforeEach(() => {
            return cy.visit('https://www.google.com').then(() =>
                cy.window().then((pageWindow) => {
                    horde = createHorde({

                        species: [species.formFiller()],
                        strategies: [strategies.bySpecies({ nb: 10 })],
                        window: pageWindow,
                        randomizer: new Chance(seed),
                    });
                })
            );
        });

        it('should run gremlins.js', () => {
            return cy.wrap(horde.unleash()).then(() => {
                /* ... */
            });
        });
    });
});
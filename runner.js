const cypress = require('cypress')
const tesults = require('cypress-tesults-reporter');

cypress.run({
    // specs to run here
    spec: './cypress/integration/login.js',

})
    .then((results) => {
        const args = {
            target: '',
        }
        tesults.results(results, args);
    })
    .catch((err) => {
        console.error(err)
    })
//utility.js

export class Utility {
    getBaseUrl() {
        let envi = Cypress.env('ENV'); //Get the value of environment variable i.e ENV
        if (envi == 'production') //Check the value
            return "https://demo.opencart.com/admin/"; //return desired url
        else if (envi == 'staging')
            return "https://demo.opencart.com/admin/";
        else if (envi == 'qa')
            return "https://demo.opencart.com/admin/";
    }
}
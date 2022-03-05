/// <reference types="cypress" />
/// <reference types="@shelex/cypress-allure-plugin" />

// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars

const allureWriter = require('@shelex/cypress-allure-plugin/writer');
const {
  addMatchImageSnapshotPlugin,
} = require('cypress-image-snapshot/plugin');

module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
}
const { lighthouse, prepareAudit } = require('cypress-audit');

module.exports = (on, config) => {
  addMatchImageSnapshotPlugin(on, config);

  require('cypress-terminal-report/src/installLogsPrinter')(on);
  on('task', {
    log(message) {
      console.log(message)

      return null
    },
    table(message) {
      console.table(message)

      return null
    }
  })

  on('before:browser:launch', (browser = {}, launchOptions) => {
    prepareAudit(launchOptions);
  });

  on('task', {
    lighthouse: lighthouse(),
  });
  require('@cypress/code-coverage/task')(on, config)
  on('file:preprocessor', require('@cypress/code-coverage/use-babelrc'))
  allureWriter(on, config);
  return config;
};



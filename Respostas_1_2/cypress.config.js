const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://api-homologacao.getnet.com.br',
    specPattern: 'cypress/e2e/**/*.spec.js',
    setupNodeEvents(on, config) {
    },
  },
});

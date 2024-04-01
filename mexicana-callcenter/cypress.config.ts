import { defineConfig } from 'cypress';

export default defineConfig({
  projectId: 'wt9prv',
  e2e: {
    baseUrl: 'http://localhost:5173/', 
    reporter: 'mocha-junit-reporter',
    reporterOptions: {
      mochaFile: 'cypress/results/results-[hash].xml',
      toConsole: true,
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});

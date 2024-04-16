import { defineConfig } from 'cypress';

export default defineConfig({
  projectId: 'wt9prv',
  e2e: {
    baseUrl: 'https://localhost:5173/', 
    reporter: 'mocha-junit-reporter',
    reporterOptions: {
      mochaFile: 'cypress/results/results-[hash].xml',
      toConsole: true,
    },
    setupNodeEvents(on, config) {
    },
  },
});

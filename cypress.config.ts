import { defineConfig } from 'cypress';
import { BASE_URL } from './cypress/constants';

export default defineConfig({
  e2e: {
    baseUrl: BASE_URL,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});

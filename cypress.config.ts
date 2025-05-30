import { defineConfig } from "cypress";
import { configureXrayPlugin } from 'cypress-xray-plugin';
require('dotenv').config();

export default defineConfig({
  e2e: {
    //baseUrl :'https://dev.v2.pivotnow.io',
   // baseUrl:'http://localhost:3010',
   baseUrl: process.env.CYPRESS_BASE_URL,
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/e2e.ts',
    chromeWebSecurity: false,
    
    env: {
      username: process.env.CYPRESS_USERNAME,
      password: process.env.CYPRESS_PASSWORD,
      mfaSecretKey: process.env.CYPRESS_MFA_SECRET_KEY,
      
    },
     

    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      return config;
    },
    screenshotOnRunFailure: true,
    screenshotsFolder: 'cypress/screenshots',
    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
      reportDir: 'cypress/reports',
      overwrite: true,
      html: false,
      json: true,
      embeddedScreenshots: true,
      inlineAssets: true,
    },
    
   
  },
});

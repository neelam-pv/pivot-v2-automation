// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';

// Extend Cypress.Chainable interface to include custom commands
declare global {
  namespace Cypress {
    interface Chainable {
      injectRecaptchaToken(): Chainable<void>;
    }
  }
}

// Robust global reCAPTCHA stub for Cypress
Cypress.on('window:before:load', (win) => {
  (win as any).grecaptcha = {
    render: () => 'stubbed-widget',
    getResponse: () => 'stubbed-token',
    reset: () => {},
    execute: () => Promise.resolve('stubbed-token'),
    enterprise: {
      render: () => 'stubbed-widget',
      getResponse: () => 'stubbed-token',
      reset: () => {},
      execute: () => Promise.resolve('stubbed-token')
    }
  };
  (win as any)['g-recaptcha-response'] = 'stubbed-token';
});


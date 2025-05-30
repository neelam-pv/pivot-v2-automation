/// <reference types="cypress" />
import { authenticator } from 'otplib';
import jwt from 'jsonwebtoken';



Cypress.Commands.add('getMfaCode', (secret: string) => {
    const code = authenticator.generate(secret);
    return cy.wrap(code); 
  });


  Cypress.Commands.add('selectTab', (tab: string) => {
    cy.get('.py-4').contains('p', `${tab}, { matchCase: true }`).click();
  });

  Cypress.Commands.add('logout', () => {
    cy.get('.py-4').contains('p', 'Logout', { matchCase: true }).click();
  });


  



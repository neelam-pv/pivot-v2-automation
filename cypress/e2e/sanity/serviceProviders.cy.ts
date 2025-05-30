import { ServiceProvidersPage } from '@pages/ServiceProvidersPage';
import { LoginPage } from '../../support/pages/LoginPage';
import { DashboardPage } from '@pages/DashboardPage';

const loginPage = new LoginPage();
const dashboardPage= new DashboardPage();
const serviceProvidersPage= new ServiceProvidersPage();

const validEmail=Cypress.env('username');
const validPassword=Cypress.env('password');


describe('PV2-67 Service Providers', () => {
 
    beforeEach(() => {
      
      // cy.clearAllCookies();
      // cy.clearCookies();
      // cy.clearAllLocalStorage();
      // cy.clearAllSessionStorage();
      // cy.clearAllLocalStorage();
      cy.clearCookie('idToken');
      cy.clearCookie('_grecaptcha');
      loginPage.visit();
      loginPage.login(validEmail, validPassword);
      loginPage.enterMFACode();        
      loginPage.clickVerifyButton();
    });
  
    it('should able to search service proviod', () => {
      cy.get('.fixed > .absolute').click();
      cy.get('.py-4').contains('p', 'Service Providers', { matchCase: true }).click();
      
      cy.get('a[href="/organization"]').click();
      cy.contains('h1',"Service Providers");
      cy.get('#spSearch').type("SP_Automation");

      cy.get('table')                           
      .find('tbody tr')
      .should('have.length', 1)
      .each(($row, index) => {

    cy.wrap($row)
      .find('td')
      .first()
      .should('have.text', 'SP_Automation'); 
  });
 });

 it('should show service provider list empty when when incorrect value is searched ', () => {
  cy.get('.fixed > .absolute').click();
  cy.get('.py-4').contains('p', 'Service Providers', { matchCase: true }).click();
  
  cy.get('a[href="/organization"]').click();
  cy.contains('h1',"Service Providers");
  cy.get('#spSearch').type("SP_Automation");

  cy.get('table')                           
  .find('tbody tr')
  .should('have.length', 0);
 });

});
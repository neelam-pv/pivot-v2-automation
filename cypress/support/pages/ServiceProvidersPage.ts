export class ServiceProvidersPage{




  //moveto this funstion in command.js so that it works for all tabs
  clickServiceProvidersTab(){
   cy.get('.fixed > .absolute').click();// moving to dashboard
   cy.get('.py-4').contains('p', 'Service Providers', { matchCase: true }).click();
  }
   
  }
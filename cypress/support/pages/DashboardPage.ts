export class DashboardPage {

    assertDashboardPageisVisible() {
       cy.title().should('eq', 'PivotNow');
    }
    clickOnExpandButton(){
     // cy.get('.fixed > .absolute').click();
     //cy.get('.md\:absolute').click();
    // cy.get('.md\:bottom-0 > .top-0').click();
  cy.get('button.md\\:block.md\\:absolute.md\\:top-20.md\\:-translate-y-1\\/2.md\\:border-none.md\\:outline-none.md\\:-translate-x-1\\/2.hidden.transition-all.z-\\[999\\].-ml-1.p-1\\.5.rounded-full.bg-backgroundDark.md\\:left-20')
  .find('svg')
  .should('have.attr', 'viewBox', '0 0 24 24')
  .and('have.attr', 'fill', 'currentColor')
  .click();

    }


  getLogoutButton(){
   return cy.get('a[href="/sign-in"]');
  }

  clcikLogoutButton(){
    this.getLogoutButton().click();
  }



  }

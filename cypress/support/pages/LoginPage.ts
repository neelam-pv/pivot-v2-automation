export class LoginPage {
  visit() {
    cy.visit('/sign-in');
  }

  getEmailField() {
    return cy.get('#email');
  }

  getPasswordField() {
    return cy.get('#password');
  }

  getSignInButton() {
    return cy.contains('Sign In');

  }

  getForgetPassword(){
    return cy.contains('Forgot password?');
  }

  clickOnForgetPaaword(){
   this.getForgetPassword().click();

  }
  enterEmail(email: string) {
    this.getEmailField().clear().type(email);
  }

  enterPassword(password: string) {
    this.getPasswordField().clear().type(password,{ log: false });
  }

  clickSignin() {
    this.getSignInButton().click({ force: true });
  }

  clickEyeButton(){
    cy.get('button[role=button]').click();
  }
  
  assertInvalidCredentialsErrorMessage() {
    cy.contains('Email or Password is invalid').should('be.visible');
  }

  assertLoginPageIsVisible(){
    cy.url().should('include', '/sign-in');
    cy.contains('Welcome');
  }

  login(email: string, password: string) {
    this.enterEmail(email);
    this.enterPassword(password);
    this.clickSignin();
  }

  assertMfaPopupIsVisible(){
    cy.contains('Multi-factor Authentication');
    cy.get('#code').should('be.visible');
    cy.get('button[type=submit]').should('be.visible').and('be.enabled');
    cy.get('.relative').should('be.visible').and('be.enabled');
  }
  assertRecaptchaAppears(){
     cy.get('iframe[title="reCAPTCHA"]').should('be.visible');
  }

  getMFACodeField(){
   return cy.get('#code');
  }

  enterMFACode(){
    cy.getMfaCode(Cypress.env('mfaSecretKey')).then((code) => {
      this.getMFACodeField().type(code);
   });
  }

  getVerifyButton(){
    //return cy.get('button[type="button"]').contains('Verify');
    
    return cy.get('button[type="submit"]').contains('Verify');

  }
  clickVerifyButton(){
   this.getVerifyButton().click();
  }
  
  getCancelButton(){
    return cy.get('button[type="button"]').contains('Cancel');
  }

  clickCancelButton(){
     this.getCancelButton().click();
  }
  // enterMfaAndClickVerify(){
  //   cy.getMfaCode(Cypress.env('mfaSecretKey')).then((code) => {
  //      this.getCodeField().type(code);
  //     // cy.get('#code').type(code);
  //     cy.get('button[type=submit]').click();
  //   });
  // }

  getSendResetLinkButton(){
    return cy.contains('Send Reset Link');
  }

  clickSendResetLinkButton(){
    this.getSendResetLinkButton().click();
  }
  getContactUs(){
    return cy.contains('Contact Us');
  }

  clickContactUs(){
    this.getContactUs().click();
  }

  getRememberMe(){
   return cy.get('.cursor-pointer');
  }

  clcikRememberMe(){
    this.getRememberMe().click();
  }

}

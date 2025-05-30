import { DashboardPage } from '@pages/DashboardPage';
import { LoginPage } from '../../support/pages/LoginPage';

const loginPage = new LoginPage();
const dashboardPage= new DashboardPage();

const invalidEmail='testing@test.com';
const invalidPassword='testing!@#123';
const validEmail=Cypress.env('username');
const validPassword=Cypress.env('password');


describe('Verify Login Elements', () => {
  beforeEach(() => { 
    loginPage.visit();
  });

  it('should display username input field', () => {
    loginPage.getEmailField()
    .should('be.visible')
    .and('have.attr', 'type', 'email');
  });

  it('should display password input field', () => {
    loginPage.getPasswordField()
      .should('be.visible')
      .and('have.attr', 'type', 'password');

  });

  it('should display Sign In button', () => {
    loginPage.getSignInButton()
      .should('be.visible')
      .and('contain', 'Sign In');
  });

  it('should display Remember checkbox and by default unchecked', () => {
     loginPage.getRememberMe()
      .should('be.visible')
       .and('not.be.checked');
  });

  it('should display Forgot Password Link', () => {
    loginPage.getForgetPassword()
     .should('be.visible')
      .and('have.attr','href','/forgot-password');
 });
  
});

describe('Verify Login Functionality,PV2-51', () => {

  beforeEach(() => {
    loginPage.visit();
  });

    it('should display error for invalid email ', () => {
      loginPage.assertLoginPageIsVisible()

      loginPage.login(invalidEmail, validPassword);
      loginPage.assertInvalidCredentialsErrorMessage();

    });
  
    it('should display error for invalid password', () => {
      loginPage.assertLoginPageIsVisible()

      loginPage.login(invalidEmail, invalidPassword);
      loginPage.assertInvalidCredentialsErrorMessage();
    });
  
    it('should display error for empty email', () => {
      loginPage.assertLoginPageIsVisible()

      loginPage.getEmailField().clear().should('be.empty');
      loginPage.getPasswordField().clear().type(validPassword);
      loginPage.clickSignin();

      cy.contains("Email is a required field").should('be.visible');
    });
  
    it('should display error for empty password', () => {
      loginPage.assertLoginPageIsVisible()

      loginPage.getEmailField().clear().type(invalidEmail)
      loginPage.getPasswordField().clear().should('be.empty');
      loginPage.clickSignin();

      cy.contains("Password is a required field").should('be.visible');
    });
  
    it('should not log in with invalid credentials', () => {
      loginPage.assertLoginPageIsVisible()

      loginPage.login(invalidEmail, invalidPassword);
      loginPage.assertInvalidCredentialsErrorMessage();

      loginPage.assertLoginPageIsVisible();
    });

    it('should have the password field secured by default', () => {
      loginPage.getPasswordField()
        .should('exist') 
        .and('have.attr', 'type', 'password'); 
    });

    it('should display the password when the show password button is clicked', () => {
      loginPage.enterPassword('SuperSecret123') ;
      loginPage.getPasswordField().should('have.attr', 'type', 'password');      //default eye closed
      
      loginPage.clickEyeButton();            // open eye shows password
      loginPage.getPasswordField().should('have.attr', 'type', '');
     
      loginPage.clickEyeButton();           // closed eye hide password
      loginPage.getPasswordField().should('have.attr', 'type', 'password');
      loginPage.getPasswordField().should('have.value', 'SuperSecret123');
    });


  
  });
  
 describe('Verify Forgot Password Modal', () => {

      beforeEach(() => { 
        loginPage.visit();
        loginPage.clickOnForgetPaaword();
      });

      it('should navigate to the Forgot Password page', () => {
        cy.url().should('include', '/forgot-password');
        cy.title().should('eq', "PivotNow - Forgot password");
      });
    
      it('should display the correct introductory text and Heading', () => {
        cy.contains('Please provide your email to restore the access to your account. An email with instructions will be sent to the specified address.');
        cy.contains('p', 'Forgot Password');
      });
    
      it('should display the email input field', () => {
        loginPage.getEmailField().should('be.visible');
      });
    
      it('should display the Send Reset Link button', () => {
        loginPage.getSendResetLinkButton()
          .should('be.visible')
          .and('not.be.disabled');
      });
    
      it('should display the Contact Us link', () => {
        loginPage.getContactUs()
          .should('be.visible')
          .and('have.attr', 'href', 'mailto:support@pivotnow.io');
      });
    
      it('should display the Sign In button', () => {
        loginPage.getSignInButton()
          .should('be.visible')
          .and('have.attr', 'href', '/sign-in');
      });

      it('should show error when email filed is empty ', () => {
        loginPage.clickSendResetLinkButton();
        cy.contains('Email is a required field');

        cy.url().should('include', '/forgot-password');
      });

      it('should email is autofilled if it was already entered on the Login page', () => {
        loginPage.visit();
        loginPage.enterEmail("valid@test.com");
        loginPage.getEmailField().should('have.value','valid@test.com');

        loginPage.clickOnForgetPaaword();
        cy.url().should('include', '/forgot-password');

        loginPage.getEmailField().should('have.value','valid@test.com'); 
      });

      it('should send a password reset email when valid email is provided', () => {
        loginPage.enterEmail("testing@gmail.com");

        loginPage.clickSendResetLinkButton();
        
        cy.url().should('include','/forgot-password/sent');
        cy.title().should('eq',"PivotNow - Forgot password sent");
      });
    
      it('should display an error for invalid email', () => {
        loginPage.enterEmail('invalid-format');
        loginPage.clickSendResetLinkButton();
        
        cy.contains('Email has an invalid format').should('be.visible');
      });

      it('should redirect to the login page after user clcik on Sign In',()=>{
         loginPage.clickSignin();
         loginPage.assertLoginPageIsVisible();
      })

    });
    
   
  
describe('Verify MFA Functionality', () => {

  beforeEach(() => {
    loginPage.visit();
  });

  it('MFA should only accept enter 6-digits code to the input field', () => {
    loginPage.assertLoginPageIsVisible()

     loginPage.login(validEmail, validPassword);
     loginPage.assertMfaPopupIsVisible();
     loginPage.getEmailField().type('1234567');   
     loginPage.clickVerifyButton();
     
     cy.contains('text', 'MFA code must be a 6-digit number');
    
     loginPage.getEmailField().clear().type('1234'); 
     cy.contains('text', 'MFA code must be a 6-digit number');      
});
  
it('MFA should only accept enter 6-digits code to the input field', () => {
  
   const code= cy.getMfaCode(Cypress.env('mfaSecretKey'));

   loginPage.login(validEmail, validPassword);
   loginPage.getEmailField().type(`${code}`);   
   loginPage.clickVerifyButton();

   dashboardPage.clcikLogoutButton(); 

   loginPage.login(validEmail, validPassword);
   loginPage.getEmailField().type(`${code}`);   
   loginPage.clickVerifyButton();

   //Assert with error
});

it('should be redirected to login page cancel is clicked', () => {
  
  loginPage.assertLoginPageIsVisible();

  loginPage.login(validEmail, validPassword);
  loginPage.assertMfaPopupIsVisible();
  loginPage.enterMFACode();         
  loginPage.clickCancelButton();

  loginPage.assertLoginPageIsVisible()  
});



    
    
  
  


  
  });
  
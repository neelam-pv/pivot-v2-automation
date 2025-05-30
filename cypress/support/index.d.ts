declare namespace Cypress {
    interface Chainable {
    getMfaCode(secret: string): Chainable<string>;
    selectTab(tab: string): Chainable<string>;
    generateJwt(payload?: Record<string, any>): Chainable<string>;
    logout():Chainable<string>;
   
}

interface Window {
    grecaptcha: {
        execute?: (action: string) => Promise<string>;
        ready?: (callback: () => void) => void;
        getResponse?: () => string;
        render?: () => void;
        reset?: () => void;
      };
    }
}

declare namespace Cypress {
    interface Chainable {
        solveGoogleReCAPTCHA(value?: string /* eslint-disable-line */): Chainable<JQuery<HTMLElement>>
    }
}
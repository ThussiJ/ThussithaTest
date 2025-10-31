describe('Let’s Talk form flow - final fixed version', () => {
  before(() => {
    Cypress.config('pageLoadTimeout', 120000);
  });

  it('opens menu, clicks Let’s Talk, fills form, and submits', () => {

    cy.visit('https://www.eight25media.com/', { timeout: 120000, failOnStatusCode: false });

    cy.get('button[aria-label="Close"], .cookie-consent__close, .cc-btn', { timeout: 3000 })
      .then($btns => {
        if ($btns.length) cy.wrap($btns[0]).click({ force: true });
      });

    cy.get('button.navbar-toggler[data-target="#navbarSupportedContent"]', { timeout: 10000 })
      .then($btn => {
        if ($btn.is(':visible')) cy.wrap($btn).click({ force: true });
      });

      cy.get('a.mega-menu-link[data-text="Let’s talk"]', { timeout: 15000 })
      .should('be.visible')
      .click({ force: true });

       cy.get('form[action*="lets-talk"]', { timeout: 15000 }).should('exist');

    cy.get('input[name="your-name"]')
      .scrollIntoView()
      .type('Test User', { force: true });

    cy.get('input[name="your-email"]')
      .scrollIntoView()
      .type('testuser@example.com', { force: true });

    cy.get('input[name="your-phone"]')
      .scrollIntoView()
      .type('0771234567', { force: true });

    cy.get('input[name="your-company"]')
      .scrollIntoView()
      .type('QA Automation Inc.', { force: true });

    cy.get('textarea[name="your-message"]')
      .scrollIntoView()
      .type('This is a test message', { force: true });

    cy.get('input[name="your-name"]').should('have.value', 'Test User');
    cy.get('input[name="your-email"]').should('have.value', 'testuser@example.com');
    cy.get('input[name="your-phone"]').should('have.value', '0771234567');
    cy.get('input[name="your-company"]').should('have.value', 'QA Automation Inc.');
    cy.get('textarea[name="your-message"]').should(
      'have.value',
      'This is a test message'
    );

      cy.get('button[type="submit"]').scrollIntoView().click({ force: true });

    cy.get('.wpcf7-response-output', { timeout: 10000 }).should('exist');
  });
});

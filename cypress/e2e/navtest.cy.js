// cypress/e2e/work_nav_fixed.cy.js
describe('Work navigation - fixed (no .catch on Cypress chainables)', () => {
  before(() => {
    Cypress.config('pageLoadTimeout', 120000);
  });

  it('opens hamburger, clicks Work, and asserts heading text', () => {
    cy.visit('https://www.eight25media.com/', { timeout: 120000, failOnStatusCode: false });
    cy.get('button[aria-label="Close"], .cookie-consent__close, .cc-btn, .cybotCookiebotDialogBodyButton', { timeout: 3000 })
      .then(
        $btns => { if ($btns.length) cy.wrap($btns[0]).click({ force: true }); },
        () => { /* not present — continue */ }
      );
    cy.get('button.navbar-toggler[data-target="#navbarSupportedContent"]', { timeout: 10000 })
      .should('exist')
      .then($btn => {
        if ($btn.is(':visible')) {
          cy.wrap($btn).click({ force: true });
          cy.get('#navbarSupportedContent', { timeout: 10000 }).should($menu => {
            const h = $menu[0].getBoundingClientRect().height;
            expect(h, 'navbar height after open').to.be.greaterThan(0);
          });
        } else {
          cy.log('hamburger not visible — desktop layout');
        }
      });
    const workSelector = '#mega-menu-item-42 a.mega-menu-link';
    cy.get(workSelector, { timeout: 10000 })
      .then($a => {

        expect($a.attr('data-text')).to.equal('Work');
        expect($a.text().trim()).to.match(/^Work$/i);


        const rect = $a[0].getBoundingClientRect();
        if ($a.is(':visible') && rect.width > 0 && rect.height > 0) {
          cy.wrap($a).click();
        } else {
          cy.wrap($a).scrollIntoView().click({ force: true });
        }
      });
      
    cy.contains(/not all work is created equal/i, { timeout: 20000 }).should('be.visible');
  });
});

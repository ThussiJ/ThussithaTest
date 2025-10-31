describe('Eight25Media - title and navbar', () => {
  it('verifies page title and nav items', () => {
    cy.visit('https://www.eight25media.com/');

    cy.title().should('match', /eight25/i);
  });
});

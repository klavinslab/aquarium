describe('/logout', () => {
  beforeEach(() => {
    cy.login();
  });

  it('has place holder header', () => {
    cy.visit('/');

    let token;

    cy.window()
      .then((win) => {
        token = win.localStorage.token;
      })
      .then(() => {
        // eslint-disable-next-line no-unused-expressions
        expect(token).to.exist;
      });
    cy.contains('button', '!').click();
    cy.contains('Sign Out').click();
    cy.url().should('contain', '/login');
    cy.window()
      .then((win) => {
        // eslint-disable-next-line no-unused-expressions
        expect(win.localStorage.token).to.be.undefined;
      });
  });
});

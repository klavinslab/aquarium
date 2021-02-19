describe('/budgets', () => {
  beforeEach(() => {
    cy.login();
  });

  afterEach(() => {
    cy.logout();
  });

  it('has place holder header', () => {
    cy.visit('/budgets');
    cy.contains('h1', 'Budgets');
  });
});
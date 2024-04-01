describe('Login Tests', () => {
  beforeEach(() => {
    cy.visit('/'); 
  });

  //Successful login
  it('displays a success message on successful login', () => {
    // Wait for the email input to be visible before typing
    cy.get('[data-cy=email-input]', { timeout: 10000 }).should('be.visible').type('random@gmail.com');
    cy.get('[data-cy=password-input]', { timeout: 10000 }).should('be.visible').type('PassWord1!{enter}');

    // Checks for the notification to be visible
    cy.contains('🎉 You are now signed in.', { timeout: 10000 }).should('be.visible');
  });

  //Failed login
  it('displays an error message on failed login', () => {
    // Wait for the email input to be visible before typing
    cy.get('[data-cy=email-input]', { timeout: 10000 }).should('be.visible').type('invalid@gmail.com');
    cy.get('[data-cy=password-input]', { timeout: 10000 }).should('be.visible').type('wrongpassword{enter}');

    // Checks for the notification to be visible
    cy.contains('🚨', { timeout: 10000 }).should('be.visible');
  });
});

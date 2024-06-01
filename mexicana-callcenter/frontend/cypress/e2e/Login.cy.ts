/// <reference types="cypress" />

describe('Login Tests', () => {
  beforeEach(() => {
    cy.visit('/signin'); 
  });

  //Successful login
  it('displays a success message on successful login', () => {
    // Wait for the username input to be visible before typing
    cy.get('[name=Username]', { timeout: 10000 }).should('be.visible').type('tg2714');
    cy.get('[name=password]', { timeout: 10000 }).should('be.visible').type('Zekund99.{enter}');

    // Checks for the notification to be visible
    cy.contains('🎉 Welcome test! You are now signed in.', { timeout: 10000 }).should('be.visible');
  });

  //Failed login
  it('displays an error message on failed login', () => {
    // Wait for the email input to be visible before typing
    cy.get('[name=Username]', { timeout: 10000 }).should('be.visible').type('invalidUser');
    cy.get('[name=password]', { timeout: 10000 }).should('be.visible').type('wrongpassword{enter}');

    // Checks for the notification to be visible
    cy.contains('🚨 Incorrect username or password.', { timeout: 10000 }).should('be.visible');
  });
});

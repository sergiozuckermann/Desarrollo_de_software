/// <reference types="cypress" />

describe('Logout Tests', () => {
    beforeEach(() => {

        cy.viewport(1920, 1080);

        cy.visit('/signin');
        cy.get('[name=Username]').type('tg2714');
        cy.get('[name=password]').type('Zekund99.');
        cy.get('button[type="submit"]').click(); // Adjust the selector to be more specific

        cy.url().should('include', '/Supervisor/home');
    });

    it('should logout the user', () => {
        cy.get('[data-cy=settings]').click().contains('Logout').click();
        cy.contains('🎉 Logged Out', { timeout: 10000 }).should('be.visible');
    });

});
/// <reference types="cypress" />

describe('YouTube Video Embeds Test For Breathing Excer', () => {
  beforeEach(() => {
    // Visita la página que contiene los videos de YouTube
    cy.visit('/signin');
    cy.get('[name=Username]').type('df2714');
    cy.get('[name=password]').type('Zekund99.');
    cy.get('button[type="submit"]').click(); 
    cy.url().should('include', '/Supervisor/home');
    cy.get('button').contains('Agent Spotlight').click();  });

  it('should have embedded YouTube videos that load correctly', () => {

    cy.visit('/supervisor/BreathingExcer');

    cy.contains('To avoid worries').click();
    cy.get('iframe[src*="youtube.com/embed"]');
    cy.get('.top-2').click();
    cy.contains('For a bad day').click();
    cy.get('iframe[src*="youtube.com/embed"]');
    cy.get('.top-2').click();
    cy.contains('To remove stress').click();
    cy.get('iframe[src*="youtube.com/embed"]');
    cy.get('.top-2').click();
    cy.contains('After a bad call').click();
    cy.get('iframe[src*="youtube.com/embed"]');
    cy.get('.top-2').click();

  });
});

    
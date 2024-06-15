/// <reference types="cypress" />

describe('YouTube Video Embeds Test For Breathing Excer', () => {
    beforeEach(() => {
      // Visita la página que contiene los videos de YouTube
      cy.visit('/signin');
      cy.get('[name=Username]').type('df2714');
      cy.get('[name=password]').type('Zekund99.');
      cy.get('button[type="submit"]').click(); 
      cy.url().should('include', '/Supervisor/home');  });
  
    it('should have embedded YouTube videos that load correctly', () => {
  
      cy.visit('/supervisor/MoveYourBody');
  
      cy.contains('Yoga for a bad day').click();
      cy.get('iframe[src*="youtube.com/embed"]');
      cy.get('.top-2').click();
      cy.contains('Yoga to calm down').click();
      cy.get('iframe[src*="youtube.com/embed"]');
      cy.get('.top-2').click();
      cy.contains('Yoga to relax').click();
      cy.get('iframe[src*="youtube.com/embed"]');
      cy.get('.top-2').click();
      cy.contains('Yoga to start the day').click();
      cy.get('iframe[src*="youtube.com/embed"]');
      cy.get('.top-2').click();
      cy.contains('Yoga to finish the day').click();
      cy.get('iframe[src*="youtube.com/embed"]');
      cy.get('.top-2').click();
      cy.contains('Winner Dance').click();
      cy.get('iframe[src*="youtube.com/embed"]');
      cy.get('.top-2').click();
      cy.contains('Dance is Friday').click();
      cy.get('iframe[src*="youtube.com/embed"]');
      cy.get('.top-2').click();
      cy.contains('Yoga poses to stretch').click();
      cy.get('iframe[src*="youtube.com/embed"]');
      cy.get('.top-2').click();
      cy.contains('Seated yoga poses').click();
      cy.get('iframe[src*="youtube.com/embed"]');
      cy.get('.top-2').click();
      cy.contains('Yoga poses to focus').click();
      cy.get('iframe[src*="youtube.com/embed"]');
      cy.get('.top-2').click();
      cy.contains('Seated yoga poses 2').click();
      cy.get('iframe[src*="youtube.com/embed"]');
      cy.get('.top-2').click();
      cy.contains('Yoga for flexibility').click();
      cy.get('iframe[src*="youtube.com/embed"]');
      cy.get('.top-2').click();
      cy.contains('Yoga under the sea').click();
      cy.get('iframe[src*="youtube.com/embed"]');
      cy.get('.top-2').click();
      cy.contains('Yoga with a partner').click();
      cy.get('iframe[src*="youtube.com/embed"]');
      cy.get('.top-2').click();
      })});
  
      
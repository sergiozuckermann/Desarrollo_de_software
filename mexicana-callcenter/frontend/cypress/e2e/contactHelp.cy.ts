/// <reference types="cypress" />

describe('New window open for Contact Help page', () => {
    beforeEach(() => {
      cy.visit('/signin');
      cy.get('[name=Username]').type('df2714');
      cy.get('[name=password]').type('Zekund99.');
      cy.get('button[type="submit"]').click(); 
      cy.url().should('include', '/Supervisor/home');
      cy.get('button').contains('Agent Spotlight').click();  });
  
    it('should have embedded YouTube videos that load correctly', () => {
  
      cy.visit('/supervisor/TakeABreak');
      cy.window().then((win) => { cy.stub(win, 'open').as('windowOpen'); })

      cy.contains('Contact help').click();
      cy.get('@windowOpen').should('be.calledWith', 'https://www.gob.mx/stps/articulos/conoce-el-programa-de-bienestar-emocional-en-el-trabajo');
      
  
  
    });
  });
  
      
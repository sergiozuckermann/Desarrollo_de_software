/// <reference types="cypress" />

import {
    testSupervisorUsername,
    testSupervisorPassword,
    testSupervisorHomeUrl,
    testAgentUsername,
    testAgentPassword,
    testAgentHomeUrl
  } from './utils';
    
    describe('Agent spotlight info test', () => {
  
      // Visit the signup page for each test
      beforeEach(() => {
        cy.visit('/signin');
        cy.get('[name=Username]').type('df2714');
        cy.get('[name=password]').type('Zekund99.');
        cy.get('button[type="submit"]').click(); 
        cy.url().should('include', '/Supervisor/home');
        cy.get('button').contains('Agent Spotlight').click();
      });
  
      // Se verifican 3 usuarios
      it('Test to validate agent user info is correct', () => {
        // Login as agent
        // cy.get('[name=Username]', { timeout: 10000 }).should('be.visible').type(testAgentUsername);
        // cy.get('[name=password]', { timeout: 10000 }).should('be.visible').type(testAgentPassword);
        // cy.get('button[type="submit"]', { timeout: 10000 }).should('be.visible').click(); 
        // cy.url().should('include', testAgentHomeUrl);
        // // Validate user info
        // cy.get('div[data-cy="user-info"]', { timeout: 10000 }).should('be.visible')
        // .find('p[data-cy="user-login"]', { timeout: 10000 })
        // .should('have.text', testAgentUsername);

        cy.visit('supervisor/AgentSpotlight'); 
        cy.get('.scale-120 > .w-full > .max-w-xl > .flex-col > .text-2xl')
        cy.get('.justify-center > :nth-child(2) > img').click
        cy.get('.scale-120 > .w-full > .max-w-xl > .flex-col > .text-2xl')
        cy.get('.justify-center > :nth-child(2) > img').click
        cy.get('.scale-120 > .w-full > .max-w-xl > .flex-col > .text-2xl')



      });
  
    });
    
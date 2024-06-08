/// <reference types="cypress" />

import {
  testSupervisorUsername,
  testSupervisorPassword,
  testSupervisorHomeUrl,
  testAgentUsername,
  testAgentPassword,
  testAgentHomeUrl
} from './utils';
  
  describe('Home User Info Tests', () => {

    // Visit the signup page for each test
    beforeEach(() => {
      cy.visit('/signin');
    });
  
    it('Test to validate supervisor user info is correct', () => {
      // Login as supervisor
      cy.get('[name=Username]', { timeout: 10000 }).should('be.visible').type(testSupervisorUsername);
      cy.get('[name=password]', { timeout: 10000 }).should('be.visible').type(testSupervisorPassword);
      cy.get('button[type="submit"]', { timeout: 10000 }).should('be.visible').click(); 
      cy.url().should('include', testSupervisorHomeUrl);
      // Validate user info
      cy.get('div[data-cy="user-info"]', { timeout: 10000 }).should('be.visible')
      .find('p[data-cy="user-login"]', { timeout: 10000 })
      .should('have.text', testSupervisorUsername);
    });

    it('Test to validate agent user info is correct', () => {
      // Login as agent
      cy.get('[name=Username]', { timeout: 10000 }).should('be.visible').type(testAgentUsername);
      cy.get('[name=password]', { timeout: 10000 }).should('be.visible').type(testAgentPassword);
      cy.get('button[type="submit"]', { timeout: 10000 }).should('be.visible').click(); 
      cy.url().should('include', testAgentHomeUrl);
      // Validate user info
      cy.get('div[data-cy="user-info"]', { timeout: 10000 }).should('be.visible')
      .find('p[data-cy="user-login"]', { timeout: 10000 })
      .should('have.text', testAgentUsername);
    });

  });
  
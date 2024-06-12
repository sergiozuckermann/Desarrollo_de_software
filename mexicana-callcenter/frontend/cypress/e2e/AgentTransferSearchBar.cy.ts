/// <reference types="cypress" />

import {
  testSupervisorUsername,
  testSupervisorPassword,
  testAgentUsername,
  testAgentName,
  testAgentLastName,
  testUsernameInvalid,
  testNameInvalid,
  testLastNameInvalid
} from './utils';
  
  describe('Agent Transfer Search Bar', () => {

    // Visit the signup page for each test
    beforeEach(() => {
      cy.visit('/signin');
    });
  
    it('Test to validate agent transfer search bar finds an existing agent', () => {
      // Login as supervisor
      cy.get('[name=Username]', { timeout: 10000 }).should('be.visible').type(testSupervisorUsername);
      cy.get('[name=password]', { timeout: 10000 }).should('be.visible').type(testSupervisorPassword);
      cy.get('button[type="submit"]', { timeout: 10000 }).should('be.visible').click();
      // Go to Agent Queue Transfer page
      cy.get('button').contains('Agent Queue Transfer').click();
      cy.url().should('include', 'supervisor/agent-transfer');
      // Input an agent user info
      cy.get('[data-cy=search-name]', { timeout: 10000 }).should('be.visible').type(testAgentName);
      cy.get('[data-cy=search-lastname]', { timeout: 10000 }).should('be.visible').type(testAgentLastName);
      cy.get('[data-cy=search-username]', { timeout: 10000 }).should('be.visible').type(testAgentUsername);
      cy.get('[data-cy=search-submit]', { timeout: 10000 }).should('be.visible').click();
      // Validate notification title
      cy.get('.notification-container')
      .find('h4.title')
      .should('have.text', 'Search Success');
      // Validate notification message
      cy.get('.notification-container')
      .find('div.message')
      .should('have.text', 'User found');
      // Validate user card is highlighted
      cy.contains('div', testAgentUsername)
      .parents().eq(1)
      .should('have.class', 'highlight');
    });

    it('Test to validate agent transfer search bar does not find an inexisting user', () => {
      // Login as supervisor
      cy.get('[name=Username]', { timeout: 10000 }).should('be.visible').type(testSupervisorUsername);
      cy.get('[name=password]', { timeout: 10000 }).should('be.visible').type(testSupervisorPassword);
      cy.get('button[type="submit"]', { timeout: 10000 }).should('be.visible').click();
      // Go to Agent Queue Transfer page
      cy.get('button').contains('Agent Queue Transfer').click();
      cy.url().should('include', 'supervisor/agent-transfer');
      // Input an invalid agent user info
      cy.get('[data-cy=search-name]', { timeout: 10000 }).should('be.visible').type(testNameInvalid);
      cy.get('[data-cy=search-lastname]', { timeout: 10000 }).should('be.visible').type(testLastNameInvalid);
      cy.get('[data-cy=search-username]', { timeout: 10000 }).should('be.visible').type(testUsernameInvalid);
      cy.get('[data-cy=search-submit]', { timeout: 10000 }).should('be.visible').click();
      // Validate notification title
      cy.get('.notification-container')
      .find('h4.title')
      .should('have.text', 'Search Error');
      // Validate notification message
      cy.get('.notification-container')
      .find('div.message')
      .should('have.text', 'User not found');
    });
  });
  
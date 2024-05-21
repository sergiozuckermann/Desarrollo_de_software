/// <reference types="cypress" />

import {
  test_firstName,
  test_lastName,
  test_preferred_username,
  test_agentType,
  test_email_existing,
  test_email_valid,
  test_email_valid2,
  test_password_valid,
  test_password_valid2,
  test_jobLevel,
  test_preferred_username2
} from './utils';
import { createUser } from './createTestUser';
import { deleteUser } from './deleteTestUser';


describe('Signup Tests', () => {
  
  // Create a test user
  before(async () => {
    const metadata = await createUser(test_email_existing, test_password_valid, test_firstName, test_lastName, test_jobLevel,test_agentType,test_preferred_username);
  });

  // Visit the signup page for each test
  beforeEach(() => {
    cy.visit('/signup');
  });

  it('Test to validate error message when entered email is no valid', () => {
    cy.get('[data-cy=first-name-input]', { timeout: 10000 }).should('be.visible').type(test_firstName);
    cy.get('[data-cy=sur-name-input]', { timeout: 10000 }).should('be.visible').type(test_lastName);
    cy.get('[data-cy=email-input]', { timeout: 10000 }).should('be.visible').type('invalidemail');
    cy.get('[data-cy=username-input]', { timeout: 10000 }).should('be.visible').type(test_preferred_username);
    cy.get('[data-cy=password-input]', { timeout: 10000 }).should('be.visible').type(test_password_valid);
    cy.get('[data-cy=password-confirm-input]', { timeout: 10000 }).should('be.visible').type('ValidPassword10!');
    cy.get('[data-cy=job-level-input]', { timeout: 10000 }).should('be.visible').select(test_jobLevel);
    cy.get('[data-cy=agent-type-input]', { timeout: 10000 }).should('be.visible').select(test_agentType);

    cy.contains("Create").click();    

    cy.contains('🚨 Invalid email address format', { timeout: 10000 }).should('be.visible');
  });

  it('Test to validate error message when entered email is duplicated', () => {
    cy.get('[data-cy=first-name-input]', { timeout: 10000 }).should('be.visible').type(test_firstName);
    cy.get('[data-cy=sur-name-input]', { timeout: 10000 }).should('be.visible').type(test_lastName);
    cy.get('[data-cy=email-input]', { timeout: 10000 }).should('be.visible').type(test_email_existing);
    cy.get('[data-cy=username-input]', { timeout: 10000 }).should('be.visible').type(test_preferred_username);
    cy.get('[data-cy=password-input]', { timeout: 10000 }).should('be.visible').type(test_password_valid);
    cy.get('[data-cy=password-confirm-input]', { timeout: 10000 }).should('be.visible').type('ValidPassword10!');
    cy.get('[data-cy=job-level-input]', { timeout: 10000 }).should('be.visible').select(test_jobLevel);
    cy.get('[data-cy=agent-type-input]', { timeout: 10000 }).should('be.visible').select(test_agentType);

    cy.contains("Create").click();    

    cy.contains('🚨 User already exists', { timeout: 10000 }).should('be.visible');
  });

  it('Test to validate error message when entered password does not have numeric characters', () => {
    cy.get('[data-cy=first-name-input]', { timeout: 10000 }).should('be.visible').type(test_firstName);
    cy.get('[data-cy=sur-name-input]', { timeout: 10000 }).should('be.visible').type(test_lastName);
    cy.get('[data-cy=email-input]', { timeout: 10000 }).should('be.visible').type(test_email_valid);
    cy.get('[data-cy=username-input]', { timeout: 10000 }).should('be.visible').type(test_preferred_username);
    cy.get('[data-cy=password-input]', { timeout: 10000 }).should('be.visible').type('InvalidPassword');
    cy.get('[data-cy=password-confirm-input]', { timeout: 10000 }).should('be.visible').type('InvalidPassword');
    cy.get('[data-cy=job-level-input]', { timeout: 10000 }).should('be.visible').select(test_jobLevel);
    cy.get('[data-cy=agent-type-input]', { timeout: 10000 }).should('be.visible').select(test_agentType);

    cy.contains("Create").click();

    cy.contains('🚨 Password did not conform with policy: Password must have numeric characters', { timeout: 10000 }).should('be.visible');
  });

  it('Test to validate error message when entered password does not have symbol characters', () => {
    cy.get('[data-cy=first-name-input]', { timeout: 10000 }).should('be.visible').type(test_firstName);
    cy.get('[data-cy=sur-name-input]', { timeout: 10000 }).should('be.visible').type(test_lastName);
    cy.get('[data-cy=email-input]', { timeout: 10000 }).should('be.visible').type(test_email_valid);
    cy.get('[data-cy=username-input]', { timeout: 10000 }).should('be.visible').type(test_preferred_username);
    cy.get('[data-cy=password-input]', { timeout: 10000 }).should('be.visible').type('InvalidPassword10');
    cy.get('[data-cy=password-confirm-input]', { timeout: 10000 }).should('be.visible').type('InvalidPassword10');
    cy.get('[data-cy=job-level-input]', { timeout: 10000 }).should('be.visible').select(test_jobLevel);
    cy.get('[data-cy=agent-type-input]', { timeout: 10000 }).should('be.visible').select(test_agentType);

    cy.contains("Create").click();

    cy.contains('🚨 Password did not conform with policy: Password must have symbol characters', { timeout: 10000 }).should('be.visible');
  });

  it('Test to validate error message when entered password does not have uppercase characters', () => {
    cy.get('[data-cy=first-name-input]', { timeout: 10000 }).should('be.visible').type(test_firstName);
    cy.get('[data-cy=sur-name-input]', { timeout: 10000 }).should('be.visible').type(test_lastName);
    cy.get('[data-cy=email-input]', { timeout: 10000 }).should('be.visible').type(test_email_valid);
    cy.get('[data-cy=username-input]', { timeout: 10000 }).should('be.visible').type(test_preferred_username);
    cy.get('[data-cy=password-input]', { timeout: 10000 }).should('be.visible').type('invalidpassword10!');
    cy.get('[data-cy=password-confirm-input]', { timeout: 10000 }).should('be.visible').type('invalidpassword10!');
    cy.get('[data-cy=job-level-input]', { timeout: 10000 }).should('be.visible').select(test_jobLevel);
    cy.get('[data-cy=agent-type-input]', { timeout: 10000 }).should('be.visible').select(test_agentType);

    cy.contains("Create").click();

    cy.contains('🚨 Password did not conform with policy: Password must have uppercase characters', { timeout: 10000 }).should('be.visible');
  });

  it('Test to validate error message when entered password does not have lower characters', () => {
    cy.get('[data-cy=first-name-input]', { timeout: 10000 }).should('be.visible').type(test_firstName);
    cy.get('[data-cy=sur-name-input]', { timeout: 10000 }).should('be.visible').type(test_lastName);
    cy.get('[data-cy=email-input]', { timeout: 10000 }).should('be.visible').type(test_email_valid);
    cy.get('[data-cy=username-input]', { timeout: 10000 }).should('be.visible').type(test_preferred_username);
    cy.get('[data-cy=password-input]', { timeout: 10000 }).should('be.visible').type('INVALIDPASSWORD10!');
    cy.get('[data-cy=password-confirm-input]', { timeout: 10000 }).should('be.visible').type('INVALIDPASSWORD10!');
    cy.get('[data-cy=job-level-input]', { timeout: 10000 }).should('be.visible').select(test_jobLevel);
    cy.get('[data-cy=agent-type-input]', { timeout: 10000 }).should('be.visible').select(test_agentType);

    cy.contains("Create").click();

    cy.contains('🚨 Password did not conform with policy: Password must have lowercase characters', { timeout: 10000 }).should('be.visible');
  });

  it('Test to validate error message when entered password is different from confirmation password', () => {
    cy.get('[data-cy=first-name-input]', { timeout: 10000 }).should('be.visible').type(test_firstName);
    cy.get('[data-cy=sur-name-input]', { timeout: 10000 }).should('be.visible').type(test_lastName);
    cy.get('[data-cy=email-input]', { timeout: 10000 }).should('be.visible').type(test_email_valid);
    cy.get('[data-cy=username-input]', { timeout: 10000 }).should('be.visible').type(test_preferred_username);
    cy.get('[data-cy=password-input]', { timeout: 10000 }).should('be.visible').type(test_password_valid);
    cy.get('[data-cy=password-confirm-input]', { timeout: 10000 }).should('be.visible').type(test_password_valid2);
    cy.get('[data-cy=job-level-input]', { timeout: 10000 }).should('be.visible').select(test_jobLevel);
    cy.get('[data-cy=agent-type-input]', { timeout: 10000 }).should('be.visible').select(test_agentType);

    cy.contains("Create").click();


    cy.contains('🚨 Passwords do not match!', { timeout: 10000 }).should('be.visible');
  });

  it('Test to validate user signup', () => {
    cy.get('[data-cy=first-name-input]', { timeout: 10000 }).should('be.visible').type(test_firstName);
    cy.get('[data-cy=sur-name-input]', { timeout: 10000 }).should('be.visible').type(test_lastName);
    cy.get('[data-cy=email-input]', { timeout: 10000 }).should('be.visible').type(test_email_valid);
    cy.get('[data-cy=username-input]', { timeout: 10000 }).should('be.visible').type(test_preferred_username2);
    cy.get('[data-cy=password-input]', { timeout: 10000 }).should('be.visible').type(test_password_valid);
    cy.get('[data-cy=password-confirm-input]', { timeout: 10000 }).should('be.visible').type(test_password_valid);
    cy.get('[data-cy=job-level-input]', { timeout: 10000 }).should('be.visible').select(test_jobLevel);
    cy.get('[data-cy=agent-type-input]', { timeout: 10000 }).should('be.visible').select(test_agentType);

    cy.contains("Create").click();

    cy.contains('🎉 User is registered but confirmation is needed by Admin.', { timeout: 10000 }).should('be.visible');
  });

  // Delete the test user
  after(async () => {
    await deleteUser("us-east-1_B7gG0aOum", test_preferred_username);
    await deleteUser("us-east-1_B7gG0aOum", test_preferred_username2);
  });
});

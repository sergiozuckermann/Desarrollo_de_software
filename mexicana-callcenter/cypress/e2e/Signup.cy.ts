/// <reference types="cypress" />

import {
  testEmailExisting,
  testEmailValid,
  testPasswordValid,
  testPasswordValid2,
  testFirstName,
  testSurName,
  testJobLevel
} from './utils';
import { createUser } from './createTestUser';
import { deleteUser } from './deleteTestUser';


describe('Signup Tests', () => {
  
  // Create a test user
  before(async () => {
    const metadata = await createUser(testEmailExisting, testPasswordValid, testFirstName, testSurName, testJobLevel);
  });

  // Visit the signup page for each test
  beforeEach(() => {
    cy.visit('/signup');
  });

  it('Test to validate error message when entered email is no valid', () => {
    cy.get('[data-cy=first-name-input]', { timeout: 10000 }).should('be.visible').type(testFirstName);
    cy.get('[data-cy=sur-name-input]', { timeout: 10000 }).should('be.visible').type(testSurName);
    cy.get('[data-cy=email-input]', { timeout: 10000 }).should('be.visible').type('invalidemail');
    cy.get('[data-cy=password-input]', { timeout: 10000 }).should('be.visible').type(testPasswordValid);
    cy.get('[data-cy=password-confirm-input]', { timeout: 10000 }).should('be.visible').type('ValidPassword10!{enter}');

    cy.contains('🚨 Username should be an email.', { timeout: 10000 }).should('be.visible');
  });

  it('Test to validate error message when entered email does not satisfy regular expression pattern', () => {
    cy.get('[data-cy=first-name-input]', { timeout: 10000 }).should('be.visible').type(testFirstName);
    cy.get('[data-cy=sur-name-input]', { timeout: 10000 }).should('be.visible').type(testSurName);
    cy.get('[data-cy=email-input]', { timeout: 10000 }).should('be.visible').type('invalid email');
    cy.get('[data-cy=password-input]', { timeout: 10000 }).should('be.visible').type(testPasswordValid);
    cy.get('[data-cy=password-confirm-input]', { timeout: 10000 }).should('be.visible').type('ValidPassword10!{enter}');

    cy.contains("🚨 1 validation error detected: Value at 'username' failed to satisfy constraint: Member must satisfy "
      + "regular expression pattern:", { timeout: 10000 }).should('be.visible');
  });

  it('Test to validate error message when entered email is duplicated', () => {
    cy.get('[data-cy=first-name-input]', { timeout: 10000 }).should('be.visible').type(testFirstName);
    cy.get('[data-cy=sur-name-input]', { timeout: 10000 }).should('be.visible').type(testSurName);
    cy.get('[data-cy=email-input]', { timeout: 10000 }).should('be.visible').type(testEmailExisting);
    cy.get('[data-cy=password-input]', { timeout: 10000 }).should('be.visible').type(testPasswordValid);
    cy.get('[data-cy=password-confirm-input]', { timeout: 10000 }).should('be.visible').type(testPasswordValid+'{enter}');

    cy.contains('🚨 User already exists', { timeout: 10000 }).should('be.visible');
  });

  it('Test to validate error message when entered password does not have numeric characters', () => {
    cy.get('[data-cy=first-name-input]', { timeout: 10000 }).should('be.visible').type(testFirstName);
    cy.get('[data-cy=sur-name-input]', { timeout: 10000 }).should('be.visible').type(testSurName);
    cy.get('[data-cy=email-input]', { timeout: 10000 }).should('be.visible').type(testEmailValid);
    cy.get('[data-cy=password-input]', { timeout: 10000 }).should('be.visible').type('InvalidPassword');
    cy.get('[data-cy=password-confirm-input]', { timeout: 10000 }).should('be.visible').type('InvalidPassword{enter}');

    cy.contains('🚨 Password did not conform with policy: Password must have numeric characters', { timeout: 10000 }).should('be.visible');
  });

  it('Test to validate error message when entered password does not have symbol characters', () => {
    cy.get('[data-cy=first-name-input]', { timeout: 10000 }).should('be.visible').type(testFirstName);
    cy.get('[data-cy=sur-name-input]', { timeout: 10000 }).should('be.visible').type(testSurName);
    cy.get('[data-cy=email-input]', { timeout: 10000 }).should('be.visible').type(testEmailValid);
    cy.get('[data-cy=password-input]', { timeout: 10000 }).should('be.visible').type('InvalidPassword10');
    cy.get('[data-cy=password-confirm-input]', { timeout: 10000 }).should('be.visible').type('InvalidPassword10{enter}');

    cy.contains('🚨 Password did not conform with policy: Password must have symbol characters', { timeout: 10000 }).should('be.visible');
  });

  it('Test to validate error message when entered password does not have uppercase characters', () => {
    cy.get('[data-cy=first-name-input]', { timeout: 10000 }).should('be.visible').type(testFirstName);
    cy.get('[data-cy=sur-name-input]', { timeout: 10000 }).should('be.visible').type(testSurName);
    cy.get('[data-cy=email-input]', { timeout: 10000 }).should('be.visible').type(testEmailValid);
    cy.get('[data-cy=password-input]', { timeout: 10000 }).should('be.visible').type('invalidpassword10!');
    cy.get('[data-cy=password-confirm-input]', { timeout: 10000 }).should('be.visible').type('invalidpassword10!{enter}');

    cy.contains('🚨 Password did not conform with policy: Password must have uppercase characters', { timeout: 10000 }).should('be.visible');
  });

  it('Test to validate error message when entered password does not have lower characters', () => {
    cy.get('[data-cy=first-name-input]', { timeout: 10000 }).should('be.visible').type(testFirstName);
    cy.get('[data-cy=sur-name-input]', { timeout: 10000 }).should('be.visible').type(testSurName);
    cy.get('[data-cy=email-input]', { timeout: 10000 }).should('be.visible').type(testEmailValid);
    cy.get('[data-cy=password-input]', { timeout: 10000 }).should('be.visible').type('INVALIDPASSWORD10!');
    cy.get('[data-cy=password-confirm-input]', { timeout: 10000 }).should('be.visible').type('INVALIDPASSWORD10!{enter}');

    cy.contains('🚨 Password did not conform with policy: Password must have lowercase characters', { timeout: 10000 }).should('be.visible');
  });

  it('Test to validate error message when entered password does not satisfy regular expression pattern', () => {
    cy.get('[data-cy=first-name-input]', { timeout: 10000 }).should('be.visible').type(testFirstName);
    cy.get('[data-cy=sur-name-input]', { timeout: 10000 }).should('be.visible').type(testSurName);
    cy.get('[data-cy=email-input]', { timeout: 10000 }).should('be.visible').type(testEmailValid);
    cy.get('[data-cy=password-input]', { timeout: 10000 }).should('be.visible').type('InvalidPassword10! ');
    cy.get('[data-cy=password-confirm-input]', { timeout: 10000 }).should('be.visible').type('InvalidPassword10! {enter}');

    cy.contains("1 validation error detected: Value at 'password' failed to satisfy constraint: Member must satisfy "
    + "regular expression pattern:", { timeout: 10000 }).should('be.visible');
  });

  it('Test to validate error message when entered password is different from confirmation password', () => {
    cy.get('[data-cy=first-name-input]', { timeout: 10000 }).should('be.visible').type(testFirstName);
    cy.get('[data-cy=sur-name-input]', { timeout: 10000 }).should('be.visible').type(testSurName);
    cy.get('[data-cy=email-input]', { timeout: 10000 }).should('be.visible').type(testEmailValid);
    cy.get('[data-cy=password-input]', { timeout: 10000 }).should('be.visible').type(testPasswordValid);
    cy.get('[data-cy=password-confirm-input]', { timeout: 10000 }).should('be.visible').type(testPasswordValid2+'{enter}');

    cy.contains('🚨 Passwords do not match!', { timeout: 10000 }).should('be.visible');
  });

  it('Test to validate user signup', () => {
    cy.get('[data-cy=first-name-input]', { timeout: 10000 }).should('be.visible').type(testFirstName);
    cy.get('[data-cy=sur-name-input]', { timeout: 10000 }).should('be.visible').type(testSurName);
    cy.get('[data-cy=email-input]', { timeout: 10000 }).should('be.visible').type(testEmailValid);
    cy.get('[data-cy=password-input]', { timeout: 10000 }).should('be.visible').type(testPasswordValid);
    cy.get('[data-cy=password-confirm-input]', { timeout: 10000 }).should('be.visible').type(testPasswordValid+'{enter}');

    cy.contains('🎉 User is registered but confirmation is needed by Admin.', { timeout: 10000 }).should('be.visible');
  });

  // Delete the test user
  after(async () => {
    const response = await deleteUser("us-east-1_4KZw7nlgg", testEmailExisting);
    const response2 = await deleteUser("us-east-1_4KZw7nlgg", testEmailValid);
  });
});

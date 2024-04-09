/// <reference types="cypress" />

import { testValidNewEmail } from './utils';

describe('Login Tests', () => {
  beforeEach(() => {
    cy.visit('https://127.0.0.1:5173/signup');
  });

  it('Test to validate error message when entered email is no valid', () => {
    cy.get('[data-cy=email-input]', { timeout: 10000 }).should('be.visible').type('invalidemail');
    cy.get('[data-cy=password-input]', { timeout: 10000 }).should('be.visible').type('ValidPassword10!');
    cy.get('[data-cy=password-confirm-input]', { timeout: 10000 }).should('be.visible').type('ValidPassword10!{enter}');

    cy.contains('🚨 Username should be an email.', { timeout: 10000 }).should('be.visible');
  });

  it('Test to validate error message when entered email does not satisfy regular expression pattern', () => {
    cy.get('[data-cy=email-input]', { timeout: 10000 }).should('be.visible').type('invalid email');
    cy.get('[data-cy=password-input]', { timeout: 10000 }).should('be.visible').type('ValidPassword10!');
    cy.get('[data-cy=password-confirm-input]', { timeout: 10000 }).should('be.visible').type('ValidPassword10!{enter}');

    cy.contains("🚨 1 validation error detected: Value at 'username' failed to satisfy constraint: Member must satisfy "
      + "regular expression pattern:", { timeout: 10000 }).should('be.visible');
  });

  it('Test to validate error message when entered email is duplicated', () => {
    cy.get('[data-cy=email-input]', { timeout: 10000 }).should('be.visible').type('random@gmail.com');
    cy.get('[data-cy=password-input]', { timeout: 10000 }).should('be.visible').type('ValidPassword10!');
    cy.get('[data-cy=password-confirm-input]', { timeout: 10000 }).should('be.visible').type('ValidPassword10!{enter}');

    cy.contains('🚨 An account with the given email already exists.', { timeout: 10000 }).should('be.visible');
  });

  it('Test to validate error message when entered password does not have numeric characters', () => {
    cy.get('[data-cy=email-input]', { timeout: 10000 }).should('be.visible').type(testValidNewEmail);
    cy.get('[data-cy=password-input]', { timeout: 10000 }).should('be.visible').type('InvalidPassword');
    cy.get('[data-cy=password-confirm-input]', { timeout: 10000 }).should('be.visible').type('InvalidPassword{enter}');

    cy.contains('🚨 Password did not conform with policy: Password must have numeric characters', { timeout: 10000 }).should('be.visible');
  });

  it('Test to validate error message when entered password does not have symbol characters', () => {
    cy.get('[data-cy=email-input]', { timeout: 10000 }).should('be.visible').type('EmailValid@mail.com');
    cy.get('[data-cy=password-input]', { timeout: 10000 }).should('be.visible').type('InvalidPassword10');
    cy.get('[data-cy=password-confirm-input]', { timeout: 10000 }).should('be.visible').type('InvalidPassword10{enter}');

    cy.contains('🚨 Password did not conform with policy: Password must have symbol characters', { timeout: 10000 }).should('be.visible');
  });

  it('Test to validate error message when entered password does not have uppercase characters', () => {
    cy.get('[data-cy=email-input]', { timeout: 10000 }).should('be.visible').type('EmailValid@mail.com');
    cy.get('[data-cy=password-input]', { timeout: 10000 }).should('be.visible').type('invalidpassword10!');
    cy.get('[data-cy=password-confirm-input]', { timeout: 10000 }).should('be.visible').type('invalidpassword10!{enter}');

    cy.contains('🚨 Password did not conform with policy: Password must have uppercase characters', { timeout: 10000 }).should('be.visible');
  });

  it('Test to validate error message when entered password does not have lower characters', () => {
    cy.get('[data-cy=email-input]', { timeout: 10000 }).should('be.visible').type('EmailValid@mail.com');
    cy.get('[data-cy=password-input]', { timeout: 10000 }).should('be.visible').type('INVALIDPASSWORD10!');
    cy.get('[data-cy=password-confirm-input]', { timeout: 10000 }).should('be.visible').type('INVALIDPASSWORD10!{enter}');

    cy.contains('🚨 Password did not conform with policy: Password must have lowercase characters', { timeout: 10000 }).should('be.visible');
  });

  it('Test to validate error message when entered password does not satisfy regular expression pattern', () => {
    cy.get('[data-cy=email-input]', { timeout: 10000 }).should('be.visible').type('EmailValid@mail.com');
    cy.get('[data-cy=password-input]', { timeout: 10000 }).should('be.visible').type('InvalidPassword10! ');
    cy.get('[data-cy=password-confirm-input]', { timeout: 10000 }).should('be.visible').type('InvalidPassword10! {enter}');

    cy.contains("1 validation error detected: Value at 'password' failed to satisfy constraint: Member must satisfy "
    + "regular expression pattern:", { timeout: 10000 }).should('be.visible');
  });

  it('Test to validate error message when entered password is different from confirmation password', () => {
    cy.get('[data-cy=email-input]', { timeout: 10000 }).should('be.visible').type('EmailValid@mail.com');
    cy.get('[data-cy=password-input]', { timeout: 10000 }).should('be.visible').type('ValidPassword10!');
    cy.get('[data-cy=password-confirm-input]', { timeout: 10000 }).should('be.visible').type('ValidPassword10{enter}');

    cy.contains('🚨 Passwords do not match!', { timeout: 10000 }).should('be.visible');
  });

});


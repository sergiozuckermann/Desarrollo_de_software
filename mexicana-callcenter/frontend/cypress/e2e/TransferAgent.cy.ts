/// <reference types="cypress" />
import '@4tw/cypress-drag-drop'

describe('Transfer Agent Tests', () => {
  beforeEach(() => {
    const link = '[data-cy="link"]';

    cy.viewport(1920, 1080);

    cy.visit('/signin');
    cy.get('[name=Username]').type('tg2714');
    cy.get('[name=password]').type('Zekund99.');
    cy.get('button[type="submit"]').click(); // Adjust the selector to be more specific

    cy.url().should('include', '/Supervisor/home');
    cy.get('button').contains('Agent Overview').click();
    cy.url().should('include', '/supervisor/onGoingCalls');
    cy.get(link).scrollIntoView().should('be.visible').click();

  });

  it('should drag an agent to a new routing profile', () => {
    const draggableAgent = '[data-testid="agent-ba2f07cd-153d-4562-863d-7ad5fc67d51e"]';
    const dropTarget = '[data-testid="card-FlightManagement"]';

    // Ensure elements are visible
    cy.get(draggableAgent, { timeout: 20000 }).scrollIntoView().should('be.visible');
    cy.get(dropTarget).scrollIntoView().should('be.visible');

    // Perform the drag and drop action using detailed mouse events
    cy.get(draggableAgent).then(agent => {
      const dataTransfer = new DataTransfer();
      cy.wrap(agent)
        .trigger('mousedown', { button: 0, force: true })
        .trigger('dragstart', { dataTransfer, force: true });
      cy.get(dropTarget)
        .trigger('dragenter', { dataTransfer, force: true })
        .trigger('dragover', { dataTransfer, force: true });
      cy.wrap(agent)
        .trigger('drag', { dataTransfer, force: true });
      cy.get(dropTarget)
        .trigger('drop', { dataTransfer, force: true })
        .trigger('dragend', { dataTransfer, force: true });
    });

    // Verify the agent is now within the drop target by checking the existence within the drop target
    cy.get(dropTarget).within(() => {
      cy.get(draggableAgent).should('exist');
    });    // Perform the drag and drop action using detailed mouse events
    cy.get(draggableAgent).then(agent => {
      const dataTransfer = new DataTransfer();
      cy.wrap(agent)
        .trigger('mousedown', { button: 0, force: true })
        .trigger('dragstart', { dataTransfer, force: true });
      cy.get(dropTarget)
        .trigger('dragenter', { dataTransfer, force: true })
        .trigger('dragover', { dataTransfer, force: true });
      cy.wrap(agent)
        .trigger('drag', { dataTransfer, force: true });
      cy.get(dropTarget)
        .trigger('drop', { dataTransfer, force: true })
        .trigger('dragend', { dataTransfer, force: true });
    });

    // Verify the agent is now within the drop target by checking the existence within the drop target
    cy.get(dropTarget).within(() => {
      cy.get(draggableAgent).should('exist');
    });
  });

  afterEach(() => {
    const draggableAgent = '[data-testid="agent-ba2f07cd-153d-4562-863d-7ad5fc67d51e"]';
    const originalTarget = '[data-testid="card-TestProfile"]';

    cy.get(draggableAgent).scrollIntoView().should('be.visible');
    cy.get(originalTarget).scrollIntoView().should('be.visible');

    // Perform the drag and drop action using detailed mouse events
    cy.get(draggableAgent).then(agent => {
      const dataTransfer = new DataTransfer();
      cy.wrap(agent)
        .trigger('mousedown', { button: 0, force: true })
        .trigger('dragstart', { dataTransfer, force: true });
      cy.get(originalTarget)
        .trigger('dragenter', { dataTransfer, force: true })
        .trigger('dragover', { dataTransfer, force: true });
      cy.wrap(agent)
        .trigger('drag', { dataTransfer, force: true });
      cy.get(originalTarget)
        .trigger('drop', { dataTransfer, force: true })
        .trigger('dragend', { dataTransfer, force: true });
    });

    // Verify the agent is now within the drop target by checking the existence within the drop target
    cy.get(originalTarget).within(() => {
      cy.get(draggableAgent).should('exist');
    });
  });
});
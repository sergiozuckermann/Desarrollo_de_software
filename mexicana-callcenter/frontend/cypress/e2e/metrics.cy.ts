/// <reference types="cypress" />

describe('Historical Metrics Retrieval', () => {
    beforeEach(() => {
        cy.viewport(1920, 1080);

        // Visitar la página de inicio de sesión y autenticarse
        cy.visit('/signin');
        cy.get('[name=Username]').type('nuriscachis');
        cy.get('[name=password]').type('Zekund99.');
        cy.get('button[type="submit"]').click();

        // Verificar que la URL sea la esperada después de iniciar sesión
        cy.url().should('include', '/Agent/home');
    });

    it('should display historical metrics', () => {
        // Hacer clic en el botón 'My Metrics' y verificar la URL
        cy.get('button').contains('My Metrics').click();
        cy.url().should('include', '/agent/Metrics');
        cy.wait(10000);

        // Verificar que los elementos esperados estén presentes
        cy.get('.card').should('have.length', 9); // Asegurarse de que todas las tarjetas de métricas están presentes

        // Verificar que se muestra el gráfico de tasa de abandono
        cy.get('[data-tooltip-id="tooltipAbandonmentRate"]').within(() => {
            cy.get('p').contains('Abandonment Rate');
            cy.get('#gauge-chart1').should('exist');
        });

        // Verificar que se muestra el gráfico de ocupación del agente
        cy.get('[data-tooltip-id="my-tooltipAgentOccupancy"]').within(() => {
            cy.get('p').contains('Agent Occupancy');
        });

        // Verificar que se muestra el gráfico de tiempo promedio de respuesta de la cola
        cy.get('[data-tooltip-id="tooltipAverageQueueAnswerTime"]').within(() => {
            cy.get('p').contains('Average Queue Answer Time (ASA)');
            cy.get('h1').should('contain.text', 'seconds'); // Verificar que el texto contiene 'seconds'
        });

        // Verificar que se muestran los datos de tiempo de respuesta promedio por cola
        cy.get('[data-tooltip-id="tooltipAverageAnswerTimePerQueue"]').within(() => {
            cy.get('p').contains('Average Answer Time per Queue');
        });

        // Verificar que se muestran los datos de tiempo de abandono promedio de la cola
        cy.get('[data-tooltip-id="tooltipAverageQueueAbandonTime"]').within(() => {
            cy.get('p').contains('Average Queue Abandon Time');
        });

        // Verificar que se muestra el gráfico de nivel de servicio
        cy.get('[data-tooltip-id="tooltipServiceLevel"]').within(() => {
            cy.get('p').contains('Service Level');
        });

        // Verificar que se muestra el gráfico de duración promedio de contacto
        cy.get('[data-tooltip-id="tooltipAverageContactDuration"]').within(() => {
            cy.get('p').contains('Average Contact Duration');
            cy.get('h1').should('contain.text', 'minutes'); // Verificar que el texto contiene 'seconds'
        });

        // Verificar que se muestra el número de contactos manejados
        cy.get('[data-tooltip-id="tooltipContactsHandled"]').within(() => {
            cy.get('p').contains('Contacts Handled');
            cy.get('h1').should('contain.text', 'contacts'); // Verificar que el texto contiene 'contacts'
        });

        // Verificar que se muestra el gráfico de tiempo de flujo de contacto
        cy.get('[data-tooltip-id="tooltipContactFlowTime"]').within(() => {
            cy.get('p').contains('Contact Flow Time');
            cy.get('h1').should('contain.text', 'minutes'); // Verificar que el texto contiene 'seconds'
        });
     });
});

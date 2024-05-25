/// <reference types="cypress" />

describe('SentimentData in Calloverview', () => {
    beforeEach(() => {
      cy.visit('/signin');
      cy.get('[name=Username]').type('IanSupervisor', { force: true });
      cy.get('[name=password]').type('Password1!{enter}', { force: true });
      cy.wait(2000);
      cy.contains('Agent Overview').click({ force: true });
      cy.wait(2000);
      cy.get('div.flex.flex-col.items-center.justify-center.text-center.h-full').first().click({ force: true });
      cy.wait(2000);
    });
  
    // Successful sentiment data verification
    it('It should verify the existence and structure of sentimentData', () => {
      // Wait a reasonable amount of time for the page to fully load
      cy.wait(5000); // Wait 5 seconds
      // It retrieves sentimentData from the context of the window
      cy.window().then((win) => {
        console.log(win);
        // Acces to 'sentimentData'
        const sentimentData = win['sentimentData'];
  
        //Verifies that sentimentData is defined and is an undefined
        expect(sentimentData).to.be.an('array').that.is.not.empty;
  
        sentimentData.forEach(item => {
          // Verifies that the object has a property with an id equal to 'sentiment'
          expect(item).to.have.property('id', 'sentiment');
  
          // Verifies that the object has a 'data' property that is an array
          expect(item).to.have.property('data').that.is.an('array');
  
          // Verifies that each object in 'data' has properties 'x' and 'y'
          item.data.forEach(dataItem => {
            expect(dataItem).to.have.property('x').that.is.a('string');
            expect(dataItem).to.have.property('y').that.is.a('number');
          });
        });
      });
    });
    //Fail
    it('It should handle the case where sentimentData does not have the correct data.', () => {
      // Wait a reasonable amount of time for the page to fully load
      cy.wait(5000); // Wait 5 seconds
      // It retrieves sentimentData from the context of the window
      cy.window().then((win) => {
        console.log(win);
        // Acces to 'sentimentData'
        const sentimentData = win['sentimentData'];
  
        //Verifies that sentimentData is defined and is an undefined
        expect(sentimentData).to.be.an('array').that.is.not.empty;
  
        sentimentData.forEach(item => {
          // Verifies that the object has a property with an id equal to 'sentiment'
          expect(item).to.have.property('id', 'sentiment');
  
          // Verifies that the object has a 'data' property that is an array
          expect(item).to.have.property('data').that.is.an('array');
  
          // Verifies that each object in 'data' has properties 'x' and 'y'
          item.data.forEach(dataItem => {
            expect(dataItem).to.have.property('x').that.is.a('number');
            expect(dataItem).to.have.property('y').that.is.a('number');
          });
        });
      });
      });
    //Fail
    it('It should handle the case where sentimentData does not have the correct id', () => {
      // Wait a reasonable amount of time for the page to fully load
      cy.wait(5000); // Wait 5 seconds
      // It retrieves sentimentData from the context of the window
      cy.window().then((win) => {
        console.log(win);
        // Acces to 'sentimentData'
        const sentimentData = win['sentimentData'];
  
        //Verifies that sentimentData is defined and is an undefined
        expect(sentimentData).to.be.an('array').that.is.not.empty;
  
        sentimentData.forEach(item => {
          // Verifies that the object has a property with an id equal to 'sentiment'
          expect(item).to.have.property('id', 'sentiments');
  
          // Verifies that the object has a 'data' property that is an array
          expect(item).to.have.property('data').that.is.an('array');
  
          // Verifies that each object in 'data' has properties 'x' and 'y'
          item.data.forEach(dataItem => {
            expect(dataItem).to.have.property('x').that.is.a('string');
            expect(dataItem).to.have.property('y').that.is.a('number');
          });
        });
      });
      });
    afterEach(() => {
      cy.log('Tests completed.');
    });
});

  
import { SHORT_DELAY_IN_MS } from '../../src/constants/delays';
import { CIRCLE, QUEUE, COLOR_MODIFIED, COLOR_DEFAULT } from '../constants';

describe('Страница очередь работает корректно', function () {
  function addSeveralElements() {
    for (let i = 1; i < 4; i++) {
      cy.get('input').type(i);
      cy.get('button').contains('Добавить').click();
      cy.wait(SHORT_DELAY_IN_MS);
    }
  }

  beforeEach(function () {
    cy.visit('/queue');
    cy.contains('Очередь');
  });

  it('disables `Добавить` button if input is empty', function () {
    cy.get('input').should('have.value', '');
    cy.contains('button', 'Добавить').should('be.disabled');
  });

  it('inserts element properly', function () {
    for (let i = 1; i < 4; i++) {
      cy.get('input').type(i);
      cy.get(QUEUE).find(CIRCLE).as('circles');
      cy.get('@circles').then(($circles) => {
        cy.get('button')
          .contains('Добавить')
          .click()
          .then(() => {
            cy.wait(SHORT_DELAY_IN_MS);
            expect($circles[i - 1]).to.contain(i);
            expect($circles[i - 1]).to.have.css('border-color', COLOR_MODIFIED);
          });
        expect($circles[i - 1]).to.have.css('border-color', COLOR_DEFAULT);
      });
      cy.get(QUEUE).find(CIRCLE).eq(0).prev().should('contain', 'head');
      cy.get(QUEUE)
        .find(CIRCLE)
        .eq(i - 1)
        .nextAll()
        .should('contain', 'tail');
    }
  });

  it('removes element properly', function () {
    addSeveralElements();
    cy.get(QUEUE).find(CIRCLE).as('circles');
    cy.get('button').contains('Удалить').click();
    cy.get('@circles').then(($circles) => {
      expect($circles[0]).to.have.css('border-color', COLOR_MODIFIED);
      expect($circles[0]).to.contain('');
    });

    cy.get(QUEUE).find(CIRCLE).eq(1).prev().should('contain', 'head');
  });

  it('clears the queue properly', function () {
    addSeveralElements();
    cy.get('button').contains('Очистить').click();
    cy.get(QUEUE)
      .find(CIRCLE)
      .each((circle) => expect(circle).to.contain(''));
  });
});

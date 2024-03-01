import { DELAY_IN_MS, SHORT_DELAY_IN_MS } from '../../src/constants/delays';
import { CIRCLE, COLOR_DEFAULT, COLOR_CHANGING, STACK } from '../constants';

describe('Algososh stack', function () {
  function addSeveralElements() {
    cy.get('input').type('1');
    cy.get('button').contains('Добавить').as('add_button');
    cy.get('@add_button').click();
    cy.get('input').type('2');
    cy.get('@add_button').click();
  }

  beforeEach(() => {
    cy.visit('/stack');
    cy.contains('Стек');
  });

  it('disables `Добавить` button if input is empty', function () {
    cy.get('input').should('have.value', '');
    cy.contains('button', 'Добавить').should('be.disabled');
  });

  it('inserts element properly', function () {
    cy.get('input').type('1');
    cy.get('button').contains('Добавить').click();
    cy.get(CIRCLE).last().should('have.css', 'border-color', COLOR_CHANGING).contains(1);
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(CIRCLE).last().should('have.css', 'border-color', COLOR_DEFAULT).contains(1);
  });

  it('removes element properly', function () {
    addSeveralElements();
    cy.get(STACK).children().should('have.length', 2);
    cy.wait(DELAY_IN_MS);
    cy.get('button').contains('Удалить').click();
    cy.wait(DELAY_IN_MS);
    cy.get(STACK).children().should('have.length', 1);
  });

  it('clears all the elements properly', function () {
    addSeveralElements();
    cy.wait(DELAY_IN_MS);
    cy.get('button').contains('Очистить').click();
    cy.get(STACK).children().should('have.length', 0);
  });
});

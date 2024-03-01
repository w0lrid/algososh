import { CIRCLE, FIBONACCI_SEQUENCE, TEST_STRING } from '../constants';

describe('Algososh Fibonacci', () => {
  beforeEach(() => {
    cy.visit('/fibonacci');
    cy.contains('Последовательность Фибоначчи');
  });

  it('disables button if input is empty', () => {
    cy.get('input').should('have.value', '');
    cy.contains('button', 'Рассчитать').should('be.disabled');
  });

  it('generates number properly', () => {
    cy.get('input').type(`${TEST_STRING.length}`);
    cy.get('button').contains('Рассчитать').click();
    cy.get(CIRCLE).as('circles').should('have.length', 6);
    cy.get('@circles').each((number, index) => {
      cy.wrap(number).contains(FIBONACCI_SEQUENCE[index]);
    });
  });
});

import { CIRCLE, CIRCLE_CHANGED, CIRCLE_CHANGING, CIRCLE_DEFAULT, TEST_STRING } from '../constants';

describe('Algososh string', () => {
  beforeEach(() => {
    cy.visit('/recursion');
    cy.contains('Строка');
  });

  it('disables button if input is empty', () => {
    cy.get('input').should('have.value', '');
    cy.contains('button', 'Развернуть').should('be.disabled');
  });

  it('reverses string properly', function () {
    cy.get('input').type(TEST_STRING);
    cy.get('button').contains('Развернуть').click();
    cy.get(CIRCLE).as('circles').should('have.length', 5);
    cy.get('@circles').each((el, index) => {
      cy.wrap((el) => expect(el).contains(index + 1));

      if (index === 0 || index === 4) {
        cy.wrap(el)
          .get(CIRCLE_CHANGING)
          .contains(index + 1);
      } else {
        cy.wrap(el)
          .get(CIRCLE_DEFAULT)
          .contains(index + 1);
      }
    });
    cy.get('@circles').each((el, index) => {
      cy.wrap(el).contains(5 - index);
      cy.wrap(el).get(CIRCLE_CHANGED);
    });
  });
});

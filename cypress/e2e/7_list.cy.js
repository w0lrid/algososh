import { DELAY_IN_MS, SHORT_DELAY_IN_MS } from '../../src/constants/delays';
import { CIRCLE, COLOR_CHANGING, COLOR_DEFAULT, COLOR_MODIFIED, LIST } from '../constants';

describe('Algososh list', function () {
  beforeEach(function () {
    cy.visit('/list');
    cy.contains('Связный список');
    cy.get("input[placeholder='Введите текст']").as('text_input');
    cy.get("input[placeholder='Введите индекс']").as('index_input');
    cy.get(LIST).find(CIRCLE).as('circles');
  });

  it('disables add buttons if input is empty', function () {
    cy.get('input').should('have.value', '');
    cy.contains('button', 'Добавить в head').should('be.disabled');
    cy.contains('button', 'Добавить в tail').should('be.disabled');
    cy.contains('button', 'Добавить по индексу').should('be.disabled');
    cy.contains('button', 'Удалить по индексу').should('be.disabled');
  });

  it('shows default list properly', function () {
    cy.get('@circles').its('length').should('be.gte', 3).and('be.lte', 6);
    cy.get('@circles').each((circle) => {
      expect(circle).to.not.be.empty;
      expect(circle).to.have.css('border-color', 'rgb(0, 50, 255)');
    });
    cy.get('@circles').eq(0).prev().contains('head');
    cy.get('@circles').last().nextAll().contains('tail');
  });

  it('inserts element in head properly', function () {
    cy.get('@text_input').type('kek');
    cy.get('button').contains('Добавить в head').click();
    cy.get('@circles').eq(0).contains('kek');
    cy.get('@circles').eq(0).should('have.css', 'border-color', COLOR_CHANGING);
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get('@circles').eq(0).should('have.css', 'border-color', COLOR_MODIFIED);
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get('@circles').eq(0).should('have.css', 'border-color', COLOR_DEFAULT);
    cy.get('@circles').eq(0).prev().contains('head');
  });

  it('inserts element in tail properly', function () {
    cy.get('@text_input').type('kek');
    cy.get('button').contains('Добавить в tail').click();
    cy.get('@circles').last().contains('kek');
    cy.get('@circles').last().should('have.css', 'border-color', COLOR_MODIFIED);
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get('@circles').last().should('have.css', 'border-color', COLOR_DEFAULT);
    cy.get('@circles').last().nextAll().contains('tail');
  });

  it('inserts element by index properly', function () {
    cy.get('@text_input').type('kek');
    cy.get('@index_input').type('1');
    cy.get('@circles').eq(1).should('not.equal', 'kek');
    cy.get('button').contains('Добавить по индексу').click();
    cy.get('@circles').eq(0).should('have.css', 'border-color', COLOR_CHANGING);
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get('@circles').eq(0).should('have.css', 'border-color', COLOR_CHANGING);
    cy.get('@circles').eq(0).prev().contains('head');
    cy.get('@circles').eq(0).should('not.be.empty');
    cy.get('@circles').eq(1).should('have.css', 'border-color', COLOR_CHANGING);
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get('@circles').eq(1).contains('kek');
    cy.get('@circles').eq(1).should('have.css', 'border-color', COLOR_MODIFIED);
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get('@circles').eq(1).should('have.css', 'border-color', COLOR_DEFAULT);
  });

  it('removes element from head properly', function () {
    cy.get('@circles')
      .eq(0)
      .invoke('text')
      .then((circle_text) => {
        cy.get('button').contains('Удалить из head').click();
        cy.get('@circles').eq(0).should('not.have.text', circle_text);
        cy.get('@circles').eq(0).prev().contains('head');
      });
  });

  it('removes element from tail properly', function () {
    cy.get('@circles')
      .last()
      .invoke('text')
      .then((circle_text) => {
        cy.get('button').contains('Удалить из tail').click();
        cy.get('@circles').last().should('not.have.text', circle_text);
        cy.get('@circles').last().nextAll().contains('tail');
      });
  });

  it('removes element by index properly', function () {
    cy.get('@index_input').type('1');
    cy.get('@circles')
      .eq(1)
      .invoke('text')
      .then((circle_text) => {
        cy.get('button').contains('Удалить по индексу').click();
        cy.wait(DELAY_IN_MS * 2);
        cy.get('@circles').eq(1).should('not.have.text', circle_text);
      });
  });
});

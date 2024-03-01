describe('Algososh routing', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('opens home page', () => {
    cy.contains('в которых не учили алгоритмам');
  });

  it('opens string aka recursion page', () => {
    cy.get('a[href*="/recursion"]').click();
    cy.contains('Строка');
    cy.contains('К оглавлению').click();
    cy.contains('в которых не учили алгоритмам');
  });

  it('opens fibonacci page', () => {
    cy.get('a[href*="/fibonacci"]').click();
    cy.contains('Последовательность Фибоначчи');
    cy.contains('К оглавлению').click();
    cy.contains('в которых не учили алгоритмам');
  });

  it('opens sorting page', () => {
    cy.get('a[href*="/sorting"]').click();
    cy.contains('Сортировка массива');
    cy.contains('К оглавлению').click();
    cy.contains('в которых не учили алгоритмам');
  });

  it('opens stack page', () => {
    cy.get('a[href*="/stack"]').click();
    cy.contains('Стек');
    cy.contains('К оглавлению').click();
    cy.contains('в которых не учили алгоритмам');
  });

  it('opens queue page', () => {
    cy.get('a[href*="/queue"]').click();
    cy.contains('Очередь');
    cy.contains('К оглавлению').click();
    cy.contains('в которых не учили алгоритмам');
  });

  it('opens linked list page', () => {
    cy.get('a[href*="/list"]').click();
    cy.contains('Связный список');
    cy.contains('К оглавлению').click();
    cy.contains('в которых не учили алгоритмам');
  });
});

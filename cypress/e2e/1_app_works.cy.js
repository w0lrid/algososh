import { BASE_URL } from '../constants';

describe('Algososh works', () => {
  it(`should be available on ${BASE_URL}`, () => {
    cy.visit(BASE_URL);
  });
});

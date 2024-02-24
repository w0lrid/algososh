import { BASE_URL } from '../constants';

describe('Algososh works', function () {
  it(`should be available on ${BASE_URL}`, function () {
    cy.visit(BASE_URL);
  });
});

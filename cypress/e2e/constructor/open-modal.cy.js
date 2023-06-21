describe("app works correctly with routes", function () {
  beforeEach(function () {
    cy.visit("");
  });

  it("should open modal on new route", function () {
    cy.get("#643d69a5c3f7b9001cfa093c").click();

    cy.url().should("include", "ingredients/643d69a5c3f7b9001cfa093c");
  });
});

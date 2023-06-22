describe("app works correctly with routes", function () {
  beforeEach(function () {
    cy.visit("");
  });

  it("should open modal on new route", function () {
    cy.get("#643d69a5c3f7b9001cfa093c").click();

    cy.url().should("include", "ingredients/643d69a5c3f7b9001cfa093c");
  });

  it("should open modal and show ingredients details and close", function () {
    cy.get("#643d69a5c3f7b9001cfa093c").click();

    cy.url().should("include", "ingredients/643d69a5c3f7b9001cfa093c");

    cy.get("#modals").should(
      "have.text",
      "Детали ингридиентаКраторная булка N-200iКалории,ккал420Белки, г80Жиры, г24Углеводы, г53"
    );
    cy.get("#modals button").click();
  });
});

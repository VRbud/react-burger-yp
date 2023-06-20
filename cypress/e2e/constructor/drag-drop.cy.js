describe("app works correctly with routes", function () {
  beforeEach(function () {
    cy.visit("");
  });

  it("should dragndrop", function () {
    cy.get("#643d69a5c3f7b9001cfa093c").as("dragSourse");

    cy.get("#drop_target").as("dropTarget");

    cy.get("@dragSourse").drag("@dropTarget");
  });
});

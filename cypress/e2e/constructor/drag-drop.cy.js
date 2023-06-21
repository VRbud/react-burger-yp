describe("app works correctly with routes", function () {
  beforeEach(function () {
    cy.visit("");
  });

  it("should dragndrop", function () {
    cy.get("#643d69a5c3f7b9001cfa093c").as("dragSourse1");
    cy.get("#643d69a5c3f7b9001cfa0943").as("dragSourse2");
    cy.get("#643d69a5c3f7b9001cfa0944").as("dragSourse3");

    cy.get("#drop_target").as("dropTarget");

    cy.get("@dragSourse1").drag("@dropTarget");
    cy.get("@dragSourse2").drag("@dropTarget");
    cy.get("@dragSourse3").drag("@dropTarget");
  });

  it("should sort with dragndrop", function () {
    cy.get("#643d69a5c3f7b9001cfa093c").as("dragSourse1");
    cy.get("#643d69a5c3f7b9001cfa0943").as("dragSourse2");
    cy.get("#643d69a5c3f7b9001cfa0944").as("dragSourse3");

    cy.get("#drop_target").as("dropTarget");

    cy.get("@dragSourse1").drag("@dropTarget");
    cy.get("@dragSourse2").drag("@dropTarget");
    cy.get("@dragSourse3").drag("@dropTarget");

    cy.get("#drop643d69a5c3f7b9001cfa0943").as("dragSourse4");
    cy.get("#drop643d69a5c3f7b9001cfa0944").as("dropTarget1");

    cy.get("@dropTarget1").drag("@dragSourse4");
  });

  it("should delete", function () {
    cy.get("#643d69a5c3f7b9001cfa093c").as("dragSourse1");
    cy.get("#643d69a5c3f7b9001cfa0943").as("dragSourse2");
    cy.get("#643d69a5c3f7b9001cfa0944").as("dragSourse3");

    cy.get("#drop_target").as("dropTarget");

    cy.get("@dragSourse1").drag("@dropTarget");
    cy.get("@dragSourse2").drag("@dropTarget");
    cy.get("@dragSourse3").drag("@dropTarget");

    cy.get(
      "#drop643d69a5c3f7b9001cfa0944 .constructor-element__action"
    ).click();
    cy.get("#drop643d69a5c3f7b9001cfa0944 .constructor-element__action").should(
      "not.exist"
    );
  });
});

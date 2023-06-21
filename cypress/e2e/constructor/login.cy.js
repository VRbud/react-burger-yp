describe("app works correctly with routes", function () {
  beforeEach(function () {
    cy.visit("/login");
  });

  it("should open login page", function () {
    cy.url().should("include", "/login");

    cy.get("#email").as("email").type("test@yandex.ru");
    cy.get("#password").as("password").type("password");
    cy.get("#submit").as("sybmit").click();
    cy.contains("Конструктор").click();

    cy.get("#643d69a5c3f7b9001cfa093c").as("dragSourse1");
    cy.get("#643d69a5c3f7b9001cfa0943").as("dragSourse2");
    cy.get("#643d69a5c3f7b9001cfa0944").as("dragSourse3");

    cy.get("#drop_target").as("dropTarget");

    cy.get("@dragSourse1").drag("@dropTarget");
    cy.get("@dragSourse2").drag("@dropTarget");
    cy.get("@dragSourse3").drag("@dropTarget");

    cy.contains("Оформить заказ").click();

    cy.intercept("POST", "orders").as("order");
    cy.wait("@order");
    cy.contains("Ваш заказ начали готовить");
  });
});

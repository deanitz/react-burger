import { cy, it } from "local-cypress";

describe("Страница конструктора", () => {
  it("открывается локально", () => {
    cy.visit("localhost:3000");
  });

  it('работает перетягивание булки и внутренних ингредиентов в конструктор', () => {
    cy.visit("localhost:3000");
  
    const dataTransfer = new DataTransfer();
  
    cy
    .get('[data-testid=ingredient-section_Булки]', {withinSubject:null}).first()
    .get('[class^="IngredientItem_ingredientItem"]', {withinSubject:null}).first()
    .trigger('dragstart', {
      dataTransfer
    });
  
    cy.get('[data-testid="drop-ingredient-target"]').trigger('drop', {
      dataTransfer
    });

    cy
    .get('[data-testid=ingredient-section_Соусы] [class^="IngredientItem_ingredientItem"]', {withinSubject:null}).first()
    .trigger('dragstart', {
      dataTransfer
    });
  
    cy.get('[data-testid="drop-ingredient-target"]').trigger('drop', {
      dataTransfer
    });

    cy.get('[data-testid="burger-top"]').first()
    .should("exist");

    cy.get('[data-testid="burger-bottom"]').first()
    .should("exist");

    cy.get('[data-testid="burger-inner"] [class^="InnerIngredient_innerIngredientContainer"]').first()
    .should("exist");
  });  
});



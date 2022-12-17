import { cy, Cypress, it } from "local-cypress";

describe("Тесты страницы конструктора", () => {
  it("открывается локально", () => {
    cy.visit("localhost:3000");
  });

  it("работает перетаскивание булки и внутренних ингредиентов в конструктор", () => {
    cy.visit("localhost:3000");

    const dataTransfer = new DataTransfer();

    cy.get(
      '[data-testid="ingredient-section_Булки"] [class^="IngredientItem_ingredientItem"]'
    )
      .first()
      .trigger("dragstart", {
        dataTransfer,
      });

    cy.get('[data-testid="drop-ingredient-target"]').trigger("drop", {
      dataTransfer,
    });

    cy.get(
      '[data-testid="ingredient-section_Соусы"] [class^="IngredientItem_ingredientItem"]'
    )
      .first()
      .trigger("dragstart", {
        dataTransfer,
      });

    cy.get('[data-testid="drop-ingredient-target"]').trigger("drop", {
      dataTransfer,
    });

    cy.get('[data-testid="burger-top"]').should("exist");

    cy.get('[data-testid="burger-bottom"]').should("exist");

    cy.get(
      '[data-testid="burger-inner"] [class^="InnerIngredient_innerIngredientContainer"]'
    ).should("exist");
  });

  it(
    "не работает перетаскивание булки и внутренних ингредиентов" +
      " в конструктор, если в нем еще нет булки",
    () => {
      cy.visit("localhost:3000");

      const dataTransfer = new DataTransfer();

      cy.get(
        '[data-testid="ingredient-section_Соусы"] [class^="IngredientItem_ingredientItem"]'
      )
        .first()
        .trigger("dragstart", {
          dataTransfer,
        });

      cy.get('[data-testid="drop-ingredient-target"]').trigger("drop", {
        dataTransfer,
      });

      cy.get('[data-testid="burger-top"]').should("not.exist");
      cy.get('[data-testid="burger-bottom"]').should("not.exist");
      cy.get(
        '[data-testid="burger-inner"] [class^="InnerIngredient_innerIngredientContainer"]'
      ).should("not.exist");
    }
  );

  it("перетаскивание другой булки заменяет текущую булку в конструкторе", () => {
    cy.visit("localhost:3000");

    const dataTransfer = new DataTransfer();

    cy.get(
      '[data-testid="ingredient-section_Булки"] [class^="IngredientItem_ingredientItem"]'
    )
      .first()
      .trigger("dragstart", {
        dataTransfer,
      });

    cy.get('[data-testid="drop-ingredient-target"]').trigger("drop", {
      dataTransfer,
    });
  });
});

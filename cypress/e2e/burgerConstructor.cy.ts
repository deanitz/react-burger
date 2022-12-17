import { cy, it } from "local-cypress";
import { text } from "stream/consumers";

let dataTransfer: DataTransfer;

const addIngredientTargetSelector = '[data-testid="drop-ingredient-target"]';
const bunSelector =
  '[data-testid="ingredient-section_Булки"] [class^="IngredientItem_ingredientItem"]';
const sauceSelector =
  '[data-testid="ingredient-section_Соусы"] [class^="IngredientItem_ingredientItem"]';
const mainSelector =
  '[data-testid="ingredient-section_Начинки"] [class^="IngredientItem_ingredientItem"]';
const topBunTextSelector =
  '[data-testid="burger-top"] [class^="constructor-element__text"]';
const burgerInnerIngredientsContainerSelector = '[data-testid="burger-inner"]';
const ingredientNameInListSelector = '[data-testid="ingredient-name"]';
const ingredientNameInBurgerSelector = '[class^="constructor-element__text"]';

const fillConstructorWithIngredients = () => {
  // перетаскиваем булку
  cy.get(bunSelector).as("buns");

  cy.get("@buns")
    .first()
    .within(() => {
      cy.get(ingredientNameInListSelector)
        .invoke("text")
        .as("firstBunName");
    });

  cy.get("@buns").first().trigger("dragstart", {
    dataTransfer,
  });

  cy.get(addIngredientTargetSelector).trigger("drop", {
    dataTransfer,
  });

  // перетаскиваем внутренние ингредиенты
  cy.get(sauceSelector)
    .eq(1)
    .within(() => {
      cy.get(ingredientNameInListSelector).invoke("text").as("sauce1");
    });

  cy.get(sauceSelector).eq(1).trigger("dragstart", {
    dataTransfer,
  });

  cy.get(addIngredientTargetSelector).trigger("drop", {
    dataTransfer,
  });

  cy.get(mainSelector)
    .eq(0)
    .within(() => {
      cy.get(ingredientNameInListSelector).invoke("text").as("main0");
    });

  cy.get(mainSelector).eq(0).trigger("dragstart", {
    dataTransfer,
  });

  cy.get(addIngredientTargetSelector).trigger("drop", {
    dataTransfer,
  });

  cy.get(mainSelector)
    .eq(1)
    .within(() => {
      cy.get(ingredientNameInListSelector).invoke("text").as("main1");
    });

  cy.get(mainSelector).eq(1).trigger("dragstart", {
    dataTransfer,
  });

  cy.get(addIngredientTargetSelector).trigger("drop", {
    dataTransfer,
  });

  cy.get(burgerInnerIngredientsContainerSelector)
    .children()
    .should("have.length", 3);
};

describe("Тесты страницы конструктора", () => {
  beforeEach(() => {
    cy.visit("localhost:3000");
    dataTransfer = new DataTransfer();
  });

  describe("пустой конструктор", () => {
    it("открывается локально", () => {});

    it("работает перетаскивание булки и внутренних ингредиентов в конструктор", () => {
      // перетаскиваем булку
      cy.get(bunSelector).first().trigger("dragstart", {
        dataTransfer,
      });

      cy.get(addIngredientTargetSelector).trigger("drop", {
        dataTransfer,
      });

      // перетаскиваем внутренние ингредиенты
      cy.get(sauceSelector).first().trigger("dragstart", {
        dataTransfer,
      });

      cy.get(addIngredientTargetSelector).trigger("drop", {
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
        // перетаскиваем внутренние ингредиенты
        cy.get(sauceSelector).first().trigger("dragstart", {
          dataTransfer,
        });

        cy.get(addIngredientTargetSelector).trigger("drop", {
          dataTransfer,
        });

        cy.get('[data-testid="burger-top"]').should("not.exist");
        cy.get('[data-testid="burger-bottom"]').should("not.exist");
        cy.get(
          '[data-testid="burger-inner"] [class^="InnerIngredient_innerIngredientContainer"]'
        ).should("not.exist");
      }
    );
  });

  describe("конструктор с ингредиентами", () => {
    beforeEach(fillConstructorWithIngredients);

    it("перетаскивание другой булки заменяет текущую булку в конструкторе", () => {
      // проверяем что первая булка перетащилась
      cy.get("@firstBunName").then((firstBunName) => {
        cy.get(topBunTextSelector).should("contain.text", firstBunName);
      });

      // перетаскиваем 2ю булку
      cy.get("@buns")
        .eq(1)
        .within(() => {
          cy.get(ingredientNameInListSelector)
            .invoke("text")
            .as("secondBunName");
        });

      cy.get("@buns").eq(1).trigger("dragstart", {
        dataTransfer,
      });

      cy.get(addIngredientTargetSelector).trigger("drop", {
        dataTransfer,
      });

      // проверяем что вторая булка перетащилась и заменила первую
      cy.get("@secondBunName").then((secondBunName) => {
        cy.get(topBunTextSelector).should("contain.text", secondBunName);
      });
    });

    it("перетаскивание внутренних ингредиентов добавляет их конструктор", () => {
      cy.get("@main1").then((main1) => {
        cy.get(burgerInnerIngredientsContainerSelector)
          .children()
          .first()
          .within(() => {
            cy.get(ingredientNameInBurgerSelector).should("have.text", main1);
          });
      });
    });

    it("перетаскивание ингредиентов в конструкторе изменяет их порядок, сверху вниз", () => {
      cy.get(burgerInnerIngredientsContainerSelector)
        .children()
        .eq(0)
        .trigger("dragstart", {
          dataTransfer,
        });

      cy.get(burgerInnerIngredientsContainerSelector)
        .children()
        .eq(1)
        .trigger("drop", {
          dataTransfer,
        });

      cy.get("@main0").then((main0) => {
        cy.get(burgerInnerIngredientsContainerSelector)
          .children()
          .first()
          .within(() => {
            cy.get(ingredientNameInBurgerSelector).should("have.text", main0);
          });
      });
    });

    it("перетаскивание ингредиентов в конструкторе изменяет их порядок, снизу вверх", () => {
      cy.get(burgerInnerIngredientsContainerSelector)
        .children()
        .eq(2)
        .trigger("dragstart", {
          dataTransfer,
        });

      cy.get(burgerInnerIngredientsContainerSelector)
        .children()
        .eq(0)
        .trigger("drop", {
          dataTransfer,
        });

      cy.get("@sauce1").then((sauce1) => {
        cy.get(burgerInnerIngredientsContainerSelector)
          .children()
          .first()
          .within(() => {
            cy.get(ingredientNameInBurgerSelector).should("have.text", sauce1);
          });
      });
    });

    it("нажатие иконки удаления ингредиента удаляет его из списка", () => {
      [...Array(2)].forEach((_) =>
        cy
          .get(burgerInnerIngredientsContainerSelector)
          .children()
          .first()
          .within(() => {
            cy.get('[class^="constructor-element__action"]').click();
          })
      );

      cy.get("@sauce1").then((sauce1) => {
        cy.get(burgerInnerIngredientsContainerSelector)
          .children()
          .first()
          .within(() => {
            cy.get(ingredientNameInBurgerSelector).should("have.text", sauce1);
          });
      });
    });
  });

  describe("отправка заказа", () => {
    beforeEach(fillConstructorWithIngredients);

    it("неавторизованный пользователь не может отправить заказ", () => {
      const confirmShown = cy.stub().as("confirmShown")
      cy.on('window:confirm', confirmShown);

      cy.contains("button", "Оформить заказ").click();

      cy.get("@confirmShown")
        .should("have.been.calledOnceWith", "Чтобы совершить заказ, нужно войти в систему. Перейти на страницу входа?")
    });

    it("неавторизованный пользователь может быть перенаправлен на страницу логина", () => {
      const confirmShown = cy.stub().as("confirmShown")
      confirmShown.onFirstCall().returns(true)
      cy.on('window:confirm', confirmShown);

      cy.contains("button", "Оформить заказ").click();

      cy.get("@confirmShown")
        .should("have.been.calledOnceWith", "Чтобы совершить заказ, нужно войти в систему. Перейти на страницу входа?")

        cy.location().should((loc) => {
        expect(loc.pathname).to.eq('/login')
        });
    });

    it("неавторизованный пользователь может быть НЕ перенаправлен на страницу логина", () => {
      const confirmShown = cy.stub().as("confirmShown")
      confirmShown.onFirstCall().returns(false)
      cy.on('window:confirm', confirmShown);

      cy.contains("button", "Оформить заказ").click();

      cy.get("@confirmShown")
        .should("have.been.calledOnceWith", "Чтобы совершить заказ, нужно войти в систему. Перейти на страницу входа?")

        cy.location().should((loc) => {
        expect(loc.pathname).to.eq('/')
        });
    });
  })
});

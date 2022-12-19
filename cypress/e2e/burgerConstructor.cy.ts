import { cy, it } from "local-cypress";

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
const constructorInnerIngredientsContainerExternalSelector =
  '[data-testid="burger-inner"]';
const constructorInnerIngredientsContainerInternalSelector =
  '[data-testid="burger-inner"] [class^="InnerIngredient_innerIngredientContainer"]';
const ingredientNameInListSelector = '[data-testid="ingredient-name"]';
const ingredientNameInConstructorSelector =
  '[class^="constructor-element__text"]';

const fillConstructorWithIngredients = () => {
  // перетаскиваем булку
  cy.get(bunSelector).as("buns");

  cy.get("@buns")
    .first()
    .within(() => {
      cy.get(ingredientNameInListSelector).invoke("text").as("firstBunName");
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

  cy.get(constructorInnerIngredientsContainerExternalSelector)
    .children()
    .should("have.length", 3);
};

const ACCESS_TOKEN = "ACCESS_TOKEN";
const REFRESH_TOKEN = "REFRESH_TOKEN";
const clearLoginInformation = () => {
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);
};

const testEmail = "deanitz@gmail.com";
const testPassword = "11111111";

describe("Тесты страницы конструктора", () => {
  beforeEach(() => {
    clearLoginInformation();
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

      cy.get(constructorInnerIngredientsContainerInternalSelector).should(
        "exist"
      );
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
        cy.get(constructorInnerIngredientsContainerInternalSelector).should(
          "not.exist"
        );
      }
    );

    it(
      "по клику на ингредиенте открывается модальное окно с деталями ингредиента, " +
        "по нажатию на кнопку закрытия оно закрывается",
      () => {
        cy.get(mainSelector)
          .first()
          .within(() => {
            cy.get(ingredientNameInListSelector)
              .invoke("text")
              .as("mainName");
          });

        cy.get(mainSelector).first().click();

        cy.contains("Детали ингредиента").should("exist");

        cy.get("@mainName").then((mainName) => {
          cy.get('[data-testid="modal-ingredient-details-name"]').should(
            "contain.text",
            mainName
          );
        });

        cy.get('[data-testid="modal-close-button"]').should("exist");

        cy.get('[data-testid="modal-close-button"]').children().first().click();

        cy.contains("Детали ингредиента").should("not.exist");
      }
    );
  });

  describe("конструктор с ингредиентами", () => {
    beforeEach(fillConstructorWithIngredients);

    it("перетаскивание новой булки заменяет текущую булку в конструкторе", () => {
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
        cy.get(constructorInnerIngredientsContainerExternalSelector)
          .children()
          .first()
          .within(() => {
            cy.get(ingredientNameInConstructorSelector).should(
              "have.text",
              main1
            );
          });
      });
    });

    it("перетаскивание ингредиентов в конструкторе изменяет их порядок, сверху вниз", () => {
      cy.get(constructorInnerIngredientsContainerExternalSelector)
        .children()
        .eq(0)
        .trigger("dragstart", {
          dataTransfer,
        });

      cy.get(constructorInnerIngredientsContainerExternalSelector)
        .children()
        .eq(1)
        .trigger("drop", {
          dataTransfer,
        });

      cy.get("@main0").then((main0) => {
        cy.get(constructorInnerIngredientsContainerExternalSelector)
          .children()
          .first()
          .within(() => {
            cy.get(ingredientNameInConstructorSelector).should(
              "have.text",
              main0
            );
          });
      });
    });

    it("перетаскивание ингредиентов в конструкторе изменяет их порядок, снизу вверх", () => {
      cy.get(constructorInnerIngredientsContainerExternalSelector)
        .children()
        .eq(2)
        .trigger("dragstart", {
          dataTransfer,
        });

      cy.get(constructorInnerIngredientsContainerExternalSelector)
        .children()
        .eq(0)
        .trigger("drop", {
          dataTransfer,
        });

      cy.get("@sauce1").then((sauce1) => {
        cy.get(constructorInnerIngredientsContainerExternalSelector)
          .children()
          .first()
          .within(() => {
            cy.get(ingredientNameInConstructorSelector).should(
              "have.text",
              sauce1
            );
          });
      });
    });

    it("нажатие иконки удаления ингредиента удаляет его из списка", () => {
      [...Array(2)].forEach((_) =>
        cy
          .get(constructorInnerIngredientsContainerExternalSelector)
          .children()
          .first()
          .within(() => {
            cy.get('[class^="constructor-element__action"]').click();
          })
      );

      cy.get("@sauce1").then((sauce1) => {
        cy.get(constructorInnerIngredientsContainerExternalSelector)
          .children()
          .first()
          .within(() => {
            cy.get(ingredientNameInConstructorSelector).should(
              "have.text",
              sauce1
            );
          });
      });
    });
  });

  describe("отправка заказа без авторизации", () => {
    beforeEach(fillConstructorWithIngredients);

    it("неавторизованный пользователь не может отправить заказ", () => {
      const confirmShown = cy.stub().as("confirmShown");
      cy.on("window:confirm", confirmShown);

      cy.contains("button", "Оформить заказ").click();

      cy.get("@confirmShown").should(
        "have.been.calledOnceWith",
        "Чтобы совершить заказ, нужно войти в систему. Перейти на страницу входа?"
      );
    });

    it("неавторизованный пользователь может выбрать перенаправление на страницу логина", () => {
      const confirmShown = cy.stub().as("confirmShown");
      confirmShown.onFirstCall().returns(true);
      cy.on("window:confirm", confirmShown);

      cy.contains("button", "Оформить заказ").click();

      cy.get("@confirmShown").should(
        "have.been.calledOnceWith",
        "Чтобы совершить заказ, нужно войти в систему. Перейти на страницу входа?"
      );

      cy.location().should((loc) => {
        expect(loc.pathname).to.eq("/login");
      });
    });

    it("неавторизованный пользователь может НЕ выбрать перенаправление на страницу логина", () => {
      const confirmShown = cy.stub().as("confirmShown");
      confirmShown.onFirstCall().returns(false);
      cy.on("window:confirm", confirmShown);

      cy.contains("button", "Оформить заказ").click();

      cy.get("@confirmShown").should(
        "have.been.calledOnceWith",
        "Чтобы совершить заказ, нужно войти в систему. Перейти на страницу входа?"
      );

      cy.location().should((loc) => {
        expect(loc.pathname).to.eq("/");
      });
    });
  });

  describe("отправка заказа c авторизацией", () => {
    beforeEach(fillConstructorWithIngredients);

    it("после авторизации пользователь перенаправляется на страницу профиля", () => {
      cy.contains("Личный кабинет").click();

      cy.location().should((loc) => {
        expect(loc.pathname).to.eq("/login");
      });

      cy.get('input[name="email"]').type(`${testEmail}`);
      cy.get('input[name="password"]').type(`${testPassword}`);

      cy.contains("Войти").click();

      cy.location().should((loc) => {
        expect(loc.pathname).to.eq("/profile");
      });
    });

    it("авторизованный пользователь может отправить заказ", () => {
      cy.contains("Личный кабинет").click();

      cy.location().should((loc) => {
        expect(loc.pathname).to.eq("/login");
      });

      cy.get('input[name="email"]').type(`${testEmail}`);
      cy.get('input[name="password"]').type(`${testPassword}`);

      cy.contains("Войти").click();

      cy.contains("Конструктор").click();

      cy.contains("Оформить заказ").as("buttonSendOrder");
      cy.get("@buttonSendOrder").should("be.enabled");
      cy.get("@buttonSendOrder").click();

      // после отправки заказа кнопка отправки недоступна до момента ответа от сервера
      cy.get("@buttonSendOrder").should("be.disabled");

      // после отправки заказа и ответа от сервера открывается модальное окно с деталями заказа
      cy.get('[data-testid="order-checkout-details"]', {
        timeout: 30000,
      }).should("exist");
      cy.get('[data-testid="modal-overlay"]')
        .should("exist")
        .click({ force: true });

      // после отправки заказа и ответа от сервера конструктор очищается
      cy.get('[data-testid="burger-top"]').should("not.exist");

      cy.get('[data-testid="burger-bottom"]').should("not.exist");

      cy.get(constructorInnerIngredientsContainerInternalSelector).should(
        "not.exist"
      );
    });
  });
});

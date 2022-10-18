import { useState } from "react";
import { useSelector } from "react-redux";
import IngredientSection from "../IngredientSection/IngredientSection";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./BurgerIngredients.module.css";

const BurgerIngredients = () => {
  const { ingredientsData } = useSelector((store) => ({
    ingredientsData: store.ingredients.ingredientsData,
  }));

  const [current, setCurrent] = useState("buns");

  const buns = ingredientsData.filter((item) => item.type === "bun");
  const sauces = ingredientsData.filter((item) => item.type === "sauce");
  const mains = ingredientsData.filter((item) => item.type === "main");

  const handleTabClick = (tabName) => {
    setCurrent(tabName);
  };

  return (
    <section className={styles.burgerIngredients}>
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
      <div className={styles.tabsContainer}>
        <Tab value="buns" active={current === "buns"} onClick={handleTabClick}>
          Булки
        </Tab>
        <Tab
          value="sauces"
          active={current === "sauces"}
          onClick={handleTabClick}
        >
          Соусы
        </Tab>
        <Tab
          value="mains"
          active={current === "mains"}
          onClick={handleTabClick}
        >
          Начинки
        </Tab>
      </div>
      <div className={`${styles.ingredientsListContainer} custom-scroll mt-10`}>
        <IngredientSection name="Булки" data={buns} />
        <IngredientSection name="Соусы" data={sauces} />
        <IngredientSection name="Начинки" data={mains} />
      </div>
    </section>
  );
};

export default BurgerIngredients;

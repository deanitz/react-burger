import { useState, useRef } from "react";
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
  const sections = 
  [
      {
        name: "Булки",
        tabName: "buns",
        item: buns,
        ref: useRef(null),
      },
      {
        name: "Соусы",
        tabName: "sauces",
        item: sauces,
        ref: useRef(null),
      },
      {
        name: "Начинки",
        tabName: "mains",
        item: mains,
        ref: useRef(null),
      },
    ]
  ;

  const handleTabClick = (tabName) => {
    setCurrent(tabName);
    const refToScroll = sections.find((section) => section.tabName === tabName)
      .ref.current;
    refToScroll.scrollIntoView({ behavior: "smooth" });
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
        {sections.map((section) => (
          <IngredientSection
            name={section.name}
            data={section.item}
            ref={section.ref}
            key={section.tabName}
          />
        ))}
      </div>
    </section>
  );
};

export default BurgerIngredients;

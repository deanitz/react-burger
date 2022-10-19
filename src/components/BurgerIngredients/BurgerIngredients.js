import { useState, useRef, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import IngredientSection from "../IngredientSection/IngredientSection";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import {
  TAB_BUNS,
  TAB_SAUCES,
  TAB_MAINS,
  CAPTION_BUNS,
  CAPTION_SAUCES,
  CAPTION_MAINS,
  TYPE_BUN,
  TYPE_SAUCE,
  TYPE_MAIN,
} from "./BurgerIngredients.utils";

import styles from "./BurgerIngredients.module.css";

const BurgerIngredients = () => {
  const { ingredientsData } = useSelector((store) => ({
    ingredientsData: store.ingredients.ingredientsData,
  }));

  const [current, setCurrent] = useState(TAB_BUNS);

  const viewportRef = useRef(null);
  const bunsRef = useRef(null);
  const saucesRef = useRef(null);
  const mainsRef = useRef(null);

  const sections = useMemo(
    () => [
      {
        name: CAPTION_BUNS,
        tabName: TAB_BUNS,
        item: ingredientsData.filter((item) => item.type === TYPE_BUN),
        ref: bunsRef,
      },
      {
        name: CAPTION_SAUCES,
        tabName: TAB_SAUCES,
        item: ingredientsData.filter((item) => item.type === TYPE_SAUCE),
        ref: saucesRef,
      },
      {
        name: CAPTION_MAINS,
        tabName: TAB_MAINS,
        item: ingredientsData.filter((item) => item.type === TYPE_MAIN),
        ref: mainsRef,
      },
    ],
    [ingredientsData]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const intersectingEntry = entries.find((entry) => entry.isIntersecting);

        if (!intersectingEntry) {
          return;
        }

        const intersectedSection = sections.find(
          (section) => section.ref.current === intersectingEntry.target
        );
        setCurrent(intersectedSection.tabName);
      },
      {
        root: viewportRef.current,
        rootMargin: "0px 0px -80% 0px",
        threshold: 0.1,
      }
    );
    [...sections].map((section) => observer.observe(section.ref.current));

    return () => {
      [...sections].map((section) => observer.unobserve(section.ref.current));
    };
  }, [sections, setCurrent]);

  const handleTabClick = (tabName) => {
    setCurrent(tabName);
    const refToScroll = sections.find((section) => section.tabName === tabName)
      .ref?.current;
    refToScroll?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className={styles.burgerIngredients}>
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
      <div className={styles.tabsContainer}>
        {sections.map((section) => (
          <Tab
            value={section.tabName}
            active={current === section.tabName}
            onClick={handleTabClick}
            key={section.tabName}
          >
            {section.name}
          </Tab>
        ))}
      </div>
      <div
        className={`${styles.ingredientsListContainer} custom-scroll mt-10`}
        ref={viewportRef}
      >
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

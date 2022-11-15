import { useRef, useEffect, useMemo, useCallback } from "react";
import IngredientSection from "../IngredientSection/IngredientSection";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import {
  TAB_BUNS,
  TAB_SAUCES,
  TAB_MAINS,
  CAPTION_BUNS,
  CAPTION_SAUCES,
  CAPTION_MAINS,
} from "./BurgerIngredients.utils";
import { TYPE_BUN, TYPE_SAUCE, TYPE_MAIN } from "../../utils/dataUtils";
import { setSelectedTab } from "../../services/slices/selectedIngredientsTabSlice";
import { getIntersectionObserverSettings } from "../../utils/intersectionObserverUtils";
import { useAppDispatch, useAppSelector } from "../../utils/store";
import styles from "./BurgerIngredients.module.css";

const BurgerIngredients = () => {
  const dispatch = useAppDispatch();

  const { ingredientsData, selectedTab } = useAppSelector((store) => ({
    ingredientsData: store.ingredients.ingredientsData,
    selectedTab: store.selectedIngredientsTab.value,
  }));

  const viewportRef = useRef<HTMLDivElement>(null);
  const bunsRef = useRef<HTMLHeadingElement>(null);
  const saucesRef = useRef<HTMLHeadingElement>(null);
  const mainsRef = useRef<HTMLHeadingElement>(null);

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
    dispatch(setSelectedTab(TAB_BUNS));
  }, [dispatch]);

  useEffect(() => {
    const intersectionCallback = (entries: IntersectionObserverEntry[]) => {
      const intersectingEntry = entries.find((entry) => entry.isIntersecting);

      if (!intersectingEntry) {
        return;
      }

      const intersectedSection = sections.find(
        (section) => section.ref.current === intersectingEntry.target
      );
      dispatch(setSelectedTab(intersectedSection?.tabName ?? TAB_BUNS));
    };
    const observer = new IntersectionObserver(
      intersectionCallback,
      getIntersectionObserverSettings(viewportRef.current!)
    );
    const currentRefs = sections.map((section) => section.ref.current);
    currentRefs.map((curRef) => observer.observe(curRef!));

    return () => {
      currentRefs.map((curRef) => observer.unobserve(curRef!));
    };
  }, [sections, dispatch]);

  const handleTabClick = useCallback(
    (tabName: string) => {
      dispatch(setSelectedTab(tabName));
      const refToScroll: HTMLHeadingElement = sections.find(
        (section) => section.tabName === tabName
      )?.ref?.current!;
      refToScroll?.scrollIntoView({ behavior: "smooth" });
    },
    [dispatch, sections]
  );

  return (
    <>
      <section className={styles.burgerIngredients}>
        <h1 className="text text_type_main-large mt-10 mb-5">
          Соберите бургер
        </h1>
        <div className={styles.tabsContainer}>
          {sections.map((section) => (
            <Tab
              value={section.tabName}
              active={selectedTab === section.tabName}
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
    </>
  );
};

export default BurgerIngredients;

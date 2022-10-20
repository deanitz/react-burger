import { useRef, useEffect, useMemo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
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
import useModal from "../../hooks/useModal";
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import {
  setDisplayedIngredient,
  resetDisplayedIngredient,
} from "../../services/slices/displayedIngredientSlice";
import { setSelectedTab } from "../../services/slices/selectedIngredientsTabSlice";

import styles from "./BurgerIngredients.module.css";

const BurgerIngredients = () => {
  const dispatch = useDispatch();

  const { ingredientsData, displayedIngredient, selectedTab } = useSelector(
    (store) => ({
      ingredientsData: store.ingredients.ingredientsData,
      displayedIngredient: store.displayedIngredient.value,
      selectedTab: store.selectedIngredientsTab.value,
    })
  );

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
    dispatch(setSelectedTab(TAB_BUNS));
  }, [dispatch]);

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
        dispatch(setSelectedTab(intersectedSection.tabName));
      },
      {
        root: viewportRef.current,
        rootMargin: "0px 0px -80% 0px",
        threshold: 0.1,
      }
    );
    const currentRefs = sections.map((section) => section.ref.current);
    currentRefs.map((curRef) => observer.observe(curRef));

    return () => {
      currentRefs.map((curRef) => observer.unobserve(curRef));
    };
  }, [sections, dispatch]);

  const handleTabClick = useCallback(
    (tabName) => {
      dispatch(setSelectedTab(tabName));
      const refToScroll = sections.find(
        (section) => section.tabName === tabName
      ).ref?.current;
      refToScroll?.scrollIntoView({ behavior: "smooth" });
    },
    [dispatch, sections]
  );

  const {
    isDisplayed: isModal,
    show: showModal,
    close: closeModal,
  } = useModal();

  useEffect(() => {
    if (displayedIngredient && !isModal) {
      showModal();
    }
  }, [displayedIngredient, isModal, showModal]);

  const handleCloseModal = () => {
    dispatch(resetDisplayedIngredient());
    closeModal();
  };

  const handleIngredientItemClick = useCallback(
    (item) => {
      dispatch(setDisplayedIngredient(item));
    },
    [dispatch]
  );

  const modal = isModal && displayedIngredient && (
    <Modal
      header={<h1 className="text text_type_main-large">Детали ингредиента</h1>}
      onClose={handleCloseModal}
    >
      <IngredientDetails item={displayedIngredient} />
    </Modal>
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
              handleItemClick={handleIngredientItemClick}
            />
          ))}
        </div>
      </section>
      {modal}
    </>
  );
};

export default BurgerIngredients;

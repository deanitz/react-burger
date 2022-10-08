import PropTypes from "prop-types";
import dataShape from "../../utils/dataShape";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import useModal from "../../hooks/useModal";
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";

import styles from "./IngredientItem.module.css";

const IngredientItem = ({ item, count }) => {
  const {
    isDisplayed: isModal,
    show: showModal,
    close: closeModal,
  } = useModal();

  const modal = (
    <Modal
      header={<h1 className="text text_type_main-large">Детали ингредиента</h1>}
      onClose={closeModal}
    >
      <IngredientDetails item={item} />
    </Modal>
  );

  return (
    <>
      <div className={styles.ingredientItem} onClick={showModal}>
        <img
          className="ml-4 mr-4"
          src={item.image}
          alt="Изображение ингредиента"
        />
        <p
          className={`text text_type_digits-default mt-1 mb-1 ${styles.price}`}
        >
          <span className="mr-1">{item.price}</span>
          <CurrencyIcon type="primary" />
        </p>
        <p className={`text text_type_main-default ${styles.name}`}>
          {item.name}
        </p>
        {Boolean(count) && <Counter count={count} size="default" />}
      </div>
      {isModal && modal}
    </>
  );
};

IngredientItem.propTypes = {
  item: dataShape.isRequired,
  count: PropTypes.number.isRequired,
};

export default IngredientItem;

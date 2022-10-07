import PropTypes from "prop-types";
import dataShape from "../../utils/dataShape";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./IngredientItem.module.css";
import useModal from "../../hooks/useModal";
import Modal from "../Modal/Modal";

const IngredientItem = ({ item, count }) => {
  const {
    isDisplayed: isModal,
    show: showModal,
    close: closeModal,
  } = useModal();

  const IngredientPropertyItem = ({name, value}) => {
    return (
      <div>
        <p className="text text_type_main-default">{name}</p>
        <p className="text text_type_digits-default">{value}</p>
      </div>
    );
  }

  const modal = (
    <Modal
      header={
        <h1 className="text text_type_main-large">Детали ингредиента</h1>
      }
      onClose={closeModal}
    >
      <div className={styles.ingredientModalContentContainer}>
      <img className="ml-4 mr-4" src={item.image_large} alt="Изображение ингредиента" />
        <p className="text text_type_main-medium mt-4 mb-8">
          {item.name}
        </p>
        <div className={styles.ingredientModalPropertiesContainer}>
          <IngredientPropertyItem name="Калории, ккал" value={item.calories} />
          <IngredientPropertyItem name="Белки, г" value={item.proteins} />
          <IngredientPropertyItem name="Жиры, г" value={item.fat} />
          <IngredientPropertyItem name="Углеводы, г" value={item.carbohydrates} />
        </div>
      </div>
    </Modal>
  );

  return (
    <>
      <div className={styles.ingredientItem} onClick={showModal}>
        <img className="ml-4 mr-4" src={item.image} alt="Изображение ингредиента" />
        <p
          className={`text text_type_digits-default mt-1 mb-1 ${styles.price}`}
        >
          <span className="mr-1">{item.price}</span>
          <CurrencyIcon type="primary" />
        </p>
        <p className={`text text_type_main-default ${styles.name}`}>{item.name}</p>
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

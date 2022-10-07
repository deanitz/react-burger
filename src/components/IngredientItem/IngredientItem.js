import PropTypes from "prop-types";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./IngredientItem.module.css";
import useModal from "../../hooks/useModal";
import Modal from "../Modal/Modal";

const IngredientItem = ({ image, price, name, count }) => {
  const {
    isDisplayed: isModal,
    show: showModal,
    close: closeModal,
  } = useModal();

  const modal = (
    <Modal
      header={
        <h1 className="text text_type_main-medium">Детали ингредиента</h1>
      }
      onClose={closeModal}
    >
      Брекекекс
    </Modal>
  );

  return (
    <>
      <div className={styles.ingredientItem} onClick={showModal}>
        <img className="ml-4 mr-4" src={image} alt="Изображение ингредиента" />
        <p
          className={`text text_type_digits-default mt-1 mb-1 ${styles.price}`}
        >
          <span className="mr-1">{price}</span>
          <CurrencyIcon type="primary" />
        </p>
        <p className={`text text_type_main-default ${styles.name}`}>{name}</p>
        {Boolean(count) && <Counter count={count} size="default" />}
      </div>
      {isModal && modal}
    </>
  );
};

IngredientItem.propTypes = {
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
};

export default IngredientItem;

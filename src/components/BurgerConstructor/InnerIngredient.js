import PropTypes from "prop-types";
import dataShape from "../../utils/dataShape";
import { useDrag, useDrop } from "react-dnd";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { TYPE_CONSTRUCTOR_INNER_INGREDIENT } from "../../utils/dataUtils";

import styles from "./InnerIngredient.module.css";

const InnerIngredient = ({ data, handleRemove, handleReorder }) => {
  const [{ isDrag }, dragRef] = useDrag({
    type: TYPE_CONSTRUCTOR_INNER_INGREDIENT,
    item: { draggedData: data },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop(() => ({
    accept: TYPE_CONSTRUCTOR_INNER_INGREDIENT,
    hover({ draggedData }) {
      handleReorder(draggedData, data);
    },
  }));
  return (
    <div
      className={`${styles.innerIngredientContainer} ${
        isDrag ? styles.dragging : ""
      }`}
      ref={(node) => dragRef(dropRef(node))}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        text={data.name}
        price={data.price}
        thumbnail={data.image}
        handleClose={() => handleRemove(data)}
      />
    </div>
  );
};

InnerIngredient.propTypes = {
  data: dataShape.isRequired,
  handleRemove: PropTypes.func.isRequired,
  handleReorder: PropTypes.func.isRequired,
};

export default InnerIngredient;

import {
  Ingredient,
  TYPE_CONSTRUCTOR_INNER_INGREDIENT,
} from "../../types/dataTypes";
import { useDrag, useDrop } from "react-dnd";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./InnerIngredient.module.css";

export type InnerIngredientProps = {
  data: Ingredient;
  handleRemove: (data: Ingredient) => void;
  handleReorder: (draggedData: Ingredient, data: Ingredient) => void;
};

const InnerIngredient = ({
  data,
  handleRemove,
  handleReorder,
}: InnerIngredientProps) => {
  const [{ isDrag }, dragRef] = useDrag({
    type: TYPE_CONSTRUCTOR_INNER_INGREDIENT,
    item: { draggedData: data },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop(() => ({
    accept: TYPE_CONSTRUCTOR_INNER_INGREDIENT,
    hover({ draggedData }: { draggedData: Ingredient }) {
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

export default InnerIngredient;

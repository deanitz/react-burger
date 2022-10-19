import { useDrag } from "react-dnd";
import {
    ConstructorElement,
    DragIcon,
  } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./InnerIngredient.module.css";

const InnerIngredient = ({ data, handleRemove }) => {
  const [{ isDrag }, dragRef] = useDrag({
    type: "constructorInnerIngredient",
    item: { data },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });
  return (
    <div
      className={`${styles.innerIngredientContainer} ${
        isDrag ? styles.dragging : ""
      }`}
      ref={dragRef}
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

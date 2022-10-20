import { useDrag, useDrop } from "react-dnd";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./InnerIngredient.module.css";

const InnerIngredient = ({ data, handleRemove, handleReorder }) => {
  const [{ isDrag }, dragRef] = useDrag({
    type: "constructorInnerIngredient",
    item: { draggedData: data },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop(() => ({
    accept: "constructorInnerIngredient",
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

export default InnerIngredient;

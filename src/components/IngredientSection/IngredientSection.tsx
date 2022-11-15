import { forwardRef } from "react";
import { Ingredient } from "../../utils/dataShape";
import IngredientItem from "../IngredientItem/IngredientItem";
import { useAppSelector } from "../../utils/store";
import styles from "./IngredientSection.module.css";

export type IngredientSectionProps = {
  name: string;
  data: Ingredient[];
};

const IngredientSection = forwardRef(
  (
    { name, data }: IngredientSectionProps,
    ref: React.Ref<HTMLHeadingElement>
  ) => {
    const selectedIngredients = useAppSelector(
      ({ selectedIngredients }) => selectedIngredients
    );

    const getCount = (item: Ingredient) => {
      return [selectedIngredients.bun, ...selectedIngredients.inner].reduce(
        (acc, curr) => (curr ? (curr._id === item._id ? acc + 1 : acc) : acc),
        0
      );
    };

    return (
      <section>
        <h2 className="text text_type_main-medium mb-6" ref={ref}>
          {name}
        </h2>
        <div className={styles.ingredientItemsContainer}>
          {data.map((item) => (
            <IngredientItem item={item} count={getCount(item)} key={item._id} />
          ))}
        </div>
      </section>
    );
  }
);

export default IngredientSection;

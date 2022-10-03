import IngredientItem from '../IngredientItem/IngredientItem';

import styles from './IngredientSection.module.css';

const IngredientSection = ({name, data}) => {
    const getStubCount = (index) => {
        return (index === 0 || index === 3) ? 1 : 0;
    }

    return (
        <section className={`${styles.ingredientSection}`}>
            <h2 className="text text_type_main-medium mb-6">{name}</h2>
            <div className={styles.ingredientItemsContainer}>
                {data.map((item, index) => (
                    <IngredientItem 
                        image={item.image}
                        price={item.price}
                        name={item.name}
                        count={getStubCount(index)}
                        key={item._id} />
                ))}
            </div>
        </section>
    );
}

export default IngredientSection;

import PropTypes from 'prop-types';
import dataShape from "../../utils/dataShape";
import IngredientItem from '../IngredientItem/IngredientItem';

import styles from './IngredientSection.module.css';

const IngredientSection = ({name, data, selectedIngredientsIds}) => {
    const getCount = (item) => {
        return selectedIngredientsIds.reduce((acc, curr) => curr === item._id ? acc + 1 : acc, 0);
    }

    return (
        <section className={`${styles.ingredientSection}`}>
            <h2 className="text text_type_main-medium mb-6">{name}</h2>
            <div className={styles.ingredientItemsContainer}>
                {data.map((item) => (
                    <IngredientItem 
                        image={item.image}
                        price={item.price}
                        name={item.name}
                        count={getCount(item)}
                        key={item._id} />
                ))}
            </div>
        </section>
    );
}

IngredientSection.propTypes = {
    name: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(dataShape).isRequired,
    selectedIngredientsIds: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default IngredientSection;

import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './IngredientItem.module.css';

const IngredientItem = ({image, price, name, count}) => {
    return (
        <div className={styles.ingredientItem}>
            <img className="ml-4 mr-4 mb-1" src={image} alt="Изображение ингредиента" />
            <p className="text text_type_digits-default">
                <span>{price}</span>
                <CurrencyIcon type="primary" />
            </p>
            <p className="text text_type_main-default">
                {name}
            </p>
            {count && (<Counter count={count} size="default" />)}
        </div>
    );
}

export default IngredientItem;
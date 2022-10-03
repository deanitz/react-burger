import {useState} from "react";
import IngredientSection from '../IngredientSection/IngredientSection'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './BurgerIngredients.module.css';

import data from '../../utils/data';

const BurgerIngredients = () => {
    const [current, setCurrent] = useState("buns");

    const buns = data.filter(item => item.type === 'bun');
    const sauces = data.filter(item => item.type === 'sauce');
    const mains = data.filter(item => item.type === 'main');

    const setCurrentTab = (tab) => {
        setCurrent(tab);
        tab.scrollIntoView({
            behavior: 'smooth',
        });
    }

    return (
        <section className={styles.burgerIngredients}>
            <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
            <div className={styles.tabsContainer}>
                <Tab value="buns" active={current === 'buns'} onClick={setCurrentTab}>
                    Булки
                </Tab>
                <Tab value="sauces" active={current === 'sauces'} onClick={setCurrentTab}>
                    Соусы
                </Tab>
                <Tab value="mains" active={current === 'mains'} onClick={setCurrentTab}>
                    Начинки
                </Tab>
            </div>
            <div className={`${styles.ingredientsListContainer} custom-scroll mt-10`}>
                <IngredientSection name="Булки" data={buns} />
                <IngredientSection name="Соусы" data={sauces} />
                <IngredientSection name="Начинки" data={mains} />
            </div>
        </section>
    );
}

export default BurgerIngredients;
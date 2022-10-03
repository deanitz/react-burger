import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';

import styles from './AppMain.module.css';

const AppMain = () => (
    <main className={styles.appMain}>
        <BurgerIngredients />
        <BurgerConstructor />
    </main>
);

export default AppMain;
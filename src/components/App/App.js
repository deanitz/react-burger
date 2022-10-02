import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';

const App = () => (
    <>
        <AppHeader />
        <main>
            <BurgerIngredients />
            <BurgerConstructor />
        </main>
    </>
);

export default App;
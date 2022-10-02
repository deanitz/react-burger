import NavMenuContainer from '../NavMenuContainer/NavMenuContainer';
import NavMenuItem from '../NavMenuItem/NavMenuItem';
import NavLogo from '../NavLogo/NavLogo';
import NavLogin from '../NavLogin/NavLogin';

import { BurgerIcon, ListIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import styles from './AppHeader.module.css'

const AppHeader = () => {
    return (
        <header>
            <nav className={styles.navContainer}>
                <NavMenuContainer>
                    <NavMenuItem icon={<BurgerIcon type="primary" />}  text="Конструктор" />
                    <NavMenuItem icon={<ListIcon type="primary" />}  text="Лента заказов" />
                </NavMenuContainer>
                <NavLogo />
                <NavLogin />
            </nav>
        </header>
    );
}

export default AppHeader;
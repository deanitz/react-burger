import NavLogo from '../NavLogo/NavLogo';
import NavLeftSide from '../NavLeftSide/NavLeftSide';
import NavRightSide from '../NavRightSide/NavRightSide';

import styles from './AppHeader.module.css';

const AppHeader = () => {
    return (
        <header className={styles.navHeader}>
            <nav className={styles.navContainer}>
                <NavLeftSide />
                <NavLogo />
                <NavRightSide />
            </nav>
        </header>
    );
}

export default AppHeader;
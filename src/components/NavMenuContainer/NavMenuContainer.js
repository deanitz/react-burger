
import styles from './NavMenuContainer.module.css'

const NavMenuContainer = ({children}) => (
    <ul className={styles.menuContainer}>{children}</ul>
);

export default NavMenuContainer;

import styles from './NavMenuContainer.module.css';

const NavMenuContainer = ({children}) => (
    <ul className={`${styles.menuContainer} mt-4 mb-4`}>{children}</ul>
);

export default NavMenuContainer;
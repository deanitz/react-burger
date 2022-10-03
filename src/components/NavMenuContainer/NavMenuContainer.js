
import styles from './NavMenuContainer.module.css';

const NavMenuContainer = ({children}) => (
    <nav className={`${styles.menuContainer} mt-4 mb-4`}>{children}</nav>
);

export default NavMenuContainer;
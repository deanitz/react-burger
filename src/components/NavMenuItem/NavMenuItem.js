import styles from './NavMenuItem.module.css'

const NavMenuItem = ({icon, text}) => (
    <li className={styles.menuItem}>
        {icon}
        <p className="text text_type_main-default">{text}</p>
    </li>
);

export default NavMenuItem;
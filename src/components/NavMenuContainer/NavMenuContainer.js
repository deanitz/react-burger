import styles from "./NavMenuContainer.module.css";

const NavMenuContainer = ({ children, right }) => (
  <ul
    className={`${styles.menuContainer} mt-4 mb-4 ${
      right ? styles.right : styles.left
    }`}
  >
    {children}
  </ul>
);

export default NavMenuContainer;

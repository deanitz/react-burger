import PropTypes from "prop-types";
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

NavMenuContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  right: PropTypes.bool,
};

export default NavMenuContainer;

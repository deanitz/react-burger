import PropTypes from "prop-types";

import styles from "./NavMenuItem.module.css";

const NavMenuItem = ({ icon, text, active }) => (
  <li className="p-5">
    <a href="/#" className={styles.link}>
      {icon}
      <span
        className={`text text_type_main-default ml-2 ${
          active ? styles.active : ""
        }`}
      >
        {text}
      </span>
    </a>
  </li>
);

NavMenuItem.propTypes = {
  icon: PropTypes.element.isRequired,
  text: PropTypes.string.isRequired,
  active: PropTypes.bool,
};

export default NavMenuItem;

import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

import styles from "./NavMenuItem.module.css";

const NavMenuItem = ({ icon, text, to, end }) => (
  <li className="p-5">
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `${styles.link} ${isActive ? styles.active : styles.normal}`
      }
    >
      {icon}
      <span className={`text text_type_main-default ml-2`}>{text}</span>
    </NavLink>
  </li>
);

NavMenuItem.propTypes = {
  icon: PropTypes.element.isRequired,
  text: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  end: PropTypes.bool,
};

export default NavMenuItem;

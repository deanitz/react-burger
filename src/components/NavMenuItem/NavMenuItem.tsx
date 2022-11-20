import { ReactElement } from "react";
import { NavLink } from "react-router-dom";

import styles from "./NavMenuItem.module.css";

export type NavMenuItemProps = {
  icon: ReactElement;
  text: string;
  to: string;
  end?: boolean;
};

const NavMenuItem = ({ icon, text, to, end }: NavMenuItemProps) => (
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

export default NavMenuItem;

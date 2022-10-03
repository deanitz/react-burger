import styles from "./NavMenuItem.module.css";

const NavMenuItem = ({ icon, text, active }) => (
  <li className={`${styles.menuItem} p-5`}>
    {icon}
    <p
      className={`text text_type_main-default ml-2 ${
        active ? styles.active : ""
      }`}
    >
      {text}
    </p>
  </li>
);

export default NavMenuItem;

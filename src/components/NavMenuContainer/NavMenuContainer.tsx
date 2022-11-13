import { FC, ReactNode } from "react";

import styles from "./NavMenuContainer.module.css";

const NavMenuContainer: FC<{ right?: boolean; children: ReactNode }> = ({
  children,
  right,
}) => (
  <ul
    className={`${styles.menuContainer} mt-4 mb-4 ${
      right ? styles.right : styles.left
    }`}
  >
    {children}
  </ul>
);

export default NavMenuContainer;

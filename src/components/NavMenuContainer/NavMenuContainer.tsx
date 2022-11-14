import { FC, ReactNode } from "react";

import styles from "./NavMenuContainer.module.css";

export type NavMenuContainerProps = { right?: boolean; children: ReactNode };

const NavMenuContainer: FC<NavMenuContainerProps> = ({ children, right }) => (
  <ul
    className={`${styles.menuContainer} mt-4 mb-4 ${
      right ? styles.right : styles.left
    }`}
  >
    {children}
  </ul>
);

export default NavMenuContainer;

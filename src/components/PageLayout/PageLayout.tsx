import { FC, ReactNode } from "react";

import styles from "./PageLayout.module.css";

const PageLayout: FC<{ children: ReactNode }> = ({ children }) => (
  <section className={styles.page}>{children}</section>
);

export default PageLayout;

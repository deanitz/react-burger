import styles from "./PageLayout.module.css";

const PageLayout = ({ children }) => (
  <section className={styles.page}>{children}</section>
);

export default PageLayout;

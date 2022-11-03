import PropTypes from "prop-types";

import styles from "./PageLayout.module.css";

const PageLayout = ({ children }) => (
  <section className={styles.page}>{children}</section>
);

PageLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default PageLayout;

import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ModalHeader.module.css";

const ModalHeader = ({ children, onClose }) => {
  return (
    <section className={styles.headerContainer}>
      <div className={styles.childrenContainer}>{children}</div>
      <div className={styles.closeButtonContainer}>
        <CloseIcon type="primary" onClick={onClose} />
      </div>
    </section>
  );
};

export default ModalHeader;
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, ReactNode } from "react";
import styles from "./ModalHeader.module.css";

const ModalHeader: FC<{
  children: ReactNode;
  onClose: () => void;
}> = ({ children, onClose }) => {
  return (
    <section className={styles.headerContainer}>
      <div className={styles.childrenContainer}>{children}</div>
      <div className={`${styles.closeButtonContainer} ml-9`}>
        <CloseIcon type="primary" onClick={onClose} />
      </div>
    </section>
  );
};

export default ModalHeader;

import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, ReactNode } from "react";
import styles from "./ModalHeader.module.css";

export type ModalHeaderProps = {
  children: ReactNode;
  onClose: () => void;
};

const ModalHeader: FC<ModalHeaderProps> = ({ children, onClose }) => {
  return (
    <section className={styles.headerContainer}>
      <div className={styles.childrenContainer}>{children}</div>
      <div
        className={`${styles.closeButtonContainer} ml-9`}
        data-testid="modal-close-button"
      >
        <CloseIcon type="primary" onClick={onClose} />
      </div>
    </section>
  );
};

export default ModalHeader;

import { useEffect } from "react";
import ReactDOM from "react-dom";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import ModalHeader from "../ModalHeader/ModalHeader";
import { FC, ReactNode } from "react";
import styles from "./Modal.module.css";

const modalRoot = document.getElementById("react-modals") as HTMLElement;

export type ModalProps = {
  children: ReactNode;
  header: ReactNode;
  onClose: () => void;
};

const Modal: FC<ModalProps> = ({ children, header, onClose }) => {
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") {
        return;
      }

      onClose();
    };

    window.addEventListener("keydown", handleEscapeKey);

    return () => {
      window.removeEventListener("keydown", handleEscapeKey);
    };
  }, [onClose]);

  return ReactDOM.createPortal(
    <>
      <ModalOverlay onClose={onClose} />
      <div
        className={`${styles.modal} ${styles.modalAdded} pl-10 pt-10 pr-10 pb-15`}
      >
        <ModalHeader onClose={onClose}>{header}</ModalHeader>
        {children}
      </div>
    </>,
    modalRoot
  );
};

export default Modal;

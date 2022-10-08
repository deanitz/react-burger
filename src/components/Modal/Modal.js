import { useEffect } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import ModalHeader from "../ModalHeader/ModalHeader";

import styles from "./Modal.module.css";

const modalRoot = document.getElementById("react-modals");

const Modal = ({ children, header, onClose }) => {
  useEffect(() => {
    const handleEscapeKey = (event) => {
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

Modal.propTypes = {
  children: PropTypes.element,
  header: PropTypes.element,
  onClose: PropTypes.func.isRequired,
};

export default Modal;

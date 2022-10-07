import ReactDOM from "react-dom";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import ModalHeader from "../ModalHeader/ModalHeader";

import styles from "./Modal.module.css";

const modalRoot = document.getElementById("react-modals");

const Modal = ({ children, header, onClose }) => {
  return ReactDOM.createPortal(
    <>
      <ModalOverlay onClose={onClose} />
      <div className={`${styles.modal} pl-10 pt-10 pr-10 pb-15`}>
        <ModalHeader onClose={onClose}>{header}</ModalHeader>
        {children}
      </div>
    </>,
    modalRoot
  );
};

export default Modal;

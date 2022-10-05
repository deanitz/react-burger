import styles from "./ModalOverlay.module.css";

const ModalOverlay = ({ onClose }) => {
  return <div className={styles.modalOverlay} onClick={onClose} />;
};

export default ModalOverlay;

import styles from "./ModalOverlay.module.css";

const ModalOverlay = ({
  onClose,
}: {
  onClose: React.MouseEventHandler<HTMLDivElement>;
}) => {
  return <div className={styles.modalOverlay} onClick={onClose} />;
};

export default ModalOverlay;

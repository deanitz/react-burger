import styles from "./ModalOverlay.module.css";

export type ModalOverlayProps = {
  onClose: React.MouseEventHandler<HTMLDivElement>;
};

const ModalOverlay = ({ onClose }: ModalOverlayProps) => {
  return <div className={styles.modalOverlay} onClick={onClose} />;
};

export default ModalOverlay;

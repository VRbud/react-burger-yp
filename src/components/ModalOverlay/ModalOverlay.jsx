import styles from "./ModalOverlay.module.css";

function ModalOverlay({ onClose }) {
  return <div onClick={onClose} className={styles.modal_overlay}></div>;
}

export default ModalOverlay;

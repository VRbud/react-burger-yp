import styles from "./ModalOverlay.module.css";
import React from "react";
import { modalTypes } from "../../Types/types";

ModalOverlay.propTypes = {
  modalTypes,
};

function ModalOverlay({ onClose, children }) {
  return (
    <div onClick={onClose} className={styles.modal_overlay}>
      {children}
    </div>
  );
}

export default ModalOverlay;

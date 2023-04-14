import { useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { modalTypes } from "../../Types/types";
import ModalOverlay from "../ModalOverlay/ModalOverlay";

Modal.propTypes = {
  modalTypes,
};
const ESCAPE_KEY_CODE = 27;

function Modal({ onClose, children, extraClass }) {
  function clickHandler(e) {
    e.stopPropagation();
  }

  useEffect(() => {
    const close = (e) => {
      if (e.keyCode === ESCAPE_KEY_CODE) {
        onClose();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [onClose]);

  return createPortal(
    <>
      <div
        className={`${styles.modal} ${extraClass} pt-10 pr-10 pl-10 pb-15`}
        onClick={clickHandler}
      >
        <button
          className={`${styles.close_btn}  btn_reset`}
          onClick={onClose}
        >
          <CloseIcon type="primay" />
        </button>
        {children}
      </div>
      <ModalOverlay onClose={onClose} />
    </>,
    document.getElementById("modals")
  );
}

export default Modal;

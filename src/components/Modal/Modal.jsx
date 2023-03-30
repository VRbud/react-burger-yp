import { useEffect } from "react";
import styles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import { modalTypes } from "../../Types/types";

import React from "react";

Modal.propTypes = {
  modalTypes,
};

function Modal({ onClose, children }) {
  function clickHandler(e) {
    e.stopPropagation();
  }
  useEffect(() => {
    const close = (e) => {
      if (e.keyCode === 27) {
        onClose();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  return (
    <div
      className={`${styles.modal} pt-10 pr-10 pl-10 pb-15`}
      onClick={clickHandler}
    >
      <button className={`${styles.close_btn}  btn_reset`} onClick={onClose}>
        <CloseIcon type="primay" />
      </button>
      {children}
    </div>
  );
}

export default Modal;

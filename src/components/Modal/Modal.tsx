import { useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import { useNavigate, useParams } from "react-router-dom";
import { IModal } from "../../Types/ModalTypes/types";
import { useDispatch } from "react-redux";
import { DEL_MODAL_ING } from "../../services/actions/modal";

interface KeyboardEvent {
  keyCode: number;
}

const ESCAPE_KEY_CODE = 27;

function Modal({ onClose, children, extraClass }: IModal) {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const wrapOnClose = () => {
    onClose?.();
  };

  function clickHandler(e: React.MouseEvent<HTMLElement>) {
    e.stopPropagation();
    id && navigate(-1);
    dispatch({
      type: DEL_MODAL_ING,
    });
  }

  const portalDiv = document.getElementById("modals")!;

  useEffect(() => {
    const close = (ev: KeyboardEvent) => {
      if (ev.keyCode === ESCAPE_KEY_CODE) {
        id && navigate(-1);
        onClose?.();
        dispatch({
          type: DEL_MODAL_ING,
        });
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [dispatch, navigate, id, onClose]);

  return createPortal(
    <>
      <div
        className={`${styles.modal} ${extraClass} pt-10 pr-10 pl-10 pb-15`}
        onClick={clickHandler}
      >
        <button
          className={`${styles.close_btn}  btn_reset`}
          onClick={() => wrapOnClose()}
        >
          <CloseIcon type="primary" />
        </button>
        {children}
      </div>
      <ModalOverlay onClose={() => wrapOnClose()} />
    </>,
    portalDiv
  );
}

export default Modal;

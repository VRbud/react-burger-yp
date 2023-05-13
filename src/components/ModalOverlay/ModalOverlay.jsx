import { useNavigate, useParams } from "react-router-dom";
import styles from "./ModalOverlay.module.css";

function ModalOverlay({ onClose }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const handleClick = () => {
    if (id) navigate(-1);
    onClose();
  };
  return <div onClick={handleClick} className={styles.modal_overlay}></div>;
}

export default ModalOverlay;

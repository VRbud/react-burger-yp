import { useNavigate, useParams } from "react-router-dom";
import styles from "./ModalOverlay.module.css";

const ModalOverlay = ({ onClose }: { onClose: () => void }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleClick = () => {
    onClose?.();
    if (id) {
      navigate(-1);
    }
  };
  return <div onClick={handleClick} className={styles.modal_overlay}></div>;
};

export default ModalOverlay;

import styles from "./Placeholder.module.css";
import { TPlaceHolder } from "../../../Types/BurgerConstructorTypes/PlaceHolderTypes/types";

function Placeholder({ type }: TPlaceHolder) {
  return (
    <div className={`${styles.placeholder} text text_type_main-medium`}>
      Перетащите {type === "center" ? "ингредиент" : "булку"} сюда
    </div>
  );
}

export default Placeholder;

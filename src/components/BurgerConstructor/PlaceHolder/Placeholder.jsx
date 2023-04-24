import React from "react";
import styles from "./Placeholder.module.css";

function Placeholder({ type }) {
  return (
    <div className={`${styles.placeholder} text text_type_main-medium`}>
      Перетащите {type === "center" ? "ингредиент" : "булку"} сюда
    </div>
  );
}

export default Placeholder;

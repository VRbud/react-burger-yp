import React from "react";
import styles from "./IngredientCat.module.css";

function IngredientCat({ children, title }) {
  return (
    <div>
      <h3 className="text text_type_main-medium">{title}</h3>
      <div className=" pt-6 pb-10">
        <ul className={`list_reset ${styles.ingredint_list}`}>{children}</ul>
      </div>
    </div>
  );
}

export default IngredientCat;

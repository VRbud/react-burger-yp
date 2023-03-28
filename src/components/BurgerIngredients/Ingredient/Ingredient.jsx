import React from "react";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ingredient.module.css";

function Ingredient({ ingredientData }) {
  return (
    <li className={styles.ingredient}>
      <Counter className={styles.counter} />
      <img
        src={ingredientData.image}
        className={`${styles.image} pr-4 pl-4`}
        alt={ingredientData.name}
      />
      <div className={`${styles.ingredient_bottom} pt-1 pb-1`}>
        <p className="text text_type_main-medium pr-2">
          {ingredientData.price}
        </p>
        <CurrencyIcon type="primary" />
      </div>
      <span className={`${styles.center} text text_type_main-default`}>
        {ingredientData.name}
      </span>
    </li>
  );
}

export default Ingredient;

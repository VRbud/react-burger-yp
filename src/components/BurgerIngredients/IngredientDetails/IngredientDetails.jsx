import React from "react";

import styles from "./IngredientDetails.module.css";

import { ingredientDetailsTypes } from "../../../Types/types";

IngredientDetails.propTypes = {
  ingredientDetailsTypes,
};

function IngredientDetails({ ingredientData }) {
  return (
    <>
      <h2 className={`${styles.title} text text_type_main-large mt-5`}>
        Детали ингридиента
      </h2>
      <div className={`${styles.modal_content_top} ml-25 mr-25`}>
        <img
          className={`${styles.img} mb-4`}
          src={ingredientData.image}
          alt={ingredientData.name}
        />
        <h3 className="text text_type_main-medium mb-8">
          {ingredientData.name}
        </h3>
        <ul className={`${styles.list} list_reset`}>
          <li
            className={`${styles.list_item} text text_type_main-default text_color_inactive`}
          >
            <span>Калории,ккал</span>
            <span className="text text_type_digits-default text_color_inactive">
              {ingredientData.calories}
            </span>
          </li>
          <li
            className={`${styles.list_item} text text_type_main-default text_color_inactive`}
          >
            <span>Белки, г</span>
            <span className="text text_type_digits-default text_color_inactive">
              {ingredientData.proteins}
            </span>
          </li>
          <li
            className={`${styles.list_item} text text_type_main-default text_color_inactive`}
          >
            <span>Жиры, г</span>
            <span className="text text_type_digits-default text_color_inactive">
              {ingredientData.fat}
            </span>
          </li>
          <li
            className={`${styles.list_item} text text_type_main-default text_color_inactive`}
          >
            <span>Углеводы, г</span>
            <span className="text text_type_digits-default text_color_inactive">
              {ingredientData.carbohydrates}
            </span>
          </li>
        </ul>
      </div>
    </>
  );
}

export default IngredientDetails;

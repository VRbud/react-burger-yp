import styles from "./IngredientDetails.module.css";

import { ingredientDetailsTypes } from "../../../Types/types";
import { useSelector } from "react-redux";

IngredientDetails.propTypes = {
  ingredientDetailsTypes,
};

function IngredientDetails() {
  const { currentIngredient } = useSelector((state) => state.ingredients);
  return (
    <>
      <h2 className={`${styles.title} text text_type_main-large mt-5`}>
        Детали ингридиента
      </h2>
      <div className={`${styles.modal_content_top} ml-25 mr-25`}>
        <img
          className={`${styles.img} mb-4`}
          src={currentIngredient.image}
          alt={currentIngredient.name}
        />
        <h3 className="text text_type_main-medium mb-8">
          {currentIngredient.name}
        </h3>
        <ul className={`${styles.list} list_reset`}>
          <li
            className={`${styles.list_item} text text_type_main-default text_color_inactive`}
          >
            <span>Калории,ккал</span>
            <span className="text text_type_digits-default text_color_inactive">
              {currentIngredient.calories}
            </span>
          </li>
          <li
            className={`${styles.list_item} text text_type_main-default text_color_inactive`}
          >
            <span>Белки, г</span>
            <span className="text text_type_digits-default text_color_inactive">
              {currentIngredient.proteins}
            </span>
          </li>
          <li
            className={`${styles.list_item} text text_type_main-default text_color_inactive`}
          >
            <span>Жиры, г</span>
            <span className="text text_type_digits-default text_color_inactive">
              {currentIngredient.fat}
            </span>
          </li>
          <li
            className={`${styles.list_item} text text_type_main-default text_color_inactive`}
          >
            <span>Углеводы, г</span>
            <span className="text text_type_digits-default text_color_inactive">
              {currentIngredient.carbohydrates}
            </span>
          </li>
        </ul>
      </div>
    </>
  );
}

export default IngredientDetails;

import { useParams } from "react-router-dom";
import styles from "./IngredientDetails.module.css";
import { useSelector } from "react-redux";
import { IIngredient } from "../../../Types/BurgerConstructorTypes/StoreTypes/IngredientTypes";

function IngredientDetails() {
  const { id } = useParams();
  // disable types for redux store
  //@ts-ignore
  const { ingredients } = useSelector((state) => state.ingredients);
  //@ts-ignore
  const { currentIngredient } = useSelector((state) => state.modal);

  const ingFromState =
    ingredients && ingredients.find((ing: IIngredient) => ing._id === id);

  if (ingFromState)
    return (
      <>
        <h2 className={`${styles.title} text text_type_main-large mt-5`}>
          Детали ингридиента
        </h2>
        <div className={`${styles.modal_content_top} ml-25 mr-25`}>
          <img
            className={`${styles.img} mb-4`}
            src={ingFromState.image}
            alt={ingFromState.name}
          />
          <h3 className="text text_type_main-medium mb-8">
            {ingFromState.name}
          </h3>
          <ul className={`${styles.list} list_reset`}>
            <li
              className={`${styles.list_item} text text_type_main-default text_color_inactive`}
            >
              <span>Калории,ккал</span>
              <span className="text text_type_digits-default text_color_inactive">
                {ingFromState.calories}
              </span>
            </li>
            <li
              className={`${styles.list_item} text text_type_main-default text_color_inactive`}
            >
              <span>Белки, г</span>
              <span className="text text_type_digits-default text_color_inactive">
                {ingFromState.proteins}
              </span>
            </li>
            <li
              className={`${styles.list_item} text text_type_main-default text_color_inactive`}
            >
              <span>Жиры, г</span>
              <span className="text text_type_digits-default text_color_inactive">
                {ingFromState.fat}
              </span>
            </li>
            <li
              className={`${styles.list_item} text text_type_main-default text_color_inactive`}
            >
              <span>Углеводы, г</span>
              <span className="text text_type_digits-default text_color_inactive">
                {ingFromState.carbohydrates}
              </span>
            </li>
          </ul>
        </div>
      </>
    );

  if (currentIngredient)
    return (
      currentIngredient && (
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
      )
    );
}

export default IngredientDetails;

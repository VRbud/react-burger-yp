import { useEffect, useMemo, useState } from "react";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ingredient.module.css";
import Modal from "../../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import { burgerIngredientTypes } from "../../../Types/types";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_TO_CART,
  ADD_BUN_TO_CART,
} from "../../../services/actions/ingredients";

Ingredient.propTypes = {
  ingredientData: burgerIngredientTypes,
};

function Ingredient({ ingredientData }) {
  const [modal, setModal] = useState(false);

  const { cart, bun } = useSelector((state) => state.ingredients);

  const dispatch = useDispatch();

  function closeModal() {
    setModal(false);
  }

  let count = 0;

  for (let ing of cart) {
    if (ing._id === ingredientData._id) count++;
  }
  if (bun.type === "bun" && bun._id === ingredientData._id) count = 2;

  function openModal() {
    setModal(true);
    if (ingredientData.type === "bun") {
      dispatch({
        type: ADD_BUN_TO_CART,
        payload: ingredientData,
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        payload: ingredientData,
      });
    }
  }

  return (
    <>
      <li
        onClick={() => openModal()}
        className={styles.ingredient}
      >
        <Counter
          className={styles.counter}
          count={count}
        />
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
      {modal && (
        <Modal onClose={closeModal}>
          <IngredientDetails ingredientData={ingredientData} />
        </Modal>
      )}
    </>
  );
}

export default Ingredient;

import React, { useState } from "react";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ingredient.module.css";
import Modal from "../../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import { burgerIngredientTypes } from "../../../Types/types";

Ingredient.propTypes = {
  ingredientData: burgerIngredientTypes,
};

function Ingredient({ ingredientData }) {
  const [modal, setModal] = useState(false);

  function closeModal() {
    setModal(false);
  }

  function openModal() {
    setModal(true);
  }

  return (
    <>
      <li onClick={openModal} className={styles.ingredient}>
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
      {modal && (
        <Modal onClose={closeModal} ingredientData={ingredientData}>
          <IngredientDetails ingredientData={ingredientData} />
        </Modal>
      )}
    </>
  );
}

export default Ingredient;

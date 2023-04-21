import { useMemo, useState } from "react";
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
  SET_MODAL_ING,
  DEL_MODAL_ING,
} from "../../../services/actions/modal";
import { useDrag } from "react-dnd";

Ingredient.propTypes = {
  ingredientData: burgerIngredientTypes,
};

function Ingredient({ ingredientData }) {
  const [modal, setModal] = useState(false);

  const { cart, bun } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  const id = ingredientData._id;
  let count = useMemo(() => {
    if (cart === null) return
    let counter = 0
    for (let ing of cart) {
        if (ing._id === ingredientData._id) return counter++;
        if (bun.type === "bun" && bun._id === ingredientData._id) return  2

  }
  }, [bun, cart, ingredientData._id])

  const [{ opacity }, ingRef] = useDrag({
    type: "ingredient",
    item: { id },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  function closeModal() {
    setModal(false);
    dispatch({
      type: DEL_MODAL_ING,
    });
  }

  function openModal() {
    setModal(true);
    dispatch({
      type: SET_MODAL_ING,
      payload: ingredientData,
    });
  }

  return (
    <>
      <li
        onClick={() => openModal()}
        className={styles.ingredient}
        ref={ingRef}
        style={{ opacity }}
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
          <IngredientDetails />
        </Modal>
      )}
    </>
  );
}

export default Ingredient;

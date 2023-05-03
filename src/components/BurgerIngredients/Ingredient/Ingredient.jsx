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
import { SET_MODAL_ING, DEL_MODAL_ING } from "../../../services/actions/modal";
import { useDrag } from "react-dnd";
import { Link, useLocation, useNavigate } from "react-router-dom";

Ingredient.propTypes = {
  ingredientData: burgerIngredientTypes,
};

function Ingredient({ ingredientData }) {
  let location = useLocation();
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);

  const { cart, bun } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const id = ingredientData._id;

  let count = useMemo(() => {
    if (cart === null || bun === null) return;
    if (bun.type === "bun" && bun._id === ingredientData._id) return 2;
    let counter = 0;
    cart.forEach((ing) => {
      ing._id === ingredientData._id && counter++;
    });
    return counter;
  }, [bun, cart, ingredientData._id]);

  const [{ opacity }, ingRef] = useDrag({
    type: "ingredient",
    item: { id },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  function closeModal() {
    setModal(false);
    navigate(-1);
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
      <Link to={`/ingredients/${id}`} state={{ backgroundLocation: location }}>
        <li
          onClick={() => openModal()}
          className={styles.ingredient}
          ref={ingRef}
          style={{ opacity }}
          state={{ backgroundLocation: location }}
        >
          <Counter className={styles.counter} count={count} />
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
      </Link>
      {modal && (
        <Modal onClose={closeModal}>
          <IngredientDetails />
        </Modal>
      )}
    </>
  );
}

export default Ingredient;

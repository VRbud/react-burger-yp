import { FC, useMemo } from "react";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ingredient.module.css";
import { SET_MODAL_ING } from "../../../services/actions/modal";
import { useDrag } from "react-dnd";
import { Link, useLocation } from "react-router-dom";
import { IIngredient } from "../../../Types/BurgerConstructorTypes/StoreTypes/IngredientTypes";
import { useAppDispatch, useAppSelector } from "../../../services/hooks";

type IIngredientData = {
  ingredientData: IIngredient;
};

const Ingredient: FC<IIngredientData> = ({ ingredientData }) => {
  let location = useLocation();

  const { cart, bun } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const id = ingredientData._id;

  let count = useMemo((): number => {
    if (cart === null || bun === null) return 0;
    if (bun.type === "bun" && bun._id === ingredientData._id) return 2;
    let counter = 0;
    cart.forEach((ing: IIngredient) => {
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

  function openModal() {
    dispatch({
      type: SET_MODAL_ING,
      payload: ingredientData,
    });
  }

  return (
    <li
      onClick={() => openModal()}
      className={styles.ingredient}
      ref={ingRef}
      style={{ opacity }}
      id={ingredientData._id}
    >
      <Link to={`/ingredients/${id}`} state={{ backgroundLocation: location }}>
        <Counter extraClass={styles.counter} count={count} />
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
      </Link>
    </li>
  );
};

export default Ingredient;

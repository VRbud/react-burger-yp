import { useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "./BurgerConstructor.module.css";
import Modal from "../Modal/Modal";
import OrderDetails from "./OrderDetails/OrderDetails";
import {
  ConstructorElement,
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import {
  ADD_BUN_TO_CART,
  ADD_TO_CART,
  SORT_CART,
} from "../../services/actions/constructor";

import { DELETE_ORDER_DATA, sendOrderData } from "../../services/actions/order";

import { useSelector, useDispatch } from "react-redux";
import { useDrop } from "react-dnd";
import SortedConstructorElement from "./SortedConstructorElement/SortedConstructorElement";
import Placeholder from "./PlaceHolder/Placeholder";

function BurgerConstructor() {
  const { ingredients } = useSelector((state) => state.ingredients);
  const { cart, bun } = useSelector((state) => state.cart);
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();
  /* eslint-disable */
  // без определеиния isHover не работает хук
  const [{ isHover }, dropTarget] = useDrop({
    /* eslint-enable */
    accept: "ingredient",
    collect: (monitor) => ({
      handlerid: monitor.getHandlerId(),
    }),
    drop(item) {
      if (
        ingredients.find((ing) => ing._id === item.id && ing.type === "bun")
      ) {
        dispatch({
          type: ADD_BUN_TO_CART,
          payload: ingredients.find((ing) => ing._id === item.id),
        });
      } else {
        dispatch({
          type: ADD_TO_CART,
          payload: ingredients.find((ing) => ing._id === item.id),
        });
      }
    },
  });

  const moveIngredient = (dragIndex, hoverIndex) => {
    dispatch({
      type: SORT_CART,
      dragIndex,
      hoverIndex,
    });
  };

  let sum = useMemo(
    () =>
      cart !== null &&
      bun !== null &&
      cart.reduce(
        (accumulator, currentValue) => accumulator + currentValue.price,
        0
      ) +
        bun.price * 2,
    [cart, bun]
  );

  function closeModal() {
    setModal(false);
    dispatch({
      type: DELETE_ORDER_DATA,
    });
  }

  function submitHandler(event) {
    event.preventDefault();
    const totalCart = {
      ingredients: [bun, ...cart, bun].map((ing) => ing._id),
    };
    dispatch(sendOrderData(totalCart));
    setModal(true);
  }

  return (
    <>
      <div ref={dropTarget} className={`${styles.burger_constructor} pt-25`}>
        <div className={styles.burger_constructor_top}>
          <div className={`${bun !== null ? styles.end : ""} pl-8 pr-4`}>
            {bun !== null && bun.name ? (
              <ConstructorElement
                type="top"
                isLocked={true}
                text={`${bun.name} (верх)`}
                price={bun.price}
                thumbnail={bun.image}
              />
            ) : (
              <Placeholder isHover />
            )}
          </div>
          <div
            className={`${
              bun !== null ? styles.center : styles.placeholder
            } pr-1 custom-scroll`}
          >
            {cart !== null && cart.length > 0 ? (
              cart.map((ingredient, index) => (
                <SortedConstructorElement
                  key={uuidv4()}
                  ingredient={ingredient}
                  index={index}
                  id={ingredient._id}
                  moveIngredient={moveIngredient}
                />
              ))
            ) : (
              <Placeholder />
            )}
          </div>
          <div className={`${bun !== null ? styles.end : ""} pl-8 pr-4`}>
            {bun !== null && bun.name ? (
              <ConstructorElement
                type="bottom"
                isLocked={true}
                text={`${bun.name} (верх)`}
                price={bun.price}
                thumbnail={bun.image}
              />
            ) : (
              <Placeholder />
            )}
          </div>
        </div>
        <div className={styles.burger_constructor_bottom}>
          <p className={styles.burger_constructor_total}>
            <span className="text text_type_main-large">{sum ? sum : 0}</span>
            <CurrencyIcon />
          </p>
          <form onSubmit={(event) => submitHandler(event)}>
            <Button
              htmlType="submit"
              type="primary"
              size="large"
              disabled={bun !== null && bun.name ? false : true}
            >
              Оформить заказ
            </Button>
          </form>
        </div>
      </div>

      {modal && (
        <Modal onClose={closeModal}>
          <OrderDetails />
        </Modal>
      )}
    </>
  );
}

export default BurgerConstructor;

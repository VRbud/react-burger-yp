import { useMemo, useState } from "react";
import styles from "./BurgerConstructor.module.css";
import Modal from "../Modal/Modal";
import { v4 as uuidv4 } from "uuid";
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
  DELETE_FROM_CART,
} from "../../services/actions/constructor";

import { DELETE_ORDER_DATA, sendOrderData } from "../../services/actions/order";
import { useAppSelector, useAppDispatch } from "../../services/hooks";
import { useDrop } from "react-dnd";
import SortedConstructorElement from "./SortedConstructorElement/SortedConstructorElement";
import Placeholder from "./PlaceHolder/Placeholder";
import { IIngredient } from "../../Types/BurgerConstructorTypes/StoreTypes/IngredientTypes";

export interface Item {
  id: number;
  text: string;
}

function BurgerConstructor() {
  const { ingredients } = useAppSelector((state) => state.ingredients);

  const { cart, bun } = useAppSelector((state) => state.cart);

  const { loginData } = useAppSelector((state) => state.auth);
  const [modal, setModal] = useState(false);
  const dispatch = useAppDispatch();
  // без определеиния isHover не работает хук
  // @ts-ignore
  // eslint-disable-next-line
  const [{ isHover }, dropTarget] = useDrop({
    accept: "ingredient",
    collect: (monitor) => ({
      handlerid: monitor.getHandlerId(),
    }),
    drop(item) {
      if (
        // toDo add types to Ingredient
        ingredients &&
        // @ts-ignore
        ingredients.find((ing) => ing._id === item.id && ing.type === "bun")
      ) {
        dispatch({
          type: ADD_BUN_TO_CART,
          // @ts-ignore
          payload: ingredients.find((ing) => ing._id === item.id),
        });
      } else {
        dispatch({
          type: ADD_TO_CART,
          // @ts-ignore
          payload: ingredients.find((ing) => ing._id === item.id),
        });
      }
    },
  });

  const moveIngredient = (dragIndex: number, hoverIndex: number) => {
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
        (accumulator: number, currentValue: IIngredient) =>
          accumulator + currentValue.price,
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

  const handleDelete = (id: string, index: number) => {
    if (id === cart[index]._id) {
      dispatch({
        type: DELETE_FROM_CART,
        ing: index,
      });
    }
  };

  function submitHandler(event: React.SyntheticEvent) {
    event.preventDefault();
    if (cart && bun) {
      const totalCart = {
        ingredients: [bun, ...cart, bun].map((ing) => ing && ing._id),
      };

      dispatch(sendOrderData(totalCart));
      setModal(true);
    }
  }

  return (
    <>
      <div ref={dropTarget} className={`${styles.burger_constructor} pt-25`}>
        <div className={styles.burger_constructor_top}>
          <div className={`${bun !== null ? styles.end : ""} pl-8 pr-4`}>
            {bun !== null ? (
              <ConstructorElement
                type="top"
                isLocked={true}
                text={`${bun.name} (верх)`}
                price={bun.price}
                thumbnail={bun.image}
              />
            ) : (
              <Placeholder />
            )}
          </div>
          <div
            className={`${
              bun !== null ? styles.center : styles.placeholder
            } pr-1 custom-scroll`}
          >
            {cart.length > 0 ? (
              cart.map((ingredient: IIngredient, index: number) => (
                <SortedConstructorElement
                  key={uuidv4()}
                  ingredient={ingredient}
                  index={index}
                  id={ingredient._id}
                  moveIngredient={moveIngredient}
                  handleDelete={() => handleDelete(ingredient._id, index)}
                />
              ))
            ) : (
              <Placeholder type={"center"} />
            )}
          </div>
          <div className={`${bun !== null ? styles.end : ""} pl-8 pr-4`}>
            {bun !== null ? (
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
            <CurrencyIcon type="primary" />
          </p>
          <form onSubmit={(event) => submitHandler(event)}>
            <Button
              htmlType="submit"
              type="primary"
              size="large"
              disabled={bun !== null && bun.name && loginData ? false : true}
            >
              Оформить заказ
            </Button>
          </form>
        </div>
      </div>

      {modal && (
        // disable for modal with ingredient details
        // @ts-ignore
        <Modal onClose={closeModal}>
          <OrderDetails />
        </Modal>
      )}
    </>
  );
}

export default BurgerConstructor;

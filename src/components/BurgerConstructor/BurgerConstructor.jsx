import { useState } from "react";
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
  DEL_MODAL_ING,
  SORT_CART,
  sendOrderData,
} from "../../services/actions/ingredients";
import { useSelector, useDispatch } from "react-redux";
import { useDrop } from "react-dnd";
import SortedConstructorElement from "./SortedConstructorElement/SortedConstructorElement";


function BurgerConstructor() {
  const { cart, bun, ingredients } = useSelector((state) => state.ingredients);
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();

  const [{ isHover }, dropTarget] = useDrop({
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
      hoverIndex
    });
  };

  let sum =
    cart.reduce(
      (accumulator, currentValue) => accumulator + currentValue.price,
      0
    ) +
    bun.price * 2;

  function closeModal() {
    setModal(false);
    dispatch({
      type: DEL_MODAL_ING,
    });
  }

  function submitHandler(event) {
    event.preventDefault();
    const totalCart = {
      ingredients: [...cart, bun, bun].map((ing) => ing._id),
    };
    dispatch(sendOrderData(totalCart));
    setModal(true);
  }
  return (
    <>
      <div
        ref={dropTarget}
        className={`${styles.burger_constructor} pt-25`}
      >
        <div className={styles.burger_constructor_top}>
          <div className={`${styles.end} pl-8 pr-4`}>
            {bun && (
              <ConstructorElement
                type="top"
                isLocked={true}
                text={`${bun.name} (верх)`}
                price={bun.price}
                thumbnail={bun.image}
              />
            )}
          </div>
          <div className={`${styles.center} pr-1 custom-scroll`}>
            {cart.length > 0 &&
              cart.map((ingredient, index) => (
                <SortedConstructorElement
                  key={uuidv4()}
                  ingredient={ingredient}
                  index={index}
                  id={ingredient._id}
                  moveIngredient={moveIngredient}
                />
              ))}
          </div>
          <div className={`${styles.end} pl-8 pr-4`}>
            {bun && (
              <ConstructorElement
                type="bottom"
                isLocked={true}
                text={`${bun.name} (верх)`}
                price={bun.price}
                thumbnail={bun.image}
              />
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

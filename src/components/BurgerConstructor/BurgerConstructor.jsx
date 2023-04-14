import { useState, useMemo } from "react";
import styles from "./BurgerConstructor.module.css";
import Modal from "../Modal/Modal";
import OrderDetails from "./OrderDetails/OrderDetails";
import { burgerConstructorTypes } from "../../Types/types";
import {
  ConstructorElement,
  DragIcon,
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import axios from "axios";

import { useSelector } from "react-redux";

const { REACT_APP_PUBLIC_URL } = process.env;

function BurgerConstructor() {
  const { cart, bun } = useSelector((state) => state.ingredients);

  const [modal, setModal] = useState(false);
  const [orderData, setOrderData] = useState();

  let sum = useMemo(() => {
    return (
      cart.reduce(
        (accumulator, currentValue) => accumulator + currentValue.price,
        0
      ) +
      bun.price * 2
    );
  }, [bun, cart]);

  function closeModal() {
    setModal(false);
  }

  function openModal() {
    setModal(true);
  }

  function submitHandler(event) {
    event.preventDefault();
    const totalCart = [...cart, bun, bun].map((ing) => ing._id);
    axios
      .post(`${REACT_APP_PUBLIC_URL}orders`, {
        ingredients: totalCart,
      })
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          setOrderData(response.data);
        } else {
          throw new Error("Что-то пошло не так");
        }
      });
    openModal();
  }

  return (
    <>
      <div className={`${styles.burger_constructor} pt-25`}>
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
              cart.map((ingredient) => (
                <div
                  key={ingredient._id}
                  className={styles.fillings}
                >
                  <DragIcon type="primary" />
                  <ConstructorElement
                    text={ingredient.name}
                    price={ingredient.price}
                    thumbnail={ingredient.image}
                  />
                </div>
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
              disabled={orderData ? true : false}
            >
              Оформить заказ
            </Button>
          </form>
        </div>
      </div>

      {modal && (
        <Modal
          onClose={closeModal}
          extraClass={orderData ? "" : "error"}
        >
          <OrderDetails orderData={orderData} />
        </Modal>
      )}
    </>
  );
}

export default BurgerConstructor;

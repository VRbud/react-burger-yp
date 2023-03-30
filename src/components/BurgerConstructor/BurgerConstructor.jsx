import React, { useState, useMemo } from "react";
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

BurgerConstructor.propTypes = {
  ingredientsData: burgerConstructorTypes,
};

function BurgerConstructor({ ingredientsData }) {
  const [modal, setModal] = useState(false);

  let sum = useMemo(
    () =>
      ingredientsData.reduce(
        (accumulator, currentValue) => accumulator + currentValue.price,
        0
      ),
    [ingredientsData]
  );

  function closeModal() {
    setModal(false);
  }

  function openModal() {
    setModal(true);
  }

  return (
    <>
      <div className={`${styles.burger_constructor} pt-25`}>
        <div className={styles.burger_constructor_top}>
          <div className={`${styles.end} pl-8`}>
            <ConstructorElement
              type="top"
              isLocked={true}
              text={ingredientsData[0].name}
              price={ingredientsData[0].price}
              thumbnail={ingredientsData[0].image}
              extraClass="top"
            />
          </div>
          <div className={`${styles.center} custom-scroll`}>
            {ingredientsData.map((ingredient) => (
              <div key={ingredient._id} className={styles.fillings}>
                <DragIcon type="primary" />
                <ConstructorElement
                  text={ingredient.name}
                  price={ingredient.price}
                  thumbnail={ingredient.image}
                />
              </div>
            ))}
          </div>
          <div className={`${styles.end} pl-8`}>
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={ingredientsData[ingredientsData.length - 1].name}
              price={ingredientsData[ingredientsData.length - 1].price}
              thumbnail={ingredientsData[ingredientsData.length - 1].image}
              extraClass="bottom"
            />
          </div>
        </div>
        <div className={styles.burger_constructor_bottom}>
          <p className={styles.burger_constructor_total}>
            <span className="text text_type_main-large">{sum}</span>
            <CurrencyIcon />
          </p>
          <Button
            htmlType="button"
            type="primary"
            size="large"
            onClick={openModal}
          >
            Оформить заказ
          </Button>
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

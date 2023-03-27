import React from "react";
import styles from "./BurgerConstructor.module.css";

import {
  ConstructorElement,
  DragIcon,
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

function BurgerConstructor({ data }) {
  let sum = 0;
  function total() {
    data.forEach((element) => {
      sum += element.price;
    });
  }
  total();

  return (
    <div className={`${styles.burger_constructor} pt-25`}>
      <div className={styles.burger_constructor_top}>
        <div className={`${styles.end} pl-8`}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text="Краторная булка N-200i (верх)"
            price={200}
            thumbnail={data[0].image}
            extraClass="top"
          />
        </div>
        <div className={styles.center}>
          {data.map((ingredient) => (
            <div className={styles.fillings}>
              <DragIcon type="primary" />
              <ConstructorElement
                key={ingredient._id}
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
            text="Краторная булка N-200i (верх)"
            price={200}
            thumbnail={data[data.length - 1].image}
            extraClass="bottom"
          />
        </div>
      </div>
      <div className={styles.burger_constructor_bottom}>
        <p className={styles.burger_constructor_total}>
          <span className="text text_type_main-large">{sum}</span>
          <CurrencyIcon />
        </p>
        <Button htmlType="button" type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </div>
  );
}

export default BurgerConstructor;

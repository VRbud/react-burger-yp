import { IIngredient } from "../../../Types/BurgerConstructorTypes/StoreTypes/IngredientTypes";
import { useAppSelector } from "../../../services/hooks";
import FeedOrderIngredient from "./FeedOrderIngredient/FeedOrderIngredient";
import styles from "./FeedOrder.module.css";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useMemo } from "react";

const FeedOrder = () => {
  const { currentOrder } = useAppSelector((state) => state.ws);

  const time = useMemo(() => {
    if (currentOrder !== null && currentOrder.order.createdAt !== null)
      return new Date(currentOrder.order.createdAt);
  }, [currentOrder]);

  let sum = useMemo(
    () =>
      currentOrder !== null &&
      currentOrder.ingredients.reduce(
        (accumulator: number, currentValue: IIngredient) =>
          accumulator + currentValue.price,
        0
      ),
    [currentOrder]
  );

  return (
    <div className={styles.modal_container}>
      <div className={styles.modal_content}>
        <h4
          className={`text text_type_digits-default mb-10 ${styles.number}`}
        >{`#${currentOrder?.order?.number}`}</h4>
        <h3 className="text text_type_main-medium mb-3">
          {currentOrder?.order?.name}
        </h3>
        <span
          className={`text text_type_main-small mb-15 ${
            currentOrder?.order.status === "done" ? "ready" : ""
          }`}
        >
          {currentOrder?.order.status === "done" ? "Выполнен" : "В работе"}
        </span>
        <h4 className="text text_type_main-medium mb-6">Состав:</h4>
        <ul className={`list_reset mb-10 ${styles.list}`}>
          {currentOrder?.ingredients.map((ing: IIngredient, index) => (
            <FeedOrderIngredient key={index} ingredient={ing} />
          ))}
        </ul>
        <div className={styles.content_bottom}>
          <span className={styles.date}>
            <FormattedDate
              className="text text_type_main-small text_color_inactive"
              // @ts-ignore
              date={time}
            />
          </span>
          <div className={`${styles.price} text text_type_digits-default`}>
            <span>{sum}</span>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedOrder;

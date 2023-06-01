import { useMemo } from "react";
import { IIngredient } from "../../../../Types/BurgerConstructorTypes/StoreTypes/IngredientTypes";
import styles from "./FeedOrderIngredient.module.css";
import { useAppSelector } from "../../../../services/hooks";
import { useParams } from "react-router-dom";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const FeedOrderIngredient = ({ ingredient }: { ingredient: IIngredient }) => {
  const { id } = useParams();
  const { orders } = useAppSelector((state) => state.ws);

  const order = orders.find((ord) => ord._id === id);

  let count = useMemo((): number => {
    let counter = 0;
    // eslint-disable-next-line
    order?.ingredients.map((id) => {
      if (id === ingredient._id) counter++;
    });
    return counter;
  }, [order, ingredient._id]);

  return (
    <li>
      <div className={styles.content}>
        <div className={styles.img_wrapper}>
          <img
            className={styles.img}
            src={ingredient.image}
            alt={ingredient.name}
          />
        </div>
        <span className={`text text_type_main-small ${styles.text}`}>
          {ingredient.name}
        </span>
        <div className={styles.price}>
          <p className="text text_type_digits-default">
            {count} X {ingredient.price}
          </p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </li>
  );
};

export default FeedOrderIngredient;

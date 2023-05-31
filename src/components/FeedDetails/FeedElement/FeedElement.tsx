import React, { useMemo } from "react";
import { IIngredient } from "../../../Types/BurgerConstructorTypes/StoreTypes/IngredientTypes";
import styles from "./FeedElement.module.css";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";

const FeedElement = ({ ...props }) => {
  const ingredientsArray = useMemo(() => {
    let tempArray: IIngredient[] = [];
    const orderIngredientsId = props.order.ingredients;
    const ingredients = props.ingredients;
    // eslint-disable-next-line
    ingredients.map((ing: IIngredient) => {
      if (orderIngredientsId.includes(ing._id)) return tempArray.push(ing);
    });
    return tempArray;
  }, [props.order, props.ingredients]);

  let sum = useMemo(
    () =>
      ingredientsArray !== null &&
      ingredientsArray.reduce(
        (accumulator: number, currentValue: IIngredient) =>
          accumulator + currentValue.price,
        0
      ),
    [ingredientsArray]
  );

  return (
    <Link to={`/feed/${props.id}`}>
      <div className={`p-6 ${styles.card}`}>
        <p className={`text text_type_digits-default pb-6 ${styles.heading}`}>
          <span>{`#${props.order.number}`}</span>
          <FormattedDate
            className="text text_type_main-small text_color_inactive"
            date={new Date(props.order.createdAt)}
          />
        </p>
        <p className="text text_type_main-default pb-6">{`${props.order.name}`}</p>
        <div className={styles.content}>
          <ul className={`list_reset ${styles.list}`}>
            {ingredientsArray.map((ing, index: number) => (
              <li className={styles.list_item} key={index}>
                <img className={styles.img} src={ing.image} alt={ing.name} />
              </li>
            ))}
          </ul>
          <p className={styles.price}>
            <span className="text text_type_digits-default text_type_main-small">
              {sum ? sum : 0}
            </span>
            <CurrencyIcon type="primary" />
          </p>
        </div>
      </div>
    </Link>
  );
};

export default FeedElement;

import { IIngredient } from "../../../Types/BurgerConstructorTypes/StoreTypes/IngredientTypes";
import { useAppDispatch, useAppSelector } from "../../../services/hooks";
import FeedOrderIngredient from "./FeedOrderIngredient/FeedOrderIngredient";
import styles from "./FeedOrder.module.css";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { getIngredients } from "../../../services/actions/ingredients";
import { wsUrlAll, wsUrlPrivate } from "../../../services/constants";
import { getCookie } from "../../../services/api/api";

const FeedOrder = () => {
  const { orders } = useAppSelector((state) => state.ws);
  const { ingredients } = useAppSelector((state) => state.ingredients);
  const { loginData } = useAppSelector((state) => state.auth);

  const { id } = useParams();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (loginData) {
      setTimeout(
        () =>
          dispatch({
            type: "WS_CONNECTION_START",
            payload: `${wsUrlPrivate}?token=${getCookie("token")?.replace(
              "Bearer ",
              ""
            )}`,
          }),
        15000
      );
    }
    if (!loginData) {
      setTimeout(
        () =>
          dispatch({
            type: "WS_CONNECTION_START",
            payload: `${wsUrlAll}`,
          }),
        15000
      );
    }
    dispatch(getIngredients());
  }, [dispatch, loginData]);

  const orderToShow = useMemo(() => {
    return orders && orders.find(({ _id }) => _id === id);
  }, [orders, id]);

  const ingredientsArray = useMemo(() => {
    let tempArray: IIngredient[] = [];
    // eslint-disable-next-line
    ingredients?.map((ing: IIngredient) => {
      if (orderToShow?.ingredients.includes(ing._id))
        return tempArray.push(ing);
    });
    return tempArray;
  }, [ingredients, orderToShow]);

  const time = useMemo(() => {
    if (
      orderToShow !== null &&
      orderToShow?.createdAt !== null &&
      orderToShow !== undefined
    )
      return new Date(orderToShow.createdAt);
  }, [orderToShow]);

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

  return orderToShow ? (
    <div className={styles.modal_container}>
      <div className={styles.modal_content}>
        <h4
          className={`text text_type_digits-default mb-10 ${styles.number}`}
        >{`#${orderToShow.number}`}</h4>
        <h3 className="text text_type_main-medium mb-3">{orderToShow.name}</h3>
        <span
          className={`text text_type_main-small mb-15 ${
            orderToShow.status === "done" ? "ready" : ""
          }`}
        >
          {orderToShow.status === "done" ? "Выполнен" : "В работе"}
        </span>
        <h4 className="text text_type_main-medium mb-6">Состав:</h4>
        <ul className={`list_reset mb-10 ${styles.list}`}>
          {ingredientsArray.map((ing: IIngredient, index) => (
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
  ) : (
    <></>
  );
};

export default FeedOrder;

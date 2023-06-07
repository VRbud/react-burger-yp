import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import FeedElement from "./FeedElement/FeedElement";
import { getIngredients } from "../../services/actions/ingredients";
import styles from "./FeedDetails.module.css";

const FeedDetails = () => {
  const dispatch = useAppDispatch();
  const { orders } = useAppSelector((state) => state.ws);
  const { ingredients } = useAppSelector((state) => state.ingredients);

  useEffect(() => {
    if (orders.length === 0) {
      dispatch({ type: "WS_CONNECTION_START_PUBLIC" });
      dispatch(getIngredients());
    }
  }, [dispatch, orders]);

  return (
    <div className={`${styles.content} pr-2 custom-scroll`}>
      <ul className={styles.list}>
        {orders &&
          orders.map((order, index) => (
            <FeedElement
              type="public"
              key={index}
              order={order}
              id={order._id}
              ingredients={ingredients}
            />
          ))}
      </ul>
    </div>
  );
};

export default FeedDetails;

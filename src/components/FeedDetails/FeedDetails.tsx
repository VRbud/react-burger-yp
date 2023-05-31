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
    dispatch({ type: "WS_CONNECTION_START" });
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <div className={`${styles.content} pr-2 custom-scroll`}>
      <ul className={styles.list}>
        {orders &&
          orders.map((order) =>
            order.map((order, index) => (
              <FeedElement
                key={index}
                order={order}
                ingredients={ingredients}
              />
            ))
          )}
      </ul>
    </div>
  );
};

export default FeedDetails;

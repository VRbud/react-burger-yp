import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import FeedElement from "./FeedElement/FeedElement";
import styles from "./FeedDetails.module.css";
import { useLocation } from "react-router-dom";

const FeedDetails = () => {
  const dispatch = useAppDispatch();
  const { orders } = useAppSelector((state) => state.ws);
  const { ingredients } = useAppSelector((state) => state.ingredients);
  let location = useLocation();
  let state = location.state as { backgroundLocation?: Location };

  useEffect(() => {
    return () => {
      dispatch({ type: "WS_CLOSE" });
    };
  }, [dispatch]);

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

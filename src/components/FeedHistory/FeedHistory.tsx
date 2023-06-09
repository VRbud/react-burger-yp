import { useMemo } from "react";
import styles from "./FeedHistory.module.css";
import { useAppSelector } from "../../services/hooks";

const FeedHistory = () => {
  const { orders, totalToday, total } = useAppSelector((state) => state.ws);
  const readyOrdersArray = useMemo(() => {
    return orders.filter((order) => order.status === "done");
  }, [orders]);

  const pendingOrdersArray = useMemo(() => {
    return orders.filter((order) => order.status !== "done");
  }, [orders]);

  return (
    <div className={styles.content}>
      <div className={`${styles.top_content} mb-15`}>
        <div className={styles.top_content__item}>
          <h2 className="text text_type_main-medium mb-6">Готовы:</h2>
          <ul className={`list_reset ${styles.order_list}`}>
            {readyOrdersArray.map((order) => (
              <li className="text text_type_digits-default ready">
                {order.number}
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.top_content__item}>
          <h2 className="text text_type_main-medium mb-6">В работе:</h2>
          <ul className={`list_reset ${styles.order_list}`}>
            {pendingOrdersArray.map((order) => (
              <li className="text text_type_digits-default ready">
                {order.number}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mb-15">
        <h3 className="text text_type_main-medium">Выполнено за все время:</h3>
        <span className={`text text_type_digits-large ${styles.digit}`}>
          {total}
        </span>
      </div>
      <div>
        <h3 className="text text_type_main-medium">Выполнено за сегодня:</h3>
        <span className={`text text_type_digits-large ${styles.digit}`}>
          {totalToday}
        </span>
      </div>
    </div>
  );
};

export default FeedHistory;

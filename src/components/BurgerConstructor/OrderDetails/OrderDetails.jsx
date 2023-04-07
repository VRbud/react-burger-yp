import styles from "./OrderDetails.module.css";
import img from "../../../images/order_accpeted/accepted.png";
import Spinner from "../../../ui/Spinner";
import { orderDetailsTypes } from "../../../Types/types";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

OrderDetails.propTypes = {
  orderData: orderDetailsTypes,
};

function OrderDetails({ orderData }) {
  if (orderData) {
    return orderData ? (
      <div className={`${styles.order_container} pt-15 pb-15`}>
        <h2
          className={`${styles.order_number} mb-8 text text_type_digits-large`}
        >
          {orderData.success
            ? orderData.order.number
            : "Не удалось создать заказ"}
        </h2>
        <span
          className={`${styles.order_text} text text_type_main-default mb-15`}
        >
          идентификатор заказа
        </span>
        {orderData.success ? (
          <img
            className={`${styles.order_img} mb-15`}
            src={img}
            alt="заказ принят в работу"
          />
        ) : (
          <div
            style={{ transform: "scale(2)" }}
            className={`${styles.order_img} mb-15`}
          >
            <CloseIcon type="error" />
          </div>
        )}
        <span
          className={`${styles.order_status} text text_type_main-default mb-2`}
        >
          Ваш заказ начали готовить
        </span>
        <span
          className={`${styles.order_wait} text text_type_main-default text_color_inactive`}
        >
          Дождитесь готовности на орбитальной станции
        </span>
      </div>
    ) : (
      <Spinner />
    );
  }
}

export default OrderDetails;

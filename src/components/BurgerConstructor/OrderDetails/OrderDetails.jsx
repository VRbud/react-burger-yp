import styles from "./OrderDetails.module.css";
import img from "../../../images/order_accpeted/accepted.png";
import Spinner from "../../../ui/Spinner";
import { orderDetailsTypes } from "../../../Types/types";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";

OrderDetails.propTypes = {
  orderData: orderDetailsTypes,
};

function OrderDetails() {
  const { orderData } = useSelector((state) => state.ingredients);
  return orderData.success ? (
    <div className={`${styles.order_container} pt-15 pb-15`}>
      <h2 className={`${styles.order_number} mb-8 text text_type_digits-large`}>
        {orderData.order.number}
      </h2>
      <span
        className={`${styles.order_text} text text_type_main-default mb-15`}
      >
        идентификатор заказа
      </span>

      <img
        className={`${styles.order_img} mb-15`}
        src={img}
        alt="заказ принят в работу"
      />

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

export default OrderDetails;

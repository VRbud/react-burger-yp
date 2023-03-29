import React from "react";
import styles from "./OrderDetails.module.css";
import img from "../../../images/order_accpeted/accepted.png";

function OrderDetails() {
  return (
    <div className={`${styles.order_container} pt-15 pb-15`}>
      <h2 className={`${styles.order_number} mb-8 text text_type_digits-large`}>
        034536
      </h2>
      <span className={`${styles.order_text} mb-15`}>идентификатор заказа</span>
      <img className={`${styles.order_img} mb-15`} src={img} alt="" />
      <span className={`${styles.order_status} mb-2`}>
        Ваш заказ начали готовить
      </span>
      <span className={`${styles.order_wait}`}>
        Дождитесь готовности на орбитальной станции
      </span>
    </div>
  );
}

export default OrderDetails;

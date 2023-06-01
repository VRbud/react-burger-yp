import React from "react";
import styles from "./FeedHistory.module.css";

const FeedHistory = () => {
  return (
    <div className={styles.content}>
      <div className={`${styles.top_content} mb-15`}>
        <div className={styles.top_content__item}>
          <h2 className="text text_type_main-medium mb-6">Готовы:</h2>
          <ul className="list_reset">
            <li className="text text_type_digits-default ready">123</li>
            <li className="text text_type_digits-default ready">123</li>
            <li className="text text_type_digits-default ready">123</li>
            <li className="text text_type_digits-default ready">123</li>
            <li className="text text_type_digits-default ready">123</li>
            <li className="text text_type_digits-default ready">123</li>
          </ul>
        </div>
        <div className={styles.top_content__item}>
          <h2 className="text text_type_main-medium mb-6">В работе:</h2>
          <ul className="list_reset">
            <li className="text text_type_digits-default">1123</li>
            <li className="text text_type_digits-default">1123</li>
            <li className="text text_type_digits-default">1123</li>
            <li className="text text_type_digits-default">1123</li>
            <li className="text text_type_digits-default">1123</li>
            <li className="text text_type_digits-default">1123</li>
          </ul>
        </div>
      </div>
      <div className="mb-15">
        <h3 className="text text_type_main-medium">Выполнено за все время:</h3>
        <span className={`text text_type_digits-large ${styles.digit}`}>
          28 752
        </span>
      </div>
      <div>
        <h3 className="text text_type_main-medium">Выполнено за сегодня:</h3>
        <span className={`text text_type_digits-large ${styles.digit}`}>
          138
        </span>
      </div>
    </div>
  );
};

export default FeedHistory;

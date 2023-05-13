import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./ProfileNavigation.module.css";
import { useDispatch } from "react-redux";
import { logout } from "../../../services/actions/auth";

function ProfileNavigation() {
  const dispatch = useDispatch();
  const clickHandler = () => {
    dispatch(logout());
  };
  return (
    <ul className={`list_reset ${styles.list_left}`}>
      <li>
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            isActive
              ? "text text_type_main-medium"
              : "text text_type_main-medium text_color_inactive"
          }
        >
          Профиль
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/profile/orders"
          className={({ isActive }) =>
            isActive
              ? "text text_type_main-medium"
              : "text text_type_main-medium text_color_inactive"
          }
        >
          История заказов
        </NavLink>
      </li>
      <li>
        <button
          className="btn_reset text text_type_main-medium text_color_inactive"
          onClick={clickHandler}
        >
          Выход
        </button>
      </li>
      <li className={styles.additional_info}>
        <span
          className={`${styles.additional_info} text text_type_main-default text_color_inactive`}
        >
          В этом разделе вы можете изменить свои персональные данные
        </span>
      </li>
    </ul>
  );
}

export default ProfileNavigation;

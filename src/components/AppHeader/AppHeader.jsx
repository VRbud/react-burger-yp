import React from "react";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./appheader.module.css";

function AppHeader() {
  return (
    <header>
      <div className={`${styles.header} container pt-4 pb-4`}>
        <nav>
          <ul className={`${styles.header_list} list_reset`}>
            <li className={`p-4 pl-5 pr-5 mr-2 ${styles.header_list_item}`}>
              <BurgerIcon type="primary" />
              <a href="#" className="pl-2 text text_type_main-default">
                Конструктор
              </a>
            </li>
            <li className={`p-4 pl-5 pr-5 ${styles.header_list_item}`}>
              <ListIcon type="primary" />
              <a href="#" className="pl-2 text text_type_main-default">
                Лента заказов
              </a>
            </li>
          </ul>
        </nav>
        <Logo />
        <label
          className={`${styles.btn_wrapper} pr-4 text text_type_main-default`}
        >
          <ProfileIcon type="primary" />
          <button className={`${styles.btn} pl-2 text text_type_main-default`}>
            Личный кабинет
          </button>
        </label>
      </div>
    </header>
  );
}

export default AppHeader;

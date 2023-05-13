import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink } from "react-router-dom";
import styles from "./appheader.module.css";

function AppHeader() {
  return (
    <header>
      <div className={`${styles.header} container pt-4 pb-4`}>
        <nav>
          <ul className={`${styles.header_list} list_reset`}>
            <li className={`p-4 pl-5 pr-5 mr-2 ${styles.header_list_item}`}>
              <BurgerIcon type="primary" />

              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "active pl-2 text text_type_main-default"
                    : "pl-2 text text_type_main-default text_color_inactive"
                }
              >
                Конструктор
              </NavLink>
            </li>
            <li className={`p-4 pl-5 pr-5 ${styles.header_list_item}`}>
              <ListIcon type="primary" />

              <NavLink
                to="/profile/orders"
                className={({ isActive }) =>
                  isActive
                    ? "active pl-2 text text_type_main-default"
                    : "pl-2 text text_type_main-default text_color_inactive"
                }
              >
                Лента заказов
              </NavLink>
            </li>
          </ul>
        </nav>
        <NavLink to="/">
          <Logo />
        </NavLink>
        <label
          className={`${styles.btn_wrapper} pr-4 text text_type_main-default`}
        >
          <ProfileIcon type="primary" />
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive
                ? "active pl-2 text text_type_main-default"
                : "pl-2 text text_type_main-default text_color_inactive"
            }
          >
            Личный кабинет
          </NavLink>
        </label>
      </div>
    </header>
  );
}

export default AppHeader;

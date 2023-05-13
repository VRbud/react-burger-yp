import { Link } from "react-router-dom";
import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./LoginForm.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { requestLogin } from "../../services/actions/auth";

function LoginFrom() {
  const [msg, setMsg] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setMsg({
      ...msg,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(requestLogin(msg));
  };

  return (
    <div className={styles.container}>
      <h1 className="text text_type_main-medium">Войти</h1>
      <form className={`${styles.form} pb-20 pt-6`} onSubmit={handleSubmit}>
        <EmailInput
          name="email"
          value={msg.email}
          onChange={handleChange}
          extraClass="pb-6"
        />
        <PasswordInput
          name="password"
          value={msg.password}
          onChange={handleChange}
          extraClass="pb-6"
        />
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          extraClass={`${styles.btn}`}
        >
          Войти
        </Button>
      </form>
      <div className={styles.bottom}>
        <div className={styles.link_wrapper}>
          <span className="text text_type_main-default text_color_inactive pr-2">
            Вы — новый пользователь?
          </span>
          <Link to="/register" className="text text_type_main-small">
            Зарегистрироваться
          </Link>
        </div>
        <div className={styles.link_wrapper}>
          <span className="text text_type_main-default text_color_inactive pr-2">
            Забыли пароль?
          </span>
          <Link to="/forgot-password" className="text text_type_main-small">
            Восстановить пароль
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginFrom;

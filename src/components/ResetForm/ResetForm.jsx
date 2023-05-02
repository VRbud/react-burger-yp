import { Link } from "react-router-dom";
import {
  PasswordInput,
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ResetForm.module.css";
import { useDispatch } from "react-redux";
import { resetPassword } from "../../services/actions/auth";
import { useState } from "react";

function ResetForm() {
  const [msg, setMsg] = useState({
    password: "",
    token: "",
  });
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setMsg({
      ...msg,
      [name]: value,
    });
    console.log(msg);
  };

  const handleSubmit = (e) => {
    dispatch(resetPassword(msg));
    e.preventDefault();
  };
  return (
    <div className={styles.container}>
      <h1 className="text text_type_main-medium">Регистраиця</h1>
      <form className={`${styles.form} pb-20 pt-6`} onSubmit={handleSubmit}>
        <PasswordInput
          extraClass="pb-6"
          placeholder="Введите новый пароль"
          value={msg.password}
          name="password"
          onChange={handleChange}
        />
        <Input
          name="token"
          placeholder="Введите код из письма"
          extraClass="pb-6"
          value={msg.token}
          onChange={handleChange}
        />
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          extraClass={`${styles.btn}`}
        >
          Сохранить
        </Button>
      </form>
      <div className={styles.bottom}>
        <div className={styles.link_wrapper}>
          <span className="text text_type_main-default text_color_inactive pr-2">
            Вспомнили пароль?
          </span>
          <Link to="/login" className="text text_type_main-small">
            Войти
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ResetForm;

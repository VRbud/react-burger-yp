import { Link } from "react-router-dom";
import {
  EmailInput,
  PasswordInput,
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./RegisterForm.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createUser } from "../../services/actions/auth";

function RegisterForm() {
  const [msg, setMsg] = useState({
    name: "",
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
    dispatch(createUser(msg));
  };

  return (
    <div className={styles.container}>
      <h1 className="text text_type_main-medium">Регистраиця</h1>
      <form className={`${styles.form} pb-20 pt-6`} onSubmit={handleSubmit}>
        <Input
          placeholder="Имя"
          extraClass="pb-6"
          name="name"
          value={msg.name}
          onChange={handleChange}
        />
        <EmailInput
          extraClass="pb-6"
          name="email"
          value={msg.email}
          onChange={handleChange}
        />
        <PasswordInput
          extraClass="pb-6"
          name="password"
          value={msg.password}
          onChange={handleChange}
        />
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          extraClass={`${styles.btn}`}
        >
          Зарегистрироваться
        </Button>
      </form>
      <div className={styles.bottom}>
        <div className={styles.link_wrapper}>
          <span className="text text_type_main-default text_color_inactive pr-2">
            Уже зарегистрированы?
          </span>
          <Link to="/login" className="text text_type_main-small">
            Войти
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;

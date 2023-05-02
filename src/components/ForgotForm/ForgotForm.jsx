import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ForgotForm.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { requestUser } from "../../services/actions/auth";

function ForgotForm() {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state, pathname } = useLocation();
  const url = window.location.href;

  const handleSubmit = (e) => {
    e.preventDefault();
    const msg = { email: email };
    dispatch(requestUser(msg));
    navigate("/reset-password", {
      state: [
        ...state,
        { path: pathname, url, title: "Успешный сброс пароля" },
      ],
    });
  };

  const handleCahnge = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div className={styles.container}>
      <h1 className="text text_type_main-medium">Восстановление пароля</h1>
      <form
        className={`${styles.form} pb-20 pt-6`}
        onSubmit={(e) => handleSubmit(e)}
      >
        <EmailInput
          extraClass="pb-6"
          name={"email"}
          onChange={handleCahnge}
          value={email}
        />
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          extraClass={`${styles.btn}`}
        >
          Восстановить
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

export default ForgotForm;

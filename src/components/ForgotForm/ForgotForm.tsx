import { Link, useNavigate } from "react-router-dom";
import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ForgotForm.module.css";
import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { requestUser } from "../../services/actions/auth";
import { useAppDispatch, useAppSelector } from "../../services/hooks";

function ForgotForm() {
  const { userData } = useAppSelector((state) => state.auth);
  const [emailTosend, setEmailToSend] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const msg = { email: emailTosend };
    dispatch(requestUser(msg));
  };

  useEffect(() => {
    if (userData !== null) navigate("/reset-password");
  }, [navigate, userData]);

  const handleCahnge = (e: ChangeEvent<HTMLInputElement>) => {
    setEmailToSend(e.target.value);
  };

  return (
    <div className={styles.container}>
      <h1 className="text text_type_main-medium">Восстановление пароля</h1>
      <form className={`${styles.form} pb-20 pt-6`} onSubmit={handleSubmit}>
        <EmailInput
          extraClass="pb-6"
          name={"email"}
          onChange={handleCahnge}
          value={emailTosend}
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

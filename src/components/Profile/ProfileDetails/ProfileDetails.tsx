import { ChangeEvent, SyntheticEvent, useState } from "react";
import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ProfileDetails.module.css";
import { changeUser } from "../../../services/actions/auth";
import { useAppDispatch, useAppSelector } from "../../../services/hooks";

function ProfileDetails() {
  const { loginData } = useAppSelector((state) => state.auth);
  const disptach = useAppDispatch();

  const [msg, setMsg] = useState({
    name: loginData && loginData.name,
    email: loginData && loginData.email,
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setMsg({
      ...msg,
      [name]: value,
    });
  };

  const handleReset = () => {
    setMsg({
      name: loginData && loginData.name,
      email: loginData && loginData.email,
      password: "",
    });
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    disptach(changeUser(msg));
  };

  const disableControl = () => {
    return (
      loginData &&
      msg.name === loginData.name &&
      msg.email === loginData.email &&
      msg.password === ""
    );
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <ul className={`${styles.list_right} list_reset`}>
          <li>
            <Input
              placeholder="Имя"
              extraClass="pb-6"
              name="name"
              value={msg.name as string}
              onChange={handleChange}
            />
          </li>
          <li>
            <EmailInput
              extraClass="pb-6"
              name="email"
              value={msg.email as string}
              onChange={handleChange}
            />
          </li>
          <li>
            <PasswordInput
              extraClass="pb-6"
              name="password"
              value={msg.password as string}
              onChange={handleChange}
            />
          </li>
        </ul>

        <div className={styles.bottom_content}>
          <Button
            htmlType="button"
            onClick={handleReset}
            disabled={disableControl() as boolean}
          >
            Отмена
          </Button>
          <Button htmlType="submit" disabled={disableControl() as boolean}>
            Сохранить
          </Button>
        </div>
      </form>
    </div>
  );
}

export default ProfileDetails;

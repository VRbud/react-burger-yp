import { useState } from "react";
import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ProfileDetails.module.css";
import { useDispatch, useSelector } from "react-redux";
import { changeUser } from "../../../services/actions/auth";

function ProfileDetails() {
  const { loginData } = useSelector((state) => state.auth);
  const [msg, setMsg] = useState({
    name: loginData.name,
    email: loginData.email,
    password: "",
  });
  const disptach = useDispatch();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setMsg({
      ...msg,
      [name]: value,
    });
  };

  const handleReset = () => {
    setMsg({
      name: loginData.name,
      email: loginData.email,
      password: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    disptach(changeUser(msg));
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
              value={msg.name}
              onChange={handleChange}
            />
          </li>
          <li>
            <EmailInput
              extraClass="pb-6"
              name="email"
              value={msg.email}
              onChange={handleChange}
            />
          </li>
          <li>
            <PasswordInput
              extraClass="pb-6"
              name="password"
              value={msg.password}
              onChange={handleChange}
            />
          </li>
        </ul>

        <div className={styles.bottom_content}>
          <Button
            htmlType="button"
            onClick={handleReset}
            disabled={
              msg.name === loginData.name || msg.email === loginData.email
            }
          >
            Отмена
          </Button>
          <Button
            htmlType="submit"
            disabled={
              msg.name === loginData.name || msg.email === loginData.email
            }
          >
            Сохранить
          </Button>
        </div>
      </form>
    </div>
  );
}

export default ProfileDetails;

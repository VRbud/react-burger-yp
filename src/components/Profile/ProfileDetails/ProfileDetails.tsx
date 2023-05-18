import { ChangeEvent, SyntheticEvent, useState } from "react";
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
  //disable types for redux store
  //@ts-ignore
  const { loginData } = useSelector((state) => state.auth);
  const [msg, setMsg] = useState({
    name: loginData.name,
    email: loginData.email,
    password: "",
  });
  const disptach = useDispatch();

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
      name: loginData.name,
      email: loginData.email,
      password: "",
    });
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    //@ts-ignore
    disptach(changeUser(msg));
  };

  const disableControl = () => {
    return (
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
            disabled={disableControl()}
          >
            Отмена
          </Button>
          <Button htmlType="submit" disabled={disableControl()}>
            Сохранить
          </Button>
        </div>
      </form>
    </div>
  );
}

export default ProfileDetails;

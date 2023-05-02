import { useState } from "react";
import {
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ProfileDetails.module.css";
import { useSelector } from "react-redux";

function ProfileDetails() {
  const { loginData } = useSelector((state) => state.auth);
  const [msg, setMsg] = useState({
    name: loginData.name,
    email: loginData.email,
    password: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setMsg({
      ...msg,
      [name]: value,
    });
  };
  return (
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
  );
}

export default ProfileDetails;

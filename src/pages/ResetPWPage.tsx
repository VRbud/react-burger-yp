import { useSelector } from "react-redux";
import ResetForm from "../components/ResetForm/ResetForm";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function ResetPWPage() {
  //disable types for redux store
  // @ts-ignore
  const { loginData, userData } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  // проверка если человек зашел по прямой ссылке без посещения forgot-password отправляет его на эту страницу
  useEffect(() => {
    if (userData === null) {
      navigate("/forgot-password");
    }
    if (loginData) {
      // если пользовтель есть, отправляет на главную страницу
      navigate("/");
    }
  }, [loginData, navigate, userData]);

  return (
    <>
      <main>
        <ResetForm />
      </main>
    </>
  );
}

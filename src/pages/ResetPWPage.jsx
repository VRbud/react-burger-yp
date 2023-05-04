import { useSelector } from "react-redux";
import ResetForm from "../components/ResetForm/ResetForm";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function ResetPWPage() {
  const { loginData } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  // проверка если человек зашел по прямой ссылке без посещения forgot-password отправляет его на эту страницу
  useEffect(() => {
    if (loginData === null) {
      navigate("/forgot-password");
    }
    // if (loginData) {
    //   navigate("/");
    // }
  }, [loginData, navigate]);

  return (
    <>
      <main>
        <ResetForm />
      </main>
    </>
  );
}

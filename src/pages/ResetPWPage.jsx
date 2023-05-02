import { useSelector } from "react-redux";
import ResetForm from "../components/ResetForm/ResetForm";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function ResetPWPage() {
  const { loginData } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { state } = useLocation();
  // проверка если человек зашел по прямой ссылке без посещения forgot-password отправляет его на эту страницу
  const checkHistory = () => {
    if (state) state.some((state) => state.path === "/forgot-password");
  };

  useEffect(() => {
    if (checkHistory()) {
      navigate("/forgot-password");
    }
    if (loginData) {
      navigate("/");
    }
    if (!loginData) {
      navigate("/login");
    }
  }, [loginData, navigate]);

  return (
    <>
      <main>
        <ResetForm />
      </main>
    </>
  );
}

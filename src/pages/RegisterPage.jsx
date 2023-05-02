import { useSelector } from "react-redux";
import RegisterForm from "../components/RegisterFrom/RegisterForm";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function RegisterPage() {
  const { loginData } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
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
        <RegisterForm />
      </main>
    </>
  );
}

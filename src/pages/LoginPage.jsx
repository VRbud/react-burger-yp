import { useSelector } from "react-redux";
import LoginFrom from "../components/LoginForm/LoginFrom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function LoginPage() {
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
        <LoginFrom type="login" />
      </main>
    </>
  );
}

export default LoginPage;

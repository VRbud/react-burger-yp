import { useEffect } from "react";
import ForgotForm from "../components/ForgotForm/ForgotForm";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function FortgotPWPage() {
  const { loginData } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  // useEffect(() => {
  //   if (loginData) {
  //     navigate("/");
  //   }
  //   if (!loginData) {
  //     navigate("/login");
  //   }
  // }, [loginData, navigate]);
  return (
    <>
      <main>
        <ForgotForm />
      </main>
    </>
  );
}

export default FortgotPWPage;

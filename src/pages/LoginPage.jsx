import { useDispatch, useSelector } from "react-redux";
import LoginFrom from "../components/LoginForm/LoginFrom";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect } from "react";
import { checkLogin } from "../services/actions/auth";

function LoginPage() {
  const { loginData } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const init = useCallback(async () => {
    if (!loginData) {
      await dispatch(checkLogin());
    }
  }, [dispatch, loginData]);

  useEffect(() => {
    init();
  }, [init, dispatch]);

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

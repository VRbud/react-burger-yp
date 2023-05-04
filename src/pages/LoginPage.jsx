import { useDispatch, useSelector } from "react-redux";
import LoginFrom from "../components/LoginForm/LoginFrom";

import { useCallback, useEffect } from "react";
import { checkLogin } from "../services/actions/auth";

function LoginPage() {
  const { loginData } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const init = useCallback(async () => {
    if (!loginData) {
      await dispatch(checkLogin());
    }
  }, [dispatch, loginData]);

  useEffect(() => {
    init();
  }, [init, dispatch]);

  return (
    <>
      <main>
        <LoginFrom type="login" />
      </main>
    </>
  );
}

export default LoginPage;

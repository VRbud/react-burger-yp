import { FC, useCallback, useEffect } from "react";
import { checkLogin } from "../../services/actions/auth";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../services/hooks";

interface IProtectedRoute {
  element: JSX.Element;
}

const ProtectedRoute: FC<IProtectedRoute> = ({ element }) => {
  const { loginData } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const init = useCallback(async () => {
    await dispatch(checkLogin());
  }, [dispatch]);

  useEffect(() => {
    if (!loginData) {
      navigate("/login");
      init();
    }
  }, [init, dispatch, navigate, loginData]);

  return element;
};

export default ProtectedRoute;

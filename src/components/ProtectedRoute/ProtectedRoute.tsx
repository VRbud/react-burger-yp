import { FC, useCallback, useEffect } from "react";
import { checkLogin } from "../../services/actions/auth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

interface IProtectedRoute {
  element: JSX.Element;
}

const ProtectedRoute: FC<IProtectedRoute> = ({ element }) => {
  //disable types for redux store
  //@ts-ignore
  const { loginData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const init = useCallback(async () => {
    //disable types for redux dispatch
    //@ts-ignore
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

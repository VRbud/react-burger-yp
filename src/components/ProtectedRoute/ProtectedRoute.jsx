import { useCallback, useEffect } from "react";
import { checkLogin } from "../../services/actions/auth";
import { useDispatch, useSelector } from "react-redux";

function ProtectedRoute({ element }) {
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

  return element;
}

export default ProtectedRoute;

import { useCallback, useEffect } from "react";
import { checkLogin } from "../../services/actions/auth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ element }) {
  const { loginData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
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
}

export default ProtectedRoute;

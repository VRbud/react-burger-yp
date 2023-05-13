import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function OnlyUnAuthRoute({ element, path }) {
  const { loginData } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (loginData) {
      navigate(path);
    }
  }, [loginData, navigate, path]);

  return element;
}

export default OnlyUnAuthRoute;

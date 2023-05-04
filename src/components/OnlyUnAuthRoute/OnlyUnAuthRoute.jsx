import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function OnlyUnAuthRoute({ element }) {
  const { loginData } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (loginData) {
      navigate("/profile");
    }
  }, [loginData, navigate]);

  return element;
}

export default OnlyUnAuthRoute;

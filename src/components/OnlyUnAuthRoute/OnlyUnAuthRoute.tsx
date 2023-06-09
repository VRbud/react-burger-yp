import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../services/hooks";

interface IOnlyUnAuthRoute {
  path: string;
  element: JSX.Element;
}

const OnlyUnAuthRoute: FC<IOnlyUnAuthRoute> = ({ element, path }) => {
  const { loginData } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (loginData) {
      navigate(path);
    }
  }, [loginData, navigate, path]);

  return element;
};

export default OnlyUnAuthRoute;

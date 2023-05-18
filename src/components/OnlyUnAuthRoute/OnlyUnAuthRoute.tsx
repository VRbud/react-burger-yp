import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

interface IOnlyUnAuthRoute {
  path: string;
  element: JSX.Element;
}

const OnlyUnAuthRoute: FC<IOnlyUnAuthRoute> = ({ element, path }) => {
  // @ts-ignore
  const { loginData } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (loginData) {
      navigate(path);
    }
  }, [loginData, navigate, path]);

  return element;
};

export default OnlyUnAuthRoute;

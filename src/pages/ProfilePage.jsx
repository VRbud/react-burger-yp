import { useSelector } from "react-redux";
import Profile from "../components/Profile/Profile";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function ProfilePage() {
  const { loginData } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (!loginData) {
      navigate("/login");
    }
  }, [loginData, navigate]);
  return (
    <>
      <main>{loginData && <Profile />}</main>
    </>
  );
}

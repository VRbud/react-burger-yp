import { useLocation } from "react-router-dom";
import Profile from "../components/Profile/Profile";
import { useAppSelector } from "../services/hooks";

const ProfilePage = () => {
  const { loginData } = useAppSelector((state) => state.auth);
  let location = useLocation();
  let state = location.state as { backgroundLocation?: Location };

  return (
    <>
      <main>{loginData && <Profile />}</main>
    </>
  );
};

export default ProfilePage;

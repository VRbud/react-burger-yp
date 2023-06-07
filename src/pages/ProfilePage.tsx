import Profile from "../components/Profile/Profile";
import { useAppSelector } from "../services/hooks";

const ProfilePage = () => {
  const { loginData } = useAppSelector((state) => state.auth);

  return (
    <>
      <main>{loginData && <Profile />}</main>
    </>
  );
};

export default ProfilePage;

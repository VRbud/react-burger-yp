import Profile from "../components/Profile/Profile";
import { useAppSelector } from "../services/hooks";

export default function ProfilePage() {
  const { loginData } = useAppSelector((state) => state.auth);

  return (
    <>
      <main>{loginData && <Profile />}</main>
    </>
  );
}

import { useSelector } from "react-redux";
import Profile from "../components/Profile/Profile";

export default function ProfilePage() {
  // disable types for redux store
  //@ts-ignore
  const { loginData } = useSelector((state) => state.auth);

  return (
    <>
      <main>{loginData && <Profile />}</main>
    </>
  );
}

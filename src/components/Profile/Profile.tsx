import styles from "./Profile.module.css";
import ProfileNavigation from "./ProfileNavigation/ProfileNavigation";
import { useLocation } from "react-router-dom";
import ProfileDetails from "./ProfileDetails/ProfileDetails";
import ProfileOrderDetail from "./ProfileOrderDetail/ProfileOrderDetail";

function Profile() {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.content_left}>
          <ProfileNavigation />
        </div>
        <div className={styles.content_right}>
          {pathname === "/profile" ? (
            <ProfileDetails />
          ) : pathname === "/profile/ordres" ? (
            <ProfileOrderDetail />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Profile;

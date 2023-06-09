import styles from "./Profile.module.css";
import ProfileNavigation from "./ProfileNavigation/ProfileNavigation";
import ProfileDetails from "./ProfileDetails/ProfileDetails";

function Profile() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.content_left}>
          <ProfileNavigation />
        </div>
        <div className={styles.content_right}>
          <ProfileDetails />
        </div>
      </div>
    </div>
  );
}

export default Profile;

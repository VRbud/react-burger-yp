import styles from "./ProfileOrderDetail.module.css";
import ProfileNavigation from "../ProfileNavigation/ProfileNavigation";
import { useAppDispatch, useAppSelector } from "../../../services/hooks";
import { useEffect } from "react";
import { getIngredients } from "../../../services/actions/ingredients";
import FeedElement from "../../FeedDetails/FeedElement/FeedElement";
import { wsUrlPrivate } from "../../../services/constants";
import { getCookie } from "../../../services/api/api";

function ProfileOrderDetail() {
  const dispatch = useAppDispatch();
  const { orders } = useAppSelector((state) => state.ws);
  const { ingredients } = useAppSelector((state) => state.ingredients);

  useEffect(() => {
    dispatch({
      type: "WS_CONNECTION_START",
      payload: `${wsUrlPrivate}?token=${getCookie("token")?.replace(
        "Bearer ",
        ""
      )}`,
    });

    dispatch(getIngredients());

    return () => {
      dispatch({ type: "WS_CLOSE" });
    };
  }, [dispatch]);
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.content_left}>
          <ProfileNavigation />
        </div>
        <div className={`${styles.content_right} custom-scroll`}>
          {orders &&
            orders.map((order, index) => (
              <FeedElement
                key={index}
                order={order}
                id={order._id}
                ingredients={ingredients}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default ProfileOrderDetail;

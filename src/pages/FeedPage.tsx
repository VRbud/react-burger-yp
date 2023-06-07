import React, { useEffect } from "react";
import FeedDetails from "../components/FeedDetails/FeedDetails";
import FeedHistory from "../components/FeedHistory/FeedHistory";
import { useAppDispatch, useAppSelector } from "../services/hooks";
import { getIngredients } from "../services/actions/ingredients";

const FeedPage = () => {
  const dispatch = useAppDispatch();
  const { orders } = useAppSelector((state) => state.ws);

  useEffect(() => {
    if (orders.length === 0) {
      dispatch({ type: "WS_CONNECTION_START_PUBLIC" });
      dispatch(getIngredients());
    }

    return () => {
      dispatch({ type: "WS_CLOSE" });
    };
  }, [dispatch, orders]);
  return (
    <main className="burger_container">
      <FeedDetails />
      <FeedHistory />
    </main>
  );
};

export default FeedPage;

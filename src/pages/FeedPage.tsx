import React, { useEffect } from "react";
import FeedDetails from "../components/FeedDetails/FeedDetails";
import FeedHistory from "../components/FeedHistory/FeedHistory";
import { useAppDispatch } from "../services/hooks";
import { getIngredients } from "../services/actions/ingredients";
import { wsUrlAll } from "../services/constants";

const FeedPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch({ type: "WS_CONNECTION_START", payload: wsUrlAll });
    dispatch(getIngredients());

    return () => {
      dispatch({ type: "WS_CLOSE" });
    };
  }, [dispatch]);
  return (
    <main className="burger_container">
      <FeedDetails />
      <FeedHistory />
    </main>
  );
};

export default FeedPage;

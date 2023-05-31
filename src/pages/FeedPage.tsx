import React from "react";
import FeedDetails from "../components/FeedDetails/FeedDetails";
import FeedHistory from "../components/FeedHistory/FeedHistory";

const FeedPage = () => {
  return (
    <main className="burger_container">
      <FeedDetails />
      <FeedHistory />
    </main>
  );
};

export default FeedPage;

import React, { useEffect } from "react";
import FeedOrder from "../components/FeedDetails/FeedOrder/FeedOrder";
import { useAppDispatch } from "../services/hooks";
import { getIngredients } from "../services/actions/ingredients";

const OrderPage = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <>
      <main>
        <FeedOrder />
      </main>
    </>
  );
};

export default OrderPage;

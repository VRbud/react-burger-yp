import { configureStore } from "@reduxjs/toolkit";
import { ingredientsReducer } from "./reducers/ingredients";
import { constructorReducer } from "./reducers/constructor";
import { modalReducer } from "./reducers/modal";
import { orderReducer } from "./reducers/order";

export const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    cart: constructorReducer,
    modal: modalReducer,
    order: orderReducer,
  },
});

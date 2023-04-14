import { configureStore } from "@reduxjs/toolkit";
import { ingredientsReducer } from "./reducers/ingredients";

export const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
  }
})
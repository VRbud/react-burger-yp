import thunkMiddleware from "redux-thunk";
import {
  applyMiddleware,
  combineReducers,
  createStore,
} from "@reduxjs/toolkit";
import { ingredientsReducer } from "./reducers/ingredients";
import { constructorReducer } from "./reducers/constructor";
import { modalReducer } from "./reducers/modal";
import { orderReducer } from "./reducers/order";
import { authReducer } from "./reducers/auth";
import { composeWithDevTools } from "@redux-devtools/extension";

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware));

const RootReducer = combineReducers({
  ingredients: ingredientsReducer,
  cart: constructorReducer,
  modal: modalReducer,
  order: orderReducer,
  auth: authReducer,
});

export const store = createStore(RootReducer, composedEnhancer);

export type RootState = ReturnType<typeof store.getState>;

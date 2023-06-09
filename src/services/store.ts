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
import { wsReducer } from "./reducers/ws";
import { socketMiddleware } from "./middleware/wsMiddleware";
import { composeWithDevTools } from "@redux-devtools/extension";
import {
  TWSStoreActions,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
  WS_SEND_MESSAGE,
} from "./actions/ws";

const wsActions: TWSStoreActions = {
  wsInit: WS_CONNECTION_START,
  wsSendMessage: WS_SEND_MESSAGE,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE,
};

const composedEnhancer = composeWithDevTools(
  applyMiddleware(thunkMiddleware, socketMiddleware(wsActions))
);

const RootReducer = combineReducers({
  ingredients: ingredientsReducer,
  cart: constructorReducer,
  modal: modalReducer,
  order: orderReducer,
  auth: authReducer,
  ws: wsReducer,
});

export const store = createStore(RootReducer, composedEnhancer);

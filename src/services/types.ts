import { ThunkAction } from "redux-thunk";
import { RootState, store } from "./store";
import { TConstructorActions } from "./actions/constructor";
import { TAuthActions } from "./actions/auth";
import { TIngredientsActions } from "./actions/ingredients";
import { TModalActions } from "./actions/modal";
import { TOrderActions } from "./actions/order";

export type AppThunk<ReturnType = any> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  TApplicationActions
>;

export type TApplicationActions =
  | TConstructorActions
  | TAuthActions
  | TIngredientsActions
  | TModalActions
  | TOrderActions;

export type AppDispatch = typeof store.dispatch;

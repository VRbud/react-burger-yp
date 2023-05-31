import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { store } from "./store";
import { TConstructorActions } from "./actions/constructor";
import { TAuthActions } from "./actions/auth";
import { TIngredientsActions } from "./actions/ingredients";
import { TModalActions } from "./actions/modal";
import { TOrderActions } from "./actions/order";
import { TWSActions } from "./actions/ws";

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  never,
  TApplicationActions
>;

export type TApplicationActions =
  | TConstructorActions
  | TAuthActions
  | TIngredientsActions
  | TModalActions
  | TOrderActions
  | TWSActions;

export type AppDispatch = ThunkDispatch<RootState, never, TApplicationActions>;

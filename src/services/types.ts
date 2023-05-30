import { ThunkAction } from "redux-thunk";
import { RootState } from "./store";
import { AnyAction } from "redux";

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;

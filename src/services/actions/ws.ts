import { TWSState } from "../reducers/ws";

export const WS_CONNECTION_START_PRIVATE: "WS_CONNECTION_START_PRIVATE" =
  "WS_CONNECTION_START_PRIVATE";
export const WS_CONNECTION_START_PUBLIC: "WS_CONNECTION_START_PUBLIC" =
  "WS_CONNECTION_START_PUBLIC";
export const WS_CONNECTION_SUCCESS: "WS_CONNECTION_SUCCESS" =
  "WS_CONNECTION_SUCCESS";
export const WS_CONNECTION_ERROR: "WS_CONNECTION_ERROR" = "WS_CONNECTION_ERROR";
export const WS_CONNECTION_CLOSED: "WS_CONNECTION_CLOSED" =
  "WS_CONNECTION_CLOSED";
export const WS_GET_MESSAGE: "WS_GET_MESSAGE" = "WS_GET_MESSAGE";
export const WS_SEND_MESSAGE: "WS_SEND_MESSAGE" = "WS_SEND_MESSAGE";
export const WS_SET_ORDER: "WS_SET_ORDER" = "WS_SET_ORDER";
export const WS_CLOSE: "WS_CLOSE" = "WS_CLOSE";

export interface IWSConnectionStartPivate {
  readonly type: typeof WS_CONNECTION_START_PRIVATE;
}

export interface IWSConnectionStartPublic {
  readonly type: typeof WS_CONNECTION_START_PUBLIC;
}

export interface IWSConnectionClose {
  readonly type: typeof WS_CLOSE;
}

export interface IWSConnectionSuccessAction {
  readonly type: typeof WS_CONNECTION_SUCCESS;
}

export interface IWSConnectionErrorAction {
  readonly type: typeof WS_CONNECTION_ERROR;
  readonly payload: Event;
}

export interface IWSConnectionClosedAction {
  readonly type: typeof WS_CONNECTION_CLOSED;
}

export interface IWSGetMessageAction {
  readonly type: typeof WS_GET_MESSAGE;
  readonly payload: TWSState;
}

export interface IWSSendMessageAction {
  readonly type: typeof WS_SEND_MESSAGE;
  readonly payload: { message: string };
}

export interface IWSSetOrder {
  readonly type: typeof WS_SET_ORDER;
  readonly payload: any;
}

export type TWSActions =
  | IWSConnectionStartPivate
  | IWSConnectionStartPublic
  | IWSConnectionSuccessAction
  | IWSConnectionErrorAction
  | IWSConnectionClosedAction
  | IWSGetMessageAction
  | IWSSendMessageAction
  | IWSSetOrder
  | IWSConnectionClose;

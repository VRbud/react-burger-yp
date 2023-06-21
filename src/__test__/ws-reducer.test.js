import { wsReducer } from "../services/reducers/ws";

const initialState = {
  wsConnected: false,
  orders: [],
  total: 0,
  totalToday: 0,
  currentOrder: null,
};

test("should return initial state", () => {
  expect(wsReducer(undefined, { type: undefined })).toEqual(initialState);
});

test("should connect to websocket", () => {
  expect(wsReducer(undefined, { type: "WS_CONNECTION_SUCCESS" })).toEqual({
    ...initialState,
    error: undefined,
    wsConnected: true,
  });
});

test("should set error if connection error occured", () => {
  expect(
    wsReducer(undefined, { type: "WS_CONNECTION_ERROR", payload: "error" })
  ).toEqual({
    ...initialState,
    error: "error",
    wsConnected: false,
  });
});

test("should close connection with some reason", () => {
  expect(wsReducer(undefined, { type: "WS_CONNECTION_CLOSED" })).toEqual({
    ...initialState,
    error: undefined,
    wsConnected: false,
  });
});

test("should recive data", () => {
  expect(
    wsReducer(undefined, {
      type: "WS_GET_MESSAGE",
      payload: { orders: [], total: 1, totalToday: 1 },
    })
  ).toEqual({
    ...initialState,
    error: undefined,
    orders: [],
    total: 1,
    totalToday: 1,
  });
});

test("should close connection", () => {
  expect(
    wsReducer(undefined, {
      type: "WS_CLOSE",
    })
  ).toEqual({
    ...initialState,

    orders: [],
  });
});

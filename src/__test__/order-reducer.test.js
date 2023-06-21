import { orderReducer } from "../services/reducers/order";

const initialState = {
  orderRequest: false,
  orderFailed: false,
  orderData: null,
};

test("should return initial state", () => {
  expect(orderReducer(undefined, { type: undefined })).toEqual(initialState);
});

test("should send order request", () => {
  expect(orderReducer(undefined, { type: "SET_ORDER_DATA" })).toEqual({
    ...initialState,
    orderRequest: true,
  });
});

test("should set order data", () => {
  expect(
    orderReducer(undefined, { type: "SET_ORDER_DATA_SUCCESS", orderData: {} })
  ).toEqual({
    ...initialState,
    orderRequest: false,
    orderFailed: false,
    orderData: {},
  });
});

test("should set error if request failed", () => {
  expect(
    orderReducer(undefined, { type: "SET_ORDER_DATA_FAILED", orderData: {} })
  ).toEqual({
    ...initialState,
    orderRequest: false,
    orderFailed: true,
  });
});

test("should delete order data", () => {
  expect(orderReducer(undefined, { type: "DELETE_ORDER_DATA" })).toEqual({
    ...initialState,
    orderData: null,
  });
});

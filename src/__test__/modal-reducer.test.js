import { modalReducer } from "../services/reducers/modal";

const initialState = {
  currentIngredient: null,
  orderData: null,
};

test("should return initial state", () => {
  expect(modalReducer(undefined, { type: undefined })).toEqual(initialState);
});

test("should set modal ingredient", () => {
  expect(
    modalReducer(undefined, { type: "SET_MODAL_ING", payload: {} })
  ).toEqual({ ...initialState, currentIngredient: {} });
});

test("should delete modal ingredient", () => {
  expect(modalReducer(undefined, { type: "DEL_MODAL_ING" })).toEqual({
    ...initialState,
    currentIngredient: null,
  });
});

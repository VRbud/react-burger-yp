import { constructorReducer } from "../services/reducers/constructor";

const initialState = {
  cart: [],
  bun: null,
};

test("should return initial state", () => {
  expect(constructorReducer(undefined, { type: undefined })).toEqual(
    initialState
  );
});

test("should add ingredient to cart", () => {
  expect(
    constructorReducer(undefined, { type: "ADD_TO_CART", payload: {} })
  ).toEqual({ ...initialState, cart: [...initialState.cart, {}] });
});

test("should add bun to cart", () => {
  expect(
    constructorReducer(undefined, { type: "ADD_BUN_TO_CART", payload: {} })
  ).toEqual({ ...initialState, bun: {} });
});

test("should sort to cart", () => {
  expect(
    constructorReducer(undefined, {
      type: "SORT_CART",
      dragIndex: 0,
      hoverIndex: 1,
    })
  ).toEqual({
    ...initialState,
    cart: [
      ...initialState.cart
        .toSpliced(0, 1)
        .toSpliced(1, 0, initialState.cart[0]),
    ],
  });
});

test("should delete from cart", () => {
  expect(
    constructorReducer(undefined, {
      type: "DELETE_FROM_CART",
      ing: 0,
    })
  ).toEqual({
    ...initialState,
    cart: [...initialState.cart.toSpliced(0, 1)],
  });
});
